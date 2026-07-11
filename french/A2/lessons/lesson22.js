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

// ===== سوالات درس ۲۲ - فرانسوی به فارسی =====
const questions = [

  // ===== بخش ۱: IMAGE (۵ تا) =====
  {
    type: 'image',
    question: 'کدام تصویر برای "pizza" است؟',
    speak: 'pizza',
    options: [
      { text: 'pâtes', image: '../../../media/a2/food/pasta.png' },
      { text: 'pizza', image: '../../../media/a2/food/pizza.png' },
      { text: 'salade', image: '../../../media/a2/food/salad.png' },
      { text: 'sandwich', image: '../../../media/a2/food/sandwich.png' }
    ],
    answer: 'pizza'
  },
  {
    type: 'image',
    question: 'کدام تصویر برای "pâtes" است؟',
    speak: 'pâtes',
    options: [
      { text: 'pizza', image: '../../../media/a2/food/pizza.png' },
      { text: 'pâtes', image: '../../../media/a2/food/pasta.png' },
      { text: 'burger', image: '../../../media/a2/food/burger.png' },
      { text: 'salade', image: '../../../media/a2/food/salad.png' }
    ],
    answer: 'pâtes'
  },
  {
    type: 'image',
    question: 'کدام تصویر برای "salade" است؟',
    speak: 'salade',
    options: [
      { text: 'sandwich', image: '../../../media/a2/food/sandwich.png' },
      { text: 'pizza', image: '../../../media/a2/food/pizza.png' },
      { text: 'salade', image: '../../../media/a2/food/salad.png' },
      { text: 'pâtes', image: '../../../media/a2/food/pasta.png' }
    ],
    answer: 'salade'
  },
  {
    type: 'image',
    question: 'کدام تصویر برای "sandwich" است؟',
    speak: 'sandwich',
    options: [
      { text: 'sandwich', image: '../../../media/a2/food/sandwich.png' },
      { text: 'burger', image: '../../../media/a2/food/burger.png' },
      { text: 'pâtes', image: '../../../media/a2/food/pasta.png' },
      { text: 'pizza', image: '../../../media/a2/food/pizza.png' }
    ],
    answer: 'sandwich'
  },
  {
    type: 'image',
    question: 'کدام تصویر برای "burger" است؟',
    speak: 'burger',
    options: [
      { text: 'salade', image: '../../../media/a2/food/salad.png' },
      { text: 'burger', image: '../../../media/a2/food/burger.png' },
      { text: 'sandwich', image: '../../../media/a2/food/sandwich.png' },
      { text: 'pâtes', image: '../../../media/a2/food/pasta.png' }
    ],
    answer: 'burger'
  },

  // ===== بخش ۲: WORD (۵ تا) =====
  {
    type: 'word',
    question: 'این تصویر چیست؟',
    image: '../../../media/a2/food/pizza.png',
    options: ['pâtes', 'pizza', 'salade', 'sandwich'],
    answer: 'pizza'
  },
  {
    type: 'word',
    question: 'این تصویر چیست؟',
    image: '../../../media/a2/food/pasta.png',
    options: ['pizza', 'pâtes', 'burger', 'salade'],
    answer: 'pâtes'
  },
  {
    type: 'word',
    question: 'این تصویر چیست؟',
    image: '../../../media/a2/food/salad.png',
    options: ['sandwich', 'pizza', 'salade', 'pâtes'],
    answer: 'salade'
  },
  {
    type: 'word',
    question: 'این تصویر چیست؟',
    image: '../../../media/a2/food/sandwich.png',
    options: ['sandwich', 'burger', 'pâtes', 'pizza'],
    answer: 'sandwich'
  },
  {
    type: 'word',
    question: 'این تصویر چیست؟',
    image: '../../../media/a2/food/burger.png',
    options: ['salade', 'burger', 'sandwich', 'pâtes'],
    answer: 'burger'
  },

  // ===== بخش ۳: AUDIO (۵ تا) =====
  {
    type: 'audio',
    speak: 'pizza',
    question: 'کدام کلمه را شنیدی؟',
    options: ['pâtes', 'pizza', 'salade', 'sandwich'],
    answer: 'pizza'
  },
  {
    type: 'audio',
    speak: 'pâtes',
    question: 'کدام کلمه را شنیدی؟',
    options: ['pizza', 'pâtes', 'burger', 'salade'],
    answer: 'pâtes'
  },
  {
    type: 'audio',
    speak: 'salade',
    question: 'کدام کلمه را شنیدی؟',
    options: ['sandwich', 'pizza', 'salade', 'pâtes'],
    answer: 'salade'
  },
  {
    type: 'audio',
    speak: 'sandwich',
    question: 'کدام کلمه را شنیدی؟',
    options: ['sandwich', 'burger', 'pâtes', 'pizza'],
    answer: 'sandwich'
  },
  {
    type: 'audio',
    speak: 'burger',
    question: 'کدام کلمه را شنیدی؟',
    options: ['salade', 'burger', 'sandwich', 'pâtes'],
    answer: 'burger'
  },

  // ===== بخش ۴: SPEAK (۵ تا) =====
  {
    type: 'speak',
    word: 'pizza',
    image: '../../../media/a2/food/pizza.png',
    meaning: 'پیتزا'
  },
  {
    type: 'speak',
    word: 'pâtes',
    image: '../../../media/a2/food/pasta.png',
    meaning: 'پاستا'
  },
  {
    type: 'speak',
    word: 'salade',
    image: '../../../media/a2/food/salad.png',
    meaning: 'سالاد'
  },
  {
    type: 'speak',
    word: 'sandwich',
    image: '../../../media/a2/food/sandwich.png',
    meaning: 'ساندویچ'
  },
  {
    type: 'speak',
    word: 'burger',
    image: '../../../media/a2/food/burger.png',
    meaning: 'برگر'
  },

  // ===== بخش ۵: BUILD EN (ساخت جمله فرانسوی) =====
  {
    type: 'build-en',
    speak: 'C\'est une pizza',
    question: 'جمله فرانسوی را بساز:',
    text: 'این پیتزا است',
    words: ['pizza', 'une', 'C\'est'],
    answer: ['C\'est', 'une', 'pizza']
  },
  {
    type: 'build-en',
    speak: 'Ce sont des pâtes',
    question: 'جمله فرانسوی را بساز:',
    text: 'این پاستا است',
    words: ['pâtes', 'des', 'sont', 'Ce'],
    answer: ['Ce', 'sont', 'des', 'pâtes']
  },
  {
    type: 'build-en',
    speak: 'C\'est une salade',
    question: 'جمله فرانسوی را بساز:',
    text: 'این سالاد است',
    words: ['salade', 'une', 'C\'est'],
    answer: ['C\'est', 'une', 'salade']
  },
  {
    type: 'build-en',
    speak: 'C\'est un sandwich',
    question: 'جمله فرانسوی را بساز:',
    text: 'این ساندویچ است',
    words: ['sandwich', 'un', 'C\'est'],
    answer: ['C\'est', 'un', 'sandwich']
  },
  {
    type: 'build-en',
    speak: 'C\'est un burger',
    question: 'جمله فرانسوی را بساز:',
    text: 'این برگر است',
    words: ['burger', 'un', 'C\'est'],
    answer: ['C\'est', 'un', 'burger']
  },

  // ===== بخش ۶: BUILD FA (ترجمه به فارسی) =====
  {
    type: 'build-fa',
    speak: 'C\'est une pizza',
    question: 'ترجمه را بساز:',
    text: 'C\'est une pizza',
    words: ['است', 'پیتزا', 'این'],
    answer: ['این', 'پیتزا', 'است']
  },
  {
    type: 'build-fa',
    speak: 'Ce sont des pâtes',
    question: 'ترجمه را بساز:',
    text: 'Ce sont des pâtes',
    words: ['است', 'پاستا', 'این'],
    answer: ['این', 'پاستا', 'است']
  },
  {
    type: 'build-fa',
    speak: 'C\'est une salade',
    question: 'ترجمه را بساز:',
    text: 'C\'est une salade',
    words: ['است', 'سالاد', 'این'],
    answer: ['این', 'سالاد', 'است']
  },
  {
    type: 'build-fa',
    speak: 'C\'est un sandwich',
    question: 'ترجمه را بساز:',
    text: 'C\'est un sandwich',
    words: ['است', 'ساندویچ', 'این'],
    answer: ['این', 'ساندویچ', 'است']
  },
  {
    type: 'build-fa',
    speak: 'C\'est un burger',
    question: 'ترجمه را بساز:',
    text: 'C\'est un burger',
    words: ['است', 'برگر', 'این'],
    answer: ['این', 'برگر', 'است']
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