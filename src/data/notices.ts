export interface Notice {
  id: string;
  title: string;
  content: string;
  author: string;
  date: string;
  important: boolean;
  created_at?: string;
}
