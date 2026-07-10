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

// ===== سوالات درس ۴۱ - ترکی به فارسی =====
const questions = [

  // ===== بخش ۱: IMAGE (۵ تا) =====
  {
    type: 'image',
    question: 'کدام تصویر برای "kalp" است؟',
    speak: 'kalp',
    options: [
      { text: 'kalp', image: '../../../media/a2/body/heart.png' },
      { text: 'kemik', image: '../../../media/a2/body/bone.png' },
      { text: 'kas', image: '../../../media/a2/body/muscle.png' },
      { text: 'cilt', image: '../../../media/a2/body/skin.png' }
    ],
    answer: 'kalp'
  },
  {
    type: 'image',
    question: 'کدام تصویر برای "kemik" است؟',
    speak: 'kemik',
    options: [
      { text: 'kan', image: '../../../media/a2/body/blood.png' },
      { text: 'kemik', image: '../../../media/a2/body/bone.png' },
      { text: 'kalp', image: '../../../media/a2/body/heart.png' },
      { text: 'kas', image: '../../../media/a2/body/muscle.png' }
    ],
    answer: 'kemik'
  },
  {
    type: 'image',
    question: 'کدام تصویر برای "kas" است؟',
    speak: 'kas',
    options: [
      { text: 'kalp', image: '../../../media/a2/body/heart.png' },
      { text: 'kas', image: '../../../media/a2/body/muscle.png' },
      { text: 'cilt', image: '../../../media/a2/body/skin.png' },
      { text: 'kemik', image: '../../../media/a2/body/bone.png' }
    ],
    answer: 'kas'
  },
  {
    type: 'image',
    question: 'کدام تصویر برای "cilt" است؟',
    speak: 'cilt',
    options: [
      { text: 'kemik', image: '../../../media/a2/body/bone.png' },
      { text: 'kalp', image: '../../../media/a2/body/heart.png' },
      { text: 'kas', image: '../../../media/a2/body/muscle.png' },
      { text: 'cilt', image: '../../../media/a2/body/skin.png' }
    ],
    answer: 'cilt'
  },
  {
    type: 'image',
    question: 'کدام تصویر برای "kan" است؟',
    speak: 'kan',
    options: [
      { text: 'kan', image: '../../../media/a2/body/blood.png' },
      { text: 'cilt', image: '../../../media/a2/body/skin.png' },
      { text: 'kalp', image: '../../../media/a2/body/heart.png' },
      { text: 'kemik', image: '../../../media/a2/body/bone.png' }
    ],
    answer: 'kan'
  },

  // ===== بخش ۲: WORD (۵ تا) =====
  {
    type: 'word',
    question: 'این تصویر چیست؟',
    image: '../../../media/a2/body/heart.png',
    options: ['kalp', 'kemik', 'kas', 'cilt'],
    answer: 'kalp'
  },
  {
    type: 'word',
    question: 'این تصویر چیست؟',
    image: '../../../media/a2/body/bone.png',
    options: ['kalp', 'kemik', 'kas', 'kan'],
    answer: 'kemik'
  },
  {
    type: 'word',
    question: 'این تصویر چیست؟',
    image: '../../../media/a2/body/muscle.png',
    options: ['kan', 'kalp', 'kas', 'kemik'],
    answer: 'kas'
  },
  {
    type: 'word',
    question: 'این تصویر چیست؟',
    image: '../../../media/a2/body/skin.png',
    options: ['kas', 'kemik', 'cilt', 'kalp'],
    answer: 'cilt'
  },
  {
    type: 'word',
    question: 'این تصویر چیست؟',
    image: '../../../media/a2/body/blood.png',
    options: ['kalp', 'cilt', 'kemik', 'kan'],
    answer: 'kan'
  },

  // ===== بخش ۳: AUDIO (۵ تا) =====
  {
    type: 'audio',
    speak: 'kalp',
    question: 'کدام کلمه را شنیدی؟',
    options: ['kalp', 'kemik', 'kas', 'cilt'],
    answer: 'kalp'
  },
  {
    type: 'audio',
    speak: 'kemik',
    question: 'کدام کلمه را شنیدی؟',
    options: ['kan', 'kemik', 'kalp', 'kas'],
    answer: 'kemik'
  },
  {
    type: 'audio',
    speak: 'kas',
    question: 'کدام کلمه را شنیدی؟',
    options: ['kalp', 'kas', 'cilt', 'kemik'],
    answer: 'kas'
  },
  {
    type: 'audio',
    speak: 'cilt',
    question: 'کدام کلمه را شنیدی؟',
    options: ['kemik', 'kalp', 'kas', 'cilt'],
    answer: 'cilt'
  },
  {
    type: 'audio',
    speak: 'kan',
    question: 'کدام کلمه را شنیدی؟',
    options: ['kan', 'cilt', 'kalp', 'kemik'],
    answer: 'kan'
  },

  // ===== بخش ۴: SPEAK (۵ تا) =====
  {
    type: 'speak',
    word: 'kalp',
    image: '../../../media/a2/body/heart.png',
    meaning: 'قلب'
  },
  {
    type: 'speak',
    word: 'kemik',
    image: '../../../media/a2/body/bone.png',
    meaning: 'استخوان'
  },
  {
    type: 'speak',
    word: 'kas',
    image: '../../../media/a2/body/muscle.png',
    meaning: 'ماهیچه'
  },
  {
    type: 'speak',
    word: 'cilt',
    image: '../../../media/a2/body/skin.png',
    meaning: 'پوست'
  },
  {
    type: 'speak',
    word: 'kan',
    image: '../../../media/a2/body/blood.png',
    meaning: 'خون'
  },

  // ===== بخش ۵: BUILD IT (ساخت جمله ترکی) =====
  {
    type: 'build-it',
    speak: 'Kalp atıyor',
    question: 'جمله ترکی را بساز:',
    text: 'قلب می‌زند',
    words: ['atıyor', 'Kalp'],
    answer: ['Kalp', 'atıyor']
  },
  {
    type: 'build-it',
    speak: 'Kemiklerim ağrıyor',
    question: 'جمله ترکی را بساز:',
    text: 'استخوان‌هایم درد می‌کنند',
    words: ['ağrıyor', 'Kemiklerim'],
    answer: ['Kemiklerim', 'ağrıyor']
  },
  {
    type: 'build-it',
    speak: 'Kaslarım güçlü',
    question: 'جمله ترکی را بساز:',
    text: 'ماهیچه‌هایم قوی هستند',
    words: ['güçlü', 'Kaslarım'],
    answer: ['Kaslarım', 'güçlü']
  },
  {
    type: 'build-it',
    speak: 'Cildim hassas',
    question: 'جمله ترکی را بساز:',
    text: 'پوستم حساس است',
    words: ['hassas', 'Cildim'],
    answer: ['Cildim', 'hassas']
  },
  {
    type: 'build-it',
    speak: 'Kan bağışlıyoruz',
    question: 'جمله ترکی را بساز:',
    text: 'ما خون اهدا می‌کنیم',
    words: ['bağışlıyoruz', 'Kan'],
    answer: ['Kan', 'bağışlıyoruz']
  },

  // ===== بخش ۶: BUILD FA (ترجمه به فارسی) =====
  {
    type: 'build-fa',
    speak: 'Kalp atıyor',
    question: 'ترجمه را بساز:',
    text: 'Kalp atıyor',
    words: ['می‌زند', 'قلب'],
    answer: ['قلب', 'می‌زند']
  },
  {
    type: 'build-fa',
    speak: 'Kemiklerim ağrıyor',
    question: 'ترجمه را بساز:',
    text: 'Kemiklerim ağrıyor',
    words: ['درد می‌کنند', 'استخوان‌هایم'],
    answer: ['استخوان‌هایم', 'درد می‌کنند']
  },
  {
    type: 'build-fa',
    speak: 'Kaslarım güçlü',
    question: 'ترجمه را بساز:',
    text: 'Kaslarım güçlü',
    words: ['هستند', 'قوی', 'ماهیچه‌هایم'],
    answer: ['ماهیچه‌هایم', 'قوی', 'هستند']
  },
  {
    type: 'build-fa',
    speak: 'Cildim hassas',
    question: 'ترجمه را بساز:',
    text: 'Cildim hassas',
    words: ['است', 'حساس', 'پوستم'],
    answer: ['پوستم', 'حساس', 'است']
  },
  {
    type: 'build-fa',
    speak: 'Kan bağışlıyoruz',
    question: 'ترجمه را بساز:',
    text: 'Kan bağışlıyoruz',
    words: ['ما', 'اهدا می‌کنیم', 'خون'],
    answer: ['ما', 'خون', 'اهدا می‌کنیم']
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