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

// ===== سوالات درس ۳۲ - فرانسوی به فارسی =====
const questions = [

  // ===== بخش ۱: IMAGE (۵ تا) =====
  {
    type: 'image',
    question: 'کدام تصویر برای "le fourgon" است؟',
    speak: 'le fourgon',
    options: [
      { text: 'le fourgon', image: '../../../media/a2/transport/van.png' },
      { text: 'la jeep', image: '../../../media/a2/transport/jeep.png' },
      { text: 'la limousine', image: '../../../media/a2/transport/limousine.png' },
      { text: 'l\'ambulance', image: '../../../media/a2/transport/ambulance.png' }
    ],
    answer: 'le fourgon'
  },
  {
    type: 'image',
    question: 'کدام تصویر برای "la jeep" است؟',
    speak: 'la jeep',
    options: [
      { text: 'le fourgon', image: '../../../media/a2/transport/van.png' },
      { text: 'la jeep', image: '../../../media/a2/transport/jeep.png' },
      { text: 'le camion de pompiers', image: '../../../media/a2/transport/fire-truck.png' },
      { text: 'la limousine', image: '../../../media/a2/transport/limousine.png' }
    ],
    answer: 'la jeep'
  },
  {
    type: 'image',
    question: 'کدام تصویر برای "la limousine" است؟',
    speak: 'la limousine',
    options: [
      { text: 'l\'ambulance', image: '../../../media/a2/transport/ambulance.png' },
      { text: 'le fourgon', image: '../../../media/a2/transport/van.png' },
      { text: 'la limousine', image: '../../../media/a2/transport/limousine.png' },
      { text: 'la jeep', image: '../../../media/a2/transport/jeep.png' }
    ],
    answer: 'la limousine'
  },
  {
    type: 'image',
    question: 'کدام تصویر برای "l\'ambulance" است؟',
    speak: 'l\'ambulance',
    options: [
      { text: 'la jeep', image: '../../../media/a2/transport/jeep.png' },
      { text: 'l\'ambulance', image: '../../../media/a2/transport/ambulance.png' },
      { text: 'le camion de pompiers', image: '../../../media/a2/transport/fire-truck.png' },
      { text: 'le fourgon', image: '../../../media/a2/transport/van.png' }
    ],
    answer: 'l\'ambulance'
  },
  {
    type: 'image',
    question: 'کدام تصویر برای "le camion de pompiers" است؟',
    speak: 'le camion de pompiers',
    options: [
      { text: 'le fourgon', image: '../../../media/a2/transport/van.png' },
      { text: 'la limousine', image: '../../../media/a2/transport/limousine.png' },
      { text: 'le camion de pompiers', image: '../../../media/a2/transport/fire-truck.png' },
      { text: 'l\'ambulance', image: '../../../media/a2/transport/ambulance.png' }
    ],
    answer: 'le camion de pompiers'
  },

  // ===== بخش ۲: WORD (۵ تا) =====
  {
    type: 'word',
    question: 'این تصویر چیست؟',
    image: '../../../media/a2/transport/van.png',
    options: ['le fourgon', 'la jeep', 'la limousine', 'l\'ambulance'],
    answer: 'le fourgon'
  },
  {
    type: 'word',
    question: 'این تصویر چیست؟',
    image: '../../../media/a2/transport/jeep.png',
    options: ['le fourgon', 'la jeep', 'le camion de pompiers', 'la limousine'],
    answer: 'la jeep'
  },
  {
    type: 'word',
    question: 'این تصویر چیست؟',
    image: '../../../media/a2/transport/limousine.png',
    options: ['l\'ambulance', 'le fourgon', 'la limousine', 'la jeep'],
    answer: 'la limousine'
  },
  {
    type: 'word',
    question: 'این تصویر چیست؟',
    image: '../../../media/a2/transport/ambulance.png',
    options: ['la jeep', 'l\'ambulance', 'le camion de pompiers', 'le fourgon'],
    answer: 'l\'ambulance'
  },
  {
    type: 'word',
    question: 'این تصویر چیست؟',
    image: '../../../media/a2/transport/fire-truck.png',
    options: ['le fourgon', 'la limousine', 'le camion de pompiers', 'l\'ambulance'],
    answer: 'le camion de pompiers'
  },

  // ===== بخش ۳: AUDIO (۵ تا) =====
  {
    type: 'audio',
    speak: 'le fourgon',
    question: 'کدام کلمه را شنیدی؟',
    options: ['le fourgon', 'la jeep', 'la limousine', 'l\'ambulance'],
    answer: 'le fourgon'
  },
  {
    type: 'audio',
    speak: 'la jeep',
    question: 'کدام کلمه را شنیدی؟',
    options: ['le fourgon', 'la jeep', 'le camion de pompiers', 'la limousine'],
    answer: 'la jeep'
  },
  {
    type: 'audio',
    speak: 'la limousine',
    question: 'کدام کلمه را شنیدی؟',
    options: ['l\'ambulance', 'le fourgon', 'la limousine', 'la jeep'],
    answer: 'la limousine'
  },
  {
    type: 'audio',
    speak: 'l\'ambulance',
    question: 'کدام کلمه را شنیدی؟',
    options: ['la jeep', 'l\'ambulance', 'le camion de pompiers', 'le fourgon'],
    answer: 'l\'ambulance'
  },
  {
    type: 'audio',
    speak: 'le camion de pompiers',
    question: 'کدام کلمه را شنیدی؟',
    options: ['le fourgon', 'la limousine', 'le camion de pompiers', 'l\'ambulance'],
    answer: 'le camion de pompiers'
  },

  // ===== بخش ۴: SPEAK (۵ تا) =====
  {
    type: 'speak',
    word: 'le fourgon',
    image: '../../../media/a2/transport/van.png',
    meaning: 'وانت'
  },
  {
    type: 'speak',
    word: 'la jeep',
    image: '../../../media/a2/transport/jeep.png',
    meaning: 'جیپ'
  },
  {
    type: 'speak',
    word: 'la limousine',
    image: '../../../media/a2/transport/limousine.png',
    meaning: 'لیموزین'
  },
  {
    type: 'speak',
    word: 'l\'ambulance',
    image: '../../../media/a2/transport/ambulance.png',
    meaning: 'آمبولانس'
  },
  {
    type: 'speak',
    word: 'le camion de pompiers',
    image: '../../../media/a2/transport/fire-truck.png',
    meaning: 'ماشین آتش‌نشانی'
  },

  // ===== بخش ۵: BUILD EN (ساخت جمله فرانسوی) =====
  {
    type: 'build-en',
    speak: 'Je vois un fourgon',
    question: 'جمله فرانسوی را بساز:',
    text: 'من یک وانت می‌بینم',
    words: ['fourgon', 'un', 'vois', 'Je'],
    answer: ['Je', 'vois', 'un', 'fourgon']
  },
  {
    type: 'build-en',
    speak: 'Je vois une jeep',
    question: 'جمله فرانسوی را بساز:',
    text: 'من یک جیپ می‌بینم',
    words: ['jeep', 'une', 'vois', 'Je'],
    answer: ['Je', 'vois', 'une', 'jeep']
  },
  {
    type: 'build-en',
    speak: 'Je vois une limousine',
    question: 'جمله فرانسوی را بساز:',
    text: 'من یک لیموزین می‌بینم',
    words: ['limousine', 'une', 'vois', 'Je'],
    answer: ['Je', 'vois', 'une', 'limousine']
  },
  {
    type: 'build-en',
    speak: 'Je vois une ambulance',
    question: 'جمله فرانسوی را بساز:',
    text: 'من یک آمبولانس می‌بینم',
    words: ['ambulance', 'une', 'vois', 'Je'],
    answer: ['Je', 'vois', 'une', 'ambulance']
  },
  {
    type: 'build-en',
    speak: 'Je vois un camion de pompiers',
    question: 'جمله فرانسوی را بساز:',
    text: 'من یک ماشین آتش‌نشانی می‌بینم',
    words: ['pompiers', 'de', 'camion', 'un', 'vois', 'Je'],
    answer: ['Je', 'vois', 'un', 'camion', 'de', 'pompiers']
  },

  // ===== بخش ۶: BUILD FA (ترجمه به فارسی) =====
  {
    type: 'build-fa',
    speak: 'Je vois un fourgon',
    question: 'ترجمه را بساز:',
    text: 'Je vois un fourgon',
    words: ['می‌بینم', 'وانت', 'یک', 'من'],
    answer: ['من', 'یک', 'وانت', 'می‌بینم']
  },
  {
    type: 'build-fa',
    speak: 'Je vois une jeep',
    question: 'ترجمه را بساز:',
    text: 'Je vois une jeep',
    words: ['می‌بینم', 'جیپ', 'یک', 'من'],
    answer: ['من', 'یک', 'جیپ', 'می‌بینم']
  },
  {
    type: 'build-fa',
    speak: 'Je vois une limousine',
    question: 'ترجمه را بساز:',
    text: 'Je vois une limousine',
    words: ['می‌بینم', 'لیموزین', 'یک', 'من'],
    answer: ['من', 'یک', 'لیموزین', 'می‌بینم']
  },
  {
    type: 'build-fa',
    speak: 'Je vois une ambulance',
    question: 'ترجمه را بساز:',
    text: 'Je vois une ambulance',
    words: ['می‌بینم', 'آمبولانس', 'یک', 'من'],
    answer: ['من', 'یک', 'آمبولانس', 'می‌بینم']
  },
  {
    type: 'build-fa',
    speak: 'Je vois un camion de pompiers',
    question: 'ترجمه را بساز:',
    text: 'Je vois un camion de pompiers',
    words: ['می‌بینم', 'آتش‌نشانی', 'ماشین', 'یک', 'من'],
    answer: ['من', 'یک', 'ماشین', 'آتش‌نشانی', 'می‌بینم']
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