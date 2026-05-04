export type Role = "user" | "admin";

export interface Profile {
  id: string;
  role: Role;
  created_at: string;
}

export interface Subject {
  id: string;
  slug: string;
  title: string;
  description: string | null;
  order_index: number;
  created_at: string;
}

export interface Note {
  id: string;
  subject_id: string;
  title: string;
  content: string;
  pdf_url: string | null;
  order_index: number;
  published: boolean;
  created_at: string;
  updated_at: string;
}

export interface Exercise {
  id: string;
  subject_id: string;
  title: string;
  statement: string;
  solution: string | null;
  show_solution: boolean;
  pdf_url: string | null; // <--- AÑADIR ESTA
  order_index: number;
  created_at: string;
  updated_at: string; // <--- AÑADIR ESTA TAMBIÉN
}

// DB row types for Supabase responses
export type SubjectRow = Subject;
export type NoteRow = Note;
export type ExerciseRow = Exercise;
