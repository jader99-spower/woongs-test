import Link from 'next/link';
import { notFound } from 'next/navigation';
import { supabase } from '@/lib/supabase';

export async function generateStaticParams() {
  const { data: clubs } = await supabase.from('clubs').select('slug');
  return (clubs ?? []).map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const { data: club } = await supabase.from('clubs').select('name').eq('slug', slug).single();
  return club
    ? { title: `${club.name} | 삼천리 동아리` }
    : { title: '동아리를 찾을 수 없습니다.' };
}

export default async function ClubDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const { data: club } = await supabase.from('clubs').select('*').eq('slug', slug).single();

  if (!club) notFound();

  const categoryColor =
    club.category === '스포츠'
      ? 'bg-blue-100 text-blue-700'
      : club.category === '문화'
        ? 'bg-purple-100 text-purple-700'
        : 'bg-green-100 text-green-700';

  return (
    <div className="bg-gray-light min-h-full">
      {/* 상단 헤더 */}
      <div className="bg-white border-b border-gray-100">
        <div className="max-w-4xl mx-auto px-6 py-10">
          <Link
            href="/clubs"
            className="inline-flex items-center gap-1 text-sm text-gray-400 hover:text-primary transition-colors mb-6"
          >
            ← 동아리 목록으로
          </Link>

          <div className="flex items-start gap-5">
            <span className="text-6xl leading-none">{club.icon}</span>
            <div>
              <div className="flex items-center gap-3 mb-2">
                <h1 className="text-3xl font-bold text-gray-900">{club.name}</h1>
                <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${categoryColor}`}>
                  {club.category}
                </span>
              </div>
              <p className="text-gray-500 leading-relaxed">{club.description}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-6 py-10 grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* 메인 콘텐츠 */}
        <div className="md:col-span-2 space-y-8">
          <section className="bg-white rounded-2xl p-6 shadow-sm">
            <h2 className="font-bold text-lg text-gray-900 mb-3">동아리 소개</h2>
            <p className="text-gray-600 leading-relaxed">{club.long_description}</p>
          </section>

          <section className="bg-white rounded-2xl p-6 shadow-sm">
            <h2 className="font-bold text-lg text-gray-900 mb-4">주요 활동</h2>
            <ul className="space-y-2">
              {(club.activities ?? []).map((activity: string) => (
                <li key={activity} className="flex items-center gap-3 text-gray-600">
                  <span className="w-1.5 h-1.5 rounded-full bg-primary shrink-0" />
                  {activity}
                </li>
              ))}
            </ul>
          </section>
        </div>

        {/* 사이드바 */}
        <aside className="space-y-4">
          <div className="bg-white rounded-2xl p-6 shadow-sm space-y-4">
            <h2 className="font-bold text-gray-900">모임 정보</h2>
            <div className="space-y-3 text-sm">
              <div className="flex items-start gap-3">
                <span className="text-lg">👥</span>
                <div>
                  <p className="text-gray-400 text-xs mb-0.5">현재 회원</p>
                  <p className="font-semibold text-gray-800">{club.member_count}명</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <span className="text-lg">📅</span>
                <div>
                  <p className="text-gray-400 text-xs mb-0.5">정기 모임</p>
                  <p className="font-semibold text-gray-800">{club.meeting_schedule}</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <span className="text-lg">✉️</span>
                <div>
                  <p className="text-gray-400 text-xs mb-0.5">문의</p>
                  <p className="font-semibold text-gray-800 break-all">{club.contact}</p>
                </div>
              </div>
            </div>
          </div>

          <a
            href={`mailto:${club.contact}`}
            className="block w-full bg-primary text-white text-center font-semibold py-3 rounded-full hover:bg-primary-dark transition-colors"
          >
            가입 문의하기
          </a>

          <Link
            href="/clubs"
            className="block w-full bg-white text-gray-600 border border-gray-200 text-center font-medium py-3 rounded-full hover:border-primary hover:text-primary transition-colors"
          >
            다른 동아리 보기
          </Link>
        </aside>
      </div>
    </div>
  );
}
