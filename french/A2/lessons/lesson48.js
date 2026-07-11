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

// ===== سوالات درس ۴۸ - فرانسوی به فارسی =====
const questions = [

  // ===== بخش ۱: IMAGE (۵ تا) =====
  {
    type: 'image',
    question: 'کدام تصویر برای "l\'université" است؟',
    speak: 'l\'université',
    options: [
      { text: 'l\'université', image: '../../../media/a2/school/university.png' },
      { text: 'le collège', image: '../../../media/a2/school/college.png' },
      { text: 'le campus', image: '../../../media/a2/school/campus.png' },
      { text: 'le laboratoire', image: '../../../media/a2/school/laboratory.png' }
    ],
    answer: 'l\'université'
  },
  {
    type: 'image',
    question: 'کدام تصویر برای "le collège" است؟',
    speak: 'le collège',
    options: [
      { text: 'l\'université', image: '../../../media/a2/school/university.png' },
      { text: 'le collège', image: '../../../media/a2/school/college.png' },
      { text: 'le dortoir', image: '../../../media/a2/school/dormitory.png' },
      { text: 'le campus', image: '../../../media/a2/school/campus.png' }
    ],
    answer: 'le collège'
  },
  {
    type: 'image',
    question: 'کدام تصویر برای "le campus" است؟',
    speak: 'le campus',
    options: [
      { text: 'le laboratoire', image: '../../../media/a2/school/laboratory.png' },
      { text: 'l\'université', image: '../../../media/a2/school/university.png' },
      { text: 'le campus', image: '../../../media/a2/school/campus.png' },
      { text: 'le collège', image: '../../../media/a2/school/college.png' }
    ],
    answer: 'le campus'
  },
  {
    type: 'image',
    question: 'کدام تصویر برای "le dortoir" است؟',
    speak: 'le dortoir',
    options: [
      { text: 'le collège', image: '../../../media/a2/school/college.png' },
      { text: 'le dortoir', image: '../../../media/a2/school/dormitory.png' },
      { text: 'le laboratoire', image: '../../../media/a2/school/laboratory.png' },
      { text: 'l\'université', image: '../../../media/a2/school/university.png' }
    ],
    answer: 'le dortoir'
  },
  {
    type: 'image',
    question: 'کدام تصویر برای "le laboratoire" است؟',
    speak: 'le laboratoire',
    options: [
      { text: 'l\'université', image: '../../../media/a2/school/university.png' },
      { text: 'le campus', image: '../../../media/a2/school/campus.png' },
      { text: 'le laboratoire', image: '../../../media/a2/school/laboratory.png' },
      { text: 'le dortoir', image: '../../../media/a2/school/dormitory.png' }
    ],
    answer: 'le laboratoire'
  },

  // ===== بخش ۲: WORD (۵ تا) =====
  {
    type: 'word',
    question: 'این تصویر چیست؟',
    image: '../../../media/a2/school/university.png',
    options: ['l\'université', 'le collège', 'le campus', 'le laboratoire'],
    answer: 'l\'université'
  },
  {
    type: 'word',
    question: 'این تصویر چیست؟',
    image: '../../../media/a2/school/college.png',
    options: ['l\'université', 'le collège', 'le dortoir', 'le campus'],
    answer: 'le collège'
  },
  {
    type: 'word',
    question: 'این تصویر چیست؟',
    image: '../../../media/a2/school/campus.png',
    options: ['le laboratoire', 'l\'université', 'le campus', 'le collège'],
    answer: 'le campus'
  },
  {
    type: 'word',
    question: 'این تصویر چیست؟',
    image: '../../../media/a2/school/dormitory.png',
    options: ['le collège', 'le dortoir', 'le laboratoire', 'l\'université'],
    answer: 'le dortoir'
  },
  {
    type: 'word',
    question: 'این تصویر چیست؟',
    image: '../../../media/a2/school/laboratory.png',
    options: ['l\'université', 'le campus', 'le laboratoire', 'le dortoir'],
    answer: 'le laboratoire'
  },

  // ===== بخش ۳: AUDIO (۵ تا) =====
  {
    type: 'audio',
    speak: 'l\'université',
    question: 'کدام کلمه را شنیدی؟',
    options: ['l\'université', 'le collège', 'le campus', 'le laboratoire'],
    answer: 'l\'université'
  },
  {
    type: 'audio',
    speak: 'le collège',
    question: 'کدام کلمه را شنیدی؟',
    options: ['l\'université', 'le collège', 'le dortoir', 'le campus'],
    answer: 'le collège'
  },
  {
    type: 'audio',
    speak: 'le campus',
    question: 'کدام کلمه را شنیدی؟',
    options: ['le laboratoire', 'l\'université', 'le campus', 'le collège'],
    answer: 'le campus'
  },
  {
    type: 'audio',
    speak: 'le dortoir',
    question: 'کدام کلمه را شنیدی؟',
    options: ['le collège', 'le dortoir', 'le laboratoire', 'l\'université'],
    answer: 'le dortoir'
  },
  {
    type: 'audio',
    speak: 'le laboratoire',
    question: 'کدام کلمه را شنیدی؟',
    options: ['l\'université', 'le campus', 'le laboratoire', 'le dortoir'],
    answer: 'le laboratoire'
  },

  // ===== بخش ۴: SPEAK (۵ تا) =====
  {
    type: 'speak',
    word: 'l\'université',
    image: '../../../media/a2/school/university.png',
    meaning: 'دانشگاه'
  },
  {
    type: 'speak',
    word: 'le collège',
    image: '../../../media/a2/school/college.png',
    meaning: 'کالج'
  },
  {
    type: 'speak',
    word: 'le campus',
    image: '../../../media/a2/school/campus.png',
    meaning: 'محوطه دانشگاه'
  },
  {
    type: 'speak',
    word: 'le dortoir',
    image: '../../../media/a2/school/dormitory.png',
    meaning: 'خوابگاه'
  },
  {
    type: 'speak',
    word: 'le laboratoire',
    image: '../../../media/a2/school/laboratory.png',
    meaning: 'آزمایشگاه'
  },

  // ===== بخش ۵: BUILD EN (ساخت جمله فرانسوی) =====
  {
    type: 'build-en',
    speak: 'Je vais à l\'université',
    question: 'جمله فرانسوی را بساز:',
    text: 'من به دانشگاه می‌روم',
    words: ['l\'université', 'à', 'vais', 'Je'],
    answer: ['Je', 'vais', 'à', 'l\'université']
  },
  {
    type: 'build-en',
    speak: 'Je vais au collège',
    question: 'جمله فرانسوی را بساز:',
    text: 'من به کالج می‌روم',
    words: ['collège', 'au', 'vais', 'Je'],
    answer: ['Je', 'vais', 'au', 'collège']
  },
  {
    type: 'build-en',
    speak: 'Je suis sur le campus',
    question: 'جمله فرانسوی را بساز:',
    text: 'من در محوطه دانشگاه هستم',
    words: ['campus', 'le', 'sur', 'suis', 'Je'],
    answer: ['Je', 'suis', 'sur', 'le', 'campus']
  },
  {
    type: 'build-en',
    speak: 'Je vis dans un dortoir',
    question: 'جمله فرانسوی را بساز:',
    text: 'من در یک خوابگاه زندگی می‌کنم',
    words: ['dortoir', 'un', 'dans', 'vis', 'Je'],
    answer: ['Je', 'vis', 'dans', 'un', 'dortoir']
  },
  {
    type: 'build-en',
    speak: 'Je travaille dans un laboratoire',
    question: 'جمله فرانسوی را بساز:',
    text: 'من در یک آزمایشگاه کار می‌کنم',
    words: ['laboratoire', 'un', 'dans', 'travaille', 'Je'],
    answer: ['Je', 'travaille', 'dans', 'un', 'laboratoire']
  },

  // ===== بخش ۶: BUILD FA (ترجمه به فارسی) =====
  {
    type: 'build-fa',
    speak: 'Je vais à l\'université',
    question: 'ترجمه را بساز:',
    text: 'Je vais à l\'université',
    words: ['می‌روم', 'دانشگاه', 'به', 'من'],
    answer: ['من', 'به', 'دانشگاه', 'می‌روم']
  },
  {
    type: 'build-fa',
    speak: 'Je vais au collège',
    question: 'ترجمه را بساز:',
    text: 'Je vais au collège',
    words: ['می‌روم', 'کالج', 'به', 'من'],
    answer: ['من', 'به', 'کالج', 'می‌روم']
  },
  {
    type: 'build-fa',
    speak: 'Je suis sur le campus',
    question: 'ترجمه را بساز:',
    text: 'Je suis sur le campus',
    words: ['هستم', 'محوطه دانشگاه', 'در', 'من'],
    answer: ['من', 'در', 'محوطه دانشگاه', 'هستم']
  },
  {
    type: 'build-fa',
    speak: 'Je vis dans un dortoir',
    question: 'ترجمه را بساز:',
    text: 'Je vis dans un dortoir',
    words: ['زندگی می‌کنم', 'خوابگاه', 'یک', 'در', 'من'],
    answer: ['من', 'در', 'یک', 'خوابگاه', 'زندگی می‌کنم']
  },
  {
    type: 'build-fa',
    speak: 'Je travaille dans un laboratoire',
    question: 'ترجمه را بساز:',
    text: 'Je travaille dans un laboratoire',
    words: ['کار می‌کنم', 'آزمایشگاه', 'یک', 'در', 'من'],
    answer: ['من', 'در', 'یک', 'آزمایشگاه', 'کار می‌کنم']
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