# my-app

Next.js 16 프로젝트 (App Router, TypeScript, Tailwind CSS v4)

## 기술 스택

- **Next.js** 16.2 — App Router
- **React** 19
- **TypeScript** 5
- **Tailwind CSS** 4
- **ESLint** 9

## 개발 명령어

```bash
npm run dev      # 개발 서버 (http://localhost:3000)
npm run build    # 프로덕션 빌드
npm run start    # 프로덕션 서버 실행
npm run lint     # ESLint 검사
```

## 프로젝트 구조

```
src/
  app/
    layout.tsx   # 루트 레이아웃
    page.tsx     # 홈 페이지
    globals.css  # 전역 스타일 (Tailwind 포함)
public/          # 정적 파일
```

## 주요 규칙

- 모든 컴포넌트는 `src/app/` 하위에 위치
- 서버 컴포넌트 기본, 클라이언트 필요 시 `"use client"` 명시
- 경로 별칭: `@/*` → `src/*`
- 데이터 패칭은 서버 컴포넌트에서 수행 (워터폴 방지)
- Tailwind CSS v4 — `@import "tailwindcss"` 방식 사용 (`tailwind.config.js` 불필요)
