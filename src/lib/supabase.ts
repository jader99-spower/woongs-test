import { createClient } from '@supabase/supabase-js';
import { createBrowserClient } from '@supabase/ssr';

// 빌드 시 env가 없어도 클라이언트 생성이 실패하지 않도록 플레이스홀더 사용
// 실제 API 호출은 런타임(요청 시점)에만 발생하므로 안전
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://placeholder.supabase.co';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'placeholder-anon-key';

// 서버/클라이언트 공용 데이터 조회용
export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// 로그인 등 auth 전용 브라우저 클라이언트
export function createSupabaseBrowserClient() {
  return createBrowserClient(supabaseUrl, supabaseAnonKey);
}
