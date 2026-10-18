# 지인마취통증의학과 강북점 홈페이지 — 작업 인계서 (Claude → Claude)

작성 2026-10-17. 이 문서는 Matt 의 Claude 세션(2026-10-06 ~ 10-17)에서 한 일, 정한 것, 남은 일을 다른 Claude 계정이 그대로 이어받을 수 있게 정리한 것입니다. 이 문서 하나만 읽어도 시작할 수 있게 썼고, 자세한 내용은 저장소의 `docs/HANDOVER.md` 와 `docs/design-handover/README.md` 에 있습니다. (저장소 문서 안의 "Antigravity" 언급은 다른 도구에서 이어 작업하는 부분이라 무시하세요.)

비밀번호, 접속 문자열, 토큰 같은 비밀 값은 이 문서에 넣지 않았습니다. 앞으로도 채팅·문서에 옮겨 적지 마세요.

## 0. 이 문서 쓰는 법

이 프로젝트에는 Claude 가 두 군데에서 일합니다.

| 역할 | 어디서 | 할 수 있는 것 |
| --- | --- | --- |
| **읽기 전용 Claude** | claude.ai 채팅 프로젝트 "강북점 홈페이지 작업" | 공개 저장소 `jaysholic-ceo/bang` 을 clone 해서 읽기. GitHub 로그인이 없어 **push 불가**. 코드·문서를 읽고 분석하고, 수정안(파일 전체 또는 패치)을 대화로 사용자에게 전달 |
| **쓰기 Claude (Claude Code)** | 사용자의 Claude Code 세션 | 비공개 저장소 `jaysholic-ceo/jiin-clinic` 에 커밋·push·배포, 사용자 컴퓨터 작업 |

작업 흐름: 읽기 전용 Claude 가 수정안을 만든다 → 사용자가 그 내용을 Claude Code 세션에 전달한다 → Claude Code 가 `jiin-clinic` 에 적용하고 확인한 뒤 push·배포한다 → 필요하면 Claude Code 가 `tools/export-bang.py` 로 `bang` 스냅샷을 새로 만든다.

`bang` 은 `jiin-clinic` 의 **스냅샷**입니다. git 히스토리는 가져오지 않았고(과거 커밋에 비밀값 흔적이 있을 수 있어서), 민감하거나 애매한 파일은 뺐습니다(목록과 이유는 `docs/BANG_EXPORT.md`). 최신이 아닐 수 있으니 `README.md` 의 기준 커밋과 날짜를 확인하고, 라이브 사이트와 다르게 보이면 사용자에게 알리세요.

읽기 전용 Claude 는 §3 의 "git·배포"와 §6 A 를 실행하지 않습니다(할 수 없고, 할 일도 아닙니다). 이 문서를 읽은 뒤 어느 쪽 역할인지 모르겠으면 push 가 가능한지로 판단하세요. 가능하면 쓰기, 불가능하면 읽기 전용입니다.

이전 세션의 대화 기록, 이전 계정의 기억(메모리), 이전 컴퓨터 연결은 넘어오지 않습니다. 필요한 것은 이 문서와 `docs/HANDOVER.md`, `docs/design-handover/README.md` 에 적어 두었습니다. 이 문서는 2026-10-17 시점의 스냅샷입니다.

## 1. 시작 전에 필요한 접근 권한

