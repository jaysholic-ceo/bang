# 지인 강북점 디자인 에셋 핸드오버

작성 2026-10-06. 이 폴더는 Claude Design 이 만든 에셋·기준을 사이트(저장소)에 적용할 때 필요한 자료를 한곳에 모은 것입니다. 새 세션이나 개발자가 이 파일 하나만 읽고 이어서 작업할 수 있게 썼습니다. 코딩 에이전트에게 맡길 때는 `AGENT_INSTRUCTIONS.md` 를 먼저 읽게 합니다.

> 작업 인계는 `../HANDOVER.md`(2026-10-09)가 최신입니다. 이 폴더는 디자인 에셋 기준과 결정 기록을 담고 있습니다.

이 폴더의 문서는 2026-10-07 에 커밋·배포되었습니다(커밋 `209381b`). 단 `reference/`(화면 캡처 PNG 약 5MB)는 용량 때문에 커밋하지 않고 이 컴퓨터에만 있습니다.

## 1. 한눈에 보기

- 작업 브랜치: `ui/ux-refresh-2026-10`. 2026-10-09 현재 `main` 과 같은 위치(`e9b44dc`)입니다. `main` 에 직접 push 해도 된다고 Matt 이 정했고(2026-10-07), Matt 이 "올려줘" 라고 할 때 올립니다. 최신 작업 규칙·상태·남은 일은 `docs/HANDOVER.md`, 에이전트용 요약은 루트 `AGENTS.md` 입니다.
- 배포 사이트(jiin-clinic-ten.vercel.app)에 2026-10-07 개편본(`209381b`)이 올라가 개편 화면과 같아졌습니다. 이 사이트는 아직 개발 서버라 `main` 에 바로 올려도 된다고 Matt 이 정했습니다. 개편 화면의 기준은 `reference/captures/` 입니다. (2026-10-09 현재 배포본은 `e9b44dc`.)
- 개편의 색·구성·문구는 확정안입니다. 에셋 작업은 화면을 바꾸지 않고 에셋만 만듭니다.
- 지금까지 Claude Design 에서 받은 것은 규칙 문서와 틀 미리보기, 공유 이미지 B안 시안 1장입니다. 최종 납품 파일(SVG, WebP, JPG)은 아직 거의 없습니다.
- 브랜치에 들어 있는 직접 그린 SVG 13개와 이미지 2개는 임시 자리표시이고 모두 교체 대상입니다(품질이 낮아 시안으로도 쓰지 않기로 했습니다).

링크:

- 에셋 브리프 문서: <CLAUDE_DESIGN_ASSET_BRIEF_URL>
- Claude Design 디자인 시스템 "지인 강북점": <CLAUDE_DESIGN_SYSTEM_URL> (이 폴더의 `design-system/` 은 Version 23, 2026-10-06 판 사본)

## 2. 결정 기록

