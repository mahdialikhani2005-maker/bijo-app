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

// ===== سوالات درس ۳۱ =====
const questions = [

  // ===== بخش ۱: IMAGE (۵ تا) =====
  {
    type: 'image',
    question: 'taxi کدام است؟',
    speak: 'taxi',
    options: [
      { text: 'boat', image: '../../../media/a2/vehicles/boat.png' },
      { text: 'taxi', image: '../../../media/a2/vehicles/taxi.png' },
      { text: 'motorcycle', image: '../../../media/a2/vehicles/motorcycle.png' },
      { text: 'helicopter', image: '../../../media/a2/vehicles/helicopter.png' }
    ],
    answer: 'taxi'
  },
  {
    type: 'image',
    question: 'boat کدام است؟',
    speak: 'boat',
    options: [
      { text: 'helicopter', image: '../../../media/a2/vehicles/helicopter.png' },
      { text: 'boat', image: '../../../media/a2/vehicles/boat.png' },
      { text: 'truck', image: '../../../media/a2/vehicles/truck.png' },
      { text: 'taxi', image: '../../../media/a2/vehicles/taxi.png' }
    ],
    answer: 'boat'
  },
  {
    type: 'image',
    question: 'motorcycle کدام است؟',
    speak: 'motorcycle',
    options: [
      { text: 'taxi', image: '../../../media/a2/vehicles/taxi.png' },
      { text: 'motorcycle', image: '../../../media/a2/vehicles/motorcycle.png' },
      { text: 'truck', image: '../../../media/a2/vehicles/truck.png' },
      { text: 'boat', image: '../../../media/a2/vehicles/boat.png' }
    ],
    answer: 'motorcycle'
  },
  {
    type: 'image',
    question: 'helicopter کدام است؟',
    speak: 'helicopter',
    options: [
      { text: 'helicopter', image: '../../../media/a2/vehicles/helicopter.png' },
      { text: 'boat', image: '../../../media/a2/vehicles/boat.png' },
      { text: 'taxi', image: '../../../media/a2/vehicles/taxi.png' },
      { text: 'motorcycle', image: '../../../media/a2/vehicles/motorcycle.png' }
    ],
    answer: 'helicopter'
  },
  {
    type: 'image',
    question: 'truck کدام است؟',
    speak: 'truck',
    options: [
      { text: 'motorcycle', image: '../../../media/a2/vehicles/motorcycle.png' },
      { text: 'taxi', image: '../../../media/a2/vehicles/taxi.png' },
      { text: 'truck', image: '../../../media/a2/vehicles/truck.png' },
      { text: 'boat', image: '../../../media/a2/vehicles/boat.png' }
    ],
    answer: 'truck'
  },

  // ===== بخش ۲: WORD (۵ تا) =====
  {
    type: 'word',
    question: 'این تصویر چیست؟',
    image: '../../../media/a2/vehicles/taxi.png',
    options: ['boat', 'taxi', 'motorcycle', 'helicopter'],
    answer: 'taxi'
  },
  {
    type: 'word',
    question: 'این تصویر چیست؟',
    image: '../../../media/a2/vehicles/boat.png',
    options: ['helicopter', 'boat', 'truck', 'taxi'],
    answer: 'boat'
  },
  {
    type: 'word',
    question: 'این تصویر چیست؟',
    image: '../../../media/a2/vehicles/motorcycle.png',
    options: ['taxi', 'motorcycle', 'truck', 'boat'],
    answer: 'motorcycle'
  },
  {
    type: 'word',
    question: 'این تصویر چیست؟',
    image: '../../../media/a2/vehicles/helicopter.png',
    options: ['helicopter', 'boat', 'taxi', 'motorcycle'],
    answer: 'helicopter'
  },
  {
    type: 'word',
    question: 'این تصویر چیست؟',
    image: '../../../media/a2/vehicles/truck.png',
    options: ['motorcycle', 'taxi', 'truck', 'boat'],
    answer: 'truck'
  },

  // ===== بخش ۳: AUDIO (۵ تا) =====
  {
    type: 'audio',
    speak: 'taxi',
    question: 'کدام کلمه را شنیدی؟',
    options: ['taxi', 'boat', 'motorcycle', 'helicopter'],
    answer: 'taxi'
  },
  {
    type: 'audio',
    speak: 'boat',
    question: 'کدام کلمه را شنیدی؟',
    options: ['helicopter', 'boat', 'truck', 'taxi'],
    answer: 'boat'
  },
  {
    type: 'audio',
    speak: 'motorcycle',
    question: 'کدام کلمه را شنیدی؟',
    options: ['taxi', 'motorcycle', 'truck', 'boat'],
    answer: 'motorcycle'
  },
  {
    type: 'audio',
    speak: 'helicopter',
    question: 'کدام کلمه را شنیدی؟',
    options: ['helicopter', 'boat', 'taxi', 'motorcycle'],
    answer: 'helicopter'
  },
  {
    type: 'audio',
    speak: 'truck',
    question: 'کدام کلمه را شنیدی؟',
    options: ['motorcycle', 'taxi', 'truck', 'boat'],
    answer: 'truck'
  },

  // ===== بخش ۴: SPEAK (۵ تا) =====
  {
    type: 'speak',
    word: 'taxi',
    image: '../../../media/a2/vehicles/taxi.png',
    meaning: 'تاکسی'
  },
  {
    type: 'speak',
    word: 'boat',
    image: '../../../media/a2/vehicles/boat.png',
    meaning: 'قایق'
  },
  {
    type: 'speak',
    word: 'motorcycle',
    image: '../../../media/a2/vehicles/motorcycle.png',
    meaning: 'موتورسیکلت'
  },
  {
    type: 'speak',
    word: 'helicopter',
    image: '../../../media/a2/vehicles/helicopter.png',
    meaning: 'بالگرد'
  },
  {
    type: 'speak',
    word: 'truck',
    image: '../../../media/a2/vehicles/truck.png',
    meaning: 'کامیون'
  },

  // ===== بخش ۵: BUILD EN (۵ تا) =====
  {
    type: 'build-en',
    speak: 'I have a taxi',
    question: 'جمله انگلیسی را بساز:',
    text: 'من تاکسی دارم',
    words: ['taxi', 'a', 'have', 'I'],
    answer: ['I', 'have', 'a', 'taxi']
  },
  {
    type: 'build-en',
    speak: 'I have a boat',
    question: 'جمله انگلیسی را بساز:',
    text: 'من قایق دارم',
    words: ['boat', 'a', 'have', 'I'],
    answer: ['I', 'have', 'a', 'boat']
  },
  {
    type: 'build-en',
    speak: 'I have a motorcycle',
    question: 'جمله انگلیسی را بساز:',
    text: 'من موتورسیکلت دارم',
    words: ['motorcycle', 'a', 'have', 'I'],
    answer: ['I', 'have', 'a', 'motorcycle']
  },
  {
    type: 'build-en',
    speak: 'I have a helicopter',
    question: 'جمله انگلیسی را بساز:',
    text: 'من بالگرد دارم',
    words: ['helicopter', 'a', 'have', 'I'],
    answer: ['I', 'have', 'a', 'helicopter']
  },
  {
    type: 'build-en',
    speak: 'I have a truck',
    question: 'جمله انگلیسی را بساز:',
    text: 'من کامیون دارم',
    words: ['truck', 'a', 'have', 'I'],
    answer: ['I', 'have', 'a', 'truck']
  },

  // ===== بخش ۶: BUILD FA (۵ تا) =====
  {
    type: 'build-fa',
    speak: 'I have a taxi',
    question: 'ترجمه را بساز:',
    text: 'I have a taxi',
    words: ['دارم', 'تاکسی', 'من'],
    answer: ['من', 'تاکسی', 'دارم']
  },
  {
    type: 'build-fa',
    speak: 'I have a boat',
    question: 'ترجمه را بساز:',
    text: 'I have a boat',
    words: ['دارم', 'قایق', 'من'],
    answer: ['من', 'قایق', 'دارم']
  },
  {
    type: 'build-fa',
    speak: 'I have a motorcycle',
    question: 'ترجمه را بساز:',
    text: 'I have a motorcycle',
    words: ['دارم', 'موتورسیکلت', 'من'],
    answer: ['من', 'موتورسیکلت', 'دارم']
  },
  {
    type: 'build-fa',
    speak: 'I have a helicopter',
    question: 'ترجمه را بساز:',
    text: 'I have a helicopter',
    words: ['دارم', 'بالگرد', 'من'],
    answer: ['من', 'بالگرد', 'دارم']
  },
  {
    type: 'build-fa',
    speak: 'I have a truck',
    question: 'ترجمه را بساز:',
    text: 'I have a truck',
    words: ['دارم', 'کامیون', 'من'],
    answer: ['من', 'کامیون', 'دارم']
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