| 대상 | 필요한 것 | 누가 |
| --- | --- | --- |
| 공개 저장소 `jaysholic-ceo/bang` | `git clone https://github.com/jaysholic-ceo/bang.git` 로 읽기. 로그인 불필요, 읽기 전용 | 읽기 전용 Claude |
| 비공개 저장소 `jaysholic-ceo/jiin-clinic` | 읽기 전용 Claude 는 접근하지 않습니다(로그인 불가). Claude Code 가 사용자 GitHub 계정으로 push·배포합니다 | 쓰기 Claude |
| 작업 환경 | 저장소를 내려받아 `npm install` 할 수 있는 곳(Node.js 필요). 빌드에 필요한 환경변수는 없습니다 | 각자 |
| Vercel | `main` 에 push 하면 자동 배포됩니다. 배포 로그를 보려는 경우에만 Vercel 접근이 필요합니다 | 사용자 (선택) |
| Claude Design 프로젝트 "지인 강북점" | 에셋 브리프 `<CLAUDE_DESIGN_ASSET_BRIEF_URL>`, 디자인 시스템 `<CLAUDE_DESIGN_SYSTEM_URL>`. 공개 저장소에 링크를 싣지 않았으므로 **사용자가 대화에서 직접 알려 줘야** 합니다. 새 에셋 요청은 사용자 계정의 Claude Design 에서 합니다 | 사용자 |
| Google Drive 폴더 "지인통증-강북점" | 병원 방송·논문·사진 원자료 백업. 읽으려면 그 Claude 의 Drive 연결과 공유 설정이 필요합니다 | 사용자 |
| Neon 콘솔 | 옛 DB. 비밀번호 교체·삭제는 **사용자(계정 소유자)만** 할 수 있습니다(§6) | 사용자 |

**따로 받아야 하는 값**: 읽기·빌드·분석에는 필요한 값이 없습니다. 다음은 모두 사용자가 가지고 있고, 필요할 때만 사용자가 직접 처리하며, 채팅이나 문서에 옮겨 적지 않습니다.
- 분석 ID 환경변수 6개(`.env.example` 에 이름만 있음): 값은 Vercel 환경변수와 사용자 컴퓨터의 `.env.local` 에 있고 선택 사항입니다.
- DB 접속 정보, `VERCEL_TOKEN` 등 배포 비밀값: 절대 공유하지 않습니다.
- Claude Design 링크 2개, 병원 제공 사진·자료: 필요할 때 사용자가 줍니다.

## 2. 프로젝트 한 장 요약

- 무엇: 지인마취통증의학과 강북점(서울 강북구 삼양로 319, 화계역 2번 출구) 홈페이지의 UI/UX 개편. 화면(프레젠테이션 계층)만 바꾸고 문구·수치는 병원 것입니다.
- 라이브: https://jiin-clinic-ten.vercel.app (아직 개발 서버. `main` 에 push 하면 1~2분 안에 자동 배포)
- 저장소: `jaysholic-ceo/jiin-clinic`. 작업 브랜치 `ui/ux-refresh-2026-10`, 배포 브랜치 `main`. 2026-10-17 현재 둘이 같은 위치이며 마지막 커밋은 `14eac5d`(화면 코드는 `062feee` 까지)입니다.
- 스택: Next.js 16.1.6(App Router) · React 19 · TypeScript · Tailwind v4 · framer-motion 12 · lucide-react · ESLint 9 · Playwright. DB 없는 정적 사이트입니다(`src/data/*`).
- 의료진: 대표원장 최용민, 원장 이석면, 원장 정희진. 대표전화 02-6431-1234. 2008년 개원.
- 색(로고 기반): 구리 `#A8531F`, 슬레이트 `#283038`. Tailwind 테마: 바탕 `#F6F7F8`, 면 `#EEF0F2`, 선 `#DDE1E5`, 보조 글자 `#55606A`.

## 3. 규칙과 Matt 과 일하는 방식

**일하는 방식**
- 답변은 한국어, 결과 먼저, 짧게. 질문을 여러 번 주고받는 것("핑퐁")을 싫어하므로 직접 해결하고 보고합니다.
- 다만 새 문구·새 수치·색 추가, 파일 삭제, 범위가 갈리는 요청(예: "카드를 합치자"에서 링크를 어떻게 할지)은 선택지를 짧게 정리해 한 번에 묻습니다.
- 화면을 바꿨으면 직접 확인한 결과(빌드, 폭별 화면)를 보고하고, 확인하지 않은 것을 확인했다고 쓰지 않습니다.
- "AI 가 만든 느낌"을 가장 경계합니다. 그라데이션, 블러, 유리 효과, 글로우, 매끈한 3D 일러스트, 이모지 장식, 크림·아이보리·순수 검정, 의미 없는 보라·청록 포인트를 쓰지 않습니다. 참고 이미지가 필요하면 Matt 이 직접 찾아 줍니다.

