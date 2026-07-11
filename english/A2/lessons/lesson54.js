let current = 0;
let xp = 0;
let recognition = null;
let isRecording = false;

// ===== تابع پخش صدا =====
function speak(text) {
  if (!window.speechSynthesis) return;
  const utter = new SpeechSynthesisUtterance(text);
  utter.lang = "en-US";
  utter.rate = 0.9;
  speechSynthesis.cancel();
  speechSynthesis.speak(utter);
}

// ===== تابع ضبط صدا =====
function startRecording(targetWord) {
  if (!('webkitSpeechRecognition' in window) && !('SpeechRecognition' in window)) {
    alert("مرورگر شما از ضبط صدا پشتیبانی نمی‌کند. لطفاً از Chrome استفاده کنید.");
    return;
  }

  const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
  recognition = new SpeechRecognition();
  recognition.lang = 'en-US';
  recognition.continuous = false;
  recognition.interimResults = false;

  const recordBtn = document.getElementById('record-btn');
  const statusText = document.getElementById('record-status');

  if (isRecording) {
    recognition.stop();
    isRecording = false;
    if (recordBtn) recordBtn.textContent = '🎤 ضبط';
    if (statusText) statusText.textContent = 'برای شروع ضبط کلیک کن';
    return;
  }

  isRecording = true;
  if (recordBtn) recordBtn.textContent = '⏹️ توقف';
  if (statusText) statusText.textContent = 'در حال گوش دادن...';

  recognition.onresult = function(event) {
    const transcript = event.results[0][0].transcript.trim().toLowerCase();
    if (statusText) statusText.textContent = '🗣️: ' + transcript;

    if (transcript === targetWord.toLowerCase()) {
      if (statusText) statusText.textContent = '✅ عالی! درست گفتی! 🎉';
      if (recordBtn) recordBtn.textContent = '✅';
      
      xp += 5;
      if (typeof addXP === 'function') {
        addXP(5);
      }
      
      setTimeout(() => {
        current++;
        showQuestion();
      }, 1000);
    } else {
      if (statusText) statusText.textContent = '❌ اشتباه! دوباره تلاش کن. کلمه: ' + targetWord;
      if (typeof loseHeart === 'function') {
        loseHeart();
      }
      const heartElement = document.getElementById('heart-count');
      if (heartElement && typeof getHearts === 'function') {
        heartElement.textContent = getHearts();
      }
    }
    isRecording = false;
    if (recordBtn) recordBtn.textContent = '🎤 ضبط';
  };

  recognition.onerror = function(event) {
    if (statusText) statusText.textContent = '❌ خطا: ' + event.error;
    isRecording = false;
    if (recordBtn) recordBtn.textContent = '🎤 ضبط';
  };

  recognition.onend = function() {
    isRecording = false;
    if (recordBtn) recordBtn.textContent = '🎤 ضبط';
  };

  recognition.start();
}

// ===== تابع رد کردن بخش صدا =====
function skipSpeak() {
  current++;
  showQuestion();
}

// ===== بررسی قلب در شروع =====
window.onload = function() {
  if (typeof checkAndRegenHearts === 'function') {
    checkAndRegenHearts();
  }

  if (typeof getHearts === 'function') {
    const currentHearts = getHearts();
    const heartElement = document.getElementById('heart-count');
    if (heartElement) {
      heartElement.textContent = currentHearts;
    }

    if (currentHearts <= 0) {
      alert('قلب شما تمام شده است! لطفاً منتظر بمانید یا قلب تهیه کنید.');
      window.location.href = '../../../home.html';
    }
  }
};

