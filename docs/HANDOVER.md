# 지인 강북점 홈페이지 — 작업 인계서 (Antigravity 용)

작성 2026-10-09. 화면 코드는 `e9b44dc` 까지 반영되어 있고, 이 인계 문서는 그 바로 다음 커밋으로 올라갑니다(main 과 작업 브랜치는 같은 위치). 이 문서 하나로 지금 상태, 지킬 규칙, 이어서 할 일을 알 수 있게 썼습니다. 지금까지는 Claude(Cowork 세션 + Claude Design)로 작업했고, 이후는 Antigravity 에서 이어갑니다.

## 0. Antigravity 에서 시작하는 법

저장소 루트의 `AGENTS.md`(와 `GEMINI.md`)에 핵심 규칙이 들어 있습니다. Antigravity 가 자동으로 읽지 않는 것 같으면, 새 대화의 첫 메시지로 아래를 붙여 넣으세요.

```
이 저장소는 지인마취통증의학과 강북점 홈페이지(Next.js)입니다.
AGENTS.md 와 docs/HANDOVER.md 를 끝까지 읽고 그 규칙을 지켜 주세요.
다 읽으면 현재 상태(브랜치, git status, 마지막 커밋)를 3줄로 보고하고, 제가 시키는 일만 하세요.
```

읽는 순서: `AGENTS.md` → 이 문서 → `docs/design-handover/README.md`(결정 기록, 에셋 연결 표) → 필요할 때 `docs/design-handover/AGENT_INSTRUCTIONS.md`, `design-system/`.

## 1. 한눈에 보기

| 항목 | 내용 |
| --- | --- |
| 무엇 | 지인마취통증의학과 강북점 홈페이지 UI/UX 개편(화면 계층만) |
| 라이브 | https://jiin-clinic-ten.vercel.app (아직 개발 서버. `main` 에 push 하면 Vercel 이 1~2분 안에 자동 배포) |
| 저장소 | <비공개 저장소 jiin-clinic> (로컬 `<로컬 저장소 경로>`) |
| 브랜치 | 작업 `ui/ux-refresh-2026-10`, 배포 `main`. 2026-10-09 현재 둘 다 같은 위치(화면 코드는 `e9b44dc`, 그 위에 이 문서 커밋) |
| 스택 | Next.js 16.1.6(App Router) · React 19 · TypeScript · Tailwind v4 · framer-motion 12 · lucide-react · ESLint 9 · Playwright |
| 데이터 | DB 없음. 모두 저장소 안의 정적 데이터(`src/data/*`). 제거 경위는 `docs/DB_REMOVAL_GUIDE.md` |
| 색 | 구리 `#A8531F`, 슬레이트 `#283038`(로고 기반). 전체 토큰은 `docs/design-handover/design-system/tokens.json` |

## 2. 작업 규칙 (이전 문서와 달라진 점 포함)

전체 금지·주의 목록은 `AGENTS.md` 와 `docs/design-handover/AGENT_INSTRUCTIONS.md` §1 에 있습니다. 여기에는 헷갈리기 쉬운 것만 적습니다.

**git·배포 (2026-10-09 갱신).** 예전 지침(10-06)은 "push 금지, 커밋은 요청할 때만, main 수정 금지"였습니다. 그 뒤 Matt 이 "라이브도 개발 서버라 main 에 바로 올려도 된다"고 정했고(10-07), 이후 이 세션의 커밋 `75ce5d3`~`e9b44dc` 가 모두 그렇게 올라갔습니다. 지금 규칙은 다음과 같습니다.

