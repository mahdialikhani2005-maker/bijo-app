let current = 0;
let xp = 0;
let recognition = null;
let isRecording = false;

// ===== تابع پخش صدا =====
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

// ===== سوالات درس ۴۷ - ترکی به فارسی =====
const questions = [

  // ===== بخش ۱: IMAGE (۵ تا) =====
  {
    type: 'image',
    question: 'کدام تصویر برای "sözlük" است؟',
    speak: 'sözlük',
    options: [
      { text: 'sözlük', image: '../../../media/a2/school/dictionary.png' },
      { text: 'ansiklopedi', image: '../../../media/a2/school/encyclopedia.png' },
      { text: 'atlas', image: '../../../media/a2/school/atlas.png' },
      { text: 'pusula', image: '../../../media/a2/school/compass.png' }
    ],
    answer: 'sözlük'
  },
  {
    type: 'image',
    question: 'کدام تصویر برای "ansiklopedi" است؟',
    speak: 'ansiklopedi',
    options: [
      { text: 'iletki', image: '../../../media/a2/school/protractor.png' },
      { text: 'ansiklopedi', image: '../../../media/a2/school/encyclopedia.png' },
      { text: 'sözlük', image: '../../../media/a2/school/dictionary.png' },
      { text: 'atlas', image: '../../../media/a2/school/atlas.png' }
    ],
    answer: 'ansiklopedi'
  },
  {
    type: 'image',
    question: 'کدام تصویر برای "atlas" است؟',
    speak: 'atlas',
    options: [
      { text: 'sözlük', image: '../../../media/a2/school/dictionary.png' },
      { text: 'atlas', image: '../../../media/a2/school/atlas.png' },
      { text: 'pusula', image: '../../../media/a2/school/compass.png' },
      { text: 'ansiklopedi', image: '../../../media/a2/school/encyclopedia.png' }
    ],
    answer: 'atlas'
  },
  {
    type: 'image',
    question: 'کدام تصویر برای "pusula" است؟',
    speak: 'pusula',
    options: [
      { text: 'ansiklopedi', image: '../../../media/a2/school/encyclopedia.png' },
      { text: 'sözlük', image: '../../../media/a2/school/dictionary.png' },
      { text: 'atlas', image: '../../../media/a2/school/atlas.png' },
      { text: 'pusula', image: '../../../media/a2/school/compass.png' }
    ],
    answer: 'pusula'
  },
  {
    type: 'image',
    question: 'کدام تصویر برای "iletki" است؟',
    speak: 'iletki',
    options: [
      { text: 'iletki', image: '../../../media/a2/school/protractor.png' },
      { text: 'pusula', image: '../../../media/a2/school/compass.png' },
      { text: 'sözlük', image: '../../../media/a2/school/dictionary.png' },
      { text: 'atlas', image: '../../../media/a2/school/atlas.png' }
    ],
    answer: 'iletki'
  },

  // ===== بخش ۲: WORD (۵ تا) =====
  {
    type: 'word',
    question: 'این تصویر چیست؟',
    image: '../../../media/a2/school/dictionary.png',
    options: ['sözlük', 'ansiklopedi', 'atlas', 'pusula'],
    answer: 'sözlük'
  },
  {
    type: 'word',
    question: 'این تصویر چیست؟',
    image: '../../../media/a2/school/encyclopedia.png',
    options: ['sözlük', 'ansiklopedi', 'atlas', 'iletki'],
    answer: 'ansiklopedi'
  },
  {
    type: 'word',
    question: 'این تصویر چیست؟',
    image: '../../../media/a2/school/atlas.png',
    options: ['iletki', 'sözlük', 'atlas', 'ansiklopedi'],
    answer: 'atlas'
  },
  {
    type: 'word',
    question: 'این تصویر چیست؟',
    image: '../../../media/a2/school/compass.png',
    options: ['atlas', 'ansiklopedi', 'pusula', 'sözlük'],
    answer: 'pusula'
  },
  {
    type: 'word',
    question: 'این تصویر چیست؟',
    image: '../../../media/a2/school/protractor.png',
    options: ['sözlük', 'pusula', 'atlas', 'iletki'],
    answer: 'iletki'
  },

  // ===== بخش ۳: AUDIO (۵ تا) =====
  {
    type: 'audio',
    speak: 'sözlük',
    question: 'کدام کلمه را شنیدی؟',
    options: ['sözlük', 'ansiklopedi', 'atlas', 'pusula'],
    answer: 'sözlük'
  },
  {
    type: 'audio',
    speak: 'ansiklopedi',
    question: 'کدام کلمه را شنیدی؟',
    options: ['iletki', 'ansiklopedi', 'sözlük', 'atlas'],
    answer: 'ansiklopedi'
  },
  {
    type: 'audio',
    speak: 'atlas',
    question: 'کدام کلمه را شنیدی؟',
    options: ['sözlük', 'atlas', 'pusula', 'ansiklopedi'],
    answer: 'atlas'
  },
  {
    type: 'audio',
    speak: 'pusula',
    question: 'کدام کلمه را شنیدی؟',
    options: ['ansiklopedi', 'sözlük', 'atlas', 'pusula'],
    answer: 'pusula'
  },
  {
    type: 'audio',
    speak: 'iletki',
    question: 'کدام کلمه را شنیدی؟',
    options: ['iletki', 'pusula', 'sözlük', 'atlas'],
    answer: 'iletki'
  },

  // ===== بخش ۴: SPEAK (۵ تا) =====
  {
    type: 'speak',
    word: 'sözlük',
    image: '../../../media/a2/school/dictionary.png',
    meaning: 'فرهنگ لغت'
  },
  {
    type: 'speak',
    word: 'ansiklopedi',
    image: '../../../media/a2/school/encyclopedia.png',
    meaning: 'دایرةالمعارف'
  },
  {
    type: 'speak',
    word: 'atlas',
    image: '../../../media/a2/school/atlas.png',
    meaning: 'اطلس'
  },
  {
    type: 'speak',
    word: 'pusula',
    image: '../../../media/a2/school/compass.png',
    meaning: 'قطب‌نما'
  },
  {
    type: 'speak',
    word: 'iletki',
    image: '../../../media/a2/school/protractor.png',
    meaning: 'نقاله'
  },

  // ===== بخش ۵: BUILD IT (ساخت جمله ترکی) =====
  {
    type: 'build-it',
    speak: 'Sözlük kullanıyorum',
    question: 'جمله ترکی را بساز:',
    text: 'من فرهنگ لغت استفاده می‌کنم',
    words: ['kullanıyorum', 'Sözlük'],
    answer: ['Sözlük', 'kullanıyorum']
  },
  {
    type: 'build-it',
    speak: 'Ansiklopedi okuyorum',
    question: 'جمله ترکی را بساز:',
    text: 'من دایرةالمعارف می‌خوانم',
    words: ['okuyorum', 'Ansiklopedi'],
    answer: ['Ansiklopedi', 'okuyorum']
  },
  {
    type: 'build-it',
    speak: 'Atlasa bakıyorum',
    question: 'جمله ترکی را بساز:',
    text: 'من به اطلس نگاه می‌کنم',
    words: ['bakıyorum', 'Atlasa'],
    answer: ['Atlasa', 'bakıyorum']
  },
  {
    type: 'build-it',
    speak: 'Pusula kullanıyorum',
    question: 'جمله ترکی را بساز:',
    text: 'من قطب‌نما استفاده می‌کنم',
    words: ['kullanıyorum', 'Pusula'],
    answer: ['Pusula', 'kullanıyorum']
  },
  {
    type: 'build-it',
    speak: 'İletki ile açı ölçüyorum',
    question: 'جمله ترکی را بساز:',
    text: 'من با نقاله زاویه اندازه می‌گیرم',
    words: ['ölçüyorum', 'ile', 'açı', 'İletki'],
    answer: ['İletki', 'ile', 'açı', 'ölçüyorum']
  },

  // ===== بخش ۶: BUILD FA (ترجمه به فارسی) =====
  {
    type: 'build-fa',
    speak: 'Sözlük kullanıyorum',
    question: 'ترجمه را بساز:',
    text: 'Sözlük kullanıyorum',
    words: ['من', 'استفاده می‌کنم', 'فرهنگ لغت'],
    answer: ['من', 'فرهنگ لغت', 'استفاده می‌کنم']
  },
  {
    type: 'build-fa',
    speak: 'Ansiklopedi okuyorum',
    question: 'ترجمه را بساز:',
    text: 'Ansiklopedi okuyorum',
    words: ['من', 'می‌خوانم', 'دایرةالمعارف'],
    answer: ['من', 'دایرةالمعارف', 'می‌خوانم']
  },
  {
    type: 'build-fa',
    speak: 'Atlasa bakıyorum',
    question: 'ترجمه را بساز:',
    text: 'Atlasa bakıyorum',
    words: ['من', 'نگاه می‌کنم', 'به اطلس'],
    answer: ['من', 'به اطلس', 'نگاه می‌کنم']
  },
  {
    type: 'build-fa',
    speak: 'Pusula kullanıyorum',
    question: 'ترجمه را بساز:',
    text: 'Pusula kullanıyorum',
    words: ['من', 'استفاده می‌کنم', 'قطب‌نما'],
    answer: ['من', 'قطب‌نما', 'استفاده می‌کنم']
  },
  {
    type: 'build-fa',
    speak: 'İletki ile açı ölçüyorum',
    question: 'ترجمه را بساز:',
    text: 'İletki ile açı ölçüyorum',
    words: ['من', 'اندازه می‌گیرم', 'زاویه', 'با نقاله'],
    answer: ['من', 'با نقاله', 'زاویه', 'اندازه می‌گیرم']
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

  // ===== بخش BUILD IT / FA =====
  if (q.type === 'build-it' || q.type === 'build-fa') {
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

    if (q.type === 'build-it') {
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