**지킬 것**
- 바꾸는 범위는 화면뿐입니다. API, 데이터 저장, 분석 스크립트(`src/lib/gtag.ts`, `src/lib/naver-wcs.ts`)는 건드리지 않습니다.
- `.env*` 와 `prisma/` 는 열지 않습니다. 비밀 값을 옮겨 적지 않습니다.
- 화면 문구·수치·의료 효능 표현은 병원의 것입니다. 새로 만들어 넣지 않고, 고치려면 Matt 에게 먼저 묻습니다. 의료광고 판단은 병원 몫이고 법적 판단은 하지 않습니다.
- 색은 `docs/design-handover/design-system/tokens.json` 값만 씁니다.
- 직접 그린 SVG·스톡 사진·생성 이미지를 최종 에셋으로 넣지 않습니다. 에셋은 Claude Design 납품본이나 병원이 준 사진만 씁니다.
- 파일 삭제는 Matt 승인 뒤에만 합니다. `public/images/logo.png`(공식 로고, 벡터 원본 없음)는 어떤 경우에도 지우지 않습니다.
- 개원 햇수는 숫자를 직접 쓰지 않고 `src/lib/clinic.ts` 의 `CLINIC_YEARS`(= 올해 − 2008)를 씁니다.

**git·배포 (쓰기 Claude 전용)**
- 라이브가 아직 개발 서버라 `main` 직접 push 를 Matt 이 허용했습니다(2026-10-07). Matt 이 "적용해줘/올려줘/라이브에 적용" 이라고 하면 커밋하고 `main` 에 올립니다. 그런 말이 없으면 변경만 남기고 보고합니다.
- 올리기 전 `git fetch` 로 `origin/main` 이 앞서 있지 않은지 확인하고, `git merge --ff-only` 로만 합칩니다.
- 하지 않는 것: 강제 푸시, 브랜치 삭제, `git reset --hard`, `git clean`, `git add .`/`git add -A`(저장소에 커밋하지 않는 폴더 `Claude outputs/`, `_to_review/`, `captures-new/`, `docs/design-handover/reference/` 가 딸려 들어갑니다). 파일을 지정해서 add 합니다.
- **커밋 작성자는 반드시 `Matt Choi <<이메일>>`(저장소 기본 설정)으로 둡니다.** Vercel 이 팀 소유자 외의 작성자가 만든 커밋은 배포를 막습니다(2026-10-17~18 에 작성자 `jaysholic-ceo` 커밋 2건이 `BLOCKED: TEAM_ACCESS_REQUIRED` 로 막혔고, 빌드가 멈춘 것처럼 보였지만 Cancel 로는 풀리지 않았습니다). 작성자를 바꾸는 `git config user.*`, `--author` 는 쓰지 않습니다.
- 커밋 메시지는 `feat:`, `fix:`, `style:`, `docs:`, `chore:` 로 시작하는 영어 한 줄. 정식 오픈(도메인 연결) 때는 이 규칙을 다시 정해야 하니 그때 Matt 에게 먼저 묻습니다.

## 4. 현재 상태

사이트 구성: 홈(히어로 영상 → 부위별 질환 바로가기 → 철학 → 수치 띠 → 언론·활동 → 연혁·후기), 본원 소개(의료진 3인 상세), 주요 질환(카드 8개 + 질환 상세), 진료안내, 본원소식(목록·상세), 비급여·개인정보처리방침. `/community`, `/notice`, `/location` 은 308 리다이렉트로 정리했습니다(`next.config.ts`).

수치 띠(홈): 18년(자동 계산) · 80만 명 · 3인 · **다수 출연**(KBS·MBC·SBS·MBN 등 주요 방송).

