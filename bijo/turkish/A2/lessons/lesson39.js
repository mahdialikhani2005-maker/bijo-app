let current = 0;
let xp = 0;
let recognition = null;
let isRecording = false;

// ===== تابع پخش صدا =====
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

// ===== سوالات درس ۳۹ - ترکی به فارسی =====
const questions = [

  // ===== بخش ۱: IMAGE (۵ تا) =====
  {
    type: 'image',
    question: 'کدام تصویر برای "sis" است؟',
    speak: 'sis',
    options: [
      { text: 'sis', image: '../../../media/a2/weather/fog.png' },
      { text: 'dolu', image: '../../../media/a2/weather/hail.png' },
      { text: 'kar tanesi', image: '../../../media/a2/weather/snowflake.png' },
      { text: 'şimşek', image: '../../../media/a2/weather/lightning.png' }
    ],
    answer: 'sis'
  },
  {
    type: 'image',
    question: 'کدام تصویر برای "dolu" است؟',
    speak: 'dolu',
    options: [
      { text: 'gök gürültüsü', image: '../../../media/a2/weather/thunder.png' },
      { text: 'dolu', image: '../../../media/a2/weather/hail.png' },
      { text: 'sis', image: '../../../media/a2/weather/fog.png' },
      { text: 'kar tanesi', image: '../../../media/a2/weather/snowflake.png' }
    ],
    answer: 'dolu'
  },
  {
    type: 'image',
    question: 'کدام تصویر برای "kar tanesi" است؟',
    speak: 'kar tanesi',
    options: [
      { text: 'sis', image: '../../../media/a2/weather/fog.png' },
      { text: 'kar tanesi', image: '../../../media/a2/weather/snowflake.png' },
      { text: 'şimşek', image: '../../../media/a2/weather/lightning.png' },
      { text: 'dolu', image: '../../../media/a2/weather/hail.png' }
    ],
    answer: 'kar tanesi'
  },
  {
    type: 'image',
    question: 'کدام تصویر برای "şimşek" است؟',
    speak: 'şimşek',
    options: [
      { text: 'dolu', image: '../../../media/a2/weather/hail.png' },
      { text: 'sis', image: '../../../media/a2/weather/fog.png' },
      { text: 'kar tanesi', image: '../../../media/a2/weather/snowflake.png' },
      { text: 'şimşek', image: '../../../media/a2/weather/lightning.png' }
    ],
    answer: 'şimşek'
  },
  {
    type: 'image',
    question: 'کدام تصویر برای "gök gürültüsü" است؟',
    speak: 'gök gürültüsü',
    options: [
      { text: 'gök gürültüsü', image: '../../../media/a2/weather/thunder.png' },
      { text: 'şimşek', image: '../../../media/a2/weather/lightning.png' },
      { text: 'sis', image: '../../../media/a2/weather/fog.png' },
      { text: 'dolu', image: '../../../media/a2/weather/hail.png' }
    ],
    answer: 'gök gürültüsü'
  },

  // ===== بخش ۲: WORD (۵ تا) =====
  {
    type: 'word',
    question: 'این تصویر چیست؟',
    image: '../../../media/a2/weather/fog.png',
    options: ['sis', 'dolu', 'kar tanesi', 'şimşek'],
    answer: 'sis'
  },
  {
    type: 'word',
    question: 'این تصویر چیست؟',
    image: '../../../media/a2/weather/hail.png',
    options: ['sis', 'dolu', 'kar tanesi', 'gök gürültüsü'],
    answer: 'dolu'
  },
  {
    type: 'word',
    question: 'این تصویر چیست؟',
    image: '../../../media/a2/weather/snowflake.png',
    options: ['şimşek', 'sis', 'kar tanesi', 'dolu'],
    answer: 'kar tanesi'
  },
  {
    type: 'word',
    question: 'این تصویر چیست؟',
    image: '../../../media/a2/weather/lightning.png',
    options: ['kar tanesi', 'dolu', 'sis', 'şimşek'],
    answer: 'şimşek'
  },
  {
    type: 'word',
    question: 'این تصویر چیست؟',
    image: '../../../media/a2/weather/thunder.png',
    options: ['sis', 'şimşek', 'dolu', 'gök gürültüsü'],
    answer: 'gök gürültüsü'
  },

  // ===== بخش ۳: AUDIO (۵ تا) =====
  {
    type: 'audio',
    speak: 'sis',
    question: 'کدام کلمه را شنیدی؟',
    options: ['sis', 'dolu', 'kar tanesi', 'şimşek'],
    answer: 'sis'
  },
  {
    type: 'audio',
    speak: 'dolu',
    question: 'کدام کلمه را شنیدی؟',
    options: ['gök gürültüsü', 'dolu', 'sis', 'kar tanesi'],
    answer: 'dolu'
  },
  {
    type: 'audio',
    speak: 'kar tanesi',
    question: 'کدام کلمه را شنیدی؟',
    options: ['sis', 'kar tanesi', 'şimşek', 'dolu'],
    answer: 'kar tanesi'
  },
  {
    type: 'audio',
    speak: 'şimşek',
    question: 'کدام کلمه را شنیدی؟',
    options: ['dolu', 'sis', 'kar tanesi', 'şimşek'],
    answer: 'şimşek'
  },
  {
    type: 'audio',
    speak: 'gök gürültüsü',
    question: 'کدام کلمه را شنیدی؟',
    options: ['gök gürültüsü', 'şimşek', 'sis', 'dolu'],
    answer: 'gök gürültüsü'
  },

  // ===== بخش ۴: SPEAK (۵ تا) =====
  {
    type: 'speak',
    word: 'sis',
    image: '../../../media/a2/weather/fog.png',
    meaning: 'مه'
  },
  {
    type: 'speak',
    word: 'dolu',
    image: '../../../media/a2/weather/hail.png',
    meaning: 'تگرگ'
  },
  {
    type: 'speak',
    word: 'kar tanesi',
    image: '../../../media/a2/weather/snowflake.png',
    meaning: 'دانه برف'
  },
  {
    type: 'speak',
    word: 'şimşek',
    image: '../../../media/a2/weather/lightning.png',
    meaning: 'آذرخش/برق'
  },
  {
    type: 'speak',
    word: 'gök gürültüsü',
    image: '../../../media/a2/weather/thunder.png',
    meaning: 'رعد و برق'
  },

  // ===== بخش ۵: BUILD IT (ساخت جمله ترکی) =====
  {
    type: 'build-it',
    speak: 'Sis var',
    question: 'جمله ترکی را بساز:',
    text: 'مه وجود دارد',
    words: ['var', 'Sis'],
    answer: ['Sis', 'var']
  },
  {
    type: 'build-it',
    speak: 'Dolu yağıyor',
    question: 'جمله ترکی را بساز:',
    text: 'تگرگ می‌بارد',
    words: ['yağıyor', 'Dolu'],
    answer: ['Dolu', 'yağıyor']
  },
  {
    type: 'build-it',
    speak: 'Kar taneleri düşüyor',
    question: 'جمله ترکی را بساز:',
    text: 'دانه‌های برف می‌بارند',
    words: ['düşüyor', 'taneleri', 'Kar'],
    answer: ['Kar', 'taneleri', 'düşüyor']
  },
  {
    type: 'build-it',
    speak: 'Şimşek çakıyor',
    question: 'جمله ترکی را بساز:',
    text: 'آذرخش می‌زند',
    words: ['çakıyor', 'Şimşek'],
    answer: ['Şimşek', 'çakıyor']
  },
  {
    type: 'build-it',
    speak: 'Gök gürültüsü duyuyoruz',
    question: 'جمله ترکی را بساز:',
    text: 'ما رعد و برق می‌شنویم',
    words: ['duyuyoruz', 'gürültüsü', 'Gök'],
    answer: ['Gök', 'gürültüsü', 'duyuyoruz']
  },

  // ===== بخش ۶: BUILD FA (ترجمه به فارسی) =====
  {
    type: 'build-fa',
    speak: 'Sis var',
    question: 'ترجمه را بساز:',
    text: 'Sis var',
    words: ['وجود دارد', 'مه'],
    answer: ['مه', 'وجود دارد']
  },
  {
    type: 'build-fa',
    speak: 'Dolu yağıyor',
    question: 'ترجمه را بساز:',
    text: 'Dolu yağıyor',
    words: ['تگرگ', 'می‌بارد'],
    answer: ['تگرگ', 'می‌بارد']
  },
  {
    type: 'build-fa',
    speak: 'Kar taneleri düşüyor',
    question: 'ترجمه را بساز:',
    text: 'Kar taneleri düşüyor',
    words: ['دانه‌های برف', 'می‌بارند'],
    answer: ['دانه‌های برف', 'می‌بارند']
  },
  {
    type: 'build-fa',
    speak: 'Şimşek çakıyor',
    question: 'ترجمه را بساز:',
    text: 'Şimşek çakıyor',
    words: ['آذرخش', 'می‌زند'],
    answer: ['آذرخش', 'می‌زند']
  },
  {
    type: 'build-fa',
    speak: 'Gök gürültüsü duyuyoruz',
    question: 'ترجمه را بساز:',
    text: 'Gök gürültüsü duyuyoruz',
    words: ['ما', 'می‌شنویم', 'رعد و برق'],
    answer: ['ما', 'رعد و برق', 'می‌شنویم']
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

  // ===== بخش BUILD IT / FA =====
  if (q.type === 'build-it' || q.type === 'build-fa') {
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

    if (q.type === 'build-it') {
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