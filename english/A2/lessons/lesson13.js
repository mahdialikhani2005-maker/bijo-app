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

// ===== سوالات درس ۱۳ =====
const questions = [

  // ===== بخش ۱: IMAGE (۵ تا) =====
  {
    type: 'image',
    question: 'bridge کدام است؟',
    speak: 'bridge',
    options: [
      { text: 'square', image: '../../../media/a2/city/square.png' },
      { text: 'bridge', image: '../../../media/a2/city/bridge.png' },
      { text: 'fountain', image: '../../../media/a2/city/fountain.png' },
      { text: 'tower', image: '../../../media/a2/city/tower.png' }
    ],
    answer: 'bridge'
  },
  {
    type: 'image',
    question: 'square کدام است؟',
    speak: 'square',
    options: [
      { text: 'tower', image: '../../../media/a2/city/tower.png' },
      { text: 'square', image: '../../../media/a2/city/square.png' },
      { text: 'castle', image: '../../../media/a2/city/castle.png' },
      { text: 'bridge', image: '../../../media/a2/city/bridge.png' }
    ],
    answer: 'square'
  },
  {
    type: 'image',
    question: 'fountain کدام است؟',
    speak: 'fountain',
    options: [
      { text: 'bridge', image: '../../../media/a2/city/bridge.png' },
      { text: 'fountain', image: '../../../media/a2/city/fountain.png' },
      { text: 'castle', image: '../../../media/a2/city/castle.png' },
      { text: 'square', image: '../../../media/a2/city/square.png' }
    ],
    answer: 'fountain'
  },
  {
    type: 'image',
    question: 'tower کدام است؟',
    speak: 'tower',
    options: [
      { text: 'tower', image: '../../../media/a2/city/tower.png' },
      { text: 'square', image: '../../../media/a2/city/square.png' },
      { text: 'bridge', image: '../../../media/a2/city/bridge.png' },
      { text: 'fountain', image: '../../../media/a2/city/fountain.png' }
    ],
    answer: 'tower'
  },
  {
    type: 'image',
    question: 'castle کدام است؟',
    speak: 'castle',
    options: [
      { text: 'fountain', image: '../../../media/a2/city/fountain.png' },
      { text: 'bridge', image: '../../../media/a2/city/bridge.png' },
      { text: 'castle', image: '../../../media/a2/city/castle.png' },
      { text: 'square', image: '../../../media/a2/city/square.png' }
    ],
    answer: 'castle'
  },

  // ===== بخش ۲: WORD (۵ تا) =====
  {
    type: 'word',
    question: 'این تصویر چیست؟',
    image: '../../../media/a2/city/bridge.png',
    options: ['square', 'bridge', 'fountain', 'tower'],
    answer: 'bridge'
  },
  {
    type: 'word',
    question: 'این تصویر چیست؟',
    image: '../../../media/a2/city/square.png',
    options: ['tower', 'square', 'castle', 'bridge'],
    answer: 'square'
  },
  {
    type: 'word',
    question: 'این تصویر چیست؟',
    image: '../../../media/a2/city/fountain.png',
    options: ['bridge', 'fountain', 'castle', 'square'],
    answer: 'fountain'
  },
  {
    type: 'word',
    question: 'این تصویر چیست؟',
    image: '../../../media/a2/city/tower.png',
    options: ['tower', 'square', 'bridge', 'fountain'],
    answer: 'tower'
  },
  {
    type: 'word',
    question: 'این تصویر چیست؟',
    image: '../../../media/a2/city/castle.png',
    options: ['fountain', 'bridge', 'castle', 'square'],
    answer: 'castle'
  },

  // ===== بخش ۳: AUDIO (۵ تا) =====
  {
    type: 'audio',
    speak: 'bridge',
    question: 'کدام کلمه را شنیدی؟',
    options: ['bridge', 'square', 'fountain', 'tower'],
    answer: 'bridge'
  },
  {
    type: 'audio',
    speak: 'square',
    question: 'کدام کلمه را شنیدی؟',
    options: ['tower', 'square', 'castle', 'bridge'],
    answer: 'square'
  },
  {
    type: 'audio',
    speak: 'fountain',
    question: 'کدام کلمه را شنیدی؟',
    options: ['bridge', 'fountain', 'castle', 'square'],
    answer: 'fountain'
  },
  {
    type: 'audio',
    speak: 'tower',
    question: 'کدام کلمه را شنیدی؟',
    options: ['tower', 'square', 'bridge', 'fountain'],
    answer: 'tower'
  },
  {
    type: 'audio',
    speak: 'castle',
    question: 'کدام کلمه را شنیدی؟',
    options: ['fountain', 'bridge', 'castle', 'square'],
    answer: 'castle'
  },

  // ===== بخش ۴: SPEAK (۵ تا) =====
  {
    type: 'speak',
    word: 'bridge',
    image: '../../../media/a2/city/bridge.png',
    meaning: 'پل'
  },
  {
    type: 'speak',
    word: 'square',
    image: '../../../media/a2/city/square.png',
    meaning: 'میدان'
  },
  {
    type: 'speak',
    word: 'fountain',
    image: '../../../media/a2/city/fountain.png',
    meaning: 'آبنما'
  },
  {
    type: 'speak',
    word: 'tower',
    image: '../../../media/a2/city/tower.png',
    meaning: 'برج'
  },
  {
    type: 'speak',
    word: 'castle',
    image: '../../../media/a2/city/castle.png',
    meaning: 'قلعه'
  },

  // ===== بخش ۵: BUILD EN (۵ تا) =====
  {
    type: 'build-en',
    speak: 'This is a bridge',
    question: 'جمله انگلیسی را بساز:',
    text: 'این یک پل است',
    words: ['bridge', 'a', 'is', 'This'],
    answer: ['This', 'is', 'a', 'bridge']
  },
  {
    type: 'build-en',
    speak: 'This is a square',
    question: 'جمله انگلیسی را بساز:',
    text: 'این یک میدان است',
    words: ['square', 'a', 'is', 'This'],
    answer: ['This', 'is', 'a', 'square']
  },
  {
    type: 'build-en',
    speak: 'This is a fountain',
    question: 'جمله انگلیسی را بساز:',
    text: 'این یک آبنما است',
    words: ['fountain', 'a', 'is', 'This'],
    answer: ['This', 'is', 'a', 'fountain']
  },
  {
    type: 'build-en',
    speak: 'This is a tower',
    question: 'جمله انگلیسی را بساز:',
    text: 'این یک برج است',
    words: ['tower', 'a', 'is', 'This'],
    answer: ['This', 'is', 'a', 'tower']
  },
  {
    type: 'build-en',
    speak: 'This is a castle',
    question: 'جمله انگلیسی را بساز:',
    text: 'این یک قلعه است',
    words: ['castle', 'a', 'is', 'This'],
    answer: ['This', 'is', 'a', 'castle']
  },

  // ===== بخش ۶: BUILD FA (۵ تا) =====
  {
    type: 'build-fa',
    speak: 'This is a bridge',
    question: 'ترجمه را بساز:',
    text: 'This is a bridge',
    words: ['است', 'پل', 'یک', 'این'],
    answer: ['این', 'یک', 'پل', 'است']
  },
  {
    type: 'build-fa',
    speak: 'This is a square',
    question: 'ترجمه را بساز:',
    text: 'This is a square',
    words: ['است', 'میدان', 'یک', 'این'],
    answer: ['این', 'یک', 'میدان', 'است']
  },
  {
    type: 'build-fa',
    speak: 'This is a fountain',
    question: 'ترجمه را بساز:',
    text: 'This is a fountain',
    words: ['است', 'آبنما', 'یک', 'این'],
    answer: ['این', 'یک', 'آبنما', 'است']
  },
  {
    type: 'build-fa',
    speak: 'This is a tower',
    question: 'ترجمه را بساز:',
    text: 'This is a tower',
    words: ['است', 'برج', 'یک', 'این'],
    answer: ['این', 'یک', 'برج', 'است']
  },
  {
    type: 'build-fa',
    speak: 'This is a castle',
    question: 'ترجمه را بساز:',
    text: 'This is a castle',
    words: ['است', 'قلعه', 'یک', 'این'],
    answer: ['این', 'یک', 'قلعه', 'است']
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