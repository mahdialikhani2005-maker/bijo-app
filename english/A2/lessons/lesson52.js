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

// ===== سوالات درس ۵۲ =====
const questions = [

  // ===== بخش ۱: IMAGE (۵ تا) =====
  {
    type: 'image',
    question: 'backpack کدام است؟',
    speak: 'backpack',
    options: [
      { text: 'tent', image: '../../../media/a2/travel/tent.png' },
      { text: 'backpack', image: '../../../media/a2/travel/backpack.png' },
      { text: 'compass', image: '../../../media/a2/travel/compass.png' },
      { text: 'binoculars', image: '../../../media/a2/travel/binoculars.png' }
    ],
    answer: 'backpack'
  },
  {
    type: 'image',
    question: 'tent کدام است؟',
    speak: 'tent',
    options: [
      { text: 'backpack', image: '../../../media/a2/travel/backpack.png' },
      { text: 'tent', image: '../../../media/a2/travel/tent.png' },
      { text: 'sunscreen', image: '../../../media/a2/travel/sunscreen.png' },
      { text: 'compass', image: '../../../media/a2/travel/compass.png' }
    ],
    answer: 'tent'
  },
  {
    type: 'image',
    question: 'compass کدام است؟',
    speak: 'compass',
    options: [
      { text: 'binoculars', image: '../../../media/a2/travel/binoculars.png' },
      { text: 'backpack', image: '../../../media/a2/travel/backpack.png' },
      { text: 'compass', image: '../../../media/a2/travel/compass.png' },
      { text: 'tent', image: '../../../media/a2/travel/tent.png' }
    ],
    answer: 'compass'
  },
  {
    type: 'image',
    question: 'binoculars کدام است؟',
    speak: 'binoculars',
    options: [
      { text: 'binoculars', image: '../../../media/a2/travel/binoculars.png' },
      { text: 'sunscreen', image: '../../../media/a2/travel/sunscreen.png' },
      { text: 'tent', image: '../../../media/a2/travel/tent.png' },
      { text: 'backpack', image: '../../../media/a2/travel/backpack.png' }
    ],
    answer: 'binoculars'
  },
  {
    type: 'image',
    question: 'sunscreen کدام است؟',
    speak: 'sunscreen',
    options: [
      { text: 'compass', image: '../../../media/a2/travel/compass.png' },
      { text: 'sunscreen', image: '../../../media/a2/travel/sunscreen.png' },
      { text: 'binoculars', image: '../../../media/a2/travel/binoculars.png' },
      { text: 'tent', image: '../../../media/a2/travel/tent.png' }
    ],
    answer: 'sunscreen'
  },

  // ===== بخش ۲: WORD (۵ تا) =====
  {
    type: 'word',
    question: 'این تصویر چیست؟',
    image: '../../../media/a2/travel/backpack.png',
    options: ['tent', 'backpack', 'compass', 'binoculars'],
    answer: 'backpack'
  },
  {
    type: 'word',
    question: 'این تصویر چیست؟',
    image: '../../../media/a2/travel/tent.png',
    options: ['backpack', 'tent', 'sunscreen', 'compass'],
    answer: 'tent'
  },
  {
    type: 'word',
    question: 'این تصویر چیست؟',
    image: '../../../media/a2/travel/compass.png',
    options: ['binoculars', 'backpack', 'compass', 'tent'],
    answer: 'compass'
  },
  {
    type: 'word',
    question: 'این تصویر چیست؟',
    image: '../../../media/a2/travel/binoculars.png',
    options: ['binoculars', 'sunscreen', 'tent', 'backpack'],
    answer: 'binoculars'
  },
  {
    type: 'word',
    question: 'این تصویر چیست؟',
    image: '../../../media/a2/travel/sunscreen.png',
    options: ['compass', 'sunscreen', 'binoculars', 'tent'],
    answer: 'sunscreen'
  },

  // ===== بخش ۳: AUDIO (۵ تا) =====
  {
    type: 'audio',
    speak: 'backpack',
    question: 'کدام کلمه را شنیدی؟',
    options: ['tent', 'backpack', 'compass', 'binoculars'],
    answer: 'backpack'
  },
  {
    type: 'audio',
    speak: 'tent',
    question: 'کدام کلمه را شنیدی؟',
    options: ['backpack', 'tent', 'sunscreen', 'compass'],
    answer: 'tent'
  },
  {
    type: 'audio',
    speak: 'compass',
    question: 'کدام کلمه را شنیدی؟',
    options: ['binoculars', 'backpack', 'compass', 'tent'],
    answer: 'compass'
  },
  {
    type: 'audio',
    speak: 'binoculars',
    question: 'کدام کلمه را شنیدی؟',
    options: ['binoculars', 'sunscreen', 'tent', 'backpack'],
    answer: 'binoculars'
  },
  {
    type: 'audio',
    speak: 'sunscreen',
    question: 'کدام کلمه را شنیدی؟',
    options: ['compass', 'sunscreen', 'binoculars', 'tent'],
    answer: 'sunscreen'
  },

  // ===== بخش ۴: SPEAK (۵ تا) =====
  {
    type: 'speak',
    word: 'backpack',
    image: '../../../media/a2/travel/backpack.png',
    meaning: 'کوله پشتی'
  },
  {
    type: 'speak',
    word: 'tent',
    image: '../../../media/a2/travel/tent.png',
    meaning: 'چادر'
  },
  {
    type: 'speak',
    word: 'compass',
    image: '../../../media/a2/travel/compass.png',
    meaning: 'قطب نما'
  },
  {
    type: 'speak',
    word: 'binoculars',
    image: '../../../media/a2/travel/binoculars.png',
    meaning: 'دوربین دوچشمی'
  },
  {
    type: 'speak',
    word: 'sunscreen',
    image: '../../../media/a2/travel/sunscreen.png',
    meaning: 'کرم ضدآفتاب'
  },

  // ===== بخش ۵: BUILD EN (۵ تا) =====
  {
    type: 'build-en',
    speak: 'I have a backpack',
    question: 'جمله انگلیسی را بساز:',
    text: 'من یک کوله پشتی دارم',
    words: ['backpack', 'a', 'have', 'I'],
    answer: ['I', 'have', 'a', 'backpack']
  },
  {
    type: 'build-en',
    speak: 'I sleep in a tent',
    question: 'جمله انگلیسی را بساز:',
    text: 'من در چادر می‌خوابم',
    words: ['tent', 'a', 'in', 'sleep', 'I'],
    answer: ['I', 'sleep', 'in', 'a', 'tent']
  },
  {
    type: 'build-en',
    speak: 'I use a compass',
    question: 'جمله انگلیسی را بساز:',
    text: 'من از قطب نما استفاده می‌کنم',
    words: ['compass', 'a', 'use', 'I'],
    answer: ['I', 'use', 'a', 'compass']
  },
  {
    type: 'build-en',
    speak: 'I look through binoculars',
    question: 'جمله انگلیسی را بساز:',
    text: 'من با دوربین دوچشمی نگاه می‌کنم',
    words: ['binoculars', 'through', 'look', 'I'],
    answer: ['I', 'look', 'through', 'binoculars']
  },
  {
    type: 'build-en',
    speak: 'I wear sunscreen',
    question: 'جمله انگلیسی را بساز:',
    text: 'من کرم ضدآفتاب می‌زنم',
    words: ['sunscreen', 'wear', 'I'],
    answer: ['I', 'wear', 'sunscreen']
  },

  // ===== بخش ۶: BUILD FA (۵ تا) =====
  {
    type: 'build-fa',
    speak: 'I have a backpack',
    question: 'ترجمه را بساز:',
    text: 'I have a backpack',
    words: ['دارم', 'کوله پشتی', 'یک', 'من'],
    answer: ['من', 'یک', 'کوله پشتی', 'دارم']
  },
  {
    type: 'build-fa',
    speak: 'I sleep in a tent',
    question: 'ترجمه را بساز:',
    text: 'I sleep in a tent',
    words: ['می‌خوابم', 'چادر', 'یک', 'در', 'من'],
    answer: ['من', 'در', 'یک', 'چادر', 'می‌خوابم']
  },
  {
    type: 'build-fa',
    speak: 'I use a compass',
    question: 'ترجمه را بساز:',
    text: 'I use a compass',
    words: ['استفاده می‌کنم', 'قطب نما', 'یک', 'از', 'من'],
    answer: ['من', 'از', 'یک', 'قطب نما', 'استفاده می‌کنم']
  },
  {
    type: 'build-fa',
    speak: 'I look through binoculars',
    question: 'ترجمه را بساز:',
    text: 'I look through binoculars',
    words: ['نگاه می‌کنم', 'دوربین دوچشمی', 'با', 'من'],
    answer: ['من', 'با', 'دوربین دوچشمی', 'نگاه می‌کنم']
  },
  {
    type: 'build-fa',
    speak: 'I wear sunscreen',
    question: 'ترجمه را بساز:',
    text: 'I wear sunscreen',
    words: ['می‌زنم', 'کرم ضدآفتاب', 'من'],
    answer: ['من', 'کرم ضدآفتاب', 'می‌زنم']
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