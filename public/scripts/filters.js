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
    buttons.forEach((button) => button.addEventListener('click', () => {
      buttons.forEach((item) => item.classList.remove('active'));
      button.classList.add('active');
      const filter = button.dataset.newsFilter || 'Todos';
      items.forEach((item) => { item.hidden = filter !== 'Todos' && item.dataset.newsType !== filter; });
    }));
  });
})();
