// Mock data for AyurDiet application

export interface MockPatient {
  id: string;
  name: string;
  age: number;
  gender: 'male' | 'female' | 'other';
  weight: number;
  height: number;
  dominant_dosha: 'vata' | 'pitta' | 'kapha';
  secondary_dosha: 'vata' | 'pitta' | 'kapha';
  medical_history: string;
  allergies: string[];
  notes: string;
  meal_frequency: number;
  water_intake: number;
  bowel_movements: number;
  email: string;
  created_at: string;
}

export interface MockActivity {
  id: string;
  type: 'patient_added' | 'diet_created' | 'consultation' | 'review';
  title: string;
  description: string;
  time: string;
  status: 'completed' | 'pending' | 'scheduled';
}

export interface MockDietPlan {
  id: string;
  name: string;
  description: string;
  start_date: string;
  end_date: string;
  is_active: boolean;
  patient_name: string;
  created_at: string;
  meals: {
    breakfast: string[];
    lunch: string[];
    dinner: string[];
    snacks: string[];
  };
  special_instructions: string;
}

// Mock patients data
export const mockPatients: MockPatient[] = [
  {
    id: "1",
    name: "Ijharul Haque",
    age: 21,
    gender: "male",
    weight: 68.5,
    height: 175,
    dominant_dosha: "pitta",
    secondary_dosha: "vata",
    medical_history: "No major health issues. Occasional acidity.",
    allergies: ["shellfish", "peanuts"],
    notes: "Prefers vegetarian options. Active lifestyle.",
    meal_frequency: 3,
    water_intake: 2.5,
    bowel_movements: 2,
    email: "haqueijharul0786@gmail.com",
    created_at: "2024-01-15T10:30:00Z"
  },
  {
    id: "2",
    name: "Harsh Mrigank",
    age: 20,
    gender: "male",
    weight: 72.0,
    height: 180,
    dominant_dosha: "kapha",
    secondary_dosha: "pitta",
    medical_history: "Family history of diabetes. Currently healthy.",
    allergies: ["dairy"],
    notes: "Loves spicy food. Needs to increase physical activity.",
    meal_frequency: 4,
    water_intake: 3.0,
    bowel_movements: 1,
    email: "mrigankharsh@gmail.com",
    created_at: "2024-01-20T14:15:00Z"
  },
  {
    id: "3",
    name: "Aditya Kumar Gupta",
    age: 21,
    gender: "male",
    weight: 65.0,
    height: 170,
    dominant_dosha: "vata",
    secondary_dosha: "pitta",
    medical_history: "Irregular sleep pattern. Stress-related issues.",
    allergies: ["gluten"],
    notes: "Very active. Needs calming foods. Irregular eating schedule.",
    meal_frequency: 5,
    water_intake: 2.0,
    bowel_movements: 3,
    email: "aditya.rakesh.2005@gmail.com",
    created_at: "2024-01-25T09:45:00Z"
  },
  {
    id: "4",
    name: "Snehal Mishra",
    age: 18,
    gender: "female",
    weight: 55.0,
    height: 162,
    dominant_dosha: "pitta",
    secondary_dosha: "kapha",
    medical_history: "PCOS. Hormonal imbalance.",
    allergies: ["nuts"],
    notes: "Needs cooling foods. Regular exercise routine.",
    meal_frequency: 3,
    water_intake: 2.5,
    bowel_movements: 2,
    email: "snehalmishra152504@gmail.com",
    created_at: "2024-02-01T11:20:00Z"
  },
  {
    id: "5",
    name: "Shreya Kutariyar",
    age: 19,
    gender: "female",
    weight: 52.0,
    height: 158,
    dominant_dosha: "vata",
    secondary_dosha: "kapha",
    medical_history: "Low immunity. Frequent colds.",
    allergies: ["eggs"],
    notes: "Needs warming foods. Building immunity.",
    meal_frequency: 4,
    water_intake: 2.0,
    bowel_movements: 1,
    email: "shreya.kutariyar@gmail.com",
    created_at: "2024-02-05T16:30:00Z"
  },
  {
    id: "6",
    name: "Eshita",
    age: 17,
    gender: "female",
    weight: 48.0,
    height: 155,
    dominant_dosha: "kapha",
    secondary_dosha: "vata",
    medical_history: "Teenage acne. Digestive issues.",
    allergies: ["chocolate"],
    notes: "Needs detoxifying foods. Improving skin health.",
    meal_frequency: 3,
    water_intake: 2.5,
    bowel_movements: 2,
    email: "ebhattacharjya@gmail.com",
    created_at: "2024-02-10T13:45:00Z"
  }
];

// Mock recent activity data
export const mockRecentActivity: MockActivity[] = [
  {
    id: "1",
    type: "patient_added",
    title: "New Patient Registration",
    description: "Eshita has been added to your practice",
    time: "2 hours ago",
    status: "completed"
  },
  {
    id: "2",
    type: "diet_created",
    title: "Diet Chart Created",
    description: "New diet plan \"Balancing Pitta\" for Snehal Mishra",
    time: "1 day ago",
    status: "completed"
  },
  {
    id: "3",
    type: "consultation",
    title: "Follow-up Consultation",
    description: "Scheduled consultation with Aditya Kumar Gupta",
    time: "2 days ago",
    status: "scheduled"
  },
  {
    id: "4",
    type: "diet_created",
    title: "Diet Chart Created",
    description: "New diet plan \"Vata Pacifying Diet\" for Ijharul Haque",
    time: "3 days ago",
    status: "pending"
  },
  {
    id: "5",
    type: "review",
    title: "Progress Review",
    description: "Monthly review completed for Harsh Mrigank",
    time: "1 week ago",
    status: "pending"
  },
  {
    id: "6",
    type: "patient_added",
    title: "New Patient Registration",
    description: "Shreya Kutariyar has been added to your practice",
    time: "1 week ago",
    status: "completed"
  }
];

