let current = 0;
let xp = 0;
let recognition = null;
let isRecording = false;

// ===== تابع پخش صدا =====
function speak(text) {
  if (!window.speechSynthesis) return;
  const utter = new SpeechSynthesisUtterance(text);
  utter.lang = "fr-FR";
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
  recognition.lang = 'fr-FR';
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
    const transcript = event.results[0][0].transcript.trim();
    if (statusText) statusText.textContent = '🗣️: ' + transcript;

    if (transcript === targetWord) {
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

// ===== سوالات درس ۵۰ - فرانسوی به فارسی =====
const questions = [

  // ===== بخش ۱: IMAGE (۵ تا) =====
  {
    type: 'image',
    question: 'کدام تصویر برای "la dissertation" است؟',
    speak: 'la dissertation',
    options: [
      { text: 'la dissertation', image: '../../../media/a2/school/essay.png' },
      { text: 'la thèse', image: '../../../media/a2/school/thesis.png' },
      { text: 'le rapport', image: '../../../media/a2/school/report.png' },
      { text: 'le projet', image: '../../../media/a2/school/project.png' }
    ],
    answer: 'la dissertation'
  },
  {
    type: 'image',
    question: 'کدام تصویر برای "la thèse" است؟',
    speak: 'la thèse',
    options: [
      { text: 'la dissertation', image: '../../../media/a2/school/essay.png' },
      { text: 'la thèse', image: '../../../media/a2/school/thesis.png' },
      { text: 'l\'atelier', image: '../../../media/a2/school/workshop.png' },
      { text: 'le rapport', image: '../../../media/a2/school/report.png' }
    ],
    answer: 'la thèse'
  },
  {
    type: 'image',
    question: 'کدام تصویر برای "le rapport" است؟',
    speak: 'le rapport',
    options: [
      { text: 'le projet', image: '../../../media/a2/school/project.png' },
      { text: 'la dissertation', image: '../../../media/a2/school/essay.png' },
      { text: 'le rapport', image: '../../../media/a2/school/report.png' },
      { text: 'la thèse', image: '../../../media/a2/school/thesis.png' }
    ],
    answer: 'le rapport'
  },
  {
    type: 'image',
    question: 'کدام تصویر برای "le projet" است؟',
    speak: 'le projet',
    options: [
      { text: 'la thèse', image: '../../../media/a2/school/thesis.png' },
      { text: 'le projet', image: '../../../media/a2/school/project.png' },
      { text: 'l\'atelier', image: '../../../media/a2/school/workshop.png' },
      { text: 'la dissertation', image: '../../../media/a2/school/essay.png' }
    ],
    answer: 'le projet'
  },
  {
    type: 'image',
    question: 'کدام تصویر برای "l\'atelier" است؟',
    speak: 'l\'atelier',
    options: [
      { text: 'la dissertation', image: '../../../media/a2/school/essay.png' },
      { text: 'le rapport', image: '../../../media/a2/school/report.png' },
      { text: 'l\'atelier', image: '../../../media/a2/school/workshop.png' },
      { text: 'le projet', image: '../../../media/a2/school/project.png' }
    ],
    answer: 'l\'atelier'
  },

  // ===== بخش ۲: WORD (۵ تا) =====
  {
    type: 'word',
    question: 'این تصویر چیست؟',
    image: '../../../media/a2/school/essay.png',
    options: ['la dissertation', 'la thèse', 'le rapport', 'le projet'],
    answer: 'la dissertation'
  },
  {
    type: 'word',
    question: 'این تصویر چیست؟',
    image: '../../../media/a2/school/thesis.png',
    options: ['la dissertation', 'la thèse', 'l\'atelier', 'le rapport'],
    answer: 'la thèse'
  },
  {
    type: 'word',
    question: 'این تصویر چیست؟',
    image: '../../../media/a2/school/report.png',
    options: ['le projet', 'la dissertation', 'le rapport', 'la thèse'],
    answer: 'le rapport'
  },
  {
    type: 'word',
    question: 'این تصویر چیست؟',
    image: '../../../media/a2/school/project.png',
    options: ['la thèse', 'le projet', 'l\'atelier', 'la dissertation'],
    answer: 'le projet'
  },
  {
    type: 'word',
    question: 'این تصویر چیست؟',
    image: '../../../media/a2/school/workshop.png',
    options: ['la dissertation', 'le rapport', 'l\'atelier', 'le projet'],
    answer: 'l\'atelier'
  },

  // ===== بخش ۳: AUDIO (۵ تا) =====
  {
    type: 'audio',
    speak: 'la dissertation',
    question: 'کدام کلمه را شنیدی؟',
    options: ['la dissertation', 'la thèse', 'le rapport', 'le projet'],
    answer: 'la dissertation'
  },
  {
    type: 'audio',
    speak: 'la thèse',
    question: 'کدام کلمه را شنیدی؟',
    options: ['la dissertation', 'la thèse', 'l\'atelier', 'le rapport'],
    answer: 'la thèse'
  },
  {
    type: 'audio',
    speak: 'le rapport',
    question: 'کدام کلمه را شنیدی؟',
    options: ['le projet', 'la dissertation', 'le rapport', 'la thèse'],
    answer: 'le rapport'
  },
  {
    type: 'audio',
    speak: 'le projet',
    question: 'کدام کلمه را شنیدی؟',
    options: ['la thèse', 'le projet', 'l\'atelier', 'la dissertation'],
    answer: 'le projet'
  },
  {
    type: 'audio',
    speak: 'l\'atelier',
    question: 'کدام کلمه را شنیدی؟',
    options: ['la dissertation', 'le rapport', 'l\'atelier', 'le projet'],
    answer: 'l\'atelier'
  },

  // ===== بخش ۴: SPEAK (۵ تا) =====
  {
    type: 'speak',
    word: 'la dissertation',
    image: '../../../media/a2/school/essay.png',
    meaning: 'مقاله'
  },
  {
    type: 'speak',
    word: 'la thèse',
    image: '../../../media/a2/school/thesis.png',
    meaning: 'پایان‌نامه'
  },
  {
    type: 'speak',
    word: 'le rapport',
    image: '../../../media/a2/school/report.png',
    meaning: 'گزارش'
  },
  {
    type: 'speak',
    word: 'le projet',
    image: '../../../media/a2/school/project.png',
    meaning: 'پروژه'
  },
  {
    type: 'speak',
    word: 'l\'atelier',
    image: '../../../media/a2/school/workshop.png',
    meaning: 'کارگاه'
  },

  // ===== بخش ۵: BUILD EN (ساخت جمله فرانسوی) =====
  {
    type: 'build-en',
    speak: 'J\'écris une dissertation',
    question: 'جمله فرانسوی را بساز:',
    text: 'من یک مقاله می‌نویسم',
    words: ['dissertation', 'une', 'écris', 'J\''],
    answer: ['J\'', 'écris', 'une', 'dissertation']
  },
  {
    type: 'build-en',
    speak: 'J\'écris une thèse',
    question: 'جمله فرانسوی را بساز:',
    text: 'من یک پایان‌نامه می‌نویسم',
    words: ['thèse', 'une', 'écris', 'J\''],
    answer: ['J\'', 'écris', 'une', 'thèse']
  },
  {
    type: 'build-en',
    speak: 'J\'écris un rapport',
    question: 'جمله فرانسوی را بساز:',
    text: 'من یک گزارش می‌نویسم',
    words: ['rapport', 'un', 'écris', 'J\''],
    answer: ['J\'', 'écris', 'un', 'rapport']
  },
  {
    type: 'build-en',
    speak: 'Je fais un projet',
    question: 'جمله فرانسوی را بساز:',
    text: 'من یک پروژه انجام می‌دهم',
    words: ['projet', 'un', 'fais', 'Je'],
    answer: ['Je', 'fais', 'un', 'projet']
  },
  {
    type: 'build-en',
    speak: 'Je vais à un atelier',
    question: 'جمله فرانسوی را بساز:',
    text: 'من به یک کارگاه می‌روم',
    words: ['atelier', 'un', 'à', 'vais', 'Je'],
    answer: ['Je', 'vais', 'à', 'un', 'atelier']
  },

  // ===== بخش ۶: BUILD FA (ترجمه به فارسی) =====
  {
    type: 'build-fa',
    speak: 'J\'écris une dissertation',
    question: 'ترجمه را بساز:',
    text: 'J\'écris une dissertation',
    words: ['می‌نویسم', 'مقاله', 'یک', 'من'],
    answer: ['من', 'یک', 'مقاله', 'می‌نویسم']
  },
  {
    type: 'build-fa',
    speak: 'J\'écris une thèse',
    question: 'ترجمه را بساز:',
    text: 'J\'écris une thèse',
    words: ['می‌نویسم', 'پایان‌نامه', 'یک', 'من'],
    answer: ['من', 'یک', 'پایان‌نامه', 'می‌نویسم']
  },
  {
    type: 'build-fa',
    speak: 'J\'écris un rapport',
    question: 'ترجمه را بساز:',
    text: 'J\'écris un rapport',
    words: ['می‌نویسم', 'گزارش', 'یک', 'من'],
    answer: ['من', 'یک', 'گزارش', 'می‌نویسم']
  },
  {
    type: 'build-fa',
    speak: 'Je fais un projet',
    question: 'ترجمه را بساز:',
    text: 'Je fais un projet',
    words: ['می‌کنم', 'پروژه', 'یک', 'انجام', 'من'],
    answer: ['من', 'یک', 'پروژه', 'انجام', 'می‌کنم']
  },
  {
    type: 'build-fa',
    speak: 'Je vais à un atelier',
    question: 'ترجمه را بساز:',
    text: 'Je vais à un atelier',
    words: ['می‌روم', 'کارگاه', 'یک', 'به', 'من'],
    answer: ['من', 'به', 'یک', 'کارگاه', 'می‌روم']
  }
];

// ===== نمایش سوال =====
function showQuestion() {
  if (current >= questions.length) {
    const finalXP = typeof getTotalXP === 'function' ? getTotalXP() : xp;
    document.getElementById('app').innerHTML = `
      <h2>🎉 درس تمام شد! 🎉</h2>
      <p>امتیاز دریافت‌شده: <b>${finalXP}</b></p>
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
  if (String(ans).trim() === String(correct).trim()) {
    xp += 5;
    if (typeof addXP === 'function') {
      await addXP(5);
    }
    current++;
    showQuestion();
  } else {
    alert('❌ اشتباه! دوباره تلاش کن.');
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
        <h2>💔 قلب شما تمام شد!</h2>
        <p>برای ادامه باید صبر کنید تا قلب‌ها برگردند.</p>
        <a href="../index.html">بازگشت</a>
      `;
      return;
    }
  }
}

async function checkBuild(selected, correct) {
  const s = selected.map(w => w.trim());
  const c = correct.map(w => w.trim());

  if (JSON.stringify(s) === JSON.stringify(c)) {
    xp += 5;
    if (typeof addXP === 'function') {
      await addXP(5);
    }
    current++;
    showQuestion();
  } else {
    alert('❌ اشتباه! دوباره تلاش کن.');
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
        <h2>💔 قلب شما تمام شد!</h2>
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