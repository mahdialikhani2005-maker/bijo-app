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

// ===== سوالات درس ۴۵ - ترکی به فارسی =====
const questions = [

  // ===== بخش ۱: IMAGE (۵ تا) =====
  {
    type: 'image',
    question: 'کدام تصویر برای "ameliyat" است؟',
    speak: 'ameliyat',
    options: [
      { text: 'ameliyat', image: '../../../media/a2/health/surgery.png' },
      { text: 'ambulans', image: '../../../media/a2/health/ambulance.png' },
      { text: 'sedye', image: '../../../media/a2/health/stretcher.png' },
      { text: 'alçı', image: '../../../media/a2/health/cast.png' }
    ],
    answer: 'ameliyat'
  },
  {
    type: 'image',
    question: 'کدام تصویر برای "ambulans" است؟',
    speak: 'ambulans',
    options: [
      { text: 'tekerlekli sandalye', image: '../../../media/a2/health/wheelchair.png' },
      { text: 'ambulans', image: '../../../media/a2/health/ambulance.png' },
      { text: 'ameliyat', image: '../../../media/a2/health/surgery.png' },
      { text: 'sedye', image: '../../../media/a2/health/stretcher.png' }
    ],
    answer: 'ambulans'
  },
  {
    type: 'image',
    question: 'کدام تصویر برای "sedye" است؟',
    speak: 'sedye',
    options: [
      { text: 'ameliyat', image: '../../../media/a2/health/surgery.png' },
      { text: 'sedye', image: '../../../media/a2/health/stretcher.png' },
      { text: 'alçı', image: '../../../media/a2/health/cast.png' },
      { text: 'ambulans', image: '../../../media/a2/health/ambulance.png' }
    ],
    answer: 'sedye'
  },
  {
    type: 'image',
    question: 'کدام تصویر برای "tekerlekli sandalye" است؟',
    speak: 'tekerlekli sandalye',
    options: [
      { text: 'ambulans', image: '../../../media/a2/health/ambulance.png' },
      { text: 'ameliyat', image: '../../../media/a2/health/surgery.png' },
      { text: 'sedye', image: '../../../media/a2/health/stretcher.png' },
      { text: 'tekerlekli sandalye', image: '../../../media/a2/health/wheelchair.png' }
    ],
    answer: 'tekerlekli sandalye'
  },
  {
    type: 'image',
    question: 'کدام تصویر برای "alçı" است؟',
    speak: 'alçı',
    options: [
      { text: 'alçı', image: '../../../media/a2/health/cast.png' },
      { text: 'tekerlekli sandalye', image: '../../../media/a2/health/wheelchair.png' },
      { text: 'ameliyat', image: '../../../media/a2/health/surgery.png' },
      { text: 'sedye', image: '../../../media/a2/health/stretcher.png' }
    ],
    answer: 'alçı'
  },

  // ===== بخش ۲: WORD (۵ تا) =====
  {
    type: 'word',
    question: 'این تصویر چیست؟',
    image: '../../../media/a2/health/surgery.png',
    options: ['ameliyat', 'ambulans', 'sedye', 'alçı'],
    answer: 'ameliyat'
  },
  {
    type: 'word',
    question: 'این تصویر چیست؟',
    image: '../../../media/a2/health/ambulance.png',
    options: ['ameliyat', 'ambulans', 'sedye', 'tekerlekli sandalye'],
    answer: 'ambulans'
  },
  {
    type: 'word',
    question: 'این تصویر چیست؟',
    image: '../../../media/a2/health/stretcher.png',
    options: ['tekerlekli sandalye', 'ameliyat', 'sedye', 'ambulans'],
    answer: 'sedye'
  },
  {
    type: 'word',
    question: 'این تصویر چیست؟',
    image: '../../../media/a2/health/wheelchair.png',
    options: ['sedye', 'ambulans', 'alçı', 'tekerlekli sandalye'],
    answer: 'tekerlekli sandalye'
  },
  {
    type: 'word',
    question: 'این تصویر چیست؟',
    image: '../../../media/a2/health/cast.png',
    options: ['ameliyat', 'tekerlekli sandalye', 'sedye', 'alçı'],
    answer: 'alçı'
  },

  // ===== بخش ۳: AUDIO (۵ تا) =====
  {
    type: 'audio',
    speak: 'ameliyat',
    question: 'کدام کلمه را شنیدی؟',
    options: ['ameliyat', 'ambulans', 'sedye', 'alçı'],
    answer: 'ameliyat'
  },
  {
    type: 'audio',
    speak: 'ambulans',
    question: 'کدام کلمه را شنیدی؟',
    options: ['tekerlekli sandalye', 'ambulans', 'ameliyat', 'sedye'],
    answer: 'ambulans'
  },
  {
    type: 'audio',
    speak: 'sedye',
    question: 'کدام کلمه را شنیدی؟',
    options: ['ameliyat', 'sedye', 'alçı', 'ambulans'],
    answer: 'sedye'
  },
  {
    type: 'audio',
    speak: 'tekerlekli sandalye',
    question: 'کدام کلمه را شنیدی؟',
    options: ['ambulans', 'ameliyat', 'sedye', 'tekerlekli sandalye'],
    answer: 'tekerlekli sandalye'
  },
  {
    type: 'audio',
    speak: 'alçı',
    question: 'کدام کلمه را شنیدی؟',
    options: ['alçı', 'tekerlekli sandalye', 'ameliyat', 'sedye'],
    answer: 'alçı'
  },

  // ===== بخش ۴: SPEAK (۵ تا) =====
  {
    type: 'speak',
    word: 'ameliyat',
    image: '../../../media/a2/health/surgery.png',
    meaning: 'جراحی'
  },
  {
    type: 'speak',
    word: 'ambulans',
    image: '../../../media/a2/health/ambulance.png',
    meaning: 'آمبولانس'
  },
  {
    type: 'speak',
    word: 'sedye',
    image: '../../../media/a2/health/stretcher.png',
    meaning: 'برانکارد'
  },
  {
    type: 'speak',
    word: 'tekerlekli sandalye',
    image: '../../../media/a2/health/wheelchair.png',
    meaning: 'صندلی چرخ‌دار'
  },
  {
    type: 'speak',
    word: 'alçı',
    image: '../../../media/a2/health/cast.png',
    meaning: 'گچ'
  },

  // ===== بخش ۵: BUILD IT (ساخت جمله ترکی) =====
  {
    type: 'build-it',
    speak: 'Ameliyat oluyorum',
    question: 'جمله ترکی را بساز:',
    text: 'من جراحی می‌شوم',
    words: ['oluyorum', 'Ameliyat'],
    answer: ['Ameliyat', 'oluyorum']
  },
  {
    type: 'build-it',
    speak: 'Ambulans geliyor',
    question: 'جمله ترکی را بساز:',
    text: 'آمبولانس می‌آید',
    words: ['geliyor', 'Ambulans'],
    answer: ['Ambulans', 'geliyor']
  },
  {
    type: 'build-it',
    speak: 'Sedyeye yatıyorum',
    question: 'جمله ترکی را بساز:',
    text: 'من روی برانکارد دراز می‌کشم',
    words: ['yatıyorum', 'Sedyeye'],
    answer: ['Sedyeye', 'yatıyorum']
  },
  {
    type: 'build-it',
    speak: 'Tekerlekli sandalyede oturuyorum',
    question: 'جمله ترکی را بساز:',
    text: 'من روی صندلی چرخ‌دار نشسته‌ام',
    words: ['oturuyorum', 'sandalyesinde', 'Tekerlekli'],
    answer: ['Tekerlekli', 'sandalyesinde', 'oturuyorum']
  },
  {
    type: 'build-it',
    speak: 'Alçıda kolum var',
    question: 'جمله ترکی را بساز:',
    text: 'بازم در گچ است',
    words: ['var', 'Alçıda', 'kolum'],
    answer: ['Alçıda', 'kolum', 'var']
  },

  // ===== بخش ۶: BUILD FA (ترجمه به فارسی) =====
  {
    type: 'build-fa',
    speak: 'Ameliyat oluyorum',
    question: 'ترجمه را بساز:',
    text: 'Ameliyat oluyorum',
    words: ['من', 'می‌شوم', 'جراحی'],
    answer: ['من', 'جراحی', 'می‌شوم']
  },
  {
    type: 'build-fa',
    speak: 'Ambulans geliyor',
    question: 'ترجمه را بساز:',
    text: 'Ambulans geliyor',
    words: ['می‌آید', 'آمبولانس'],
    answer: ['آمبولانس', 'می‌آید']
  },
  {
    type: 'build-fa',
    speak: 'Sedyeye yatıyorum',
    question: 'ترجمه را بساز:',
    text: 'Sedyeye yatıyorum',
    words: ['من', 'دراز می‌کشم', 'روی برانکارد'],
    answer: ['من', 'روی برانکارد', 'دراز می‌کشم']
  },
  {
    type: 'build-fa',
    speak: 'Tekerlekli sandalyede oturuyorum',
    question: 'ترجمه را بساز:',
    text: 'Tekerlekli sandalyede oturuyorum',
    words: ['من', 'نشسته‌ام', 'روی صندلی چرخ‌دار'],
    answer: ['من', 'روی صندلی چرخ‌دار', 'نشسته‌ام']
  },
  {
    type: 'build-fa',
    speak: 'Alçıda kolum var',
    question: 'ترجمه را بساز:',
    text: 'Alçıda kolum var',
    words: ['است', 'در گچ', 'بازم'],
    answer: ['بازم', 'در گچ', 'است']
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