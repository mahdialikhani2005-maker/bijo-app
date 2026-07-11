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

// ===== سوالات درس ۴۴ =====
const questions = [

  // ===== بخش ۱: IMAGE (۵ تا) =====
  {
    type: 'image',
    question: 'allergy کدام است؟',
    speak: 'allergy',
    options: [
      { text: 'infection', image: '../../../media/a2/health/infection.png' },
      { text: 'allergy', image: '../../../media/a2/health/allergy.png' },
      { text: 'injury', image: '../../../media/a2/health/injury.png' },
      { text: 'wound', image: '../../../media/a2/health/wound.png' }
    ],
    answer: 'allergy'
  },
  {
    type: 'image',
    question: 'infection کدام است؟',
    speak: 'infection',
    options: [
      { text: 'wound', image: '../../../media/a2/health/wound.png' },
      { text: 'infection', image: '../../../media/a2/health/infection.png' },
      { text: 'scar', image: '../../../media/a2/health/scar.png' },
      { text: 'allergy', image: '../../../media/a2/health/allergy.png' }
    ],
    answer: 'infection'
  },
  {
    type: 'image',
    question: 'injury کدام است؟',
    speak: 'injury',
    options: [
      { text: 'allergy', image: '../../../media/a2/health/allergy.png' },
      { text: 'injury', image: '../../../media/a2/health/injury.png' },
      { text: 'scar', image: '../../../media/a2/health/scar.png' },
      { text: 'infection', image: '../../../media/a2/health/infection.png' }
    ],
    answer: 'injury'
  },
  {
    type: 'image',
    question: 'wound کدام است؟',
    speak: 'wound',
    options: [
      { text: 'wound', image: '../../../media/a2/health/wound.png' },
      { text: 'infection', image: '../../../media/a2/health/infection.png' },
      { text: 'allergy', image: '../../../media/a2/health/allergy.png' },
      { text: 'injury', image: '../../../media/a2/health/injury.png' }
    ],
    answer: 'wound'
  },
  {
    type: 'image',
    question: 'scar کدام است؟',
    speak: 'scar',
    options: [
      { text: 'injury', image: '../../../media/a2/health/injury.png' },
      { text: 'allergy', image: '../../../media/a2/health/allergy.png' },
      { text: 'scar', image: '../../../media/a2/health/scar.png' },
      { text: 'infection', image: '../../../media/a2/health/infection.png' }
    ],
    answer: 'scar'
  },

  // ===== بخش ۲: WORD (۵ تا) =====
  {
    type: 'word',
    question: 'این تصویر چیست؟',
    image: '../../../media/a2/health/allergy.png',
    options: ['infection', 'allergy', 'injury', 'wound'],
    answer: 'allergy'
  },
  {
    type: 'word',
    question: 'این تصویر چیست؟',
    image: '../../../media/a2/health/infection.png',
    options: ['wound', 'infection', 'scar', 'allergy'],
    answer: 'infection'
  },
  {
    type: 'word',
    question: 'این تصویر چیست؟',
    image: '../../../media/a2/health/injury.png',
    options: ['allergy', 'injury', 'scar', 'infection'],
    answer: 'injury'
  },
  {
    type: 'word',
    question: 'این تصویر چیست؟',
    image: '../../../media/a2/health/wound.png',
    options: ['wound', 'infection', 'allergy', 'injury'],
    answer: 'wound'
  },
  {
    type: 'word',
    question: 'این تصویر چیست؟',
    image: '../../../media/a2/health/scar.png',
    options: ['injury', 'allergy', 'scar', 'infection'],
    answer: 'scar'
  },

  // ===== بخش ۳: AUDIO (۵ تا) =====
  {
    type: 'audio',
    speak: 'allergy',
    question: 'کدام کلمه را شنیدی؟',
    options: ['allergy', 'infection', 'injury', 'wound'],
    answer: 'allergy'
  },
  {
    type: 'audio',
    speak: 'infection',
    question: 'کدام کلمه را شنیدی؟',
    options: ['wound', 'infection', 'scar', 'allergy'],
    answer: 'infection'
  },
  {
    type: 'audio',
    speak: 'injury',
    question: 'کدام کلمه را شنیدی؟',
    options: ['allergy', 'injury', 'scar', 'infection'],
    answer: 'injury'
  },
  {
    type: 'audio',
    speak: 'wound',
    question: 'کدام کلمه را شنیدی؟',
    options: ['wound', 'infection', 'allergy', 'injury'],
    answer: 'wound'
  },
  {
    type: 'audio',
    speak: 'scar',
    question: 'کدام کلمه را شنیدی؟',
    options: ['injury', 'allergy', 'scar', 'infection'],
    answer: 'scar'
  },

  // ===== بخش ۴: SPEAK (۵ تا) =====
  {
    type: 'speak',
    word: 'allergy',
    image: '../../../media/a2/health/allergy.png',
    meaning: 'حساسیت'
  },
  {
    type: 'speak',
    word: 'infection',
    image: '../../../media/a2/health/infection.png',
    meaning: 'عفونت'
  },
  {
    type: 'speak',
    word: 'injury',
    image: '../../../media/a2/health/injury.png',
    meaning: 'آسیب'
  },
  {
    type: 'speak',
    word: 'wound',
    image: '../../../media/a2/health/wound.png',
    meaning: 'زخم'
  },
  {
    type: 'speak',
    word: 'scar',
    image: '../../../media/a2/health/scar.png',
    meaning: 'جای زخم'
  },

  // ===== بخش ۵: BUILD EN (۵ تا) =====
  {
    type: 'build-en',
    speak: 'I have an allergy',
    question: 'جمله انگلیسی را بساز:',
    text: 'من حساسیت دارم',
    words: ['allergy', 'an', 'have', 'I'],
    answer: ['I', 'have', 'an', 'allergy']
  },
  {
    type: 'build-en',
    speak: 'I have an infection',
    question: 'جمله انگلیسی را بساز:',
    text: 'من عفونت دارم',
    words: ['infection', 'an', 'have', 'I'],
    answer: ['I', 'have', 'an', 'infection']
  },
  {
    type: 'build-en',
    speak: 'I have an injury',
    question: 'جمله انگلیسی را بساز:',
    text: 'من آسیب دارم',
    words: ['injury', 'an', 'have', 'I'],
    answer: ['I', 'have', 'an', 'injury']
  },
  {
    type: 'build-en',
    speak: 'I have a wound',
    question: 'جمله انگلیسی را بساز:',
    text: 'من زخم دارم',
    words: ['wound', 'a', 'have', 'I'],
    answer: ['I', 'have', 'a', 'wound']
  },
  {
    type: 'build-en',
    speak: 'I have a scar',
    question: 'جمله انگلیسی را بساز:',
    text: 'من جای زخم دارم',
    words: ['scar', 'a', 'have', 'I'],
    answer: ['I', 'have', 'a', 'scar']
  },

  // ===== بخش ۶: BUILD FA (۵ تا) =====
  {
    type: 'build-fa',
    speak: 'I have an allergy',
    question: 'ترجمه را بساز:',
    text: 'I have an allergy',
    words: ['دارم', 'حساسیت', 'من'],
    answer: ['من', 'حساسیت', 'دارم']
  },
  {
    type: 'build-fa',
    speak: 'I have an infection',
    question: 'ترجمه را بساز:',
    text: 'I have an infection',
    words: ['دارم', 'عفونت', 'من'],
    answer: ['من', 'عفونت', 'دارم']
  },
  {
    type: 'build-fa',
    speak: 'I have an injury',
    question: 'ترجمه را بساز:',
    text: 'I have an injury',
    words: ['دارم', 'آسیب', 'من'],
    answer: ['من', 'آسیب', 'دارم']
  },
  {
    type: 'build-fa',
    speak: 'I have a wound',
    question: 'ترجمه را بساز:',
    text: 'I have a wound',
    words: ['دارم', 'زخم', 'من'],
    answer: ['من', 'زخم', 'دارم']
  },
  {
    type: 'build-fa',
    speak: 'I have a scar',
    question: 'ترجمه را بساز:',
    text: 'I have a scar',
    words: ['دارم', 'جای زخم', 'من'],
    answer: ['من', 'جای زخم', 'دارم']
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