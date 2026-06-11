import type { Metadata } from 'next';
import BoardList from '@/components/board/BoardList';

export const metadata: Metadata = {
  title: '게시판 | 삼천리 동아리',
  description: '삼천리 동아리 커뮤니티 자유 게시판입니다.',
};

export default function BoardPage() {
  return <BoardList />;
}
