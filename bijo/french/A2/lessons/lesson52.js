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

// ===== سوالات درس ۵۲ - فرانسوی به فارسی =====
const questions = [

  // ===== بخش ۱: IMAGE (۵ تا) =====
  {
    type: 'image',
    question: 'کدام تصویر برای "le sac à dos" است؟',
    speak: 'le sac à dos',
    options: [
      { text: 'le sac à dos', image: '../../../media/a2/travel/backpack.png' },
      { text: 'la tente', image: '../../../media/a2/travel/tent.png' },
      { text: 'la boussole', image: '../../../media/a2/travel/compass.png' },
      { text: 'les jumelles', image: '../../../media/a2/travel/binoculars.png' }
    ],
    answer: 'le sac à dos'
  },
  {
    type: 'image',
    question: 'کدام تصویر برای "la tente" است؟',
    speak: 'la tente',
    options: [
      { text: 'le sac à dos', image: '../../../media/a2/travel/backpack.png' },
      { text: 'la tente', image: '../../../media/a2/travel/tent.png' },
      { text: 'la crème solaire', image: '../../../media/a2/travel/sunscreen.png' },
      { text: 'la boussole', image: '../../../media/a2/travel/compass.png' }
    ],
    answer: 'la tente'
  },
  {
    type: 'image',
    question: 'کدام تصویر برای "la boussole" است؟',
    speak: 'la boussole',
    options: [
      { text: 'les jumelles', image: '../../../media/a2/travel/binoculars.png' },
      { text: 'le sac à dos', image: '../../../media/a2/travel/backpack.png' },
      { text: 'la boussole', image: '../../../media/a2/travel/compass.png' },
      { text: 'la tente', image: '../../../media/a2/travel/tent.png' }
    ],
    answer: 'la boussole'
  },
  {
    type: 'image',
    question: 'کدام تصویر برای "les jumelles" است؟',
    speak: 'les jumelles',
    options: [
      { text: 'la tente', image: '../../../media/a2/travel/tent.png' },
      { text: 'les jumelles', image: '../../../media/a2/travel/binoculars.png' },
      { text: 'la crème solaire', image: '../../../media/a2/travel/sunscreen.png' },
      { text: 'le sac à dos', image: '../../../media/a2/travel/backpack.png' }
    ],
    answer: 'les jumelles'
  },
  {
    type: 'image',
    question: 'کدام تصویر برای "la crème solaire" است؟',
    speak: 'la crème solaire',
    options: [
      { text: 'le sac à dos', image: '../../../media/a2/travel/backpack.png' },
      { text: 'la boussole', image: '../../../media/a2/travel/compass.png' },
      { text: 'la crème solaire', image: '../../../media/a2/travel/sunscreen.png' },
      { text: 'les jumelles', image: '../../../media/a2/travel/binoculars.png' }
    ],
    answer: 'la crème solaire'
  },

  // ===== بخش ۲: WORD (۵ تا) =====
  {
    type: 'word',
    question: 'این تصویر چیست؟',
    image: '../../../media/a2/travel/backpack.png',
    options: ['le sac à dos', 'la tente', 'la boussole', 'les jumelles'],
    answer: 'le sac à dos'
  },
  {
    type: 'word',
    question: 'این تصویر چیست؟',
    image: '../../../media/a2/travel/tent.png',
    options: ['le sac à dos', 'la tente', 'la crème solaire', 'la boussole'],
    answer: 'la tente'
  },
  {
    type: 'word',
    question: 'این تصویر چیست؟',
    image: '../../../media/a2/travel/compass.png',
    options: ['les jumelles', 'le sac à dos', 'la boussole', 'la tente'],
    answer: 'la boussole'
  },
  {
    type: 'word',
    question: 'این تصویر چیست؟',
    image: '../../../media/a2/travel/binoculars.png',
    options: ['la tente', 'les jumelles', 'la crème solaire', 'le sac à dos'],
    answer: 'les jumelles'
  },
  {
    type: 'word',
    question: 'این تصویر چیست؟',
    image: '../../../media/a2/travel/sunscreen.png',
    options: ['le sac à dos', 'la boussole', 'la crème solaire', 'les jumelles'],
    answer: 'la crème solaire'
  },

  // ===== بخش ۳: AUDIO (۵ تا) =====
  {
    type: 'audio',
    speak: 'le sac à dos',
    question: 'کدام کلمه را شنیدی؟',
    options: ['le sac à dos', 'la tente', 'la boussole', 'les jumelles'],
    answer: 'le sac à dos'
  },
  {
    type: 'audio',
    speak: 'la tente',
    question: 'کدام کلمه را شنیدی؟',
    options: ['le sac à dos', 'la tente', 'la crème solaire', 'la boussole'],
    answer: 'la tente'
  },
  {
    type: 'audio',
    speak: 'la boussole',
    question: 'کدام کلمه را شنیدی؟',
    options: ['les jumelles', 'le sac à dos', 'la boussole', 'la tente'],
    answer: 'la boussole'
  },
  {
    type: 'audio',
    speak: 'les jumelles',
    question: 'کدام کلمه را شنیدی؟',
    options: ['la tente', 'les jumelles', 'la crème solaire', 'le sac à dos'],
    answer: 'les jumelles'
  },
  {
    type: 'audio',
    speak: 'la crème solaire',
    question: 'کدام کلمه را شنیدی؟',
    options: ['le sac à dos', 'la boussole', 'la crème solaire', 'les jumelles'],
    answer: 'la crème solaire'
  },

  // ===== بخش ۴: SPEAK (۵ تا) =====
  {
    type: 'speak',
    word: 'le sac à dos',
    image: '../../../media/a2/travel/backpack.png',
    meaning: 'کوله‌پشتی'
  },
  {
    type: 'speak',
    word: 'la tente',
    image: '../../../media/a2/travel/tent.png',
    meaning: 'چادر'
  },
  {
    type: 'speak',
    word: 'la boussole',
    image: '../../../media/a2/travel/compass.png',
    meaning: 'قطب‌نما'
  },
  {
    type: 'speak',
    word: 'les jumelles',
    image: '../../../media/a2/travel/binoculars.png',
    meaning: 'دوربین دوچشمی'
  },
  {
    type: 'speak',
    word: 'la crème solaire',
    image: '../../../media/a2/travel/sunscreen.png',
    meaning: 'کرم ضدآفتاب'
  },

  // ===== بخش ۵: BUILD EN (ساخت جمله فرانسوی) =====
  {
    type: 'build-en',
    speak: 'J\'ai un sac à dos',
    question: 'جمله فرانسوی را بساز:',
    text: 'من یک کوله‌پشتی دارم',
    words: ['dos', 'à', 'sac', 'un', 'ai', 'J\''],
    answer: ['J\'', 'ai', 'un', 'sac', 'à', 'dos']
  },
  {
    type: 'build-en',
    speak: 'J\'ai une tente',
    question: 'جمله فرانسوی را بساز:',
    text: 'من یک چادر دارم',
    words: ['tente', 'une', 'ai', 'J\''],
    answer: ['J\'', 'ai', 'une', 'tente']
  },
  {
    type: 'build-en',
    speak: 'J\'ai une boussole',
    question: 'جمله فرانسوی را بساز:',
    text: 'من یک قطب‌نما دارم',
    words: ['boussole', 'une', 'ai', 'J\''],
    answer: ['J\'', 'ai', 'une', 'boussole']
  },
  {
    type: 'build-en',
    speak: 'J\'ai des jumelles',
    question: 'جمله فرانسوی را بساز:',
    text: 'من دوربین دوچشمی دارم',
    words: ['jumelles', 'des', 'ai', 'J\''],
    answer: ['J\'', 'ai', 'des', 'jumelles']
  },
  {
    type: 'build-en',
    speak: 'J\'ai de la crème solaire',
    question: 'جمله فرانسوی را بساز:',
    text: 'من کرم ضدآفتاب دارم',
    words: ['solaire', 'crème', 'la', 'de', 'ai', 'J\''],
    answer: ['J\'', 'ai', 'de', 'la', 'crème', 'solaire']
  },

  // ===== بخش ۶: BUILD FA (ترجمه به فارسی) =====
  {
    type: 'build-fa',
    speak: 'J\'ai un sac à dos',
    question: 'ترجمه را بساز:',
    text: 'J\'ai un sac à dos',
    words: ['دارم', 'کوله‌پشتی', 'یک', 'من'],
    answer: ['من', 'یک', 'کوله‌پشتی', 'دارم']
  },
  {
    type: 'build-fa',
    speak: 'J\'ai une tente',
    question: 'ترجمه را بساز:',
    text: 'J\'ai une tente',
    words: ['دارم', 'چادر', 'یک', 'من'],
    answer: ['من', 'یک', 'چادر', 'دارم']
  },
  {
    type: 'build-fa',
    speak: 'J\'ai une boussole',
    question: 'ترجمه را بساز:',
    text: 'J\'ai une boussole',
    words: ['دارم', 'قطب‌نما', 'یک', 'من'],
    answer: ['من', 'یک', 'قطب‌نما', 'دارم']
  },
  {
    type: 'build-fa',
    speak: 'J\'ai des jumelles',
    question: 'ترجمه را بساز:',
    text: 'J\'ai des jumelles',
    words: ['دارم', 'دوربین دوچشمی', 'من'],
    answer: ['من', 'دوربین دوچشمی', 'دارم']
  },
  {
    type: 'build-fa',
    speak: 'J\'ai de la crème solaire',
    question: 'ترجمه را بساز:',
    text: 'J\'ai de la crème solaire',
    words: ['دارم', 'کرم ضدآفتاب', 'من'],
    answer: ['من', 'کرم ضدآفتاب', 'دارم']
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