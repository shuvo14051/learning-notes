(function () {
  const root = document.documentElement.dataset.root || "";
  const posts = (window.BLOG_POSTS || []).map((post, index) => ({
    ...post,
    index,
  }));
  const topics = [
    ["Statistics", "statistics"],
    ["Linear Algebra", "linear-algebra"],
    ["OOP", "oop"],
    ["DSA", "dsa"],
    ["SQL", "sql"],
    ["Python Concepts", "python-concepts"],
  ];

  const href = (path) => `${root}${path}`;

  function header() {
    const target = document.querySelector("[data-header]");
    if (!target) return;
    target.innerHTML = `<header class="site-header"><a class="brand" href="${href("index.html")}" aria-label="Ahamed Learning Notes home"><span class="brand-mark"><i></i><b></b></span><span>Ahamed Learning Notes</span></a><button class="menu-button" aria-label="Open navigation" aria-expanded="false">Menu</button><nav>${topics.map(([name, slug]) => `<a href="${href(`topics/${slug}/index.html`)}">${name}</a>`).join("")}</nav><button class="search-button" aria-label="Search notes"><span></span> Search</button></header><div class="search-panel" hidden><div><input type="search" placeholder="Search every note..." aria-label="Search every note"><button aria-label="Close search">Close</button></div><section class="search-results"></section></div>`;
    const menu = target.querySelector(".menu-button");
    const nav = target.querySelector("nav");
    menu.addEventListener("click", () => {
      const open = menu.getAttribute("aria-expanded") === "true";
      menu.setAttribute("aria-expanded", String(!open));
      nav.classList.toggle("open", !open);
    });
    const panel = target.querySelector(".search-panel");
    const input = panel.querySelector("input");
    target.querySelector(".search-button").addEventListener("click", () => {
      panel.hidden = false;
      input.focus();
    });
    panel
      .querySelector("button")
      .addEventListener("click", () => (panel.hidden = true));
    input.addEventListener("input", () => {
      const value = input.value.toLowerCase().trim();
      const matches = value
        ? posts
            .filter((post) =>
              `${post.title} ${post.topic} ${post.description}`
                .toLowerCase()
                .includes(value),
            )
            .slice(0, 6)
        : [];
      panel.querySelector(".search-results").innerHTML =
        matches
          .map(
            (post) =>
              `<a href="${href(post.path)}"><span>${post.topic}</span><strong>${post.title}</strong></a>`,
          )
          .join("") ||
        (value ? "<p>No notes found. Try another phrase.</p>" : "");
    });
  }

  function footer() {
    const target = document.querySelector("[data-footer]");
    if (!target) return;
    target.innerHTML = `<footer><div><a class="brand footer-brand" href="${href("index.html")}"><span class="brand-mark"><i></i><b></b></span><span>Ahamed Learning Notes</span></a><p>A growing atlas of mathematics, programming, and data notes built for lasting understanding.</p></div><div><strong>Explore</strong>${topics.map(([name, slug]) => `<a href="${href(`topics/${slug}/index.html`)}">${name}</a>`).join("")}</div><div><strong>Built simply</strong><p>Plain HTML, CSS, and JavaScript. Easy to edit, move, and host anywhere.</p></div></footer>`;
  }

  function card(post) {
    return `<article class="post-card ${post.color}"><a href="${href(post.path)}"><div class="card-top"><span>${post.topic}</span><time>${post.date}</time></div><div class="card-visual"><b>${post.symbol}</b><i></i><i></i><i></i></div><h3>${post.title}</h3><p>${post.description}</p><span class="read-link">Read note <b>→</b></span></a></article>`;
  }

  function home() {
    const grid = document.querySelector("[data-post-grid]");
    if (!grid) return;
    const perPage = 6;
    let page = 1;
    function render() {
      const start = (page - 1) * perPage;
      grid.innerHTML = posts
        .slice(start, start + perPage)
        .map(card)
        .join("");
      const total = Math.ceil(posts.length / perPage);
      document.querySelector("[data-pagination]").innerHTML = Array.from(
        { length: total },
        (_, index) =>
          `<button class="${page === index + 1 ? "active" : ""}" data-page="${index + 1}">${index + 1}</button>`,
      ).join("");
      document.querySelectorAll("[data-page]").forEach((button) =>
        button.addEventListener("click", () => {
          page = Number(button.dataset.page);
          render();
          grid.scrollIntoView({ behavior: "smooth", block: "start" });
        }),
      );
    }
    render();
  }

  function topicPage() {
    const grid = document.querySelector("[data-topic-grid]");
    if (!grid) return;
    const slug = document.body.dataset.topic;
    const filtered = posts.filter((post) => post.topicSlug === slug);
    grid.innerHTML = filtered.map(card).join("");
    const count = document.querySelector("[data-topic-count]");
    if (count) count.textContent = `${filtered.length} notes`;
  }

  function related() {
    const container = document.querySelector("[data-related]");
    if (!container) return;
    const topic = document.body.dataset.topic;
    const current = document.body.dataset.post;
    const sameTopic = posts.filter(
      (post) => post.topicSlug === topic && post.slug !== current,
    );
    const others = posts.filter((post) => post.topicSlug !== topic);
    container.innerHTML = [...sameTopic, ...others]
      .slice(0, 4)
      .map(
        (post) =>
          `<a href="${href(post.path)}"><span>${post.topic}</span><strong>${post.title}</strong><b>→</b></a>`,
      )
      .join("");
  }

  function highlightPython() {
    if (document.body.dataset.topic === "sql") return;

    const escape = (value) =>
      value
        .replaceAll("&", "&amp;")
        .replaceAll("<", "&lt;")
        .replaceAll(">", "&gt;");

    const tokenPattern =
      /(#.*$|"""[\s\S]*?"""|'''[\s\S]*?'''|"(?:\\.|[^"\\])*"|'(?:\\.|[^'\\])*'|\b(?:and|as|assert|async|await|break|class|continue|def|del|elif|else|except|finally|for|from|global|if|import|in|is|lambda|nonlocal|not|or|pass|raise|return|try|while|with|yield)\b|\b(?:True|False|None)\b|\b(?:abs|all|any|bool|dict|enumerate|filter|float|int|len|list|map|max|min|open|print|range|reversed|round|set|sorted|str|sum|super|tuple|type|zip)\b|\b\d+(?:\.\d+)?\b)/gm;

    document.querySelectorAll(".article-content pre code").forEach((block) => {
      if (block.dataset.highlighted === "python") return;

      block.innerHTML = escape(block.textContent).replace(
        tokenPattern,
        (token) => {
          let type = "number";

          if (token.startsWith("#")) type = "comment";
          else if (/^["']/.test(token)) type = "string";
          else if (/^(True|False|None)$/.test(token)) type = "constant";
          else if (/^(abs|all|any|bool|dict|enumerate|filter|float|int|len|list|map|max|min|open|print|range|reversed|round|set|sorted|str|sum|super|tuple|type|zip)$/.test(token)) type = "builtin";
          else if (/^[A-Za-z]/.test(token)) type = "keyword";

          return `<span class="code-${type}">${token}</span>`;
        },
      );

      block.dataset.highlighted = "python";
      block.parentElement.classList.add("python-code");
    });
  }

  header();
  footer();
  home();
  topicPage();
  related();
  highlightPython();
})();