- Matt 이 "적용해줘", "올려줘", "라이브에 적용" 처럼 말하면 커밋하고 `main` 에 올립니다. 말이 없으면 변경만 남기고 보고합니다.
- 올리는 방법: `git fetch` 로 `origin/main` 이 앞서 있지 않은지 확인 → `git switch main && git merge --ff-only ui/ux-refresh-2026-10 && git push origin main` → `git switch ui/ux-refresh-2026-10`. 누가 `main` 에 먼저 올렸으면(예: README 수정 `b5e1d48`) 먼저 가져와 합칩니다.
- 여전히 금지: 강제 푸시, 브랜치 삭제, `git reset --hard`, `git clean`, `git add .`/`git add -A`(아래 §8 의 추적하지 않는 폴더가 딸려 들어갑니다. 파일을 지정해서 add).
- 정식 오픈(도메인 연결) 시점부터는 `main` 직접 push 를 다시 정해야 합니다. 그때 Matt 에게 먼저 묻습니다.
- 커밋 작성자는 저장소 설정 그대로(Matt Choi). 메시지는 `feat:`, `fix:`, `style:`, `docs:`, `chore:` 로 시작하는 영어 한 줄 + 필요하면 본문.
- `docs/design-handover/TASK_PROMPTS.md` 의 "커밋은 하지 마" 문구는 그 프롬프트에서만 해당합니다.

**Matt 과 일하는 방식.**

- 한국어로 답합니다. 결과를 먼저, 짧게. "핑퐁"(질문을 여러 번 주고받기)을 싫어하므로 직접 해결하고 보고합니다.
- 다만 문구·수치·색 추가, 파일 삭제, 범위가 갈리는 요청(예: "카드를 합치자"에서 링크를 어떻게 할지)은 선택지를 짧게 물어 정합니다. 이번 세션에서도 그렇게 했습니다.
- 화면을 바꿨으면 직접 확인한 결과(빌드, 폭별 화면)를 보고합니다. 확인하지 않은 것을 확인했다고 쓰지 않습니다.
- "AI 가 만든 느낌"을 가장 경계합니다. 그라데이션, 블러, 유리, 글로우, 매끈한 3D 일러스트, 이모지 장식, 크림·순수 검정, 의미 없는 보라·청록 포인트를 쓰지 않습니다. 참고 이미지가 필요하면 Matt 이 직접 찾아 줍니다.

## 3. 로컬 실행과 확인

```bash
cd <로컬 저장소 경로>
npm install                  # 처음 한 번
npm run dev                  # http://localhost:3000 (개발 중 확인)
npm run lint                 # 기존 경고 2건(§7) 외에 새 경고가 없어야 함
npm run build                # 오류 없이 끝나야 함. 타입 검사도 여기서 됩니다
npx next start -p 3100       # build 후 프로덕션 확인용
python3 docs/design-handover/tools/capture.py   # 6개 페이지 × 1440/390 캡처 → /tmp/jiin-captures
npx playwright test          # tests/landing.spec.ts (로딩만 확인하는 간단한 e2e)
```

- 화면은 1440, 1024, 768, 390 폭에서 봅니다. 확인 항목: 글자 잘림, 가로 스크롤, 이미지 비율, 대비, 하단 고정 바(모바일·태블릿, 높이 65px)에 본문이 가리지 않는지.
- 캡처는 저장소 밖(`/tmp`)에 저장합니다. 저장소 안에 캡처 폴더를 만들지 않습니다.
- 모션이 있는 곳(수치 띠)은 "모션 줄이기" 설정에서도 한 번 봅니다.
- `npx tsc --noEmit` 은 지워진 관리자 화면을 가리키는 `.next/dev/types` 오류를 냅니다(기존 문제, 코드와 무관). 타입 확인은 `npm run build` 로 합니다.
- 지금 Matt 의 Mac 에서 `e9b44dc` 프로덕션 빌드가 3100 포트로 떠 있을 수 있습니다. 끌 때: `lsof -ti tcp:3100 | xargs kill`.
- 배포 확인: push 후 1~2분 뒤 `curl -s https://jiin-clinic-ten.vercel.app/<경로>` 에서 바꾼 문구나 파일명이 보이는지 봅니다(이 세션은 그렇게 했습니다).

## 4. 코드 지도

