# photologs

사진과 글로 남기는 정적 기록 사이트. **빌드 없음** · 순수 HTML/CSS/JS · GitHub Pages 발행.
마크다운으로 글을 쓰면 브라우저에서 바로 렌더링됩니다. 화이트 톤 + 다크모드 토글 지원.

## 릴리즈된 페이지

| 날짜 | 제목 | 태그 | 링크 |
| --- | --- | --- | --- |
| 2026-06-03 | 제주, 6월의 빛 | travel, jeju | [열기](releases/2026-06-jeju/) |

> 메인(블로그형 목록): [`releases/`](releases/) · 새 글을 릴리즈할 때 위 표에 한 줄 추가.

## 구조

```
index.html        루트 → releases/ 로 이동
releases/         발행된 페이지 + 메인 메뉴(index.html) + posts.json(매니페스트)
drafts/           작성 중인 페이지 (_template/ 복사해서 시작)
shared/           공통 스타일/스크립트 (style.css, theme.js, nav.js, page.js, vendor/marked)
```

## 새 글 작성 → 릴리즈

1. **시작**: `drafts/_template/` 폴더를 `drafts/<slug>/` 로 복사.
2. **작성**: `content.md` 의 frontmatter(title/date/cover/tags/excerpt)와 본문을 채우고,
   이미지는 `assets/` 에 넣습니다. 갤러리는 ```` ```gallery ```` 블록에 경로를 한 줄씩.
3. **미리보기**: `file://` 로는 안 되고 로컬 서버가 필요합니다.
   ```bash
   python3 -m http.server 8000
   # http://localhost:8000/drafts/<slug>/ 확인
   ```
4. **릴리즈**:
   - `drafts/<slug>/` → `releases/<slug>/` 로 이동
   - `releases/posts.json` 에 항목 1개 추가 (slug/title/date/cover/tags/excerpt)
   - 이 README 의 "릴리즈된 페이지" 표에 한 줄 추가
   - 커밋 & 푸시

## GitHub Pages 설정 (최초 1회)

Settings → Pages → Source: **Deploy from a branch**, Branch: `main` / `/ (root)`.
발행 후 `https://<user>.github.io/<repo>/` 로 접속하면 `releases/` 메인으로 이동합니다.

> 참고: `drafts/` 는 링크되지 않지만 정적 호스팅 특성상 URL을 알면 접근 가능합니다.
> 루트의 `.nojekyll` 파일은 GitHub Pages의 Jekyll 처리를 끄기 위한 것이므로 지우지 마세요.
