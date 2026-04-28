/* ===================================================
   PyLearn — quiz.js
   Universal quiz engine: all question types, scoring, XP
   =================================================== */

"use strict";

// ─── Question Type Constants ───────────────────────────
const Q_MC      = 'mc';       // Multiple choice
const Q_TF      = 'tf';       // True/False
const Q_FILL    = 'fill';     // Fill in the blank
const Q_OUTPUT  = 'output';   // Predict code output
const Q_BUG     = 'bug';      // Spot the error
const Q_COMPLETE= 'complete'; // Code completion
const Q_MATCH   = 'match';    // Match pairs
const Q_ARRANGE = 'arrange';  // Arrange lines
const Q_SHORT   = 'short';    // Short answer (self-mark)
const Q_CODING  = 'coding';   // Mini coding challenge (playground)

// ─── All Quiz Data ─────────────────────────────────────
// Module 1 - First Steps
const MODULE_1_QUIZ = [
  {
    type: Q_MC,
    question: 'What does the print() function do in Python?',
    options: ['Prints a document', 'Displays text/values on the screen', 'Saves a file', 'Downloads something'],
    correct: 1,
    explanation: 'print() displays whatever you put inside it on the screen (the console/terminal).'
  },
  {
    type: Q_TF,
    question: 'Python is case-sensitive. That means print() and Print() are the same thing.',
    correct: false,
    explanation: 'False! Python is case-sensitive. print() works but Print() will give you a NameError. Python judges your capitalization choices.'
  },
  {
    type: Q_OUTPUT,
    question: 'What does this code print?',
    code: 'print("Hello")\nprint("World")',
    options: ['Hello World', 'Hello\nWorld', '"Hello"\n"World"', 'HelloWorld'],
    correct: 1,
    explanation: 'Each print() call adds a new line by default. So "Hello" appears on line 1, "World" on line 2.'
  },
  {
    type: Q_FILL,
    question: 'Complete the code to print your name: ___("Sarpanch")',
    answer: 'print',
    explanation: 'print() is the function that displays output. It\'s literally the first thing you learn in Python. Welcome!'
  },
  {
    type: Q_MC,
    question: 'Which of these is a valid Python comment?',
    options: ['// This is a comment', '/* This is a comment */', '# This is a comment', '-- This is a comment'],
    correct: 2,
    explanation: 'Python comments start with #. Everything after # on that line is ignored by Python. Perfect for leaving notes to your future self.'
  },
];

// Module 2 - Building Blocks
const MODULE_2_QUIZ = [
  {
    type: Q_MC,
    question: 'Which of these is the correct way to create a variable in Python?',
    options: ['var name = "Sarpanch"', 'name = "Sarpanch"', 'let name = "Sarpanch"', 'string name = "Sarpanch"'],
    correct: 1,
    explanation: 'Python uses simple assignment: name = value. No var, let, or type needed. Just the name, equals sign, and value.'
  },
  {
    type: Q_OUTPUT,
    question: 'What does this code output?',
    code: 'x = 10\ny = 3\nprint(x + y)',
    options: ['10 + 3', '13', 'x + y', 'Error'],
    correct: 1,
    explanation: '10 + 3 = 13. Python does the math and print() shows the result. x and y are just names for the numbers.'
  },
  {
    type: Q_TF,
    question: 'In Python, 5 and "5" are the same type of data.',
    correct: false,
    explanation: 'False! 5 is an integer (int). "5" is a string (str). They look the same but Python treats them very differently. 5 + 5 = 10. "5" + "5" = "55". Wild, right?'
  },
  {
    type: Q_MC,
    question: 'What does type() do?',
    options: ['Types text for you', 'Tells you the data type of a value', 'Converts a value to text', 'Checks spelling'],
    correct: 1,
    explanation: 'type() returns the data type of a value. type(42) gives <class \'int\'>, type("hello") gives <class \'str\'>, etc.'
  },
  {
    type: Q_FILL,
    question: 'To convert the string "42" to an integer, you use: ___(\"42\")',
    answer: 'int',
    explanation: 'int("42") converts the string "42" into the integer 42. You can also use str(), float(), and bool() to convert between types.'
  },
];

