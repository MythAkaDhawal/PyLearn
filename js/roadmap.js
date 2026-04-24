/* ===================================================
   PyLearn — roadmap.js
   Renders roadmap stages from data, handles lock/unlock
   =================================================== */

const STAGES = [
  {
    id: 1, emoji: '🐣', name: 'First Steps',
    subtitle: 'What is Python, installing it, running your first line of code ever.',
    tags: ['What is Python?', 'Installation', 'print()', 'IDLE / VS Code'],
    href: 'lesson-1.html'
  },
  {
    id: 2, emoji: '🧱', name: 'Building Blocks',
    subtitle: 'Variables, data types (int, float, string, bool), and basic arithmetic.',
    tags: ['Variables', 'Data Types', 'int / float / str', 'Operators'],
    href: 'lesson-2.html'
  },
  {
    id: 3, emoji: '🤔', name: 'Making Decisions',
    subtitle: 'If, elif, else — teach Python to make choices like a human brain.',
    tags: ['if / elif / else', 'Comparison Operators', 'Logical Operators'],
    href: 'lesson-3.html'
  },
  {
    id: 4, emoji: '🔁', name: 'Doing Things Again',
    subtitle: 'For loops and while loops — the art of not writing the same line 100 times.',
    tags: ['for loop', 'while loop', 'break / continue', 'range()'],
    href: 'lesson-4.html'
  },
  {
    id: 5, emoji: '📦', name: 'Grouping Stuff',
    subtitle: 'Lists, tuples, sets, and dictionaries — Python\'s way of organising data.',
    tags: ['Lists', 'Tuples', 'Sets', 'Dictionaries'],
    href: 'lesson-5.html'
  },
  {
    id: 6, emoji: '⚙️', name: 'Teaching Python Tricks',
    subtitle: 'Write a function once, use it forever. Like making chai — define it, call it.',
    tags: ['def', 'Arguments', 'return', '*args / **kwargs'],
    href: 'lesson-6.html'
  },
  {
    id: 7, emoji: '📂', name: 'Organising Your Code',
    subtitle: 'Split your code into files. Import like a pro. Build clean, reusable code.',
    tags: ['Modules', 'import', 'from ... import', 'Standard Library'],
    href: 'lesson-7.html'
  },
  {
    id: 8, emoji: '🛡️', name: 'Handling Trouble',
    subtitle: 'Errors are not the enemy — they are messages. Learn to catch them gracefully.',
    tags: ['try / except', 'finally', 'raise', 'Common Error Types'],
    href: 'lesson-8.html'
  },
  {
    id: 9, emoji: '📁', name: 'Working with Files',
    subtitle: 'Read files, write files, save data. Python can talk to your hard drive.',
    tags: ['open()', 'read() / write()', 'with statement', 'CSV files'],
    href: 'lesson-9.html'
  },
  {
    id: 10, emoji: '🏗️', name: 'Going Deeper',
    subtitle: 'Object-Oriented Programming — blueprints (classes) that create real things (objects).',
    tags: ['class', 'Objects', '__init__', 'Inheritance'],
    href: 'lesson-10.html'
  },
  {
    id: 11, emoji: '🔧', name: 'Real World Tools',
    subtitle: 'Popular Python libraries that powers actual jobs and real products.',
    tags: ['NumPy', 'Pandas', 'Requests', 'pip install'],
    href: 'lesson-11.html'
  },
  {
    id: 12, emoji: '🚀', name: 'Build Something Real',
    subtitle: 'Combine everything. Build a calculator, quiz app, and weather app from scratch.',
    tags: ['Mini Projects', 'Full Programs', 'Problem Solving'],
    href: 'lesson-12.html'
  },
];

function getStatus(stageId) {
  const p = getModuleProgress(stageId);
  return p.status || (stageId === 1 ? 'unlocked' : 'locked');
}

function getStageProgress(stageId) {
  const p = getModuleProgress(stageId);
  return p.progress || 0;
}

function renderStageCard(stage, index) {
  const status   = getStatus(stage.id);
  const progress = getStageProgress(stage.id);
  const isRight  = index % 2 === 1;
  const isLocked = status === 'locked';

  const tagsHTML = stage.tags.map(t =>
    `<span class="pill pill-mint" style="font-size:0.72rem">${t}</span>`
  ).join('');

  const statusHTML = isLocked
    ? `<span class="pill pill-yellow">🔒 Locked</span>`
    : status === 'completed'
    ? `<span class="pill pill-mint">✅ Completed</span>`
    : `<span class="pill pill-orange">▶️ Start</span>`;

  const barHTML = isLocked ? '' : `
    <div class="stage-progress-wrap">
      <div class="xp-bar">
        <div class="xp-bar-fill" style="width:${progress}%"></div>
      </div>
    </div>`;

  const cardEl = isLocked ? 'div' : 'a';
  const hrefAttr = isLocked ? '' : `href="${stage.href}"`;

  return `
    <div class="stage-row ${isRight ? 'right' : ''} observe">
      <div class="stage-connector"></div>
      <div class="stage-node ${status}" title="Stage ${stage.id}">
        ${stage.emoji}
        <span class="stage-node-num">Stage ${stage.id}</span>
      </div>
      <${cardEl} ${hrefAttr} class="stage-card ${status}">
        <div class="stage-name">${stage.name}</div>
        <div class="stage-subtitle">${stage.subtitle}</div>
        <div class="stage-tags">${tagsHTML}</div>
        <div class="stage-status">
          ${statusHTML}
          ${barHTML}
          ${status === 'completed' ? `<div class="check-badge">✓</div>` : ''}
        </div>
      </${cardEl}>
    </div>`;
}

function renderProgressStats() {
  const progress = getProgress();
  let done = 0;
  STAGES.forEach(s => {
    const p = progress[s.id];
    if (p && p.status === 'completed') done++;
  });
  const pct = Math.round((done / STAGES.length) * 100);

  const el = id => document.getElementById(id);
  if (el('stages-done'))  el('stages-done').textContent  = done;
  if (el('total-xp-rm'))  el('total-xp-rm').textContent  = getXP();
  if (el('streak-rm'))    el('streak-rm').textContent    = getStreak();
  if (el('pct-label'))    el('pct-label').textContent    = pct + '%';
  if (el('overall-bar'))  el('overall-bar').style.width  = pct + '%';
}

function initRoadmap() {
  const container = document.getElementById('roadmap-stages');
  if (!container) return;

  container.innerHTML = STAGES.map((s, i) => renderStageCard(s, i)).join('');
  renderProgressStats();

  // Intersection observer for stagger
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('anim-fade-up');
        entry.target.style.opacity = '';
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });

  document.querySelectorAll('.stage-row').forEach(row => {
    row.style.opacity = '0';
    observer.observe(row);
  });
}
