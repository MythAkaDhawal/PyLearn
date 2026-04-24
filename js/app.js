/* ===================================================
   PyLearn — app.js  (Global JS)
   Dark mode · Streak tracker · XP helpers · Navbar
   =================================================== */

"use strict";

// ─── Constants ───────────────────────────────────────
const XP_LESSON    = 10;
const XP_QUIZ_Q    = 5;
const XP_MODULE    = 50;
const XP_MEGA      = 100;
const XP_PERFECT   = 25;
const XP_STREAK    = 30;

const STORAGE = {
  THEME:    'pylearn_theme',
  STREAK:   'pylearn_streak',
  LAST:     'pylearn_last_visit',
  XP:       'pylearn_xp',
  PROGRESS: 'pylearn_progress',
  BADGES:   'pylearn_badges',
};

// ─── Theme (Dark Mode) ────────────────────────────────
function getTheme()  { return localStorage.getItem(STORAGE.THEME) || 'light'; }
function setTheme(t) { localStorage.setItem(STORAGE.THEME, t); document.documentElement.setAttribute('data-theme', t); updateDarkToggle(t); }
function toggleTheme() { setTheme(getTheme() === 'dark' ? 'light' : 'dark'); }

function updateDarkToggle(theme) {
  const btn = document.getElementById('dark-toggle');
  if (btn) btn.textContent = theme === 'dark' ? '☀️' : '🌙';
}

// ─── Streak ──────────────────────────────────────────
function getStreak() { return parseInt(localStorage.getItem(STORAGE.STREAK) || '0', 10); }

function updateStreak() {
  const today    = new Date().toDateString();
  const lastVisit = localStorage.getItem(STORAGE.LAST);
  let streak = getStreak();

  if (lastVisit !== today) {
    const yesterday = new Date(); yesterday.setDate(yesterday.getDate() - 1);
    if (lastVisit === yesterday.toDateString()) {
      streak += 1;
      if (streak === 7) addXP(XP_STREAK); // bonus
    } else if (lastVisit !== today) {
      streak = 1; // reset (but still counts today)
    }
    localStorage.setItem(STORAGE.LAST, today);
    localStorage.setItem(STORAGE.STREAK, streak);
  }
  return streak;
}

function renderStreak() {
  const el = document.getElementById('streak-count');
  if (el) el.textContent = getStreak();
}

// ─── XP ──────────────────────────────────────────────
function getXP()  { return parseInt(localStorage.getItem(STORAGE.XP) || '0', 10); }
function addXP(n) {
  const newXP = getXP() + n;
  localStorage.setItem(STORAGE.XP, newXP);
  showXPToast(n);
  renderXP();
  return newXP;
}
function renderXP() {
  const el = document.getElementById('xp-display');
  if (el) el.textContent = getXP() + ' XP';
}

function showXPToast(amount) {
  const toast = document.createElement('div');
  toast.className = 'xp-toast';
  toast.textContent = `+${amount} XP! ⚡`;
  Object.assign(toast.style, {
    position: 'fixed', bottom: '24px', right: '24px',
    background: 'linear-gradient(135deg,#FF6B35,#FFD166)',
    color: 'white', padding: '0.6rem 1.2rem',
    borderRadius: '999px', fontWeight: '800',
    fontFamily: "'Nunito',sans-serif", fontSize: '0.95rem',
    boxShadow: '0 4px 20px rgba(255,107,53,0.4)',
    zIndex: '9999', animation: 'fade-in-up 0.4s ease',
    transition: 'opacity 0.4s'
  });
  document.body.appendChild(toast);
  setTimeout(() => { toast.style.opacity = '0'; setTimeout(() => toast.remove(), 400); }, 2000);
}

// ─── Progress (per module) ────────────────────────────
function getProgress() {
  try { return JSON.parse(localStorage.getItem(STORAGE.PROGRESS) || '{}'); } catch { return {}; }
}

function setModuleProgress(moduleId, data) {
  const p = getProgress();
  p[moduleId] = { ...p[moduleId], ...data };
  localStorage.setItem(STORAGE.PROGRESS, JSON.stringify(p));
}

function getModuleProgress(moduleId) {
  return getProgress()[moduleId] || { status: 'locked', xp: 0, quizScore: null };
}