// Module 3 - Making Decisions
const MODULE_3_QUIZ = [
  {
    type: Q_OUTPUT,
    question: 'What does this code print?',
    code: 'age = 20\nif age >= 18:\n    print("Adult")\nelse:\n    print("Minor")',
    options: ['Adult', 'Minor', 'Error', 'Nothing'],
    correct: 0,
    explanation: '20 >= 18 is True, so Python runs the if block and prints "Adult".'
  },
  {
    type: Q_MC,
    question: 'What symbol means "is equal to" in Python comparisons?',
    options: ['=', '===', '==', 'equals'],
    correct: 2,
    explanation: '== is the comparison operator. = is assignment (set a value). == is comparison (check if two values are equal). Very different!'
  },
  {
    type: Q_TF,
    question: 'elif is short for "else if" and can be used multiple times in one if statement.',
    correct: true,
    explanation: 'True! You can chain as many elif blocks as you need. Only the first True condition runs. Then Python skips the rest.'
  },
  {
    type: Q_BUG,
    question: 'Find the bug in this code:',
    code: 'score = 85\nif score > 90\n    print("A grade")',
    options: ['score is wrong', 'Missing colon (:) after the if condition', 'print should be PRINT', 'score > 90 is wrong'],
    correct: 1,
    explanation: 'Missing colon! Every if, elif, else, for, while, def, and class line must end with a colon (:). Python will throw a SyntaxError without it.'
  },
  {
    type: Q_FILL,
    question: 'Complete the blank: if x ___ 10: (check if x is NOT equal to 10)',
    answer: '!= 10',
    explanation: '!= means "not equal to". So if x != 10: runs the block only when x is anything other than 10. The opposite of ==.'
  },
];

// Module 4 - Loops
const MODULE_4_QUIZ = [
  {
    type: Q_OUTPUT,
    question: 'How many times does this loop run?',
    code: 'for i in range(5):\n    print(i)',
    options: ['4 times', '5 times', '6 times', 'Forever'],
    correct: 1,
    explanation: 'range(5) generates numbers 0, 1, 2, 3, 4 — that\'s 5 numbers, so the loop runs 5 times.'
  },
  {
    type: Q_MC,
    question: 'Which keyword immediately stops a loop?',
    options: ['stop', 'exit', 'break', 'end'],
    correct: 2,
    explanation: 'break immediately exits the loop. continue skips the current iteration and goes to the next one.'
  },
  {
    type: Q_TF,
    question: 'A while loop runs as long as its condition is True.',
    correct: true,
    explanation: 'True! while condition: runs the block over and over until condition becomes False. Forget to change the condition? Infinite loop. Sarpanch has been there.'
  },
  {
    type: Q_BUG,
    question: 'What is wrong with this while loop?',
    code: 'count = 0\nwhile count < 5:\n    print(count)',
    options: ['count should start at 1', 'Missing count += 1 — this is an infinite loop!', 'while should be for', 'print(count) is wrong'],
    correct: 1,
    explanation: 'Without incrementing count, it stays 0 forever and the loop never ends. Always update your loop variable inside a while loop!'
  },
  {
    type: Q_FILL,
    question: 'What keyword skips the current iteration and goes to the next one? ___',
    answer: 'continue',
    explanation: 'continue jumps back to the top of the loop for the next round. break stops the loop entirely. They are opposites!'
  },
];

// Module 5 - Collections
const MODULE_5_QUIZ = [
  {
    type: Q_MC,
    question: 'What is the index of the first element in a Python list?',
    options: ['1', '0', '-1', 'first'],
    correct: 1,
    explanation: 'Python (and most languages) start counting from 0. So the first element is at index [0], the second at [1], etc. This trips everyone up at first!'
  },
  {
    type: Q_OUTPUT,
    question: 'What does this print?',
    code: 'fruits = ["apple", "banana", "mango"]\nprint(fruits[1])',
    options: ['apple', 'banana', 'mango', 'Error'],
    correct: 1,
    explanation: 'fruits[1] is "banana". Remember: [0] = "apple", [1] = "banana", [2] = "mango".'
  },
  {
    type: Q_TF,
    question: 'A Python dictionary stores data as key-value pairs.',
    correct: true,
    explanation: 'True! Dictionaries map keys to values — like a word (key) and its definition (value). You access values using their key, not a number index.'
  },
  {
    type: Q_OUTPUT,
    question: 'What does this code output?',
    code: 'person = {"name": "Sarpanch", "age": 300}\nprint(person["name"])',
    options: ['Sarpanch', '300', 'person["name"]', 'Error'],
    correct: 0,
    explanation: 'person["name"] looks up the "name" key and returns its value "Sarpanch". Dictionary access uses square brackets with the key name as a string.'
  },
  {
    type: Q_MC,
    question: 'Which method adds a new item to the END of a list?',
    options: ['.add()', '.push()', '.append()', '.insert()'],
    correct: 2,
    explanation: '.append() adds an item to the end of a list. list.append("new_item") is one of the most commonly used list methods in Python!'
  },
];

