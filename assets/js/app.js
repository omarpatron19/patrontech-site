
(function(){
  const root = document.documentElement;
  const storedTheme = localStorage.getItem("patrontech-theme");
  const prefersDark = window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches;
  root.dataset.theme = storedTheme || (prefersDark ? "dark" : "light");

  function setTheme(theme){
    root.dataset.theme = theme;
    localStorage.setItem("patrontech-theme", theme);
    document.querySelectorAll("[data-theme-label]").forEach(el => {
      el.textContent = theme === "dark" ? "☀" : "☾";
    });
  }

  document.addEventListener("click", (e) => {
    const themeButton = e.target.closest("[data-theme-toggle]");
    if(themeButton){
      setTheme(root.dataset.theme === "dark" ? "light" : "dark");
    }
    const mobileButton = e.target.closest("[data-mobile-toggle]");
    if(mobileButton){
      document.querySelector(".mobile-menu")?.classList.toggle("open");
    }
  });

  setTheme(root.dataset.theme);

  // Active navigation
  const current = location.pathname.split("/").pop() || "index.html";
  document.querySelectorAll(".nav a, .mobile-menu a").forEach(a => {
    const href = a.getAttribute("href");
    if(href === current || (current === "" && href === "index.html")) a.classList.add("active");
  });

  // Newsletter demo
  document.querySelectorAll(".subscribe-form").forEach(form => {
    form.addEventListener("submit", e => {
      e.preventDefault();
      const input = form.querySelector("input[type=email]");
      if(input && input.value){
        alert("Gracias. La suscripción quedará habilitada en una próxima fase.");
        input.value = "";
      }
    });
  });

  const data = window.PATRONTECH_DATA || {posts:[], news:[], resources:[]};

  function cardHtml(post){
    return `<article class="card" data-category="${post.category}" data-type="${post.type}" data-title="${post.title.toLowerCase()}">
      <span class="badge">${post.category}</span>
      <h3><a href="articulo.html?slug=${post.slug}">${post.title}</a></h3>
      <p>${post.summary}</p>
      <div class="meta"><span>${post.type}</span><span>${post.date}</span><span>${post.read}</span></div>
    </article>`;
  }

  const postsRoot = document.querySelector("[data-posts-grid]");
  if(postsRoot){
    postsRoot.innerHTML = data.posts.map(cardHtml).join("");
  }

  const latestRoot = document.querySelector("[data-latest-grid]");
  if(latestRoot){
    latestRoot.innerHTML = data.posts.slice(1,4).map(cardHtml).join("");
  }

  const resourcesRoot = document.querySelector("[data-resources-grid]");
  if(resourcesRoot){
    resourcesRoot.innerHTML = data.resources.map(r => `
      <article class="card">
        <span class="badge">${r.kind}</span>
        <h3>${r.title}</h3>
        <p>${r.desc}</p>
        <a class="text-link" href="recursos.html">Ver recurso →</a>
      </article>`).join("");
  }

  const newsRoot = document.querySelector("[data-news-list]");
  function renderNews(filter="Todos"){
    if(!newsRoot) return;
    const list = filter === "Todos" ? data.news : data.news.filter(n => n.type === filter);
    newsRoot.innerHTML = list.map(n => `
      <article class="news-item">
        <div><span class="badge">${n.type}</span><br><strong>${n.title}</strong></div>
        <span class="meta">${n.date}</span>
      </article>`).join("");
  }
  renderNews();

  document.querySelectorAll("[data-news-filter]").forEach(btn => {
    btn.addEventListener("click", () => {
      document.querySelectorAll("[data-news-filter]").forEach(b => b.classList.remove("active"));
      btn.classList.add("active");
      renderNews(btn.dataset.newsFilter);
    });
  });

  // Filters and search
  const listing = document.querySelector("[data-filterable]");
  if(listing){
    let activeFilter = "Todos";
    let query = "";
    const apply = () => {
      let visible = 0;
      listing.querySelectorAll(".card").forEach(card => {
        const matchesFilter = activeFilter === "Todos" || card.dataset.category === activeFilter || card.dataset.type === activeFilter;
        const matchesSearch = !query || card.dataset.title.includes(query);
        const show = matchesFilter && matchesSearch;
        card.style.display = show ? "" : "none";
        if(show) visible++;
      });
      const empty = document.querySelector(".empty-state");
      if(empty) empty.style.display = visible ? "none" : "block";
    };
    document.querySelectorAll("[data-filter]").forEach(btn => {
      btn.addEventListener("click", () => {
        document.querySelectorAll("[data-filter]").forEach(b => b.classList.remove("active"));
        btn.classList.add("active");
        activeFilter = btn.dataset.filter;
        apply();
      });
    });
    const search = document.querySelector("[data-search]");
    if(search){
      search.addEventListener("input", () => {
        query = search.value.trim().toLowerCase();
        apply();
      });
    }
  }

  // Article page data
  const articleTitle = document.querySelector("[data-article-title]");
  if(articleTitle){
    const params = new URLSearchParams(location.search);
    const slug = params.get("slug");
    const post = data.posts.find(p => p.slug === slug) || data.posts[0];
    articleTitle.textContent = post.title;
    document.querySelector("[data-article-category]").textContent = post.category;
    document.querySelector("[data-article-summary]").textContent = post.summary;
    document.querySelector("[data-article-meta]").innerHTML = `<span>${post.type}</span><span>${post.date}</span><span>${post.read}</span><span>Irving Omar Patron Padron</span>`;
    document.title = `${post.title} | PatronTech`;
  }
})();