// ─── Badges ──────────────────────────────────────────
const ALL_BADGES = [
  { id: 'first_step',       name: 'First Step',       emoji: '👣', desc: 'Complete Stage 1'  },
  { id: 'hello_world',      name: 'Hello World',      emoji: '👋', desc: 'Run your first line of code' },
  { id: 'decision_maker',   name: 'Decision Maker',   emoji: '🤔', desc: 'Complete Stage 3 (If/Else)' },
  { id: 'loop_champion',    name: 'Loop Champion',    emoji: '🔁', desc: 'Complete Stage 4 (Loops)' },
  { id: 'list_master',      name: 'List Master',      emoji: '📋', desc: 'Complete Stage 5 (Collections)' },
  { id: 'function_writer',  name: 'Function Writer',  emoji: '⚙️',  desc: 'Complete Stage 6 (Functions)' },
  { id: 'file_handler',     name: 'File Handler',     emoji: '📁', desc: 'Complete Stage 9 (File I/O)' },
  { id: 'bug_spotter',      name: 'Bug Spotter',      emoji: '🐛', desc: 'Get 5 Error Spotting Qs right' },
  { id: 'quick_thinker',    name: 'Quick Thinker',    emoji: '⚡', desc: 'Finish a test in under 5 min' },
  { id: 'halfway',          name: 'Halfway There',    emoji: '🏁', desc: 'Complete 6 of 12 modules' },
  { id: 'graduate',         name: 'Python Graduate',  emoji: '🎓', desc: 'Complete all 12 modules' },
  { id: 'perfect_score',    name: 'Perfect Score',    emoji: '💯', desc: 'Score 100% on any module test' },
  { id: 'code_every_day',   name: 'Code Every Day',   emoji: '🔥', desc: 'Maintain a 7-day streak' },
  { id: 'big_test',         name: 'Big Test Done',    emoji: '🏆', desc: 'Complete the Mega Test' },
];

function getBadges() {
  try { return JSON.parse(localStorage.getItem(STORAGE.BADGES) || '[]'); } catch { return []; }
}

function awardBadge(badgeId) {
  const badges = getBadges();
  if (!badges.find(b => b.id === badgeId)) {
    const badge = ALL_BADGES.find(b => b.id === badgeId);
    if (!badge) return;
    badges.push({ id: badgeId, earnedAt: new Date().toISOString() });
    localStorage.setItem(STORAGE.BADGES, JSON.stringify(badges));
    showBadgeToast(badge);
  }
}

function hasBadge(id) { return getBadges().some(b => b.id === id); }

function showBadgeToast(badge) {
  const toast = document.createElement('div');
  toast.innerHTML = `
    <div style="font-size:2rem;margin-bottom:4px">${badge.emoji}</div>
    <div style="font-weight:800;font-size:0.95rem">Badge Unlocked!</div>
    <div style="font-size:0.82rem;opacity:0.8">${badge.name}</div>
  `;
  Object.assign(toast.style, {
    position: 'fixed', bottom: '24px', left: '24px',
    background: 'linear-gradient(135deg,#1A1A2E,#252545)',
    color: 'white', padding: '1rem 1.5rem',
    borderRadius: '16px', border: '2px solid #FFD166',
    fontFamily: "'Nunito',sans-serif", textAlign: 'center',
    boxShadow: '0 8px 32px rgba(0,0,0,0.4)',
    zIndex: '9999', animation: 'fade-in-up 0.4s ease',
    transition: 'opacity 0.4s'
  });
  document.body.appendChild(toast);
  setTimeout(() => { toast.style.opacity = '0'; setTimeout(() => toast.remove(), 400); }, 3500);
}

// ─── Navbar Setup ─────────────────────────────────────
function initNavbar() {
  // Scroll shadow
  const navbar = document.querySelector('.navbar');
  if (navbar) {
    window.addEventListener('scroll', () => {
      navbar.classList.toggle('scrolled', window.scrollY > 10);
    });
  }

  // Hamburger
  const hamburger = document.getElementById('hamburger');
  const mobileMenu = document.getElementById('mobile-menu');
  if (hamburger && mobileMenu) {
    hamburger.addEventListener('click', () => {
      hamburger.classList.toggle('open');
      mobileMenu.classList.toggle('open');
    });
    // Close on link click
    mobileMenu.querySelectorAll('a').forEach(a => {
      a.addEventListener('click', () => {
        hamburger.classList.remove('open');
        mobileMenu.classList.remove('open');
      });
    });
  }

  // Active link
  const currentPage = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.navbar-links a, .mobile-menu a').forEach(a => {
    if (a.getAttribute('href') === currentPage) a.classList.add('active');
  });

  // Dark toggle
  const darkBtn = document.getElementById('dark-toggle');
  if (darkBtn) darkBtn.addEventListener('click', toggleTheme);
}

// ─── Page Init ────────────────────────────────────────
document.addEventListener('DOMContentLoaded', () => {
  // Apply saved theme
  setTheme(getTheme());

  // Update streak
  updateStreak();

  // Render navbar stats
  renderStreak();
  renderXP();

  // Init navbar
  initNavbar();

  // Intersection observer for scroll animations
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '';
        entry.target.style.transform = '';
        entry.target.classList.add('anim-fade-up');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });

  document.querySelectorAll('.observe').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(28px)';
    observer.observe(el);
  });
});

