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
];

// Modules 6-12 — shorter sets for now
const MODULE_6_QUIZ = [
  {
    type: Q_MC,
    question: 'What keyword is used to define a function in Python?',
    options: ['function', 'func', 'def', 'define'],
    correct: 2,
    explanation: 'def is short for "define". You write def function_name(): and then the code block below it.'
  },
  {
    type: Q_TF,
    question: 'A function runs as soon as you define it.',
    correct: false,
    explanation: 'False! Defining a function (def ...) just creates it. It only runs when you call it by writing function_name().'
  },
];

const MODULE_7_QUIZ = [
  {
    type: Q_MC,
    question: 'Which keyword imports a module in Python?',
    options: ['require', 'include', 'import', 'use'],
    correct: 2,
    explanation: 'import is the keyword. For example: import math gives you access to all the functions in the math module.'
  },
];

const MODULE_8_QUIZ = [
  {
    type: Q_MC,
    question: 'Which keywords are used to handle errors in Python?',
    options: ['try/catch', 'try/except', 'error/handle', 'catch/fix'],
    correct: 1,
    explanation: 'Python uses try/except (not try/catch like JavaScript or Java). You "try" the risky code, and "except" runs if something goes wrong.'
  },
];

const MODULE_9_QUIZ = [
  {
    type: Q_MC,
    question: 'Which function is used to open a file in Python?',
    options: ['read()', 'file()', 'open()', 'load()'],
    correct: 2,
    explanation: 'open() opens a file. You then use .read() to read it. Use the with statement to automatically close the file when done.'
  },
];

const MODULE_10_QUIZ = [
  {
    type: Q_MC,
    question: 'What is a "class" in Python?',
    options: ['A school class', 'A blueprint for creating objects', 'A list of functions', 'A type of loop'],
    correct: 1,
    explanation: 'A class is a blueprint. It defines what properties and methods an object will have. Like a blueprint of a house — the blueprint itself isn\'t a house, but it describes every house built from it.'
  },
];

const MODULE_11_QUIZ = [
  {
    type: Q_MC,
    question: 'Which command installs a Python library from the internet?',
    options: ['python install', 'pip install', 'get package', 'download lib'],
    correct: 1,
    explanation: 'pip install library-name downloads and installs libraries. pip is Python\'s package manager. It\'s your access to 450,000+ free tools.'
  },
];

const MODULE_12_QUIZ = [
  {
    type: Q_SHORT,
    question: 'In your own words, what is a function and why is it useful?',
    sampleAnswer: 'A function is a reusable block of code that does a specific task. It\'s useful because you define it once and can call it many times, avoiding code repetition.',
    explanation: 'Functions are the backbone of organised code. DRY = Don\'t Repeat Yourself. Functions help you follow that rule.'
  },
];

// ─── Quiz Map ─────────────────────────────────────────
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

    const codeBlock = q.code ? `
      <div class="code-block" style="margin-bottom:var(--sp-4)">
        <pre>${q.code}</pre>
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
    // Update module progress
    if (opts.moduleId) setModuleProgress(opts.moduleId, { quizScore: pct, status: pct > 0 ? 'unlocked' : 'locked' });
    if (pct === 100 && opts.moduleId) awardBadge('perfect_score');
  }

  renderQ();
}