| 날짜 | 결정 | 출처 |
| --- | --- | --- |
| 10-02 | 개편 팔레트는 로고의 구리 `#A8531F` + 슬레이트 `#283038` 로 확정 | Matt |
| 10-02 | 오시는 길 지도는 Matt 이 네이버 지도를 직접 연결. 약도 에셋(MAP-01·02)과 약도용 사진·OpenStreetMap 자료는 필요 없음 | Matt |
| 10-02 | `public/images/logo.png`(4138×992)가 공식 로고. 벡터 원본은 없고, 배경·그림자·그라데이션·반짝이를 뺀 평면 벡터로 단순화하는 것을 승인 | Matt |
| 10-02 | 시설 일러스트는 힘쓰지 않고 위치(16:9 자리)만 잡음. 로비 1장만 임시 샘플, 나머지는 자리표시 | 디자인 시스템 기록 |
| 10-04 | 화면 기준은 개편 캡처(배포 사이트 아님). 사진은 기존 시안 속 의료진 사진만 사용. 공유 이미지는 글자만 있는 A안과 대표원장 사진이 있는 B안을 두고 병원이 선택 | 디자인 시스템 기록 |
| 10-06 | 의료진 사진 3장은 기존 홈페이지에 쓰는 파일이 확보 가능한 가장 큰 원본(재촬영 없음). 1200×1500 목표는 적용하지 않고 원본 크기 그대로 쓰며, 확대·업스케일은 하지 않음 | Matt |
| 10-06 | 아이콘(부위 5종·질환 9종)은 디자인 단계에서 제작·적용하지 않음. 너무 유치해서 개선 과제로 남김 | Matt |
| 10-09 | 위 보류 중 부위 5종은 해제. Claude Design 시안 B("홈 질환 바로가기 개선 시안", 10-08)의 부위 그림 5종과 카드 구성(데스크톱 5열·태블릿 3열·모바일 세로 카드)을 홈에 적용. 질환 아이콘 9종(ICON-D)은 계속 보류 | Matt |
| 10-09 | 주요 질환 페이지(`/medical`) 카드와 질환 상세 상단 그림도 위 부위 그림 5종으로 교체. 질환별 전용 그림은 아직 없어, 같은 부위의 질환은 그 부위 그림을 함께 씀(어깨 3종·척추 2종·신경 2종). 부위↔질환 연결은 `body-parts.ts` 한 곳에서 관리 | Matt |
| 10-09 | 주요 질환 페이지에서 디스크·척추관협착증을 카드 1개로 합침(카드 안에 질환 링크 2개, 카드 8개로 4열 2줄). 상세 페이지·주소·홈·메뉴는 그대로 | Matt |
| 10-06 | 기준 화면 대조표 승인. 공식 로고 `logo.png` 를 Claude Design 에 넘겨 로고 세트·파비콘부터 진행 | Matt |

## 3. Claude Design 진행 현황 (디자인 시스템 Version 23 기준, 2026-10-06)

| 항목 | 상태 | 이 폴더에 있는 것 |
| --- | --- | --- |
| 시설 이미지 자리 규칙(FAC) | 규칙 완료. 파일 없음 | `design-system/components/FacilityCard/README.md` |
| 공유 이미지 OG-01 | A안·B안 규칙 완료. B안 시안 1장만 있음, 역색판 로고 자리 비어 있음 | `reference/claude-design/og-b-mockup.jpg` (1200×630 시안, 납품본 아님) |
| 의료진 크롭 틀(DOC) | 완료. 사진별 `object-position` 은 저장소 원본을 직접 재서 확정(10-06), 크롭 창·표시 크기 상한 기록 | `design-system/components/DocFrame/README.md`, `reference/claude-design/doc-crop-*.jpg`(398×498 화면 해상도, 확인용, 최종 사용 금지) |
| 로고 LOGO-01~03, 파비콘 FAV | 다음 순서(라운드 1에 남은 P0). `logo.png` 가 Claude Design 에 세 번 도착하지 않아 폴더 연결로 전달 예정 | 없음 |
| 아이콘 14개 | 부위 5종(G)은 10-09 시안 B의 그림으로 적용, 질환 9종(D)은 제작·적용 안 함(2026-10-06 Matt) | `design-system/03-icons.md`(참고용, 쓰지 않음. 부위 그림은 이 규격이 아니라 시안 B 그림을 씀) |
| 히어로·의료진 틀 | 완료(HeroFrame, DocFrame). 히어로 태블릿 `object-position` 은 사진이 온 뒤 정함 | `design-system/components/HeroFrame/README.md` |
| 뉴스·영상 기본 이미지 | 라운드 3. 자리 규칙만 있음, Z 심볼(LOGO-03)이 나온 뒤 진행 | `design-system/components/ImageSlots/README.md` |
| 기준 화면 대조표 | Claude Design 이 제출, Matt 승인(2026-10-06). 표는 Claude Design 대화에 있고 시스템 문서에는 없음 | 없음 |

