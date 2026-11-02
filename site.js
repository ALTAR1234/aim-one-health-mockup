// Shared chrome for every page of the mockup: notice bar, glass header with the liquid tab
// lens, mobile drawer, footer, moving light, Daylight/Night switch, icons and scroll reveals.
(() => {
  const root = document.documentElement;
  root.classList.add('js');
  try { const t = localStorage.getItem('aim.theme'); if (t) root.dataset.theme = t; } catch {}

  const PAGES = [
    ['index.html', 'Mission'], ['tools.html', 'Tools'], ['navigator.html', 'Navigator'],
    ['research.html', 'Open Research'], ['resources.html', 'Resources'], ['blog.html', 'Blog'],
  ];
  const here = document.body.dataset.page || 'index.html';
  // the icon sidebar: every page, with its name shown when you point at (or tab to) the icon
  const RAIL = [
    ['index.html', 'Mission', 'target'], ['tools.html', 'Tools', 'layers'], ['navigator.html', 'Oncology Navigator', 'compass'],
    ['research.html', 'Open Research', 'dna'], ['resources.html', 'Resources', 'book'], ['blog.html', 'Blog', 'chat'], ['report.html', 'Sample report', 'doc'],
  ];

  // ---------- icons (simple 24px strokes) ----------
  const P = {
    globe: '<circle cx="12" cy="12" r="9"/><path d="M3 12h18M12 3c2.8 3 2.8 15 0 18M12 3c-2.8 3-2.8 15 0 18"/>',
    user: '<circle cx="12" cy="8" r="4"/><path d="M4 21c1.5-4 4.5-6 8-6s6.5 2 8 6"/>',
    users: '<circle cx="9" cy="8" r="3.5"/><path d="M2.5 20c1.2-3.4 3.6-5 6.5-5s5.3 1.6 6.5 5"/><circle cx="17" cy="9" r="2.8"/><path d="M16 14.6c2.6.1 4.5 1.6 5.5 4.4"/>',
    building: '<rect x="4" y="3" width="16" height="18" rx="2"/><path d="M9 7h1M14 7h1M9 11h1M14 11h1M9 15h1M14 15h1M10 21v-3h4v3"/>',
    book: '<path d="M4 5a2 2 0 0 1 2-2h13v15H6a2 2 0 0 0-2 2z"/><path d="M4 20a2 2 0 0 0 2 1h13"/><path d="M9 7h6M9 11h4"/>',
    heart: '<path d="M12 20s-7-4.4-7-10a4 4 0 0 1 7-2.6A4 4 0 0 1 19 10c0 5.6-7 10-7 10z"/>',
    route: '<circle cx="6" cy="18" r="2.5"/><circle cx="18" cy="6" r="2.5"/><path d="M8.5 18H15a3 3 0 0 0 0-6H9a3 3 0 0 1 0-6h6.5"/>',
    pulse: '<path d="M3 12h4l2.5-6 4 12 2.5-6H21"/>',
    doc: '<path d="M7 3h7l5 5v13H7a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2z"/><path d="M14 3v5h5M9 13h7M9 17h5"/>',
    shield: '<path d="M12 3l8 3v6c0 4.5-3.4 8-8 9-4.6-1-8-4.5-8-9V6z"/><path d="M8.5 12l2.5 2.5 4.5-5"/>',
    spark: '<path d="M12 3v4M12 17v4M3 12h4M17 12h4M6 6l2.5 2.5M15.5 15.5L18 18M6 18l2.5-2.5M15.5 8.5L18 6"/>',
    compass: '<circle cx="12" cy="12" r="9"/><path d="M15.5 8.5l-2 5-5 2 2-5z"/>',
    search: '<circle cx="11" cy="11" r="7"/><path d="M20 20l-4-4"/>',
    lock: '<rect x="5" y="11" width="14" height="10" rx="2"/><path d="M8 11V8a4 4 0 0 1 8 0v3"/>',
    mail: '<rect x="3" y="5" width="18" height="14" rx="2"/><path d="M3 7l9 6 9-6"/>',
    arrow: '<path d="M5 12h14M13 6l6 6-6 6"/>',
    clock: '<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/>',
    layers: '<path d="M12 3l9 5-9 5-9-5z"/><path d="M3 13l9 5 9-5"/>',
    target: '<circle cx="12" cy="12" r="9"/><circle cx="12" cy="12" r="5"/><circle cx="12" cy="12" r="1"/>',
    chat: '<path d="M4 5h16v11H9l-5 4z"/><path d="M8 9h8M8 12h5"/>',
    scale: '<path d="M12 4v16M6 20h12M4 9l3-5 3 5a3 3 0 0 1-6 0zM14 9l3-5 3 5a3 3 0 0 1-6 0zM7 4h10"/>',
    flask: '<path d="M9 3h6M10 3v6l-5.5 9.5A1.6 1.6 0 0 0 6 21h12a1.6 1.6 0 0 0 1.5-2.5L14 9V3"/><path d="M7.5 15h9"/>',
    dna: '<path d="M7 3c0 6 10 6 10 12s-10 0-10 6M17 3c0 6-10 6-10 12s10 0 10 6M8 7h8M8 17h8"/>',
    brain: '<path d="M9 4a3 3 0 0 0-3 3 3 3 0 0 0-2 5 3 3 0 0 0 2 5 3 3 0 0 0 3 3 3 3 0 0 0 3-3V7a3 3 0 0 0-3-3zM15 4a3 3 0 0 1 3 3 3 3 0 0 1 2 5 3 3 0 0 1-2 5 3 3 0 0 1-3 3 3 3 0 0 1-3-3"/>',
    play: '<circle cx="12" cy="12" r="9"/><path d="M10 8.5l5 3.5-5 3.5z"/>',
    check: '<path d="M5 12.5l4.5 4.5L19 7"/>',
    stethoscope: '<path d="M6 3v6a5 5 0 0 0 10 0V3"/><path d="M11 14v2a4 4 0 0 0 8 0v-2"/><circle cx="19" cy="12" r="2"/>',
    loop: '<path d="M4 12a8 8 0 0 1 14-5.3L20 9M20 4v5h-5M20 12a8 8 0 0 1-14 5.3L4 15M4 20v-5h5"/>',
    plus: '<path d="M12 5v14M5 12h14"/>',
    download: '<path d="M12 4v11M7 10l5 5 5-5M5 20h14"/>',
  };
  const svg = (n) => `<svg viewBox="0 0 24 24" aria-hidden="true">${P[n] || P.spark}</svg>`;
  window.aimIcon = svg;
  document.querySelectorAll('[data-ico]').forEach((el) => (el.innerHTML = svg(el.dataset.ico)));

  // ---------- chrome ----------
  const fields = document.createElement('div');
  fields.className = 'fields';
  fields.setAttribute('aria-hidden', 'true');
  fields.innerHTML = '<i></i><i></i><i></i><i></i>';
  document.body.prepend(fields);

  const tabs = PAGES.map(([href, label]) => `<a href="${href}"${href === here ? ' class="on" aria-current="page"' : ''}>${label}</a>`).join('');
  const head = document.createElement('div');
  head.innerHTML = `
    <a class="skip" href="#main">Skip to content</a>
    ${here === 'index.html' ? '' : '<!--'}<div class="notice"><b>Oncology is our first specialty.</b> More specialties are coming soon. <a href="request.html">Early access is free for the first 50 patients →</a></div>${here === 'index.html' ? '' : '-->'}
    <header class="site-head"><div class="wrap"><nav class="bar glass" aria-label="Main">
      <button class="icon-btn rail-btn" id="railBtn" aria-label="Show sidebar" aria-expanded="false" aria-controls="rail"><svg viewBox="0 0 24 24"><rect x="3" y="4" width="18" height="16" rx="3"/><path d="M9 4v16"/><path d="M5.5 8h1M5.5 11h1M5.5 14h1"/></svg></button>
      <a class="logo" href="index.html" aria-label="AiM One Health home"><span class="mark"><i></i></span><span><b>AiM One Health</b><small>One Health · One Mission · Every Patient</small></span></a>
      <div class="tabs" id="tabs"><span class="lens" aria-hidden="true"></span>${tabs}</div>
      <div class="head-actions">
        <button class="icon-btn theme-btn" id="themeBtn" aria-label="Switch between daylight and night">
          <svg class="sun" viewBox="0 0 24 24"><circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M2 12h2M20 12h2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4"/></svg>
          <svg class="moon" viewBox="0 0 24 24"><path d="M20 14.5A8 8 0 0 1 9.5 4a8 8 0 1 0 10.5 10.5z"/></svg>
        </button>
        <a class="btn primary sm" href="request.html">Request a Care Pathway</a>
        <button class="icon-btn menu-btn" id="menuBtn" aria-label="Open menu" aria-expanded="false"><svg viewBox="0 0 24 24"><path d="M4 7h16M4 12h16M4 17h16"/></svg></button>
      </div>
    </nav></div></header>
    <div class="drawer glass strong" id="drawer">${tabs}<a class="btn primary" href="request.html">Request a Care Pathway</a></div>
    <nav class="rail glass" id="rail" aria-label="Sidebar">
      <a href="index.html" class="rail-home"><span class="mark"><i></i></span><span class="tip">AiM One Health</span></a>
      <button class="rail-close" id="railClose"><span class="ri"><svg viewBox="0 0 24 24"><rect x="3" y="4" width="18" height="16" rx="3"/><path d="M9 4v16"/><path d="M15.5 9.5L13 12l2.5 2.5"/></svg></span><span class="tip">Hide sidebar · show top bar</span></button>
      <span class="rail-sep" aria-hidden="true"></span>
      ${RAIL.map(([href, label, ico]) => `<a href="${href}"${href === here ? ' class="on" aria-current="page"' : ''}><span class="ri">${svg(ico)}</span><span class="tip">${label}</span></a>`).join('')}
      <span class="rail-sep" aria-hidden="true"></span>
      <a href="request.html" class="go${here === 'request.html' ? ' on' : ''}"><span class="ri">${svg('plus')}</span><span class="tip">Request a Care Pathway</span></a>
      <button class="rail-theme" id="railTheme"><span class="ri">${svg('spark')}</span><span class="tip">Daylight / Night</span></button>
    </nav>`;
  document.body.prepend(...head.children);

  const foot = document.createElement('footer');
  foot.className = 'site-foot';
  foot.innerHTML = `<div class="wrap">
    <div class="foot glass bloom">
      <div class="stack">
        <a class="logo" href="index.html"><span class="mark"><i></i></span><span><b>AiM One Health</b><small>One Health · One Mission · Every Patient</small></span></a>
        <p class="small muted read">We turn the medical knowledge created every day into personalized intelligence, grounded in evidence. Every patient can reach multidisciplinary expertise, understand their options and decide with confidence.</p>
      </div>
      <div><h4>Our tools</h4><ul><li><a href="navigator.html">Navigator</a></li><li><a href="research.html">Open Research</a></li><li><a href="tools.html#document">Care Pathway Research Document</a></li><li><a href="tools.html#how">How it earns confidence</a></li><li><a href="report.html">Sample reports</a></li></ul></div>
      <div><h4>Explore</h4><ul><li><a href="index.html#aspire">What we aspire to create</a></li><li><a href="index.html#principle">Guiding principle</a></li><li><a href="resources.html">Resources</a></li><li><a href="blog.html">Blog</a></li></ul></div>
      <div><h4>Company</h4><ul><li><a href="index.html#vision">Vision &amp; Mission</a></li><li><a href="request.html">Request a Care Pathway</a></li><li><a href="mailto:info@aimonehealth.com">info@aimonehealth.com</a></li></ul></div>
    </div>
    <div class="foot-bottom"><span>© 2026 AIM One Health, Inc. All rights reserved.</span><span><a href="#">Privacy</a> · <a href="#">Terms</a> · <a href="#">Security</a> · <a href="#">HIPAA notice</a></span></div>
  </div>`;
  document.body.append(foot);

  // (the corner "design mockup" note was removed to keep the screen calm)

  // ---------- Daylight / Night ----------
  const flipTheme = () => {
    const next = root.dataset.theme === 'night' ? 'day' : 'night';
    if (next === 'day') delete root.dataset.theme; else root.dataset.theme = next;
    try { localStorage.setItem('aim.theme', next === 'day' ? '' : next); } catch {}
  };
  document.getElementById('themeBtn').onclick = flipTheme;
  document.getElementById('railTheme').onclick = flipTheme;

  // ---------- sidebar (stays open or closed as you move between pages) ----------
  const railBtn = document.getElementById('railBtn');
  const setRail = (open) => {
    document.body.classList.toggle('rail-open', open);
    railBtn.setAttribute('aria-expanded', String(open));
    railBtn.setAttribute('aria-label', open ? 'Hide sidebar' : 'Show sidebar');
    try { localStorage.setItem('aim.rail', open ? '1' : ''); } catch {}
  };
  let railOpen = false;
  try { railOpen = localStorage.getItem('aim.rail') === '1'; } catch {}
  document.body.classList.add('no-anim');
  setRail(railOpen);
  setTimeout(() => document.body.classList.remove('no-anim'), 60);
  railBtn.onclick = () => setRail(!document.body.classList.contains('rail-open'));
  // the top bar hides while the sidebar is open, so the sidebar carries its own close button
  document.getElementById('railClose').onclick = () => { setRail(false); railBtn.focus(); };

  // ---------- the liquid lens under the tabs: it flows to whichever tab you point at ----------
  const bar = document.getElementById('tabs');
  const lens = bar.querySelector('.lens');
  const place = (a) => {
    if (!a) return (lens.style.opacity = 0);
    lens.style.opacity = 1;
    lens.style.left = a.offsetLeft + 'px';
    lens.style.width = a.offsetWidth + 'px';
  };
  const current = () => bar.querySelector('a.on');
  bar.querySelectorAll('a').forEach((a) => a.addEventListener('mouseenter', () => place(a)));
  bar.addEventListener('mouseleave', () => place(current()));
  const settle = () => place(current());
  document.fonts?.ready.then(settle);
  addEventListener('resize', settle);
  settle();

  // ---------- mobile drawer ----------
  const drawer = document.getElementById('drawer');
  const menuBtn = document.getElementById('menuBtn');
  menuBtn.onclick = () => {
    drawer.style.top = `${document.querySelector('.site-head .bar').getBoundingClientRect().bottom + 10}px`;
    const open = drawer.classList.toggle('open');
    menuBtn.setAttribute('aria-expanded', String(open));
  };
  addEventListener('scroll', () => { if (drawer.classList.contains('open')) { drawer.classList.remove('open'); menuBtn.setAttribute('aria-expanded', 'false'); } }, { passive: true });

  // ---------- card flip when you change tabs ----------
  // The flip is CSS (site.css) and its direction is set by flip.js in each page's <head>; this just
  // remembers where you came from, for browsers that can't tell flip.js themselves.
  document.addEventListener('click', (e) => {
    const a = e.target.closest('a[href]');
    if (!a) return;
    drawer.classList.remove('open');
    try { sessionStorage.setItem('aim.from', here); } catch {}
  });

  // ---------- hover sheen + scroll reveal ----------
  document.querySelectorAll('.sheen').forEach((el) => el.insertAdjacentHTML('afterbegin', '<span class="sweep" aria-hidden="true"></span>'));
  const io = new IntersectionObserver((entries) => entries.forEach((e) => { if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); } }), { rootMargin: '0px 0px 15% 0px' });
  const pending = new Set();
  document.querySelectorAll('.reveal').forEach((el, i) => {
    // anything on screen at load is shown at once; only content further down animates in
    if (el.getBoundingClientRect().top < innerHeight) { el.style.transition = 'none'; el.classList.add('in'); return; }
    el.style.transitionDelay = `${(i % 3) * 50}ms`;
    pending.add(el);
    io.observe(el);
  });
  // fallback for browsers or views where the observer doesn't fire: content must never stay hidden
  addEventListener('scroll', () => pending.forEach((el) => { if (el.classList.contains('in')) return pending.delete(el); if (el.getBoundingClientRect().top < innerHeight * 1.1) { el.classList.add('in'); pending.delete(el); } }), { passive: true });
})();
