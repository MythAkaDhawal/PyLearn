/* ===================================================
   PyLearn — playground.js
   Pyodide-powered in-browser Python runner
   =================================================== */

"use strict";

let pyodide = null;
let pyodideLoading = false;
let pyodideLoaded  = false;

// ─── Load Pyodide ─────────────────────────────────────
async function loadPyodideRuntime() {
  if (pyodideLoaded)  return pyodide;
  if (pyodideLoading) {
    // Wait for existing load
    return new Promise(resolve => {
      const check = setInterval(() => {
        if (pyodideLoaded) { clearInterval(check); resolve(pyodide); }
      }, 200);
    });
  }

  pyodideLoading = true;
  try {
    pyodide = await loadPyodide({
      indexURL: 'https://cdn.jsdelivr.net/pyodide/v0.25.0/full/'
    });
    // Redirect stdout/stderr
    pyodide.runPython(`
import sys, io
class _Capture(io.StringIO):
    pass
sys.stdout = _Capture()
sys.stderr = _Capture()
`);
    pyodideLoaded = true;
    pyodideLoading = false;
    return pyodide;
  } catch (e) {
    pyodideLoading = false;
    throw e;
  }
}

// ─── Run Code ─────────────────────────────────────────
async function runPython(code) {
  const py = await loadPyodideRuntime();

  // Reset stdout/stderr
  py.runPython(`
sys.stdout.seek(0); sys.stdout.truncate(0)
sys.stderr.seek(0); sys.stderr.truncate(0)
`);

  let output = '';
  let error  = '';
  let success = true;

  try {
    py.runPython(code);
    output = py.runPython("sys.stdout.getvalue()");
    const errOut = py.runPython("sys.stderr.getvalue()");
    if (errOut.trim()) { error = errOut; success = false; }
  } catch (e) {
    error   = e.message || String(e);
    success = false;
  }

  return { output, error, success };
}

