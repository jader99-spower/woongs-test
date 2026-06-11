import type { Metadata } from 'next';
import WriteForm from '@/components/board/WriteForm';

export const metadata: Metadata = {
  title: '글쓰기 | 삼천리 동아리 게시판',
};

export default function WritePage() {
  return <WriteForm />;
}
