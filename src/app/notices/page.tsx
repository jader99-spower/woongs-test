import Link from 'next/link';
import { supabase } from '@/lib/supabase';

export const metadata = {
  title: '공지사항 | 삼천리 동아리',
  description: '삼천리 동아리 커뮤니티 공지사항입니다.',
};

export default async function NoticesPage() {
  const { data: notices } = await supabase
    .from('notices')
    .select('*')
    .order('date', { ascending: false });
  const allNotices = notices ?? [];

  return (
    <div className="bg-gray-light min-h-full">
      <div className="bg-white border-b border-gray-100">
        <div className="max-w-4xl mx-auto px-6 py-10">
          <h1 className="text-3xl font-bold text-gray-900">공지사항</h1>
          <p className="text-gray-500 mt-2">삼천리 동아리 커뮤니티의 새로운 소식을 확인하세요.</p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-6 py-10">
        <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
          {allNotices.length > 0 ? (
            <ul className="divide-y divide-gray-100">
              {allNotices.map((notice, index) => (
                <li key={notice.id}>
                  <Link
                    href={`/notices/${notice.id}`}
                    className="flex items-center gap-4 px-6 py-5 hover:bg-gray-light transition-colors group"
                  >
                    <span className="text-gray-400 text-sm w-8 shrink-0 text-center">
                      {allNotices.length - index}
                    </span>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        {notice.important ? (
                          <span className="inline-block bg-red-100 text-red-600 text-xs font-semibold px-2 py-0.5 rounded">
                            중요
                          </span>
                        ) : null}
                        <span className="font-medium text-gray-900 group-hover:text-primary transition-colors truncate">
                          {notice.title}
                        </span>
                      </div>
                      <p className="text-xs text-gray-400">
                        {notice.author} · {notice.date}
                      </p>
                    </div>
                    <span className="text-gray-300 text-sm shrink-0">→</span>
                  </Link>
                </li>
              ))}
            </ul>
          ) : (
            <div className="text-center py-20 text-gray-400">
              <p className="text-4xl mb-4">📋</p>
              <p className="font-medium">등록된 공지사항이 없습니다.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