// ─── Shared Navbar HTML ───────────────────────────────
// Call this from each page to inject the navbar
function renderNavbar(activePage) {
  const navItems = [
    { href: 'roadmap.html',     icon: '🗺️',  label: 'Roadmap'    },
    { href: 'lessons.html',     icon: '📚',  label: 'Lessons'    },
    { href: 'practice.html',    icon: '✏️',   label: 'Practice'   },
    { href: 'flashcards.html',  icon: '🃏',  label: 'Flashcards' },
    { href: 'cheatsheets.html', icon: '📄',  label: 'Cheatsheets'},
    { href: 'projects.html',    icon: '🚀',  label: 'Projects'   },
    { href: 'progress.html',    icon: '🏆',  label: 'My Progress'},
  ];

  const linksHTML = navItems.map(n =>
    `<li><a href="${n.href}" ${activePage === n.href ? 'class="active"' : ''}>
       <span class="nav-icon">${n.icon}</span>${n.label}
     </a></li>`
  ).join('');

  const mobileLinksHTML = navItems.map(n =>
    `<li><a href="${n.href}">
       <span class="nav-icon">${n.icon}</span>${n.label}
     </a></li>`
  ).join('');

  document.body.insertAdjacentHTML('afterbegin', `
    <nav class="navbar" role="navigation" aria-label="Main navigation">
      <div class="navbar-inner">
        <a href="index.html" class="navbar-logo">
          <div class="navbar-logo-icon">🐍</div>
          <span class="navbar-logo-text">Py<span>Learn</span></span>
        </a>
        <ul class="navbar-links">${linksHTML}</ul>
        <div class="navbar-right">
          <a href="progress.html" class="streak-counter" title="Your daily streak" id="streak-badge">
            <span class="streak-icon">🔥</span>
            <span class="streak-label">Streak:</span>
            <span id="streak-count">0</span>
          </a>
          <button class="dark-toggle" id="dark-toggle" title="Toggle dark mode" aria-label="Toggle dark mode">🌙</button>
          <button class="hamburger" id="hamburger" aria-label="Menu" aria-expanded="false">
            <span></span><span></span><span></span>
          </button>
        </div>
      </div>
    </nav>
    <div class="mobile-menu" id="mobile-menu">
      <ul>${mobileLinksHTML}</ul>
    </div>
  `);
}

// ─── Shared Footer HTML ───────────────────────────────
function renderFooter() {
  document.body.insertAdjacentHTML('beforeend', `
    <footer class="footer">
      <div class="container">
        <div class="footer-logo">🐍 PyLearn</div>
        <p class="footer-tagline">Learn Python. Have Fun. Break Things (Safely).</p>
        <div class="footer-links">
          <a href="index.html">Home</a>
          <a href="roadmap.html">Roadmap</a>
          <a href="lessons.html">Lessons</a>
          <a href="practice.html">Practice</a>
          <a href="flashcards.html">Flashcards</a>
          <a href="cheatsheets.html">Cheatsheets</a>
          <a href="projects.html">Projects</a>
          <a href="progress.html">My Progress</a>
        </div>
        <div style="width:60px;height:2px;background:rgba(255,107,53,0.3);border-radius:999px;margin:1.5rem auto;"></div>
        <div style="display:flex;align-items:center;justify-content:center;gap:1.5rem;flex-wrap:wrap;margin-bottom:1rem;">
          <a href="https://linkedin.com/in/dhawal-lamba" target="_blank" rel="noopener noreferrer"
             style="display:inline-flex;align-items:center;gap:0.4rem;color:rgba(255,255,255,0.65);font-size:0.88rem;font-weight:700;transition:color 0.25s;"
             onmouseover="this.style.color='#FF6B35'" onmouseout="this.style.color='rgba(255,255,255,0.65)'">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg" style="flex-shrink:0">
              <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
            </svg>
            linkedin.com/in/dhawal-lamba
          </a>
          <span style="color:rgba(255,255,255,0.2)">·</span>
          <a href="mailto:mythx0x01@gmail.com"
             style="display:inline-flex;align-items:center;gap:0.4rem;color:rgba(255,255,255,0.65);font-size:0.88rem;font-weight:700;transition:color 0.25s;"
             onmouseover="this.style.color='#FF6B35'" onmouseout="this.style.color='rgba(255,255,255,0.65)'">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="flex-shrink:0">
              <rect x="2" y="4" width="20" height="16" rx="2"/>
              <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/>
            </svg>
            mythx0x01@gmail.com
          </a>
        </div>
        <p class="footer-copy">Built with 🧡 for absolute beginners. Powered by Sarpanch 🐍</p>
      </div>
    </footer>
  `);
}
