/* ===================================================
   PyLearn — flashcards.js
   =================================================== */
"use strict";

const FLASHCARD_DATA = {
  1: [
    { front: 'What does print() do?', back: 'Displays output on the screen. Whatever you put inside the brackets appears in the console.', code: 'print("Hello, World!")' },
    { front: 'What is a Python comment?', back: 'A line starting with # that Python ignores. Used to leave notes for humans reading the code.', code: '# This is a comment' },
    { front: 'What is a string?', back: 'Text surrounded by quotes. Single or double quotes both work.', code: 'name = "Sarpanch"\ncity = \'Mumbai\'' },
    { front: 'What is Python?', back: 'A programming language — a way to give your computer step-by-step instructions. Created by Guido van Rossum in 1991.', code: null },
    { front: 'What does "syntax" mean?', back: 'The grammar rules of Python. Break them and Python refuses to run your code. Very dramatic about it too.', code: null },
  ],
  2: [
    { front: 'What is a variable?', back: 'A named container that holds a value. Like a labelled box. You write something in it, Python remembers.', code: 'name = "Sarpanch"\nage = 5' },
    { front: 'What does type() do?', back: 'Tells you the data type of a value. Returns something like <class \'int\'> or <class \'str\'>.', code: 'print(type(42))    # int\nprint(type("hi"))  # str' },
    { front: 'What are the 4 basic data types?', back: 'int (whole numbers), float (decimals), str (text), bool (True/False). That\'s the starter pack.', code: 'x = 42        # int\ny = 3.14      # float\nz = "hello"   # str\nb = True      # bool' },
    { front: 'What is the difference between = and ==?', back: '= assigns a value to a variable. == checks if two things are equal. Very different. Python will judge you if you mix them up.', code: 'name = "Sarpanch"  # assignment\nname == "Sarpanch" # comparison → True' },
    { front: 'What does // do in Python?', back: 'Floor division — divides two numbers and rounds DOWN to the nearest whole number, discarding the remainder.', code: 'print(10 // 3)   # 3\nprint(10 % 3)    # 1 (remainder)' },
  ],
  3: [
    { front: 'What is an if statement?', back: 'A conditional — Python runs the block only if the condition is True. Otherwise it skips it.', code: 'if temperature > 30:\n    print("It\'s hot!")' },
    { front: 'What is elif?', back: 'Short for "else if". Checks a second condition if the first one was False.', code: 'if score >= 90:\n    print("A")\nelif score >= 70:\n    print("B")\nelse:\n    print("Try again")' },
    { front: 'What logical operators does Python use?', back: 'and, or, not. Written as English words, not && or ||. Python wanted to be readable.', code: 'if age > 18 and is_registered:\n    print("Can vote!")' },
  ],
  4: [
    { front: 'What does range(5) generate?', back: 'The numbers 0, 1, 2, 3, 4. Five numbers starting from zero. Not including 5 itself.', code: 'for i in range(5):\n    print(i)  # 0 1 2 3 4' },
    { front: 'What does break do in a loop?', back: 'Immediately exits the loop — no more iterations, even if the condition is still True.', code: 'for i in range(10):\n    if i == 5:\n        break\n    print(i)  # stops at 4' },
    { front: 'What does continue do in a loop?', back: 'Skips the rest of the current iteration and goes to the next one. The loop keeps running.', code: 'for i in range(5):\n    if i == 2:\n        continue\n    print(i)  # skips 2' },
    { front: 'What is a while loop?', back: 'A loop that keeps running as long as its condition is True. Forget to change the condition? Hello, infinite loop.', code: 'i = 0\nwhile i < 5:\n    print(i)\n    i += 1' },
  ],
  5: [
    { front: 'What is a Python list?', back: 'An ordered collection of items. Can hold mixed types. Items are accessed by index starting at 0.', code: 'fruits = ["apple", "banana", "mango"]\nprint(fruits[0])  # apple' },
    { front: 'What is a dictionary?', back: 'A collection of key-value pairs. You look up values by key, not by position.', code: 'person = {"name": "Sarpanch", "age": 5}\nprint(person["name"])  # Sarpanch' },
    { front: 'What does len() do?', back: 'Returns the number of items in a list, or the number of characters in a string.', code: 'fruits = ["apple", "banana"]\nprint(len(fruits))    # 2\nprint(len("hello"))   # 5' },
    { front: 'List vs Tuple — what is the difference?', back: 'Lists are mutable (changeable). Tuples are immutable (fixed). Use tuples when data should not change.', code: 'my_list  = [1, 2, 3]   # changeable\nmy_tuple = (1, 2, 3)   # fixed' },
  ],
  6: [
    { front: 'What keyword defines a function?', back: 'def — short for "define". You write def function_name(): and then the code block below it.', code: 'def greet(name):\n    print("Hello,", name)\n\ngreet("Sarpanch")' },
    { front: 'What does return do in a function?', back: 'Sends a value back to wherever the function was called from. The function then stops running.', code: 'def add(a, b):\n    return a + b\n\nresult = add(3, 5)  # result = 8' },
    { front: 'What is a default argument?', back: 'A parameter with a preset value used if no argument is provided when calling the function.', code: 'def greet(name="friend"):\n    print("Hello,", name)\n\ngreet()         # Hello, friend\ngreet("Reena")  # Hello, Reena' },
  ],
  7: [
    { front: 'What does import do?', back: 'Brings in a module (a file of Python code) so you can use its functions and variables.', code: 'import math\nprint(math.pi)       # 3.14159...\nprint(math.sqrt(16)) # 4.0' },
    { front: 'What is the difference between import math and from math import sqrt?', back: 'import math gives access to everything via math.sqrt(). from math import sqrt lets you use sqrt() directly without the prefix.', code: 'from math import sqrt\nprint(sqrt(25))  # 5.0' },
  ],
  8: [
    { front: 'What does try/except do?', back: 'try runs risky code. If it crashes, except catches the error and runs alternative code instead of crashing the whole program.', code: 'try:\n    x = int("abc")\nexcept ValueError:\n    print("Not a number!")' },
    { front: 'What is finally?', back: 'A block that runs after try/except NO MATTER WHAT — whether there was an error or not.', code: 'try:\n    risky_code()\nexcept:\n    print("Error caught")\nfinally:\n    print("This always runs")' },
  ],
  9: [
    { front: 'How do you open a file in Python?', back: 'Use open(filename, mode). Use "r" to read, "w" to write. Best practice: use the "with" statement to auto-close.', code: 'with open("data.txt", "r") as f:\n    content = f.read()\n    print(content)' },
    { front: 'What does "with" do when opening files?', back: 'Automatically closes the file when the block ends — even if an error happens. No need to call f.close() manually.', code: 'with open("file.txt", "w") as f:\n    f.write("Hello!")\n# File is already closed here' },
  ],
  10: [
    { front: 'What is a class in Python?', back: 'A blueprint for creating objects. It defines what properties (attributes) and actions (methods) the object will have.', code: 'class Dog:\n    def __init__(self, name):\n        self.name = name\n    def bark(self):\n        print(self.name, "says: Woof!")' },
    { front: 'What is __init__?', back: 'The constructor method — Python calls it automatically when you create a new object. Used to set up the initial state.', code: 'class Car:\n    def __init__(self, brand):\n        self.brand = brand\n\nmy_car = Car("Toyota")' },
    { front: 'What is inheritance?', back: 'A child class that takes on all the properties and methods of a parent class, and can add its own on top.', code: 'class Animal:\n    def breathe(self): print("Breathing")\n\nclass Dog(Animal):\n    def bark(self): print("Woof!")\n\nd = Dog()\nd.breathe()  # inherited!' },
  ],
  11: [
    { front: 'What does pip install do?', back: 'Downloads and installs a Python library from the internet. pip is Python\'s package manager — your access to 450,000+ free tools.', code: '# In terminal:\n# pip install requests\n# pip install pandas\n# pip install numpy' },
    { front: 'What is Pandas?', back: 'A library for data analysis. It gives you DataFrames — like Excel sheets in Python — that you can filter, sort, and analyse.', code: 'import pandas as pd\ndf = pd.DataFrame({"name": ["Alice"], "score": [95]})\nprint(df)' },
  ],
  12: [
    { front: 'What is DRY in programming?', back: '"Don\'t Repeat Yourself". If you write the same code twice, it should probably be a function.', code: null },
    { front: 'What is a mini project?', back: 'A small but complete program that uses several concepts together. Building projects is the fastest way to learn.', code: null },
  ],
};

