
// terra_nova_header.js
(function () {
  // --- Compute BASE from this script tag's src ---
  function computeBase() {
    const scripts = document.getElementsByTagName('script');
    for (let i = scripts.length - 1; i >= 0; i--) {
      const src = scripts[i].getAttribute('src') || '';
      if (/terra_nova_header\.js(\?.*)?$/i.test(src)) {
        return src.replace(/terra_nova_header\.js(\?.*)?$/i, '').replace(/\/?$/, '/');
      }
    }
    return '/';
  }
  const BASE = computeBase();

  // --- Ready helper (runs now if DOM already parsed) ---
  function onReady(fn) {
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', fn, { once: true });
    } else {
      fn();
    }
  }

  // --- Build absolute hrefs under BASE ---
  function href(leaf) {
    return BASE + leaf.replace(/^\/+/, '');
  }

  // --- Active tab detection (tolerates .html vs clean URLs) ---
  function currentKey() {
    let leaf = location.pathname.replace(/\/+$/, '').split('/').pop() || 'terra_nova';
    leaf = leaf.replace(/\.html$/i, '');
    const map = {
      'terra_nova': 'home',
      'terra_nova_environment': 'environment',
      'research': 'research',
      'terra_nova_documentation': 'docs',
      'terra_nova_contact': 'contact',
    };
    return map[leaf] || 'home';
  }

  // --- Header HTML ---
  function headerHTML() {
    const active = currentKey();
    return `
      <header>
        <a href="${href('terra_nova')}" class="logo">Terra Nova</a>
        <nav>
          <a href="${href('terra_nova_environment')}" class="${active === 'environment' ? 'active' : ''}">Environment</a>
          <a href="${href('research.html')}" class="${active === 'research' ? 'active' : ''}">Research</a>
          <a href="${href('terra_nova_documentation')}" class="${active === 'docs' ? 'active' : ''}">Documentation</a>
        </nav>
      </header>
    `;
  }

  // --- Ensure header container exists; create if missing ---
  function ensureContainer() {
    let el = document.getElementById('header-container');
    if (el) return el;

    el = document.createElement('div');
    el.id = 'header-container';

    // Prefer top of .container if present, else top of body
    const shell = document.querySelector('.container');
    if (shell && shell.firstChild) {
      shell.insertBefore(el, shell.firstChild);
    } else if (shell) {
      shell.appendChild(el);
    } else {
      document.body.insertBefore(el, document.body.firstChild || null);
    }
    return el;
  }

  // --- Render ---
  function render() {
    const mount = ensureContainer();
    mount.innerHTML = headerHTML();
  }

  onReady(render);

})();
