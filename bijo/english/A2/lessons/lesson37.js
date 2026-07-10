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

// ===== سوالات درس ۳۷ =====
const questions = [

  // ===== بخش ۱: IMAGE (۵ تا) =====
  {
    type: 'image',
    question: 'waterfall کدام است؟',
    speak: 'waterfall',
    options: [
      { text: 'volcano', image: '../../../media/a2/nature/volcano.png' },
      { text: 'waterfall', image: '../../../media/a2/nature/waterfall.png' },
      { text: 'glacier', image: '../../../media/a2/nature/glacier.png' },
      { text: 'canyon', image: '../../../media/a2/nature/canyon.png' }
    ],
    answer: 'waterfall'
  },
  {
    type: 'image',
    question: 'volcano کدام است؟',
    speak: 'volcano',
    options: [
      { text: 'canyon', image: '../../../media/a2/nature/canyon.png' },
      { text: 'volcano', image: '../../../media/a2/nature/volcano.png' },
      { text: 'cave', image: '../../../media/a2/nature/cave.png' },
      { text: 'waterfall', image: '../../../media/a2/nature/waterfall.png' }
    ],
    answer: 'volcano'
  },
  {
    type: 'image',
    question: 'glacier کدام است؟',
    speak: 'glacier',
    options: [
      { text: 'waterfall', image: '../../../media/a2/nature/waterfall.png' },
      { text: 'glacier', image: '../../../media/a2/nature/glacier.png' },
      { text: 'cave', image: '../../../media/a2/nature/cave.png' },
      { text: 'volcano', image: '../../../media/a2/nature/volcano.png' }
    ],
    answer: 'glacier'
  },
  {
    type: 'image',
    question: 'canyon کدام است؟',
    speak: 'canyon',
    options: [
      { text: 'canyon', image: '../../../media/a2/nature/canyon.png' },
      { text: 'volcano', image: '../../../media/a2/nature/volcano.png' },
      { text: 'waterfall', image: '../../../media/a2/nature/waterfall.png' },
      { text: 'glacier', image: '../../../media/a2/nature/glacier.png' }
    ],
    answer: 'canyon'
  },
  {
    type: 'image',
    question: 'cave کدام است؟',
    speak: 'cave',
    options: [
      { text: 'glacier', image: '../../../media/a2/nature/glacier.png' },
      { text: 'waterfall', image: '../../../media/a2/nature/waterfall.png' },
      { text: 'cave', image: '../../../media/a2/nature/cave.png' },
      { text: 'volcano', image: '../../../media/a2/nature/volcano.png' }
    ],
    answer: 'cave'
  },

  // ===== بخش ۲: WORD (۵ تا) =====
  {
    type: 'word',
    question: 'این تصویر چیست؟',
    image: '../../../media/a2/nature/waterfall.png',
    options: ['volcano', 'waterfall', 'glacier', 'canyon'],
    answer: 'waterfall'
  },
  {
    type: 'word',
    question: 'این تصویر چیست؟',
    image: '../../../media/a2/nature/volcano.png',
    options: ['canyon', 'volcano', 'cave', 'waterfall'],
    answer: 'volcano'
  },
  {
    type: 'word',
    question: 'این تصویر چیست؟',
    image: '../../../media/a2/nature/glacier.png',
    options: ['waterfall', 'glacier', 'cave', 'volcano'],
    answer: 'glacier'
  },
  {
    type: 'word',
    question: 'این تصویر چیست؟',
    image: '../../../media/a2/nature/canyon.png',
    options: ['canyon', 'volcano', 'waterfall', 'glacier'],
    answer: 'canyon'
  },
  {
    type: 'word',
    question: 'این تصویر چیست؟',
    image: '../../../media/a2/nature/cave.png',
    options: ['glacier', 'waterfall', 'cave', 'volcano'],
    answer: 'cave'
  },

  // ===== بخش ۳: AUDIO (۵ تا) =====
  {
    type: 'audio',
    speak: 'waterfall',
    question: 'کدام کلمه را شنیدی؟',
    options: ['waterfall', 'volcano', 'glacier', 'canyon'],
    answer: 'waterfall'
  },
  {
    type: 'audio',
    speak: 'volcano',
    question: 'کدام کلمه را شنیدی؟',
    options: ['canyon', 'volcano', 'cave', 'waterfall'],
    answer: 'volcano'
  },
  {
    type: 'audio',
    speak: 'glacier',
    question: 'کدام کلمه را شنیدی؟',
    options: ['waterfall', 'glacier', 'cave', 'volcano'],
    answer: 'glacier'
  },
  {
    type: 'audio',
    speak: 'canyon',
    question: 'کدام کلمه را شنیدی؟',
    options: ['canyon', 'volcano', 'waterfall', 'glacier'],
    answer: 'canyon'
  },
  {
    type: 'audio',
    speak: 'cave',
    question: 'کدام کلمه را شنیدی؟',
    options: ['glacier', 'waterfall', 'cave', 'volcano'],
    answer: 'cave'
  },

  // ===== بخش ۴: SPEAK (۵ تا) =====
  {
    type: 'speak',
    word: 'waterfall',
    image: '../../../media/a2/nature/waterfall.png',
    meaning: 'آبشار'
  },
  {
    type: 'speak',
    word: 'volcano',
    image: '../../../media/a2/nature/volcano.png',
    meaning: 'آتشفشان'
  },
  {
    type: 'speak',
    word: 'glacier',
    image: '../../../media/a2/nature/glacier.png',
    meaning: 'یخچال طبیعی'
  },
  {
    type: 'speak',
    word: 'canyon',
    image: '../../../media/a2/nature/canyon.png',
    meaning: 'دره'
  },
  {
    type: 'speak',
    word: 'cave',
    image: '../../../media/a2/nature/cave.png',
    meaning: 'غار'
  },

  // ===== بخش ۵: BUILD EN (۵ تا) =====
  {
    type: 'build-en',
    speak: 'I see a waterfall',
    question: 'جمله انگلیسی را بساز:',
    text: 'من یک آبشار می‌بینم',
    words: ['waterfall', 'a', 'see', 'I'],
    answer: ['I', 'see', 'a', 'waterfall']
  },
  {
    type: 'build-en',
    speak: 'I see a volcano',
    question: 'جمله انگلیسی را بساز:',
    text: 'من یک آتشفشان می‌بینم',
    words: ['volcano', 'a', 'see', 'I'],
    answer: ['I', 'see', 'a', 'volcano']
  },
  {
    type: 'build-en',
    speak: 'I see a glacier',
    question: 'جمله انگلیسی را بساز:',
    text: 'من یک یخچال طبیعی می‌بینم',
    words: ['glacier', 'a', 'see', 'I'],
    answer: ['I', 'see', 'a', 'glacier']
  },
  {
    type: 'build-en',
    speak: 'I see a canyon',
    question: 'جمله انگلیسی را بساز:',
    text: 'من یک دره می‌بینم',
    words: ['canyon', 'a', 'see', 'I'],
    answer: ['I', 'see', 'a', 'canyon']
  },
  {
    type: 'build-en',
    speak: 'I see a cave',
    question: 'جمله انگلیسی را بساز:',
    text: 'من یک غار می‌بینم',
    words: ['cave', 'a', 'see', 'I'],
    answer: ['I', 'see', 'a', 'cave']
  },

  // ===== بخش ۶: BUILD FA (۵ تا) =====
  {
    type: 'build-fa',
    speak: 'I see a waterfall',
    question: 'ترجمه را بساز:',
    text: 'I see a waterfall',
    words: ['می‌بینم', 'آبشار', 'یک', 'من'],
    answer: ['من', 'یک', 'آبشار', 'می‌بینم']
  },
  {
    type: 'build-fa',
    speak: 'I see a volcano',
    question: 'ترجمه را بساز:',
    text: 'I see a volcano',
    words: ['می‌بینم', 'آتشفشان', 'یک', 'من'],
    answer: ['من', 'یک', 'آتشفشان', 'می‌بینم']
  },
  {
    type: 'build-fa',
    speak: 'I see a glacier',
    question: 'ترجمه را بساز:',
    text: 'I see a glacier',
    words: ['می‌بینم', 'یخچال طبیعی', 'یک', 'من'],
    answer: ['من', 'یک', 'یخچال طبیعی', 'می‌بینم']
  },
  {
    type: 'build-fa',
    speak: 'I see a canyon',
    question: 'ترجمه را بساز:',
    text: 'I see a canyon',
    words: ['می‌بینم', 'دره', 'یک', 'من'],
    answer: ['من', 'یک', 'دره', 'می‌بینم']
  },
  {
    type: 'build-fa',
    speak: 'I see a cave',
    question: 'ترجمه را بساز:',
    text: 'I see a cave',
    words: ['می‌بینم', 'غار', 'یک', 'من'],
    answer: ['من', 'یک', 'غار', 'می‌بینم']
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