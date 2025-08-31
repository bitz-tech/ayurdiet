export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "13.0.4"
  }
  public: {
    Tables: {
      diet_charts: {
        Row: {
          adherence_notes: string | null
          created_at: string
          daily_targets: Json | null
          description: string | null
          end_date: string | null
          id: string
          is_active: boolean | null
          meals: Json
          name: string
          patient_id: string
          practitioner_id: string
          special_instructions: string | null
          start_date: string
          updated_at: string
        }
        Insert: {
          adherence_notes?: string | null
          created_at?: string
          daily_targets?: Json | null
          description?: string | null
          end_date?: string | null
          id?: string
          is_active?: boolean | null
          meals: Json
          name: string
          patient_id: string
          practitioner_id: string
          special_instructions?: string | null
          start_date: string
          updated_at?: string
        }
        Update: {
          adherence_notes?: string | null
          created_at?: string
          daily_targets?: Json | null
          description?: string | null
          end_date?: string | null
          id?: string
          is_active?: boolean | null
          meals?: Json
          name?: string
          patient_id?: string
          practitioner_id?: string
          special_instructions?: string | null
          start_date?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "diet_charts_patient_id_fkey"
            columns: ["patient_id"]
            isOneToOne: false
            referencedRelation: "patients"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "diet_charts_practitioner_id_fkey"
            columns: ["practitioner_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      foods: {
        Row: {
          best_time_to_consume: string[] | null
          calories: number | null
          carbohydrates: number | null
          category: string
          contraindications: string[] | null
          created_at: string
          description: string | null
          digestibility: Database["public"]["Enums"]["digestibility"] | null
          dosha_effects: Json | null
          fat: number | null
          fiber: number | null
          id: string
          minerals: Json | null
          name: string
          name_sanskrit: string | null
          prabhava: string | null
          protein: number | null
          rasas: Database["public"]["Enums"]["rasa_type"][] | null
          seasonal_suitability: string[] | null
          sub_category: string | null
          updated_at: string
          vipaka: string | null
          virya: Database["public"]["Enums"]["virya_type"] | null
          vitamins: Json | null
        }
        Insert: {
          best_time_to_consume?: string[] | null
          calories?: number | null
          carbohydrates?: number | null
          category: string
          contraindications?: string[] | null
          created_at?: string
          description?: string | null
          digestibility?: Database["public"]["Enums"]["digestibility"] | null
          dosha_effects?: Json | null
          fat?: number | null
          fiber?: number | null
          id?: string
          minerals?: Json | null
          name: string
          name_sanskrit?: string | null
          prabhava?: string | null
          protein?: number | null
          rasas?: Database["public"]["Enums"]["rasa_type"][] | null
          seasonal_suitability?: string[] | null
          sub_category?: string | null
          updated_at?: string
          vipaka?: string | null
          virya?: Database["public"]["Enums"]["virya_type"] | null
          vitamins?: Json | null
        }
        Update: {
          best_time_to_consume?: string[] | null
          calories?: number | null
          carbohydrates?: number | null
          category?: string
          contraindications?: string[] | null
          created_at?: string
          description?: string | null
          digestibility?: Database["public"]["Enums"]["digestibility"] | null
          dosha_effects?: Json | null
          fat?: number | null
          fiber?: number | null
          id?: string
          minerals?: Json | null
          name?: string
          name_sanskrit?: string | null
          prabhava?: string | null
          protein?: number | null
          rasas?: Database["public"]["Enums"]["rasa_type"][] | null
          seasonal_suitability?: string[] | null
          sub_category?: string | null
          updated_at?: string
          vipaka?: string | null
          virya?: Database["public"]["Enums"]["virya_type"] | null
          vitamins?: Json | null
        }
        Relationships: []
      }
      patients: {
        Row: {
          age: number
          allergies: string[] | null
          bowel_movements: number | null
          created_at: string
          dietary_habits: Json | null
          dominant_dosha: Database["public"]["Enums"]["dosha_type"] | null
          email: string | null
          gender: string
          height: number | null
          id: string
          meal_frequency: number | null
          medical_history: string | null
          name: string
          notes: string | null
          practitioner_id: string
          secondary_dosha: Database["public"]["Enums"]["dosha_type"] | null
          updated_at: string
          user_id: string | null
          water_intake: number | null
          weight: number | null
        }
        Insert: {
          age: number
          allergies?: string[] | null
          bowel_movements?: number | null
          created_at?: string
          dietary_habits?: Json | null
          dominant_dosha?: Database["public"]["Enums"]["dosha_type"] | null
          email?: string | null
          gender: string
          height?: number | null
          id?: string
          meal_frequency?: number | null
          medical_history?: string | null
          name: string
          notes?: string | null
          practitioner_id: string
          secondary_dosha?: Database["public"]["Enums"]["dosha_type"] | null
          updated_at?: string
          user_id?: string | null
          water_intake?: number | null
          weight?: number | null
        }
        Update: {
          age?: number
          allergies?: string[] | null
          bowel_movements?: number | null
          created_at?: string
          dietary_habits?: Json | null
          dominant_dosha?: Database["public"]["Enums"]["dosha_type"] | null
          email?: string | null
          gender?: string
          height?: number | null
          id?: string
          meal_frequency?: number | null
          medical_history?: string | null
          name?: string
          notes?: string | null
          practitioner_id?: string
          secondary_dosha?: Database["public"]["Enums"]["dosha_type"] | null
          updated_at?: string
          user_id?: string | null
          water_intake?: number | null
          weight?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "patients_practitioner_id_fkey"
            columns: ["practitioner_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      profiles: {
        Row: {
          created_at: string
          email: string
          full_name: string | null
          id: string
          license_number: string | null
          phone: string | null
          role: Database["public"]["Enums"]["user_role"]
          specialization: string | null
          updated_at: string
          user_id: string
        }
        Insert: {
          created_at?: string
          email: string
          full_name?: string | null
          id?: string
          license_number?: string | null
          phone?: string | null
          role?: Database["public"]["Enums"]["user_role"]
          specialization?: string | null
          updated_at?: string
          user_id: string
        }
        Update: {
          created_at?: string
          email?: string
          full_name?: string | null
          id?: string
          license_number?: string | null
          phone?: string | null
          role?: Database["public"]["Enums"]["user_role"]
          specialization?: string | null
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      recipes: {
        Row: {
          cook_time: number | null
          created_at: string
          created_by: string | null
          description: string | null
          dominant_rasas: Database["public"]["Enums"]["rasa_type"][] | null
          dosha_suitability: Json | null
          id: string
          ingredients: Json
          instructions: string[] | null
          meal_type: string[] | null
          name: string
          prep_time: number | null
          servings: number | null
          total_calories: number | null
          total_carbs: number | null
          total_fat: number | null
          total_protein: number | null
          updated_at: string
        }
        Insert: {
          cook_time?: number | null
          created_at?: string
          created_by?: string | null
          description?: string | null
          dominant_rasas?: Database["public"]["Enums"]["rasa_type"][] | null
          dosha_suitability?: Json | null
          id?: string
          ingredients: Json
          instructions?: string[] | null
          meal_type?: string[] | null
          name: string
          prep_time?: number | null
          servings?: number | null
          total_calories?: number | null
          total_carbs?: number | null
          total_fat?: number | null
          total_protein?: number | null
          updated_at?: string
        }
        Update: {
          cook_time?: number | null
          created_at?: string
          created_by?: string | null
          description?: string | null
          dominant_rasas?: Database["public"]["Enums"]["rasa_type"][] | null
          dosha_suitability?: Json | null
          id?: string
          ingredients?: Json
          instructions?: string[] | null
          meal_type?: string[] | null
          name?: string
          prep_time?: number | null
          servings?: number | null
          total_calories?: number | null
          total_carbs?: number | null
          total_fat?: number | null
          total_protein?: number | null
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "recipes_created_by_fkey"
            columns: ["created_by"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      digestibility: "easy" | "moderate" | "difficult"
      dosha_type: "vata" | "pitta" | "kapha"
      rasa_type:
        | "sweet"
        | "sour"
        | "salty"
        | "bitter"
        | "pungent"
        | "astringent"
      user_role: "practitioner" | "patient" | "admin"
      virya_type: "hot" | "cold"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {
      digestibility: ["easy", "moderate", "difficult"],
      dosha_type: ["vata", "pitta", "kapha"],
      rasa_type: ["sweet", "sour", "salty", "bitter", "pungent", "astringent"],
      user_role: ["practitioner", "patient", "admin"],
      virya_type: ["hot", "cold"],
    },
  },
} as const
