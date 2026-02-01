function toggleMenu() {
  document.getElementById("nav").classList.toggle("show");
}

const toggle = document.getElementById("theme-toggle");

function applyTheme(theme) {
  if (theme === 'dark') {
    document.body.classList.add('dark');
    document.body.classList.remove('light');
    if (toggle) toggle.textContent = '☀️';
  } else {
    document.body.classList.add('light');
    document.body.classList.remove('dark');
    if (toggle) toggle.textContent = '🌙';
  }
}

function initTheme() {
  const saved = localStorage.getItem('theme');
  if (saved) {
    applyTheme(saved);
  } else {
    // default to light
    applyTheme('light');
  }

  if (toggle) {
    toggle.addEventListener('click', () => {
      const isDark = document.body.classList.contains('dark');
      const newTheme = isDark ? 'light' : 'dark';
      applyTheme(newTheme);
      localStorage.setItem('theme', newTheme);
    });
  }
}

function setActiveNav() {
  const links = document.querySelectorAll('#nav a');
  const current = window.location.pathname.split('/').pop() || 'index.html';
  links.forEach((a) => {
    const href = a.getAttribute('href');
    if (!href) return;
    // treat root as index.html
    const target = href === '' ? 'index.html' : href;
    if (target === current || (target === 'index.html' && (current === '' || current === 'index.html'))) {
      a.classList.add('active');
    } else {
      a.classList.remove('active');
    }

    // close mobile menu when clicking a link
    a.addEventListener('click', () => {
      const nav = document.getElementById('nav');
      if (nav && nav.classList.contains('show')) nav.classList.remove('show');
    });
  });
}

document.addEventListener('DOMContentLoaded', () => {
  initTheme();
  setActiveNav();
});