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

// ===== سوالات درس ۲۰ - فرانسوی به فارسی =====
const questions = [

  // ===== بخش ۱: IMAGE (۵ تا) =====
  {
    type: 'image',
    question: 'کدام تصویر برای "acteur" است؟',
    speak: 'acteur',
    options: [
      { text: 'actrice', image: '../../../media/a2/jobs/actress.png' },
      { text: 'acteur', image: '../../../media/a2/jobs/actor.png' },
      { text: 'réalisateur', image: '../../../media/a2/jobs/director.png' },
      { text: 'producteur', image: '../../../media/a2/jobs/producer.png' }
    ],
    answer: 'acteur'
  },
  {
    type: 'image',
    question: 'کدام تصویر برای "actrice" است؟',
    speak: 'actrice',
    options: [
      { text: 'acteur', image: '../../../media/a2/jobs/actor.png' },
      { text: 'actrice', image: '../../../media/a2/jobs/actress.png' },
      { text: 'rédacteur', image: '../../../media/a2/jobs/editor.png' },
      { text: 'réalisateur', image: '../../../media/a2/jobs/director.png' }
    ],
    answer: 'actrice'
  },
  {
    type: 'image',
    question: 'کدام تصویر برای "réalisateur" است؟',
    speak: 'réalisateur',
    options: [
      { text: 'producteur', image: '../../../media/a2/jobs/producer.png' },
      { text: 'acteur', image: '../../../media/a2/jobs/actor.png' },
      { text: 'réalisateur', image: '../../../media/a2/jobs/director.png' },
      { text: 'actrice', image: '../../../media/a2/jobs/actress.png' }
    ],
    answer: 'réalisateur'
  },
  {
    type: 'image',
    question: 'کدام تصویر برای "producteur" است؟',
    speak: 'producteur',
    options: [
      { text: 'producteur', image: '../../../media/a2/jobs/producer.png' },
      { text: 'rédacteur', image: '../../../media/a2/jobs/editor.png' },
      { text: 'actrice', image: '../../../media/a2/jobs/actress.png' },
      { text: 'acteur', image: '../../../media/a2/jobs/actor.png' }
    ],
    answer: 'producteur'
  },
  {
    type: 'image',
    question: 'کدام تصویر برای "rédacteur" است؟',
    speak: 'rédacteur',
    options: [
      { text: 'réalisateur', image: '../../../media/a2/jobs/director.png' },
      { text: 'rédacteur', image: '../../../media/a2/jobs/editor.png' },
      { text: 'producteur', image: '../../../media/a2/jobs/producer.png' },
      { text: 'actrice', image: '../../../media/a2/jobs/actress.png' }
    ],
    answer: 'rédacteur'
  },

  // ===== بخش ۲: WORD (۵ تا) =====
  {
    type: 'word',
    question: 'این تصویر چیست؟',
    image: '../../../media/a2/jobs/actor.png',
    options: ['actrice', 'acteur', 'réalisateur', 'producteur'],
    answer: 'acteur'
  },
  {
    type: 'word',
    question: 'این تصویر چیست؟',
    image: '../../../media/a2/jobs/actress.png',
    options: ['acteur', 'actrice', 'rédacteur', 'réalisateur'],
    answer: 'actrice'
  },
  {
    type: 'word',
    question: 'این تصویر چیست؟',
    image: '../../../media/a2/jobs/director.png',
    options: ['producteur', 'acteur', 'réalisateur', 'actrice'],
    answer: 'réalisateur'
  },
  {
    type: 'word',
    question: 'این تصویر چیست؟',
    image: '../../../media/a2/jobs/producer.png',
    options: ['producteur', 'rédacteur', 'actrice', 'acteur'],
    answer: 'producteur'
  },
  {
    type: 'word',
    question: 'این تصویر چیست؟',
    image: '../../../media/a2/jobs/editor.png',
    options: ['réalisateur', 'rédacteur', 'producteur', 'actrice'],
    answer: 'rédacteur'
  },

  // ===== بخش ۳: AUDIO (۵ تا) =====
  {
    type: 'audio',
    speak: 'acteur',
    question: 'کدام کلمه را شنیدی؟',
    options: ['actrice', 'acteur', 'réalisateur', 'producteur'],
    answer: 'acteur'
  },
  {
    type: 'audio',
    speak: 'actrice',
    question: 'کدام کلمه را شنیدی؟',
    options: ['acteur', 'actrice', 'rédacteur', 'réalisateur'],
    answer: 'actrice'
  },
  {
    type: 'audio',
    speak: 'réalisateur',
    question: 'کدام کلمه را شنیدی؟',
    options: ['producteur', 'acteur', 'réalisateur', 'actrice'],
    answer: 'réalisateur'
  },
  {
    type: 'audio',
    speak: 'producteur',
    question: 'کدام کلمه را شنیدی؟',
    options: ['producteur', 'rédacteur', 'actrice', 'acteur'],
    answer: 'producteur'
  },
  {
    type: 'audio',
    speak: 'rédacteur',
    question: 'کدام کلمه را شنیدی؟',
    options: ['réalisateur', 'rédacteur', 'producteur', 'actrice'],
    answer: 'rédacteur'
  },

  // ===== بخش ۴: SPEAK (۵ تا) =====
  {
    type: 'speak',
    word: 'acteur',
    image: '../../../media/a2/jobs/actor.png',
    meaning: 'بازیگر'
  },
  {
    type: 'speak',
    word: 'actrice',
    image: '../../../media/a2/jobs/actress.png',
    meaning: 'بازیگر (زن)'
  },
  {
    type: 'speak',
    word: 'réalisateur',
    image: '../../../media/a2/jobs/director.png',
    meaning: 'کارگردان'
  },
  {
    type: 'speak',
    word: 'producteur',
    image: '../../../media/a2/jobs/producer.png',
    meaning: 'تهیه‌کننده'
  },
  {
    type: 'speak',
    word: 'rédacteur',
    image: '../../../media/a2/jobs/editor.png',
    meaning: 'ویراستار'
  },

  // ===== بخش ۵: BUILD EN (ساخت جمله فرانسوی) =====
  {
    type: 'build-en',
    speak: 'C\'est un acteur',
    question: 'جمله فرانسوی را بساز:',
    text: 'او بازیگر است',
    words: ['acteur', 'un', 'C\'est'],
    answer: ['C\'est', 'un', 'acteur']
  },
  {
    type: 'build-en',
    speak: 'C\'est une actrice',
    question: 'جمله فرانسوی را بساز:',
    text: 'او بازیگر است (زن)',
    words: ['actrice', 'une', 'C\'est'],
    answer: ['C\'est', 'une', 'actrice']
  },
  {
    type: 'build-en',
    speak: 'C\'est un réalisateur',
    question: 'جمله فرانسوی را بساز:',
    text: 'او کارگردان است',
    words: ['réalisateur', 'un', 'C\'est'],
    answer: ['C\'est', 'un', 'réalisateur']
  },
  {
    type: 'build-en',
    speak: 'C\'est un producteur',
    question: 'جمله فرانسوی را بساز:',
    text: 'او تهیه‌کننده است',
    words: ['producteur', 'un', 'C\'est'],
    answer: ['C\'est', 'un', 'producteur']
  },
  {
    type: 'build-en',
    speak: 'C\'est un rédacteur',
    question: 'جمله فرانسوی را بساز:',
    text: 'او ویراستار است',
    words: ['rédacteur', 'un', 'C\'est'],
    answer: ['C\'est', 'un', 'rédacteur']
  },

  // ===== بخش ۶: BUILD FA (ترجمه به فارسی) =====
  {
    type: 'build-fa',
    speak: 'C\'est un acteur',
    question: 'ترجمه را بساز:',
    text: 'C\'est un acteur',
    words: ['است', 'بازیگر', 'او'],
    answer: ['او', 'بازیگر', 'است']
  },
  {
    type: 'build-fa',
    speak: 'C\'est une actrice',
    question: 'ترجمه را بساز:',
    text: 'C\'est une actrice',
    words: ['است', 'بازیگر', 'او'],
    answer: ['او', 'بازیگر', 'است']
  },
  {
    type: 'build-fa',
    speak: 'C\'est un réalisateur',
    question: 'ترجمه را بساز:',
    text: 'C\'est un réalisateur',
    words: ['است', 'کارگردان', 'او'],
    answer: ['او', 'کارگردان', 'است']
  },
  {
    type: 'build-fa',
    speak: 'C\'est un producteur',
    question: 'ترجمه را بساز:',
    text: 'C\'est un producteur',
    words: ['است', 'تهیه‌کننده', 'او'],
    answer: ['او', 'تهیه‌کننده', 'است']
  },
  {
    type: 'build-fa',
    speak: 'C\'est un rédacteur',
    question: 'ترجمه را بساز:',
    text: 'C\'est un rédacteur',
    words: ['است', 'ویراستار', 'او'],
    answer: ['او', 'ویراستار', 'است']
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