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

// ===== سوالات درس ۲۴ - فرانسوی به فارسی =====
const questions = [

  // ===== بخش ۱: IMAGE (۵ تا) =====
  {
    type: 'image',
    question: 'کدام تصویر برای "beurre" است؟',
    speak: 'beurre',
    options: [
      { text: 'fromage', image: '../../../media/a2/food/cheese.png' },
      { text: 'beurre', image: '../../../media/a2/food/butter.png' },
      { text: 'crème', image: '../../../media/a2/food/cream.png' },
      { text: 'yaourt', image: '../../../media/a2/food/yogurt.png' }
    ],
    answer: 'beurre'
  },
  {
    type: 'image',
    question: 'کدام تصویر برای "fromage" است؟',
    speak: 'fromage',
    options: [
      { text: 'beurre', image: '../../../media/a2/food/butter.png' },
      { text: 'fromage', image: '../../../media/a2/food/cheese.png' },
      { text: 'glace', image: '../../../media/a2/food/icecream.png' },
      { text: 'crème', image: '../../../media/a2/food/cream.png' }
    ],
    answer: 'fromage'
  },
  {
    type: 'image',
    question: 'کدام تصویر برای "crème" است؟',
    speak: 'crème',
    options: [
      { text: 'yaourt', image: '../../../media/a2/food/yogurt.png' },
      { text: 'beurre', image: '../../../media/a2/food/butter.png' },
      { text: 'crème', image: '../../../media/a2/food/cream.png' },
      { text: 'fromage', image: '../../../media/a2/food/cheese.png' }
    ],
    answer: 'crème'
  },
  {
    type: 'image',
    question: 'کدام تصویر برای "yaourt" است؟',
    speak: 'yaourt',
    options: [
      { text: 'yaourt', image: '../../../media/a2/food/yogurt.png' },
      { text: 'glace', image: '../../../media/a2/food/icecream.png' },
      { text: 'fromage', image: '../../../media/a2/food/cheese.png' },
      { text: 'beurre', image: '../../../media/a2/food/butter.png' }
    ],
    answer: 'yaourt'
  },
  {
    type: 'image',
    question: 'کدام تصویر برای "glace" است؟',
    speak: 'glace',
    options: [
      { text: 'crème', image: '../../../media/a2/food/cream.png' },
      { text: 'glace', image: '../../../media/a2/food/icecream.png' },
      { text: 'yaourt', image: '../../../media/a2/food/yogurt.png' },
      { text: 'fromage', image: '../../../media/a2/food/cheese.png' }
    ],
    answer: 'glace'
  },

  // ===== بخش ۲: WORD (۵ تا) =====
  {
    type: 'word',
    question: 'این تصویر چیست؟',
    image: '../../../media/a2/food/butter.png',
    options: ['fromage', 'beurre', 'crème', 'yaourt'],
    answer: 'beurre'
  },
  {
    type: 'word',
    question: 'این تصویر چیست؟',
    image: '../../../media/a2/food/cheese.png',
    options: ['beurre', 'fromage', 'glace', 'crème'],
    answer: 'fromage'
  },
  {
    type: 'word',
    question: 'این تصویر چیست؟',
    image: '../../../media/a2/food/cream.png',
    options: ['yaourt', 'beurre', 'crème', 'fromage'],
    answer: 'crème'
  },
  {
    type: 'word',
    question: 'این تصویر چیست؟',
    image: '../../../media/a2/food/yogurt.png',
    options: ['yaourt', 'glace', 'fromage', 'beurre'],
    answer: 'yaourt'
  },
  {
    type: 'word',
    question: 'این تصویر چیست؟',
    image: '../../../media/a2/food/icecream.png',
    options: ['crème', 'glace', 'yaourt', 'fromage'],
    answer: 'glace'
  },

  // ===== بخش ۳: AUDIO (۵ تا) =====
  {
    type: 'audio',
    speak: 'beurre',
    question: 'کدام کلمه را شنیدی؟',
    options: ['fromage', 'beurre', 'crème', 'yaourt'],
    answer: 'beurre'
  },
  {
    type: 'audio',
    speak: 'fromage',
    question: 'کدام کلمه را شنیدی؟',
    options: ['beurre', 'fromage', 'glace', 'crème'],
    answer: 'fromage'
  },
  {
    type: 'audio',
    speak: 'crème',
    question: 'کدام کلمه را شنیدی؟',
    options: ['yaourt', 'beurre', 'crème', 'fromage'],
    answer: 'crème'
  },
  {
    type: 'audio',
    speak: 'yaourt',
    question: 'کدام کلمه را شنیدی؟',
    options: ['yaourt', 'glace', 'fromage', 'beurre'],
    answer: 'yaourt'
  },
  {
    type: 'audio',
    speak: 'glace',
    question: 'کدام کلمه را شنیدی؟',
    options: ['crème', 'glace', 'yaourt', 'fromage'],
    answer: 'glace'
  },

  // ===== بخش ۴: SPEAK (۵ تا) =====
  {
    type: 'speak',
    word: 'beurre',
    image: '../../../media/a2/food/butter.png',
    meaning: 'کره'
  },
  {
    type: 'speak',
    word: 'fromage',
    image: '../../../media/a2/food/cheese.png',
    meaning: 'پنیر'
  },
  {
    type: 'speak',
    word: 'crème',
    image: '../../../media/a2/food/cream.png',
    meaning: 'خامه'
  },
  {
    type: 'speak',
    word: 'yaourt',
    image: '../../../media/a2/food/yogurt.png',
    meaning: 'ماست'
  },
  {
    type: 'speak',
    word: 'glace',
    image: '../../../media/a2/food/icecream.png',
    meaning: 'بستنی'
  },

  // ===== بخش ۵: BUILD EN (ساخت جمله فرانسوی) =====
  {
    type: 'build-en',
    speak: 'C\'est du beurre',
    question: 'جمله فرانسوی را بساز:',
    text: 'این کره است',
    words: ['beurre', 'du', 'C\'est'],
    answer: ['C\'est', 'du', 'beurre']
  },
  {
    type: 'build-en',
    speak: 'C\'est du fromage',
    question: 'جمله فرانسوی را بساز:',
    text: 'این پنیر است',
    words: ['fromage', 'du', 'C\'est'],
    answer: ['C\'est', 'du', 'fromage']
  },
  {
    type: 'build-en',
    speak: 'C\'est de la crème',
    question: 'جمله فرانسوی را بساز:',
    text: 'این خامه است',
    words: ['crème', 'la', 'de', 'C\'est'],
    answer: ['C\'est', 'de', 'la', 'crème']
  },
  {
    type: 'build-en',
    speak: 'C\'est du yaourt',
    question: 'جمله فرانسوی را بساز:',
    text: 'این ماست است',
    words: ['yaourt', 'du', 'C\'est'],
    answer: ['C\'est', 'du', 'yaourt']
  },
  {
    type: 'build-en',
    speak: 'C\'est une glace',
    question: 'جمله فرانسوی را بساز:',
    text: 'این بستنی است',
    words: ['glace', 'une', 'C\'est'],
    answer: ['C\'est', 'une', 'glace']
  },

  // ===== بخش ۶: BUILD FA (ترجمه به فارسی) =====
  {
    type: 'build-fa',
    speak: 'C\'est du beurre',
    question: 'ترجمه را بساز:',
    text: 'C\'est du beurre',
    words: ['است', 'کره', 'این'],
    answer: ['این', 'کره', 'است']
  },
  {
    type: 'build-fa',
    speak: 'C\'est du fromage',
    question: 'ترجمه را بساز:',
    text: 'C\'est du fromage',
    words: ['است', 'پنیر', 'این'],
    answer: ['این', 'پنیر', 'است']
  },
  {
    type: 'build-fa',
    speak: 'C\'est de la crème',
    question: 'ترجمه را بساز:',
    text: 'C\'est de la crème',
    words: ['است', 'خامه', 'این'],
    answer: ['این', 'خامه', 'است']
  },
  {
    type: 'build-fa',
    speak: 'C\'est du yaourt',
    question: 'ترجمه را بساز:',
    text: 'C\'est du yaourt',
    words: ['است', 'ماست', 'این'],
    answer: ['این', 'ماست', 'است']
  },
  {
    type: 'build-fa',
    speak: 'C\'est une glace',
    question: 'ترجمه را بساز:',
    text: 'C\'est une glace',
    words: ['است', 'بستنی', 'این'],
    answer: ['این', 'بستنی', 'است']
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