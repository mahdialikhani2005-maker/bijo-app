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

// ===== سوالات درس ۴۱ - فرانسوی به فارسی =====
const questions = [

  // ===== بخش ۱: IMAGE (۵ تا) =====
  {
    type: 'image',
    question: 'کدام تصویر برای "le cœur" است؟',
    speak: 'le cœur',
    options: [
      { text: 'le cœur', image: '../../../media/a2/body/heart.png' },
      { text: 'l\'os', image: '../../../media/a2/body/bone.png' },
      { text: 'le muscle', image: '../../../media/a2/body/muscle.png' },
      { text: 'la peau', image: '../../../media/a2/body/skin.png' }
    ],
    answer: 'le cœur'
  },
  {
    type: 'image',
    question: 'کدام تصویر برای "l\'os" است؟',
    speak: 'l\'os',
    options: [
      { text: 'le cœur', image: '../../../media/a2/body/heart.png' },
      { text: 'l\'os', image: '../../../media/a2/body/bone.png' },
      { text: 'le sang', image: '../../../media/a2/body/blood.png' },
      { text: 'le muscle', image: '../../../media/a2/body/muscle.png' }
    ],
    answer: 'l\'os'
  },
  {
    type: 'image',
    question: 'کدام تصویر برای "le muscle" است؟',
    speak: 'le muscle',
    options: [
      { text: 'la peau', image: '../../../media/a2/body/skin.png' },
      { text: 'le cœur', image: '../../../media/a2/body/heart.png' },
      { text: 'le muscle', image: '../../../media/a2/body/muscle.png' },
      { text: 'l\'os', image: '../../../media/a2/body/bone.png' }
    ],
    answer: 'le muscle'
  },
  {
    type: 'image',
    question: 'کدام تصویر برای "la peau" است؟',
    speak: 'la peau',
    options: [
      { text: 'l\'os', image: '../../../media/a2/body/bone.png' },
      { text: 'la peau', image: '../../../media/a2/body/skin.png' },
      { text: 'le sang', image: '../../../media/a2/body/blood.png' },
      { text: 'le cœur', image: '../../../media/a2/body/heart.png' }
    ],
    answer: 'la peau'
  },
  {
    type: 'image',
    question: 'کدام تصویر برای "le sang" است؟',
    speak: 'le sang',
    options: [
      { text: 'le cœur', image: '../../../media/a2/body/heart.png' },
      { text: 'le muscle', image: '../../../media/a2/body/muscle.png' },
      { text: 'le sang', image: '../../../media/a2/body/blood.png' },
      { text: 'la peau', image: '../../../media/a2/body/skin.png' }
    ],
    answer: 'le sang'
  },

  // ===== بخش ۲: WORD (۵ تا) =====
  {
    type: 'word',
    question: 'این تصویر چیست؟',
    image: '../../../media/a2/body/heart.png',
    options: ['le cœur', 'l\'os', 'le muscle', 'la peau'],
    answer: 'le cœur'
  },
  {
    type: 'word',
    question: 'این تصویر چیست؟',
    image: '../../../media/a2/body/bone.png',
    options: ['le cœur', 'l\'os', 'le sang', 'le muscle'],
    answer: 'l\'os'
  },
  {
    type: 'word',
    question: 'این تصویر چیست؟',
    image: '../../../media/a2/body/muscle.png',
    options: ['la peau', 'le cœur', 'le muscle', 'l\'os'],
    answer: 'le muscle'
  },
  {
    type: 'word',
    question: 'این تصویر چیست؟',
    image: '../../../media/a2/body/skin.png',
    options: ['l\'os', 'la peau', 'le sang', 'le cœur'],
    answer: 'la peau'
  },
  {
    type: 'word',
    question: 'این تصویر چیست؟',
    image: '../../../media/a2/body/blood.png',
    options: ['le cœur', 'le muscle', 'le sang', 'la peau'],
    answer: 'le sang'
  },

  // ===== بخش ۳: AUDIO (۵ تا) =====
  {
    type: 'audio',
    speak: 'le cœur',
    question: 'کدام کلمه را شنیدی؟',
    options: ['le cœur', 'l\'os', 'le muscle', 'la peau'],
    answer: 'le cœur'
  },
  {
    type: 'audio',
    speak: 'l\'os',
    question: 'کدام کلمه را شنیدی؟',
    options: ['le cœur', 'l\'os', 'le sang', 'le muscle'],
    answer: 'l\'os'
  },
  {
    type: 'audio',
    speak: 'le muscle',
    question: 'کدام کلمه را شنیدی؟',
    options: ['la peau', 'le cœur', 'le muscle', 'l\'os'],
    answer: 'le muscle'
  },
  {
    type: 'audio',
    speak: 'la peau',
    question: 'کدام کلمه را شنیدی؟',
    options: ['l\'os', 'la peau', 'le sang', 'le cœur'],
    answer: 'la peau'
  },
  {
    type: 'audio',
    speak: 'le sang',
    question: 'کدام کلمه را شنیدی؟',
    options: ['le cœur', 'le muscle', 'le sang', 'la peau'],
    answer: 'le sang'
  },

  // ===== بخش ۴: SPEAK (۵ تا) =====
  {
    type: 'speak',
    word: 'le cœur',
    image: '../../../media/a2/body/heart.png',
    meaning: 'قلب'
  },
  {
    type: 'speak',
    word: 'l\'os',
    image: '../../../media/a2/body/bone.png',
    meaning: 'استخوان'
  },
  {
    type: 'speak',
    word: 'le muscle',
    image: '../../../media/a2/body/muscle.png',
    meaning: 'عضله'
  },
  {
    type: 'speak',
    word: 'la peau',
    image: '../../../media/a2/body/skin.png',
    meaning: 'پوست'
  },
  {
    type: 'speak',
    word: 'le sang',
    image: '../../../media/a2/body/blood.png',
    meaning: 'خون'
  },

  // ===== بخش ۵: BUILD EN (ساخت جمله فرانسوی) =====
  {
    type: 'build-en',
    speak: 'Mon cœur bat',
    question: 'جمله فرانسوی را بساز:',
    text: 'قلب من می‌زند',
    words: ['bat', 'cœur', 'Mon'],
    answer: ['Mon', 'cœur', 'bat']
  },
  {
    type: 'build-en',
    speak: 'J\'ai un os',
    question: 'جمله فرانسوی را بساز:',
    text: 'من یک استخوان دارم',
    words: ['os', 'un', 'ai', 'J\''],
    answer: ['J\'', 'ai', 'un', 'os']
  },
  {
    type: 'build-en',
    speak: 'J\'ai un muscle',
    question: 'جمله فرانسوی را بساز:',
    text: 'من یک عضله دارم',
    words: ['muscle', 'un', 'ai', 'J\''],
    answer: ['J\'', 'ai', 'un', 'muscle']
  },
  {
    type: 'build-en',
    speak: 'J\'ai la peau',
    question: 'جمله فرانسوی را بساز:',
    text: 'من پوست دارم',
    words: ['peau', 'la', 'ai', 'J\''],
    answer: ['J\'', 'ai', 'la', 'peau']
  },
  {
    type: 'build-en',
    speak: 'J\'ai du sang',
    question: 'جمله فرانسوی را بساز:',
    text: 'من خون دارم',
    words: ['sang', 'du', 'ai', 'J\''],
    answer: ['J\'', 'ai', 'du', 'sang']
  },

  // ===== بخش ۶: BUILD FA (ترجمه به فارسی) =====
  {
    type: 'build-fa',
    speak: 'Mon cœur bat',
    question: 'ترجمه را بساز:',
    text: 'Mon cœur bat',
    words: ['می‌زند', 'قلب', 'من'],
    answer: ['قلب', 'من', 'می‌زند']
  },
  {
    type: 'build-fa',
    speak: 'J\'ai un os',
    question: 'ترجمه را بساز:',
    text: 'J\'ai un os',
    words: ['دارم', 'استخوان', 'یک', 'من'],
    answer: ['من', 'یک', 'استخوان', 'دارم']
  },
  {
    type: 'build-fa',
    speak: 'J\'ai un muscle',
    question: 'ترجمه را بساز:',
    text: 'J\'ai un muscle',
    words: ['دارم', 'عضله', 'یک', 'من'],
    answer: ['من', 'یک', 'عضله', 'دارم']
  },
  {
    type: 'build-fa',
    speak: 'J\'ai la peau',
    question: 'ترجمه را بساز:',
    text: 'J\'ai la peau',
    words: ['دارم', 'پوست', 'من'],
    answer: ['من', 'پوست', 'دارم']
  },
  {
    type: 'build-fa',
    speak: 'J\'ai du sang',
    question: 'ترجمه را بساز:',
    text: 'J\'ai du sang',
    words: ['دارم', 'خون', 'من'],
    answer: ['من', 'خون', 'دارم']
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