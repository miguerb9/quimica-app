export type Role = "user" | "admin";

export interface Profile {
  id: string;
  role: Role;
  created_at: string;
}

export type CourseLevel = "1bach" | "2bach";

export type Asignatura =
  | "quimica"
  | "fisica"
  | "biologia"
  | "geologia"
  | "matematicas"
  | "otra";

export const ASIGNATURAS: { value: Asignatura; label: string }[] = [
  { value: "quimica",     label: "Química" },
  { value: "fisica",      label: "Física" },
  { value: "biologia",    label: "Biología" },
  { value: "geologia",    label: "Geología" },
  { value: "matematicas", label: "Matemáticas" },
  { value: "otra",        label: "Otra" },
];

export interface Subject {
  id: string;
  slug: string;
  title: string;
  description: string | null;
  order_index: number;
  course: CourseLevel;
  asignatura: Asignatura;
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
  pdf_url: string | null;
  order_index: number;
  created_at: string;
  updated_at: string;
}

// DB row types for Supabase responses
export type SubjectRow = Subject;
export type NoteRow = Note;
export type ExerciseRow = Exercise;
