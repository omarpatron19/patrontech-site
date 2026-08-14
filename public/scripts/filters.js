(() => {
  document.querySelectorAll('[data-filter-shell]').forEach((shell) => {
    const listing = shell.querySelector('[data-filterable]');
    if (!listing) return;

    let activeFilter = new URLSearchParams(window.location.search).get('categoria') || 'Todos';
    let query = '';

    const buttons = [...shell.querySelectorAll('[data-filter]')];
    const search = shell.querySelector('[data-search]');
    const empty = shell.querySelector('[data-empty]');

    function apply() {
      let visible = 0;
      listing.querySelectorAll('[data-title]').forEach((card) => {
        const matchesFilter = activeFilter === 'Todos'
          || card.dataset.category === activeFilter
          || card.dataset.type === activeFilter;
        const matchesSearch = !query || (card.dataset.title || '').includes(query);
        const show = matchesFilter && matchesSearch;
        card.hidden = !show;
        if (show) visible += 1;
      });
      if (empty) empty.hidden = visible > 0;
    }

    buttons.forEach((button) => {
      if (button.dataset.filter === activeFilter) button.classList.add('active');
      else button.classList.remove('active');

      button.addEventListener('click', () => {
        buttons.forEach((item) => item.classList.remove('active'));
        button.classList.add('active');
        activeFilter = button.dataset.filter || 'Todos';
        apply();
      });
    });

    if (search instanceof HTMLInputElement) {
      search.addEventListener('input', () => {
        query = search.value.trim().toLowerCase();
        apply();
      });
    }

    apply();
  });

  document.querySelectorAll('[data-news-shell]').forEach((shell) => {
    const buttons = [...shell.querySelectorAll('[data-news-filter]')];
    const items = [...shell.querySelectorAll('[data-news-type]')];
    const empty = shell.querySelector('[data-news-empty]');
    const emptyCopy = shell.querySelector('[data-news-empty-copy]');
    const emptyLink = shell.querySelector('[data-news-empty-link]');

    function setEmptyState(filter, visible) {
      if (!(empty instanceof HTMLElement)) return;

      empty.hidden = visible > 0;
      if (visible > 0) return;

      if (emptyCopy instanceof HTMLElement) {
        emptyCopy.textContent = filter === 'Certificaciones'
          ? 'Aún no hay novedades de certificaciones en este bloque. Consulta el mapa vigente de Microsoft Credentials.'
          : filter === 'Todos'
            ? 'Aún no hay novedades publicadas.'
            : `Aún no hay novedades publicadas de ${filter.toLowerCase()}.`;
      }

      if (emptyLink instanceof HTMLAnchorElement) {
        if (filter === 'Certificaciones') {
          emptyLink.href = '/certificaciones/';
          emptyLink.textContent = 'Ver mapa de certificaciones →';
        } else {
          emptyLink.href = '/novedades/';
          emptyLink.textContent = 'Abrir centro de novedades →';
        }
      }
    }

    function apply(filter = 'Todos') {
      let visible = 0;

      items.forEach((item) => {
        if (!(item instanceof HTMLElement)) return;
        const show = filter === 'Todos' || item.dataset.newsType === filter;
        item.hidden = !show;
        if (show) visible += 1;
      });

      setEmptyState(filter, visible);
    }

    buttons.forEach((button) => {
      button.addEventListener('click', () => {
        buttons.forEach((item) => item.classList.remove('active'));
        button.classList.add('active');
        apply(button.dataset.newsFilter || 'Todos');
      });
    });

    const active = buttons.find((button) => button.classList.contains('active'));
    apply(active?.dataset.newsFilter || 'Todos');
  });
})();
