# 납품 규격과 파일 규칙

납품 파일은 아래 이름과 위치대로 만들면 개발 쪽이 경로만 연결합니다. 코드 수정은 하지 않습니다.

| 종류 | 형식 | 해상도·크기 | 용량 상한 | 파일 위치와 이름 |
| --- | --- | --- | --- | --- |
| 시설 | WebP(품질 80) + JPG 폴백 | 1920×1080 | 200KB | public/images/facility/fac-01-lobby.webp … fac-06-procedure.webp (사이의 네 개도 같은 규칙: 번호-영문 공간명) |
| 아이콘(보류, 납품 없음) | SVG | 48 격자(24판 별도) | 각 3KB | public/images/icons/icon-part-spine.svg, icon-disease-disc.svg 등 |
| 공유 이미지 | JPG | 1200×630 | 300KB | public/og-image.jpg |
| 히어로 | WebP(JPG 폴백은 사이트가 webp만 참조하므로 선택) | 2400×1350, 1080×1350 | 350KB / 200KB | public/images/hero/hero-desktop.webp(768px 이상), hero-mobile.webp(768px 미만) |
| 의료진 | JPG | 새 납품 없음(기존 원본 963×1024, 682×1024, 523×592 그대로) | 원본 그대로 | public/doctor-choi.jpg, doctor-lee.jpg, doctor-junghj.jpg |
| 로고 | SVG | 벡터 | 20KB | public/images/logo.svg, logo-reversed.svg, logo-symbol.svg |
| 파비콘 | ICO·SVG·PNG | 16~512px | 각 20KB | src/app/favicon.ico, src/app/icon.svg, src/app/apple-icon.png, public/icon-192.png, public/icon-512.png |
| 기본 이미지 | WebP + JPG | 1600×1000, 1200×800 | 100KB | public/images/placeholder.webp, public/images/media-card.webp |

## SVG 규칙

- viewBox는 필수입니다.
- 색은 토큰 값 #RRGGBB만 씁니다. 그라데이션, 필터, 블러, 내장 비트맵은 금지입니다.
- 글자는 모두 윤곽선(outline)으로 변환해 글꼴에 의존하지 않게 합니다.
- 레이어는 단순하게 유지합니다. 색 공간은 sRGB입니다.
- 사용한 색 목록을 납품과 함께 보냅니다.

## 대체 텍스트(alt)

- 이미지를 설명하는 한국어 문장으로 함께 납품합니다.
- 장식용 아이콘(라벨이 옆에 있는 경우)의 alt는 비워 둡니다.

## 표시 크기와 납품 크기

납품은 화면 표시 크기의 2배 이상으로 만듭니다(고해상도 화면용). 자리별 표시 크기는 "에셋 마스터 목록"에 있습니다.
