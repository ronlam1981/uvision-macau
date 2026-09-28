(() => {
  const toggle = document.getElementById('language-toggle');
  function setLanguage(lang) {
    document.querySelectorAll('[data-zh]').forEach(el => el.hidden = lang !== 'zh');
    document.querySelectorAll('[data-en]').forEach(el => el.hidden = lang !== 'en');
    document.documentElement.lang = lang === 'en' ? 'en' : 'zh-Hant-MO';
    toggle.textContent = lang === 'en' ? '繁中' : 'EN';
    toggle.setAttribute('aria-label', lang === 'en' ? '切換至繁體中文' : 'Switch to English');
    document.title = document.body.dataset[lang === 'en' ? 'titleEn' : 'titleZh'] + '｜U Vision Consulting';
    const url = new URL(location.href);
    if (lang === 'en') url.searchParams.set('lang', 'en'); else url.searchParams.delete('lang');
    if (/^#cases-(zh|en)$/.test(url.hash)) url.hash = '#cases-' + lang;
    history.replaceState(null, '', url);
    document.querySelectorAll('.uv-header a, .uv-breadcrumbs a').forEach(a => {
      const href = a.getAttribute('href');
      if (href.startsWith('/#') || href.startsWith('/?lang=en#') || href === '/' || href === '/?lang=en') {
        const hash = new URL(a.href).hash;
        a.setAttribute('href', '/' + (lang === 'en' ? '?lang=en' : '') + hash);
      }
    });
  }
  toggle.addEventListener('click', () => setLanguage(document.documentElement.lang === 'en' ? 'zh' : 'en'));
  setLanguage(new URLSearchParams(location.search).get('lang') === 'en' ? 'en' : 'zh');
})();