// Modules 6-12 — full question sets
const MODULE_6_QUIZ = [
  {
    type: Q_MC,
    question: 'What keyword is used to define a function in Python?',
    options: ['function', 'func', 'def', 'define'],
    correct: 2,
    explanation: 'def is short for "define". You write def function_name(): and the indented block below becomes the function body.'
  },
  {
    type: Q_TF,
    question: 'A function runs as soon as you define it.',
    correct: false,
    explanation: 'False! Defining a function just creates it in memory. It only executes when you call it by writing function_name().'
  },
  {
    type: Q_OUTPUT,
    question: 'What does this code print?',
    code: 'def greet(name):\n    return "Hello, " + name\n\nprint(greet("Sarpanch"))',
    options: ['Hello, name', 'Hello, Sarpanch', 'greet("Sarpanch")', 'Error'],
    correct: 1,
    explanation: 'greet() takes name and returns "Hello, " + "Sarpanch". print() displays the returned value.'
  },
  {
    type: Q_FILL,
    question: 'The keyword that sends a value back from a function is: ___',
    answer: 'return',
    explanation: 'return sends a value back to the caller. Without return, a function gives back None by default.'
  },
];

const MODULE_7_QUIZ = [
  {
    type: Q_MC,
    question: 'Which keyword imports a module in Python?',
    options: ['require', 'include', 'import', 'use'],
    correct: 2,
    explanation: 'import is the keyword. import math gives you access to math.sqrt(), math.pi, and more.'
  },
  {
    type: Q_TF,
    question: 'After "import math", you call square root like this: sqrt(16)',
    correct: false,
    explanation: 'False! You must use dot notation: math.sqrt(16). The module name always comes first.'
  },
  {
    type: Q_MC,
    question: 'What does "import random as r" do?',
    options: ['Imports only the random function', 'Imports random with the alias r', 'Renames the module permanently', 'Causes an error'],
    correct: 1,
    explanation: '"as r" creates an alias. You write r.randint(1,10) instead of random.randint(1,10). Standard in data science — numpy as np, pandas as pd.'
  },
  {
    type: Q_OUTPUT,
    question: 'What does this output?',
    code: 'import math\nprint(math.floor(4.9))',
    options: ['4.9', '5', '4', 'Error'],
    correct: 2,
    explanation: 'math.floor() rounds DOWN to the nearest integer. 4.9 becomes 4. math.ceil() would round up to 5.'
  },
];

const MODULE_8_QUIZ = [
  {
    type: Q_MC,
    question: 'Which keywords are used to handle errors in Python?',
    options: ['try/catch', 'try/except', 'error/handle', 'catch/fix'],
    correct: 1,
    explanation: 'Python uses try/except. You try the risky code; if something goes wrong, except handles it gracefully.'
  },
  {
    type: Q_TF,
    question: 'The "finally" block runs only if no error occurred.',
    correct: false,
    explanation: 'False! finally ALWAYS runs — error or not. Use it for cleanup code like closing files or database connections.'
  },
  {
    type: Q_BUG,
    question: 'Find the problem with this code:',
    code: 'try\n    result = 10 / 0\nexcept ZeroDivisionError:\n    print("Cannot divide by zero!")',
    options: ['except should be catch', 'Missing colon after try', 'ZeroDivisionError is wrong', 'result is wrong'],
    correct: 1,
    explanation: 'try: needs a colon, just like if, for, while, def, and class. Missing the colon is a SyntaxError.'
  },
  {
    type: Q_MC,
    question: 'What type of error occurs when Python cannot understand your code at all?',
    options: ['RuntimeError', 'LogicError', 'SyntaxError', 'TypeError'],
    correct: 2,
    explanation: 'SyntaxError means Python cannot parse the code at all — missing colons, wrong brackets, etc. Runtime errors occur during execution.'
  },
];

