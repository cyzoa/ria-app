export type SpeechStyle = "formal" | "casual";

export type TaskPriority = "low" | "medium" | "high";
export type TaskStatus = "todo" | "doing" | "done" | "archived";

export interface User {
  id: string;
  preferred_name: string | null;
  nickname: string | null;
  speech_style: SpeechStyle | null;
  timezone: string | null;
  wake_time: string | null;
  sleep_time: string | null;
  created_at: string;
}

export interface Project {
  id: string;
  user_id: string;
  name: string;
  color: string;
  created_at: string;
}

export interface Task {
  id: string;
  user_id: string;
  project_id: string | null;
  title: string;
  priority: TaskPriority;
  status: TaskStatus;
  is_top3: boolean;
  due_date: string | null;
  created_at: string;
  completed_at: string | null;
}

export interface InboxItem {
  id: string;
  user_id: string;
  content: string;
  converted_to_task: boolean;
  created_at: string;
}

export interface Note {
  id: string;
  user_id: string;
  content: string;
  created_at: string;
}

export interface Discovery {
  id: string;
  user_id: string;
  title: string;
  content: string;
  tags: string[];
  created_at: string;
}

export interface EveningReview {
  id: string;
  user_id: string;
  date: string;
  did_well: string | null;
  learned: string | null;
  tomorrow_plan: string | null;
  created_at: string;
}

export interface NorthStar {
  id: string;
  user_id: string;
  date: string;
  title: string;
  created_at: string;
}

export interface Database {
  public: {
    Tables: {
      users: { Row: User; Insert: Partial<User> & { id: string }; Update: Partial<User> };
      projects: { Row: Project; Insert: Omit<Project, "id" | "created_at"> & { id?: string }; Update: Partial<Project> };
      tasks: { Row: Task; Insert: Omit<Task, "id" | "created_at"> & { id?: string }; Update: Partial<Task> };
      inbox_items: { Row: InboxItem; Insert: Omit<InboxItem, "id" | "created_at"> & { id?: string }; Update: Partial<InboxItem> };
      notes: { Row: Note; Insert: Omit<Note, "id" | "created_at"> & { id?: string }; Update: Partial<Note> };
      discoveries: { Row: Discovery; Insert: Omit<Discovery, "id" | "created_at"> & { id?: string }; Update: Partial<Discovery> };
      evening_reviews: { Row: EveningReview; Insert: Omit<EveningReview, "id" | "created_at"> & { id?: string }; Update: Partial<EveningReview> };
      north_stars: { Row: NorthStar; Insert: Omit<NorthStar, "id" | "created_at"> & { id?: string }; Update: Partial<NorthStar> };
    };
  };
}