// ─── Playground Widget ─────────────────────────────────
function initPlayground(opts) {
  /* opts = {
    containerId: 'playground-1',
    defaultCode: 'print("Hello!")',
    onSuccess: (output) => {},   // optional
    onError:   (error)  => {},   // optional
  } */

  const container  = document.getElementById(opts.containerId);
  if (!container) return;

  const initialCode = (opts.defaultCode || 'print("Hello, Sarpanch! 🐍")').trim();

  container.innerHTML = `
    <div class="playground">
      <div class="playground-header">
        <div class="playground-dots">
          <span></span><span></span><span></span>
        </div>
        <div class="playground-title">
          <span class="py-badge">Python</span>
          Live Playground — Edit &amp; Run!
        </div>
        <div class="playground-status">
          <div class="status-dot" id="${opts.containerId}-dot"></div>
          <span id="${opts.containerId}-status-text">Ready</span>
        </div>
      </div>

      <div class="playground-editor-wrap">
        <div class="editor-line-nums" id="${opts.containerId}-lines">1</div>
        <textarea
          class="playground-editor"
          id="${opts.containerId}-editor"
          spellcheck="false"
          autocorrect="off"
          autocapitalize="off"
          aria-label="Python code editor"
        >${initialCode}</textarea>
      </div>

      <div class="playground-toolbar">
        <button class="run-btn" id="${opts.containerId}-run">
          <span class="run-icon">▶</span> Run
        </button>
        <button class="reset-btn" id="${opts.containerId}-reset">
          ↺ Reset
        </button>
      </div>

      <div class="playground-output">
        <div class="output-label">Output</div>
        <div class="output-content empty" id="${opts.containerId}-output">
          Press Run to see output here...
        </div>
        <div class="playground-loading hidden" id="${opts.containerId}-loading">
          <div class="loading-spinner"></div>
          <div class="loading-text">Loading Python... (first run takes ~5s)</div>
        </div>
      </div>

      <div class="playground-reaction hidden" id="${opts.containerId}-reaction">
        <img src="assets/sarpanch/happy.svg" alt="Sarpanch" id="${opts.containerId}-reaction-img"/>
        <div class="reaction-msg" id="${opts.containerId}-reaction-msg">Great job! 🎉</div>
      </div>
    </div>
  `;

  const editor    = document.getElementById(`${opts.containerId}-editor`);
  const runBtn    = document.getElementById(`${opts.containerId}-run`);
  const resetBtn  = document.getElementById(`${opts.containerId}-reset`);
  const outputEl  = document.getElementById(`${opts.containerId}-output`);
  const loadingEl = document.getElementById(`${opts.containerId}-loading`);
  const dot       = document.getElementById(`${opts.containerId}-dot`);
  const statusTxt = document.getElementById(`${opts.containerId}-status-text`);
  const lineNums  = document.getElementById(`${opts.containerId}-lines`);
  const reaction  = document.getElementById(`${opts.containerId}-reaction`);
  const reactImg  = document.getElementById(`${opts.containerId}-reaction-img`);
  const reactMsg  = document.getElementById(`${opts.containerId}-reaction-msg`);

  // Line numbers
  function updateLineNumbers() {
    const lines = editor.value.split('\n').length;
    lineNums.textContent = Array.from({length: lines}, (_, i) => i + 1).join('\n');
  }
  editor.addEventListener('input', updateLineNumbers);
  updateLineNumbers();

  // Tab key
  editor.addEventListener('keydown', (e) => {
    if (e.key === 'Tab') {
      e.preventDefault();
      const start = editor.selectionStart;
      const end   = editor.selectionEnd;
      editor.value = editor.value.substring(0, start) + '    ' + editor.value.substring(end);
      editor.selectionStart = editor.selectionEnd = start + 4;
      updateLineNumbers();
    }
  });

  // Reset
  resetBtn.addEventListener('click', () => {
    editor.value = initialCode;
    updateLineNumbers();
    outputEl.textContent = 'Press Run to see output here...';
    outputEl.className = 'output-content empty';
    reaction.classList.add('hidden');
  });

  // Run
  runBtn.addEventListener('click', async () => {
    runBtn.disabled = true;
    loadingEl.classList.remove('hidden');
    outputEl.classList.add('hidden');
    reaction.classList.add('hidden');
    dot.className = 'status-dot loading';
    statusTxt.textContent = 'Running...';

    try {
      const result = await runPython(editor.value);

      loadingEl.classList.add('hidden');
      outputEl.classList.remove('hidden');

      if (result.success) {
        outputEl.textContent = result.output || '(no output)';
        outputEl.className = 'output-content';
        dot.className = 'status-dot';
        statusTxt.textContent = 'Done ✓';

        // Sarpanch happy reaction
        reaction.classList.remove('hidden');
        reactImg.src = 'assets/sarpanch/happy.svg';
        reactMsg.textContent = 'Nailed it! 🎉 ' + getHappyMessage();

        // Award Hello World badge on first run
        if (!localStorage.getItem('pylearn_first_run')) {
          localStorage.setItem('pylearn_first_run', '1');
          awardBadge('hello_world');
          addXP(XP_LESSON);
        }

        if (opts.onSuccess) opts.onSuccess(result.output);

      } else {
        outputEl.textContent = '❌ Error:\n' + result.error;
        outputEl.className = 'output-content error';
        dot.className = 'status-dot error';
        statusTxt.textContent = 'Error';

        // Sarpanch confused reaction
        reaction.classList.remove('hidden');
        reactImg.src = 'assets/sarpanch/sad.svg';
        reactMsg.textContent = 'Oof! ' + getErrorHint(result.error);

        if (opts.onError) opts.onError(result.error);
      }
    } catch (e) {
      loadingEl.classList.add('hidden');
      outputEl.classList.remove('hidden');
      outputEl.textContent = '❌ Could not load Python runtime.\nCheck your internet connection and try again.';
      outputEl.className = 'output-content error';
      dot.className = 'status-dot error';
      statusTxt.textContent = 'Error';
    }

    runBtn.disabled = false;
  });

  // Preload Pyodide in background
  setTimeout(() => { loadPyodideRuntime().catch(() => {}); }, 1000);
}

function getHappyMessage() {
  const msgs = [
    'Look at you go! 🚀', 'Sarpanch is proud! 🐍', 'Pure Python magic! ✨',
    'That\'s the way! Keep going!', 'You\'re basically a developer now! 😎',
    'Outstanding! 🎊', 'Gold star! ⭐'
  ];
  return msgs[Math.floor(Math.random() * msgs.length)];
}

function getErrorHint(error) {
  if (error.includes('SyntaxError'))   return 'Check your syntax. Even Sarpanch misses a colon sometimes. 🤦';
  if (error.includes('NameError'))     return 'Variable not defined. Did you spell it right?';
  if (error.includes('IndentationError')) return 'Indentation problem! Python cares about spaces. A lot.';
  if (error.includes('TypeError'))     return 'Wrong type! Like trying to add "5" + 5. Pick a side.';
  if (error.includes('ZeroDivisionError')) return 'Can\'t divide by zero. Even Sarpanch knows that. 😅';
  if (error.includes('IndexError'))    return 'Index out of range. Your list isn\'t that long!';
  if (error.includes('KeyError'))      return 'That key doesn\'t exist in the dictionary. Check your spelling!';
  return 'Read the error message carefully — Python is actually trying to help.';
}
