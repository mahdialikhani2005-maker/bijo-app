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

// ===== سوالات درس ۶ - ترکی استانبولی به فارسی (مبلمان) =====
const questions = [

  // ===== بخش ۱: IMAGE (۵ تا) =====
  {
    type: 'image',
    question: 'کدام تصویر برای "kanepe" است؟',
    speak: 'kanepe',
    options: [
      { text: 'kanepe', image: '../../../media/a2/house/sofa.png' },
      { text: 'buzdolabı', image: '../../../media/a2/house/fridge.png' },
      { text: 'gardırop', image: '../../../media/a2/house/wardrobe.png' },
      { text: 'ayna', image: '../../../media/a2/house/mirror.png' }
    ],
    answer: 'kanepe'
  },
  {
    type: 'image',
    question: 'کدام تصویر برای "buzdolabı" است؟',
    speak: 'buzdolabı',
    options: [
      { text: 'kanepe', image: '../../../media/a2/house/sofa.png' },
      { text: 'buzdolabı', image: '../../../media/a2/house/fridge.png' },
      { text: 'raf', image: '../../../media/a2/house/shelf.png' },
      { text: 'gardırop', image: '../../../media/a2/house/wardrobe.png' }
    ],
    answer: 'buzdolabı'
  },
  {
    type: 'image',
    question: 'کدام تصویر برای "gardırop" است؟',
    speak: 'gardırop',
    options: [
      { text: 'buzdolabı', image: '../../../media/a2/house/fridge.png' },
      { text: 'kanepe', image: '../../../media/a2/house/sofa.png' },
      { text: 'gardırop', image: '../../../media/a2/house/wardrobe.png' },
      { text: 'raf', image: '../../../media/a2/house/shelf.png' }
    ],
    answer: 'gardırop'
  },
  {
    type: 'image',
    question: 'کدام تصویر برای "ayna" است؟',
    speak: 'ayna',
    options: [
      { text: 'kanepe', image: '../../../media/a2/house/sofa.png' },
      { text: 'ayna', image: '../../../media/a2/house/mirror.png' },
      { text: 'gardırop', image: '../../../media/a2/house/wardrobe.png' },
      { text: 'buzdolabı', image: '../../../media/a2/house/fridge.png' }
    ],
    answer: 'ayna'
  },
  {
    type: 'image',
    question: 'کدام تصویر برای "raf" است؟',
    speak: 'raf',
    options: [
      { text: 'gardırop', image: '../../../media/a2/house/wardrobe.png' },
      { text: 'buzdolabı', image: '../../../media/a2/house/fridge.png' },
      { text: 'raf', image: '../../../media/a2/house/shelf.png' },
      { text: 'kanepe', image: '../../../media/a2/house/sofa.png' }
    ],
    answer: 'raf'
  },

  // ===== بخش ۲: WORD (۵ تا) =====
  {
    type: 'word',
    question: 'این تصویر چیست؟',
    image: '../../../media/a2/house/sofa.png',
    options: ['kanepe', 'buzdolabı', 'gardırop', 'ayna'],
    answer: 'kanepe'
  },
  {
    type: 'word',
    question: 'این تصویر چیست؟',
    image: '../../../media/a2/house/fridge.png',
    options: ['kanepe', 'buzdolabı', 'raf', 'gardırop'],
    answer: 'buzdolabı'
  },
  {
    type: 'word',
    question: 'این تصویر چیست؟',
    image: '../../../media/a2/house/wardrobe.png',
    options: ['buzdolabı', 'kanepe', 'gardırop', 'raf'],
    answer: 'gardırop'
  },
  {
    type: 'word',
    question: 'این تصویر چیست؟',
    image: '../../../media/a2/house/mirror.png',
    options: ['kanepe', 'ayna', 'gardırop', 'buzdolabı'],
    answer: 'ayna'
  },
  {
    type: 'word',
    question: 'این تصویر چیست؟',
    image: '../../../media/a2/house/shelf.png',
    options: ['gardırop', 'buzdolabı', 'raf', 'kanepe'],
    answer: 'raf'
  },

  // ===== بخش ۳: AUDIO (۵ تا) =====
  {
    type: 'audio',
    speak: 'kanepe',
    question: 'کدام کلمه را شنیدی؟',
    options: ['kanepe', 'buzdolabı', 'gardırop', 'ayna'],
    answer: 'kanepe'
  },
  {
    type: 'audio',
    speak: 'buzdolabı',
    question: 'کدام کلمه را شنیدی؟',
    options: ['kanepe', 'buzdolabı', 'raf', 'gardırop'],
    answer: 'buzdolabı'
  },
  {
    type: 'audio',
    speak: 'gardırop',
    question: 'کدام کلمه را شنیدی؟',
    options: ['buzdolabı', 'kanepe', 'gardırop', 'raf'],
    answer: 'gardırop'
  },
  {
    type: 'audio',
    speak: 'ayna',
    question: 'کدام کلمه را شنیدی؟',
    options: ['kanepe', 'ayna', 'gardırop', 'buzdolabı'],
    answer: 'ayna'
  },
  {
    type: 'audio',
    speak: 'raf',
    question: 'کدام کلمه را شنیدی؟',
    options: ['gardırop', 'buzdolabı', 'raf', 'kanepe'],
    answer: 'raf'
  },

  // ===== بخش ۴: SPEAK (۵ تا) =====
  {
    type: 'speak',
    word: 'kanepe',
    image: '../../../media/a2/house/sofa.png',
    meaning: 'مبل'
  },
  {
    type: 'speak',
    word: 'buzdolabı',
    image: '../../../media/a2/house/fridge.png',
    meaning: 'یخچال'
  },
  {
    type: 'speak',
    word: 'gardırop',
    image: '../../../media/a2/house/wardrobe.png',
    meaning: 'کمد لباس'
  },
  {
    type: 'speak',
    word: 'ayna',
    image: '../../../media/a2/house/mirror.png',
    meaning: 'آینه'
  },
  {
    type: 'speak',
    word: 'raf',
    image: '../../../media/a2/house/shelf.png',
    meaning: 'قفسه'
  },

  // ===== بخش ۵: BUILD TR (ساخت جمله ترکی) =====
  {
    type: 'build-tr',
    speak: 'Bu bir kanepe',
    question: 'جمله ترکی را بساز:',
    text: 'این یک مبل است',
    words: ['kanepe', 'bir', 'Bu'],
    answer: ['Bu', 'bir', 'kanepe']
  },
  {
    type: 'build-tr',
    speak: 'Bu bir buzdolabı',
    question: 'جمله ترکی را بساز:',
    text: 'این یک یخچال است',
    words: ['buzdolabı', 'bir', 'Bu'],
    answer: ['Bu', 'bir', 'buzdolabı']
  },
  {
    type: 'build-tr',
    speak: 'Bu bir gardırop',
    question: 'جمله ترکی را بساز:',
    text: 'این یک کمد لباس است',
    words: ['gardırop', 'bir', 'Bu'],
    answer: ['Bu', 'bir', 'gardırop']
  },
  {
    type: 'build-tr',
    speak: 'Bu bir ayna',
    question: 'جمله ترکی را بساز:',
    text: 'این یک آینه است',
    words: ['ayna', 'bir', 'Bu'],
    answer: ['Bu', 'bir', 'ayna']
  },
  {
    type: 'build-tr',
    speak: 'Bu bir raf',
    question: 'جمله ترکی را بساز:',
    text: 'این یک قفسه است',
    words: ['raf', 'bir', 'Bu'],
    answer: ['Bu', 'bir', 'raf']
  },

  // ===== بخش ۶: BUILD FA (ترجمه به فارسی) =====
  {
    type: 'build-fa',
    speak: 'Bu bir kanepe',
    question: 'ترجمه را بساز:',
    text: 'Bu bir kanepe',
    words: ['است', 'مبل', 'یک', 'این'],
    answer: ['این', 'یک', 'مبل', 'است']
  },
  {
    type: 'build-fa',
    speak: 'Bu bir buzdolabı',
    question: 'ترجمه را بساز:',
    text: 'Bu bir buzdolabı',
    words: ['است', 'یخچال', 'یک', 'این'],
    answer: ['این', 'یک', 'یخچال', 'است']
  },
  {
    type: 'build-fa',
    speak: 'Bu bir gardırop',
    question: 'ترجمه را بساز:',
    text: 'Bu bir gardırop',
    words: ['است', 'کمد لباس', 'یک', 'این'],
    answer: ['این', 'یک', 'کمد لباس', 'است']
  },
  {
    type: 'build-fa',
    speak: 'Bu bir ayna',
    question: 'ترجمه را بساز:',
    text: 'Bu bir ayna',
    words: ['است', 'آینه', 'یک', 'این'],
    answer: ['این', 'یک', 'آینه', 'است']
  },
  {
    type: 'build-fa',
    speak: 'Bu bir raf',
    question: 'ترجمه را بساز:',
    text: 'Bu bir raf',
    words: ['است', 'قفسه', 'یک', 'این'],
    answer: ['این', 'یک', 'قفسه', 'است']
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