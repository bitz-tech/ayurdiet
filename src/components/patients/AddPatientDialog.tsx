import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { Loader2, Plus } from "lucide-react";

interface AddPatientDialogProps {
  onPatientAdded: () => void;
}

export function AddPatientDialog({ onPatientAdded }: AddPatientDialogProps) {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    age: "",
    gender: "",
    weight: "",
    height: "",
    dominant_dosha: "",
    secondary_dosha: "",
    medical_history: "",
    allergies: "",
    notes: "",
    meal_frequency: "3",
    water_intake: "",
    bowel_movements: "1"
  });
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Get the current user's profile
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error("Not authenticated");

      const { data: profile, error: profileError } = await supabase
        .from('profiles')
        .select('id')
        .eq('user_id', user.id)
        .maybeSingle();

      if (profileError) throw profileError;
      if (!profile) throw new Error("Practitioner profile not found. Please contact support.");

      // We no longer create auth accounts for patients; simply link by email.
      // Prevent duplicates for the same practitioner.
      const { data: existingPatient, error: existingPatientErr } = await supabase
        .from('patients')
        .select('id')
        .eq('email', formData.email)
        .eq('practitioner_id', profile.id)
        .maybeSingle();

      if (existingPatientErr) throw existingPatientErr;
      if (existingPatient) {
        throw new Error("This patient is already linked to your practice.");
      }

      const patientData = {
        name: formData.name,
        email: formData.email,
        user_id: null,
        age: parseInt(formData.age),
        gender: formData.gender,
        weight: formData.weight ? parseFloat(formData.weight) : null,
        height: formData.height ? parseFloat(formData.height) : null,
        dominant_dosha: formData.dominant_dosha ? formData.dominant_dosha as 'vata' | 'pitta' | 'kapha' : null,
        secondary_dosha: formData.secondary_dosha ? formData.secondary_dosha as 'vata' | 'pitta' | 'kapha' : null,
        medical_history: formData.medical_history || null,
        allergies: formData.allergies ? formData.allergies.split(',').map(a => a.trim()) : null,
        notes: formData.notes || null,
        meal_frequency: parseInt(formData.meal_frequency),
        water_intake: formData.water_intake ? parseFloat(formData.water_intake) : null,
        bowel_movements: parseInt(formData.bowel_movements),
        practitioner_id: profile.id
      };

      const { error } = await supabase
        .from('patients')
        .insert(patientData);

      if (error) throw error;

      const message = `${formData.name} has been added to your patients.`;

      toast({
        title: "Patient Added",
        description: message,
      });

      setOpen(false);
      setFormData({
        name: "",
        email: "",
        age: "",
        gender: "",
        weight: "",
        height: "",
        dominant_dosha: "",
        secondary_dosha: "",
        medical_history: "",
        allergies: "",
        notes: "",
        meal_frequency: "3",
        water_intake: "",
        bowel_movements: "1"
      });
      onPatientAdded();
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="flex items-center gap-2">
          <Plus className="h-4 w-4" />
          Add New Patient
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Add New Patient</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="name">Full Name *</Label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                required
                placeholder="Enter patient's full name"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="email">Email *</Label>
              <Input
                id="email"
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                required
                placeholder="Enter patient's email"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="age">Age *</Label>
              <Input
                id="age"
                type="number"
                value={formData.age}
                onChange={(e) => setFormData({ ...formData, age: e.target.value })}
                required
                placeholder="Age in years"
                min="1"
                max="120"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="gender">Gender *</Label>
              <Select value={formData.gender} onValueChange={(value) => setFormData({ ...formData, gender: value })}>
                <SelectTrigger>
                  <SelectValue placeholder="Select gender" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="male">Male</SelectItem>
                  <SelectItem value="female">Female</SelectItem>
                  <SelectItem value="other">Other</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="weight">Weight (kg)</Label>
              <Input
                id="weight"
                type="number"
                value={formData.weight}
                onChange={(e) => setFormData({ ...formData, weight: e.target.value })}
                placeholder="Weight in kg"
                step="0.1"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="height">Height (cm)</Label>
              <Input
                id="height"
                type="number"
                value={formData.height}
                onChange={(e) => setFormData({ ...formData, height: e.target.value })}
                placeholder="Height in cm"
                step="0.1"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="dominant_dosha">Dominant Dosha</Label>
              <Select value={formData.dominant_dosha} onValueChange={(value) => setFormData({ ...formData, dominant_dosha: value })}>
                <SelectTrigger>
                  <SelectValue placeholder="Select dominant dosha" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="vata">Vata</SelectItem>
                  <SelectItem value="pitta">Pitta</SelectItem>
                  <SelectItem value="kapha">Kapha</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="secondary_dosha">Secondary Dosha</Label>
              <Select value={formData.secondary_dosha} onValueChange={(value) => setFormData({ ...formData, secondary_dosha: value })}>
                <SelectTrigger>
                  <SelectValue placeholder="Select secondary dosha" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="vata">Vata</SelectItem>
                  <SelectItem value="pitta">Pitta</SelectItem>
                  <SelectItem value="kapha">Kapha</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="meal_frequency">Meal Frequency (per day)</Label>
              <Select value={formData.meal_frequency} onValueChange={(value) => setFormData({ ...formData, meal_frequency: value })}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="2">2 meals</SelectItem>
                  <SelectItem value="3">3 meals</SelectItem>
                  <SelectItem value="4">4 meals</SelectItem>
                  <SelectItem value="5">5 meals</SelectItem>
                  <SelectItem value="6">6 meals</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="water_intake">Water Intake (liters/day)</Label>
              <Input
                id="water_intake"
                type="number"
                value={formData.water_intake}
                onChange={(e) => setFormData({ ...formData, water_intake: e.target.value })}
                placeholder="Daily water intake"
                step="0.1"
                min="0"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="bowel_movements">Bowel Movements (per day)</Label>
              <Select value={formData.bowel_movements} onValueChange={(value) => setFormData({ ...formData, bowel_movements: value })}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="1">1 time</SelectItem>
                  <SelectItem value="2">2 times</SelectItem>
                  <SelectItem value="3">3 times</SelectItem>
                  <SelectItem value="4">4+ times</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="allergies">Allergies (comma-separated)</Label>
            <Input
              id="allergies"
              value={formData.allergies}
              onChange={(e) => setFormData({ ...formData, allergies: e.target.value })}
              placeholder="e.g., nuts, dairy, gluten"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="medical_history">Medical History</Label>
            <Textarea
              id="medical_history"
              value={formData.medical_history}
              onChange={(e) => setFormData({ ...formData, medical_history: e.target.value })}
              placeholder="Relevant medical conditions, medications, etc."
              rows={3}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="notes">Additional Notes</Label>
            <Textarea
              id="notes"
              value={formData.notes}
              onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
              placeholder="Any additional observations or notes"
              rows={3}
            />
          </div>

          <div className="flex justify-end gap-3">
            <Button type="button" variant="outline" onClick={() => setOpen(false)}>
              Cancel
            </Button>
            <Button type="submit" disabled={loading}>
              {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              Add Patient
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}