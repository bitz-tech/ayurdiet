import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Search, Plus, ChefHat, Zap, Thermometer } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

interface Food {
  id: string;
  name: string;
  name_sanskrit?: string;
  category: string;
  sub_category?: string;
  description?: string;
  calories: number;
  protein: number;
  carbohydrates: number;
  fat: number;
  rasas: string[];
  virya: 'hot' | 'cold';
  digestibility: 'easy' | 'moderate' | 'difficult';
  dosha_effects: {
    vata: 'increase' | 'decrease' | 'neutral';
    pitta: 'increase' | 'decrease' | 'neutral';
    kapha: 'increase' | 'decrease' | 'neutral';
  };
  prabhava?: string;
}

export function FoodDatabase() {
  const [searchTerm, setSearchTerm] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [rasaFilter, setRasaFilter] = useState("all");
  const [foods, setFoods] = useState<Food[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  const fetchFoods = async () => {
    try {
      let query = supabase.from('foods').select('*');
      
      if (categoryFilter !== "all") {
        query = query.eq('category', categoryFilter);
      }
      
      if (searchTerm) {
        query = query.or(`name.ilike.%${searchTerm}%,name_sanskrit.ilike.%${searchTerm}%`);
      }
      
      const { data, error } = await query.order('name').limit(50);
      
      if (error) throw error;
      
      // Transform the data to match our Food interface
      const transformedFoods: Food[] = (data || []).map(item => ({
        id: item.id,
        name: item.name,
        name_sanskrit: item.name_sanskrit,
        category: item.category,
        sub_category: item.sub_category,
        description: item.description,
        calories: item.calories,
        protein: item.protein,
        carbohydrates: item.carbohydrates,
        fat: item.fat,
        rasas: Array.isArray(item.rasas) ? item.rasas : [],
        virya: item.virya as 'hot' | 'cold',
        digestibility: item.digestibility as 'easy' | 'moderate' | 'difficult',
        dosha_effects: typeof item.dosha_effects === 'object' && item.dosha_effects ? 
          item.dosha_effects as any : { vata: 'neutral', pitta: 'neutral', kapha: 'neutral' },
        prabhava: item.prabhava
      }));
      
      setFoods(transformedFoods);
    } catch (error: any) {
      toast({
        title: "Error",
        description: "Failed to fetch foods from database",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchFoods();
  }, [searchTerm, categoryFilter, rasaFilter]);

  const categories = ["all", "grains", "vegetables", "fruits", "legumes", "nuts", "spices", "oils", "dairy", "sweeteners", "beverages"];
  const rasas = ["all", "sweet", "sour", "salty", "bitter", "pungent", "astringent"];

  const filteredFoods = foods.filter(food => {
    const matchesRasa = rasaFilter === "all" || food.rasas?.includes(rasaFilter);
    return matchesRasa;
  });

  const getDoshaColor = (effect: string) => {
    switch (effect) {
      case 'increase':
        return 'text-destructive';
      case 'decrease':
        return 'text-success';
      default:
        return 'text-muted-foreground';
    }
  };

  const getDoshaSymbol = (effect: string) => {
    switch (effect) {
      case 'increase':
        return '↑';
      case 'decrease':
        return '↓';
      default:
        return '−';
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="text-center">
          <ChefHat className="h-12 w-12 text-primary mx-auto mb-4 animate-pulse" />
          <p className="text-muted-foreground">Loading food database...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold text-foreground">Food Database</h2>
          <p className="text-muted-foreground">Comprehensive Ayurvedic food database with nutritional information</p>
        </div>
        <Button className="flex items-center gap-2">
          <Plus className="h-4 w-4" />
          Add New Food
        </Button>
      </div>

      {/* Filters */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search foods..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
        
        <Select value={categoryFilter} onValueChange={setCategoryFilter}>
          <SelectTrigger>
            <SelectValue placeholder="Category" />
          </SelectTrigger>
          <SelectContent>
            {categories.map(category => (
              <SelectItem key={category} value={category}>
                {category === "all" ? "All Categories" : category.charAt(0).toUpperCase() + category.slice(1)}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        
        <Select value={rasaFilter} onValueChange={setRasaFilter}>
          <SelectTrigger>
            <SelectValue placeholder="Rasa" />
          </SelectTrigger>
          <SelectContent>
            {rasas.map(rasa => (
              <SelectItem key={rasa} value={rasa}>
                {rasa === "all" ? "All Rasas" : rasa.charAt(0).toUpperCase() + rasa.slice(1)}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        
        <div className="text-sm text-muted-foreground flex items-center">
          {filteredFoods.length} food{filteredFoods.length !== 1 ? 's' : ''} found
        </div>
      </div>

      {/* Food Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {filteredFoods.map((food) => (
          <Card key={food.id} className="hover:shadow-md transition-shadow">
            <CardHeader className="pb-3">
              <div className="flex items-start justify-between">
                <div>
                  <CardTitle className="text-lg">{food.name}</CardTitle>
                  <p className="text-sm text-muted-foreground capitalize">{food.category}</p>
                </div>
                <ChefHat className="h-5 w-5 text-primary" />
              </div>
            </CardHeader>
            
            <CardContent className="space-y-4">
              {/* Nutritional Info */}
              <div className="grid grid-cols-2 gap-2 text-sm">
                <div>
                  <span className="text-muted-foreground">Calories:</span>
                  <span className="ml-2 font-medium">{food.calories}/100g</span>
                </div>
                <div>
                  <span className="text-muted-foreground">Protein:</span>
                  <span className="ml-2 font-medium">{food.protein}g</span>
                </div>
                <div>
                  <span className="text-muted-foreground">Carbs:</span>
                  <span className="ml-2 font-medium">{food.carbohydrates}g</span>
                </div>
                <div>
                  <span className="text-muted-foreground">Fat:</span>
                  <span className="ml-2 font-medium">{food.fat}g</span>
                </div>
              </div>
              
              {/* Sanskrit Name */}
              {food.name_sanskrit && (
                <div>
                  <span className="text-sm text-muted-foreground">Sanskrit:</span>
                  <span className="ml-2 text-sm font-medium">{food.name_sanskrit}</span>
                </div>
              )}
              
              {/* Rasas */}
              <div>
                <span className="text-sm text-muted-foreground mb-2 block">Rasas:</span>
                <div className="flex flex-wrap gap-1">
                  {food.rasas?.map(rasa => (
                    <Badge key={rasa} variant="outline" className="text-xs bg-ayur-earth/10 text-ayur-earth border-ayur-earth/20">
                      {rasa}
                    </Badge>
                  ))}
                </div>
              </div>
              
              {/* Virya & Digestibility */}
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-2">
                  <Thermometer className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm">
                    Virya: <span className={food.virya === 'hot' ? 'text-ayur-pitta' : 'text-ayur-vata'}>{food.virya}</span>
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <Zap className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm">
                    {food.digestibility} to digest
                  </span>
                </div>
              </div>
              
              {/* Dosha Effects */}
              <div>
                <span className="text-sm text-muted-foreground mb-2 block">Dosha Effects:</span>
                <div className="flex justify-between text-sm">
                  <span className={`font-medium ${getDoshaColor(food.dosha_effects?.vata)}`}>
                    V {getDoshaSymbol(food.dosha_effects?.vata)}
                  </span>
                  <span className={`font-medium ${getDoshaColor(food.dosha_effects?.pitta)}`}>
                    P {getDoshaSymbol(food.dosha_effects?.pitta)}
                  </span>
                  <span className={`font-medium ${getDoshaColor(food.dosha_effects?.kapha)}`}>
                    K {getDoshaSymbol(food.dosha_effects?.kapha)}
                  </span>
                </div>
              </div>
              
              {/* Prabhava */}
              {food.prabhava && (
                <div>
                  <span className="text-sm text-muted-foreground">Prabhava:</span>
                  <p className="text-xs text-muted-foreground mt-1">{food.prabhava}</p>
                </div>
              )}
              
              <Button variant="outline" size="sm" className="w-full">
                View Details
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredFoods.length === 0 && (
        <Card>
          <CardContent className="text-center py-12">
            <ChefHat className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-medium text-foreground mb-2">No foods found</h3>
            <p className="text-muted-foreground mb-4">
              Try adjusting your search terms or filters
            </p>
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              Add New Food
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  );
}