검색·보안 기본값(2026-10-17~18):
- 모든 페이지에 고유 제목·설명·canonical·공유 정보(`src/lib/seo.ts` 의 `pageMetadata`)가 있고, 사이트맵(36쪽)·`robots.txt` 가 자동 생성됩니다.
- **정식 오픈 전이라 전 페이지 `noindex`** 입니다. 오픈할 때 `src/lib/clinic.ts` 의 `SITE_INDEXABLE` 을 `true` 로, `SITE_URL` 을 확정 도메인으로 바꿉니다(이 두 줄만 바꾸면 메타·사이트맵·robots·구조화 데이터가 함께 바뀝니다).
- 보안 헤더 7종(`next.config.ts`). CSP 는 위험이 낮은 지시어만 강제하고 전체 정책은 Report-Only 입니다. 라이브에서 위반 보고 0건을 확인했으니, 며칠 더 지켜본 뒤 강제로 바꿀 수 있습니다.
- 배포 워크플로는 Vercel CLI `64.5.0` 고정, `timeout-minutes: 15`.

## 5. 이 세션에서 한 일과 결정

| 날짜 | 커밋 | 내용 |
| --- | --- | --- |
| 10-06 | `3b3c01e`~`209381b` | 수치 띠, 개원 햇수 자동 계산, 의료진 사진 크롭 위치, 히어로 바탕 레이어, 시설 16:9 자리표시, 디자인 핸드오버 문서 묶음 |
| 10-07 | `7ac49f8`, `d4a3803`, `75ce5d3` | 쓰지 않는 에셋·스크립트 정리(public 63MB → 22MB). 수치 띠 숫자 카운팅이 "모션 줄이기" 환경에서 안 올라가던 문제 수정(이동·페이드는 없애고 숫자만 1.2초 동안 올라감) |
| 10-08 | `f5e9e16` | 홈 "어디가 불편하세요?"를 Claude Design 시안 B(데스크톱 5열·태블릿 3열·모바일 세로 카드 + 부위 그림 5종)로 교체 |
| 10-08 | `e5ccbba` | 하위 페이지 공통 상단(`PageHero`)을 가운데 정렬로 통일(좌측 여백이 우측보다 크던 문제 해결) |
| 10-09 | `ffa7dd6` | 주요 질환 카드·질환 상세 상단의 lucide 아이콘을 부위 그림으로 교체. 부위↔질환 연결을 `getBodyPartBySlug` 한 곳으로 모음 |
| 10-09 | `e9b44dc` | 주요 질환에서 디스크·척추관협착증을 카드 1개로 합침(카드 안에 질환 링크 2개, 카드 8개 4열 2줄). 상세 주소·홈·메뉴는 그대로(Matt 이 "카드 안에 링크 두 개", "주요 질환 페이지만"을 선택) |
| 10-09 | `3db1e85`, `14eac5d` 외 | 작업 인계 문서 추가·갱신(`docs/HANDOVER.md`, `AGENTS.md`, `GEMINI.md`), 빈 페이지 3곳 리다이렉트, 뉴스 제목 `break-keep`, 주요 질환 카드 높이 균형 |
| 10-16 | `062feee` | 수치 띠 4번째 칸을 "5층"에서 "다수 출연"으로 변경 |
| 10-17 | `9d715fc` | (Cowork 세션) 보안 헤더 7종 + CSP Report-Only, Vercel CLI 버전 고정, DB 글 HTML 검사 도구 `docs/db-removal/scan-posts.cjs` |
| 10-18 | `8dc29c6` | (Cowork 세션) 페이지별 메타·canonical·공유 정보, 사이트맵 전체·`robots.txt`, 오픈 전 `noindex`, 질환 상세 정적 생성(목록 밖 주소 404), 배경 영상 정지 버튼(모션 줄이기면 자동 정지), 대비·작은 글씨·터치 영역 보정, 빈 링크 정리(소셜 아이콘은 주소가 생기면 표시), 블러·그라데이션·큰 그림자 제거, 토큰 밖 회색을 토큰으로, 언론 카드 데스크톱 3장 한 줄, "대항→대한마취통증의학회" 오타 |
| 10-18 | (이 문서와 같은 커밋) | (Cowork 세션) 남은 10px 글씨 11px로, 모바일 메뉴 스크린리더 설명 추가, 질환 데이터의 안 쓰는 `color` 필드 제거, e2e 테스트를 현재 화면 기준으로 재작성(질환 카드 8개·링크 9개·상세 9쪽·404·SEO 기본값·빈 링크, 34개 통과) |

