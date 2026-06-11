export type PostCategory = '자유' | '질문' | '후기' | '모집';

export interface Post {
  id: string;
  title: string;
  content: string;
  author: string;
  date: string;
  category: PostCategory;
  created_at?: string;
}
