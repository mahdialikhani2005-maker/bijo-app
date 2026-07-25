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

// ===== سوالات درس ۲۵ =====
const questions = [

  // ===== بخش ۱: IMAGE (۵ تا) =====
  {
    type: 'image',
    question: 'toast کدام است؟',
    speak: 'toast',
    options: [
      { text: 'cereal', image: '../../../media/a2/food/cereal.png' },
      { text: 'toast', image: '../../../media/a2/food/toast.png' },
      { text: 'oatmeal', image: '../../../media/a2/food/oatmeal.png' },
      { text: 'jam', image: '../../../media/a2/food/jam.png' }
    ],
    answer: 'toast'
  },
  {
    type: 'image',
    question: 'cereal کدام است؟',
    speak: 'cereal',
    options: [
      { text: 'jam', image: '../../../media/a2/food/jam.png' },
      { text: 'cereal', image: '../../../media/a2/food/cereal.png' },
      { text: 'honey', image: '../../../media/a2/food/honey.png' },
      { text: 'toast', image: '../../../media/a2/food/toast.png' }
    ],
    answer: 'cereal'
  },
  {
    type: 'image',
    question: 'oatmeal کدام است؟',
    speak: 'oatmeal',
    options: [
      { text: 'toast', image: '../../../media/a2/food/toast.png' },
      { text: 'oatmeal', image: '../../../media/a2/food/oatmeal.png' },
      { text: 'honey', image: '../../../media/a2/food/honey.png' },
      { text: 'cereal', image: '../../../media/a2/food/cereal.png' }
    ],
    answer: 'oatmeal'
  },
  {
    type: 'image',
    question: 'jam کدام است؟',
    speak: 'jam',
    options: [
      { text: 'jam', image: '../../../media/a2/food/jam.png' },
      { text: 'cereal', image: '../../../media/a2/food/cereal.png' },
      { text: 'toast', image: '../../../media/a2/food/toast.png' },
      { text: 'oatmeal', image: '../../../media/a2/food/oatmeal.png' }
    ],
    answer: 'jam'
  },
  {
    type: 'image',
    question: 'honey کدام است؟',
    speak: 'honey',
    options: [
      { text: 'oatmeal', image: '../../../media/a2/food/oatmeal.png' },
      { text: 'toast', image: '../../../media/a2/food/toast.png' },
      { text: 'honey', image: '../../../media/a2/food/honey.png' },
      { text: 'cereal', image: '../../../media/a2/food/cereal.png' }
    ],
    answer: 'honey'
  },

  // ===== بخش ۲: WORD (۵ تا) =====
  {
    type: 'word',
    question: 'این تصویر چیست؟',
    image: '../../../media/a2/food/toast.png',
    options: ['cereal', 'toast', 'oatmeal', 'jam'],
    answer: 'toast'
  },
  {
    type: 'word',
    question: 'این تصویر چیست؟',
    image: '../../../media/a2/food/cereal.png',
    options: ['jam', 'cereal', 'honey', 'toast'],
    answer: 'cereal'
  },
  {
    type: 'word',
    question: 'این تصویر چیست؟',
    image: '../../../media/a2/food/oatmeal.png',
    options: ['toast', 'oatmeal', 'honey', 'cereal'],
    answer: 'oatmeal'
  },
  {
    type: 'word',
    question: 'این تصویر چیست؟',
    image: '../../../media/a2/food/jam.png',
    options: ['jam', 'cereal', 'toast', 'oatmeal'],
    answer: 'jam'
  },
  {
    type: 'word',
    question: 'این تصویر چیست؟',
    image: '../../../media/a2/food/honey.png',
    options: ['oatmeal', 'toast', 'honey', 'cereal'],
    answer: 'honey'
  },

  // ===== بخش ۳: AUDIO (۵ تا) =====
  {
    type: 'audio',
    speak: 'toast',
    question: 'کدام کلمه را شنیدی؟',
    options: ['toast', 'cereal', 'oatmeal', 'jam'],
    answer: 'toast'
  },
  {
    type: 'audio',
    speak: 'cereal',
    question: 'کدام کلمه را شنیدی؟',
    options: ['jam', 'cereal', 'honey', 'toast'],
    answer: 'cereal'
  },
  {
    type: 'audio',
    speak: 'oatmeal',
    question: 'کدام کلمه را شنیدی؟',
    options: ['toast', 'oatmeal', 'honey', 'cereal'],
    answer: 'oatmeal'
  },
  {
    type: 'audio',
    speak: 'jam',
    question: 'کدام کلمه را شنیدی؟',
    options: ['jam', 'cereal', 'toast', 'oatmeal'],
    answer: 'jam'
  },
  {
    type: 'audio',
    speak: 'honey',
    question: 'کدام کلمه را شنیدی؟',
    options: ['oatmeal', 'toast', 'honey', 'cereal'],
    answer: 'honey'
  },

  // ===== بخش ۴: SPEAK (۵ تا) =====
  {
    type: 'speak',
    word: 'toast',
    image: '../../../media/a2/food/toast.png',
    meaning: 'نان تست'
  },
  {
    type: 'speak',
    word: 'cereal',
    image: '../../../media/a2/food/cereal.png',
    meaning: 'غلات صبحانه'
  },
  {
    type: 'speak',
    word: 'oatmeal',
    image: '../../../media/a2/food/oatmeal.png',
    meaning: 'بلغور جو'
  },
  {
    type: 'speak',
    word: 'jam',
    image: '../../../media/a2/food/jam.png',
    meaning: 'مربا'
  },
  {
    type: 'speak',
    word: 'honey',
    image: '../../../media/a2/food/honey.png',
    meaning: 'عسل'
  },

  // ===== بخش ۵: BUILD EN (۵ تا) =====
  {
    type: 'build-en',
    speak: 'I eat toast',
    question: 'جمله انگلیسی را بساز:',
    text: 'من نان تست می‌خورم',
    words: ['toast', 'eat', 'I'],
    answer: ['I', 'eat', 'toast']
  },
  {
    type: 'build-en',
    speak: 'I eat cereal',
    question: 'جمله انگلیسی را بساز:',
    text: 'من غلات صبحانه می‌خورم',
    words: ['cereal', 'eat', 'I'],
    answer: ['I', 'eat', 'cereal']
  },
  {
    type: 'build-en',
    speak: 'I eat oatmeal',
    question: 'جمله انگلیسی را بساز:',
    text: 'من بلغور جو می‌خورم',
    words: ['oatmeal', 'eat', 'I'],
    answer: ['I', 'eat', 'oatmeal']
  },
  {
    type: 'build-en',
    speak: 'I eat jam',
    question: 'جمله انگلیسی را بساز:',
    text: 'من مربا می‌خورم',
    words: ['jam', 'eat', 'I'],
    answer: ['I', 'eat', 'jam']
  },
  {
    type: 'build-en',
    speak: 'I eat honey',
    question: 'جمله انگلیسی را بساز:',
    text: 'من عسل می‌خورم',
    words: ['honey', 'eat', 'I'],
    answer: ['I', 'eat', 'honey']
  },

  // ===== بخش ۶: BUILD FA (۵ تا) =====
  {
    type: 'build-fa',
    speak: 'I eat toast',
    question: 'ترجمه را بساز:',
    text: 'I eat toast',
    words: ['می‌خورم', 'نان تست', 'من'],
    answer: ['من', 'نان تست', 'می‌خورم']
  },
  {
    type: 'build-fa',
    speak: 'I eat cereal',
    question: 'ترجمه را بساز:',
    text: 'I eat cereal',
    words: ['می‌خورم', 'غلات', 'صبحانه', 'من'],
    answer: ['من', 'غلات', 'صبحانه', 'می‌خورم']
  },
  {
    type: 'build-fa',
    speak: 'I eat oatmeal',
    question: 'ترجمه را بساز:',
    text: 'I eat oatmeal',
    words: ['می‌خورم', 'بلغور جو', 'من'],
    answer: ['من', 'بلغور جو', 'می‌خورم']
  },
  {
    type: 'build-fa',
    speak: 'I eat jam',
    question: 'ترجمه را بساز:',
    text: 'I eat jam',
    words: ['می‌خورم', 'مربا', 'من'],
    answer: ['من', 'مربا', 'می‌خورم']
  },
  {
    type: 'build-fa',
    speak: 'I eat honey',
    question: 'ترجمه را بساز:',
    text: 'I eat honey',
    words: ['می‌خورم', 'عسل', 'من'],
    answer: ['من', 'عسل', 'می‌خورم']
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