**왜 그렇게 정했나 (같은 질문이 또 나올 때 참고)**
- 부위 그림은 디자인 시안 B 의 5종뿐이라 질환별 전용 그림은 없습니다. 같은 부위 질환은 그 부위 그림을 함께 씁니다(척추 2·어깨 3·신경 2·손 1·무릎 1). 질환별 전용 그림(`icon-disease-*.svg`)은 2026-10-06 에 Matt 이 보류 결정했고 아직 열려 있습니다.
- "18년"은 매년 고칠 필요가 없습니다. `CLINIC_YEARS` 가 자동 계산하며(개원 월을 몰라 연도 차이만 계산, 매년 1월에 숫자가 넘어감), 다음 배포 때 반영됩니다. 싫으면 "2008년 개원"처럼 고정 표기로 바꾸는 대안을 설명했고 Matt 은 따로 요청하지 않았습니다.
- "5층"은 자랑거리가 아니라서 뺐습니다. 논문 대신 방송 노출을 고른 이유: 옆 칸 "3인"이 이미 의료진 전문성을 말해 논문은 같은 결이고, 방송은 대중이 확인한 다른 종류의 신뢰이며 아래 방송·영상 구간과 이어집니다. 횟수는 확인된 값이 없어서 숫자 없이 "다수 출연"으로 표현했습니다(사이트 의료진 프로필의 "MBC, KBS, SBS 등 다수 소개"에 근거). **"출연"이라는 단어는 병원 확인 대기**이고, 소개만 된 방송도 있다면 "소개"로 바꿉니다.
- 지금 사이트는 정식 오픈 전 개발 서버이고 화면의 기준은 개편 캡처 13장입니다(`docs/design-handover/reference/captures/`, 저장소에는 없고 Matt 컴퓨터에만 있음).

## 6. 남은 일 (우선순위)

**A. 보안·데이터 (Matt 이 직접, 제일 먼저. 읽기 전용 Claude 는 하지 않습니다)**
(이 항목의 상세 절차는 비공개 저장소에만 있습니다. DB 내보내기와 Neon 비밀번호 교체는 사용자가 직접 하는 보안 작업이며, 읽기 전용 Claude 는 하지 않습니다.)

**B. 병원·Matt 결정 대기**
- 수치 띠 "다수 출연"의 "출연" 표현 확인
- 부위 그림 5종의 해부 형태를 의료진이 감수(공개 전 필수)
- 풍선신경성형술 상세 문구 제공(지금은 "안내를 준비하고 있습니다")
- 도메인 확정: 지금은 `src/lib/clinic.ts` 의 `SITE_URL` 한 곳에 임시로 `jiin-clinic-gangbuk.com` 을 둠(예전에 둘로 나뉘어 있던 것을 10-18 에 하나로 모음). 확정되면 이 값만 바꾸고, 오픈 때 `SITE_INDEXABLE=true`
- "전국 80만 명" 등 수치·광고성 표현의 근거(사이트 본문·메타에 있음)
- 오시는 길 네이버 지도 연결(Matt 이 직접), 연결 후 `public/images/illust/map-schematic*.svg` 삭제
- 삭제 승인 대기: 쓰지 않는 `public/images/illust/part-*.svg` 5개, 시설 사진이 들어온 뒤 `facility-*.svg`
- `_to_review/` 의 8.5MB 이미지 보관 여부, `fix_hero_video.py` 의 미커밋 수정 처리
- 정희진 원장 사진 틀 크기, 개원 월 제공 시 햇수 정밀화
- 뉴스 썸네일 3건이 외부 스톡(Unsplash)이고 뉴스 154613 은 본문이 비어 있음 → 병원 자료로 교체
- 병원 자료: 시설 사진 6곳, 외관 2컷, 방송 영상 정지 프레임 이용 조건, 공유 이미지 A/B안 선택

