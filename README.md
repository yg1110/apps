# Loopin

습관·루틴을 매일 체크하고 연속 기록(streak)을 쌓으며, 원할 때 인증을 **공개 피드**에 올려 서로의 기록을 함께 보는 앱.

- 개인 습관 기록은 **기기 로컬(SQLite)** 에 저장 (local-first)
- 사용자가 올린 인증(post)만 백엔드로 전송되어 **공개 피드**에 노출

## 저장소 구조
```
loopin/
├─ frontend/   # Expo 앱 (React Native, TypeScript)
│   ├─ app/        # expo-router 라우트 (예정)
│   ├─ src/        # 컴포넌트·훅·lib·유틸 (예정)
│   └─ assets/
├─ backend/    # Supabase (Postgres + Auth + RLS + Realtime + Storage)
│   └─ migrations/
└─ docs/
    └─ PLAN.md   # 기획·구현 상세 문서
```

## 개발
```bash
cd frontend
npm install
npx expo start   # i(iOS) / a(Android) / w(web)
```

## 문서
- 전체 기획·요구사항·단계별 구현 계획: [`docs/PLAN.md`](docs/PLAN.md)
- 백엔드 설계: [`backend/README.md`](backend/README.md)

> 현재 상태: 프로젝트 이름·폴더 구조 확정, 기능 구현 대기 중.
