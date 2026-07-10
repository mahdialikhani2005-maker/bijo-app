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

// ===== سوالات درس ۲۲ - ترکی استانبولی به فارسی (غذاهای رایج) =====
const questions = [

  // ===== بخش ۱: IMAGE (۵ تا) =====
  {
    type: 'image',
    question: 'کدام تصویر برای "pizza" است؟',
    speak: 'pizza',
    options: [
      { text: 'pizza', image: '../../../media/a2/food/pizza.png' },
      { text: 'makarna', image: '../../../media/a2/food/pasta.png' },
      { text: 'salata', image: '../../../media/a2/food/salad.png' },
      { text: 'sandviç', image: '../../../media/a2/food/sandwich.png' }
    ],
    answer: 'pizza'
  },
  {
    type: 'image',
    question: 'کدام تصویر برای "makarna" است؟',
    speak: 'makarna',
    options: [
      { text: 'pizza', image: '../../../media/a2/food/pizza.png' },
      { text: 'makarna', image: '../../../media/a2/food/pasta.png' },
      { text: 'burger', image: '../../../media/a2/food/burger.png' },
      { text: 'salata', image: '../../../media/a2/food/salad.png' }
    ],
    answer: 'makarna'
  },
  {
    type: 'image',
    question: 'کدام تصویر برای "salata" است؟',
    speak: 'salata',
    options: [
      { text: 'sandviç', image: '../../../media/a2/food/sandwich.png' },
      { text: 'pizza', image: '../../../media/a2/food/pizza.png' },
      { text: 'salata', image: '../../../media/a2/food/salad.png' },
      { text: 'makarna', image: '../../../media/a2/food/pasta.png' }
    ],
    answer: 'salata'
  },
  {
    type: 'image',
    question: 'کدام تصویر برای "sandviç" است؟',
    speak: 'sandviç',
    options: [
      { text: 'pizza', image: '../../../media/a2/food/pizza.png' },
      { text: 'sandviç', image: '../../../media/a2/food/sandwich.png' },
      { text: 'salata', image: '../../../media/a2/food/salad.png' },
      { text: 'burger', image: '../../../media/a2/food/burger.png' }
    ],
    answer: 'sandviç'
  },
  {
    type: 'image',
    question: 'کدام تصویر برای "burger" است؟',
    speak: 'burger',
    options: [
      { text: 'makarna', image: '../../../media/a2/food/pasta.png' },
      { text: 'burger', image: '../../../media/a2/food/burger.png' },
      { text: 'sandviç', image: '../../../media/a2/food/sandwich.png' },
      { text: 'pizza', image: '../../../media/a2/food/pizza.png' }
    ],
    answer: 'burger'
  },

  // ===== بخش ۲: WORD (۵ تا) =====
  {
    type: 'word',
    question: 'این تصویر چیست؟',
    image: '../../../media/a2/food/pizza.png',
    options: ['pizza', 'makarna', 'salata', 'sandviç'],
    answer: 'pizza'
  },
  {
    type: 'word',
    question: 'این تصویر چیست؟',
    image: '../../../media/a2/food/pasta.png',
    options: ['pizza', 'makarna', 'burger', 'salata'],
    answer: 'makarna'
  },
  {
    type: 'word',
    question: 'این تصویر چیست؟',
    image: '../../../media/a2/food/salad.png',
    options: ['sandviç', 'pizza', 'salata', 'makarna'],
    answer: 'salata'
  },
  {
    type: 'word',
    question: 'این تصویر چیست؟',
    image: '../../../media/a2/food/sandwich.png',
    options: ['pizza', 'sandviç', 'salata', 'burger'],
    answer: 'sandviç'
  },
  {
    type: 'word',
    question: 'این تصویر چیست؟',
    image: '../../../media/a2/food/burger.png',
    options: ['makarna', 'burger', 'sandviç', 'pizza'],
    answer: 'burger'
  },

  // ===== بخش ۳: AUDIO (۵ تا) =====
  {
    type: 'audio',
    speak: 'pizza',
    question: 'کدام کلمه را شنیدی؟',
    options: ['pizza', 'makarna', 'salata', 'sandviç'],
    answer: 'pizza'
  },
  {
    type: 'audio',
    speak: 'makarna',
    question: 'کدام کلمه را شنیدی؟',
    options: ['pizza', 'makarna', 'burger', 'salata'],
    answer: 'makarna'
  },
  {
    type: 'audio',
    speak: 'salata',
    question: 'کدام کلمه را شنیدی؟',
    options: ['sandviç', 'pizza', 'salata', 'makarna'],
    answer: 'salata'
  },
  {
    type: 'audio',
    speak: 'sandviç',
    question: 'کدام کلمه را شنیدی؟',
    options: ['pizza', 'sandviç', 'salata', 'burger'],
    answer: 'sandviç'
  },
  {
    type: 'audio',
    speak: 'burger',
    question: 'کدام کلمه را شنیدی؟',
    options: ['makarna', 'burger', 'sandviç', 'pizza'],
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
    word: 'makarna',
    image: '../../../media/a2/food/pasta.png',
    meaning: 'پاستا'
  },
  {
    type: 'speak',
    word: 'salata',
    image: '../../../media/a2/food/salad.png',
    meaning: 'سالاد'
  },
  {
    type: 'speak',
    word: 'sandviç',
    image: '../../../media/a2/food/sandwich.png',
    meaning: 'ساندویچ'
  },
  {
    type: 'speak',
    word: 'burger',
    image: '../../../media/a2/food/burger.png',
    meaning: 'برگر'
  },

  // ===== بخش ۵: BUILD TR (ساخت جمله ترکی) =====
  {
    type: 'build-tr',
    speak: 'Bu bir pizza',
    question: 'جمله ترکی را بساز:',
    text: 'این یک پیتزا است',
    words: ['pizza', 'bir', 'Bu'],
    answer: ['Bu', 'bir', 'pizza']
  },
  {
    type: 'build-tr',
    speak: 'Bu bir makarna',
    question: 'جمله ترکی را بساز:',
    text: 'این یک پاستا است',
    words: ['makarna', 'bir', 'Bu'],
    answer: ['Bu', 'bir', 'makarna']
  },
  {
    type: 'build-tr',
    speak: 'Bu bir salata',
    question: 'جمله ترکی را بساز:',
    text: 'این یک سالاد است',
    words: ['salata', 'bir', 'Bu'],
    answer: ['Bu', 'bir', 'salata']
  },
  {
    type: 'build-tr',
    speak: 'Bu bir sandviç',
    question: 'جمله ترکی را بساز:',
    text: 'این یک ساندویچ است',
    words: ['sandviç', 'bir', 'Bu'],
    answer: ['Bu', 'bir', 'sandviç']
  },
  {
    type: 'build-tr',
    speak: 'Bu bir burger',
    question: 'جمله ترکی را بساز:',
    text: 'این یک برگر است',
    words: ['burger', 'bir', 'Bu'],
    answer: ['Bu', 'bir', 'burger']
  },

  // ===== بخش ۶: BUILD FA (ترجمه به فارسی) =====
  {
    type: 'build-fa',
    speak: 'Bu bir pizza',
    question: 'ترجمه را بساز:',
    text: 'Bu bir pizza',
    words: ['است', 'پیتزا', 'یک', 'این'],
    answer: ['این', 'یک', 'پیتزا', 'است']
  },
  {
    type: 'build-fa',
    speak: 'Bu bir makarna',
    question: 'ترجمه را بساز:',
    text: 'Bu bir makarna',
    words: ['است', 'پاستا', 'یک', 'این'],
    answer: ['این', 'یک', 'پاستا', 'است']
  },
  {
    type: 'build-fa',
    speak: 'Bu bir salata',
    question: 'ترجمه را بساز:',
    text: 'Bu bir salata',
    words: ['است', 'سالاد', 'یک', 'این'],
    answer: ['این', 'یک', 'سالاد', 'است']
  },
  {
    type: 'build-fa',
    speak: 'Bu bir sandviç',
    question: 'ترجمه را بساز:',
    text: 'Bu bir sandviç',
    words: ['است', 'ساندویچ', 'یک', 'این'],
    answer: ['این', 'یک', 'ساندویچ', 'است']
  },
  {
    type: 'build-fa',
    speak: 'Bu bir burger',
    question: 'ترجمه را بساز:',
    text: 'Bu bir burger',
    words: ['است', 'برگر', 'یک', 'این'],
    answer: ['این', 'یک', 'برگر', 'است']
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