// All modules combined
const ALL_CARDS = Object.entries(FLASHCARD_DATA).flatMap(([mod, cards]) =>
  cards.map(c => ({ ...c, module: parseInt(mod) }))
);

let deck = [];
let currentIdx = 0;
let gotItIds = new Set();
let reviewIds = new Set();
let mode = 'normal';
let speedInterval = null;
let speedTimeLeft = 10;

function getModuleCards(moduleId) {
  return moduleId === 'all' ? [...ALL_CARDS] : (FLASHCARD_DATA[moduleId] || []);
}

function startDeck(moduleId, selectedMode) {
  deck = getModuleCards(moduleId).map((c, i) => ({ ...c, id: i }));
  currentIdx = 0;
  gotItIds.clear();
  reviewIds.clear();
  mode = selectedMode || 'normal';
  renderCard();
}

function renderCard() {
  const arena = document.getElementById('fc-arena');
  if (!arena) return;

  if (currentIdx >= deck.length) {
    // Check if any "Review Again" cards left
    const reviewCards = deck.filter(c => reviewIds.has(c.id));
    if (reviewCards.length > 0) {
      deck = reviewCards;
      currentIdx = 0;
      reviewIds.clear();
      renderCard();
      return;
    }
    // Session complete
    arena.innerHTML = `
      <div class="fc-complete">
        <img src="assets/sarpanch/victory.svg" alt="Sarpanch" style="width:140px;margin:0 auto"/>
        <h2 style="margin-top:var(--sp-6)">All cards done! 🎉</h2>
        <p>You reviewed ${gotItIds.size} cards successfully. Sarpanch is proud.</p>
        <div style="display:flex;gap:var(--sp-4);justify-content:center;margin-top:var(--sp-8)">
          <button class="btn btn-outline" onclick="restartDeck()">↺ Go Again</button>
          <a href="practice.html" class="btn btn-primary">Take a Quiz →</a>
        </div>
      </div>`;
    addXP(10);
    return;
  }

  const card = deck[currentIdx];
  const total = deck.length;
  const done  = gotItIds.size;
  const pct   = total > 0 ? Math.round((done / (total + gotItIds.size)) * 100) : 0;

  const codeHTML = card.code
    ? `<div class="fc-code-example"><pre style="white-space:pre-wrap">${card.code}</pre></div>`
    : '';

  let inputHTML = '';
  if (mode === 'test') {
    inputHTML = `
      <input class="fc-test-input" id="fc-test-input" placeholder="Type your answer, then flip..." autocomplete="off"/>
    `;
  }

  const timerHTML = mode === 'speed'
    ? `<div class="fc-timer" id="fc-speed-timer">${speedTimeLeft}</div>`
    : '';

  arena.innerHTML = `
    <div class="fc-progress-row">
      <span>${done} done</span>
      <div class="fc-progress-bar-wrap"><div class="xp-bar"><div class="xp-bar-fill" style="width:${pct}%"></div></div></div>
      <span>${total - currentIdx} left</span>
    </div>
    ${timerHTML}
    ${inputHTML}
    <div class="fc-card-wrap" id="fc-card-wrap">
      <div class="fc-card" id="fc-card">
        <div class="fc-face fc-front">
          <div class="fc-face-label">❓ Question</div>
          <div class="fc-face-text">${card.front}</div>
          <div class="fc-flip-hint">Click to flip ↕</div>
        </div>
        <div class="fc-face fc-back">
          <div class="fc-face-label">✅ Answer</div>
          <div class="fc-face-text">${card.back}</div>
          ${codeHTML}
          <div class="fc-flip-hint">Click to flip back ↕</div>
        </div>
      </div>
    </div>
    <div class="fc-actions" id="fc-actions">
      <button class="fc-action-btn review" id="fc-review-btn">🔁 Review Again</button>
      <button class="fc-action-btn got-it" id="fc-gotit-btn">✅ Got It!</button>
    </div>
    <div style="text-align:center;margin-top:var(--sp-2);color:var(--text-muted);font-size:0.82rem;font-weight:600">${currentIdx+1} / ${total}</div>
  `;

  const cardEl  = document.getElementById('fc-card');
  const actions = document.getElementById('fc-actions');
  const wrap    = document.getElementById('fc-card-wrap');
  let flipped   = false;

  function flipCard() {
    flipped = !flipped;
    cardEl.classList.toggle('flipped', flipped);
    if (flipped) actions.classList.add('visible');
  }

  wrap.addEventListener('click', flipCard);
  document.getElementById('fc-gotit-btn').addEventListener('click', e => {
    e.stopPropagation();
    gotItIds.add(card.id);
    addXP(XP_QUIZ_Q);
    clearInterval(speedInterval);
    currentIdx++;
    renderCard();
  });
  document.getElementById('fc-review-btn').addEventListener('click', e => {
    e.stopPropagation();
    reviewIds.add(card.id);
    clearInterval(speedInterval);
    currentIdx++;
    renderCard();
  });

  // Speed mode timer
  if (mode === 'speed') {
    speedTimeLeft = 10;
    clearInterval(speedInterval);
    speedInterval = setInterval(() => {
      speedTimeLeft--;
      const timerEl = document.getElementById('fc-speed-timer');
      if (timerEl) {
        timerEl.textContent = speedTimeLeft;
        timerEl.classList.toggle('urgent', speedTimeLeft <= 3);
      }
      if (speedTimeLeft <= 0) {
        clearInterval(speedInterval);
        if (!flipped) flipCard();
        reviewIds.add(card.id);
        setTimeout(() => { currentIdx++; renderCard(); }, 1000);
      }
    }, 1000);
  }
}

window.restartDeck = function() { location.reload(); };

function initFlashcards() {
  const moduleSelect = document.getElementById('fc-module-select');
  const modeTabs     = document.querySelectorAll('.fc-mode-tab');
  let selectedModule = 'all';
  let selectedMode   = 'normal';

  if (moduleSelect) {
    moduleSelect.addEventListener('change', () => { selectedModule = moduleSelect.value; });
  }

  modeTabs.forEach(tab => {
    tab.addEventListener('click', () => {
      modeTabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');
      selectedMode = tab.dataset.mode;
    });
  });

  document.getElementById('fc-start-btn').addEventListener('click', () => {
    document.getElementById('fc-setup').classList.add('hidden');
    startDeck(selectedModule === 'all' ? 'all' : parseInt(selectedModule), selectedMode);
  });
}
