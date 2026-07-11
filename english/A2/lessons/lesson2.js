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

// ===== سوالات درس ۲ =====
const questions = [

  // ===== بخش ۱: IMAGE (۵ تا) =====
  {
    type: 'image',
    question: 'husband کدام است؟',
    speak: 'husband',
    options: [
      { text: 'wife', image: '../../../media/a2/family/wife.png' },
      { text: 'husband', image: '../../../media/a2/family/husband.png' },
      { text: 'parent', image: '../../../media/a2/family/parent.png' },
      { text: 'grandparent', image: '../../../media/a2/family/grandparent.png' }
    ],
    answer: 'husband'
  },
  {
    type: 'image',
    question: 'wife کدام است؟',
    speak: 'wife',
    options: [
      { text: 'grandparent', image: '../../../media/a2/family/grandparent.png' },
      { text: 'wife', image: '../../../media/a2/family/wife.png' },
      { text: 'grandchild', image: '../../../media/a2/family/grandchild.png' },
      { text: 'husband', image: '../../../media/a2/family/husband.png' }
    ],
    answer: 'wife'
  },
  {
    type: 'image',
    question: 'parent کدام است؟',
    speak: 'parent',
    options: [
      { text: 'husband', image: '../../../media/a2/family/husband.png' },
      { text: 'parent', image: '../../../media/a2/family/parent.png' },
      { text: 'grandchild', image: '../../../media/a2/family/grandchild.png' },
      { text: 'wife', image: '../../../media/a2/family/wife.png' }
    ],
    answer: 'parent'
  },
  {
    type: 'image',
    question: 'grandparent کدام است؟',
    speak: 'grandparent',
    options: [
      { text: 'grandparent', image: '../../../media/a2/family/grandparent.png' },
      { text: 'wife', image: '../../../media/a2/family/wife.png' },
      { text: 'husband', image: '../../../media/a2/family/husband.png' },
      { text: 'parent', image: '../../../media/a2/family/parent.png' }
    ],
    answer: 'grandparent'
  },
  {
    type: 'image',
    question: 'grandchild کدام است؟',
    speak: 'grandchild',
    options: [
      { text: 'parent', image: '../../../media/a2/family/parent.png' },
      { text: 'husband', image: '../../../media/a2/family/husband.png' },
      { text: 'grandchild', image: '../../../media/a2/family/grandchild.png' },
      { text: 'wife', image: '../../../media/a2/family/wife.png' }
    ],
    answer: 'grandchild'
  },

  // ===== بخش ۲: WORD (۵ تا) =====
  {
    type: 'word',
    question: 'این تصویر چیست؟',
    image: '../../../media/a2/family/husband.png',
    options: ['wife', 'husband', 'parent', 'grandparent'],
    answer: 'husband'
  },
  {
    type: 'word',
    question: 'این تصویر چیست؟',
    image: '../../../media/a2/family/wife.png',
    options: ['grandparent', 'wife', 'grandchild', 'husband'],
    answer: 'wife'
  },
  {
    type: 'word',
    question: 'این تصویر چیست؟',
    image: '../../../media/a2/family/parent.png',
    options: ['husband', 'parent', 'grandchild', 'wife'],
    answer: 'parent'
  },
  {
    type: 'word',
    question: 'این تصویر چیست؟',
    image: '../../../media/a2/family/grandparent.png',
    options: ['grandparent', 'wife', 'husband', 'parent'],
    answer: 'grandparent'
  },
  {
    type: 'word',
    question: 'این تصویر چیست؟',
    image: '../../../media/a2/family/grandchild.png',
    options: ['parent', 'husband', 'grandchild', 'wife'],
    answer: 'grandchild'
  },

  // ===== بخش ۳: AUDIO (۵ تا) =====
  {
    type: 'audio',
    speak: 'husband',
    question: 'کدام کلمه را شنیدی؟',
    options: ['husband', 'wife', 'parent', 'grandparent'],
    answer: 'husband'
  },
  {
    type: 'audio',
    speak: 'wife',
    question: 'کدام کلمه را شنیدی؟',
    options: ['grandparent', 'wife', 'grandchild', 'husband'],
    answer: 'wife'
  },
  {
    type: 'audio',
    speak: 'parent',
    question: 'کدام کلمه را شنیدی؟',
    options: ['husband', 'parent', 'grandchild', 'wife'],
    answer: 'parent'
  },
  {
    type: 'audio',
    speak: 'grandparent',
    question: 'کدام کلمه را شنیدی؟',
    options: ['grandparent', 'wife', 'husband', 'parent'],
    answer: 'grandparent'
  },
  {
    type: 'audio',
    speak: 'grandchild',
    question: 'کدام کلمه را شنیدی؟',
    options: ['parent', 'husband', 'grandchild', 'wife'],
    answer: 'grandchild'
  },

  // ===== بخش ۴: SPEAK (۵ تا) =====
  {
    type: 'speak',
    word: 'husband',
    image: '../../../media/a2/family/husband.png',
    meaning: 'شوهر'
  },
  {
    type: 'speak',
    word: 'wife',
    image: '../../../media/a2/family/wife.png',
    meaning: 'همسر'
  },
  {
    type: 'speak',
    word: 'parent',
    image: '../../../media/a2/family/parent.png',
    meaning: 'والدین'
  },
  {
    type: 'speak',
    word: 'grandparent',
    image: '../../../media/a2/family/grandparent.png',
    meaning: 'پدربزرگ/مادربزرگ'
  },
  {
    type: 'speak',
    word: 'grandchild',
    image: '../../../media/a2/family/grandchild.png',
    meaning: 'نوه'
  },

  // ===== بخش ۵: BUILD EN (۵ تا) =====
  {
    type: 'build-en',
    speak: 'He is my husband',
    question: 'جمله انگلیسی را بساز:',
    text: 'او شوهر من است',
    words: ['husband', 'my', 'is', 'He'],
    answer: ['He', 'is', 'my', 'husband']
  },
  {
    type: 'build-en',
    speak: 'She is my wife',
    question: 'جمله انگلیسی را بساز:',
    text: 'او همسر من است',
    words: ['wife', 'my', 'is', 'She'],
    answer: ['She', 'is', 'my', 'wife']
  },
  {
    type: 'build-en',
    speak: 'He is my parent',
    question: 'جمله انگلیسی را بساز:',
    text: 'او والدین من است',
    words: ['parent', 'my', 'is', 'He'],
    answer: ['He', 'is', 'my', 'parent']
  },
  {
    type: 'build-en',
    speak: 'She is my grandparent',
    question: 'جمله انگلیسی را بساز:',
    text: 'او مادربزرگ من است',
    words: ['grandparent', 'my', 'is', 'She'],
    answer: ['She', 'is', 'my', 'grandparent']
  },
  {
    type: 'build-en',
    speak: 'He is my grandchild',
    question: 'جمله انگلیسی را بساز:',
    text: 'او نوه من است',
    words: ['grandchild', 'my', 'is', 'He'],
    answer: ['He', 'is', 'my', 'grandchild']
  },

  // ===== بخش ۶: BUILD FA (۵ تا) =====
  {
    type: 'build-fa',
    speak: 'He is my husband',
    question: 'ترجمه را بساز:',
    text: 'He is my husband',
    words: ['است', 'شوهر', 'او', 'من'],
    answer: ['او', 'شوهر', 'من', 'است']
  },
  {
    type: 'build-fa',
    speak: 'She is my wife',
    question: 'ترجمه را بساز:',
    text: 'She is my wife',
    words: ['است', 'همسر', 'او', 'من'],
    answer: ['او', 'همسر', 'من', 'است']
  },
  {
    type: 'build-fa',
    speak: 'He is my parent',
    question: 'ترجمه را بساز:',
    text: 'He is my parent',
    words: ['است', 'والدین', 'او', 'من'],
    answer: ['او', 'والدین', 'من', 'است']
  },
  {
    type: 'build-fa',
    speak: 'She is my grandparent',
    question: 'ترجمه را بساز:',
    text: 'She is my grandparent',
    words: ['است', 'مادربزرگ', 'او', 'من'],
    answer: ['او', 'مادربزرگ', 'من', 'است']
  },
  {
    type: 'build-fa',
    speak: 'He is my grandchild',
    question: 'ترجمه را بساز:',
    text: 'He is my grandchild',
    words: ['است', 'نوه', 'او', 'من'],
    answer: ['او', 'نوه', 'من', 'است']
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