미확정 값(Claude Design 이 제안한 값이라 확정 필요): 시설 안전 영역 5%, 의료진 머리 가로 중심 50%±6%·인용 카드가 덮는 52%(머리 위 여백 8% 목표는 폐기), 모바일 시설 카드 1열 가정, 에셋 안 제목 굵기 700, 아이콘 밖 일러스트의 선 두께·모서리 반경(정해지지 않음).

## 4. 에셋을 코드에 연결하는 곳

줄 번호는 커밋 `209381b`(2026-10-07) 기준입니다. 최종 파일명과 위치는 `design-system/04-delivery-spec.md` 가 정합니다.

| ID | 지금 쓰는 파일 | 코드 위치 | 최종 파일 | 적용할 때 할 일 |
| --- | --- | --- | --- | --- |
| FAC-01~06 | `public/images/illust/facility-*.svg` 6개 | `src/app/intro/IntroClient.tsx` 11~17행 (`FACILITIES` 의 `image`) | `public/images/facility/fac-01-lobby.webp` … (WebP+JPG, 1920×1080) | 16:9 자리표시 처리는 끝났습니다(2026-10-06): `image` 가 비어 있으면 회색 16:9 박스, 경로를 넣으면 사진이 나옵니다. 로비 임시 샘플을 쓰면 "실제와 다를 수 있습니다" 안내를 붙입니다 |
| OG-01 | `public/og-image.jpg` | `src/app/layout.tsx` 50~56행 (`openGraph.images`) | `public/og-image.jpg`(A안), 병원이 B안을 고르면 `og-image-b.jpg` 를 같은 이름으로 | 1200×630, 300KB 이하, 1:1 크롭에서도 병원 이름 온전 |
| LOGO-01 | `public/images/logo-header.png` | `src/components/layout/Header.tsx` 89행(데스크톱), 179행(모바일 메뉴) · `src/components/layout/Footer.tsx` 50행 | `public/images/logo.svg` | `<Image>` 경로 교체, alt 는 "지인마취통증의학과 강북점" |
| LOGO-02 | 없음(푸터에서 흰 카드 위에 올려 씀) | `Footer.tsx` 50행 | `public/images/logo-reversed.svg` | 푸터 어두운 띠에서 흰 카드를 빼고 역색판 사용 |
| LOGO-03 / FAV | `src/app/favicon.ico` 하나뿐 | — | `src/app/icon.svg`, `src/app/apple-icon.png`, `public/icon-192.png`, `public/icon-512.png`, `public/images/logo-symbol.svg` | 매니페스트는 저장소에 없으니 필요하면 새로 추가 |
| ICON-G1~5 | `public/images/illust/part-*.webp` 5개(높이 360px, 투명 배경) | `src/data/body-parts.ts` 의 `icon`, 홈 카드는 `src/app/HomeClient.tsx` "1-b" 구간 | (시안 B 그림을 그대로 변환해 적용함) | **적용 완료(10-09)**. 예전 `part-*.svg` 5개는 더 이상 쓰이지 않음(삭제는 Matt 승인 후) |
| ICON-D1~9 | 부위 그림 5종(ICON-G)을 질환 소속 부위에 맞춰 사용 | `src/app/medical/MedicalClient.tsx` 카드, `src/app/medical/[slug]/MedicalDetailClient.tsx` 상단(데스크톱), 연결은 `src/data/body-parts.ts` 의 `getBodyPartBySlug` | (질환별 전용 그림은 아직 없음) | **부위 그림으로 교체 완료(10-09)**. 예전 lucide 임시 아이콘과 `Zap` 중복은 사라짐. 질환별 전용 그림(`icon-disease-*.svg`)은 계속 보류 |
| HERO-01·02 | 없음(영상 로딩 전·실패 시 `bg-slate-900` 단색 레이어) | `src/app/HomeClient.tsx` 58~67행(바탕 레이어, 항상 그려짐), 69행~(YouTube iframe), 83행(슬레이트 70% 덮개) | `public/images/hero/hero-desktop.webp`, `hero-mobile.webp` | 바탕 레이어 안에 정지 이미지 자리(`<picture>`, 주석 처리)를 만들어 두었습니다(2026-10-06). 파일이 들어오면 그 주석만 풉니다. 그 위 슬레이트 70% 덮개와 글자 영역(좌측 55%)은 `design-system/components/HeroFrame/README.md` 기준 사진이 들어오면 768~1023px 세로 태블릿은 데스크톱 사진 가로의 약 53%만 보여 우측 초점이 반쯤 잘리므로 이 폭에서만 `object-position` 가로를 75% 정도로 두는 것을 검토합니다(실제 사진을 보고 정함). 16:9 화면에서는 사진 세로의 약 80%만 보이므로 촬영 때 핵심 피사체를 세로 10~90% 안쪽에 둡니다 |
| DOC-01~03 | `public/doctor-choi.jpg`(963×1024), `doctor-lee.jpg`(682×1024), `doctor-junghj.jpg`(523×592) | `IntroClient.tsx` 67, 147, 163, 179행 · `intro/doctor-choi/page.tsx` 95행 · `doctor-lee/page.tsx` 90행 · `doctor-jung/page.tsx` 80행 · `HomeClient.tsx` 199행(최용민) | 같은 파일명, 원본 크기 그대로(교체 대상 아님) | 이 사진이 확보 가능한 가장 큰 원본입니다(10-06 Matt). 확대·업스케일 금지. 크기에 맞춰 화면에 표시하는 폭을 정하고 크롭만 맞춥니다. 최용민 사진은 머리 위 여백이 규칙보다 좁게 측정됨(크롭 위치로 조정). **크롭 위치(2026-10-06, Claude Design 이 원본 3장을 받지 못해 저장소 원본을 직접 재서 정함)**: 최용민 4:5·3:4 → `object-[60%_0%]`(얼굴 중심 가로 55%, 가로 0~144px 어디서도 머리·몸통이 잘리지 않음) / 이석면 4:5 → `object-[50%_24%]`, 3:4 → `object-[50%_32%]`(머리 윗끝 세로 9%, 머리 위 여백 약 6%로 맞춤) / 정희진 4:5·3:4 → `object-[50%_0%]`(세로 여유 없음, 머리 윗끝 2.4%, 얼굴 중심 가로 51%). 이 값은 코드에 적용했습니다(2026-10-07, 커밋 `c6a29ee`). 틀 크기는 세 장을 같게 두는 것을 추천하며(정희진만 2배 화면에서 조금 부드럽게 보임), Matt 결정 대기 |
| NEWS-01 | `public/images/placeholder.jpg`(1600×900) | `src/app/news/NewsClient.tsx` 117, 122행 · `src/app/news/[id]/NoticeDetailClient.tsx` 15행 · `news/[id]/page.tsx` 42행(`/images/logo.png` 폴백) | `public/images/placeholder.webp`(1600×1000) | 상세 페이지 폴백 로고 정리는 끝났습니다(2026-10-06, `page.tsx` 42행에서 `/images/logo.png` 폴백 제거 → `NoticeDetailClient` 의 `placeholder.jpg` 폴백으로 떨어짐). `.webp` 경로 교체는 파일이 없는 지금 하면 깨진 이미지가 나오므로 납품 때 파일과 함께 합니다. `docs/db-removal/export-posts.cjs` 63행도 썸네일이 없는 글에 `""` 를 쓰도록 고쳤습니다(2026-10-07, 커밋 `2f456a9`). `public/images/logo.png` 는 로고 벡터 작업의 기준 원본이라 삭제하지 않습니다 |
| MEDIA-01 | 회색 바탕 + `logo-header.png` 로고 카드 | `src/app/HomeClient.tsx` 373행(카드 틀), 408행(`media.image` 없을 때 로고) | `public/images/media-card.webp`(1200×800) | 실제 YouTube 썸네일이 있으면 그것이 우선 |
| 지도 | `public/images/illust/map-schematic*.svg` | `src/app/guide/GuideClient.tsx` 161, 168행 | 없음(네이버 지도 연결) | Matt 이 연결한 뒤 임시 SVG 삭제. 카드 크기 데스크톱 약 690×276, 모바일 약 358×235 |

