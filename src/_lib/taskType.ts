export interface taskType {
  id: number;
  Title: string;
  Description: string;
  Priority: string;
  Image: string;
  State: "todo" | "doing" | "done";
}
