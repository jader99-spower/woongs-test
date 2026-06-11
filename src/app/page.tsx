import Link from 'next/link';
import ClubCard from '@/components/ClubCard';
import { supabase } from '@/lib/supabase';

export default async function Home() {
  const { data: clubs } = await supabase.from('clubs').select('*').order('created_at');
  const featuredClubs = (clubs ?? []).slice(0, 3);

  return (
    <>
      {/* 히어로 섹션 — 배경 사진 + 브랜드 오버레이 */}
      <section className="relative text-white overflow-hidden">
        {/* 배경 사진 */}
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage:
              'url(https://images.unsplash.com/photo-1529156069898-49953e39b3ac?auto=format&fit=crop&w=1400&q=80)',
          }}
        />
        {/* 브랜드 컬러 오버레이 */}
        <div className="absolute inset-0 bg-primary/75" />
        {/* 하단 흰색 페이드 — 아래 섹션과 자연스럽게 연결 */}
        <div className="absolute bottom-0 left-0 right-0 h-36 bg-gradient-to-b from-transparent to-white pointer-events-none" />

        {/* 콘텐츠 */}
        <div className="relative z-10 max-w-6xl mx-auto px-6 py-20 md:py-28">
          <div className="max-w-2xl">
            <span className="inline-block bg-white/15 text-white text-sm font-medium px-3 py-1 rounded-full mb-6">
              삼천리 구성원 전용
            </span>
            <h1 className="text-4xl md:text-5xl font-bold leading-tight mb-6 text-white">
              함께하는 즐거움,
              <br />
              더 넓어지는 연결
            </h1>
            <p className="text-lg text-white/80 mb-8 leading-relaxed">
              삼천리 동아리 커뮤니티에서 관심사가 같은 동료를 만나고,
              <br className="hidden md:block" />
              일과 삶의 균형을 함께 만들어 가세요.
            </p>
            <div className="flex flex-col sm:flex-row gap-3">
              <Link
                href="/clubs"
                className="inline-flex items-center justify-center bg-primary-dark text-white font-semibold px-6 py-3 rounded-full border-2 border-white/40 hover:bg-primary transition-colors"
              >
                동아리 전체 보기
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 동아리 장려 섹션 — 히어로 페이드와 바로 연결 */}
      <section className="bg-white">
        <div className="max-w-6xl mx-auto px-6 pb-16 flex flex-col md:flex-row items-center gap-12">
          {/* 텍스트 */}
          <div className="flex-1 space-y-6">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 leading-snug">
              동아리 활동이 만드는
              <br />
              <span className="text-primary">더 나은 일상</span>
            </h2>
            <p className="text-gray-500 leading-relaxed">
              동아리는 단순한 취미 모임을 넘어, 동료와 깊이 연결되는 공간입니다.
              <br />
              함께 웃고, 배우고, 성장하는 경험이 업무에도 긍정적인 에너지를 불어넣어 줍니다.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
              {[
                { icon: '🤸', title: '건강한 몸과 마음', desc: '스트레스 해소와 체력 향상' },
                { icon: '🫂', title: '동료와의 유대감', desc: '부서를 넘어선 진정한 연결' },
                { icon: '🌱', title: '지속적인 성장', desc: '새로운 취미와 배움의 기쁨' },
              ].map((item) => (
                <div
                  key={item.title}
                  className="bg-primary-light rounded-xl p-4 flex flex-col gap-1"
                >
                  <span className="text-2xl">{item.icon}</span>
                  <p className="font-semibold text-gray-800 text-sm">{item.title}</p>
                  <p className="text-xs text-gray-500">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>

          {/* SVG 일러스트 */}
          <div className="flex-1 flex justify-center">
            <svg
              viewBox="0 0 400 320"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="w-full max-w-sm"
              aria-label="동아리 활동 일러스트"
            >
              <circle cx="200" cy="160" r="140" fill="#E8F4FB" />
              <circle cx="110" cy="110" r="22" fill="#FFD580" />
              <rect x="90" y="132" width="40" height="50" rx="8" fill="#056AA6" />
              <line x1="130" y1="148" x2="160" y2="135" stroke="#056AA6" strokeWidth="5" strokeLinecap="round" />
              <circle cx="165" cy="132" r="7" fill="#FF6B6B" />
              <circle cx="290" cy="110" r="22" fill="#FFBF9B" />
              <rect x="270" y="132" width="40" height="50" rx="8" fill="#2196F3" />
              <line x1="270" y1="148" x2="240" y2="128" stroke="#2196F3" strokeWidth="5" strokeLinecap="round" />
              <ellipse cx="234" cy="120" rx="12" ry="16" fill="none" stroke="#2196F3" strokeWidth="3" />
              <line x1="234" y1="136" x2="234" y2="150" stroke="#2196F3" strokeWidth="3" strokeLinecap="round" />
              <circle cx="200" cy="100" r="24" fill="#A8D8A8" />
              <rect x="178" y="124" width="44" height="54" rx="8" fill="#4CAF50" />
              <rect x="184" y="155" width="32" height="22" rx="3" fill="white" />
              <line x1="200" y1="155" x2="200" y2="177" stroke="#E0E0E0" strokeWidth="1.5" />
              <text x="155" y="85" fontSize="16" fill="#FF6B9D">♥</text>
              <text x="220" y="72" fontSize="12" fill="#FFB347">★</text>
              <text x="248" y="88" fontSize="14" fill="#FF6B9D">♥</text>
              <ellipse cx="200" cy="285" rx="130" ry="18" fill="#C8E6C9" />
              <ellipse cx="200" cy="280" rx="115" ry="12" fill="#A5D6A7" />
              <ellipse cx="104" cy="184" rx="12" ry="6" fill="#E0C080" />
              <ellipse cx="120" cy="184" rx="12" ry="6" fill="#E0C080" />
              <ellipse cx="284" cy="184" rx="12" ry="6" fill="#FFBF9B" />
              <ellipse cx="300" cy="184" rx="12" ry="6" fill="#FFBF9B" />
              <ellipse cx="193" cy="180" rx="12" ry="6" fill="#90C090" />
              <ellipse cx="209" cy="180" rx="12" ry="6" fill="#90C090" />
            </svg>
          </div>
        </div>
      </section>

      {/* 추천 동아리 */}
      <section className="bg-gray-light">
        <div className="max-w-6xl mx-auto px-6 py-16">
          <div className="flex items-end justify-between mb-8">
            <div>
              <h2 className="text-2xl font-bold text-gray-900">추천 동아리</h2>
              <p className="text-gray-500 mt-1 text-sm">지금 활발하게 활동 중인 동아리를 만나보세요.</p>
            </div>
            <Link
              href="/clubs"
              className="text-sm text-primary font-medium hover:underline shrink-0"
            >
              전체 보기 →
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {featuredClubs.map((club) => (
              <ClubCard key={club.slug} club={club} />
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-white">
        <div className="max-w-6xl mx-auto px-6 py-16 text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-3">
            마음에 드는 동아리를 찾으셨나요?
          </h2>
          <p className="text-gray-500 mb-8">
            아직 원하는 동아리가 없다면, 새로운 동아리를 직접 만들 수 있습니다.
          </p>
          <Link
            href="/clubs"
            className="inline-flex items-center justify-center bg-primary text-white font-semibold px-8 py-3 rounded-full hover:bg-primary-dark transition-colors"
          >
            모든 동아리 보기
          </Link>
        </div>
      </section>
    </>
  );
}
