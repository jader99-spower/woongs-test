import Link from 'next/link';
import { notFound } from 'next/navigation';
import { supabase } from '@/lib/supabase';

export const dynamic = 'force-dynamic';

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const { data: notice } = await supabase.from('notices').select('title').eq('id', id).single();
  return notice
    ? { title: `${notice.title} | 삼천리 동아리 공지사항` }
    : { title: '공지사항을 찾을 수 없습니다.' };
}

export default async function NoticeDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const { data: notice } = await supabase.from('notices').select('*').eq('id', id).single();

  if (!notice) notFound();

  return (
    <div className="bg-gray-light min-h-full">
      <div className="bg-white border-b border-gray-100">
        <div className="max-w-4xl mx-auto px-6 py-10">
          <Link
            href="/notices"
            className="inline-flex items-center gap-1 text-sm text-gray-400 hover:text-primary transition-colors mb-6"
          >
            ← 공지사항 목록으로
          </Link>

          <div className="flex items-center gap-2 mb-3">
            {notice.important ? (
              <span className="inline-block bg-red-100 text-red-600 text-xs font-semibold px-2 py-0.5 rounded">
                중요
              </span>
            ) : null}
          </div>
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900 leading-snug mb-4">
            {notice.title}
          </h1>
          <p className="text-sm text-gray-400">
            {notice.author} · {notice.date}
          </p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-6 py-10">
        <div className="bg-white rounded-2xl shadow-sm p-8">
          <div className="prose prose-gray max-w-none">
            {notice.content.split('\n').map((line: string, i: number) =>
              line.trim() === '' ? (
                <br key={i} />
              ) : (
                <p key={i} className="text-gray-700 leading-relaxed my-1">
                  {line}
                </p>
              ),
            )}
          </div>
        </div>

        <div className="mt-6 flex justify-center">
          <Link
            href="/notices"
            className="inline-flex items-center justify-center bg-white border border-gray-200 text-gray-600 font-medium px-6 py-3 rounded-full hover:border-primary hover:text-primary transition-colors"
          >
            목록으로 돌아가기
          </Link>
        </div>
      </div>
    </div>
  );
}