**C. Claude Design 쪽 (Matt 계정에서)**
- 디자인 시스템 문서의 아이콘 상태 갱신(부위 5종은 적용됨, 질환별 9종은 보류인데 옛 상태로 적혀 있음)
- 로고 세트(LOGO-01~03)·파비콘: `public/images/logo.png` 를 첨부해야 진행됨. 뉴스·영상 기본 이미지(라운드 3)
- 새 에셋을 받으면 `docs/design-handover/README.md` §4 표의 "코드 위치"에서 경로만 바꿔 연결합니다

**D. 코드로 바로 할 수 있는 것 (Matt 이 시키면)**
- 질환 상세 상단 그림이 데스크톱(`lg` 이상)에서만 보임 → 모바일에도 보일지 결정 필요
- CSP 를 Report-Only 에서 강제로 전환(위반 보고가 계속 0건이면)
- 푸터의 `#CBD2D9`·`#EEF1F4` 는 토큰에 없는 색(어두운 띠 위 보조 글자). 토큰으로 맞추려면 white 계열로 바꿔야 해 화면이 밝아지므로 보류
- 린트 경고 2건(`gtag.ts`, `naver-wcs.ts`)은 분석 스크립트라 Matt 승인 전에는 고치지 않음

**E. 운영 (Matt 계정)**
- 라이브에 GA·네이버 분석 스크립트가 실리지 않음: Vercel 환경변수에 분석 ID(`.env.example` 의 6개)가 없음. 코드는 ID 가 있으면 자동으로 켜짐
- Vercel 이 Hobby(개인·비상업) 플랜이라 팀 소유자 외 작성자 커밋을 막음(§3 참고). 정식 오픈 전 Pro 전환 또는 프로젝트 이전을 결정
- `bang` 스냅샷이 `845ec7a` 기준이라 10-17~18 변경이 빠져 있음 → `tools/export-bang.py` 로 새로 만들기

## 7. 기술 메모

**코드 지도**
```
src/app/HomeClient.tsx              홈 전체. "1-b" 구간이 부위별 질환 바로가기
src/components/home/StatsBand.tsx   수치 띠. STATS 배열 (text 항목이면 숫자 카운트업 없음)
src/components/layout/              Header, Footer, MobileQuickMenu(모바일 하단 고정 바 65px), PageHero(하위 페이지 공통 상단)
src/app/medical/MedicalClient.tsx   주요 질환 카드 (links 가 있으면 한 카드에 링크 여러 개)
src/app/medical/[slug]/MedicalDetailClient.tsx  질환 상세 (DISEASES 에 문구)
src/data/body-parts.ts              부위 5종·질환 링크·그림 경로·getBodyPartBySlug  ← 부위↔질환의 단일 원본
src/data/news.ts, media.ts, posts.*  게시글·언론 카드 정적 데이터
src/lib/clinic.ts                   OPENED_YEAR=2008, CLINIC_YEARS, SITE_NAME, SITE_URL(임시 도메인), SITE_INDEXABLE(오픈 전 false)
src/lib/seo.ts                      pageMetadata({title, description, path, image}) — 페이지별 메타·canonical·공유 정보. 새 페이지에도 이걸 씁니다
src/app/sitemap.ts, robots.ts       사이트맵(질환·게시글 자동 포함)·robots
src/app/intro/doctor-*/layout.tsx   의료진 상세는 클라이언트 페이지라 메타데이터를 레이아웃에서 지정
tests/landing.spec.ts               e2e (빌드 후 next start -p 3000 을 띄우고 npx playwright test)
public/images/illust/part-*.webp    부위 그림 5종(높이 360px, 투명 배경)
```
질환을 추가·수정할 때는 3곳을 같이 봅니다: `body-parts.ts`(링크), `MedicalDetailClient.tsx` 의 `DISEASES`(상세 문구), `MedicalClient.tsx` 의 `diseases`(목록 카드).

