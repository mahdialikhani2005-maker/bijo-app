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

// ===== سوالات درس ۱ - ترکی استانبولی به فارسی (خانواده) =====
const questions = [

  // ===== بخش ۱: IMAGE (۵ تا) =====
  {
    type: 'image',
    question: 'کدام تصویر برای "amca" است؟',
    speak: 'amca',
    options: [
      { text: 'amca', image: '../../../media/a2/family/uncle.png' },
      { text: 'teyze', image: '../../../media/a2/family/aunt.png' },
      { text: 'kuzen', image: '../../../media/a2/family/cousin.png' },
      { text: 'yeğen (erkek)', image: '../../../media/a2/family/nephew.png' }
    ],
    answer: 'amca'
  },
  {
    type: 'image',
    question: 'کدام تصویر برای "teyze" است؟',
    speak: 'teyze',
    options: [
      { text: 'amca', image: '../../../media/a2/family/uncle.png' },
      { text: 'teyze', image: '../../../media/a2/family/aunt.png' },
      { text: 'yeğen (kız)', image: '../../../media/a2/family/niece.png' },
      { text: 'kuzen', image: '../../../media/a2/family/cousin.png' }
    ],
    answer: 'teyze'
  },
  {
    type: 'image',
    question: 'کدام تصویر برای "kuzen" است؟',
    speak: 'kuzen',
    options: [
      { text: 'teyze', image: '../../../media/a2/family/aunt.png' },
      { text: 'amca', image: '../../../media/a2/family/uncle.png' },
      { text: 'kuzen', image: '../../../media/a2/family/cousin.png' },
      { text: 'yeğen (kız)', image: '../../../media/a2/family/niece.png' }
    ],
    answer: 'kuzen'
  },
  {
    type: 'image',
    question: 'کدام تصویر برای "yeğen (erkek)" است؟',
    speak: 'yeğen',
    options: [
      { text: 'teyze', image: '../../../media/a2/family/aunt.png' },
      { text: 'amca', image: '../../../media/a2/family/uncle.png' },
      { text: 'yeğen (erkek)', image: '../../../media/a2/family/nephew.png' },
      { text: 'yeğen (kız)', image: '../../../media/a2/family/niece.png' }
    ],
    answer: 'yeğen (erkek)'
  },
  {
    type: 'image',
    question: 'کدام تصویر برای "yeğen (kız)" است؟',
    speak: 'yeğen',
    options: [
      { text: 'yeğen (kız)', image: '../../../media/a2/family/niece.png' },
      { text: 'amca', image: '../../../media/a2/family/uncle.png' },
      { text: 'kuzen', image: '../../../media/a2/family/cousin.png' },
      { text: 'teyze', image: '../../../media/a2/family/aunt.png' }
    ],
    answer: 'yeğen (kız)'
  },

  // ===== بخش ۲: WORD (۵ تا) =====
  {
    type: 'word',
    question: 'این تصویر چیست؟',
    image: '../../../media/a2/family/uncle.png',
    options: ['amca', 'teyze', 'kuzen', 'yeğen (erkek)'],
    answer: 'amca'
  },
  {
    type: 'word',
    question: 'این تصویر چیست؟',
    image: '../../../media/a2/family/aunt.png',
    options: ['amca', 'teyze', 'yeğen (erkek)', 'yeğen (kız)'],
    answer: 'teyze'
  },
  {
    type: 'word',
    question: 'این تصویر چیست؟',
    image: '../../../media/a2/family/cousin.png',
    options: ['teyze', 'amca', 'kuzen', 'yeğen (kız)'],
    answer: 'kuzen'
  },
  {
    type: 'word',
    question: 'این تصویر چیست؟',
    image: '../../../media/a2/family/nephew.png',
    options: ['teyze', 'amca', 'yeğen (erkek)', 'yeğen (kız)'],
    answer: 'yeğen (erkek)'
  },
  {
    type: 'word',
    question: 'این تصویر چیست؟',
    image: '../../../media/a2/family/niece.png',
    options: ['amca', 'yeğen (kız)', 'kuzen', 'teyze'],
    answer: 'yeğen (kız)'
  },

  // ===== بخش ۳: AUDIO (۵ تا) =====
  {
    type: 'audio',
    speak: 'amca',
    question: 'کدام کلمه را شنیدی؟',
    options: ['amca', 'teyze', 'kuzen', 'yeğen (erkek)'],
    answer: 'amca'
  },
  {
    type: 'audio',
    speak: 'teyze',
    question: 'کدام کلمه را شنیدی؟',
    options: ['amca', 'teyze', 'yeğen (erkek)', 'yeğen (kız)'],
    answer: 'teyze'
  },
  {
    type: 'audio',
    speak: 'kuzen',
    question: 'کدام کلمه را شنیدی؟',
    options: ['teyze', 'amca', 'kuzen', 'yeğen (kız)'],
    answer: 'kuzen'
  },
  {
    type: 'audio',
    speak: 'yeğen (erkek)',
    question: 'کدام کلمه را شنیدی؟',
    options: ['teyze', 'amca', 'yeğen (erkek)', 'yeğen (kız)'],
    answer: 'yeğen (erkek)'
  },
  {
    type: 'audio',
    speak: 'yeğen (kız)',
    question: 'کدام کلمه را شنیدی؟',
    options: ['amca', 'yeğen (kız)', 'kuzen', 'teyze'],
    answer: 'yeğen (kız)'
  },

  // ===== بخش ۴: SPEAK (۵ تا) =====
  {
    type: 'speak',
    word: 'amca',
    image: '../../../media/a2/family/uncle.png',
    meaning: 'عمو / دایی'
  },
  {
    type: 'speak',
    word: 'teyze',
    image: '../../../media/a2/family/aunt.png',
    meaning: 'عمه / خاله'
  },
  {
    type: 'speak',
    word: 'kuzen',
    image: '../../../media/a2/family/cousin.png',
    meaning: 'پسرعمو / دخترعمو'
  },
  {
    type: 'speak',
    word: 'yeğen (erkek)',
    image: '../../../media/a2/family/nephew.png',
    meaning: 'برادرزاده / خواهرزاده (مرد)'
  },
  {
    type: 'speak',
    word: 'yeğen (kız)',
    image: '../../../media/a2/family/niece.png',
    meaning: 'برادرزاده / خواهرزاده (زن)'
  },

  // ===== بخش ۵: BUILD TR (ساخت جمله ترکی) =====
  {
    type: 'build-tr',
    speak: 'O benim amcam',
    question: 'جمله ترکی را بساز:',
    text: 'او عموی من است',
    words: ['benim', 'amcam', 'O'],
    answer: ['O', 'benim', 'amcam']
  },
  {
    type: 'build-tr',
    speak: 'O benim teyzem',
    question: 'جمله ترکی را بساز:',
    text: 'او عمه‌ی من است',
    words: ['benim', 'teyzem', 'O'],
    answer: ['O', 'benim', 'teyzem']
  },
  {
    type: 'build-tr',
    speak: 'O benim kuzenim',
    question: 'جمله ترکی را بساز:',
    text: 'او پسرعموی من است',
    words: ['benim', 'kuzenim', 'O'],
    answer: ['O', 'benim', 'kuzenim']
  },
  {
    type: 'build-tr',
    speak: 'O benim yeğenim',
    question: 'جمله ترکی را بساز:',
    text: 'او برادرزاده‌ی من است',
    words: ['benim', 'yeğenim', 'O'],
    answer: ['O', 'benim', 'yeğenim']
  },
  {
    type: 'build-tr',
    speak: 'O benim yeğenim',
    question: 'جمله ترکی را بساز:',
    text: 'او خواهرزاده‌ی من است',
    words: ['benim', 'yeğenim', 'O'],
    answer: ['O', 'benim', 'yeğenim']
  },

  // ===== بخش ۶: BUILD FA (ترجمه به فارسی) =====
  {
    type: 'build-fa',
    speak: 'O benim amcam',
    question: 'ترجمه را بساز:',
    text: 'O benim amcam',
    words: ['است', 'عموی', 'من', 'او'],
    answer: ['او', 'عموی', 'من', 'است']
  },
  {
    type: 'build-fa',
    speak: 'O benim teyzem',
    question: 'ترجمه را بساز:',
    text: 'O benim teyzem',
    words: ['است', 'عمه‌ی', 'من', 'او'],
    answer: ['او', 'عمه‌ی', 'من', 'است']
  },
  {
    type: 'build-fa',
    speak: 'O benim kuzenim',
    question: 'ترجمه را بساز:',
    text: 'O benim kuzenim',
    words: ['است', 'پسرعموی', 'من', 'او'],
    answer: ['او', 'پسرعموی', 'من', 'است']
  },
  {
    type: 'build-fa',
    speak: 'O benim yeğenim',
    question: 'ترجمه را بساز:',
    text: 'O benim yeğenim',
    words: ['است', 'برادرزاده‌ی', 'من', 'او'],
    answer: ['او', 'برادرزاده‌ی', 'من', 'است']
  },
  {
    type: 'build-fa',
    speak: 'O benim yeğenim',
    question: 'ترجمه را بساز:',
    text: 'O benim yeğenim',
    words: ['است', 'خواهرزاده‌ی', 'من', 'او'],
    answer: ['او', 'خواهرزاده‌ی', 'من', 'است']
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