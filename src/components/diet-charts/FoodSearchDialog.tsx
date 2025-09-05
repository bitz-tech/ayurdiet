import { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Search, Plus, Loader2 } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

interface Food {
  id: string;
  name: string;
  category: string;
  calories?: number;
  protein?: number;
  carbohydrates?: number;
  fat?: number;
  rasas?: string[];
  dosha_effects?: any;
  name_sanskrit?: string;
}

interface MealItem {
  id: string;
  name: string;
  quantity: string;
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
}

interface FoodSearchDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onAddFood: (meal: MealItem) => void;
  mealType: string;
}

export function FoodSearchDialog({ isOpen, onClose, onAddFood, mealType }: FoodSearchDialogProps) {
  const [foods, setFoods] = useState<Food[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [quantityInputs, setQuantityInputs] = useState<Record<string, string>>({});
  const { toast } = useToast();

  const categories = [
    "all", "grains", "vegetables", "fruits", "legumes", "dairy", 
    "spices", "herbs", "nuts", "oils", "beverages"
  ];

  useEffect(() => {
    if (isOpen) {
      fetchFoods();
    }
  }, [isOpen, searchTerm, categoryFilter]);

  const fetchFoods = async () => {
    setLoading(true);
    try {
      let query = supabase
        .from('foods')
        .select('*')
        .order('name', { ascending: true });

      if (searchTerm) {
        query = query.ilike('name', `%${searchTerm}%`);
      }

      if (categoryFilter !== 'all') {
        query = query.eq('category', categoryFilter);
      }

      const { data, error } = await query.limit(50);

      if (error) throw error;
      setFoods(data || []);
    } catch (error: any) {
      console.error('Error fetching foods:', error);
      toast({
        title: "Error",
        description: "Failed to fetch foods from database",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleAddFood = (food: Food) => {
    const quantity = quantityInputs[food.id] || "1 serving";
    
    const mealItem: MealItem = {
      id: `food-${food.id}-${Date.now()}`,
      name: food.name,
      quantity,
      calories: food.calories || 100,
      protein: food.protein || 5,
      carbs: food.carbohydrates || 15,
      fat: food.fat || 3
    };

    onAddFood(mealItem);
    
    toast({
      title: "Food Added",
      description: `${food.name} added to ${mealType}`,
    });

    // Clear quantity input after adding
    setQuantityInputs(prev => ({ ...prev, [food.id]: "" }));
  };

  const getDoshaColor = (effect: string) => {
    switch (effect) {
      case 'increase': return 'text-red-600';
      case 'decrease': return 'text-blue-600';
      default: return 'text-muted-foreground';
    }
  };

  const getDoshaSymbol = (effect: string) => {
    switch (effect) {
      case 'increase': return '↑';
      case 'decrease': return '↓';
      default: return '−';
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[80vh] overflow-hidden flex flex-col">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Search className="h-5 w-5" />
            Add Food to {mealType}
          </DialogTitle>
        </DialogHeader>

        {/* Search and Filter Controls */}
        <div className="flex gap-4 mb-4">
          <div className="flex-1">
            <Input
              placeholder="Search foods..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full"
            />
          </div>
          <Select value={categoryFilter} onValueChange={setCategoryFilter}>
            <SelectTrigger className="w-48">
              <SelectValue placeholder="Category" />
            </SelectTrigger>
            <SelectContent className="bg-background border shadow-md z-50">
              {categories.map(category => (
                <SelectItem key={category} value={category}>
                  {category === 'all' ? 'All Categories' : category.charAt(0).toUpperCase() + category.slice(1)}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Foods List */}
        <div className="flex-1 overflow-y-auto">
          {loading ? (
            <div className="flex items-center justify-center py-8">
              <Loader2 className="h-6 w-6 animate-spin mr-2" />
              Loading foods...
            </div>
          ) : foods.length === 0 ? (
            <div className="text-center py-8 text-muted-foreground">
              No foods found. Try adjusting your search or filters.
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {foods.map(food => (
                <Card key={food.id} className="border hover:border-primary/20 transition-colors">
                  <CardContent className="p-4">
                    <div className="space-y-3">
                      {/* Food Header */}
                      <div className="flex justify-between items-start">
                        <div>
                          <h3 className="font-medium text-sm">{food.name}</h3>
                          {food.name_sanskrit && (
                            <p className="text-xs text-muted-foreground italic">{food.name_sanskrit}</p>
                          )}
                        </div>
                        <Badge variant="outline" className="text-xs">
                          {food.category}
                        </Badge>
                      </div>

                      {/* Nutritional Info */}
                      <div className="grid grid-cols-4 gap-2 text-xs">
                        <div className="text-center">
                          <div className="text-muted-foreground">Cal</div>
                          <div className="font-medium">{food.calories || 'N/A'}</div>
                        </div>
                        <div className="text-center">
                          <div className="text-muted-foreground">Protein</div>
                          <div className="font-medium">{food.protein?.toFixed(1) || 'N/A'}g</div>
                        </div>
                        <div className="text-center">
                          <div className="text-muted-foreground">Carbs</div>
                          <div className="font-medium">{food.carbohydrates?.toFixed(1) || 'N/A'}g</div>
                        </div>
                        <div className="text-center">
                          <div className="text-muted-foreground">Fat</div>
                          <div className="font-medium">{food.fat?.toFixed(1) || 'N/A'}g</div>
                        </div>
                      </div>

                      {/* Ayurvedic Properties */}
                      {(food.rasas?.length || food.dosha_effects) && (
                        <div className="space-y-2">
                          {food.rasas?.length > 0 && (
                            <div>
                              <div className="text-xs font-medium mb-1">Rasas:</div>
                              <div className="flex flex-wrap gap-1">
                                {food.rasas.map(rasa => (
                                  <Badge key={rasa} variant="secondary" className="text-xs">
                                    {rasa}
                                  </Badge>
                                ))}
                              </div>
                            </div>
                          )}
                          
                          {food.dosha_effects && (
                            <div>
                              <div className="text-xs font-medium mb-1">Dosha Effects:</div>
                              <div className="flex gap-2 text-xs">
                                {['vata', 'pitta', 'kapha'].map(dosha => {
                                  const effect = food.dosha_effects[dosha];
                                  if (!effect) return null;
                                  return (
                                    <span key={dosha} className={getDoshaColor(effect)}>
                                      {dosha.charAt(0).toUpperCase()}{getDoshaSymbol(effect)}
                                    </span>
                                  );
                                })}
                              </div>
                            </div>
                          )}
                        </div>
                      )}

                      {/* Quantity Input and Add Button */}
                      <div className="flex gap-2">
                        <Input
                          placeholder="e.g., 1 cup, 100g"
                          value={quantityInputs[food.id] || ""}
                          onChange={(e) => setQuantityInputs(prev => ({
                            ...prev,
                            [food.id]: e.target.value
                          }))}
                          className="flex-1 text-xs h-8"
                        />
                        <Button
                          size="sm"
                          onClick={() => handleAddFood(food)}
                          className="h-8 px-3"
                        >
                          <Plus className="h-3 w-3 mr-1" />
                          Add
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}