// ===== سوالات درس ۵۴ =====
const questions = [

  // ===== بخش ۱: IMAGE (۵ تا) =====
  {
    type: 'image',
    question: 'harbor کدام است؟',
    speak: 'harbor',
    options: [
      { text: 'port', image: '../../../media/a2/travel/port.png' },
      { text: 'harbor', image: '../../../media/a2/travel/harbor.png' },
      { text: 'terminal', image: '../../../media/a2/travel/terminal.png' },
      { text: 'gate', image: '../../../media/a2/travel/gate.png' }
    ],
    answer: 'harbor'
  },
  {
    type: 'image',
    question: 'port کدام است؟',
    speak: 'port',
    options: [
      { text: 'harbor', image: '../../../media/a2/travel/harbor.png' },
      { text: 'port', image: '../../../media/a2/travel/port.png' },
      { text: 'crew', image: '../../../media/a2/travel/crew.png' },
      { text: 'terminal', image: '../../../media/a2/travel/terminal.png' }
    ],
    answer: 'port'
  },
  {
    type: 'image',
    question: 'terminal کدام است؟',
    speak: 'terminal',
    options: [
      { text: 'gate', image: '../../../media/a2/travel/gate.png' },
      { text: 'harbor', image: '../../../media/a2/travel/harbor.png' },
      { text: 'terminal', image: '../../../media/a2/travel/terminal.png' },
      { text: 'port', image: '../../../media/a2/travel/port.png' }
    ],
    answer: 'terminal'
  },
  {
    type: 'image',
    question: 'gate کدام است؟',
    speak: 'gate',
    options: [
      { text: 'gate', image: '../../../media/a2/travel/gate.png' },
      { text: 'crew', image: '../../../media/a2/travel/crew.png' },
      { text: 'port', image: '../../../media/a2/travel/port.png' },
      { text: 'harbor', image: '../../../media/a2/travel/harbor.png' }
    ],
    answer: 'gate'
  },
  {
    type: 'image',
    question: 'crew کدام است؟',
    speak: 'crew',
    options: [
      { text: 'terminal', image: '../../../media/a2/travel/terminal.png' },
      { text: 'crew', image: '../../../media/a2/travel/crew.png' },
      { text: 'gate', image: '../../../media/a2/travel/gate.png' },
      { text: 'port', image: '../../../media/a2/travel/port.png' }
    ],
    answer: 'crew'
  },

  // ===== بخش ۲: WORD (۵ تا) =====
  {
    type: 'word',
    question: 'این تصویر چیست؟',
    image: '../../../media/a2/travel/harbor.png',
    options: ['port', 'harbor', 'terminal', 'gate'],
    answer: 'harbor'
  },
  {
    type: 'word',
    question: 'این تصویر چیست؟',
    image: '../../../media/a2/travel/port.png',
    options: ['harbor', 'port', 'crew', 'terminal'],
    answer: 'port'
  },
  {
    type: 'word',
    question: 'این تصویر چیست؟',
    image: '../../../media/a2/travel/terminal.png',
    options: ['gate', 'harbor', 'terminal', 'port'],
    answer: 'terminal'
  },
  {
    type: 'word',
    question: 'این تصویر چیست؟',
    image: '../../../media/a2/travel/gate.png',
    options: ['gate', 'crew', 'port', 'harbor'],
    answer: 'gate'
  },
  {
    type: 'word',
    question: 'این تصویر چیست؟',
    image: '../../../media/a2/travel/crew.png',
    options: ['terminal', 'crew', 'gate', 'port'],
    answer: 'crew'
  },

  // ===== بخش ۳: AUDIO (۵ تا) =====
  {
    type: 'audio',
    speak: 'harbor',
    question: 'کدام کلمه را شنیدی؟',
    options: ['port', 'harbor', 'terminal', 'gate'],
    answer: 'harbor'
  },
  {
    type: 'audio',
    speak: 'port',
    question: 'کدام کلمه را شنیدی؟',
    options: ['harbor', 'port', 'crew', 'terminal'],
    answer: 'port'
  },
  {
    type: 'audio',
    speak: 'terminal',
    question: 'کدام کلمه را شنیدی؟',
    options: ['gate', 'harbor', 'terminal', 'port'],
    answer: 'terminal'
  },
  {
    type: 'audio',
    speak: 'gate',
    question: 'کدام کلمه را شنیدی؟',
    options: ['gate', 'crew', 'port', 'harbor'],
    answer: 'gate'
  },
  {
    type: 'audio',
    speak: 'crew',
    question: 'کدام کلمه را شنیدی؟',
    options: ['terminal', 'crew', 'gate', 'port'],
    answer: 'crew'
  },

  // ===== بخش ۴: SPEAK (۵ تا) =====
  {
    type: 'speak',
    word: 'harbor',
    image: '../../../media/a2/travel/harbor.png',
    meaning: 'بندرگاه'
  },
  {
    type: 'speak',
    word: 'port',
    image: '../../../media/a2/travel/port.png',
    meaning: 'بندر'
  },
  {
    type: 'speak',
    word: 'terminal',
    image: '../../../media/a2/travel/terminal.png',
    meaning: 'ترمینال'
  },
  {
    type: 'speak',
    word: 'gate',
    image: '../../../media/a2/travel/gate.png',
    meaning: 'دروازه / گیت'
  },
  {
    type: 'speak',
    word: 'crew',
    image: '../../../media/a2/travel/crew.png',
    meaning: 'خدمه'
  },

  // ===== بخش ۵: BUILD EN (۵ تا) =====
  {
    type: 'build-en',
    speak: 'The ship is in the harbor',
    question: 'جمله انگلیسی را بساز:',
    text: 'کشتی در بندرگاه است',
    words: ['harbor', 'the', 'in', 'is', 'ship', 'The'],
    answer: ['The', 'ship', 'is', 'in', 'the', 'harbor']
  },
  {
    type: 'build-en',
    speak: 'The ship is at the port',
    question: 'جمله انگلیسی را بساز:',
    text: 'کشتی در بندر است',
    words: ['port', 'the', 'at', 'is', 'ship', 'The'],
    answer: ['The', 'ship', 'is', 'at', 'the', 'port']
  },
  {
    type: 'build-en',
    speak: 'I go to the terminal',
    question: 'جمله انگلیسی را بساز:',
    text: 'من به ترمینال می‌روم',
    words: ['terminal', 'the', 'to', 'go', 'I'],
    answer: ['I', 'go', 'to', 'the', 'terminal']
  },
  {
    type: 'build-en',
    speak: 'I go to the gate',
    question: 'جمله انگلیسی را بساز:',
    text: 'من به گیت می‌روم',
    words: ['gate', 'the', 'to', 'go', 'I'],
    answer: ['I', 'go', 'to', 'the', 'gate']
  },
  {
    type: 'build-en',
    speak: 'The crew is here',
    question: 'جمله انگلیسی را بساز:',
    text: 'خدمه اینجا هستند',
    words: ['here', 'is', 'crew', 'The'],
    answer: ['The', 'crew', 'is', 'here']
  },

  // ===== بخش ۶: BUILD FA (۵ تا) =====
  {
    type: 'build-fa',
    speak: 'The ship is in the harbor',
    question: 'ترجمه را بساز:',
    text: 'The ship is in the harbor',
    words: ['است', 'بندرگاه', 'در', 'کشتی'],
    answer: ['کشتی', 'در', 'بندرگاه', 'است']
  },
  {
    type: 'build-fa',
    speak: 'The ship is at the port',
    question: 'ترجمه را بساز:',
    text: 'The ship is at the port',
    words: ['است', 'بندر', 'در', 'کشتی'],
    answer: ['کشتی', 'در', 'بندر', 'است']
  },
  {
    type: 'build-fa',
    speak: 'I go to the terminal',
    question: 'ترجمه را بساز:',
    text: 'I go to the terminal',
    words: ['می‌روم', 'ترمینال', 'به', 'من'],
    answer: ['من', 'به', 'ترمینال', 'می‌روم']
  },
  {
    type: 'build-fa',
    speak: 'I go to the gate',
    question: 'ترجمه را بساز:',
    text: 'I go to the gate',
    words: ['می‌روم', 'گیت', 'به', 'من'],
    answer: ['من', 'به', 'گیت', 'می‌روم']
  },
  {
    type: 'build-fa',
    speak: 'The crew is here',
    question: 'ترجمه را بساز:',
    text: 'The crew is here',
    words: ['هستند', 'اینجا', 'خدمه'],
    answer: ['خدمه', 'اینجا', 'هستند']
  }
];

