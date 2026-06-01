import { createClient } from "@/lib/supabase/client";
import { Project, CreateProjectInput } from "@/types";

export const projectsService = {
  async getProjects(userId: string): Promise<{ data: Project[]; error: unknown }> {
    const supabase = createClient();
    const { data, error } = await supabase
      .from("projects")
      .select("*")
      .eq("user_id", userId)
      .order("updated_at", { ascending: false });
    return { data: data ?? [], error };
  },

  async getProject(projectId: string): Promise<{ data: Project | null; error: unknown }> {
    const supabase = createClient();
    const { data, error } = await supabase
      .from("projects")
      .select("*")
      .eq("id", projectId)
      .single();
    return { data, error };
  },

  async createProject(
    userId: string,
    input: CreateProjectInput
  ): Promise<{ data: Project | null; error: unknown }> {
    const supabase = createClient();
    const { data, error } = await supabase
      .from("projects")
      .insert({
        user_id: userId,
        name: input.name,
        description: input.description,
        status: "draft",
      })
      .select()
      .single();
    return { data, error };
  },

  async updateProject(
    projectId: string,
    updates: Partial<Project>
  ): Promise<{ data: Project | null; error: unknown }> {
    const supabase = createClient();
    const { data, error } = await supabase
      .from("projects")
      .update({ ...updates, updated_at: new Date().toISOString() })
      .eq("id", projectId)
      .select()
      .single();
    return { data, error };
  },

  async deleteProject(projectId: string): Promise<{ error: unknown }> {
    const supabase = createClient();
    const { error } = await supabase
      .from("projects")
      .delete()
      .eq("id", projectId);
    return { error };
  },

  async searchProjects(
    userId: string,
    query: string
  ): Promise<{ data: Project[]; error: unknown }> {
    const supabase = createClient();
    const { data, error } = await supabase
      .from("projects")
      .select("*")
      .eq("user_id", userId)
      .ilike("name", `%${query}%`)
      .order("updated_at", { ascending: false });
    return { data: data ?? [], error };
  },

  async uploadPdf(
    userId: string,
    file: File
  ): Promise<{ url: string | null; error: unknown }> {
    const supabase = createClient();
    const fileName = `${userId}/${Date.now()}-${file.name}`;
    const { error } = await supabase.storage
      .from("pdfs")
      .upload(fileName, file, { cacheControl: "3600", upsert: false });

    if (error) return { url: null, error };

    const { data } = supabase.storage.from("pdfs").getPublicUrl(fileName);
    return { url: data.publicUrl, error: null };
  },
};