**구현 함정**
- `--radius-xl` 이 1.25rem(20px)이라 `rounded-xl` 이 시안보다 둥급니다. 시안 12px 은 `rounded-[12px]`, 그림 상자는 `rounded-[10px]`(모바일)·`rounded-[14px]`(데스크톱)로 씁니다.
- 일러스트는 `next/image` 가 아니라 일반 `<img>`(ESLint 의 `no-img-element` 는 꺼져 있음). 장식 그림은 `alt=""` + `aria-hidden`.
- 한글 문구는 `break-keep`. 모바일 누르는 영역은 `min-h-11`~`min-h-12` 이상.
- `PageHero` 는 가운데 정렬 고정이고 폭 클래스를 따로 넘기지 않습니다. 슬롯: `eyebrow`, `title`, `description`, `breadcrumb`, `aside`, `overlap`.
- 수치 띠: 모션 줄이기에서도 숫자는 올라가며, 구조(aria-hidden 애니메이션 값 + sr-only 최종값)를 유지합니다.
- 어두운 띠의 `text-primary` 는 `globals.css` 규칙으로 연한 구리(`#F0B88C`)로 바뀝니다. 대상 배경: `bg-black`, `bg-zinc-900`, `bg-slate-900`, `bg-foreground`. 어두운 면을 새로 만들면 이 클래스 중 하나를 쓰거나 글자색을 `text-[#F0B88C]` 로 직접 씁니다(구리 `#A8531F` 는 slate 위 2.5:1 로 부족).
- 색은 토큰 클래스(`text-foreground`, `text-muted-foreground`, `bg-background`, `bg-secondary`, `border-border`, `bg-foreground`)를 씁니다. `zinc-*`·`slate-*` 회색은 10-18 에 모두 걷어냈습니다(진료안내의 버스 노선 파랑·초록은 실제 노선색이라 예외).
- 블러·유리·그라데이션·큰 그림자는 쓰지 않습니다(10-18 에 걷어냄). 그림자는 `shadow-premium`(slate 색 그림자) 하나만.

**확인 방법**
```bash
npm install
npm run dev                 # http://localhost:3000
npm run lint                # 기존 경고 2건 외 새 경고가 없어야 함
npm run build               # 오류 없이 끝나야 함 (타입 검사 포함. tsc --noEmit 은 지워진 관리자 화면의 .next/dev/types 오류를 내지만 무관)
npx next start -p 3100      # build 후 프로덕션 확인
npx playwright test         # e2e (먼저 next start -p 3000. 다른 주소는 PW_BASE_URL=http://localhost:3100)
python3 docs/design-handover/tools/capture.py   # 6개 페이지 캡처 → /tmp/jiin-captures
```
화면은 1440, 1024, 768, 390 폭에서 글자 잘림, 가로 스크롤, 이미지 비율, 대비, 하단 고정 바에 본문이 가리지 않는지를 봅니다. 배포 확인은 push 후 1~2분 뒤 라이브 주소에서 바꾼 문구가 보이는지 `curl` 로 확인했습니다.

**이 세션의 작업 환경 노하우 (환경이 같을 때만)**
- 이 세션은 클라우드 컨테이너 + Matt 의 Mac(연결 도구)로 일했습니다. Mac 의 진짜 셸(zsh)로 빌드·서버·git push 를 실행했고, 약 60초를 넘는 명령은 `nohup ... &` 로 백그라운드에 돌린 뒤 로그를 확인하는 방식으로 처리했습니다.
- push 는 `GIT_TERMINAL_PROMPT=0 git push origin <커밋>:refs/heads/main` 형태가 안전했습니다(그냥 `git push` 는 "Everything up-to-date" 로 헛돈 적이 있음).
- 화면 검증은 Mac 에서 Playwright(헤드리스 Chromium)로 폭별 측정·스크린샷을 만들었습니다. 브라우저 확장으로 창 크기를 바꾸는 방법은 불안정했습니다.
- Claude Design 의 캔버스 에셋은 Artifact `read` 에 `path`(32자리 에셋 id)로 읽어야 했고, `paths` 로는 실패했습니다.
- 삭제 권한이 없는 폴더에서는 git 이 `.git/*.lock`, `objects/*/tmp_obj_*` 를 남깁니다. `.lock` 은 `.stale-<시각>` 으로 이름을 바꿔 피했습니다(`refs` 아래에서는 하지 않음). 정리 명령은 `docs/HANDOVER.md` §8 에 있습니다.

