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

// ===== سوالات درس ۴ - ترکی استانبولی به فارسی (خانواده ناتنی) =====
const questions = [

  // ===== بخش ۱: IMAGE (۵ تا) =====
  {
    type: 'image',
    question: 'کدام تصویر برای "damat" است؟',
    speak: 'damat',
    options: [
      { text: 'damat', image: '../../../media/a2/family/groom.png' },
      { text: 'kayın', image: '../../../media/a2/family/inlaw.png' },
      { text: 'üvey baba', image: '../../../media/a2/family/stepfather.png' },
      { text: 'üvey anne', image: '../../../media/a2/family/stepmother.png' }
    ],
    answer: 'damat'
  },
  {
    type: 'image',
    question: 'کدام تصویر برای "kayın" است؟',
    speak: 'kayın',
    options: [
      { text: 'üvey baba', image: '../../../media/a2/family/stepfather.png' },
      { text: 'damat', image: '../../../media/a2/family/groom.png' },
      { text: 'kayın', image: '../../../media/a2/family/inlaw.png' },
      { text: 'üvey anne', image: '../../../media/a2/family/stepmother.png' }
    ],
    answer: 'kayın'
  },
  {
    type: 'image',
    question: 'کدام تصویر برای "üvey baba" است؟',
    speak: 'üvey baba',
    options: [
      { text: 'kayın', image: '../../../media/a2/family/inlaw.png' },
      { text: 'üvey baba', image: '../../../media/a2/family/stepfather.png' },
      { text: 'üvey kız kardeş', image: '../../../media/a2/family/stepsister.png' },
      { text: 'damat', image: '../../../media/a2/family/groom.png' }
    ],
    answer: 'üvey baba'
  },
  {
    type: 'image',
    question: 'کدام تصویر برای "üvey anne" است؟',
    speak: 'üvey anne',
    options: [
      { text: 'damat', image: '../../../media/a2/family/groom.png' },
      { text: 'kayın', image: '../../../media/a2/family/inlaw.png' },
      { text: 'üvey anne', image: '../../../media/a2/family/stepmother.png' },
      { text: 'üvey baba', image: '../../../media/a2/family/stepfather.png' }
    ],
    answer: 'üvey anne'
  },
  {
    type: 'image',
    question: 'کدام تصویر برای "üvey kız kardeş" است؟',
    speak: 'üvey kız kardeş',
    options: [
      { text: 'üvey baba', image: '../../../media/a2/family/stepfather.png' },
      { text: 'üvey kız kardeş', image: '../../../media/a2/family/stepsister.png' },
      { text: 'kayın', image: '../../../media/a2/family/inlaw.png' },
      { text: 'üvey anne', image: '../../../media/a2/family/stepmother.png' }
    ],
    answer: 'üvey kız kardeş'
  },

  // ===== بخش ۲: WORD (۵ تا) =====
  {
    type: 'word',
    question: 'این تصویر چیست؟',
    image: '../../../media/a2/family/groom.png',
    options: ['damat', 'kayın', 'üvey baba', 'üvey anne'],
    answer: 'damat'
  },
  {
    type: 'word',
    question: 'این تصویر چیست؟',
    image: '../../../media/a2/family/inlaw.png',
    options: ['üvey baba', 'damat', 'kayın', 'üvey anne'],
    answer: 'kayın'
  },
  {
    type: 'word',
    question: 'این تصویر چیست؟',
    image: '../../../media/a2/family/stepfather.png',
    options: ['kayın', 'üvey baba', 'üvey kız kardeş', 'damat'],
    answer: 'üvey baba'
  },
  {
    type: 'word',
    question: 'این تصویر چیست؟',
    image: '../../../media/a2/family/stepmother.png',
    options: ['damat', 'kayın', 'üvey anne', 'üvey baba'],
    answer: 'üvey anne'
  },
  {
    type: 'word',
    question: 'این تصویر چیست؟',
    image: '../../../media/a2/family/stepsister.png',
    options: ['üvey baba', 'üvey kız kardeş', 'kayın', 'üvey anne'],
    answer: 'üvey kız kardeş'
  },

  // ===== بخش ۳: AUDIO (۵ تا) =====
  {
    type: 'audio',
    speak: 'damat',
    question: 'کدام کلمه را شنیدی؟',
    options: ['damat', 'kayın', 'üvey baba', 'üvey anne'],
    answer: 'damat'
  },
  {
    type: 'audio',
    speak: 'kayın',
    question: 'کدام کلمه را شنیدی؟',
    options: ['üvey baba', 'damat', 'kayın', 'üvey anne'],
    answer: 'kayın'
  },
  {
    type: 'audio',
    speak: 'üvey baba',
    question: 'کدام کلمه را شنیدی؟',
    options: ['kayın', 'üvey baba', 'üvey kız kardeş', 'damat'],
    answer: 'üvey baba'
  },
  {
    type: 'audio',
    speak: 'üvey anne',
    question: 'کدام کلمه را شنیدی؟',
    options: ['damat', 'kayın', 'üvey anne', 'üvey baba'],
    answer: 'üvey anne'
  },
  {
    type: 'audio',
    speak: 'üvey kız kardeş',
    question: 'کدام کلمه را شنیدی؟',
    options: ['üvey baba', 'üvey kız kardeş', 'kayın', 'üvey anne'],
    answer: 'üvey kız kardeş'
  },

  // ===== بخش ۴: SPEAK (۵ تا) =====
  {
    type: 'speak',
    word: 'damat',
    image: '../../../media/a2/family/groom.png',
    meaning: 'داماد'
  },
  {
    type: 'speak',
    word: 'kayın',
    image: '../../../media/a2/family/inlaw.png',
    meaning: 'خویشاوند سببی'
  },
  {
    type: 'speak',
    word: 'üvey baba',
    image: '../../../media/a2/family/stepfather.png',
    meaning: 'پدرخوانده'
  },
  {
    type: 'speak',
    word: 'üvey anne',
    image: '../../../media/a2/family/stepmother.png',
    meaning: 'مادرخوانده'
  },
  {
    type: 'speak',
    word: 'üvey kız kardeş',
    image: '../../../media/a2/family/stepsister.png',
    meaning: 'خواهر ناتنی'
  },

  // ===== بخش ۵: BUILD TR (ساخت جمله ترکی) =====
  {
    type: 'build-tr',
    speak: 'O damat',
    question: 'جمله ترکی را بساز:',
    text: 'او داماد است',
    words: ['damat', 'O'],
    answer: ['O', 'damat']
  },
  {
    type: 'build-tr',
    speak: 'O benim kayınım',
    question: 'جمله ترکی را بساز:',
    text: 'او خویشاوند سببی من است',
    words: ['benim', 'kayınım', 'O'],
    answer: ['O', 'benim', 'kayınım']
  },
  {
    type: 'build-tr',
    speak: 'O benim üvey babam',
    question: 'جمله ترکی را بساز:',
    text: 'او پدرخوانده من است',
    words: ['benim', 'üvey', 'babam', 'O'],
    answer: ['O', 'benim', 'üvey', 'babam']
  },
  {
    type: 'build-tr',
    speak: 'O benim üvey annem',
    question: 'جمله ترکی را بساز:',
    text: 'او مادرخوانده من است',
    words: ['benim', 'üvey', 'annem', 'O'],
    answer: ['O', 'benim', 'üvey', 'annem']
  },
  {
    type: 'build-tr',
    speak: 'O benim üvey kız kardeşim',
    question: 'جمله ترکی را بساز:',
    text: 'او خواهر ناتنی من است',
    words: ['benim', 'üvey', 'kız', 'kardeşim', 'O'],
    answer: ['O', 'benim', 'üvey', 'kız', 'kardeşim']
  },

  // ===== بخش ۶: BUILD FA (ترجمه به فارسی) =====
  {
    type: 'build-fa',
    speak: 'O damat',
    question: 'ترجمه را بساز:',
    text: 'O damat',
    words: ['است', 'داماد', 'او'],
    answer: ['او', 'داماد', 'است']
  },
  {
    type: 'build-fa',
    speak: 'O benim kayınım',
    question: 'ترجمه را بساز:',
    text: 'O benim kayınım',
    words: ['است', 'سببی', 'خویشاوند', 'من', 'او'],
    answer: ['او', 'خویشاوند', 'سببی', 'من', 'است']
  },
  {
    type: 'build-fa',
    speak: 'O benim üvey babam',
    question: 'ترجمه را بساز:',
    text: 'O benim üvey babam',
    words: ['است', 'پدرخوانده', 'من', 'او'],
    answer: ['او', 'پدرخوانده', 'من', 'است']
  },
  {
    type: 'build-fa',
    speak: 'O benim üvey annem',
    question: 'ترجمه را بساز:',
    text: 'O benim üvey annem',
    words: ['است', 'مادرخوانده', 'من', 'او'],
    answer: ['او', 'مادرخوانده', 'من', 'است']
  },
  {
    type: 'build-fa',
    speak: 'O benim üvey kız kardeşim',
    question: 'ترجمه را بساز:',
    text: 'O benim üvey kız kardeşim',
    words: ['است', 'ناتنی', 'خواهر', 'من', 'او'],
    answer: ['او', 'خواهر', 'ناتنی', 'من', 'است']
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