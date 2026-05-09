// Nav scroll effect
const nav = document.getElementById('nav');
if (nav) {
  window.addEventListener('scroll', () => {
    nav.classList.toggle('scrolled', window.scrollY > 50);
  });
}

// Mobile menu toggle
function toggleMenu() {
  const links = document.getElementById('navLinks');
  if (links) links.classList.toggle('open');
}
window.toggleMenu = toggleMenu;

document.querySelectorAll('.nav-links a').forEach(a => {
  a.addEventListener('click', () => {
    const links = document.getElementById('navLinks');
    if (links) links.classList.remove('open');
  });
});

// Highlight active nav link based on current page
(function () {
  const path = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-links a').forEach(a => {
    const href = a.getAttribute('href');
    if (href === path || (path === '' && href === 'index.html') || (path === 'index.html' && href === 'index.html')) {
      a.classList.add('active');
    }
  });
})();

// Scroll reveal
const revealEls = document.querySelectorAll('.reveal, .reveal-left, .reveal-right');
const revealObs = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (e.isIntersecting) { e.target.classList.add('visible'); revealObs.unobserve(e.target); }
  });
}, { threshold: 0.12 });
revealEls.forEach(el => revealObs.observe(el));

// Menu filter tabs
function filterMenu(cat, btn) {
  document.querySelectorAll('.tab').forEach(t => t.classList.remove('active'));
  btn.classList.add('active');
  document.querySelectorAll('.menu-card').forEach(card => {
    const show = cat === 'all' || card.dataset.cat === cat;
    card.style.display = show ? 'block' : 'none';
  });
}
window.filterMenu = filterMenu;

// Animated counter
function animateCount(el, target) {
  let start = 0;
  const duration = 1800;
  const step = (timestamp) => {
    if (!start) start = timestamp;
    const progress = Math.min((timestamp - start) / duration, 1);
    el.textContent = Math.floor(progress * target);
    if (progress < 1) requestAnimationFrame(step);
    else el.textContent = target;
  };
  requestAnimationFrame(step);
}
const counterObs = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      const target = parseInt(e.target.dataset.count);
      if (target) animateCount(e.target, target);
      counterObs.unobserve(e.target);
    }
  });
}, { threshold: 0.5 });
document.querySelectorAll('[data-count]').forEach(el => counterObs.observe(el));

// Sparks (hero only)
const sparksEl = document.getElementById('sparks');
if (sparksEl) {
  for (let i = 0; i < 30; i++) {
    const spark = document.createElement('div');
    spark.className = 'spark';
    const x = Math.random() * 100;
    const y = 60 + Math.random() * 30;
    const dx = (Math.random() - 0.5) * 80;
    const dur = 2 + Math.random() * 3;
    const delay = Math.random() * 5;
    spark.style.cssText = `left:${x}%;top:${y}%;--dx:${dx}px;animation-duration:${dur}s;animation-delay:${delay}s;`;
    sparksEl.appendChild(spark);
  }
}

// Track ties (hero only)
const ties = document.getElementById('ties');
if (ties) {
  for (let i = 0; i < 60; i++) {
    const tie = document.createElement('span');
    ties.appendChild(tie);
  }
}
