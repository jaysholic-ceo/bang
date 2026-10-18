# 지인마취통증의학과 강북점 홈페이지 — 읽기 전용 스냅샷

비공개 저장소 `jiin-clinic` 의 코드와 작업 문서를 **새 커밋으로만** 복사한 공개 스냅샷입니다. 다른 Claude 계정(claude.ai 채팅)이 clone 해서 읽고 작업을 이어받기 위한 용도입니다.

- 기준: jiin-clinic `1e598e5` (2026-10-18)
- **읽기 전용**: 여기에는 push 하지 않습니다. 수정은 Claude Code 세션이 비공개 저장소에 적용·배포한 뒤, 필요하면 이 스냅샷을 새로 만듭니다(`tools/export-bang.py`, 비공개 저장소에 있음).
- git 히스토리, 비밀값, 사진·로고 원본, DB 관련 문서는 넣지 않았습니다. 제외 목록과 이유는 `docs/BANG_EXPORT.md`.
- 문서 안에 이 스냅샷에 없는 파일(`AGENTS.md`, `docs/DB_REMOVAL_GUIDE.md` 등)이나 `<...>` 자리표시자가 나올 수 있습니다. 자리표시자의 실제 값은 사용자가 필요할 때 대화에서 줍니다.

**시작: `docs/HANDOVER_CLAUDE.md` 를 끝까지 읽으세요.**

## 실행해 보기

```bash
npm install
npm run dev      # http://localhost:3000
npm run lint
npm run build    # 환경변수 없이 빌드됩니다. 분석 ID 는 선택(.env.example)
```

라이브(아직 개발 서버): https://jiin-clinic-ten.vercel.app

스택: Next.js 16(App Router) · React 19 · TypeScript · Tailwind v4 · framer-motion · Playwright. DB 없는 정적 사이트(`src/data/*`).
