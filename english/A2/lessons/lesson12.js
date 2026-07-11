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

// ===== سوالات درس ۱۲ =====
const questions = [

  // ===== بخش ۱: IMAGE (۵ تا) =====
  {
    type: 'image',
    question: 'hotel کدام است؟',
    speak: 'hotel',
    options: [
      { text: 'café', image: '../../../media/a2/city/cafe.png' },
      { text: 'hotel', image: '../../../media/a2/city/hotel.png' },
      { text: 'bakery', image: '../../../media/a2/city/bakery.png' },
      { text: 'pharmacy', image: '../../../media/a2/city/pharmacy.png' }
    ],
    answer: 'hotel'
  },
  {
    type: 'image',
    question: 'café کدام است؟',
    speak: 'café',
    options: [
      { text: 'pharmacy', image: '../../../media/a2/city/pharmacy.png' },
      { text: 'café', image: '../../../media/a2/city/cafe.png' },
      { text: 'butchery', image: '../../../media/a2/city/butchery.png' },
      { text: 'hotel', image: '../../../media/a2/city/hotel.png' }
    ],
    answer: 'café'
  },
  {
    type: 'image',
    question: 'bakery کدام است؟',
    speak: 'bakery',
    options: [
      { text: 'hotel', image: '../../../media/a2/city/hotel.png' },
      { text: 'bakery', image: '../../../media/a2/city/bakery.png' },
      { text: 'butchery', image: '../../../media/a2/city/butchery.png' },
      { text: 'café', image: '../../../media/a2/city/cafe.png' }
    ],
    answer: 'bakery'
  },
  {
    type: 'image',
    question: 'pharmacy کدام است؟',
    speak: 'pharmacy',
    options: [
      { text: 'pharmacy', image: '../../../media/a2/city/pharmacy.png' },
      { text: 'café', image: '../../../media/a2/city/cafe.png' },
      { text: 'hotel', image: '../../../media/a2/city/hotel.png' },
      { text: 'bakery', image: '../../../media/a2/city/bakery.png' }
    ],
    answer: 'pharmacy'
  },
  {
    type: 'image',
    question: 'butchery کدام است؟',
    speak: 'butchery',
    options: [
      { text: 'bakery', image: '../../../media/a2/city/bakery.png' },
      { text: 'hotel', image: '../../../media/a2/city/hotel.png' },
      { text: 'butchery', image: '../../../media/a2/city/butchery.png' },
      { text: 'café', image: '../../../media/a2/city/cafe.png' }
    ],
    answer: 'butchery'
  },

  // ===== بخش ۲: WORD (۵ تا) =====
  {
    type: 'word',
    question: 'این تصویر چیست؟',
    image: '../../../media/a2/city/hotel.png',
    options: ['café', 'hotel', 'bakery', 'pharmacy'],
    answer: 'hotel'
  },
  {
    type: 'word',
    question: 'این تصویر چیست؟',
    image: '../../../media/a2/city/cafe.png',
    options: ['pharmacy', 'café', 'butchery', 'hotel'],
    answer: 'café'
  },
  {
    type: 'word',
    question: 'این تصویر چیست؟',
    image: '../../../media/a2/city/bakery.png',
    options: ['hotel', 'bakery', 'butchery', 'café'],
    answer: 'bakery'
  },
  {
    type: 'word',
    question: 'این تصویر چیست؟',
    image: '../../../media/a2/city/pharmacy.png',
    options: ['pharmacy', 'café', 'hotel', 'bakery'],
    answer: 'pharmacy'
  },
  {
    type: 'word',
    question: 'این تصویر چیست؟',
    image: '../../../media/a2/city/butchery.png',
    options: ['bakery', 'hotel', 'butchery', 'café'],
    answer: 'butchery'
  },

  // ===== بخش ۳: AUDIO (۵ تا) =====
  {
    type: 'audio',
    speak: 'hotel',
    question: 'کدام کلمه را شنیدی؟',
    options: ['hotel', 'café', 'bakery', 'pharmacy'],
    answer: 'hotel'
  },
  {
    type: 'audio',
    speak: 'café',
    question: 'کدام کلمه را شنیدی؟',
    options: ['pharmacy', 'café', 'butchery', 'hotel'],
    answer: 'café'
  },
  {
    type: 'audio',
    speak: 'bakery',
    question: 'کدام کلمه را شنیدی؟',
    options: ['hotel', 'bakery', 'butchery', 'café'],
    answer: 'bakery'
  },
  {
    type: 'audio',
    speak: 'pharmacy',
    question: 'کدام کلمه را شنیدی؟',
    options: ['pharmacy', 'café', 'hotel', 'bakery'],
    answer: 'pharmacy'
  },
  {
    type: 'audio',
    speak: 'butchery',
    question: 'کدام کلمه را شنیدی؟',
    options: ['bakery', 'hotel', 'butchery', 'café'],
    answer: 'butchery'
  },

  // ===== بخش ۴: SPEAK (۵ تا) =====
  {
    type: 'speak',
    word: 'hotel',
    image: '../../../media/a2/city/hotel.png',
    meaning: 'هتل'
  },
  {
    type: 'speak',
    word: 'café',
    image: '../../../media/a2/city/cafe.png',
    meaning: 'کافه'
  },
  {
    type: 'speak',
    word: 'bakery',
    image: '../../../media/a2/city/bakery.png',
    meaning: 'نانوایی'
  },
  {
    type: 'speak',
    word: 'pharmacy',
    image: '../../../media/a2/city/pharmacy.png',
    meaning: 'داروخانه'
  },
  {
    type: 'speak',
    word: 'butchery',
    image: '../../../media/a2/city/butchery.png',
    meaning: 'قصابی'
  },

  // ===== بخش ۵: BUILD EN (۵ تا) =====
  {
    type: 'build-en',
    speak: 'This is a hotel',
    question: 'جمله انگلیسی را بساز:',
    text: 'این یک هتل است',
    words: ['hotel', 'a', 'is', 'This'],
    answer: ['This', 'is', 'a', 'hotel']
  },
  {
    type: 'build-en',
    speak: 'This is a café',
    question: 'جمله انگلیسی را بساز:',
    text: 'این یک کافه است',
    words: ['café', 'a', 'is', 'This'],
    answer: ['This', 'is', 'a', 'café']
  },
  {
    type: 'build-en',
    speak: 'This is a bakery',
    question: 'جمله انگلیسی را بساز:',
    text: 'این یک نانوایی است',
    words: ['bakery', 'a', 'is', 'This'],
    answer: ['This', 'is', 'a', 'bakery']
  },
  {
    type: 'build-en',
    speak: 'This is a pharmacy',
    question: 'جمله انگلیسی را بساز:',
    text: 'این یک داروخانه است',
    words: ['pharmacy', 'a', 'is', 'This'],
    answer: ['This', 'is', 'a', 'pharmacy']
  },
  {
    type: 'build-en',
    speak: 'This is a butchery',
    question: 'جمله انگلیسی را بساز:',
    text: 'این یک قصابی است',
    words: ['butchery', 'a', 'is', 'This'],
    answer: ['This', 'is', 'a', 'butchery']
  },

  // ===== بخش ۶: BUILD FA (۵ تا) =====
  {
    type: 'build-fa',
    speak: 'This is a hotel',
    question: 'ترجمه را بساز:',
    text: 'This is a hotel',
    words: ['است', 'هتل', 'یک', 'این'],
    answer: ['این', 'یک', 'هتل', 'است']
  },
  {
    type: 'build-fa',
    speak: 'This is a café',
    question: 'ترجمه را بساز:',
    text: 'This is a café',
    words: ['است', 'کافه', 'یک', 'این'],
    answer: ['این', 'یک', 'کافه', 'است']
  },
  {
    type: 'build-fa',
    speak: 'This is a bakery',
    question: 'ترجمه را بساز:',
    text: 'This is a bakery',
    words: ['است', 'نانوایی', 'یک', 'این'],
    answer: ['این', 'یک', 'نانوایی', 'است']
  },
  {
    type: 'build-fa',
    speak: 'This is a pharmacy',
    question: 'ترجمه را بساز:',
    text: 'This is a pharmacy',
    words: ['است', 'داروخانه', 'یک', 'این'],
    answer: ['این', 'یک', 'داروخانه', 'است']
  },
  {
    type: 'build-fa',
    speak: 'This is a butchery',
    question: 'ترجمه را بساز:',
    text: 'This is a butchery',
    words: ['است', 'قصابی', 'یک', 'این'],
    answer: ['این', 'یک', 'قصابی', 'است']
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