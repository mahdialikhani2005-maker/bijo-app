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

// ===== سوالات درس ۵۳ =====
const questions = [

  // ===== بخش ۱: IMAGE (۵ تا) =====
  {
    type: 'image',
    question: 'guide کدام است؟',
    speak: 'guide',
    options: [
      { text: 'tourist', image: '../../../media/a2/travel/tourist.png' },
      { text: 'guide', image: '../../../media/a2/travel/guide.png' },
      { text: 'souvenir', image: '../../../media/a2/travel/souvenir.png' },
      { text: 'adventure', image: '../../../media/a2/travel/adventure.png' }
    ],
    answer: 'guide'
  },
  {
    type: 'image',
    question: 'tourist کدام است؟',
    speak: 'tourist',
    options: [
      { text: 'guide', image: '../../../media/a2/travel/guide.png' },
      { text: 'tourist', image: '../../../media/a2/travel/tourist.png' },
      { text: 'journey', image: '../../../media/a2/travel/journey.png' },
      { text: 'souvenir', image: '../../../media/a2/travel/souvenir.png' }
    ],
    answer: 'tourist'
  },
  {
    type: 'image',
    question: 'souvenir کدام است؟',
    speak: 'souvenir',
    options: [
      { text: 'adventure', image: '../../../media/a2/travel/adventure.png' },
      { text: 'guide', image: '../../../media/a2/travel/guide.png' },
      { text: 'souvenir', image: '../../../media/a2/travel/souvenir.png' },
      { text: 'tourist', image: '../../../media/a2/travel/tourist.png' }
    ],
    answer: 'souvenir'
  },
  {
    type: 'image',
    question: 'adventure کدام است؟',
    speak: 'adventure',
    options: [
      { text: 'adventure', image: '../../../media/a2/travel/adventure.png' },
      { text: 'journey', image: '../../../media/a2/travel/journey.png' },
      { text: 'tourist', image: '../../../media/a2/travel/tourist.png' },
      { text: 'guide', image: '../../../media/a2/travel/guide.png' }
    ],
    answer: 'adventure'
  },
  {
    type: 'image',
    question: 'journey کدام است؟',
    speak: 'journey',
    options: [
      { text: 'souvenir', image: '../../../media/a2/travel/souvenir.png' },
      { text: 'journey', image: '../../../media/a2/travel/journey.png' },
      { text: 'adventure', image: '../../../media/a2/travel/adventure.png' },
      { text: 'tourist', image: '../../../media/a2/travel/tourist.png' }
    ],
    answer: 'journey'
  },

  // ===== بخش ۲: WORD (۵ تا) =====
  {
    type: 'word',
    question: 'این تصویر چیست؟',
    image: '../../../media/a2/travel/guide.png',
    options: ['tourist', 'guide', 'souvenir', 'adventure'],
    answer: 'guide'
  },
  {
    type: 'word',
    question: 'این تصویر چیست؟',
    image: '../../../media/a2/travel/tourist.png',
    options: ['guide', 'tourist', 'journey', 'souvenir'],
    answer: 'tourist'
  },
  {
    type: 'word',
    question: 'این تصویر چیست؟',
    image: '../../../media/a2/travel/souvenir.png',
    options: ['adventure', 'guide', 'souvenir', 'tourist'],
    answer: 'souvenir'
  },
  {
    type: 'word',
    question: 'این تصویر چیست؟',
    image: '../../../media/a2/travel/adventure.png',
    options: ['adventure', 'journey', 'tourist', 'guide'],
    answer: 'adventure'
  },
  {
    type: 'word',
    question: 'این تصویر چیست؟',
    image: '../../../media/a2/travel/journey.png',
    options: ['souvenir', 'journey', 'adventure', 'tourist'],
    answer: 'journey'
  },

  // ===== بخش ۳: AUDIO (۵ تا) =====
  {
    type: 'audio',
    speak: 'guide',
    question: 'کدام کلمه را شنیدی؟',
    options: ['tourist', 'guide', 'souvenir', 'adventure'],
    answer: 'guide'
  },
  {
    type: 'audio',
    speak: 'tourist',
    question: 'کدام کلمه را شنیدی؟',
    options: ['guide', 'tourist', 'journey', 'souvenir'],
    answer: 'tourist'
  },
  {
    type: 'audio',
    speak: 'souvenir',
    question: 'کدام کلمه را شنیدی؟',
    options: ['adventure', 'guide', 'souvenir', 'tourist'],
    answer: 'souvenir'
  },
  {
    type: 'audio',
    speak: 'adventure',
    question: 'کدام کلمه را شنیدی؟',
    options: ['adventure', 'journey', 'tourist', 'guide'],
    answer: 'adventure'
  },
  {
    type: 'audio',
    speak: 'journey',
    question: 'کدام کلمه را شنیدی؟',
    options: ['souvenir', 'journey', 'adventure', 'tourist'],
    answer: 'journey'
  },

  // ===== بخش ۴: SPEAK (۵ تا) =====
  {
    type: 'speak',
    word: 'guide',
    image: '../../../media/a2/travel/guide.png',
    meaning: 'راهنما'
  },
  {
    type: 'speak',
    word: 'tourist',
    image: '../../../media/a2/travel/tourist.png',
    meaning: 'توریست / گردشگر'
  },
  {
    type: 'speak',
    word: 'souvenir',
    image: '../../../media/a2/travel/souvenir.png',
    meaning: 'سوغاتی'
  },
  {
    type: 'speak',
    word: 'adventure',
    image: '../../../media/a2/travel/adventure.png',
    meaning: 'ماجراجویی'
  },
  {
    type: 'speak',
    word: 'journey',
    image: '../../../media/a2/travel/journey.png',
    meaning: 'سفر / مسافرت'
  },

  // ===== بخش ۵: BUILD EN (۵ تا) =====
  {
    type: 'build-en',
    speak: 'The guide helps us',
    question: 'جمله انگلیسی را بساز:',
    text: 'راهنما به ما کمک می‌کند',
    words: ['us', 'helps', 'guide', 'The'],
    answer: ['The', 'guide', 'helps', 'us']
  },
  {
    type: 'build-en',
    speak: 'I am a tourist',
    question: 'جمله انگلیسی را بساز:',
    text: 'من یک گردشگر هستم',
    words: ['tourist', 'a', 'am', 'I'],
    answer: ['I', 'am', 'a', 'tourist']
  },
  {
    type: 'build-en',
    speak: 'I buy a souvenir',
    question: 'جمله انگلیسی را بساز:',
    text: 'من یک سوغاتی می‌خرم',
    words: ['souvenir', 'a', 'buy', 'I'],
    answer: ['I', 'buy', 'a', 'souvenir']
  },
  {
    type: 'build-en',
    speak: 'I love adventure',
    question: 'جمله انگلیسی را بساز:',
    text: 'من ماجراجویی را دوست دارم',
    words: ['adventure', 'love', 'I'],
    answer: ['I', 'love', 'adventure']
  },
  {
    type: 'build-en',
    speak: 'I go on a journey',
    question: 'جمله انگلیسی را بساز:',
    text: 'من به یک سفر می‌روم',
    words: ['journey', 'a', 'on', 'go', 'I'],
    answer: ['I', 'go', 'on', 'a', 'journey']
  },

  // ===== بخش ۶: BUILD FA (۵ تا) =====
  {
    type: 'build-fa',
    speak: 'The guide helps us',
    question: 'ترجمه را بساز:',
    text: 'The guide helps us',
    words: ['کمک می‌کند', 'به ما', 'راهنما'],
    answer: ['راهنما', 'به ما', 'کمک می‌کند']
  },
  {
    type: 'build-fa',
    speak: 'I am a tourist',
    question: 'ترجمه را بساز:',
    text: 'I am a tourist',
    words: ['هستم', 'گردشگر', 'یک', 'من'],
    answer: ['من', 'یک', 'گردشگر', 'هستم']
  },
  {
    type: 'build-fa',
    speak: 'I buy a souvenir',
    question: 'ترجمه را بساز:',
    text: 'I buy a souvenir',
    words: ['می‌خرم', 'سوغاتی', 'یک', 'من'],
    answer: ['من', 'یک', 'سوغاتی', 'می‌خرم']
  },
  {
    type: 'build-fa',
    speak: 'I love adventure',
    question: 'ترجمه را بساز:',
    text: 'I love adventure',
    words: ['دارم', 'ماجراجویی', 'دوست', 'من'],
    answer: ['من', 'ماجراجویی', 'را', 'دوست', 'دارم']
  },
  {
    type: 'build-fa',
    speak: 'I go on a journey',
    question: 'ترجمه را بساز:',
    text: 'I go on a journey',
    words: ['می‌روم', 'سفر', 'یک', 'به', 'من'],
    answer: ['من', 'به', 'یک', 'سفر', 'می‌روم']
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