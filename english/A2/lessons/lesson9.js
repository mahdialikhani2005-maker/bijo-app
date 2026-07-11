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

// ===== سوالات درس ۹ =====
const questions = [

  // ===== بخش ۱: IMAGE (۵ تا) =====
  {
    type: 'image',
    question: 'kettle کدام است؟',
    speak: 'kettle',
    options: [
      { text: 'toaster', image: '../../../media/a2/house/toaster.png' },
      { text: 'kettle', image: '../../../media/a2/house/kettle.png' },
      { text: 'blender', image: '../../../media/a2/house/blender.png' },
      { text: 'microwave', image: '../../../media/a2/house/microwave.png' }
    ],
    answer: 'kettle'
  },
  {
    type: 'image',
    question: 'toaster کدام است؟',
    speak: 'toaster',
    options: [
      { text: 'microwave', image: '../../../media/a2/house/microwave.png' },
      { text: 'toaster', image: '../../../media/a2/house/toaster.png' },
      { text: 'dishwasher', image: '../../../media/a2/house/dishwasher.png' },
      { text: 'kettle', image: '../../../media/a2/house/kettle.png' }
    ],
    answer: 'toaster'
  },
  {
    type: 'image',
    question: 'blender کدام است؟',
    speak: 'blender',
    options: [
      { text: 'kettle', image: '../../../media/a2/house/kettle.png' },
      { text: 'blender', image: '../../../media/a2/house/blender.png' },
      { text: 'dishwasher', image: '../../../media/a2/house/dishwasher.png' },
      { text: 'toaster', image: '../../../media/a2/house/toaster.png' }
    ],
    answer: 'blender'
  },
  {
    type: 'image',
    question: 'microwave کدام است؟',
    speak: 'microwave',
    options: [
      { text: 'microwave', image: '../../../media/a2/house/microwave.png' },
      { text: 'toaster', image: '../../../media/a2/house/toaster.png' },
      { text: 'kettle', image: '../../../media/a2/house/kettle.png' },
      { text: 'blender', image: '../../../media/a2/house/blender.png' }
    ],
    answer: 'microwave'
  },
  {
    type: 'image',
    question: 'dishwasher کدام است؟',
    speak: 'dishwasher',
    options: [
      { text: 'blender', image: '../../../media/a2/house/blender.png' },
      { text: 'kettle', image: '../../../media/a2/house/kettle.png' },
      { text: 'dishwasher', image: '../../../media/a2/house/dishwasher.png' },
      { text: 'toaster', image: '../../../media/a2/house/toaster.png' }
    ],
    answer: 'dishwasher'
  },

  // ===== بخش ۲: WORD (۵ تا) =====
  {
    type: 'word',
    question: 'این تصویر چیست؟',
    image: '../../../media/a2/house/kettle.png',
    options: ['toaster', 'kettle', 'blender', 'microwave'],
    answer: 'kettle'
  },
  {
    type: 'word',
    question: 'این تصویر چیست؟',
    image: '../../../media/a2/house/toaster.png',
    options: ['microwave', 'toaster', 'dishwasher', 'kettle'],
    answer: 'toaster'
  },
  {
    type: 'word',
    question: 'این تصویر چیست؟',
    image: '../../../media/a2/house/blender.png',
    options: ['kettle', 'blender', 'dishwasher', 'toaster'],
    answer: 'blender'
  },
  {
    type: 'word',
    question: 'این تصویر چیست؟',
    image: '../../../media/a2/house/microwave.png',
    options: ['microwave', 'toaster', 'kettle', 'blender'],
    answer: 'microwave'
  },
  {
    type: 'word',
    question: 'این تصویر چیست؟',
    image: '../../../media/a2/house/dishwasher.png',
    options: ['blender', 'kettle', 'dishwasher', 'toaster'],
    answer: 'dishwasher'
  },

  // ===== بخش ۳: AUDIO (۵ تا) =====
  {
    type: 'audio',
    speak: 'kettle',
    question: 'کدام کلمه را شنیدی؟',
    options: ['kettle', 'toaster', 'blender', 'microwave'],
    answer: 'kettle'
  },
  {
    type: 'audio',
    speak: 'toaster',
    question: 'کدام کلمه را شنیدی؟',
    options: ['microwave', 'toaster', 'dishwasher', 'kettle'],
    answer: 'toaster'
  },
  {
    type: 'audio',
    speak: 'blender',
    question: 'کدام کلمه را شنیدی؟',
    options: ['kettle', 'blender', 'dishwasher', 'toaster'],
    answer: 'blender'
  },
  {
    type: 'audio',
    speak: 'microwave',
    question: 'کدام کلمه را شنیدی؟',
    options: ['microwave', 'toaster', 'kettle', 'blender'],
    answer: 'microwave'
  },
  {
    type: 'audio',
    speak: 'dishwasher',
    question: 'کدام کلمه را شنیدی؟',
    options: ['blender', 'kettle', 'dishwasher', 'toaster'],
    answer: 'dishwasher'
  },

  // ===== بخش ۴: SPEAK (۵ تا) =====
  {
    type: 'speak',
    word: 'kettle',
    image: '../../../media/a2/house/kettle.png',
    meaning: 'کتری'
  },
  {
    type: 'speak',
    word: 'toaster',
    image: '../../../media/a2/house/toaster.png',
    meaning: 'توستر'
  },
  {
    type: 'speak',
    word: 'blender',
    image: '../../../media/a2/house/blender.png',
    meaning: 'مخلوط‌کن'
  },
  {
    type: 'speak',
    word: 'microwave',
    image: '../../../media/a2/house/microwave.png',
    meaning: 'مایکروویو'
  },
  {
    type: 'speak',
    word: 'dishwasher',
    image: '../../../media/a2/house/dishwasher.png',
    meaning: 'ماشین ظرفشویی'
  },

  // ===== بخش ۵: BUILD EN (۵ تا) =====
  {
    type: 'build-en',
    speak: 'This is a kettle',
    question: 'جمله انگلیسی را بساز:',
    text: 'این یک کتری است',
    words: ['kettle', 'a', 'is', 'This'],
    answer: ['This', 'is', 'a', 'kettle']
  },
  {
    type: 'build-en',
    speak: 'This is a toaster',
    question: 'جمله انگلیسی را بساز:',
    text: 'این یک توستر است',
    words: ['toaster', 'a', 'is', 'This'],
    answer: ['This', 'is', 'a', 'toaster']
  },
  {
    type: 'build-en',
    speak: 'This is a blender',
    question: 'جمله انگلیسی را بساز:',
    text: 'این یک مخلوط‌کن است',
    words: ['blender', 'a', 'is', 'This'],
    answer: ['This', 'is', 'a', 'blender']
  },
  {
    type: 'build-en',
    speak: 'This is a microwave',
    question: 'جمله انگلیسی را بساز:',
    text: 'این یک مایکروویو است',
    words: ['microwave', 'a', 'is', 'This'],
    answer: ['This', 'is', 'a', 'microwave']
  },
  {
    type: 'build-en',
    speak: 'This is a dishwasher',
    question: 'جمله انگلیسی را بساز:',
    text: 'این یک ماشین ظرفشویی است',
    words: ['dishwasher', 'a', 'is', 'This'],
    answer: ['This', 'is', 'a', 'dishwasher']
  },

  // ===== بخش ۶: BUILD FA (۵ تا) =====
  {
    type: 'build-fa',
    speak: 'This is a kettle',
    question: 'ترجمه را بساز:',
    text: 'This is a kettle',
    words: ['است', 'کتری', 'یک', 'این'],
    answer: ['این', 'یک', 'کتری', 'است']
  },
  {
    type: 'build-fa',
    speak: 'This is a toaster',
    question: 'ترجمه را بساز:',
    text: 'This is a toaster',
    words: ['است', 'توستر', 'یک', 'این'],
    answer: ['این', 'یک', 'توستر', 'است']
  },
  {
    type: 'build-fa',
    speak: 'This is a blender',
    question: 'ترجمه را بساز:',
    text: 'This is a blender',
    words: ['است', 'مخلوط‌کن', 'یک', 'این'],
    answer: ['این', 'یک', 'مخلوط‌کن', 'است']
  },
  {
    type: 'build-fa',
    speak: 'This is a microwave',
    question: 'ترجمه را بساز:',
    text: 'This is a microwave',
    words: ['است', 'مایکروویو', 'یک', 'این'],
    answer: ['این', 'یک', 'مایکروویو', 'است']
  },
  {
    type: 'build-fa',
    speak: 'This is a dishwasher',
    question: 'ترجمه را بساز:',
    text: 'This is a dishwasher',
    words: ['است', 'ماشین', 'ظرفشویی', 'یک', 'این'],
    answer: ['این', 'یک', 'ماشین', 'ظرفشویی', 'است']
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