## 5. 적용 순서

1. 납품 파일을 `design-system/04-delivery-spec.md` 의 위치·이름으로 `public/` 또는 `src/app/` 에 둡니다.
2. `design-system/05-checklist.md` 의 합격 기준을 확인합니다(40px·390px·1440px 미리보기 보드, 토큰 색만 사용, 그라데이션 없음, 용량 상한).
3. 위 표의 코드 위치에서 경로를 바꿉니다. 화면 구성·색·문구는 바꾸지 않습니다.
4. 교체가 끝난 임시 파일(`design-system/05-checklist.md` 의 표)은 삭제 승인을 받은 뒤 지웁니다.
5. 빌드(`npm run build`)와 `reference/captures/` 와 같은 6개 페이지의 데스크톱·모바일 캡처 비교로 확인합니다. 캡처 스크립트는 `tools/capture.py` 입니다.

## 6. 아직 없거나 결정이 필요한 것

- Claude Design: 로고 세트 벡터(logo.png 기준), 파비콘, 히어로·의료진 틀, 뉴스·영상 기본 이미지, - 병원·Matt: 외관 사진 2컷(낮·저녁), 시설 6곳 촬영(`design-system/06-materials.md`), 방송 영상 정지 프레임 이용 조건, 공유 문구 1줄 승인, 공유 이미지 A안·B안 선택.
- 도메인: `src/app/layout.tsx` 의 `metadataBase`(`https://jiin-clinic-gangbuk.com`)와 `openGraph.url`(`https://jiin-gangbuk.com`, 임시)이 서로 다릅니다. 확정이 필요합니다.
- 문구: 에셋 안에는 "전국 80만 명" 같은 수치·광고성 표현을 넣지 않기로 했지만 사이트 본문과 메타 설명에는 있습니다. 의료광고 관련 확인은 병원 몫입니다(법률 자문 아님).
- 개선 과제(아이콘, 2026-10-06 → 10-09 일부 해제): 부위 5종은 10-09에 시안 B의 그림(나노바나나 원본을 잘라 정리, 슬레이트 선 + 평평한 연한 구리 면)과 카드 구성으로 적용했습니다. 해부 형태는 병원 의료진 감수를 받는 것이 디자인 시스템 규칙이므로 공개 전에 확인합니다. 주요 질환 페이지와 상세 상단도 같은 부위 그림을 씁니다(10-09). 질환별 전용 그림은 아직 방향이 없어 보류입니다. 빛 번짐이 있는 원본 판은 디자인 시스템이 금지해 쓰지 않았습니다.
- 미사용 파일 정리(2026-10-07 완료): 쓰지 않던 `public/images/hero/*.png` 4개(24MB), `images/doctors-cartoon.*`, 기본 svg 5개, `public/uploads` 의 AI 데이터센터 이미지, 루트의 일회성 스크립트·덤프 20개를 삭제했습니다(git 에 있던 32개라 이력에서 복구 가능). `public/` 은 63MB → 22MB. 빌드·린트 통과.
  - 지우지 않고 남긴 것: `public/images/logo.png`(로고 벡터 원본, 코드에서는 안 쓰지만 삭제 금지), `fix_hero_video.py`(Matt 의 미커밋 수정 있음, Matt 결정), `public/images/illust/facility-*.svg` 6개(시설 사진이 들어온 뒤 삭제), `public/images/news/post_154613_*.jpg` 2개(아래 뉴스 항목 참고).
  - `_to_review/`(커밋하지 않는 임시 폴더): git 에 없어서 지우면 복구할 수 없는 `1774190097288-척추협착.png`(8.5MB, 블로그 썸네일형 이미지)를 `public/uploads` 에서 옮겨 두었습니다. 사이트에는 배포되지 않습니다. 필요 없으면 Matt 이 직접 지우세요.
  - 뉴스 154613("대한통증학회 발/발목 증식치료 강의"): `src/data/news.ts` 에서 본문(`content`)이 비어 있고 썸네일이 Unsplash 스톡입니다. 본문 사진이었을 `post_154613_0/1.jpg` 가 연결되지 않은 채 남아 있으므로, 이 글의 본문을 복원하거나 정리할 때 함께 다룹니다.