```
src/app/layout.tsx                  메타·폰트·헤더/푸터. metadataBase 와 openGraph.url 이 서로 다름(§7)
src/app/page.tsx, HomeClient.tsx    홈: 1 히어로(영상 + 정지 이미지 바탕) → 1-b 부위별 질환 바로가기 →
                                    2 철학 → 수치 띠(StatsBand) → 3 언론·활동 → 4 연혁·후기
src/app/intro/                      본원 소개, 의료진 3인 상세(doctor-choi / doctor-lee / doctor-jung)
src/app/medical/                    주요 질환 목록(MedicalClient) + [slug] 상세(MedicalDetailClient)
src/app/guide/                      진료안내·오시는 길
src/app/news/, news/[id]/           본원소식 목록·상세
src/app/policy/price, policy/privacy  비급여 안내, 개인정보처리방침
next.config.ts                      /community·/notice → /news, /location → /guide 308 리다이렉트
src/components/layout/              Header, Footer, MobileQuickMenu(모바일 하단 바), PageHero(하위 페이지 공통 상단)
src/components/home/StatsBand.tsx   숫자 올라가는 수치 띠
src/data/body-parts.ts              부위 5종 + 질환 링크 + 그림 경로 + getBodyPartBySlug (아래 참고)
src/data/news.ts, media.ts, posts.*  게시글·언론 카드 정적 데이터
src/lib/clinic.ts                   OPENED_YEAR=2008, CLINIC_YEARS(= 올해 − 2008)
src/lib/gtag.ts, naver-wcs.ts       분석 스크립트(건드리지 않음)
public/images/illust/part-*.webp    부위 그림 5종(높이 360px, 투명 배경)
```

**부위↔질환의 단일 원본은 `src/data/body-parts.ts` 입니다.** 상단 메뉴, 홈 "어디가 불편하세요?", 주요 질환 카드의 그림, 질환 상세 상단 그림과 사이드바 목록이 모두 여기서 나옵니다.

질환을 추가·수정할 때는 3곳을 같이 봅니다.

1. `src/data/body-parts.ts` — 소속 부위의 `items` 에 `{label, href: "/medical/<slug>"}` 추가
2. `src/app/medical/[slug]/MedicalDetailClient.tsx` 의 `DISEASES` — 상세 문구(제목, 영문, 설명, 치료 본문, 출처). 여기에 없으면 "안내를 준비하고 있습니다" 화면이 나옵니다(지금 풍선신경성형술이 그렇습니다)
3. `src/app/medical/MedicalClient.tsx` 의 `diseases` — 목록 카드. 한 카드에 질환 링크를 여러 개 싣고 싶으면 `links` 를 씁니다(디스크·척추관협착증 카드가 그 예)

## 5. 디자인 구현 규칙과 함정

- Tailwind v4 테마 토큰: `bg-background #F6F7F8`, `text-foreground #283038`, `bg-card #FFFFFF`, `text-primary #A8531F`, `bg-secondary`/`bg-muted #EEF0F2`, `border-border #DDE1E5`, `text-muted-foreground #55606A`. 토큰에 없는 색은 만들지 않습니다.
- `--radius-xl` 이 1.25rem(20px)이라 `rounded-xl` 이 시안보다 둥급니다. 시안의 12px 은 `rounded-[12px]`, 그림 상자는 모바일 `rounded-[10px]`, 데스크톱 `rounded-[14px]` 로 씁니다.
- 일러스트·그림은 `next/image` 가 아니라 일반 `<img>` 를 씁니다(ESLint 의 `no-img-element` 는 꺼져 있음). 장식 그림은 `alt=""` + `aria-hidden`.
- 한글 문구는 `break-keep` 을 붙여 단어 중간에서 끊기지 않게 합니다.
- 누르는 영역은 모바일에서 `min-h-11`~`min-h-12` 이상.
- `PageHero`(하위 페이지 상단)는 가운데 정렬이 고정입니다. 폭 클래스를 따로 넘기지 않습니다. 슬롯: `eyebrow`, `title`, `description`, `breadcrumb`, `aside`(제목 위 보조 요소), `overlap`(진료안내처럼 아래 카드가 겹치는 페이지).
- 모션은 framer-motion 이고 "모션 줄이기"를 존중합니다. 수치 띠는 모션을 줄여도 숫자만 짧게(1.2초) 올라갑니다. 구조(aria-hidden 애니메이션 값 + sr-only 최종값)를 유지합니다.
- 개원 햇수 문구는 숫자를 직접 쓰지 않고 `CLINIC_YEARS` 를 씁니다(2026년 기준 18, 해가 바뀌면 자동으로 19). "20년"이 남은 3곳은 의료진 경력 표현이라 일부러 둔 것입니다.
- 새 문구·새 수치·새 의료 효능 표현을 만들어 넣지 않습니다. 의료광고 판단은 병원 몫입니다.

