let current = 0;
let xp = 0;
let recognition = null;
let isRecording = false;

// ===== تابع پخش صدا (ترکی استانبولی) =====
function speak(text) {
  if (!window.speechSynthesis) return;
  const utter = new SpeechSynthesisUtterance(text);
  utter.lang = "tr-TR";
  utter.rate = 0.8;
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
  recognition.lang = 'tr-TR';
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

// ===== سوالات درس ۷ - ترکی استانبولی به فارسی (مبلمان ۲) =====
const questions = [

  // ===== بخش ۱: IMAGE (۵ تا) =====
  {
    type: 'image',
    question: 'کدام تصویر برای "perde" است؟',
    speak: 'perde',
    options: [
      { text: 'perde', image: '../../../media/a2/house/curtain.png' },
      { text: 'halı', image: '../../../media/a2/house/carpet.png' },
      { text: 'yastık', image: '../../../media/a2/house/pillow.png' },
      { text: 'battaniye', image: '../../../media/a2/house/blanket.png' }
    ],
    answer: 'perde'
  },
  {
    type: 'image',
    question: 'کدام تصویر برای "halı" است؟',
    speak: 'halı',
    options: [
      { text: 'perde', image: '../../../media/a2/house/curtain.png' },
      { text: 'halı', image: '../../../media/a2/house/carpet.png' },
      { text: 'lamba', image: '../../../media/a2/house/lamp.png' },
      { text: 'yastık', image: '../../../media/a2/house/pillow.png' }
    ],
    answer: 'halı'
  },
  {
    type: 'image',
    question: 'کدام تصویر برای "yastık" است؟',
    speak: 'yastık',
    options: [
      { text: 'battaniye', image: '../../../media/a2/house/blanket.png' },
      { text: 'perde', image: '../../../media/a2/house/curtain.png' },
      { text: 'yastık', image: '../../../media/a2/house/pillow.png' },
      { text: 'halı', image: '../../../media/a2/house/carpet.png' }
    ],
    answer: 'yastık'
  },
  {
    type: 'image',
    question: 'کدام تصویر برای "battaniye" است؟',
    speak: 'battaniye',
    options: [
      { text: 'perde', image: '../../../media/a2/house/curtain.png' },
      { text: 'battaniye', image: '../../../media/a2/house/blanket.png' },
      { text: 'halı', image: '../../../media/a2/house/carpet.png' },
      { text: 'lamba', image: '../../../media/a2/house/lamp.png' }
    ],
    answer: 'battaniye'
  },
  {
    type: 'image',
    question: 'کدام تصویر برای "lamba" است؟',
    speak: 'lamba',
    options: [
      { text: 'yastık', image: '../../../media/a2/house/pillow.png' },
      { text: 'battaniye', image: '../../../media/a2/house/blanket.png' },
      { text: 'lamba', image: '../../../media/a2/house/lamp.png' },
      { text: 'perde', image: '../../../media/a2/house/curtain.png' }
    ],
    answer: 'lamba'
  },

  // ===== بخش ۲: WORD (۵ تا) =====
  {
    type: 'word',
    question: 'این تصویر چیست؟',
    image: '../../../media/a2/house/curtain.png',
    options: ['perde', 'halı', 'yastık', 'battaniye'],
    answer: 'perde'
  },
  {
    type: 'word',
    question: 'این تصویر چیست؟',
    image: '../../../media/a2/house/carpet.png',
    options: ['perde', 'halı', 'lamba', 'yastık'],
    answer: 'halı'
  },
  {
    type: 'word',
    question: 'این تصویر چیست؟',
    image: '../../../media/a2/house/pillow.png',
    options: ['battaniye', 'perde', 'yastık', 'halı'],
    answer: 'yastık'
  },
  {
    type: 'word',
    question: 'این تصویر چیست؟',
    image: '../../../media/a2/house/blanket.png',
    options: ['perde', 'battaniye', 'halı', 'lamba'],
    answer: 'battaniye'
  },
  {
    type: 'word',
    question: 'این تصویر چیست؟',
    image: '../../../media/a2/house/lamp.png',
    options: ['yastık', 'battaniye', 'lamba', 'perde'],
    answer: 'lamba'
  },

  // ===== بخش ۳: AUDIO (۵ تا) =====
  {
    type: 'audio',
    speak: 'perde',
    question: 'کدام کلمه را شنیدی؟',
    options: ['perde', 'halı', 'yastık', 'battaniye'],
    answer: 'perde'
  },
  {
    type: 'audio',
    speak: 'halı',
    question: 'کدام کلمه را شنیدی؟',
    options: ['perde', 'halı', 'lamba', 'yastık'],
    answer: 'halı'
  },
  {
    type: 'audio',
    speak: 'yastık',
    question: 'کدام کلمه را شنیدی؟',
    options: ['battaniye', 'perde', 'yastık', 'halı'],
    answer: 'yastık'
  },
  {
    type: 'audio',
    speak: 'battaniye',
    question: 'کدام کلمه را شنیدی؟',
    options: ['perde', 'battaniye', 'halı', 'lamba'],
    answer: 'battaniye'
  },
  {
    type: 'audio',
    speak: 'lamba',
    question: 'کدام کلمه را شنیدی؟',
    options: ['yastık', 'battaniye', 'lamba', 'perde'],
    answer: 'lamba'
  },

  // ===== بخش ۴: SPEAK (۵ تا) =====
  {
    type: 'speak',
    word: 'perde',
    image: '../../../media/a2/house/curtain.png',
    meaning: 'پرده'
  },
  {
    type: 'speak',
    word: 'halı',
    image: '../../../media/a2/house/carpet.png',
    meaning: 'فرش'
  },
  {
    type: 'speak',
    word: 'yastık',
    image: '../../../media/a2/house/pillow.png',
    meaning: 'بالش'
  },
  {
    type: 'speak',
    word: 'battaniye',
    image: '../../../media/a2/house/blanket.png',
    meaning: 'پتو'
  },
  {
    type: 'speak',
    word: 'lamba',
    image: '../../../media/a2/house/lamp.png',
    meaning: 'چراغ'
  },

  // ===== بخش ۵: BUILD TR (ساخت جمله ترکی) =====
  {
    type: 'build-tr',
    speak: 'Bu bir perde',
    question: 'جمله ترکی را بساز:',
    text: 'این یک پرده است',
    words: ['perde', 'bir', 'Bu'],
    answer: ['Bu', 'bir', 'perde']
  },
  {
    type: 'build-tr',
    speak: 'Bu bir halı',
    question: 'جمله ترکی را بساز:',
    text: 'این یک فرش است',
    words: ['halı', 'bir', 'Bu'],
    answer: ['Bu', 'bir', 'halı']
  },
  {
    type: 'build-tr',
    speak: 'Bu bir yastık',
    question: 'جمله ترکی را بساز:',
    text: 'این یک بالش است',
    words: ['yastık', 'bir', 'Bu'],
    answer: ['Bu', 'bir', 'yastık']
  },
  {
    type: 'build-tr',
    speak: 'Bu bir battaniye',
    question: 'جمله ترکی را بساز:',
    text: 'این یک پتو است',
    words: ['battaniye', 'bir', 'Bu'],
    answer: ['Bu', 'bir', 'battaniye']
  },
  {
    type: 'build-tr',
    speak: 'Bu bir lamba',
    question: 'جمله ترکی را بساز:',
    text: 'این یک چراغ است',
    words: ['lamba', 'bir', 'Bu'],
    answer: ['Bu', 'bir', 'lamba']
  },

  // ===== بخش ۶: BUILD FA (ترجمه به فارسی) =====
  {
    type: 'build-fa',
    speak: 'Bu bir perde',
    question: 'ترجمه را بساز:',
    text: 'Bu bir perde',
    words: ['است', 'پرده', 'یک', 'این'],
    answer: ['این', 'یک', 'پرده', 'است']
  },
  {
    type: 'build-fa',
    speak: 'Bu bir halı',
    question: 'ترجمه را بساز:',
    text: 'Bu bir halı',
    words: ['است', 'فرش', 'یک', 'این'],
    answer: ['این', 'یک', 'فرش', 'است']
  },
  {
    type: 'build-fa',
    speak: 'Bu bir yastık',
    question: 'ترجمه را بساز:',
    text: 'Bu bir yastık',
    words: ['است', 'بالش', 'یک', 'این'],
    answer: ['این', 'یک', 'بالش', 'است']
  },
  {
    type: 'build-fa',
    speak: 'Bu bir battaniye',
    question: 'ترجمه را بساز:',
    text: 'Bu bir battaniye',
    words: ['است', 'پتو', 'یک', 'این'],
    answer: ['این', 'یک', 'پتو', 'است']
  },
  {
    type: 'build-fa',
    speak: 'Bu bir lamba',
    question: 'ترجمه را بساز:',
    text: 'Bu bir lamba',
    words: ['است', 'چراغ', 'یک', 'این'],
    answer: ['این', 'یک', 'چراغ', 'است']
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

  // ===== بخش BUILD TR / FA =====
  if (q.type === 'build-tr' || q.type === 'build-fa') {
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

    if (q.type === 'build-tr') {
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