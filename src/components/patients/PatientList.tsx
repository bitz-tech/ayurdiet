import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Search, Plus, User, Calendar, Heart } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { AddPatientDialog } from "./AddPatientDialog";
import { mockPatients, MockPatient } from "@/lib/mock-data";

interface Patient {
  id: string;
  name: string;
  age: number;
  gender: string;
  dominantDosha: 'vata' | 'pitta' | 'kapha';
  lastVisit: string;
  activeDietChart: boolean;
  phone?: string;
}

export function PatientList() {
  const [searchTerm, setSearchTerm] = useState("");
  const [patients, setPatients] = useState<Patient[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  const fetchPatients = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      const { data: profile } = await supabase
        .from('profiles')
        .select('id')
        .eq('user_id', user.id)
        .single();

      if (!profile) return;

      const { data: patientsData, error } = await supabase
        .from('patients')
        .select('*')
        .eq('practitioner_id', profile.id)
        .order('created_at', { ascending: false });

      if (error) throw error;

      const formattedPatients = patientsData?.map(patient => ({
        id: patient.id,
        name: patient.name,
        age: patient.age,
        gender: patient.gender,
        dominantDosha: patient.dominant_dosha || 'vata',
        lastVisit: patient.updated_at?.split('T')[0] || patient.created_at?.split('T')[0],
        activeDietChart: false, // TODO: Check for active diet charts
        phone: patient.notes || undefined
      })) || [];

      // If no real patients, add mock patients
      if (formattedPatients.length === 0) {
        const mockFormattedPatients = mockPatients.map(patient => ({
          id: patient.id,
          name: patient.name,
          age: patient.age,
          gender: patient.gender,
          dominantDosha: patient.dominant_dosha,
          lastVisit: patient.created_at.split('T')[0],
          activeDietChart: true, // Mock patients have active diet charts
          phone: patient.notes || undefined
        }));
        setPatients(mockFormattedPatients);
      } else {
        setPatients(formattedPatients);
      }
    } catch (error: any) {
      console.error('Error fetching patients:', error);
      // Fallback to mock data
      const mockFormattedPatients = mockPatients.map(patient => ({
        id: patient.id,
        name: patient.name,
        age: patient.age,
        gender: patient.gender,
        dominantDosha: patient.dominant_dosha,
        lastVisit: patient.created_at.split('T')[0],
        activeDietChart: true,
        phone: patient.notes || undefined
      }));
      setPatients(mockFormattedPatients);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPatients();
  }, []);


  const filteredPatients = patients.filter(patient =>
    patient.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getDoshaColor = (dosha: string) => {
    switch (dosha) {
      case 'vata':
        return 'bg-ayur-vata/10 text-ayur-vata border-ayur-vata/20';
      case 'pitta':
        return 'bg-ayur-pitta/10 text-ayur-pitta border-ayur-pitta/20';
      case 'kapha':
        return 'bg-ayur-kapha/10 text-ayur-kapha border-ayur-kapha/20';
      default:
        return 'bg-muted/10 text-muted-foreground border-muted/20';
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold text-foreground">Patients</h2>
          <p className="text-muted-foreground">Manage your patient profiles and health records</p>
        </div>
        <AddPatientDialog onPatientAdded={fetchPatients} />
      </div>

      {/* Search */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Search patients by name..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="pl-10"
        />
      </div>

      {/* Patient Cards */}
      {loading ? (
        <div className="text-center py-12">
          <div className="text-lg font-medium text-foreground mb-2">Loading patients...</div>
          <p className="text-muted-foreground">Please wait while we fetch your patient data</p>
        </div>
      ) : (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {filteredPatients.map((patient) => (
          <Card key={patient.id} className="hover:shadow-md transition-shadow cursor-pointer">
            <CardHeader className="pb-3">
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                    <User className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <CardTitle className="text-lg">{patient.name}</CardTitle>
                    <p className="text-sm text-muted-foreground">
                      {patient.age} years, {patient.gender}
                    </p>
                  </div>
                </div>
                {patient.activeDietChart && (
                  <Badge variant="outline" className="bg-success/10 text-success border-success/20">
                    Active Plan
                  </Badge>
                )}
              </div>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Constitution:</span>
                <Badge variant="outline" className={getDoshaColor(patient.dominantDosha)}>
                  {patient.dominantDosha.charAt(0).toUpperCase() + patient.dominantDosha.slice(1)}
                </Badge>
              </div>

              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Calendar className="h-4 w-4" />
                <span>Last visit: {new Date(patient.lastVisit).toLocaleDateString()}</span>
              </div>

              {patient.phone && (
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Heart className="h-4 w-4" />
                  <span>{patient.phone}</span>
                </div>
              )}

              <div className="flex gap-2 pt-2">
                <Button
                  variant="outline"
                  size="sm"
                  className="flex-1"
                  onClick={() => {
                    toast({
                      title: "View Profile",
                      description: `Opening ${patient.name}'s detailed profile...`,
                    });
                  }}
                >
                  View Profile
                </Button>
                <Button
                  size="sm"
                  className="flex-1"
                  onClick={() => {
                    toast({
                      title: "Create Diet Plan",
                      description: `Creating new diet plan for ${patient.name}...`,
                    });
                  }}
                >
                  Create Diet Plan
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
      )}

      {!loading && filteredPatients.length === 0 && (
        <Card>
          <CardContent className="text-center py-12">
            <User className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-medium text-foreground mb-2">No patients found</h3>
            <p className="text-muted-foreground mb-4">
              {searchTerm ? "Try adjusting your search terms" : "Start by adding your first patient"}
            </p>
            <AddPatientDialog onPatientAdded={fetchPatients} />
          </CardContent>
        </Card>
      )}
    </div>
  );
}