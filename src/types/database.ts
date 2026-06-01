export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export interface Database {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string;
          email: string;
          full_name: string | null;
          avatar_url: string | null;
          plan: "free" | "pro" | "team";
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id: string;
          email: string;
          full_name?: string | null;
          avatar_url?: string | null;
          plan?: "free" | "pro" | "team";
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          email?: string;
          full_name?: string | null;
          avatar_url?: string | null;
          plan?: "free" | "pro" | "team";
          updated_at?: string;
        };
      };
      projects: {
        Row: {
          id: string;
          user_id: string;
          name: string;
          description: string | null;
          status: "draft" | "active" | "archived";
          thumbnail_url: string | null;
          file_url: string | null;
          file_size: number | null;
          page_count: number | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          name: string;
          description?: string | null;
          status?: "draft" | "active" | "archived";
          thumbnail_url?: string | null;
          file_url?: string | null;
          file_size?: number | null;
          page_count?: number | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          name?: string;
          description?: string | null;
          status?: "draft" | "active" | "archived";
          thumbnail_url?: string | null;
          file_url?: string | null;
          file_size?: number | null;
          page_count?: number | null;
          updated_at?: string;
        };
      };
      annotations: {
        Row: {
          id: string;
          project_id: string;
          page_number: number;
          type: string;
          data: Json;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          project_id: string;
          page_number: number;
          type: string;
          data: Json;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          data?: Json;
          updated_at?: string;
        };
      };
    };
    Views: Record<string, never>;
    Functions: Record<string, never>;
    Enums: {
      plan_type: "free" | "pro" | "team";
      project_status: "draft" | "active" | "archived";
    };
  };
}