## 8. Drive 백업 폴더 조사 결과 ("지인통증-강북점" → "강북지인-전달받음")

수치 띠에 쓸 근거를 찾으려고 폴더 이름만 확인한 결과입니다. 파일 안은 열어 보지 않았고, 폴더 수는 방송 횟수와 다를 수 있어 **정확한 횟수로 쓰면 안 됩니다**(병원 확인 필요).

- `병원방송자료` 하위 방송 폴더(연도는 폴더명의 6자리 날짜): KBS 생생정보통(2012-04, 2013-05)·굿모닝대한민국(2013-04)·무엇이든물어보세요(2007-05)·101세의 프러포즈(2017-08), MBC 생방송오늘아침(2012-08)·기분좋은날(2012-11)·뉴스매거진(2011-09)·경제매거진, MBN 대상포진(2008-12)·오십견(2008-08)·천기누설(2014-08), SBS 모닝와이드(2016-09), TV조선(2018-06), 쿠키건강TV(2011, 2015, 2018), 온에어닥터스(2020), 하이닥 대상포진(2011-01), 내일신문 대상포진 기사. 그 밖에 병원표창, 강의사진, 신문, 잡지, 프로필용, 22년 강북구 기증 폴더와 영상 3개(`최용민원장방송모음.mp4` 약 2GB, `지인홍보완성본3.mp4`, `전층안내1130.mp4`).
- `논문` 폴더(이미지 파일): 논문 발표 이미지 8장, 포스터 발표 5장, 학회 논문 캡처 2장, 통증교과서 저자 표시 1장.
- 그 밖의 폴더: `신경성형술풍선추간공자료`(풍선신경성형술 문구 준비에 쓸 수 있음), `조영술1`, `3day ea`.

## 9. 시작 절차 (새 Claude 용)

1. 이 문서를 끝까지 읽고 §3 의 규칙을 지킵니다. 같은 저장소의 `docs/HANDOVER.md`, `docs/design-handover/README.md` 도 읽습니다.
2. 기준 시점을 확인합니다. `bang` 이면 `README.md` 의 기준 커밋·날짜(이 문서는 `14eac5d` 이후 변경을 모릅니다), `jiin-clinic` 이면 `git log --oneline -10` 입니다.
3. 사용자에게 두 가지를 알려 줍니다. ① 지금 상태 3줄 요약. ② 사용자가 준비해야 하는 접근 권한과 값(§1) 중 아직 안 된 것만. 읽기 전용이면 "수정안은 만들어 드리지만 push·배포는 Claude Code 세션에서 해야 한다"는 점도 말합니다.
4. 그다음부터는 사용자가 시키는 일만 합니다. 문구·수치·색·삭제는 먼저 물어봅니다.

읽기 전용 Claude 용 첫 메시지 예시 (claude.ai 채팅 프로젝트):

```
공개 저장소 https://github.com/jaysholic-ceo/bang 을 git clone 해서
docs/HANDOVER_CLAUDE.md 를 끝까지 읽고 이어서 작업해줘.
읽은 뒤 현재 상태를 3줄로 요약하고, 내가 준비해야 할 접근 권한이 있으면 알려줘.
(이 저장소는 읽기 전용이라 push 는 못 해. 수정안은 나한테 주면 Claude Code 에서 적용할게.)
```
