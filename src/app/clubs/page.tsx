import Link from 'next/link';
import ClubCard from '@/components/ClubCard';
import { supabase } from '@/lib/supabase';
import type { ClubCategory } from '@/data/clubs';

const CATEGORIES: Array<ClubCategory | '전체'> = ['전체', '스포츠', '문화', '사회공헌'];

export default async function ClubsPage({
  searchParams,
}: {
  searchParams: Promise<{ category?: string }>;
}) {
  const { category } = await searchParams;
  const activeCategory: ClubCategory | '전체' = (category as ClubCategory | undefined) ?? '전체';

  const { data: clubs } = await supabase.from('clubs').select('*').order('created_at');
  const allClubs = clubs ?? [];

  const filtered =
    activeCategory === '전체' ? allClubs : allClubs.filter((c) => c.category === activeCategory);

  return (
    <div className="bg-gray-light min-h-full">
      {/* 페이지 헤더 */}
      <div className="bg-white border-b border-gray-100">
        <div className="max-w-6xl mx-auto px-6 py-10">
          <h1 className="text-3xl font-bold text-gray-900">동아리 목록</h1>
          <p className="text-gray-500 mt-2">
            삼천리 구성원들이 만들어가는 {allClubs.length}개의 동아리를 만나보세요.
          </p>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-6 py-10">
        {/* 카테고리 필터 */}
        <div className="flex flex-wrap gap-2 mb-8">
          {CATEGORIES.map((cat) => (
            <Link
              key={cat}
              href={cat === '전체' ? '/clubs' : `/clubs?category=${cat}`}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                activeCategory === cat
                  ? 'bg-primary text-white'
                  : 'bg-white text-gray-600 border border-gray-200 hover:border-primary hover:text-primary'
              }`}
            >
              {cat}
              {cat !== '전체' && (
                <span className="ml-1.5 text-xs opacity-70">
                  {allClubs.filter((c) => c.category === cat).length}
                </span>
              )}
            </Link>
          ))}
        </div>

        {/* 동아리 그리드 */}
        {filtered.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map((club) => (
              <ClubCard key={club.slug} club={club} />
            ))}
          </div>
        ) : (
          <div className="text-center py-20 text-gray-400">
            <p className="text-4xl mb-4">🔍</p>
            <p className="font-medium">해당 카테고리의 동아리가 없습니다.</p>
          </div>
        )}
      </div>
    </div>
  );
}
