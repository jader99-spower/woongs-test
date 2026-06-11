import Link from 'next/link';
import { createSupabaseServerClient } from '@/lib/supabase-server';
import { signOut } from '@/app/auth/actions';

export default async function Header() {
  let user = null;
  try {
    const supabase = await createSupabaseServerClient();
    const { data } = await supabase.auth.getUser();
    user = data.user;
  } catch {
    // 세션 조회 실패 시 비로그인 상태로 표시
  }

  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2 shrink-0">
          <span className="text-primary font-bold text-xl tracking-tight">삼천리</span>
          <span className="text-gray-brand text-sm font-medium">동아리</span>
        </Link>

        <nav className="hidden md:flex items-center gap-8">
          <Link
            href="/"
            className="text-sm text-gray-600 hover:text-primary transition-colors font-medium"
          >
            홈
          </Link>
          <Link
            href="/clubs"
            className="text-sm text-gray-600 hover:text-primary transition-colors font-medium"
          >
            동아리 목록
          </Link>
          <Link
            href="/board"
            className="text-sm text-gray-600 hover:text-primary transition-colors font-medium"
          >
            게시판
          </Link>
          <Link
            href="/notices"
            className="text-sm text-gray-600 hover:text-primary transition-colors font-medium"
          >
            공지사항
          </Link>
        </nav>

        <div className="flex items-center gap-3 shrink-0">
          {user ? (
            <>
              <span className="hidden sm:block text-sm text-gray-500 max-w-[140px] truncate">
                {user.email}
              </span>
              <form action={signOut}>
                <button
                  type="submit"
                  className="text-sm text-gray-500 hover:text-gray-800 transition-colors font-medium border border-gray-200 px-4 py-2 rounded-full hover:border-gray-300"
                >
                  로그아웃
                </button>
              </form>
            </>
          ) : (
            <>
              <Link
                href="/login"
                className="text-sm text-gray-600 hover:text-primary transition-colors font-medium"
              >
                로그인
              </Link>
              <Link
                href="/clubs"
                className="bg-primary text-white text-sm px-5 py-2 rounded-full hover:bg-primary-dark transition-colors font-medium"
              >
                동아리 찾기
              </Link>
            </>
          )}
        </div>
      </div>
    </header>
  );
}