const MODULE_9_QUIZ = [
  {
    type: Q_MC,
    question: 'Which function is used to open a file in Python?',
    options: ['read()', 'file()', 'open()', 'load()'],
    correct: 2,
    explanation: 'open() opens a file. Use .read() to read it. Always use with open(...) so the file closes automatically.'
  },
  {
    type: Q_MC,
    question: 'Which file mode overwrites ALL existing content and starts fresh?',
    options: ['"r"', '"a"', '"w"', '"x"'],
    correct: 2,
    explanation: '"w" (write) mode clears all existing content and starts from scratch. "a" appends to the end. "r" is read-only.'
  },
  {
    type: Q_TF,
    question: 'Using "with open(...) as f:" automatically closes the file when the block ends.',
    correct: true,
    explanation: 'True! The with statement guarantees the file is closed even if an error occurs inside the block.'
  },
  {
    type: Q_OUTPUT,
    question: 'After this code runs, what does the file contain?',
    code: 'with open("log.txt", "w") as f:\n    f.write("Hello")\nwith open("log.txt", "a") as f:\n    f.write(" World")',
    options: ['Hello', 'World', 'Hello World', 'Hello\\nWorld'],
    correct: 2,
    explanation: '"w" writes "Hello" (fresh start). "a" appends " World". Result: "Hello World" — no newline because we did not write \\n between them.'
  },
];

const MODULE_10_QUIZ = [
  {
    type: Q_MC,
    question: 'What is a "class" in Python?',
    options: ['A school class', 'A blueprint for creating objects', 'A list of functions', 'A type of loop'],
    correct: 1,
    explanation: 'A class is a blueprint — like a cookie cutter. It is not the cookie itself, but it shapes every cookie made from it.'
  },
  {
    type: Q_TF,
    question: 'In Python, "self" refers to the specific object that called the method.',
    correct: true,
    explanation: 'True! self is how Python knows which object is active. If dog1.bark() is called, self inside bark() refers to dog1.'
  },
  {
    type: Q_FILL,
    question: 'The special method that runs automatically when a new object is created is: ___',
    answer: '__init__',
    explanation: '__init__ is the constructor. Python calls it automatically when you do obj = MyClass(). The double underscores are called "dunder".'
  },
  {
    type: Q_OUTPUT,
    question: 'What does this code print?',
    code: 'class Cat:\n    def __init__(self, name):\n        self.name = name\n\nc = Cat("Whiskers")\nprint(c.name)',
    options: ['Cat', 'name', 'Whiskers', 'Error'],
    correct: 2,
    explanation: 'c = Cat("Whiskers") triggers __init__ and sets self.name = "Whiskers". c.name accesses that property and prints "Whiskers".'
  },
];

const MODULE_11_QUIZ = [
  {
    type: Q_MC,
    question: 'Which command installs a Python library from the internet?',
    options: ['python install', 'pip install', 'get package', 'download lib'],
    correct: 1,
    explanation: 'pip install library-name downloads and installs a library. pip is your key to 450,000+ free Python packages.'
  },
  {
    type: Q_TF,
    question: 'NumPy arrays are just regular Python lists with a different name.',
    correct: false,
    explanation: 'False! NumPy arrays support element-wise math (array * 2 doubles every element at once) and are 10-100x faster than lists for numerical work.'
  },
  {
    type: Q_MC,
    question: 'Which library is best for working with tabular data (rows and columns)?',
    options: ['NumPy', 'Requests', 'Pandas', 'math'],
    correct: 2,
    explanation: 'Pandas is Python\'s spreadsheet in code. Its DataFrame object works like Excel — filtering, sorting, and aggregation built right in.'
  },
  {
    type: Q_MC,
    question: 'What does "import numpy as np" allow you to do?',
    options: ['Use numpy with the shorter alias np', 'Only import the np function', 'Rename numpy permanently', 'Make numpy run faster'],
    correct: 0,
    explanation: '"as np" creates an alias so you write np.array() instead of numpy.array(). Universally used across data science Python code.'
  },
];

const MODULE_12_QUIZ = [
  {
    type: Q_MC,
    question: 'Which of these is NOT a Python data collection type?',
    options: ['list', 'dictionary', 'tuple', 'function'],
    correct: 3,
    explanation: 'list, dictionary, and tuple are all Python collection types. A function is a reusable block of code, not a collection. You have come a long way!'
  },
  {
    type: Q_OUTPUT,
    question: 'What does this final code print?',
    code: 'class Coder:\n    def __init__(self, name):\n        self.name = name\n    def celebrate(self):\n        print(self.name + " finished PyLearn!")\n\nme = Coder("You")\nme.celebrate()',
    options: ['Coder finished PyLearn!', 'You finished PyLearn!', 'me.celebrate()', 'Error'],
    correct: 1,
    explanation: 'me = Coder("You") sets self.name = "You". celebrate() prints "You finished PyLearn!". And you really did!'
  },
  {
    type: Q_TF,
    question: 'A try/except block can catch a ZeroDivisionError.',
    correct: true,
    explanation: 'True! You specify the error type: "except ZeroDivisionError:" catches division by zero. You mastered this in Stage 8!'
  },
  {
    type: Q_FILL,
    question: 'To install a third-party library like pandas, you run: ___ install pandas',
    answer: 'pip',
    explanation: 'pip is Python\'s package manager. pip install pandas downloads Pandas from PyPI. You are ready for the real world!'
  },
];

