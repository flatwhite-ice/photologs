# photologs

사진과 글로 남기는 정적 기록 사이트. **빌드 없음** · 순수 HTML/CSS/JS · GitHub Pages 발행.
마크다운으로 글을 쓰면 브라우저에서 바로 렌더링됩니다. 화이트 톤 + 다크모드 토글 지원.

## 릴리즈된 페이지

| 날짜 | 제목 | 태그 | 링크 |
| --- | --- | --- | --- |
| 2026-06-03 | 제주, 6월의 빛 | travel, jeju | [열기](docs/releases/2026-06-jeju/) |

> 메인(블로그형 목록): [`docs/releases/`](docs/releases/) · 새 글을 릴리즈할 때 위 표에 한 줄 추가.

## 구조

발행되는 사이트는 모두 `docs/` 아래에 있습니다 (GitHub Pages가 `docs/` 폴더를 사이트 루트로 서빙).

```
README.md            저장소 설명 (발행 대상 아님)
docs/                ← GitHub Pages 사이트 루트
  index.html         루트 → releases/ 로 이동
  releases/          발행된 페이지 + 메인 메뉴(index.html) + posts.json(매니페스트)
  apps/              인터랙티브 정적 앱 (focaldepth: 포맷별 화각·심도 환산기 — apps/focaldepth/SPEC.md)
  drafts/            작성 중인 페이지 (_template/ 복사해서 시작)
  shared/            공통 스타일/스크립트 (style.css, theme.js, nav.js, page.js, vendor/marked)
  .nojekyll          Jekyll 비활성화 (지우지 말 것)
```

## 새 글 작성 → 릴리즈

1. **시작**: `docs/drafts/_template/` 폴더를 `docs/drafts/<slug>/` 로 복사.
2. **작성**: `content.md` 의 frontmatter(title/date/cover/tags/excerpt)와 본문을 채우고,
   이미지는 `assets/` 에 넣습니다. 갤러리는 ```` ```gallery ```` 블록에 경로를 한 줄씩.
3. **미리보기**: `file://` 로는 안 되고 로컬 서버가 필요합니다. 저장소 루트에서 실행하세요.
   ```bash
   python3 -m http.server 8000
   # http://localhost:8000/docs/drafts/<slug>/ 확인
   ```
4. **릴리즈**:
   - `docs/drafts/<slug>/` → `docs/releases/<slug>/` 로 이동 (폴더 깊이가 같아 경로 수정 불필요)
   - `docs/releases/posts.json` 에 항목 1개 추가 (slug/title/date/cover/tags/excerpt)
   - 이 README 의 "릴리즈된 페이지" 표에 한 줄 추가
   - 커밋 & 푸시

## GitHub Pages 설정 (최초 1회)

Settings → Pages → Source: **Deploy from a branch**, Branch: `main` / **`/docs`**.
발행 후 `https://<user>.github.io/<repo>/` 로 접속하면 (`docs/index.html` 이 사이트 루트가 되어)
`releases/` 메인으로 이동합니다.

> 참고: `docs/drafts/` 는 링크되지 않지만 정적 호스팅 특성상 URL을 알면 접근 가능합니다.
> `docs/.nojekyll` 파일은 GitHub Pages의 Jekyll 처리를 끄기 위한 것이므로 지우지 마세요.
