/* ============================================================
   PURUSHOTHAM S — PORTFOLIO JAVASCRIPT
   ============================================================ */

// ── LOADER ───────────────────────────────────────────────────
window.addEventListener('load', () => {
  setTimeout(() => {
    document.getElementById('loader')?.classList.add('hidden');
  }, 350);
});

// ── CUSTOM CURSOR ────────────────────────────────────────────
const cursor = document.getElementById('cursor');
const cursorFollower = document.getElementById('cursorFollower');
const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const useCustomCursor = window.matchMedia('(pointer: fine)').matches && !prefersReducedMotion;
let mouseX = 0, mouseY = 0;
let followerX = 0, followerY = 0;

if (useCustomCursor && cursor && cursorFollower) {
  document.body.classList.add('has-custom-cursor');
  document.addEventListener('mousemove', e => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    cursor.style.left = mouseX + 'px';
    cursor.style.top  = mouseY + 'px';
  });

  function animateFollower() {
    followerX += (mouseX - followerX) * 0.12;
    followerY += (mouseY - followerY) * 0.12;
    cursorFollower.style.left = followerX + 'px';
    cursorFollower.style.top  = followerY + 'px';
    requestAnimationFrame(animateFollower);
  }
  animateFollower();

  document.querySelectorAll('a, button, .skill-tag, .cert-card, .project-card').forEach(item => {
    item.addEventListener('mouseenter', () => {
      cursor.style.width = cursor.style.height = '18px';
      cursorFollower.style.width = cursorFollower.style.height = '50px';
      cursorFollower.style.borderColor = 'rgba(99,102,241,0.8)';
    });
    item.addEventListener('mouseleave', () => {
      cursor.style.width = cursor.style.height = '10px';
      cursorFollower.style.width = cursorFollower.style.height = '36px';
      cursorFollower.style.borderColor = 'rgba(99,102,241,0.5)';
    });
  });
}

// ── NAVBAR ───────────────────────────────────────────────────
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 50);
});

// Hamburger menu
const hamburger = document.getElementById('hamburger');
const navLinks   = document.getElementById('navLinks');
hamburger.addEventListener('click', () => {
  navLinks.classList.toggle('open');
  hamburger.setAttribute('aria-expanded', String(navLinks.classList.contains('open')));
});
navLinks.querySelectorAll('a').forEach(a => {
  a.addEventListener('click', () => {
    navLinks.classList.remove('open');
    hamburger.setAttribute('aria-expanded', 'false');
  });
});

// Active nav link on scroll
const sections = document.querySelectorAll('section[id]');
const navItems = document.querySelectorAll('.nav-link');

window.addEventListener('scroll', () => {
  let current = '';
  sections.forEach(s => {
    if (window.scrollY >= s.offsetTop - 120) current = s.id;
  });
  navItems.forEach(a => {
    a.classList.toggle('active', a.getAttribute('href') === '#' + current);
  });
});

// ── TYPEWRITER ───────────────────────────────────────────────
const phrases = [
  'AI-powered applications',
  'production-ready APIs',
  'intelligent ML models',
  'beautiful web experiences',
  'end-to-end full-stack apps',
];
let phraseIdx = 0, charIdx = 0, deleting = false;
const el = document.getElementById('typewriterText');

function typeWriter() {
  const current = phrases[phraseIdx];
  if (!deleting) {
    el.textContent = current.slice(0, ++charIdx);
    if (charIdx === current.length) { deleting = true; setTimeout(typeWriter, 2000); return; }
  } else {
    el.textContent = current.slice(0, --charIdx);
    if (charIdx === 0) { deleting = false; phraseIdx = (phraseIdx + 1) % phrases.length; }
  }
  setTimeout(typeWriter, deleting ? 50 : 80);
}
if (prefersReducedMotion) el.textContent = phrases[0];
else typeWriter();

