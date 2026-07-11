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

// ===== سوالات درس ۵۷ - فرانسوی به فارسی =====
const questions = [

  // ===== بخش ۱: IMAGE (۵ تا) =====
  {
    type: 'image',
    question: 'کدام تصویر برای "l\'écran" است؟',
    speak: 'l\'écran',
    options: [
      { text: 'l\'écran', image: '../../../media/a2/tech/screen.png' },
      { text: 'le moniteur', image: '../../../media/a2/tech/monitor.png' },
      { text: 'l\'imprimante', image: '../../../media/a2/tech/printer.png' },
      { text: 'le scanner', image: '../../../media/a2/tech/scanner.png' }
    ],
    answer: 'l\'écran'
  },
  {
    type: 'image',
    question: 'کدام تصویر برای "le moniteur" است؟',
    speak: 'le moniteur',
    options: [
      { text: 'l\'écran', image: '../../../media/a2/tech/screen.png' },
      { text: 'le moniteur', image: '../../../media/a2/tech/monitor.png' },
      { text: 'le haut-parleur', image: '../../../media/a2/tech/speaker.png' },
      { text: 'l\'imprimante', image: '../../../media/a2/tech/printer.png' }
    ],
    answer: 'le moniteur'
  },
  {
    type: 'image',
    question: 'کدام تصویر برای "l\'imprimante" است؟',
    speak: 'l\'imprimante',
    options: [
      { text: 'le scanner', image: '../../../media/a2/tech/scanner.png' },
      { text: 'l\'écran', image: '../../../media/a2/tech/screen.png' },
      { text: 'l\'imprimante', image: '../../../media/a2/tech/printer.png' },
      { text: 'le moniteur', image: '../../../media/a2/tech/monitor.png' }
    ],
    answer: 'l\'imprimante'
  },
  {
    type: 'image',
    question: 'کدام تصویر برای "le scanner" است؟',
    speak: 'le scanner',
    options: [
      { text: 'le moniteur', image: '../../../media/a2/tech/monitor.png' },
      { text: 'le scanner', image: '../../../media/a2/tech/scanner.png' },
      { text: 'le haut-parleur', image: '../../../media/a2/tech/speaker.png' },
      { text: 'l\'écran', image: '../../../media/a2/tech/screen.png' }
    ],
    answer: 'le scanner'
  },
  {
    type: 'image',
    question: 'کدام تصویر برای "le haut-parleur" است؟',
    speak: 'le haut-parleur',
    options: [
      { text: 'l\'écran', image: '../../../media/a2/tech/screen.png' },
      { text: 'l\'imprimante', image: '../../../media/a2/tech/printer.png' },
      { text: 'le haut-parleur', image: '../../../media/a2/tech/speaker.png' },
      { text: 'le scanner', image: '../../../media/a2/tech/scanner.png' }
    ],
    answer: 'le haut-parleur'
  },

  // ===== بخش ۲: WORD (۵ تا) =====
  {
    type: 'word',
    question: 'این تصویر چیست؟',
    image: '../../../media/a2/tech/screen.png',
    options: ['l\'écran', 'le moniteur', 'l\'imprimante', 'le scanner'],
    answer: 'l\'écran'
  },
  {
    type: 'word',
    question: 'این تصویر چیست؟',
    image: '../../../media/a2/tech/monitor.png',
    options: ['l\'écran', 'le moniteur', 'le haut-parleur', 'l\'imprimante'],
    answer: 'le moniteur'
  },
  {
    type: 'word',
    question: 'این تصویر چیست؟',
    image: '../../../media/a2/tech/printer.png',
    options: ['le scanner', 'l\'écran', 'l\'imprimante', 'le moniteur'],
    answer: 'l\'imprimante'
  },
  {
    type: 'word',
    question: 'این تصویر چیست؟',
    image: '../../../media/a2/tech/scanner.png',
    options: ['le moniteur', 'le scanner', 'le haut-parleur', 'l\'écran'],
    answer: 'le scanner'
  },
  {
    type: 'word',
    question: 'این تصویر چیست؟',
    image: '../../../media/a2/tech/speaker.png',
    options: ['l\'écran', 'l\'imprimante', 'le haut-parleur', 'le scanner'],
    answer: 'le haut-parleur'
  },

  // ===== بخش ۳: AUDIO (۵ تا) =====
  {
    type: 'audio',
    speak: 'l\'écran',
    question: 'کدام کلمه را شنیدی؟',
    options: ['l\'écran', 'le moniteur', 'l\'imprimante', 'le scanner'],
    answer: 'l\'écran'
  },
  {
    type: 'audio',
    speak: 'le moniteur',
    question: 'کدام کلمه را شنیدی؟',
    options: ['l\'écran', 'le moniteur', 'le haut-parleur', 'l\'imprimante'],
    answer: 'le moniteur'
  },
  {
    type: 'audio',
    speak: 'l\'imprimante',
    question: 'کدام کلمه را شنیدی؟',
    options: ['le scanner', 'l\'écran', 'l\'imprimante', 'le moniteur'],
    answer: 'l\'imprimante'
  },
  {
    type: 'audio',
    speak: 'le scanner',
    question: 'کدام کلمه را شنیدی؟',
    options: ['le moniteur', 'le scanner', 'le haut-parleur', 'l\'écran'],
    answer: 'le scanner'
  },
  {
    type: 'audio',
    speak: 'le haut-parleur',
    question: 'کدام کلمه را شنیدی؟',
    options: ['l\'écran', 'l\'imprimante', 'le haut-parleur', 'le scanner'],
    answer: 'le haut-parleur'
  },

  // ===== بخش ۴: SPEAK (۵ تا) =====
  {
    type: 'speak',
    word: 'l\'écran',
    image: '../../../media/a2/tech/screen.png',
    meaning: 'صفحه نمایش'
  },
  {
    type: 'speak',
    word: 'le moniteur',
    image: '../../../media/a2/tech/monitor.png',
    meaning: 'مانیتور'
  },
  {
    type: 'speak',
    word: 'l\'imprimante',
    image: '../../../media/a2/tech/printer.png',
    meaning: 'چاپگر'
  },
  {
    type: 'speak',
    word: 'le scanner',
    image: '../../../media/a2/tech/scanner.png',
    meaning: 'اسکنر'
  },
  {
    type: 'speak',
    word: 'le haut-parleur',
    image: '../../../media/a2/tech/speaker.png',
    meaning: 'بلندگو'
  },

  // ===== بخش ۵: BUILD EN (ساخت جمله فرانسوی) =====
  {
    type: 'build-en',
    speak: 'Je vois l\'écran',
    question: 'جمله فرانسوی را بساز:',
    text: 'من صفحه نمایش را می‌بینم',
    words: ['l\'écran', 'vois', 'Je'],
    answer: ['Je', 'vois', 'l\'écran']
  },
  {
    type: 'build-en',
    speak: 'Je vois le moniteur',
    question: 'جمله فرانسوی را بساز:',
    text: 'من مانیتور را می‌بینم',
    words: ['moniteur', 'le', 'vois', 'Je'],
    answer: ['Je', 'vois', 'le', 'moniteur']
  },
  {
    type: 'build-en',
    speak: 'Je vois l\'imprimante',
    question: 'جمله فرانسوی را بساز:',
    text: 'من چاپگر را می‌بینم',
    words: ['l\'imprimante', 'vois', 'Je'],
    answer: ['Je', 'vois', 'l\'imprimante']
  },
  {
    type: 'build-en',
    speak: 'Je vois le scanner',
    question: 'جمله فرانسوی را بساز:',
    text: 'من اسکنر را می‌بینم',
    words: ['scanner', 'le', 'vois', 'Je'],
    answer: ['Je', 'vois', 'le', 'scanner']
  },
  {
    type: 'build-en',
    speak: 'Je vois le haut-parleur',
    question: 'جمله فرانسوی را بساز:',
    text: 'من بلندگو را می‌بینم',
    words: ['haut-parleur', 'le', 'vois', 'Je'],
    answer: ['Je', 'vois', 'le', 'haut-parleur']
  },

  // ===== بخش ۶: BUILD FA (ترجمه به فارسی) =====
  {
    type: 'build-fa',
    speak: 'Je vois l\'écran',
    question: 'ترجمه را بساز:',
    text: 'Je vois l\'écran',
    words: ['می‌بینم', 'صفحه نمایش', 'من'],
    answer: ['من', 'صفحه نمایش', 'می‌بینم']
  },
  {
    type: 'build-fa',
    speak: 'Je vois le moniteur',
    question: 'ترجمه را بساز:',
    text: 'Je vois le moniteur',
    words: ['می‌بینم', 'مانیتور', 'من'],
    answer: ['من', 'مانیتور', 'می‌بینم']
  },
  {
    type: 'build-fa',
    speak: 'Je vois l\'imprimante',
    question: 'ترجمه را بساز:',
    text: 'Je vois l\'imprimante',
    words: ['می‌بینم', 'چاپگر', 'من'],
    answer: ['من', 'چاپگر', 'می‌بینم']
  },
  {
    type: 'build-fa',
    speak: 'Je vois le scanner',
    question: 'ترجمه را بساز:',
    text: 'Je vois le scanner',
    words: ['می‌بینم', 'اسکنر', 'من'],
    answer: ['من', 'اسکنر', 'می‌بینم']
  },
  {
    type: 'build-fa',
    speak: 'Je vois le haut-parleur',
    question: 'ترجمه را بساز:',
    text: 'Je vois le haut-parleur',
    words: ['می‌بینم', 'بلندگو', 'من'],
    answer: ['من', 'بلندگو', 'می‌بینم']
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