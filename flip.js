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
    // trainer pages sit just after the Navigator, articles just after the Blog
    const rank = (p) => (p === 'trainer.html' ? ORDER.indexOf('navigator.html') + 0.5 : /^post-/.test(p) ? ORDER.indexOf('blog.html') + 0.5 : ORDER.indexOf(p));
    const fi = rank(from), ti = rank(here);
    if (fi < 0 || ti < 0 || (fi === ti && from === here)) return e.viewTransition.skipTransition();
    if (fi === ti) return e.viewTransition.types.add('forward'); // e.g. one trainer to another
    e.viewTransition.types.add(ti > fi ? 'forward' : 'back');
  });
})();