// ── PARTICLES ────────────────────────────────────────────────
function createParticle() {
  const container = document.getElementById('heroParticles');
  if (!container) return;
  const p = document.createElement('div');
  p.classList.add('particle');
  p.style.left   = Math.random() * 100 + '%';
  p.style.bottom = '0';
  p.style.animationDuration = (Math.random() * 8 + 6) + 's';
  p.style.animationDelay   = Math.random() * 4 + 's';
  p.style.width = p.style.height = (Math.random() * 3 + 1) + 'px';
  const hue = Math.random() > .5 ? '239' : '262';
  p.style.background = `hsl(${hue}, 89%, 65%)`;
  container.appendChild(p);
  setTimeout(() => p.remove(), 14000);
}
if (!prefersReducedMotion) setInterval(createParticle, 700);

// ── SCROLL REVEAL ────────────────────────────────────────────
const revealEls = document.querySelectorAll(
  '.skill-category, .project-card, .cert-card, .about-text, .about-visual, .contact-card, .contact-form-wrap, .hero-content, .hero-visual'
);
revealEls.forEach(el => el.classList.add('reveal'));

if (prefersReducedMotion || !('IntersectionObserver' in window)) {
  revealEls.forEach(item => item.classList.add('visible'));
} else {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry, i) => {
      if (entry.isIntersecting) {
        setTimeout(() => entry.target.classList.add('visible'), i * 80);
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });
  revealEls.forEach(item => observer.observe(item));
}

// ── PROFILE IMAGE FALLBACK ───────────────────────────────────
const profileImg = document.getElementById('profileImg');
if (profileImg) {
  profileImg.addEventListener('error', () => {
    profileImg.style.display = 'none';
    const placeholder = document.createElement('div');
    placeholder.style.cssText = `
      width:100%; height:100%; display:flex; align-items:center; justify-content:center;
      background:linear-gradient(135deg,#6366f1,#8b5cf6);
      font-size:5rem; font-weight:900; color:#fff;
    `;
    placeholder.textContent = 'PS';
    profileImg.parentElement.appendChild(placeholder);
  });
}

// ── CONTACT FORM ─────────────────────────────────────────────
function handleFormSubmit(e) {
  e.preventDefault();
  const name    = document.getElementById('nameInput').value;
  const email   = document.getElementById('emailInput').value;
  const subject = document.getElementById('subjectInput').value || 'Portfolio Contact';
  const message = document.getElementById('messageInput').value;

  const mailtoLink = `mailto:purushothamchowdhary146@gmail.com?subject=${encodeURIComponent(subject + ' — from ' + name)}&body=${encodeURIComponent('Name: ' + name + '\nEmail: ' + email + '\n\n' + message)}`;
  window.location.href = mailtoLink;

  const successEl = document.getElementById('formSuccess');
  successEl.classList.add('visible');
  setTimeout(() => successEl.classList.remove('visible'), 4000);
}

// ── SKILL TAGS ANIMATION ─────────────────────────────────────
document.querySelectorAll('.skill-tag').forEach(tag => {
  tag.addEventListener('click', () => {
    tag.style.transform = 'scale(0.92)';
    setTimeout(() => { tag.style.transform = ''; }, 150);
  });
});

// ── SMOOTH SCROLL OFFSET FIX ─────────────────────────────────
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      e.preventDefault();
      const offset = 80;
      window.scrollTo({ top: target.offsetTop - offset, behavior: 'smooth' });
    }
  });
});

// ── COUNTER ANIMATION FOR HERO STATS ─────────────────────────
function animateCounter(el, target, suffix = '') {
  let current = 0;
  const step = Math.ceil(target / 40);
  const timer = setInterval(() => {
    current = Math.min(current + step, target);
    el.textContent = current + suffix;
    if (current >= target) clearInterval(timer);
  }, 40);
}

const heroStats = document.querySelector('.hero-stats');
if (heroStats && !prefersReducedMotion && 'IntersectionObserver' in window) {
  const statsObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        document.querySelectorAll('.stat-number').forEach(n => {
          const text = n.textContent;
          if (text === '5+') { n.textContent = '0'; animateCounter(n, 5, '+'); }
          else if (text === '4') { n.textContent = '0'; animateCounter(n, 4); }
        });
        statsObserver.disconnect();
      }
    });
  }, { threshold: 0.5 });
  statsObserver.observe(heroStats);
}

console.log('%c👋 Hey there! Welcome to Purushotham\'s Portfolio', 'font-size:16px;color:#6366f1;font-weight:bold;');
console.log('%c📧 purushothamchowdhary146@gmail.com', 'color:#94a3b8;');
