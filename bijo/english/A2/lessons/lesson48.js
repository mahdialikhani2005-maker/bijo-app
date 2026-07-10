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

// ===== سوالات درس ۴۸ =====
const questions = [

  // ===== بخش ۱: IMAGE (۵ تا) =====
  {
    type: 'image',
    question: 'university کدام است؟',
    speak: 'university',
    options: [
      { text: 'college', image: '../../../media/a2/school/college.png' },
      { text: 'university', image: '../../../media/a2/school/university.png' },
      { text: 'campus', image: '../../../media/a2/school/campus.png' },
      { text: 'dormitory', image: '../../../media/a2/school/dormitory.png' }
    ],
    answer: 'university'
  },
  {
    type: 'image',
    question: 'college کدام است؟',
    speak: 'college',
    options: [
      { text: 'dormitory', image: '../../../media/a2/school/dormitory.png' },
      { text: 'college', image: '../../../media/a2/school/college.png' },
      { text: 'laboratory', image: '../../../media/a2/school/laboratory.png' },
      { text: 'university', image: '../../../media/a2/school/university.png' }
    ],
    answer: 'college'
  },
  {
    type: 'image',
    question: 'campus کدام است؟',
    speak: 'campus',
    options: [
      { text: 'university', image: '../../../media/a2/school/university.png' },
      { text: 'campus', image: '../../../media/a2/school/campus.png' },
      { text: 'laboratory', image: '../../../media/a2/school/laboratory.png' },
      { text: 'college', image: '../../../media/a2/school/college.png' }
    ],
    answer: 'campus'
  },
  {
    type: 'image',
    question: 'dormitory کدام است؟',
    speak: 'dormitory',
    options: [
      { text: 'dormitory', image: '../../../media/a2/school/dormitory.png' },
      { text: 'college', image: '../../../media/a2/school/college.png' },
      { text: 'university', image: '../../../media/a2/school/university.png' },
      { text: 'campus', image: '../../../media/a2/school/campus.png' }
    ],
    answer: 'dormitory'
  },
  {
    type: 'image',
    question: 'laboratory کدام است؟',
    speak: 'laboratory',
    options: [
      { text: 'campus', image: '../../../media/a2/school/campus.png' },
      { text: 'university', image: '../../../media/a2/school/university.png' },
      { text: 'laboratory', image: '../../../media/a2/school/laboratory.png' },
      { text: 'college', image: '../../../media/a2/school/college.png' }
    ],
    answer: 'laboratory'
  },

  // ===== بخش ۲: WORD (۵ تا) =====
  {
    type: 'word',
    question: 'این تصویر چیست؟',
    image: '../../../media/a2/school/university.png',
    options: ['college', 'university', 'campus', 'dormitory'],
    answer: 'university'
  },
  {
    type: 'word',
    question: 'این تصویر چیست؟',
    image: '../../../media/a2/school/college.png',
    options: ['dormitory', 'college', 'laboratory', 'university'],
    answer: 'college'
  },
  {
    type: 'word',
    question: 'این تصویر چیست؟',
    image: '../../../media/a2/school/campus.png',
    options: ['university', 'campus', 'laboratory', 'college'],
    answer: 'campus'
  },
  {
    type: 'word',
    question: 'این تصویر چیست؟',
    image: '../../../media/a2/school/dormitory.png',
    options: ['dormitory', 'college', 'university', 'campus'],
    answer: 'dormitory'
  },
  {
    type: 'word',
    question: 'این تصویر چیست؟',
    image: '../../../media/a2/school/laboratory.png',
    options: ['campus', 'university', 'laboratory', 'college'],
    answer: 'laboratory'
  },

  // ===== بخش ۳: AUDIO (۵ تا) =====
  {
    type: 'audio',
    speak: 'university',
    question: 'کدام کلمه را شنیدی؟',
    options: ['university', 'college', 'campus', 'dormitory'],
    answer: 'university'
  },
  {
    type: 'audio',
    speak: 'college',
    question: 'کدام کلمه را شنیدی؟',
    options: ['dormitory', 'college', 'laboratory', 'university'],
    answer: 'college'
  },
  {
    type: 'audio',
    speak: 'campus',
    question: 'کدام کلمه را شنیدی؟',
    options: ['university', 'campus', 'laboratory', 'college'],
    answer: 'campus'
  },
  {
    type: 'audio',
    speak: 'dormitory',
    question: 'کدام کلمه را شنیدی؟',
    options: ['dormitory', 'college', 'university', 'campus'],
    answer: 'dormitory'
  },
  {
    type: 'audio',
    speak: 'laboratory',
    question: 'کدام کلمه را شنیدی؟',
    options: ['campus', 'university', 'laboratory', 'college'],
    answer: 'laboratory'
  },

  // ===== بخش ۴: SPEAK (۵ تا) =====
  {
    type: 'speak',
    word: 'university',
    image: '../../../media/a2/school/university.png',
    meaning: 'دانشگاه'
  },
  {
    type: 'speak',
    word: 'college',
    image: '../../../media/a2/school/college.png',
    meaning: 'کالج'
  },
  {
    type: 'speak',
    word: 'campus',
    image: '../../../media/a2/school/campus.png',
    meaning: 'محوطه دانشگاه'
  },
  {
    type: 'speak',
    word: 'dormitory',
    image: '../../../media/a2/school/dormitory.png',
    meaning: 'خوابگاه'
  },
  {
    type: 'speak',
    word: 'laboratory',
    image: '../../../media/a2/school/laboratory.png',
    meaning: 'آزمایشگاه'
  },

  // ===== بخش ۵: BUILD EN (۵ تا) =====
  {
    type: 'build-en',
    speak: 'I go to university',
    question: 'جمله انگلیسی را بساز:',
    text: 'من به دانشگاه می‌روم',
    words: ['university', 'go', 'to', 'I'],
    answer: ['I', 'go', 'to', 'university']
  },
  {
    type: 'build-en',
    speak: 'I go to college',
    question: 'جمله انگلیسی را بساز:',
    text: 'من به کالج می‌روم',
    words: ['college', 'go', 'to', 'I'],
    answer: ['I', 'go', 'to', 'college']
  },
  {
    type: 'build-en',
    speak: 'I am on campus',
    question: 'جمله انگلیسی را بساز:',
    text: 'من در محوطه دانشگاه هستم',
    words: ['campus', 'on', 'am', 'I'],
    answer: ['I', 'am', 'on', 'campus']
  },
  {
    type: 'build-en',
    speak: 'I live in a dormitory',
    question: 'جمله انگلیسی را بساز:',
    text: 'من در خوابگاه زندگی می‌کنم',
    words: ['dormitory', 'a', 'in', 'live', 'I'],
    answer: ['I', 'live', 'in', 'a', 'dormitory']
  },
  {
    type: 'build-en',
    speak: 'I work in a laboratory',
    question: 'جمله انگلیسی را بساز:',
    text: 'من در آزمایشگاه کار می‌کنم',
    words: ['laboratory', 'a', 'in', 'work', 'I'],
    answer: ['I', 'work', 'in', 'a', 'laboratory']
  },

  // ===== بخش ۶: BUILD FA (۵ تا) =====
  {
    type: 'build-fa',
    speak: 'I go to university',
    question: 'ترجمه را بساز:',
    text: 'I go to university',
    words: ['می‌روم', 'دانشگاه', 'به', 'من'],
    answer: ['من', 'به', 'دانشگاه', 'می‌روم']
  },
  {
    type: 'build-fa',
    speak: 'I go to college',
    question: 'ترجمه را بساز:',
    text: 'I go to college',
    words: ['می‌روم', 'کالج', 'به', 'من'],
    answer: ['من', 'به', 'کالج', 'می‌روم']
  },
  {
    type: 'build-fa',
    speak: 'I am on campus',
    question: 'ترجمه را بساز:',
    text: 'I am on campus',
    words: ['هستم', 'محوطه دانشگاه', 'در', 'من'],
    answer: ['من', 'در', 'محوطه دانشگاه', 'هستم']
  },
  {
    type: 'build-fa',
    speak: 'I live in a dormitory',
    question: 'ترجمه را بساز:',
    text: 'I live in a dormitory',
    words: ['زندگی می‌کنم', 'خوابگاه', 'یک', 'در', 'من'],
    answer: ['من', 'در', 'یک', 'خوابگاه', 'زندگی می‌کنم']
  },
  {
    type: 'build-fa',
    speak: 'I work in a laboratory',
    question: 'ترجمه را بساز:',
    text: 'I work in a laboratory',
    words: ['کار می‌کنم', 'آزمایشگاه', 'یک', 'در', 'من'],
    answer: ['من', 'در', 'یک', 'آزمایشگاه', 'کار می‌کنم']
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