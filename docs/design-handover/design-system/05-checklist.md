# 합격 기준과 교체 대상

납품물을 아래 기준으로 확인하고, 통과하지 못하면 다시 만듭니다. 확인 증빙으로 40px·390px·1440px 실제 크기 미리보기 보드를 함께 납품합니다.

## 합격 기준

- [ ] 아이콘을 40px로 줄여도 어느 부위인지 바로 알아본다(어깨가 돋보기로 보이는 식의 오해 없음). 아이콘 보류 중에는 해당 없음.
- [ ] 14개 아이콘이 한 사람이 그린 세트로 보인다(선 두께·모서리·색 수 동일). 아이콘 보류 중에는 해당 없음.
- [ ] 색은 브랜드 토큰 값만 쓴다(사용한 색 목록을 함께 납품).
- [ ] 그라데이션·블러·유리·그림자 더미·네온이 없다.
- [ ] 시설·의료진·히어로 이미지 자리는 비율이 고정되어 있고, 사진이 없거나 불러오기에 실패해도 같은 자리표시로 보인다. 로비 임시 샘플을 쓰는 동안은 "실제와 다를 수 있습니다" 안내를 붙이고, 사진이 도착하면 지운다.
- [ ] 공유 이미지는 카카오톡 1:1 잘림에서도 병원 이름이 온전히 보인다.
- [ ] 로고는 원본과 형태·비율이 같다(겹쳐서 비교한 이미지 첨부).
- [ ] 해부학적 정확도는 병원 의료진이 확인했다. 아이콘 보류 중에는 해당 없음.
- [ ] 병원 관계자 2명 이상이 보고 "AI로 만든 느낌"이라는 지적이 없다.
- [ ] 용량·파일 이름·alt 텍스트가 납품 규격과 같다.
- [ ] 전후 사진·후기·시술 건수·치료 효과 암시 요소가 없다.

## 지금 브랜치에 들어 있는 임시 에셋 (모두 교체 대상)

아래 파일은 직접 그린 자리표시자라 수준이 낮습니다. 새 에셋이 납품되면 경로를 바꾸고 아래 파일은 삭제합니다.

| 임시 파일 (public/ 기준) | 교체하는 에셋 |
| --- | --- |
| images/illust/facility-lobby.svg, facility-diagnosis.svg, facility-manual-therapy.svg, facility-private-ward.svg, facility-eswt.svg, facility-procedure.svg | FAC-01~06 (실제 사진, 없으면 자리표시) |
| images/illust/part-spine.svg, part-shoulder.svg, part-hand.svg, part-knee.svg, part-nerve.svg | ICON-G1~5 (보류 중이라 임시 파일을 그대로 둠) |
| og-image.jpg | OG-01 |
| images/placeholder.jpg | NEWS-01 |

교체와는 별개로 정리할 파일(승인 후 삭제): 앱에서 쓰지 않는 images/hero/*.png(24MB), images/doctors-cartoon.*, public/uploads(17MB), 남아 있는 기본 file.svg·globe.svg·next.svg·vercel.svg·window.svg.