## 6. 지금까지 한 일

| 날짜 | 커밋 | 내용 |
| --- | --- | --- |
| 10-06 | `3b3c01e`~`209381b` | 수치 띠(StatsBand), 개원 햇수 자동 계산, 의료진 사진 크롭 위치, 히어로 바탕 레이어, 시설 16:9 자리표시, 핸드오버 문서 묶음 |
| 10-07 | `7ac49f8`, `d4a3803`, `75ce5d3` | 문서 갱신, 쓰지 않는 에셋·일회성 스크립트 정리(public 63MB → 22MB), 수치 띠를 모션 줄이기 환경에서도 올라가게 수정 |
| 10-08 | `f5e9e16` | 홈 "어디가 불편하세요?"를 Claude Design 시안 B(5열 카드 + 부위 그림 5종)로 교체 |
| 10-08 | `e5ccbba` | 하위 페이지 공통 상단(PageHero)을 가운데 정렬로 통일. 좌우 여백이 달랐던 문제 해결 |
| 10-09 | `b5e1d48` | 루트 README 갱신(이 세션 밖에서 올라온 커밋) |
| 10-09 | `ffa7dd6` | 주요 질환 카드와 질환 상세 상단의 lucide 아이콘을 부위 그림으로 교체. 부위↔질환 연결을 `getBodyPartBySlug` 로 한 곳에 모음 |
| 10-09 | `e9b44dc` | 주요 질환에서 디스크·척추관협착증을 카드 1개로 합침(카드 안에 링크 2개). 카드 8개, 4열 2줄. 상세 주소·홈·메뉴는 그대로 |
| 10-09 | `3db1e85`, `e715d89` | Antigravity 인계 문서 추가(`HANDOVER.md`, `AGENTS.md`, `GEMINI.md`), 빈 페이지 3곳(`/community`, `/notice`, `/location`) 308 리다이렉트·삭제 및 `sitemap.ts` 갱신, 뉴스 제목 `break-keep`, 주요 질환 첫 줄 카드 높이 균형(`h-full`) |
| 10-16 | `062feee` | 홈 수치 띠(`StatsBand.tsx`) 4번째 칸을 "5층"에서 "다수 출연"(KBS·MBC·SBS·MBN 등 주요 방송)으로 변경 (`text` 항목, 숫자 카운트업 제외) |
| 10-17~18 | `9d715fc`, `8dc29c6` 외 | 보안 헤더·CSP Report-Only, 페이지별 메타·사이트맵·robots·오픈 전 noindex(`src/lib/clinic.ts` 의 `SITE_URL`·`SITE_INDEXABLE`), 접근성 보정(배경 영상 정지 버튼 등), 블러·그라데이션 제거와 토큰 색 정리, e2e 재작성. 자세한 내용과 남은 일은 `docs/HANDOVER_CLAUDE.md` §4~§7 이 최신 |

각 결정의 날짜와 이유는 `docs/design-handover/README.md` §2 결정 기록에 있습니다.

## 7. 남은 일

**Matt 이 정하거나 해야 하는 것**

