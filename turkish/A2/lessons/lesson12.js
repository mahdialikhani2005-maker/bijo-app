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

// ===== سوالات درس ۱۲ - ترکی استانبولی به فارسی (مکان‌های شهر ۲) =====
const questions = [

  // ===== بخش ۱: IMAGE (۵ تا) =====
  {
    type: 'image',
    question: 'کدام تصویر برای "otel" است؟',
    speak: 'otel',
    options: [
      { text: 'otel', image: '../../../media/a2/city/hotel.png' },
      { text: 'kafe', image: '../../../media/a2/city/cafe.png' },
      { text: 'fırın', image: '../../../media/a2/city/bakery.png' },
      { text: 'eczane', image: '../../../media/a2/city/pharmacy.png' }
    ],
    answer: 'otel'
  },
  {
    type: 'image',
    question: 'کدام تصویر برای "kafe" است؟',
    speak: 'kafe',
    options: [
      { text: 'otel', image: '../../../media/a2/city/hotel.png' },
      { text: 'kafe', image: '../../../media/a2/city/cafe.png' },
      { text: 'kasap', image: '../../../media/a2/city/butchery.png' },
      { text: 'fırın', image: '../../../media/a2/city/bakery.png' }
    ],
    answer: 'kafe'
  },
  {
    type: 'image',
    question: 'کدام تصویر برای "fırın" است؟',
    speak: 'fırın',
    options: [
      { text: 'eczane', image: '../../../media/a2/city/pharmacy.png' },
      { text: 'otel', image: '../../../media/a2/city/hotel.png' },
      { text: 'fırın', image: '../../../media/a2/city/bakery.png' },
      { text: 'kafe', image: '../../../media/a2/city/cafe.png' }
    ],
    answer: 'fırın'
  },
  {
    type: 'image',
    question: 'کدام تصویر برای "eczane" است؟',
    speak: 'eczane',
    options: [
      { text: 'otel', image: '../../../media/a2/city/hotel.png' },
      { text: 'eczane', image: '../../../media/a2/city/pharmacy.png' },
      { text: 'kafe', image: '../../../media/a2/city/cafe.png' },
      { text: 'kasap', image: '../../../media/a2/city/butchery.png' }
    ],
    answer: 'eczane'
  },
  {
    type: 'image',
    question: 'کدام تصویر برای "kasap" است؟',
    speak: 'kasap',
    options: [
      { text: 'fırın', image: '../../../media/a2/city/bakery.png' },
      { text: 'eczane', image: '../../../media/a2/city/pharmacy.png' },
      { text: 'kasap', image: '../../../media/a2/city/butchery.png' },
      { text: 'otel', image: '../../../media/a2/city/hotel.png' }
    ],
    answer: 'kasap'
  },

  // ===== بخش ۲: WORD (۵ تا) =====
  {
    type: 'word',
    question: 'این تصویر چیست؟',
    image: '../../../media/a2/city/hotel.png',
    options: ['otel', 'kafe', 'fırın', 'eczane'],
    answer: 'otel'
  },
  {
    type: 'word',
    question: 'این تصویر چیست؟',
    image: '../../../media/a2/city/cafe.png',
    options: ['otel', 'kafe', 'kasap', 'fırın'],
    answer: 'kafe'
  },
  {
    type: 'word',
    question: 'این تصویر چیست؟',
    image: '../../../media/a2/city/bakery.png',
    options: ['eczane', 'otel', 'fırın', 'kafe'],
    answer: 'fırın'
  },
  {
    type: 'word',
    question: 'این تصویر چیست؟',
    image: '../../../media/a2/city/pharmacy.png',
    options: ['otel', 'eczane', 'kafe', 'kasap'],
    answer: 'eczane'
  },
  {
    type: 'word',
    question: 'این تصویر چیست؟',
    image: '../../../media/a2/city/butchery.png',
    options: ['fırın', 'eczane', 'kasap', 'otel'],
    answer: 'kasap'
  },

  // ===== بخش ۳: AUDIO (۵ تا) =====
  {
    type: 'audio',
    speak: 'otel',
    question: 'کدام کلمه را شنیدی؟',
    options: ['otel', 'kafe', 'fırın', 'eczane'],
    answer: 'otel'
  },
  {
    type: 'audio',
    speak: 'kafe',
    question: 'کدام کلمه را شنیدی؟',
    options: ['otel', 'kafe', 'kasap', 'fırın'],
    answer: 'kafe'
  },
  {
    type: 'audio',
    speak: 'fırın',
    question: 'کدام کلمه را شنیدی؟',
    options: ['eczane', 'otel', 'fırın', 'kafe'],
    answer: 'fırın'
  },
  {
    type: 'audio',
    speak: 'eczane',
    question: 'کدام کلمه را شنیدی؟',
    options: ['otel', 'eczane', 'kafe', 'kasap'],
    answer: 'eczane'
  },
  {
    type: 'audio',
    speak: 'kasap',
    question: 'کدام کلمه را شنیدی؟',
    options: ['fırın', 'eczane', 'kasap', 'otel'],
    answer: 'kasap'
  },

  // ===== بخش ۴: SPEAK (۵ تا) =====
  {
    type: 'speak',
    word: 'otel',
    image: '../../../media/a2/city/hotel.png',
    meaning: 'هتل'
  },
  {
    type: 'speak',
    word: 'kafe',
    image: '../../../media/a2/city/cafe.png',
    meaning: 'کافه'
  },
  {
    type: 'speak',
    word: 'fırın',
    image: '../../../media/a2/city/bakery.png',
    meaning: 'نانوایی'
  },
  {
    type: 'speak',
    word: 'eczane',
    image: '../../../media/a2/city/pharmacy.png',
    meaning: 'داروخانه'
  },
  {
    type: 'speak',
    word: 'kasap',
    image: '../../../media/a2/city/butchery.png',
    meaning: 'قصابی'
  },

  // ===== بخش ۵: BUILD TR (ساخت جمله ترکی) =====
  {
    type: 'build-tr',
    speak: 'Bu bir otel',
    question: 'جمله ترکی را بساز:',
    text: 'این یک هتل است',
    words: ['otel', 'bir', 'Bu'],
    answer: ['Bu', 'bir', 'otel']
  },
  {
    type: 'build-tr',
    speak: 'Bu bir kafe',
    question: 'جمله ترکی را بساز:',
    text: 'این یک کافه است',
    words: ['kafe', 'bir', 'Bu'],
    answer: ['Bu', 'bir', 'kafe']
  },
  {
    type: 'build-tr',
    speak: 'Bu bir fırın',
    question: 'جمله ترکی را بساز:',
    text: 'این یک نانوایی است',
    words: ['fırın', 'bir', 'Bu'],
    answer: ['Bu', 'bir', 'fırın']
  },
  {
    type: 'build-tr',
    speak: 'Bu bir eczane',
    question: 'جمله ترکی را بساز:',
    text: 'این یک داروخانه است',
    words: ['eczane', 'bir', 'Bu'],
    answer: ['Bu', 'bir', 'eczane']
  },
  {
    type: 'build-tr',
    speak: 'Bu bir kasap',
    question: 'جمله ترکی را بساز:',
    text: 'این یک قصابی است',
    words: ['kasap', 'bir', 'Bu'],
    answer: ['Bu', 'bir', 'kasap']
  },

  // ===== بخش ۶: BUILD FA (ترجمه به فارسی) =====
  {
    type: 'build-fa',
    speak: 'Bu bir otel',
    question: 'ترجمه را بساز:',
    text: 'Bu bir otel',
    words: ['است', 'هتل', 'یک', 'این'],
    answer: ['این', 'یک', 'هتل', 'است']
  },
  {
    type: 'build-fa',
    speak: 'Bu bir kafe',
    question: 'ترجمه را بساز:',
    text: 'Bu bir kafe',
    words: ['است', 'کافه', 'یک', 'این'],
    answer: ['این', 'یک', 'کافه', 'است']
  },
  {
    type: 'build-fa',
    speak: 'Bu bir fırın',
    question: 'ترجمه را بساز:',
    text: 'Bu bir fırın',
    words: ['است', 'نانوایی', 'یک', 'این'],
    answer: ['این', 'یک', 'نانوایی', 'است']
  },
  {
    type: 'build-fa',
    speak: 'Bu bir eczane',
    question: 'ترجمه را بساز:',
    text: 'Bu bir eczane',
    words: ['است', 'داروخانه', 'یک', 'این'],
    answer: ['این', 'یک', 'داروخانه', 'است']
  },
  {
    type: 'build-fa',
    speak: 'Bu bir kasap',
    question: 'ترجمه را بساز:',
    text: 'Bu bir kasap',
    words: ['است', 'قصابی', 'یک', 'این'],
    answer: ['این', 'یک', 'قصابی', 'است']
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