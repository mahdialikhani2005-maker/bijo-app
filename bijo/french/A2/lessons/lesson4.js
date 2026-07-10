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

// ===== سوالات درس ۴ - فرانسوی به فارسی =====
const questions = [

  // ===== بخش ۱: IMAGE (۵ تا) =====
  {
    type: 'image',
    question: 'کدام تصویر برای "marié" است؟',
    speak: 'marié',
    options: [
      { text: 'allié', image: '../../../media/a2/family/inlaw.png' },
      { text: 'marié', image: '../../../media/a2/family/groom.png' },
      { text: 'beau-père', image: '../../../media/a2/family/stepfather.png' },
      { text: 'belle-mère', image: '../../../media/a2/family/stepmother.png' }
    ],
    answer: 'marié'
  },
  {
    type: 'image',
    question: 'کدام تصویر برای "allié" است؟',
    speak: 'allié',
    options: [
      { text: 'marié', image: '../../../media/a2/family/groom.png' },
      { text: 'allié', image: '../../../media/a2/family/inlaw.png' },
      { text: 'demi-sœur', image: '../../../media/a2/family/stepsister.png' },
      { text: 'beau-père', image: '../../../media/a2/family/stepfather.png' }
    ],
    answer: 'allié'
  },
  {
    type: 'image',
    question: 'کدام تصویر برای "beau-père" است؟',
    speak: 'beau-père',
    options: [
      { text: 'belle-mère', image: '../../../media/a2/family/stepmother.png' },
      { text: 'marié', image: '../../../media/a2/family/groom.png' },
      { text: 'beau-père', image: '../../../media/a2/family/stepfather.png' },
      { text: 'allié', image: '../../../media/a2/family/inlaw.png' }
    ],
    answer: 'beau-père'
  },
  {
    type: 'image',
    question: 'کدام تصویر برای "belle-mère" است؟',
    speak: 'belle-mère',
    options: [
      { text: 'belle-mère', image: '../../../media/a2/family/stepmother.png' },
      { text: 'demi-sœur', image: '../../../media/a2/family/stepsister.png' },
      { text: 'allié', image: '../../../media/a2/family/inlaw.png' },
      { text: 'marié', image: '../../../media/a2/family/groom.png' }
    ],
    answer: 'belle-mère'
  },
  {
    type: 'image',
    question: 'کدام تصویر برای "demi-sœur" است؟',
    speak: 'demi-sœur',
    options: [
      { text: 'beau-père', image: '../../../media/a2/family/stepfather.png' },
      { text: 'demi-sœur', image: '../../../media/a2/family/stepsister.png' },
      { text: 'belle-mère', image: '../../../media/a2/family/stepmother.png' },
      { text: 'allié', image: '../../../media/a2/family/inlaw.png' }
    ],
    answer: 'demi-sœur'
  },

  // ===== بخش ۲: WORD (۵ تا) =====
  {
    type: 'word',
    question: 'این تصویر چیست؟',
    image: '../../../media/a2/family/groom.png',
    options: ['allié', 'marié', 'beau-père', 'belle-mère'],
    answer: 'marié'
  },
  {
    type: 'word',
    question: 'این تصویر چیست؟',
    image: '../../../media/a2/family/inlaw.png',
    options: ['marié', 'allié', 'demi-sœur', 'beau-père'],
    answer: 'allié'
  },
  {
    type: 'word',
    question: 'این تصویر چیست؟',
    image: '../../../media/a2/family/stepfather.png',
    options: ['belle-mère', 'marié', 'beau-père', 'allié'],
    answer: 'beau-père'
  },
  {
    type: 'word',
    question: 'این تصویر چیست؟',
    image: '../../../media/a2/family/stepmother.png',
    options: ['belle-mère', 'demi-sœur', 'allié', 'marié'],
    answer: 'belle-mère'
  },
  {
    type: 'word',
    question: 'این تصویر چیست؟',
    image: '../../../media/a2/family/stepsister.png',
    options: ['beau-père', 'demi-sœur', 'belle-mère', 'allié'],
    answer: 'demi-sœur'
  },

  // ===== بخش ۳: AUDIO (۵ تا) =====
  {
    type: 'audio',
    speak: 'marié',
    question: 'کدام کلمه را شنیدی؟',
    options: ['allié', 'marié', 'beau-père', 'belle-mère'],
    answer: 'marié'
  },
  {
    type: 'audio',
    speak: 'allié',
    question: 'کدام کلمه را شنیدی؟',
    options: ['marié', 'allié', 'demi-sœur', 'beau-père'],
    answer: 'allié'
  },
  {
    type: 'audio',
    speak: 'beau-père',
    question: 'کدام کلمه را شنیدی؟',
    options: ['belle-mère', 'marié', 'beau-père', 'allié'],
    answer: 'beau-père'
  },
  {
    type: 'audio',
    speak: 'belle-mère',
    question: 'کدام کلمه را شنیدی؟',
    options: ['belle-mère', 'demi-sœur', 'allié', 'marié'],
    answer: 'belle-mère'
  },
  {
    type: 'audio',
    speak: 'demi-sœur',
    question: 'کدام کلمه را شنیدی؟',
    options: ['beau-père', 'demi-sœur', 'belle-mère', 'allié'],
    answer: 'demi-sœur'
  },

  // ===== بخش ۴: SPEAK (۵ تا) =====
  {
    type: 'speak',
    word: 'marié',
    image: '../../../media/a2/family/groom.png',
    meaning: 'داماد'
  },
  {
    type: 'speak',
    word: 'allié',
    image: '../../../media/a2/family/inlaw.png',
    meaning: 'خویشاوند سببی'
  },
  {
    type: 'speak',
    word: 'beau-père',
    image: '../../../media/a2/family/stepfather.png',
    meaning: 'پدرخوانده'
  },
  {
    type: 'speak',
    word: 'belle-mère',
    image: '../../../media/a2/family/stepmother.png',
    meaning: 'مادرخوانده'
  },
  {
    type: 'speak',
    word: 'demi-sœur',
    image: '../../../media/a2/family/stepsister.png',
    meaning: 'خواهر ناتنی'
  },

  // ===== بخش ۵: BUILD EN (ساخت جمله فرانسوی) =====
  {
    type: 'build-en',
    speak: 'C\'est un marié',
    question: 'جمله فرانسوی را بساز:',
    text: 'او داماد است',
    words: ['marié', 'un', 'C\'est'],
    answer: ['C\'est', 'un', 'marié']
  },
  {
    type: 'build-en',
    speak: 'C\'est mon allié',
    question: 'جمله فرانسوی را بساز:',
    text: 'او خویشاوند سببی من است',
    words: ['allié', 'mon', 'C\'est'],
    answer: ['C\'est', 'mon', 'allié']
  },
  {
    type: 'build-en',
    speak: 'C\'est mon beau-père',
    question: 'جمله فرانسوی را بساز:',
    text: 'او پدرخوانده من است',
    words: ['beau-père', 'mon', 'C\'est'],
    answer: ['C\'est', 'mon', 'beau-père']
  },
  {
    type: 'build-en',
    speak: 'C\'est ma belle-mère',
    question: 'جمله فرانسوی را بساز:',
    text: 'او مادرخوانده من است',
    words: ['belle-mère', 'ma', 'C\'est'],
    answer: ['C\'est', 'ma', 'belle-mère']
  },
  {
    type: 'build-en',
    speak: 'C\'est ma demi-sœur',
    question: 'جمله فرانسوی را بساز:',
    text: 'او خواهر ناتنی من است',
    words: ['demi-sœur', 'ma', 'C\'est'],
    answer: ['C\'est', 'ma', 'demi-sœur']
  },

  // ===== بخش ۶: BUILD FA (ترجمه به فارسی) =====
  {
    type: 'build-fa',
    speak: 'C\'est un marié',
    question: 'ترجمه را بساز:',
    text: 'C\'est un marié',
    words: ['است', 'داماد', 'او'],
    answer: ['او', 'داماد', 'است']
  },
  {
    type: 'build-fa',
    speak: 'C\'est mon allié',
    question: 'ترجمه را بساز:',
    text: 'C\'est mon allié',
    words: ['است', 'خویشاوند سببی', 'او', 'من'],
    answer: ['او', 'خویشاوند سببی', 'من', 'است']
  },
  {
    type: 'build-fa',
    speak: 'C\'est mon beau-père',
    question: 'ترجمه را بساز:',
    text: 'C\'est mon beau-père',
    words: ['است', 'پدرخوانده', 'او', 'من'],
    answer: ['او', 'پدرخوانده', 'من', 'است']
  },
  {
    type: 'build-fa',
    speak: 'C\'est ma belle-mère',
    question: 'ترجمه را بساز:',
    text: 'C\'est ma belle-mère',
    words: ['است', 'مادرخوانده', 'او', 'من'],
    answer: ['او', 'مادرخوانده', 'من', 'است']
  },
  {
    type: 'build-fa',
    speak: 'C\'est ma demi-sœur',
    question: 'ترجمه را بساز:',
    text: 'C\'est ma demi-sœur',
    words: ['است', 'خواهر ناتنی', 'او', 'من'],
    answer: ['او', 'خواهر ناتنی', 'من', 'است']
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