- DB 내보내기와 Neon 비밀번호 교체(보안 작업, 미완료). `docs/DB_REMOVAL_GUIDE.md`
- 홈 수치 띠 4번째 칸 "다수 출연" 표현 병원 확인 대기(프로필 문구는 "소개"여서, 소개만 된 방송도 있다면 "소개"로 변경 필요)
- 부위 그림 5종의 해부 형태를 병원 의료진이 감수(공개 전 필수 — 디자인 시스템 규칙)
- 풍선신경성형술 상세 문구 제공(병원). 지금은 "안내를 준비하고 있습니다" 화면
- 도메인 확정: `layout.tsx` 의 `metadataBase`(`jiin-clinic-gangbuk.com`)와 `openGraph.url`(`jiin-gangbuk.com`, 임시)이 다름
- "전국 80만 명" 등 수치·광고성 표현의 근거 확인(병원 몫, 사이트 본문·메타에 있음)
- 오시는 길 네이버 지도 연결(Matt 이 직접). 연결 후 `public/images/illust/map-schematic*.svg` 삭제
- 삭제 승인 대기: 쓰지 않는 `public/images/illust/part-*.svg` 5개, `public/images/illust/facility-*.svg`(시설 사진이 들어온 뒤)
- `_to_review/1774190097288-척추협착.png`(8.5MB, git 에 없음) 보관 여부
- `fix_hero_video.py` 의 미커밋 수정 처리
- 정희진 원장 사진 틀 크기 결정, 개원 '월' 제공 시 햇수 계산 정밀화
- 뉴스 썸네일 3건이 외부 스톡(Unsplash). 뉴스 154613 은 본문이 비어 있음 → 병원 자료로 교체
- 시설 사진 6곳, 외관 2컷, 방송 영상 정지 프레임 이용 조건, 공유 이미지 A/B안 선택(병원)

**에이전트가 바로 할 수 있는 것 (Matt 이 시키면)**

- 질환 상세 상단 그림은 데스크톱(`lg` 이상)에서만 보임. 모바일에도 보일지 결정 필요
- 린트 경고 2건(`gtag.ts`, `naver-wcs.ts` 의 불필요한 eslint-disable)은 분석 스크립트라 Matt 승인 전에는 고치지 않습니다
- e2e 는 페이지가 뜨는지만 봅니다. 필요하면 질환 카드 8개·링크 확인 같은 테스트 추가

**Claude Design 쪽 (Antigravity 로는 못 함)**

- 디자인 시스템 문서에 아이콘 상태 갱신: 부위 5종은 적용됨(시안 B), 질환별 9종은 계속 보류라고 아직 옛 상태로 적혀 있음
- 로고 세트(LOGO-01~03)와 파비콘: `public/images/logo.png`(공식 로고)를 Claude Design 에 첨부해야 진행됨
- 뉴스·영상 기본 이미지(라운드 3), 질환별 전용 그림이 필요해지면 새 요청
- 링크: 에셋 브리프 <CLAUDE_DESIGN_ASSET_BRIEF_URL> · 디자인 시스템 <CLAUDE_DESIGN_SYSTEM_URL>
- 에셋을 받으면 `docs/design-handover/README.md` §4 표의 "코드 위치"에서 경로만 바꿔 연결합니다

## 8. 저장소와 Mac 에 남은 잔여물

- git 에 없는 폴더(커밋하지 않는 것): `Claude outputs/`(Claude 가 만든 시안·캡처), `_to_review/`, `captures-new/`(이전 작업이 저장소 안에 만든 모바일 캡처로 보임), `docs/design-handover/reference/`(기준 캡처 13장 + Claude Design 시안, 용량 때문에 의도적으로 제외). 그래서 `git add .` 를 쓰지 않습니다. 필요 없는 건 Matt 이 지우면 됩니다.
- `.git/` 안에 이 세션이 남긴 찌꺼기가 있습니다(해가 없음, 삭제 권한이 없어 지우지 못함): `HEAD.lock.stale-*` 4개, `objects/maintenance.lock.stale-*` 4개, `objects/*/tmp_obj_*` 약 60개. 진행 중인 git 작업이 없을 때 Mac 터미널에서 지워도 됩니다.

```bash
cd <로컬 저장소 경로>
rm -f .git/HEAD.lock.stale-* .git/objects/maintenance.lock.stale-*
find .git/objects -name 'tmp_obj_*' -delete
git fsck --connectivity-only   # 문제가 없는지 확인(선택)
```

- Mac 의 `/tmp` 에 이번 세션이 쓴 검증 스크립트와 캡처(`/tmp/qa*`, `/tmp/*_shots.py`)가 있지만 재부팅하면 사라지는 임시 파일입니다. 오래 쓸 캡처 도구는 `docs/design-handover/tools/capture.py` 입니다.
- 일부러 남긴 것: `public/images/logo.png`(로고 벡터 작업의 기준 원본, 삭제 금지).