- 남은 일: DB 내보내기와 Neon 비밀번호 교체(Matt).

## 7. 폴더 구성

- `README.md` 이 문서
- `AGENT_INSTRUCTIONS.md` 코딩 에이전트(Antigravity 등)가 먼저 읽는 작업 지침. 지킬 것, 작업 순서, 확인 방법, 보고 형식
- `TASK_PROMPTS.md` 에이전트에게 일을 시킬 때 복사해 쓰는 문구(점검, 코드 준비 작업, 납품 파일 적용)
- `design-system/` Claude Design 디자인 시스템 문서 사본(읽기용). `README.md`(제작 기준), `tokens.json`(색·글꼴·간격·선), `01-asset-list.md` ~ `07-rounds.md`, `components/*/README.md`
- `reference/captures/` 개편 브랜치 화면 캡처 13장(홈, 병원 소개, 주요 질환, 진료 안내, 본원소식, 커뮤니티 × 데스크톱 1440px·모바일 390px). 아이콘·일러스트·지도·뉴스 기본 이미지는 임시 자리표시입니다
- `reference/claude-design/` Claude Design 이 만든 시안에서 꺼낸 이미지(확인용)
- `tools/capture.py` 캡처 스크립트

## 8. 기준 값 요약

색 토큰(전체는 `design-system/tokens.json`): `copper #A8531F`, `copper-light #F0B88C`, `copper-tint #F1DCCD`, `slate #283038`, `slate-muted #55606A`, `bg-page #F6F7F8`, `bg-surface #EEF0F2`, `border-hairline #DDE1E5`, `white #FFFFFF`. 로고 파일 안에서만 `copper-logo #B86028`. 글꼴은 제목 Noto Serif KR, 본문 Noto Sans KR. 크림·아이보리·순수 검정, 그라데이션, 블러, 유리, 글로우, 3D 매끈한 일러스트는 쓰지 않습니다.

