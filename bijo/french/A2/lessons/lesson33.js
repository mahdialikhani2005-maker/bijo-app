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

// ===== سوالات درس ۳۳ - فرانسوی به فارسی =====
const questions = [

  // ===== بخش ۱: IMAGE (۵ تا) =====
  {
    type: 'image',
    question: 'کدام تصویر برای "le sous-marin" است؟',
    speak: 'le sous-marin',
    options: [
      { text: 'le sous-marin', image: '../../../media/a2/transport/submarine.png' },
      { text: 'le ferry', image: '../../../media/a2/transport/ferry.png' },
      { text: 'le yacht', image: '../../../media/a2/transport/yacht.png' },
      { text: 'le canoë', image: '../../../media/a2/transport/canoe.png' }
    ],
    answer: 'le sous-marin'
  },
  {
    type: 'image',
    question: 'کدام تصویر برای "le ferry" است؟',
    speak: 'le ferry',
    options: [
      { text: 'le sous-marin', image: '../../../media/a2/transport/submarine.png' },
      { text: 'le ferry', image: '../../../media/a2/transport/ferry.png' },
      { text: 'le radeau', image: '../../../media/a2/transport/raft.png' },
      { text: 'le yacht', image: '../../../media/a2/transport/yacht.png' }
    ],
    answer: 'le ferry'
  },
  {
    type: 'image',
    question: 'کدام تصویر برای "le yacht" است؟',
    speak: 'le yacht',
    options: [
      { text: 'le canoë', image: '../../../media/a2/transport/canoe.png' },
      { text: 'le sous-marin', image: '../../../media/a2/transport/submarine.png' },
      { text: 'le yacht', image: '../../../media/a2/transport/yacht.png' },
      { text: 'le ferry', image: '../../../media/a2/transport/ferry.png' }
    ],
    answer: 'le yacht'
  },
  {
    type: 'image',
    question: 'کدام تصویر برای "le canoë" است؟',
    speak: 'le canoë',
    options: [
      { text: 'le ferry', image: '../../../media/a2/transport/ferry.png' },
      { text: 'le canoë', image: '../../../media/a2/transport/canoe.png' },
      { text: 'le radeau', image: '../../../media/a2/transport/raft.png' },
      { text: 'le sous-marin', image: '../../../media/a2/transport/submarine.png' }
    ],
    answer: 'le canoë'
  },
  {
    type: 'image',
    question: 'کدام تصویر برای "le radeau" است؟',
    speak: 'le radeau',
    options: [
      { text: 'le sous-marin', image: '../../../media/a2/transport/submarine.png' },
      { text: 'le yacht', image: '../../../media/a2/transport/yacht.png' },
      { text: 'le radeau', image: '../../../media/a2/transport/raft.png' },
      { text: 'le canoë', image: '../../../media/a2/transport/canoe.png' }
    ],
    answer: 'le radeau'
  },

  // ===== بخش ۲: WORD (۵ تا) =====
  {
    type: 'word',
    question: 'این تصویر چیست؟',
    image: '../../../media/a2/transport/submarine.png',
    options: ['le sous-marin', 'le ferry', 'le yacht', 'le canoë'],
    answer: 'le sous-marin'
  },
  {
    type: 'word',
    question: 'این تصویر چیست؟',
    image: '../../../media/a2/transport/ferry.png',
    options: ['le sous-marin', 'le ferry', 'le radeau', 'le yacht'],
    answer: 'le ferry'
  },
  {
    type: 'word',
    question: 'این تصویر چیست؟',
    image: '../../../media/a2/transport/yacht.png',
    options: ['le canoë', 'le sous-marin', 'le yacht', 'le ferry'],
    answer: 'le yacht'
  },
  {
    type: 'word',
    question: 'این تصویر چیست؟',
    image: '../../../media/a2/transport/canoe.png',
    options: ['le ferry', 'le canoë', 'le radeau', 'le sous-marin'],
    answer: 'le canoë'
  },
  {
    type: 'word',
    question: 'این تصویر چیست؟',
    image: '../../../media/a2/transport/raft.png',
    options: ['le sous-marin', 'le yacht', 'le radeau', 'le canoë'],
    answer: 'le radeau'
  },

  // ===== بخش ۳: AUDIO (۵ تا) =====
  {
    type: 'audio',
    speak: 'le sous-marin',
    question: 'کدام کلمه را شنیدی؟',
    options: ['le sous-marin', 'le ferry', 'le yacht', 'le canoë'],
    answer: 'le sous-marin'
  },
  {
    type: 'audio',
    speak: 'le ferry',
    question: 'کدام کلمه را شنیدی؟',
    options: ['le sous-marin', 'le ferry', 'le radeau', 'le yacht'],
    answer: 'le ferry'
  },
  {
    type: 'audio',
    speak: 'le yacht',
    question: 'کدام کلمه را شنیدی؟',
    options: ['le canoë', 'le sous-marin', 'le yacht', 'le ferry'],
    answer: 'le yacht'
  },
  {
    type: 'audio',
    speak: 'le canoë',
    question: 'کدام کلمه را شنیدی؟',
    options: ['le ferry', 'le canoë', 'le radeau', 'le sous-marin'],
    answer: 'le canoë'
  },
  {
    type: 'audio',
    speak: 'le radeau',
    question: 'کدام کلمه را شنیدی؟',
    options: ['le sous-marin', 'le yacht', 'le radeau', 'le canoë'],
    answer: 'le radeau'
  },

  // ===== بخش ۴: SPEAK (۵ تا) =====
  {
    type: 'speak',
    word: 'le sous-marin',
    image: '../../../media/a2/transport/submarine.png',
    meaning: 'زیردریایی'
  },
  {
    type: 'speak',
    word: 'le ferry',
    image: '../../../media/a2/transport/ferry.png',
    meaning: 'کشتی مسافربری'
  },
  {
    type: 'speak',
    word: 'le yacht',
    image: '../../../media/a2/transport/yacht.png',
    meaning: 'قایق تفریحی'
  },
  {
    type: 'speak',
    word: 'le canoë',
    image: '../../../media/a2/transport/canoe.png',
    meaning: 'کانو'
  },
  {
    type: 'speak',
    word: 'le radeau',
    image: '../../../media/a2/transport/raft.png',
    meaning: 'کلک'
  },

  // ===== بخش ۵: BUILD EN (ساخت جمله فرانسوی) =====
  {
    type: 'build-en',
    speak: 'Je vois un sous-marin',
    question: 'جمله فرانسوی را بساز:',
    text: 'من یک زیردریایی می‌بینم',
    words: ['sous-marin', 'un', 'vois', 'Je'],
    answer: ['Je', 'vois', 'un', 'sous-marin']
  },
  {
    type: 'build-en',
    speak: 'Je vois un ferry',
    question: 'جمله فرانسوی را بساز:',
    text: 'من یک کشتی مسافربری می‌بینم',
    words: ['ferry', 'un', 'vois', 'Je'],
    answer: ['Je', 'vois', 'un', 'ferry']
  },
  {
    type: 'build-en',
    speak: 'Je vois un yacht',
    question: 'جمله فرانسوی را بساز:',
    text: 'من یک قایق تفریحی می‌بینم',
    words: ['yacht', 'un', 'vois', 'Je'],
    answer: ['Je', 'vois', 'un', 'yacht']
  },
  {
    type: 'build-en',
    speak: 'Je vois un canoë',
    question: 'جمله فرانسوی را بساز:',
    text: 'من یک کانو می‌بینم',
    words: ['canoë', 'un', 'vois', 'Je'],
    answer: ['Je', 'vois', 'un', 'canoë']
  },
  {
    type: 'build-en',
    speak: 'Je vois un radeau',
    question: 'جمله فرانسوی را بساز:',
    text: 'من یک کلک می‌بینم',
    words: ['radeau', 'un', 'vois', 'Je'],
    answer: ['Je', 'vois', 'un', 'radeau']
  },

  // ===== بخش ۶: BUILD FA (ترجمه به فارسی) =====
  {
    type: 'build-fa',
    speak: 'Je vois un sous-marin',
    question: 'ترجمه را بساز:',
    text: 'Je vois un sous-marin',
    words: ['می‌بینم', 'زیردریایی', 'یک', 'من'],
    answer: ['من', 'یک', 'زیردریایی', 'می‌بینم']
  },
  {
    type: 'build-fa',
    speak: 'Je vois un ferry',
    question: 'ترجمه را بساز:',
    text: 'Je vois un ferry',
    words: ['می‌بینم', 'کشتی مسافربری', 'یک', 'من'],
    answer: ['من', 'یک', 'کشتی مسافربری', 'می‌بینم']
  },
  {
    type: 'build-fa',
    speak: 'Je vois un yacht',
    question: 'ترجمه را بساز:',
    text: 'Je vois un yacht',
    words: ['می‌بینم', 'قایق تفریحی', 'یک', 'من'],
    answer: ['من', 'یک', 'قایق تفریحی', 'می‌بینم']
  },
  {
    type: 'build-fa',
    speak: 'Je vois un canoë',
    question: 'ترجمه را بساز:',
    text: 'Je vois un canoë',
    words: ['می‌بینم', 'کانو', 'یک', 'من'],
    answer: ['من', 'یک', 'کانو', 'می‌بینم']
  },
  {
    type: 'build-fa',
    speak: 'Je vois un radeau',
    question: 'ترجمه را بساز:',
    text: 'Je vois un radeau',
    words: ['می‌بینم', 'کلک', 'یک', 'من'],
    answer: ['من', 'یک', 'کلک', 'می‌بینم']
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