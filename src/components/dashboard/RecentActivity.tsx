import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar, User, FileText, CheckCircle } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { formatDistanceToNow } from "date-fns";
import { mockRecentActivity, getRecentActivityForPractitioner, MockActivity } from "@/lib/mock-data";

interface ActivityItem {
  id: string;
  type: 'patient_added' | 'diet_created' | 'consultation' | 'review';
  title: string;
  description: string;
  time: string;
  status?: 'completed' | 'pending' | 'scheduled';
}

export function RecentActivity() {
  const [recentActivity, setRecentActivity] = useState<ActivityItem[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchRecentActivity = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      const { data: profile } = await supabase
        .from('profiles')
        .select('id')
        .eq('user_id', user.id)
        .single();

      if (!profile) return;

      // Try to fetch real data first
      const activities: ActivityItem[] = [];

      // Fetch recent patients
      const { data: recentPatients } = await supabase
        .from('patients')
        .select('name, created_at')
        .eq('practitioner_id', profile.id)
        .order('created_at', { ascending: false })
        .limit(3);

      recentPatients?.forEach(patient => {
        activities.push({
          id: `patient-${patient.name}`,
          type: 'patient_added',
          title: 'New Patient Registration',
          description: `${patient.name} has been added to your practice`,
          time: formatDistanceToNow(new Date(patient.created_at), { addSuffix: true }),
          status: 'completed'
        });
      });

      // Fetch recent diet charts
      const { data: recentDietCharts } = await supabase
        .from('diet_charts')
        .select('name, created_at, patients(name)')
        .eq('practitioner_id', profile.id)
        .order('created_at', { ascending: false })
        .limit(3);

      recentDietCharts?.forEach(dietChart => {
        activities.push({
          id: `diet-${dietChart.name}`,
          type: 'diet_created',
          title: 'Diet Chart Created',
          description: `New diet plan "${dietChart.name}" for ${dietChart.patients?.name || 'patient'}`,
          time: formatDistanceToNow(new Date(dietChart.created_at), { addSuffix: true }),
          status: 'completed'
        });
      });

      // If we have real data, use it; otherwise, use mock data
      if (activities.length > 0) {
        // Sort all activities by time and take the most recent 4
        activities.sort((a, b) => {
          const timeA = a.time.includes('ago') ? new Date(Date.now() - parseTimeAgo(a.time)) : new Date();
          const timeB = b.time.includes('ago') ? new Date(Date.now() - parseTimeAgo(b.time)) : new Date();
          return timeB.getTime() - timeA.getTime();
        });
        setRecentActivity(activities.slice(0, 4));
      } else {
        // Use mock data
        const mockActivities = getRecentActivityForPractitioner(4);
        setRecentActivity(mockActivities as ActivityItem[]);
      }
    } catch (error) {
      console.error('Error fetching recent activity:', error);
      // Fallback to mock data
      const mockActivities = getRecentActivityForPractitioner(4);
      setRecentActivity(mockActivities as ActivityItem[]);
    } finally {
      setLoading(false);
    }
  };

  const parseTimeAgo = (timeString: string): number => {
    const match = timeString.match(/(\d+)\s+(\w+)\s+ago/);
    if (!match) return 0;

    const [, amount, unit] = match;
    const multiplier = {
      'minute': 60 * 1000,
      'minutes': 60 * 1000,
      'hour': 60 * 60 * 1000,
      'hours': 60 * 60 * 1000,
      'day': 24 * 60 * 60 * 1000,
      'days': 24 * 60 * 60 * 1000
    }[unit] || 0;

    return parseInt(amount) * multiplier;
  };

  useEffect(() => {
    fetchRecentActivity();
  }, []);

  const getIcon = (type: ActivityItem['type']) => {
    switch (type) {
      case 'patient_added':
        return <User className="h-4 w-4" />;
      case 'diet_created':
        return <FileText className="h-4 w-4" />;
      case 'consultation':
        return <Calendar className="h-4 w-4" />;
      case 'review':
        return <CheckCircle className="h-4 w-4" />;
      default:
        return <FileText className="h-4 w-4" />;
    }
  };

  const getStatusColor = (status?: string) => {
    switch (status) {
      case 'completed':
        return 'bg-success/10 text-success border-success/20';
      case 'pending':
        return 'bg-warning/10 text-warning border-warning/20';
      case 'scheduled':
        return 'bg-primary/10 text-primary border-primary/20';
      default:
        return 'bg-muted/10 text-muted-foreground border-muted/20';
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Recent Activity</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {loading ? (
          <div className="text-center text-muted-foreground">Loading recent activity...</div>
        ) : recentActivity.length === 0 ? (
          <div className="text-center text-muted-foreground">No recent activity</div>
        ) : (
          recentActivity.map((activity) => (
            <div
              key={activity.id}
              className="flex items-start space-x-3 p-3 rounded-lg bg-muted/20 hover:bg-muted/30 transition-colors"
            >
              <div className="flex items-center justify-center w-8 h-8 rounded-full bg-primary/10 text-primary">
                {getIcon(activity.type)}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between">
                  <p className="text-sm font-medium text-foreground truncate">
                    {activity.title}
                  </p>
                  {activity.status && (
                    <Badge variant="outline" className={getStatusColor(activity.status)}>
                      {activity.status}
                    </Badge>
                  )}
                </div>
                <p className="text-sm text-muted-foreground mt-1">
                  {activity.description}
                </p>
                <p className="text-xs text-muted-foreground mt-1">
                  {activity.time}
                </p>
              </div>
            </div>
          ))
        )}
      </CardContent>
    </Card>
  );
}