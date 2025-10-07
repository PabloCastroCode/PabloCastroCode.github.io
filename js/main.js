document.addEventListener('DOMContentLoaded', () => {
  // ---------------------------
  // MOBILE MENU TOGGLE
  // ---------------------------
  const menuToggle = document.querySelector('.menu-toggle');
  const nav = document.querySelector('nav.primary');
  if (menuToggle && nav) {
    menuToggle.addEventListener('click', () => {
      const isOpen = nav.classList.toggle('open');
      menuToggle.setAttribute('aria-expanded', String(isOpen));
    });
  }

  // ---------------------------
  // IMAGE LIGHTBOX
  // ---------------------------
  const overlay = document.querySelector('.lightbox-overlay');
  const overlayImg = overlay ? overlay.querySelector('img') : null;
  const closeBtn = overlay ? overlay.querySelector('.close-lightbox') : null;

  function openLightbox(src, alt) {
    if (!overlay || !overlayImg) return;
    overlayImg.src = src;
    overlayImg.alt = alt || '';
    overlay.classList.add('open');
  }

  function closeLightbox() {
    if (!overlay) return;
    overlay.classList.remove('open');
    if (overlayImg) overlayImg.src = '';
  }

  if (overlay && closeBtn) {
    closeBtn.addEventListener('click', closeLightbox);
    overlay.addEventListener('click', e => {
      if (e.target === overlay) closeLightbox();
    });
    document.addEventListener('keydown', e => {
      if (e.key === 'Escape') closeLightbox();
    });
  }

  document.body.addEventListener('click', e => {
    const target = e.target;
    if (target && target.matches('[data-enlarge]')) {
      e.preventDefault();
      const img = target.tagName === 'IMG' ? target : target.querySelector('img');
      if (img) openLightbox(img.src, img.alt);
    }
  });

  // ---------------------------
  // DARK / LIGHT THEME TOGGLE
  // ---------------------------
  const toggleBtn = document.getElementById('theme-toggle');
  const body = document.body;

  // Load saved theme (if any)
  const savedTheme = localStorage.getItem('theme');
  if (savedTheme === 'dark') {
    body.classList.add('dark-mode');
    if (toggleBtn) toggleBtn.textContent = '🌙';
  } else {
    if (toggleBtn) toggleBtn.textContent = '☀️';
  }

  // Listen for toggle clicks
  if (toggleBtn) {
    toggleBtn.addEventListener('click', () => {
      const isDark = body.classList.toggle('dark-mode');
      toggleBtn.textContent = isDark ? '🌙' : '☀️';
      localStorage.setItem('theme', isDark ? 'dark' : 'light');
    });
  }

  // Optional smooth transitions
  const root = document.documentElement;
  root.style.transition = 'background-color 0.3s ease, color 0.3s ease';
});

// --- Sync timeline dots to the vertical center of each project row ---
(function () {
  const timeline = document.querySelector('.timeline');
  const rows = document.querySelectorAll('.project-rows .project-row');
  const ticks = timeline ? timeline.querySelectorAll('.tick') : [];

  if (!timeline || !rows.length || !ticks.length) return;

  function positionTicks() {
    const tlTop = timeline.getBoundingClientRect().top + window.scrollY;

    rows.forEach((row, i) => {
      const tick = ticks[i];
      if (!tick) return;

      const r = row.getBoundingClientRect();
      const rowMiddle = r.top + window.scrollY + r.height / 2;

      tick.style.top = (rowMiddle - tlTop) + 'px';
    });
  }

  // Position now and on resize
  positionTicks();
  window.addEventListener('resize', positionTicks);

  // If images load later and change heights, re-run once they’re done
  window.addEventListener('load', positionTicks);
})();
