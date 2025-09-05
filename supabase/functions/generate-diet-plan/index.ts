import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const geminiApiKey = Deno.env.get('GEMINI_API_KEY');

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

interface PatientData {
  name: string;
  age: number;
  gender: string;
  weight?: number;
  height?: number;
  dominantDosha: string;
  secondaryDosha?: string;
  medicalHistory?: string;
  allergies?: string[];
  mealFrequency: number;
  waterIntake?: number;
  bowelMovements: number;
}

interface DietPlanRequest {
  patient: PatientData;
  duration: number; // days
  preferences?: string[];
  restrictions?: string[];
  goals?: string;
  availableFoods?: any[];
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { patient, duration = 7, preferences = [], restrictions = [], goals = "", availableFoods = [] }: DietPlanRequest = await req.json();

    console.log('Generating diet plan for:', patient.name);

    // Construct the prompt for Gemini
    const prompt = `You are an expert Ayurvedic nutritionist. Create a comprehensive ${duration}-day diet plan for the following patient:

PATIENT PROFILE:
- Name: ${patient.name}
- Age: ${patient.age} years
- Gender: ${patient.gender}
- Weight: ${patient.weight || 'Not specified'} kg
- Height: ${patient.height || 'Not specified'} cm
- Dominant Dosha: ${patient.dominantDosha}
- Secondary Dosha: ${patient.secondaryDosha || 'Not specified'}
- Medical History: ${patient.medicalHistory || 'None specified'}
- Allergies: ${patient.allergies?.join(', ') || 'None specified'}
- Meal Frequency: ${patient.mealFrequency} meals per day
- Water Intake: ${patient.waterIntake || 'Not specified'} liters/day
- Bowel Movements: ${patient.bowelMovements} per day

PREFERENCES: ${preferences.join(', ') || 'None specified'}
RESTRICTIONS: ${restrictions.join(', ') || 'None specified'}
GOALS: ${goals || 'General wellness and dosha balance'}

AVAILABLE FOODS DATABASE (Use these foods in your recommendations):
${availableFoods.map(food => `- ${food.name} (${food.category}): ${food.calories || 'Unknown'} cal, Rasas: ${food.rasas?.join(', ') || 'Unknown'}, Dosha Effects: ${JSON.stringify(food.dosha_effects || {})}`).join('\n')}

Please provide a detailed ${duration}-day diet plan that:
1. Balances the dominant dosha (${patient.dominantDosha})
2. Uses ONLY foods from the available foods database provided above
3. Includes appropriate foods for their constitution
4. Considers the six tastes (rasas) in proper proportions
5. Provides nutritional balance appropriate for their age and gender
6. Includes meal timing recommendations
7. Considers seasonal appropriateness
8. Respects any allergies and restrictions
9. MUST generate exactly ${duration} days of meal plans (day 1 through day ${duration})
10. Each day must include breakfast, lunch, and dinner with proper quantities

Format your response as a JSON object with this structure:
{
  "summary": "Brief overview of the diet plan approach",
  "dailyPlan": [
    {
      "day": 1,
      "meals": {
        "breakfast": {
          "items": [{"name": "Food item", "quantity": "Amount", "benefits": "Ayurvedic benefits"}],
          "timing": "7:00 AM",
          "instructions": "Preparation/consumption notes"
        },
        "lunch": {
          "items": [{"name": "Food item", "quantity": "Amount", "benefits": "Ayurvedic benefits"}],
          "timing": "12:00 PM",
          "instructions": "Preparation/consumption notes"
        },
        "dinner": {
          "items": [{"name": "Food item", "quantity": "Amount", "benefits": "Ayurvedic benefits"}],
          "timing": "7:00 PM",
          "instructions": "Preparation/consumption notes"
        },
        "snacks": {
          "items": [{"name": "Snack item", "quantity": "Amount", "benefits": "Ayurvedic benefits"}],
          "timing": "Mid-morning/afternoon",
          "instructions": "When and how to consume"
        }
      },
      "dailyTotals": {
        "calories": "Estimated calories",
        "primaryRasas": ["dominant tastes for the day"],
        "doshaBalance": "How this day supports dosha balance"
      }
    }
  ],
  "generalGuidelines": [
    "Important dietary guidelines",
    "Lifestyle recommendations",
    "Foods to avoid or emphasize"
  ],
  "progressNotes": [
    "What to monitor",
    "Signs of improvement",
    "When to adjust the plan"
  ]
}

Only return valid JSON. Do not include any markdown formatting or additional text.`;

    const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent?key=${geminiApiKey}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        contents: [{
          parts: [{
            text: prompt
          }]
        }],
        generationConfig: {
          temperature: 0.7,
          topK: 40,
          topP: 0.95,
          maxOutputTokens: 8192,
        }
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('Gemini API error:', errorText);
      throw new Error(`Gemini API error: ${response.status} ${response.statusText}`);
    }

    const data = await response.json();
    console.log('Gemini response received');

    if (!data.candidates || !data.candidates[0] || !data.candidates[0].content) {
      throw new Error('Invalid response from Gemini API');
    }

    const generatedText = data.candidates[0].content.parts[0].text;
    
    // Parse the JSON response
    let dietPlan;
    try {
      // Clean the response in case there are any markdown formatting
      const cleanedText = generatedText.replace(/```json\n?/, '').replace(/```\n?$/, '').trim();
      dietPlan = JSON.parse(cleanedText);
    } catch (parseError) {
      console.error('Failed to parse JSON response:', generatedText);
      throw new Error('Failed to parse AI response as JSON');
    }

    return new Response(JSON.stringify({ 
      success: true, 
      dietPlan,
      metadata: {
        patientName: patient.name,
        duration,
        generatedAt: new Date().toISOString()
      }
    }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });

  } catch (error) {
    console.error('Error in generate-diet-plan function:', error);
    return new Response(JSON.stringify({ 
      success: false, 
      error: error.message,
      details: 'Please check the function logs for more information'
    }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});