// ===== نمایش سوال =====
function showQuestion() {
  if (current >= questions.length) {
    const finalXP = typeof getTotalXP === 'function' ? getTotalXP() : xp;
    document.getElementById('app').innerHTML = `
      <h2>درس تمام شد 🎉</h2>
      <p>XP دریافت‌شده: <b>${finalXP}</b></p>
      <a href="../index.html">بازگشت</a>
    `;
    return;
  }

  const q = questions[current];
  const title = document.getElementById('question-title');
  const content = document.getElementById('question-content');
  const optionsBox = document.getElementById('options');
  const wordBuilder = document.getElementById('word-builder');

  title.innerText = '';
  content.innerHTML = '';
  optionsBox.innerHTML = '';
  wordBuilder.innerHTML = '';
  wordBuilder.classList.add('hidden');

  // ===== بخش SPEAK =====
  if (q.type === 'speak') {
    title.innerText = '🗣️ کلمه را بگو';
    content.innerHTML = `
      <div class="speak-card">
        <img src="${q.image}" alt="${q.word}">
        <div class="word-big">${q.word}</div>
        <div class="word-meaning">${q.meaning}</div>
        <button class="audio-btn" onclick="speak('${q.word}')">🔊 تکرار</button>
        <div class="record-area">
          <button id="record-btn" class="record-btn" onclick="startRecording('${q.word}')">🎤 ضبط</button>
          <div id="record-status" class="record-status">برای شروع ضبط کلیک کن</div>
        </div>
        <div class="skip-area">
          <button class="skip-btn" onclick="skipSpeak()">⏭️ رد کردن (بدون امتیاز)</button>
        </div>
      </div>
    `;
    return;
  }

  // ===== بخش IMAGE =====
  if (q.type === 'image') {
    title.innerText = q.question;
    content.innerHTML = `
      <button class="audio-btn repeat-btn" onclick="speak('${q.speak}')">🔊 تکرار صدا</button>
    `;
    if (q.speak) {
      setTimeout(() => speak(q.speak), 200);
    }
    optionsBox.classList.add('image-grid');
    shuffleArray(q.options).forEach(opt => {
      let btn = document.createElement('button');
      btn.className = 'option image-option';
      btn.innerHTML = `<img src="${opt.image}" alt="${opt.text}">`;
      btn.onclick = () => select(opt.text);
      optionsBox.appendChild(btn);
    });
    return;
  }

  // ===== بخش WORD =====
  if (q.type === 'word') {
    title.innerText = q.question;
    content.innerHTML = `<img src="${q.image}">`;
    shuffleArray(q.options).forEach(opt => {
      let b = document.createElement('button');
      b.className = 'option';
      b.innerText = opt;
      b.onclick = () => select(opt);
      optionsBox.appendChild(b);
    });
    return;
  }

  // ===== بخش AUDIO =====
  if (q.type === 'audio') {
    title.innerText = q.question;
    content.innerHTML = `
      <button class="audio-btn" onclick="speak('${q.speak}')">🔊 تکرار</button>
    `;
    if (q.speak) {
      setTimeout(() => speak(q.speak), 200);
    }
    shuffleArray(q.options).forEach(opt => {
      let b = document.createElement('button');
      b.className = 'option';
      b.innerText = opt;
      b.onclick = () => select(opt);
      optionsBox.appendChild(b);
    });
    return;
  }

  // ===== بخش BUILD EN / FA =====
  if (q.type === 'build-en' || q.type === 'build-fa') {
    title.innerText = q.question;
    content.innerHTML = `
      <p style="margin-bottom:10px;">${q.text}</p>
      <button class="audio-btn" onclick="speak('${q.speak}')">🔊 تکرار جمله</button>
    `;
    if (q.speak) {
      setTimeout(() => speak(q.speak), 200);
    }
    
    wordBuilder.innerHTML = '';
    optionsBox.innerHTML = '';
    wordBuilder.classList.remove('hidden');
    wordBuilder.classList.remove('ltr', 'rtl');
    optionsBox.classList.remove('ltr', 'rtl');

    if (q.type === 'build-en') {
      wordBuilder.classList.add('ltr');
      optionsBox.classList.add('ltr');
    } else {
      wordBuilder.classList.add('rtl');
      optionsBox.classList.add('rtl');
    }

    shuffleArray(q.words).forEach(w => {
      const tile = document.createElement('span');
      tile.className = 'tile';
      tile.innerText = w;
      tile.dataset.word = w;

      tile.onclick = () => {
        if (tile.parentNode === optionsBox) {
          wordBuilder.appendChild(tile);
        } else if (tile.parentNode === wordBuilder) {
          optionsBox.appendChild(tile);
        }
        const userWords = [...wordBuilder.children].map(el => el.dataset.word);
        if (userWords.length === q.answer.length) {
          checkBuild(userWords, q.answer);
        }
      };
      optionsBox.appendChild(tile);
    });
    return;
  }
}