## 9. 에셋과 별개로 추가된 화면 작업

- 수치 띠(숫자가 올라가는 모션 구간): `src/components/home/StatsBand.tsx` 를 새로 만들고 `src/app/HomeClient.tsx` 에서 철학 섹션 다음, 본원소식 앞에 연결했습니다(2026-10-06, 2026-10-07 커밋·배포).
- 참고한 화면은 다른 병원 사이트의 수치 모션이며, 수치는 가져오지 않았습니다. 사이트 본문에 이미 있는 수치만 씁니다: 개원 햇수, 80만 명, 3인(네 번째 칸은 2026-10-16 에 "5층"에서 숫자 없는 "다수 출연"으로 변경, `text` 항목). 값은 `StatsBand.tsx` 상단 `STATS` 배열에서 고치고, 바꾸기 전에 병원 확인을 받습니다.
- 모션 줄이기 설정에서는 이동·페이드 없이 숫자만 짧게(1.2초) 올라갑니다(2026-10-07 변경: 처음에는 바로 최종값을 보여 주도록 했으나, 카운팅이 안 보인다는 확인 요청이 있어 바꿨습니다).
- 햇수 기준(2026-10-06 결정: "정확하게 08년 개원 기준"): 개원 연도 2008만 사실로 두고 `src/lib/clinic.ts` 의 `CLINIC_YEARS`(= 올해 − 2008, 2026년 기준 18)로 계산합니다. 수치 띠, 홈 히어로·연혁 제목·후기 문구, 푸터, `/intro` 본문과 배지·메타 설명, `layout.tsx` 메타 설명이 모두 이 값을 씁니다. 해가 바뀌면 다음 배포 때 자동으로 19로 바뀝니다. 개원 월은 반영하지 않은 연도 차이라서, 월까지 맞추려면 개원일이 필요합니다.
- 그대로 둔 "20년": `/intro/doctor-choi` 의 "20년의 임상 경험", `MedicalDetailClient` 의 "20년의 경험"·"20년 임상 경력"은 개원 햇수가 아니라 의료진 경력 표현이라 바꾸지 않았습니다. 병원이 근거를 확인해 주세요.
- 디자인 시스템 README 의 "20년 된 통증의학과의 차분한 신뢰"는 Claude Design 이 "2008년 개원 통증의학과의 차분한 신뢰"로 고쳤습니다(해결, Version 21 이후 사본에 반영).
- 커밋·배포 상태(2026-10-07, 커밋 `3b3c01e`~`209381b` 7개): 이번 변경은 `docs/design-handover/`, `src/components/home/`, `src/lib/clinic.ts` 와 `HomeClient.tsx`, `Footer.tsx`, `IntroClient.tsx`, `intro/page.tsx`, `layout.tsx` 입니다. `fix_hero_video.py` 의 변경은 이 작업과 무관하게 이미 있던 수정이라 건드리지 않았습니다.
- 의료진 사진 규격(2026-10-06 결정): 처음 디자인 시스템 문서에는 의료진 사진을 1200×1500 으로 납품·재촬영하는 것으로 적혀 있었지만 적용하지 않기로 했고, Claude Design 이 이후 판에서 문서를 고쳤습니다. `public/doctor-choi.jpg`(963×1024), `doctor-lee.jpg`(682×1024), `doctor-junghj.jpg`(523×592)가 확보 가능한 가장 큰 원본이라서, 파일은 그대로 두고 크롭 틀과 표시 크기를 이 크기에 맞춥니다. 이 폴더의 `design-system/` 은 Claude Design 원본 사본이라 직접 고치지 않고, 원본이 바뀌면 새로 복사합니다.
- 뉴스 썸네일(2026-10-06 확인): `src/data/news.ts` 의 글 3건이 외부 스톡 사진(Unsplash)을 썸네일로 쓰고 있습니다. 지금은 시안이라 그대로 두며, 실제 운영 전에 병원 자료로 바꾸거나 `posts.json` 으로 교체합니다. 에셋을 하나씩 넣는 작업과 별개라서 이 문서의 어느 표에도 넣지 않았습니다.
- 시설 자리표시 선 두께(2026-10-06): `IntroClient.tsx` 의 `strokeWidth={1.5}` 는 lucide 의 24 단위 뷰박스 값이라 44px 에서 실제 약 2.75px 로 그려집니다(`absoluteStrokeWidth` 를 쓰지 않음). 디자인 시스템 토큰(icon-stroke 2.5, 44px 환산 약 2.3px)보다 약간 굵으며, 사진이 들어오면 사라지는 임시 표시라 그대로 둡니다. 토큰에 맞추려면 `strokeWidth={1.25}` 입니다.
- 라이브 점검(2026-10-07, `209381b` 배포본): Antigravity 가 9개 페이지 × 5개 폭(1440·1024·820·768·390)을 자동 점검했고 콘솔 오류·400 이상 응답·깨진 이미지·가로 스크롤은 없었습니다. "20년"은 의료진 경력 표현 3곳에만 남았습니다. 모바일·태블릿 하단 고정 바(`lg:hidden`, 높이 65px)는 푸터 아래 여백 112px 안에 있어 본문을 가리지 않는 것을 직접 확인했습니다. 수치 띠는 홈에만 있습니다. 제안으로 나온 "스크롤 시 하단 바 숨기기"는 전화 예약 버튼이 핵심 동선이고 화면 구성 변경이라 채택하지 않았습니다.
