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

// ===== سوالات درس ۳۹ - فرانسوی به فارسی =====
const questions = [

  // ===== بخش ۱: IMAGE (۵ تا) =====
  {
    type: 'image',
    question: 'کدام تصویر برای "le brouillard" است؟',
    speak: 'le brouillard',
    options: [
      { text: 'le brouillard', image: '../../../media/a2/weather/fog.png' },
      { text: 'la grêle', image: '../../../media/a2/weather/hail.png' },
      { text: 'le flocon de neige', image: '../../../media/a2/weather/snowflake.png' },
      { text: 'l\'éclair', image: '../../../media/a2/weather/lightning.png' }
    ],
    answer: 'le brouillard'
  },
  {
    type: 'image',
    question: 'کدام تصویر برای "la grêle" است؟',
    speak: 'la grêle',
    options: [
      { text: 'le brouillard', image: '../../../media/a2/weather/fog.png' },
      { text: 'la grêle', image: '../../../media/a2/weather/hail.png' },
      { text: 'le tonnerre', image: '../../../media/a2/weather/thunder.png' },
      { text: 'le flocon de neige', image: '../../../media/a2/weather/snowflake.png' }
    ],
    answer: 'la grêle'
  },
  {
    type: 'image',
    question: 'کدام تصویر برای "le flocon de neige" است؟',
    speak: 'le flocon de neige',
    options: [
      { text: 'l\'éclair', image: '../../../media/a2/weather/lightning.png' },
      { text: 'le brouillard', image: '../../../media/a2/weather/fog.png' },
      { text: 'le flocon de neige', image: '../../../media/a2/weather/snowflake.png' },
      { text: 'la grêle', image: '../../../media/a2/weather/hail.png' }
    ],
    answer: 'le flocon de neige'
  },
  {
    type: 'image',
    question: 'کدام تصویر برای "l\'éclair" است؟',
    speak: 'l\'éclair',
    options: [
      { text: 'la grêle', image: '../../../media/a2/weather/hail.png' },
      { text: 'l\'éclair', image: '../../../media/a2/weather/lightning.png' },
      { text: 'le tonnerre', image: '../../../media/a2/weather/thunder.png' },
      { text: 'le brouillard', image: '../../../media/a2/weather/fog.png' }
    ],
    answer: 'l\'éclair'
  },
  {
    type: 'image',
    question: 'کدام تصویر برای "le tonnerre" است؟',
    speak: 'le tonnerre',
    options: [
      { text: 'le brouillard', image: '../../../media/a2/weather/fog.png' },
      { text: 'le flocon de neige', image: '../../../media/a2/weather/snowflake.png' },
      { text: 'le tonnerre', image: '../../../media/a2/weather/thunder.png' },
      { text: 'l\'éclair', image: '../../../media/a2/weather/lightning.png' }
    ],
    answer: 'le tonnerre'
  },

  // ===== بخش ۲: WORD (۵ تا) =====
  {
    type: 'word',
    question: 'این تصویر چیست؟',
    image: '../../../media/a2/weather/fog.png',
    options: ['le brouillard', 'la grêle', 'le flocon de neige', 'l\'éclair'],
    answer: 'le brouillard'
  },
  {
    type: 'word',
    question: 'این تصویر چیست؟',
    image: '../../../media/a2/weather/hail.png',
    options: ['le brouillard', 'la grêle', 'le tonnerre', 'le flocon de neige'],
    answer: 'la grêle'
  },
  {
    type: 'word',
    question: 'این تصویر چیست؟',
    image: '../../../media/a2/weather/snowflake.png',
    options: ['l\'éclair', 'le brouillard', 'le flocon de neige', 'la grêle'],
    answer: 'le flocon de neige'
  },
  {
    type: 'word',
    question: 'این تصویر چیست؟',
    image: '../../../media/a2/weather/lightning.png',
    options: ['la grêle', 'l\'éclair', 'le tonnerre', 'le brouillard'],
    answer: 'l\'éclair'
  },
  {
    type: 'word',
    question: 'این تصویر چیست؟',
    image: '../../../media/a2/weather/thunder.png',
    options: ['le brouillard', 'le flocon de neige', 'le tonnerre', 'l\'éclair'],
    answer: 'le tonnerre'
  },

  // ===== بخش ۳: AUDIO (۵ تا) =====
  {
    type: 'audio',
    speak: 'le brouillard',
    question: 'کدام کلمه را شنیدی؟',
    options: ['le brouillard', 'la grêle', 'le flocon de neige', 'l\'éclair'],
    answer: 'le brouillard'
  },
  {
    type: 'audio',
    speak: 'la grêle',
    question: 'کدام کلمه را شنیدی؟',
    options: ['le brouillard', 'la grêle', 'le tonnerre', 'le flocon de neige'],
    answer: 'la grêle'
  },
  {
    type: 'audio',
    speak: 'le flocon de neige',
    question: 'کدام کلمه را شنیدی؟',
    options: ['l\'éclair', 'le brouillard', 'le flocon de neige', 'la grêle'],
    answer: 'le flocon de neige'
  },
  {
    type: 'audio',
    speak: 'l\'éclair',
    question: 'کدام کلمه را شنیدی؟',
    options: ['la grêle', 'l\'éclair', 'le tonnerre', 'le brouillard'],
    answer: 'l\'éclair'
  },
  {
    type: 'audio',
    speak: 'le tonnerre',
    question: 'کدام کلمه را شنیدی؟',
    options: ['le brouillard', 'le flocon de neige', 'le tonnerre', 'l\'éclair'],
    answer: 'le tonnerre'
  },

  // ===== بخش ۴: SPEAK (۵ تا) =====
  {
    type: 'speak',
    word: 'le brouillard',
    image: '../../../media/a2/weather/fog.png',
    meaning: 'مه'
  },
  {
    type: 'speak',
    word: 'la grêle',
    image: '../../../media/a2/weather/hail.png',
    meaning: 'تگرگ'
  },
  {
    type: 'speak',
    word: 'le flocon de neige',
    image: '../../../media/a2/weather/snowflake.png',
    meaning: 'دانه برف'
  },
  {
    type: 'speak',
    word: 'l\'éclair',
    image: '../../../media/a2/weather/lightning.png',
    meaning: 'صاعقه/برق'
  },
  {
    type: 'speak',
    word: 'le tonnerre',
    image: '../../../media/a2/weather/thunder.png',
    meaning: 'رعد و برق'
  },

  // ===== بخش ۵: BUILD EN (ساخت جمله فرانسوی) =====
  {
    type: 'build-en',
    speak: 'Il y a du brouillard',
    question: 'جمله فرانسوی را بساز:',
    text: 'مه وجود دارد',
    words: ['brouillard', 'du', 'a', 'y', 'Il'],
    answer: ['Il', 'y', 'a', 'du', 'brouillard']
  },
  {
    type: 'build-en',
    speak: 'Il y a de la grêle',
    question: 'جمله فرانسوی را بساز:',
    text: 'تگرگ وجود دارد',
    words: ['grêle', 'la', 'de', 'a', 'y', 'Il'],
    answer: ['Il', 'y', 'a', 'de', 'la', 'grêle']
  },
  {
    type: 'build-en',
    speak: 'Il y a des flocons de neige',
    question: 'جمله فرانسوی را بساز:',
    text: 'دانه‌های برف وجود دارد',
    words: ['neige', 'de', 'flocons', 'des', 'a', 'y', 'Il'],
    answer: ['Il', 'y', 'a', 'des', 'flocons', 'de', 'neige']
  },
  {
    type: 'build-en',
    speak: 'Il y a un éclair',
    question: 'جمله فرانسوی را بساز:',
    text: 'صاعقه وجود دارد',
    words: ['éclair', 'un', 'a', 'y', 'Il'],
    answer: ['Il', 'y', 'a', 'un', 'éclair']
  },
  {
    type: 'build-en',
    speak: 'Il y a du tonnerre',
    question: 'جمله فرانسوی را بساز:',
    text: 'رعد و برق وجود دارد',
    words: ['tonnerre', 'du', 'a', 'y', 'Il'],
    answer: ['Il', 'y', 'a', 'du', 'tonnerre']
  },

  // ===== بخش ۶: BUILD FA (ترجمه به فارسی) =====
  {
    type: 'build-fa',
    speak: 'Il y a du brouillard',
    question: 'ترجمه را بساز:',
    text: 'Il y a du brouillard',
    words: ['است', 'مه', 'وجود', 'آنجا'],
    answer: ['آنجا', 'مه', 'وجود', 'است']
  },
  {
    type: 'build-fa',
    speak: 'Il y a de la grêle',
    question: 'ترجمه را بساز:',
    text: 'Il y a de la grêle',
    words: ['است', 'تگرگ', 'وجود', 'آنجا'],
    answer: ['آنجا', 'تگرگ', 'وجود', 'است']
  },
  {
    type: 'build-fa',
    speak: 'Il y a des flocons de neige',
    question: 'ترجمه را بساز:',
    text: 'Il y a des flocons de neige',
    words: ['است', 'برف', 'دانه‌های', 'وجود', 'آنجا'],
    answer: ['آنجا', 'دانه‌های', 'برف', 'وجود', 'است']
  },
  {
    type: 'build-fa',
    speak: 'Il y a un éclair',
    question: 'ترجمه را بساز:',
    text: 'Il y a un éclair',
    words: ['است', 'صاعقه', 'وجود', 'آنجا'],
    answer: ['آنجا', 'صاعقه', 'وجود', 'است']
  },
  {
    type: 'build-fa',
    speak: 'Il y a du tonnerre',
    question: 'ترجمه را بساز:',
    text: 'Il y a du tonnerre',
    words: ['است', 'رعد و برق', 'وجود', 'آنجا'],
    answer: ['آنجا', 'رعد و برق', 'وجود', 'است']
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