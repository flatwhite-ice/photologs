# FocalDepth

사진가용 **카메라 포맷 환산기** — 임의의 필름/센서 포맷 + 초점거리 + 조리개를
**135 풀프레임 기준**의 환산 화각·환산 조리개(심도 등가)와 실제 심도로 실시간 변환.

> 예) 6×12에서 58mm f/5.6 → **환산 20mm f/1.9 (FF)**

빌드 없는 순수 정적 웹앱. photologs 사이트의 `docs/apps/focaldepth/`에 위치.

## 구성
```
index.html       앱 셸
src/convert.js   환산 엔진 (순수 함수)
src/formats.js   포맷 데이터시트 (소형~대형 필름, APS, 1인치, 아이폰 전 기종)
src/app.js       UI 와이어링
src/app.css      앱 스타일
```
공유 의존: `../../shared/{style.css, theme.js, nav.js}` (다크모드·헤더).

## 로컬 실행
`fetch`/모듈 로드 때문에 로컬 서버가 필요합니다. **저장소 루트**에서:
```bash
python3 -m http.server 8000
# http://127.0.0.1:8000/docs/apps/focaldepth/
```

## 문서
- 상세 사양·환산 수학·데이터 출처·로드맵·분리 계획: [SPEC.md](SPEC.md)
