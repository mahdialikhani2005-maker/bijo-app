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

// ===== سوالات درس ۳۵ - فرانسوی به فارسی =====
const questions = [

  // ===== بخش ۱: IMAGE (۵ تا) =====
  {
    type: 'image',
    question: 'کدام تصویر برای "le carrosse" است؟',
    speak: 'le carrosse',
    options: [
      { text: 'le carrosse', image: '../../../media/a2/transport/carriage.png' },
      { text: 'le chariot', image: '../../../media/a2/transport/wagon.png' },
      { text: 'le traîneau', image: '../../../media/a2/transport/sleigh.png' },
      { text: 'le pousse-pousse', image: '../../../media/a2/transport/rickshaw.png' }
    ],
    answer: 'le carrosse'
  },
  {
    type: 'image',
    question: 'کدام تصویر برای "le chariot" است؟',
    speak: 'le chariot',
    options: [
      { text: 'le carrosse', image: '../../../media/a2/transport/carriage.png' },
      { text: 'le chariot', image: '../../../media/a2/transport/wagon.png' },
      { text: 'le tramway', image: '../../../media/a2/transport/tram.png' },
      { text: 'le traîneau', image: '../../../media/a2/transport/sleigh.png' }
    ],
    answer: 'le chariot'
  },
  {
    type: 'image',
    question: 'کدام تصویر برای "le traîneau" است؟',
    speak: 'le traîneau',
    options: [
      { text: 'le pousse-pousse', image: '../../../media/a2/transport/rickshaw.png' },
      { text: 'le carrosse', image: '../../../media/a2/transport/carriage.png' },
      { text: 'le traîneau', image: '../../../media/a2/transport/sleigh.png' },
      { text: 'le chariot', image: '../../../media/a2/transport/wagon.png' }
    ],
    answer: 'le traîneau'
  },
  {
    type: 'image',
    question: 'کدام تصویر برای "le pousse-pousse" است؟',
    speak: 'le pousse-pousse',
    options: [
      { text: 'le chariot', image: '../../../media/a2/transport/wagon.png' },
      { text: 'le pousse-pousse', image: '../../../media/a2/transport/rickshaw.png' },
      { text: 'le tramway', image: '../../../media/a2/transport/tram.png' },
      { text: 'le carrosse', image: '../../../media/a2/transport/carriage.png' }
    ],
    answer: 'le pousse-pousse'
  },
  {
    type: 'image',
    question: 'کدام تصویر برای "le tramway" است؟',
    speak: 'le tramway',
    options: [
      { text: 'le carrosse', image: '../../../media/a2/transport/carriage.png' },
      { text: 'le traîneau', image: '../../../media/a2/transport/sleigh.png' },
      { text: 'le tramway', image: '../../../media/a2/transport/tram.png' },
      { text: 'le pousse-pousse', image: '../../../media/a2/transport/rickshaw.png' }
    ],
    answer: 'le tramway'
  },

  // ===== بخش ۲: WORD (۵ تا) =====
  {
    type: 'word',
    question: 'این تصویر چیست؟',
    image: '../../../media/a2/transport/carriage.png',
    options: ['le carrosse', 'le chariot', 'le traîneau', 'le pousse-pousse'],
    answer: 'le carrosse'
  },
  {
    type: 'word',
    question: 'این تصویر چیست؟',
    image: '../../../media/a2/transport/wagon.png',
    options: ['le carrosse', 'le chariot', 'le tramway', 'le traîneau'],
    answer: 'le chariot'
  },
  {
    type: 'word',
    question: 'این تصویر چیست؟',
    image: '../../../media/a2/transport/sleigh.png',
    options: ['le pousse-pousse', 'le carrosse', 'le traîneau', 'le chariot'],
    answer: 'le traîneau'
  },
  {
    type: 'word',
    question: 'این تصویر چیست؟',
    image: '../../../media/a2/transport/rickshaw.png',
    options: ['le chariot', 'le pousse-pousse', 'le tramway', 'le carrosse'],
    answer: 'le pousse-pousse'
  },
  {
    type: 'word',
    question: 'این تصویر چیست؟',
    image: '../../../media/a2/transport/tram.png',
    options: ['le carrosse', 'le traîneau', 'le tramway', 'le pousse-pousse'],
    answer: 'le tramway'
  },

  // ===== بخش ۳: AUDIO (۵ تا) =====
  {
    type: 'audio',
    speak: 'le carrosse',
    question: 'کدام کلمه را شنیدی؟',
    options: ['le carrosse', 'le chariot', 'le traîneau', 'le pousse-pousse'],
    answer: 'le carrosse'
  },
  {
    type: 'audio',
    speak: 'le chariot',
    question: 'کدام کلمه را شنیدی؟',
    options: ['le carrosse', 'le chariot', 'le tramway', 'le traîneau'],
    answer: 'le chariot'
  },
  {
    type: 'audio',
    speak: 'le traîneau',
    question: 'کدام کلمه را شنیدی؟',
    options: ['le pousse-pousse', 'le carrosse', 'le traîneau', 'le chariot'],
    answer: 'le traîneau'
  },
  {
    type: 'audio',
    speak: 'le pousse-pousse',
    question: 'کدام کلمه را شنیدی؟',
    options: ['le chariot', 'le pousse-pousse', 'le tramway', 'le carrosse'],
    answer: 'le pousse-pousse'
  },
  {
    type: 'audio',
    speak: 'le tramway',
    question: 'کدام کلمه را شنیدی؟',
    options: ['le carrosse', 'le traîneau', 'le tramway', 'le pousse-pousse'],
    answer: 'le tramway'
  },

  // ===== بخش ۴: SPEAK (۵ تا) =====
  {
    type: 'speak',
    word: 'le carrosse',
    image: '../../../media/a2/transport/carriage.png',
    meaning: 'کالسکه'
  },
  {
    type: 'speak',
    word: 'le chariot',
    image: '../../../media/a2/transport/wagon.png',
    meaning: 'واگن/گاری'
  },
  {
    type: 'speak',
    word: 'le traîneau',
    image: '../../../media/a2/transport/sleigh.png',
    meaning: 'سورتمه'
  },
  {
    type: 'speak',
    word: 'le pousse-pousse',
    image: '../../../media/a2/transport/rickshaw.png',
    meaning: 'ریکشا'
  },
  {
    type: 'speak',
    word: 'le tramway',
    image: '../../../media/a2/transport/tram.png',
    meaning: 'تراموا'
  },

  // ===== بخش ۵: BUILD EN (ساخت جمله فرانسوی) =====
  {
    type: 'build-en',
    speak: 'Je vois un carrosse',
    question: 'جمله فرانسوی را بساز:',
    text: 'من یک کالسکه می‌بینم',
    words: ['carrosse', 'un', 'vois', 'Je'],
    answer: ['Je', 'vois', 'un', 'carrosse']
  },
  {
    type: 'build-en',
    speak: 'Je vois un chariot',
    question: 'جمله فرانسوی را بساز:',
    text: 'من یک واگن می‌بینم',
    words: ['chariot', 'un', 'vois', 'Je'],
    answer: ['Je', 'vois', 'un', 'chariot']
  },
  {
    type: 'build-en',
    speak: 'Je vois un traîneau',
    question: 'جمله فرانسوی را بساز:',
    text: 'من یک سورتمه می‌بینم',
    words: ['traîneau', 'un', 'vois', 'Je'],
    answer: ['Je', 'vois', 'un', 'traîneau']
  },
  {
    type: 'build-en',
    speak: 'Je vois un pousse-pousse',
    question: 'جمله فرانسوی را بساز:',
    text: 'من یک ریکشا می‌بینم',
    words: ['pousse-pousse', 'un', 'vois', 'Je'],
    answer: ['Je', 'vois', 'un', 'pousse-pousse']
  },
  {
    type: 'build-en',
    speak: 'Je vois un tramway',
    question: 'جمله فرانسوی را بساز:',
    text: 'من یک تراموا می‌بینم',
    words: ['tramway', 'un', 'vois', 'Je'],
    answer: ['Je', 'vois', 'un', 'tramway']
  },

  // ===== بخش ۶: BUILD FA (ترجمه به فارسی) =====
  {
    type: 'build-fa',
    speak: 'Je vois un carrosse',
    question: 'ترجمه را بساز:',
    text: 'Je vois un carrosse',
    words: ['می‌بینم', 'کالسکه', 'یک', 'من'],
    answer: ['من', 'یک', 'کالسکه', 'می‌بینم']
  },
  {
    type: 'build-fa',
    speak: 'Je vois un chariot',
    question: 'ترجمه را بساز:',
    text: 'Je vois un chariot',
    words: ['می‌بینم', 'واگن', 'یک', 'من'],
    answer: ['من', 'یک', 'واگن', 'می‌بینم']
  },
  {
    type: 'build-fa',
    speak: 'Je vois un traîneau',
    question: 'ترجمه را بساز:',
    text: 'Je vois un traîneau',
    words: ['می‌بینم', 'سورتمه', 'یک', 'من'],
    answer: ['من', 'یک', 'سورتمه', 'می‌بینم']
  },
  {
    type: 'build-fa',
    speak: 'Je vois un pousse-pousse',
    question: 'ترجمه را بساز:',
    text: 'Je vois un pousse-pousse',
    words: ['می‌بینم', 'ریکشا', 'یک', 'من'],
    answer: ['من', 'یک', 'ریکشا', 'می‌بینم']
  },
  {
    type: 'build-fa',
    speak: 'Je vois un tramway',
    question: 'ترجمه را بساز:',
    text: 'Je vois un tramway',
    words: ['می‌بینم', 'تراموا', 'یک', 'من'],
    answer: ['من', 'یک', 'تراموا', 'می‌بینم']
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