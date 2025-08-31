import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Users, FileText, ChefHat, Calendar } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";

interface StatsCardProps {
  title: string;
  value: string | number;
  description?: string;
  icon: React.ComponentType<{ className?: string }>;
  trend?: string;
}

function StatsCard({ title, value, description, icon: Icon, trend }: StatsCardProps) {
  return (
    <Card className="relative overflow-hidden">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium text-muted-foreground">
          {title}
        </CardTitle>
        <Icon className="h-5 w-5 text-primary" />
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold text-foreground">{value}</div>
        {description && (
          <p className="text-xs text-muted-foreground mt-1">{description}</p>
        )}
        {trend && (
          <p className="text-xs text-success mt-1">{trend}</p>
        )}
      </CardContent>
    </Card>
  );
}

export function DashboardStats() {
  const [stats, setStats] = useState([
    {
      title: "Total Patients",
      value: 0,
      description: "Active under care",
      icon: Users,
    },
    {
      title: "Food Database",
      value: 0,
      description: "Ayurvedic items",
      icon: ChefHat,
    }
  ]);

  const fetchStats = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      const { data: profile } = await supabase
        .from('profiles')
        .select('id')
        .eq('user_id', user.id)
        .single();

      if (!profile) return;

      // Fetch total patients
      const { count: patientsCount } = await supabase
        .from('patients')
        .select('*', { count: 'exact', head: true })
        .eq('practitioner_id', profile.id);

      // Fetch total foods in database
      const { count: foodsCount } = await supabase
        .from('foods')
        .select('*', { count: 'exact', head: true });

      setStats([
        {
          title: "Total Patients",
          value: patientsCount || 0,
          description: "Active under care",
          icon: Users,
        },
        {
          title: "Food Database",
          value: foodsCount || 0,
          description: "Ayurvedic items",
          icon: ChefHat,
        }
      ]);
    } catch (error) {
      console.error('Error fetching dashboard stats:', error);
    }
  };

  useEffect(() => {
    fetchStats();
  }, []);

  return (
    <div className="grid gap-4 md:grid-cols-2">
      {stats.map((stat, index) => (
        <StatsCard key={index} {...stat} />
      ))}
    </div>
  );
}