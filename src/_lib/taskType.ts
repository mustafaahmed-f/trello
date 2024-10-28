export interface taskType {
  id: number;
  title: string;
  description: string;
  priority: string;
  image: string;
  state: "todo" | "doing" | "done";
  created_by: string;
  assigned_to: string;
}
