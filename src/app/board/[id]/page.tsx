import PostDetail from '@/components/board/PostDetail';

export const dynamic = 'force-dynamic';

export default async function BoardPostPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  return <PostDetail id={id} />;
}