// ===== توابع کمکی =====
function nextQuestion() {
  current++;
  showQuestion();
}

async function select(ans) {
  const correct = questions[current].answer;
  if (String(ans).trim().toLowerCase() === String(correct).trim().toLowerCase()) {
    xp += 5;
    if (typeof addXP === 'function') {
      await addXP(5);
    }
    current++;
    showQuestion();
  } else {
    alert('اشتباه بود! دوباره تلاش کن.');
    if (typeof loseHeart === 'function') {
      await loseHeart();
    }
    if (typeof checkAndRegenHearts === 'function') {
      checkAndRegenHearts();
    }
    const heartElement = document.getElementById('heart-count');
    if (heartElement && typeof getHearts === 'function') {
      heartElement.textContent = getHearts();
    }
    if (typeof getHearts === 'function' && getHearts() <= 0) {
      document.getElementById('app').innerHTML = `
        <h2>قلب شما تمام شد 💔</h2>
        <p>برای ادامه باید صبر کنید تا قلب‌ها برگردند.</p>
        <a href="../index.html">بازگشت</a>
      `;
      return;
    }
  }
}

async function checkBuild(selected, correct) {
  const s = selected.map(w => w.trim().toLowerCase());
  const c = correct.map(w => w.trim().toLowerCase());

  if (JSON.stringify(s) === JSON.stringify(c)) {
    xp += 5;
    if (typeof addXP === 'function') {
      await addXP(5);
    }
    current++;
    showQuestion();
  } else {
    alert('اشتباه بود! دوباره تلاش کن.');
    if (typeof loseHeart === 'function') {
      await loseHeart();
    }
    if (typeof checkAndRegenHearts === 'function') {
      checkAndRegenHearts();
    }
    const heartElement = document.getElementById('heart-count');
    if (heartElement && typeof getHearts === 'function') {
      heartElement.textContent = getHearts();
    }
    if (typeof getHearts === 'function' && getHearts() <= 0) {
      document.getElementById('app').innerHTML = `
        <h2>قلب شما تمام شد 💔</h2>
        <p>برای ادامه باید صبر کنید تا قلب‌ها برگردند.</p>
        <a href="../index.html">بازگشت</a>
      `;
      return;
    }
  }
}

function removeLastBuilderItem() {
  const wordBuilder = document.getElementById('word-builder');
  const optionsBox = document.getElementById('options');
  if (!wordBuilder || !optionsBox) return;
  if (wordBuilder.children.length === 0) return;
  const lastItem = wordBuilder.lastElementChild;
  if (lastItem) {
    optionsBox.prepend(lastItem);
  }
}

document.addEventListener('keydown', function (e) {
  const wordBuilder = document.getElementById('word-builder');
  if (!wordBuilder) return;
  if (e.key === 'Backspace') {
    e.preventDefault();
    removeLastBuilderItem();
  }
});

function shuffleArray(arr) {
  let array = [...arr];
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

showQuestion();