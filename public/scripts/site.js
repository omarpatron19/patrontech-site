(() => {
  const root = document.documentElement;

  function setTheme(theme) {
    root.dataset.theme = theme;
    try { localStorage.setItem('patrontech-theme', theme); } catch {}
    document.querySelectorAll('[data-theme-label]').forEach((element) => {
      element.textContent = theme === 'dark' ? '☀' : '☾';
    });
  }

  setTheme(root.dataset.theme || 'dark');

  document.addEventListener('click', (event) => {
    const target = event.target;
    if (!(target instanceof Element)) return;

    const themeButton = target.closest('[data-theme-toggle]');
    if (themeButton) setTheme(root.dataset.theme === 'dark' ? 'light' : 'dark');

    const mobileButton = target.closest('[data-mobile-toggle]');
    if (mobileButton) {
      const menu = document.querySelector('[data-mobile-menu]');
      const isOpen = menu?.classList.toggle('open') ?? false;
      mobileButton.setAttribute('aria-expanded', String(isOpen));
    }

    if (target.closest('[data-mobile-menu] a')) {
      document.querySelector('[data-mobile-menu]')?.classList.remove('open');
      document.querySelector('[data-mobile-toggle]')?.setAttribute('aria-expanded', 'false');
    }
  });

  document.addEventListener('keydown', (event) => {
    if (event.key !== 'Escape') return;
    document.querySelector('[data-mobile-menu]')?.classList.remove('open');
    document.querySelector('[data-mobile-toggle]')?.setAttribute('aria-expanded', 'false');
  });

  document.querySelectorAll('[data-newsletter-form]').forEach((form) => {
    form.addEventListener('submit', (event) => {
      event.preventDefault();
      const input = form.querySelector('input[type="email"]');
      if (input instanceof HTMLInputElement && input.value) {
        window.alert('Gracias. La suscripción quedará habilitada en una próxima fase.');
        input.value = '';
      }
    });
  });
})();
