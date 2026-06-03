/* photologs — 글(아티클) 렌더러
   content.md 를 fetch → frontmatter 파싱 → 본문 마크다운 변환 → 갤러리/라이트박스/리빌 강화.
   사용: <script src="<경로>/shared/page.js" data-src="content.md"></script>
   대상 컨테이너: <article id="article"></article> */
(function () {
  var script = document.currentScript;
  var src = (script && script.dataset.src) || "content.md";

  document.addEventListener("DOMContentLoaded", function () {
    var mount = document.getElementById("article");
    if (!mount) return;

    fetch(src)
      .then(function (r) {
        if (!r.ok) throw new Error("content.md 로드 실패 (" + r.status + ")");
        return r.text();
      })
      .then(function (raw) { render(mount, raw); })
      .catch(function (err) {
        mount.innerHTML =
          '<div class="empty">글을 불러오지 못했습니다.<br><small>' +
          err.message + "</small></div>";
      });
  });

  /* ---- frontmatter 파싱 ---- */
  function parseFrontmatter(raw) {
    var fm = {};
    var body = raw;
    var m = raw.match(/^---\s*\n([\s\S]*?)\n---\s*\n?/);
    if (m) {
      body = raw.slice(m[0].length);
      m[1].split("\n").forEach(function (line) {
        var idx = line.indexOf(":");
        if (idx === -1) return;
        var key = line.slice(0, idx).trim();
        var val = line.slice(idx + 1).trim();
        if (!key) return;
        if (val[0] === "[" && val[val.length - 1] === "]") {
          val = val.slice(1, -1).split(",").map(function (s) {
            return s.trim().replace(/^["']|["']$/g, "");
          }).filter(Boolean);
        } else {
          val = val.replace(/^["']|["']$/g, "");
        }
        fm[key] = val;
      });
    }
    return { fm: fm, body: body };
  }

  function esc(s) {
    return String(s).replace(/[&<>"]/g, function (c) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c];
    });
  }

  function render(mount, raw) {
    var parsed = parseFrontmatter(raw);
    var fm = parsed.fm;

    if (fm.title) document.title = fm.title + " · photologs";

    // 헤더
    var header = "";
    if (fm.title || fm.date) {
      var tags = Array.isArray(fm.tags) ? fm.tags : (fm.tags ? [fm.tags] : []);
      header =
        '<header class="article__header reveal">' +
        (fm.title ? '<h1 class="article__title">' + esc(fm.title) + "</h1>" : "") +
        '<div class="article__meta">' +
        (fm.date ? "<time>" + esc(fm.date) + "</time>" : "") +
        tags.map(function (t) { return '<span class="tag">' + esc(t) + "</span>"; }).join("") +
        "</div></header>";
    }
    var cover = fm.cover
      ? '<img class="article__cover reveal" src="' + esc(fm.cover) + '" alt="' + esc(fm.title || "") + '">'
      : "";

    // 본문
    if (window.marked && window.marked.setOptions) {
      window.marked.setOptions({ breaks: false, gfm: true });
    }
    var html = window.marked.parse(parsed.body);

    mount.innerHTML = header + cover + '<div class="prose">' + html + "</div>";

    enhanceGalleries(mount);
    bindLightbox(mount);
    revealOnScroll(mount);
  }

  /* ---- ```gallery 블록 → 그리드 ---- */
  function enhanceGalleries(root) {
    root.querySelectorAll("pre > code.language-gallery").forEach(function (code) {
      var imgs = code.textContent.split("\n")
        .map(function (s) { return s.trim(); })
        .filter(Boolean);
      var grid = document.createElement("div");
      grid.className = "gallery reveal";
      grid.innerHTML = imgs.map(function (srcv) {
        return '<img src="' + esc(srcv) + '" alt="" loading="lazy">';
      }).join("");
      var pre = code.parentElement;
      pre.parentNode.replaceChild(grid, pre);
    });
  }

  /* ---- 라이트박스 ---- */
  function bindLightbox(root) {
    var box = document.querySelector(".lightbox");
    if (!box) {
      box = document.createElement("div");
      box.className = "lightbox";
      box.innerHTML = '<img alt="">';
      document.body.appendChild(box);
      box.addEventListener("click", function () { box.classList.remove("is-open"); });
    }
    var boxImg = box.querySelector("img");
    root.querySelectorAll(".prose img, .gallery img").forEach(function (img) {
      img.addEventListener("click", function () {
        boxImg.src = img.currentSrc || img.src;
        box.classList.add("is-open");
      });
    });
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape") box.classList.remove("is-open");
    });
  }

  /* ---- 스크롤 리빌 ---- */
  function revealOnScroll(root) {
    var items = root.querySelectorAll(".reveal");
    if (!("IntersectionObserver" in window)) {
      items.forEach(function (el) { el.classList.add("is-visible"); });
      return;
    }
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          io.unobserve(entry.target);
        }
      });
    }, { threshold: .12 });
    items.forEach(function (el) { io.observe(el); });
  }
})();