// Mock diet plans for patients
export const mockDietPlans: MockDietPlan[] = [
  {
    id: "1",
    name: "Pitta Balancing Diet",
    description: "A cooling diet plan to balance Pitta dosha and reduce inflammation",
    start_date: "2024-02-01",
    end_date: "2024-02-28",
    is_active: true,
    patient_name: "Snehal Mishra",
    created_at: "2024-02-01T10:00:00Z",
    meals: {
      breakfast: ["Oatmeal with coconut milk", "Sweet fruits (mango, pear)", "Herbal tea"],
      lunch: ["Basmati rice", "Moong dal", "Cucumber salad", "Coconut chutney"],
      dinner: ["Quinoa", "Steamed vegetables", "Mint chutney", "Warm milk with turmeric"],
      snacks: ["Coconut water", "Sweet fruits", "Nuts (almonds, walnuts)"]
    },
    special_instructions: "Avoid spicy, hot, and sour foods. Eat cooling foods and stay hydrated."
  },
  {
    id: "2",
    name: "Vata Pacifying Diet",
    description: "A grounding diet plan to calm Vata dosha and improve digestion",
    start_date: "2024-01-25",
    end_date: "2024-02-25",
    is_active: true,
    patient_name: "Ijharul Haque",
    created_at: "2024-01-25T14:30:00Z",
    meals: {
      breakfast: ["Warm oatmeal with ghee", "Banana", "Ginger tea"],
      lunch: ["Khichdi with ghee", "Steamed vegetables", "Yogurt"],
      dinner: ["Warm soup", "Soft rice", "Steamed vegetables", "Warm milk"],
      snacks: ["Warm milk with honey", "Nuts and seeds", "Sweet fruits"]
    },
    special_instructions: "Eat warm, cooked foods. Avoid cold and raw foods. Regular meal times."
  },
  {
    id: "3",
    name: "Kapha Energizing Diet",
    description: "A stimulating diet plan to balance Kapha dosha and boost energy",
    start_date: "2024-01-20",
    end_date: "2024-02-20",
    is_active: true,
    patient_name: "Harsh Mrigank",
    created_at: "2024-01-20T11:15:00Z",
    meals: {
      breakfast: ["Light breakfast with fruits", "Honey and ginger tea", "Dry fruits"],
      lunch: ["Brown rice", "Spicy vegetables", "Lentil soup", "Pickles"],
      dinner: ["Light soup", "Steamed vegetables", "Spices (ginger, pepper)"],
      snacks: ["Spicy nuts", "Fruits", "Herbal tea"]
    },
    special_instructions: "Eat light, spicy foods. Avoid heavy, oily foods. Regular exercise."
  },
  {
    id: "4",
    name: "Vata-Kapha Balancing Diet",
    description: "A balanced diet plan for Vata-Kapha constitution",
    start_date: "2024-02-05",
    end_date: "2024-03-05",
    is_active: true,
    patient_name: "Aditya Kumar Gupta",
    created_at: "2024-02-05T09:00:00Z",
    meals: {
      breakfast: ["Warm porridge", "Sweet fruits", "Herbal tea"],
      lunch: ["Rice with vegetables", "Dal", "Yogurt", "Chutney"],
      dinner: ["Light soup", "Steamed vegetables", "Warm milk"],
      snacks: ["Nuts and seeds", "Fruits", "Herbal tea"]
    },
    special_instructions: "Balanced approach - warm foods but not too heavy. Regular routine."
  },
  {
    id: "5",
    name: "Immunity Building Diet",
    description: "A diet plan to strengthen immunity and overall health",
    start_date: "2024-02-10",
    end_date: "2024-03-10",
    is_active: true,
    patient_name: "Shreya Kutariyar",
    created_at: "2024-02-10T15:45:00Z",
    meals: {
      breakfast: ["Turmeric milk", "Honey", "Nuts", "Fruits"],
      lunch: ["Rice with vegetables", "Dal", "Ginger chutney", "Yogurt"],
      dinner: ["Light soup", "Steamed vegetables", "Warm milk with turmeric"],
      snacks: ["Dry fruits", "Herbal tea", "Fruits"]
    },
    special_instructions: "Focus on immunity-boosting foods. Regular turmeric and ginger intake."
  },
  {
    id: "6",
    name: "Teen Skin Health Diet",
    description: "A diet plan to improve skin health and reduce acne",
    start_date: "2024-02-12",
    end_date: "2024-03-12",
    is_active: true,
    patient_name: "Eshita",
    created_at: "2024-02-12T12:30:00Z",
    meals: {
      breakfast: ["Oatmeal with fruits", "Green tea", "Nuts"],
      lunch: ["Brown rice", "Vegetables", "Dal", "Cucumber salad"],
      dinner: ["Light soup", "Steamed vegetables", "Warm milk"],
      snacks: ["Fruits", "Herbal tea", "Seeds"]
    },
    special_instructions: "Avoid oily and spicy foods. Drink plenty of water. Include detoxifying foods."
  }
];

// Helper function to get patient by email
export const getPatientByEmail = (email: string): MockPatient | undefined => {
  return mockPatients.find(patient => patient.email === email);
};

// Helper function to get diet plans by patient email
export const getDietPlansByPatientEmail = (email: string): MockDietPlan[] => {
  const patient = getPatientByEmail(email);
  if (!patient) return [];

  return mockDietPlans.filter(plan => plan.patient_name === patient.name);
};

// Helper function to get recent activity for a practitioner
export const getRecentActivityForPractitioner = (limit: number = 4): MockActivity[] => {
  return mockRecentActivity.slice(0, limit);
};
