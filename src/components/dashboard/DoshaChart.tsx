import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { supabase } from "@/integrations/supabase/client";

interface DoshaData {
  name: string;
  percentage: number;
  color: string;
  description: string;
}

const MOCK_DOSHA_DATA: DoshaData[] = [
  {
    name: "Vata",
    percentage: 33,
    color: "bg-ayur-vata",
    description: "Air & Space - Movement & Communication"
  },
  {
    name: "Pitta",
    percentage: 33,
    color: "bg-ayur-pitta",
    description: "Fire & Water - Metabolism & Transformation"
  },
  {
    name: "Kapha",
    percentage: 33,
    color: "bg-ayur-kapha",
    description: "Earth & Water - Structure & Lubrication"
  }
];

export function DoshaChart() {
  const [doshaDistribution, setDoshaDistribution] = useState<DoshaData[]>([]);
  const [loading, setLoading] = useState(true);
  const [totalPatients, setTotalPatients] = useState(0);

  const fetchDoshaDistribution = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        setDoshaDistribution(MOCK_DOSHA_DATA);
        return;
      }

      const { data: profile } = await supabase
        .from('profiles')
        .select('id')
        .eq('user_id', user.id)
        .single();

      if (!profile) {
        setDoshaDistribution(MOCK_DOSHA_DATA);
        return;
      }

      const { data: patients } = await supabase
        .from('patients')
        .select('dominant_dosha')
        .eq('practitioner_id', profile.id)
        .not('dominant_dosha', 'is', null);

      if (!patients || patients.length === 0) {
        setDoshaDistribution(MOCK_DOSHA_DATA);
        return;
      }

      const total = patients.length;
      setTotalPatients(total);

      const doshaCounts = patients.reduce((acc, patient) => {
        const dosha = patient.dominant_dosha;
        acc[dosha] = (acc[dosha] || 0) + 1;
        return acc;
      }, {} as Record<string, number>);

      const distribution: DoshaData[] = [
        {
          name: "Vata",
          percentage: Math.round(((doshaCounts.vata || 0) / total) * 100),
          color: "bg-ayur-vata",
          description: "Air & Space - Movement & Communication"
        },
        {
          name: "Pitta",
          percentage: Math.round(((doshaCounts.pitta || 0) / total) * 100),
          color: "bg-ayur-pitta",
          description: "Fire & Water - Metabolism & Transformation"
        },
        {
          name: "Kapha",
          percentage: Math.round(((doshaCounts.kapha || 0) / total) * 100),
          color: "bg-ayur-kapha",
          description: "Earth & Water - Structure & Lubrication"
        }
      ];

      setDoshaDistribution(distribution);
    } catch (error) {
      console.error('Error fetching dosha distribution:', error);
      setDoshaDistribution(MOCK_DOSHA_DATA);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDoshaDistribution();
  }, []);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Patient Dosha Distribution</CardTitle>
        <p className="text-sm text-muted-foreground">
          {totalPatients > 0 ? `Constitutional patterns in your practice (${totalPatients} patients)` : 'No patient data available'}
        </p>
      </CardHeader>
      <CardContent className="space-y-6">
        {loading ? (
          <div className="text-center text-muted-foreground">Loading dosha distribution...</div>
        ) : doshaDistribution.length === 0 ? (
          <div className="text-center text-muted-foreground">
            No patients with dosha information yet. Add patients to see the distribution.
          </div>
        ) : (
          doshaDistribution.map((dosha, index) => (
            <div key={index} className="space-y-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className={`w-4 h-4 rounded-full ${dosha.color}`} />
                  <span className="font-medium text-foreground">{dosha.name}</span>
                </div>
                <span className="text-sm font-medium text-muted-foreground">
                  {dosha.percentage}%
                </span>
              </div>
              <Progress value={dosha.percentage} className="h-2" />
              <p className="text-xs text-muted-foreground">
                {dosha.description}
              </p>
            </div>
          ))
        )}
      </CardContent>
    </Card>
  );
}
