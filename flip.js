// Card flip direction. Loaded in each page's <head> so it's listening before the browser reveals the
// new page. Forward through the tab order turns the card one way, back turns it the other; a reload or
// an unknown page skips the flip. The flip itself is CSS (site.css, "card flip between tabs").
(() => {
  const ORDER = ['index.html', 'tools.html', 'navigator.html', 'research.html', 'resources.html', 'blog.html', 'report.html', 'request.html'];
  const pageOf = (u) => { try { return new URL(u, location.href).pathname.split('/').pop() || 'index.html'; } catch { return ''; } };
  addEventListener('pagereveal', (e) => {
    if (!e.viewTransition) return;
    let from = pageOf(window.navigation?.activation?.from?.url || '');
    if (!from) { try { from = sessionStorage.getItem('aim.from') || ''; } catch {} }
    const here = pageOf(location.href);
    const fi = ORDER.indexOf(from), ti = ORDER.indexOf(here);
    if (fi < 0 || ti < 0 || fi === ti) return e.viewTransition.skipTransition();
    e.viewTransition.types.add(ti > fi ? 'forward' : 'back');
  });
})();
