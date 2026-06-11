export type ClubCategory = '스포츠' | '문화' | '사회공헌';

export interface Club {
  id: string;
  slug: string;
  name: string;
  category: ClubCategory;
  icon: string;
  description: string;
  long_description: string;
  member_count: number;
  meeting_schedule: string;
  activities: string[];
  contact: string;
  created_at?: string;
}
