import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Calendar, Plus, Save, Users, Utensils, Target, Loader2, Search } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { mockPatients } from "@/lib/mock-data";
import { FoodSearchDialog } from "./FoodSearchDialog";

interface MealItem {
  id: string;
  name: string;
  quantity: string;
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
}

interface DayPlan {
  breakfast: MealItem[];
  lunch: MealItem[];
  dinner: MealItem[];
  snacks: MealItem[];
}

export function DietChartBuilder() {
  const [selectedPatient, setSelectedPatient] = useState<string>("");
  const [chartName, setChartName] = useState("");
  const [description, setDescription] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [activeDay, setActiveDay] = useState("day1");
  const [isGenerating, setIsGenerating] = useState(false);
  const [patients, setPatients] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [showFoodSearch, setShowFoodSearch] = useState(false);
  const [currentSearchContext, setCurrentSearchContext] = useState<{
    dayKey: string;
    mealType: keyof DayPlan;
  } | null>(null);
  const { toast } = useToast();

  const [weekPlan, setWeekPlan] = useState<Record<string, DayPlan>>({
    day1: { breakfast: [], lunch: [], dinner: [], snacks: [] },
    day2: { breakfast: [], lunch: [], dinner: [], snacks: [] },
    day3: { breakfast: [], lunch: [], dinner: [], snacks: [] },
    day4: { breakfast: [], lunch: [], dinner: [], snacks: [] },
    day5: { breakfast: [], lunch: [], dinner: [], snacks: [] },
    day6: { breakfast: [], lunch: [], dinner: [], snacks: [] },
    day7: { breakfast: [], lunch: [], dinner: [], snacks: [] }
  });

  // Fetch patients from database
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
        dosha: patient.dominant_dosha?.charAt(0).toUpperCase() + patient.dominant_dosha?.slice(1) || 'Unknown'
      })) || [];

      // If no real patients, add mock patients
      if (formattedPatients.length === 0) {
        const mockFormattedPatients = mockPatients.map(patient => ({
          id: patient.id,
          name: patient.name,
          dosha: patient.dominant_dosha.charAt(0).toUpperCase() + patient.dominant_dosha.slice(1)
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
        dosha: patient.dominant_dosha.charAt(0).toUpperCase() + patient.dominant_dosha.slice(1)
      }));
      setPatients(mockFormattedPatients);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPatients();
  }, []);

  // Sample meal items
  const sampleMeals: MealItem[] = [
    { id: "1", name: "Oatmeal with almonds", quantity: "1 bowl", calories: 250, protein: 8, carbs: 30, fat: 9 },
    { id: "2", name: "Dal with rice", quantity: "1 plate", calories: 320, protein: 12, carbs: 58, fat: 4 },
    { id: "3", name: "Vegetable curry", quantity: "1 serving", calories: 180, protein: 6, carbs: 20, fat: 8 },
    { id: "4", name: "Khichdi", quantity: "1 bowl", calories: 200, protein: 7, carbs: 35, fat: 3 },
    { id: "5", name: "Herbal tea", quantity: "1 cup", calories: 5, protein: 0, carbs: 1, fat: 0 }
  ];

  const getDayTotals = (dayPlan: DayPlan) => {
    const allMeals = [...dayPlan.breakfast, ...dayPlan.lunch, ...dayPlan.dinner, ...dayPlan.snacks];
    return allMeals.reduce(
      (totals, meal) => ({
        calories: totals.calories + meal.calories,
        protein: totals.protein + meal.protein,
        carbs: totals.carbs + meal.carbs,
        fat: totals.fat + meal.fat
      }),
      { calories: 0, protein: 0, carbs: 0, fat: 0 }
    );
  };

  const addMealToDay = (dayKey: string, mealType: keyof DayPlan, meal: MealItem) => {
    setWeekPlan(prev => ({
      ...prev,
      [dayKey]: {
        ...prev[dayKey],
        [mealType]: [...prev[dayKey][mealType], meal]
      }
    }));
  };

  const removeMealFromDay = (dayKey: string, mealType: keyof DayPlan, mealId: string) => {
    setWeekPlan(prev => ({
      ...prev,
      [dayKey]: {
        ...prev[dayKey],
        [mealType]: prev[dayKey][mealType].filter(meal => meal.id !== mealId)
      }
    }));
  };

  const openFoodSearch = (dayKey: string, mealType: keyof DayPlan) => {
    setCurrentSearchContext({ dayKey, mealType });
    setShowFoodSearch(true);
  };

  const handleFoodAdd = (meal: MealItem) => {
    if (currentSearchContext) {
      addMealToDay(currentSearchContext.dayKey, currentSearchContext.mealType, meal);
    }
  };

  const closeFoodSearch = () => {
    setShowFoodSearch(false);
    setCurrentSearchContext(null);
  };

  const saveDietChart = async () => {
    if (!selectedPatient) {
      toast({
        title: "No Patient Selected",
        description: "Please select a patient before saving the diet chart",
        variant: "destructive",
      });
      return;
    }

    if (!chartName.trim()) {
      toast({
        title: "Chart Name Required",
        description: "Please provide a name for the diet chart",
        variant: "destructive",
      });
      return;
    }

    try {
      // Get current user's profile
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error("User not authenticated");

      const { data: practitionerProfile } = await supabase
        .from('profiles')
        .select('id')
        .eq('user_id', user.id)
        .single();

      if (!practitionerProfile) throw new Error("Practitioner profile not found");

      // Get patient email for linking
      const selectedPatientData = patients.find(p => p.id === selectedPatient);
      let patientId = selectedPatient;
      let patientEmail = '';

      // Try to get patient data from database
      const { data: patientData } = await supabase
        .from('patients')
        .select('id, email')
        .eq('id', selectedPatient)
        .single();

      if (patientData) {
        patientId = patientData.id;
        patientEmail = patientData.email;
      } else {
        // For mock patients, use a default email format
        patientEmail = `${selectedPatientData?.name?.toLowerCase().replace(/\s+/g, '.')}@example.com`;
      }

      // Convert weekPlan to the format expected by the database (as JSON)
      const mealsData = JSON.stringify({
        weekly_plan: weekPlan
      });

      // Save diet chart to database
      const { data, error } = await supabase
        .from('diet_charts')
        .insert({
          patient_id: patientId,
          practitioner_id: practitionerProfile.id,
          name: chartName,
          description: description || null,
          start_date: startDate || new Date().toISOString().split('T')[0],
          end_date: endDate || null,
          meals: mealsData,
          is_active: true
        })
        .select()
        .single();

      if (error) throw error;

      toast({
        title: "Diet Chart Saved",
        description: `Diet chart "${chartName}" has been saved successfully for ${selectedPatientData?.name}`,
      });

      // Reset form
      setChartName("");
      setDescription("");
      setStartDate("");
      setEndDate("");
      setWeekPlan({
        day1: { breakfast: [], lunch: [], dinner: [], snacks: [] },
        day2: { breakfast: [], lunch: [], dinner: [], snacks: [] },
        day3: { breakfast: [], lunch: [], dinner: [], snacks: [] },
        day4: { breakfast: [], lunch: [], dinner: [], snacks: [] },
        day5: { breakfast: [], lunch: [], dinner: [], snacks: [] },
        day6: { breakfast: [], lunch: [], dinner: [], snacks: [] },
        day7: { breakfast: [], lunch: [], dinner: [], snacks: [] }
      });

    } catch (error: any) {
      console.error('Error saving diet chart:', error);
      toast({
        title: "Save Failed",
        description: error.message || "Failed to save diet chart. Please try again.",
        variant: "destructive",
      });
    }
  };

  const generateAIPlan = async () => {
    // Auto-select first patient if none selected
    if (!selectedPatient && patients.length > 0) {
      setSelectedPatient(patients[0].id);
    }

    const patientToUse = selectedPatient || (patients.length > 0 ? patients[0].id : null);

    if (!patientToUse) {
      toast({
        title: "No Patients",
        description: "Please add a patient first to generate AI diet plans",
        variant: "destructive",
      });
      return;
    }

    setIsGenerating(true);

    try {
      // Fetch complete patient data from database
      const { data: patientData, error: patientError } = await supabase
        .from('patients')
        .select('*')
        .eq('id', patientToUse)
        .single();

      if (patientError || !patientData) {
        throw new Error("Failed to fetch patient details");
      }

      // Fetch food database for AI context
      const { data: foodsData, error: foodsError } = await supabase
        .from('foods')
        .select('name, category, rasas, calories, protein, carbohydrates, fat, dosha_effects, digestibility, virya')
        .limit(100); // Get top 100 foods for AI context

      if (foodsError) {
        console.warn("Failed to fetch foods data:", foodsError);
      }

      console.log('Generating AI plan with patient data:', patientData);
      console.log('Available foods for AI:', foodsData?.length || 0);

      // Call the Gemini AI edge function with complete patient data
      const { data, error } = await supabase.functions.invoke('generate-diet-plan', {
        body: {
          patient: {
            name: patientData.name,
            age: patientData.age,
            gender: patientData.gender,
            weight: patientData.weight,
            height: patientData.height,
            dominantDosha: patientData.dominant_dosha,
            secondaryDosha: patientData.secondary_dosha,
            medicalHistory: patientData.medical_history,
            allergies: patientData.allergies,
            mealFrequency: patientData.meal_frequency || 3,
            waterIntake: patientData.water_intake,
            bowelMovements: patientData.bowel_movements || 1
          },
          duration: 7, // Always 7 days for weekly plan
          preferences: [],
          restrictions: patientData.allergies || [],
          goals: description || "General wellness and dosha balance",
          availableFoods: foodsData || []
        }
      });

      if (error) throw error;

      if (data.success && data.dietPlan) {
        // Update the week plan with AI generated content
        const newWeekPlan: Record<string, DayPlan> = {};

        data.dietPlan.dailyPlan.forEach((day: any, index: number) => {
          const dayKey = `day${index + 1}`;
          newWeekPlan[dayKey] = {
            breakfast: day.meals.breakfast?.items?.map((item: any, idx: number) => ({
              id: `ai-breakfast-${idx}`,
              name: item.name,
              quantity: item.quantity,
              calories: 200, // Estimated
              protein: 8,
              carbs: 30,
              fat: 5
            })) || [],
            lunch: day.meals.lunch?.items?.map((item: any, idx: number) => ({
              id: `ai-lunch-${idx}`,
              name: item.name,
              quantity: item.quantity,
              calories: 400,
              protein: 15,
              carbs: 60,
              fat: 10
            })) || [],
            dinner: day.meals.dinner?.items?.map((item: any, idx: number) => ({
              id: `ai-dinner-${idx}`,
              name: item.name,
              quantity: item.quantity,
              calories: 350,
              protein: 12,
              carbs: 45,
              fat: 8
            })) || [],
            snacks: day.meals.snacks?.items?.map((item: any, idx: number) => ({
              id: `ai-snacks-${idx}`,
              name: item.name,
              quantity: item.quantity,
              calories: 100,
              protein: 4,
              carbs: 10,
              fat: 2
            })) || []
          };
        });

        setWeekPlan(newWeekPlan);
        setChartName(data.dietPlan.summary || "AI Generated Diet Plan");

        toast({
          title: "Diet Plan Generated!",
          description: "AI has created a personalized Ayurvedic diet plan based on the patient's constitution.",
        });
      } else {
        throw new Error(data.error || "Failed to generate diet plan");
      }
    } catch (error: any) {
      console.error('AI generation error:', error);
      toast({
        title: "Generation Failed",
        description: error.message || "Failed to generate AI diet plan. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold text-foreground">Diet Chart Builder</h2>
          <p className="text-muted-foreground">Create personalized Ayurvedic diet plans for your patients</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" onClick={generateAIPlan} disabled={isGenerating}>
            {isGenerating ? (
              <>
                <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                Generating...
              </>
            ) : (
              <>
                <Target className="h-4 w-4 mr-2" />
                AI Generate
              </>
            )}
          </Button>
          <Button onClick={saveDietChart}>
            <Save className="h-4 w-4 mr-2" />
            Save Chart
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Chart Details */}
        <Card className="lg:col-span-1">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Users className="h-5 w-5" />
              Chart Details
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="patient">Select Patient</Label>
              <Select value={selectedPatient} onValueChange={setSelectedPatient}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Choose a patient" />
                </SelectTrigger>
                <SelectContent className="bg-background border shadow-md z-50">
                  {patients.map(patient => (
                    <SelectItem key={patient.id} value={patient.id}>
                      {patient.name} ({patient.dosha} constitution)
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {patients.length === 0 && !loading && (
                <p className="text-xs text-muted-foreground">
                  No patients found. Add patients first to create diet charts.
                </p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="chartName">Chart Name</Label>
              <Input
                id="chartName"
                value={chartName}
                onChange={(e) => setChartName(e.target.value)}
                placeholder="e.g., Winter Detox Plan"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Brief description of the diet plan goals"
                rows={3}
              />
            </div>

            <div className="grid grid-cols-2 gap-2">
              <div className="space-y-2">
                <Label htmlFor="startDate">Start Date</Label>
                <Input
                  id="startDate"
                  type="date"
                  value={startDate}
                  onChange={(e) => setStartDate(e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="endDate">End Date</Label>
                <Input
                  id="endDate"
                  type="date"
                  value={endDate}
                  onChange={(e) => setEndDate(e.target.value)}
                />
              </div>
            </div>

            {selectedPatient && (
              <div className="p-3 bg-muted/20 rounded-lg">
                <h4 className="font-medium text-sm mb-2">Daily Targets:</h4>
                <div className="text-xs space-y-1">
                  <div>Calories: 1800-2000</div>
                  <div>Protein: 60-80g</div>
                  <div>Carbs: 200-250g</div>
                  <div>Fat: 60-80g</div>
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Meal Planning */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Calendar className="h-5 w-5" />
              Weekly Meal Plan
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Tabs value={activeDay} onValueChange={setActiveDay}>
              <TabsList className="grid w-full grid-cols-7">
                {Object.keys(weekPlan).map((day, index) => (
                  <TabsTrigger key={day} value={day} className="text-xs">
                    Day {index + 1}
                  </TabsTrigger>
                ))}
              </TabsList>

              {Object.entries(weekPlan).map(([dayKey, dayPlan]) => (
                <TabsContent key={dayKey} value={dayKey} className="space-y-4">
                  <div className="flex justify-between items-center">
                    <h3 className="text-lg font-medium">Day {dayKey.slice(-1)} Plan</h3>
                    <div className="text-sm bg-muted/20 px-3 py-1 rounded-lg">
                      Total: {getDayTotals(dayPlan).calories} cal
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {(['breakfast', 'lunch', 'dinner', 'snacks'] as const).map(mealType => (
                      <Card key={mealType}>
                        <CardHeader className="pb-2">
                          <CardTitle className="text-base capitalize flex items-center gap-2">
                            <Utensils className="h-4 w-4" />
                            {mealType}
                          </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-2">
                          {dayPlan[mealType].map(meal => (
                            <div key={meal.id} className="flex justify-between items-center p-2 bg-muted/10 rounded">
                              <div>
                                <div className="font-medium text-sm">{meal.name}</div>
                                <div className="text-xs text-muted-foreground">{meal.quantity} - {meal.calories} cal</div>
                              </div>
                              <Button
                                size="sm"
                                variant="outline"
                                onClick={() => removeMealFromDay(dayKey, mealType, meal.id)}
                                className="h-6 w-6 p-0"
                              >
                                ×
                              </Button>
                            </div>
                          ))}

                          <div className="space-y-2">
                            {/* Food Database Search Button */}
                            <Button
                              onClick={() => openFoodSearch(dayKey, mealType)}
                              size="sm"
                              className="w-full h-8"
                            >
                              <Search className="h-3 w-3 mr-2" />
                              Search Food Database
                            </Button>

                            {/* Quick Add Sample Meals */}
                            <div className="space-y-1">
                              <Label className="text-xs">Quick add samples:</Label>
                              <div className="grid grid-cols-1 gap-1">
                                {sampleMeals.slice(0, 2).map(meal => (
                                  <Button
                                    key={meal.id}
                                    size="sm"
                                    variant="outline"
                                    onClick={() => addMealToDay(dayKey, mealType, meal)}
                                    className="justify-start text-xs h-6 text-muted-foreground"
                                  >
                                    <Plus className="h-3 w-3 mr-1" />
                                    {meal.name}
                                  </Button>
                                ))}
                              </div>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>

                  {/* Daily Nutrition Summary */}
                  <Card>
                    <CardContent className="p-4">
                      <div className="grid grid-cols-4 gap-4 text-center">
                        <div>
                          <div className="text-sm text-muted-foreground">Calories</div>
                          <div className="font-medium">{getDayTotals(dayPlan).calories}</div>
                        </div>
                        <div>
                          <div className="text-sm text-muted-foreground">Protein</div>
                          <div className="font-medium">{getDayTotals(dayPlan).protein}g</div>
                        </div>
                        <div>
                          <div className="text-sm text-muted-foreground">Carbs</div>
                          <div className="font-medium">{getDayTotals(dayPlan).carbs}g</div>
                        </div>
                        <div>
                          <div className="text-sm text-muted-foreground">Fat</div>
                          <div className="font-medium">{getDayTotals(dayPlan).fat}g</div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>
              ))}
            </Tabs>
          </CardContent>
        </Card>
      </div>

      {/* Food Search Dialog */}
      <FoodSearchDialog
        isOpen={showFoodSearch}
        onClose={closeFoodSearch}
        onAddFood={handleFoodAdd}
        mealType={currentSearchContext?.mealType || 'meal'}
      />
    </div>
  );
}