const QUIZ_DATA = {
  1: MODULE_1_QUIZ,
  2: MODULE_2_QUIZ,
  3: MODULE_3_QUIZ,
  4: MODULE_4_QUIZ,
  5: MODULE_5_QUIZ,
  6: MODULE_6_QUIZ,
  7: MODULE_7_QUIZ,
  8: MODULE_8_QUIZ,
  9: MODULE_9_QUIZ,
  10: MODULE_10_QUIZ,
  11: MODULE_11_QUIZ,
  12: MODULE_12_QUIZ,
};

// ─── Inline Quiz Widget (used in lesson pages) ─────────
function initInlineQuiz(opts) {
  /*
    opts = {
      containerId: 'quiz-widget-1',
      moduleId: 1,
      questions: [...] // optional override
    }
  */
  const container = document.getElementById(opts.containerId);
  if (!container) return;

  const questions = opts.questions || QUIZ_DATA[opts.moduleId] || [];
  let currentQ = 0;
  let score    = 0;
  let answered = false;

  function renderQ() {
    const q = questions[currentQ];
    if (!q) { showResult(); return; }
    answered = false;

    let optionsHTML = '';

    if (q.type === Q_MC || q.type === Q_OUTPUT || q.type === Q_BUG) {
      const letters = ['A', 'B', 'C', 'D'];
      optionsHTML = q.options.map((opt, i) => `
        <button class="quiz-option" data-idx="${i}" id="${opts.containerId}-opt-${i}">
          <span class="quiz-option-letter">${letters[i]}</span>
          <span>${opt}</span>
        </button>
      `).join('');
    } else if (q.type === Q_TF) {
      optionsHTML = `
        <button class="quiz-option" data-idx="0" id="${opts.containerId}-opt-0"><span class="quiz-option-letter">T</span> True</button>
        <button class="quiz-option" data-idx="1" id="${opts.containerId}-opt-1"><span class="quiz-option-letter">F</span> False</button>
      `;
    } else if (q.type === Q_FILL) {
      optionsHTML = `
        <input type="text" class="fill-blank-input" id="${opts.containerId}-fill" placeholder="Type your answer..." autocomplete="off"/>
        <button class="btn btn-primary btn-sm" id="${opts.containerId}-check" style="margin-top:var(--sp-3)">Check</button>
      `;
    } else if (q.type === Q_SHORT) {
      optionsHTML = `
        <div class="callout-yellow callout" style="margin-bottom:var(--sp-3)">
          <strong>💡 Sample answer:</strong> ${q.sampleAnswer}
        </div>
        <button class="btn btn-mint btn-sm" id="${opts.containerId}-self-mark">I understood this ✓</button>
      `;
    }

    // Escape HTML entities and wrap in pre for correct indentation
    const escapeHtml = s => s.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;');

    const codeBlock = q.code ? `
      <div class="code-block" style="margin-bottom:var(--sp-4)">
        <pre>${escapeHtml(q.code)}</pre>
      </div>` : '';

    container.innerHTML = `
      <div class="quiz-widget">
        <div class="quiz-widget-header">
          <div class="quiz-widget-title">🧠 Quick Check</div>
          <div class="quiz-q-count">Question ${currentQ+1} of ${questions.length}</div>
        </div>
        <div class="quiz-question">
          <div class="quiz-question-text">${q.question}</div>
          ${codeBlock}
          <div class="quiz-options" id="${opts.containerId}-options">
            ${optionsHTML}
          </div>
          <div class="quiz-feedback" id="${opts.containerId}-feedback"></div>
        </div>
      </div>
    `;

    // Bind events
    if (q.type === Q_MC || q.type === Q_OUTPUT || q.type === Q_BUG) {
      container.querySelectorAll('.quiz-option').forEach(btn => {
        btn.addEventListener('click', () => handleMCAnswer(btn, q));
      });
    } else if (q.type === Q_TF) {
      container.querySelectorAll('.quiz-option').forEach(btn => {
        btn.addEventListener('click', () => {
          const selected = btn.dataset.idx === '0'; // True = idx 0
          const correct  = q.correct === true;
          handleTFAnswer(btn, selected === correct, q.explanation);
        });
      });
    } else if (q.type === Q_FILL) {
      const checkBtn = document.getElementById(`${opts.containerId}-check`);
      const fillInput = document.getElementById(`${opts.containerId}-fill`);
      if (checkBtn) checkBtn.addEventListener('click', () => handleFillAnswer(fillInput, q));
      if (fillInput) fillInput.addEventListener('keydown', e => { if (e.key === 'Enter') handleFillAnswer(fillInput, q); });
    } else if (q.type === Q_SHORT) {
      const selfBtn = document.getElementById(`${opts.containerId}-self-mark`);
      if (selfBtn) selfBtn.addEventListener('click', () => { score++; addXP(XP_QUIZ_Q); nextQuestion(); });
    }
  }

  function handleMCAnswer(btn, q) {
    if (answered) return;
    answered = true;
    const idx = parseInt(btn.dataset.idx, 10);
    const correct = idx === q.correct;
    showFeedback(correct, q.explanation);
    if (correct) { btn.classList.add('correct'); score++; addXP(XP_QUIZ_Q); }
    else { btn.classList.add('wrong'); container.querySelector(`[data-idx="${q.correct}"]`)?.classList.add('correct'); }
    container.querySelectorAll('.quiz-option').forEach(b => b.disabled = true);
    setTimeout(nextQuestion, 2000);
  }

  function handleTFAnswer(btn, correct, explanation) {
    if (answered) return;
    answered = true;
    showFeedback(correct, explanation);
    if (correct) { btn.classList.add('correct'); score++; addXP(XP_QUIZ_Q); }
    else          { btn.classList.add('wrong'); }
    container.querySelectorAll('.quiz-option').forEach(b => b.disabled = true);
    setTimeout(nextQuestion, 2000);
  }

  function handleFillAnswer(input, q) {
    if (answered) return;
    answered = true;
    const val = input.value.trim().toLowerCase();
    const correct = val === q.answer.toLowerCase();
    showFeedback(correct, q.explanation);
    input.className = 'fill-blank-input ' + (correct ? 'correct' : 'wrong');
    input.readOnly = true;
    if (correct) { score++; addXP(XP_QUIZ_Q); }
    setTimeout(nextQuestion, 2200);
  }

  function showFeedback(correct, explanation) {
    const fb = document.getElementById(`${opts.containerId}-feedback`);
    if (!fb) return;
    fb.className = 'quiz-feedback ' + (correct ? 'correct' : 'wrong');
    fb.textContent = (correct ? '✅ Correct! ' : '❌ Not quite. ') + explanation;
  }

  function nextQuestion() {
    currentQ++;
    if (currentQ >= questions.length) showResult();
    else renderQ();
  }

  function showResult() {
    const pct = Math.round((score / questions.length) * 100);
    container.innerHTML = `
      <div class="quiz-widget" style="text-align:center">
        <img src="assets/sarpanch/${pct >= 60 ? 'happy' : 'sad'}.svg" style="width:100px;margin:0 auto var(--sp-4)" alt="Sarpanch"/>
        <h3 style="color:var(--text);margin-bottom:var(--sp-2)">${pct >= 80 ? '🎉 Excellent!' : pct >= 60 ? '👍 Good job!' : '💪 Keep going!'}</h3>
        <p>You got <strong>${score} out of ${questions.length}</strong> correct (${pct}%)</p>
        <div class="xp-display" style="margin: var(--sp-4) auto; display:inline-flex">+${score * XP_QUIZ_Q} XP earned! ⚡</div>
        <div style="margin-top:var(--sp-5)">
          <button class="btn btn-outline btn-sm" onclick="location.reload()">Try Again ↺</button>
        </div>
      </div>
    `;
    // Update module progress — only promote status if score qualifies
    if (opts.moduleId) {
      const newStatus = pct >= 80 ? 'completed' : pct >= 60 ? 'unlocked' : undefined;
      setModuleProgress(opts.moduleId, { quizScore: pct, ...(newStatus ? { status: newStatus } : {}) });
    }
    if (pct === 100 && opts.moduleId) awardBadge('perfect_score');
  }

  renderQ();
}
