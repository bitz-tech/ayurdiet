import { useState, useEffect } from "react";
import { User, Session } from "@supabase/supabase-js";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Leaf, LogOut, Calendar, ChefHat, User as UserIcon, Heart } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { AuthForm } from "@/components/auth/AuthForm";
import { getDietPlansByPatientEmail, MockDietPlan } from "@/lib/mock-data";

export default function PatientDashboard() {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);
  const [profile, setProfile] = useState<any>(null);
  const [dietCharts, setDietCharts] = useState<any[]>([]);
  const { toast } = useToast();

  useEffect(() => {
    // Set up auth state listener
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, session) => {
        setSession(session);
        setUser(session?.user ?? null);
        setLoading(false);

        if (session?.user) {
          fetchProfile(session.user.id);
          fetchDietCharts(session.user.id);
        }
      }
    );

    // Check for existing session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setUser(session?.user ?? null);
      setLoading(false);

      if (session?.user) {
        fetchProfile(session.user.id);
        fetchDietCharts(session.user.id);
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  const fetchProfile = async (userId: string) => {
    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('user_id', userId)
        .single();

      if (error) throw error;
      setProfile(data);
    } catch (error) {
      console.error('Error fetching profile:', error);
    }
  };

  const fetchDietCharts = async (userId: string) => {
    try {
      // Get user profile to find email
      const { data: profile } = await supabase
        .from('profiles')
        .select('email')
        .eq('user_id', userId)
        .single();

      if (profile?.email) {
        // Get mock diet plans for this patient
        const mockDietPlans = getDietPlansByPatientEmail(profile.email);
        setDietCharts(mockDietPlans as any[]);
      } else {
        // Fallback: show some sample diet plans
        const sampleDietPlans = [
          {
            id: "1",
            name: "Balanced Ayurvedic Diet",
            description: "A comprehensive diet plan for overall wellness",
            start_date: "2024-02-01",
            end_date: "2024-02-28",
            is_active: true,
            created_at: "2024-02-01T10:00:00Z"
          }
        ];
        setDietCharts(sampleDietPlans);
      }
    } catch (error) {
      console.error('Error fetching diet charts:', error);
      // Fallback to sample data
      const sampleDietPlans = [
        {
          id: "1",
          name: "Balanced Ayurvedic Diet",
          description: "A comprehensive diet plan for overall wellness",
          start_date: "2024-02-01",
          end_date: "2024-02-28",
          is_active: true,
          created_at: "2024-02-01T10:00:00Z"
        }
      ];
      setDietCharts(sampleDietPlans);
    }
  };

  const handleSignOut = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) {
      toast({
        title: "Error",
        description: "Failed to sign out. Please try again.",
        variant: "destructive",
      });
    } else {
      toast({
        title: "Signed out",
        description: "You have been successfully signed out.",
      });
    }
  };

  const handleAuthSuccess = () => {
    toast({
      title: "Welcome to AyurDiet!",
      description: "Access your personalized diet plans.",
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="text-center">
          <Leaf className="h-12 w-12 text-primary mx-auto mb-4 animate-pulse" />
          <p className="text-muted-foreground">Loading AyurDiet...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return <AuthForm onAuthSuccess={handleAuthSuccess} />;
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-card/50 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                <Leaf className="h-6 w-6 text-primary" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-foreground">AyurDiet</h1>
                <p className="text-sm text-muted-foreground">Patient Portal</p>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <span className="text-sm text-muted-foreground hidden sm:inline">
                Welcome, {profile?.full_name || user.email}
              </span>
              <Button variant="outline" size="sm" onClick={handleSignOut}>
                <LogOut className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        <div className="space-y-8">
          {/* Welcome Section */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Heart className="h-5 w-5 text-primary" />
                Your Wellness Journey
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                Welcome to your personalized Ayurvedic wellness portal. Here you can view your custom diet plans, track your progress, and communicate with your practitioner.
              </p>
            </CardContent>
          </Card>

          {/* Profile Information */}
          {profile && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <UserIcon className="h-5 w-5" />
                  Profile Information
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium text-muted-foreground">Full Name</label>
                    <p className="text-foreground">{profile.full_name}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-muted-foreground">Email</label>
                    <p className="text-foreground">{profile.email}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-muted-foreground">Role</label>
                    <div className="flex items-center gap-2">
                      <Badge variant="secondary" className="bg-primary/10 text-primary border-primary/20">
                        {profile.role}
                      </Badge>
                      <span className="text-xs text-muted-foreground">Patient Portal</span>
                    </div>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-muted-foreground">Member Since</label>
                    <p className="text-foreground">
                      {new Date(profile.created_at).toLocaleDateString()}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Diet Plans */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <ChefHat className="h-5 w-5" />
                Your Diet Plans
              </CardTitle>
            </CardHeader>
            <CardContent>
              {dietCharts.length === 0 ? (
                <div className="text-center py-8">
                  <Calendar className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-foreground mb-2">No Diet Plans Yet</h3>
                  <p className="text-muted-foreground">
                    Your practitioner hasn't created any diet plans for you yet. Please contact your Ayurvedic practitioner to get started with your personalized wellness journey.
                  </p>
                </div>
              ) : (
                <div className="space-y-4">
                  {dietCharts.map((chart) => (
                    <Card key={chart.id} className="border-l-4 border-l-primary">
                      <CardContent className="p-6">
                        <div className="flex justify-between items-start mb-4">
                          <div>
                            <h3 className="font-semibold text-foreground">{chart.name}</h3>
                            <p className="text-sm text-muted-foreground">
                              Created by: {chart.practitioner?.full_name || 'Unknown Practitioner'}
                            </p>
                          </div>
                          <Badge variant={chart.is_active ? "default" : "secondary"}>
                            {chart.is_active ? "Active" : "Inactive"}
                          </Badge>
                        </div>

                        {chart.description && (
                          <p className="text-muted-foreground mb-4">{chart.description}</p>
                        )}

                        <div className="grid md:grid-cols-2 gap-4 text-sm">
                          <div>
                            <span className="font-medium text-foreground">Start Date:</span>
                            <span className="ml-2 text-muted-foreground">
                              {new Date(chart.start_date).toLocaleDateString()}
                            </span>
                          </div>
                          {chart.end_date && (
                            <div>
                              <span className="font-medium text-foreground">End Date:</span>
                              <span className="ml-2 text-muted-foreground">
                                {new Date(chart.end_date).toLocaleDateString()}
                              </span>
                            </div>
                          )}
                        </div>

                        {/* Meal Plan Details */}
                        {(chart as MockDietPlan).meals && (
                          <div className="mt-4 space-y-3">
                            <h4 className="font-medium text-foreground">Daily Meal Plan:</h4>
                            <div className="grid md:grid-cols-2 gap-4">
                              <div className="space-y-2">
                                <h5 className="text-sm font-medium text-primary">Breakfast</h5>
                                <ul className="text-sm text-muted-foreground space-y-1">
                                  {(chart as MockDietPlan).meals.breakfast.map((item, index) => (
                                    <li key={index} className="flex items-center gap-2">
                                      <span className="w-1.5 h-1.5 bg-primary rounded-full"></span>
                                      {item}
                                    </li>
                                  ))}
                                </ul>
                              </div>
                              <div className="space-y-2">
                                <h5 className="text-sm font-medium text-primary">Lunch</h5>
                                <ul className="text-sm text-muted-foreground space-y-1">
                                  {(chart as MockDietPlan).meals.lunch.map((item, index) => (
                                    <li key={index} className="flex items-center gap-2">
                                      <span className="w-1.5 h-1.5 bg-primary rounded-full"></span>
                                      {item}
                                    </li>
                                  ))}
                                </ul>
                              </div>
                              <div className="space-y-2">
                                <h5 className="text-sm font-medium text-primary">Dinner</h5>
                                <ul className="text-sm text-muted-foreground space-y-1">
                                  {(chart as MockDietPlan).meals.dinner.map((item, index) => (
                                    <li key={index} className="flex items-center gap-2">
                                      <span className="w-1.5 h-1.5 bg-primary rounded-full"></span>
                                      {item}
                                    </li>
                                  ))}
                                </ul>
                              </div>
                              <div className="space-y-2">
                                <h5 className="text-sm font-medium text-primary">Snacks</h5>
                                <ul className="text-sm text-muted-foreground space-y-1">
                                  {(chart as MockDietPlan).meals.snacks.map((item, index) => (
                                    <li key={index} className="flex items-center gap-2">
                                      <span className="w-1.5 h-1.5 bg-primary rounded-full"></span>
                                      {item}
                                    </li>
                                  ))}
                                </ul>
                              </div>
                            </div>
                          </div>
                        )}

                        {chart.special_instructions && (
                          <div className="mt-4 p-3 bg-muted/50 rounded-lg">
                            <h4 className="font-medium text-foreground mb-1">Special Instructions:</h4>
                            <p className="text-sm text-muted-foreground">{chart.special_instructions}</p>
                          </div>
                        )}
                      </CardContent>
                    </Card>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
}