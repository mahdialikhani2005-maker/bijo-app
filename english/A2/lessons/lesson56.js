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

// ===== سوالات درس ۵۶ =====
const questions = [

  // ===== بخش ۱: IMAGE (۵ تا) =====
  {
    type: 'image',
    question: 'computer کدام است؟',
    speak: 'computer',
    options: [
      { text: 'keyboard', image: '../../../media/a2/tech/keyboard.png' },
      { text: 'computer', image: '../../../media/a2/tech/computer.png' },
      { text: 'mouse', image: '../../../media/a2/tech/mouse.png' },
      { text: 'internet', image: '../../../media/a2/tech/internet.png' }
    ],
    answer: 'computer'
  },
  {
    type: 'image',
    question: 'keyboard کدام است؟',
    speak: 'keyboard',
    options: [
      { text: 'computer', image: '../../../media/a2/tech/computer.png' },
      { text: 'keyboard', image: '../../../media/a2/tech/keyboard.png' },
      { text: 'email', image: '../../../media/a2/tech/email.png' },
      { text: 'mouse', image: '../../../media/a2/tech/mouse.png' }
    ],
    answer: 'keyboard'
  },
  {
    type: 'image',
    question: 'mouse کدام است؟',
    speak: 'mouse',
    options: [
      { text: 'internet', image: '../../../media/a2/tech/internet.png' },
      { text: 'computer', image: '../../../media/a2/tech/computer.png' },
      { text: 'mouse', image: '../../../media/a2/tech/mouse.png' },
      { text: 'keyboard', image: '../../../media/a2/tech/keyboard.png' }
    ],
    answer: 'mouse'
  },
  {
    type: 'image',
    question: 'internet کدام است؟',
    speak: 'internet',
    options: [
      { text: 'internet', image: '../../../media/a2/tech/internet.png' },
      { text: 'email', image: '../../../media/a2/tech/email.png' },
      { text: 'computer', image: '../../../media/a2/tech/computer.png' },
      { text: 'keyboard', image: '../../../media/a2/tech/keyboard.png' }
    ],
    answer: 'internet'
  },
  {
    type: 'image',
    question: 'email کدام است؟',
    speak: 'email',
    options: [
      { text: 'mouse', image: '../../../media/a2/tech/mouse.png' },
      { text: 'email', image: '../../../media/a2/tech/email.png' },
      { text: 'internet', image: '../../../media/a2/tech/internet.png' },
      { text: 'computer', image: '../../../media/a2/tech/computer.png' }
    ],
    answer: 'email'
  },

  // ===== بخش ۲: WORD (۵ تا) =====
  {
    type: 'word',
    question: 'این تصویر چیست؟',
    image: '../../../media/a2/tech/computer.png',
    options: ['keyboard', 'computer', 'mouse', 'internet'],
    answer: 'computer'
  },
  {
    type: 'word',
    question: 'این تصویر چیست؟',
    image: '../../../media/a2/tech/keyboard.png',
    options: ['computer', 'keyboard', 'email', 'mouse'],
    answer: 'keyboard'
  },
  {
    type: 'word',
    question: 'این تصویر چیست؟',
    image: '../../../media/a2/tech/mouse.png',
    options: ['internet', 'computer', 'mouse', 'keyboard'],
    answer: 'mouse'
  },
  {
    type: 'word',
    question: 'این تصویر چیست؟',
    image: '../../../media/a2/tech/internet.png',
    options: ['internet', 'email', 'computer', 'keyboard'],
    answer: 'internet'
  },
  {
    type: 'word',
    question: 'این تصویر چیست؟',
    image: '../../../media/a2/tech/email.png',
    options: ['mouse', 'email', 'internet', 'computer'],
    answer: 'email'
  },

  // ===== بخش ۳: AUDIO (۵ تا) =====
  {
    type: 'audio',
    speak: 'computer',
    question: 'کدام کلمه را شنیدی؟',
    options: ['keyboard', 'computer', 'mouse', 'internet'],
    answer: 'computer'
  },
  {
    type: 'audio',
    speak: 'keyboard',
    question: 'کدام کلمه را شنیدی؟',
    options: ['computer', 'keyboard', 'email', 'mouse'],
    answer: 'keyboard'
  },
  {
    type: 'audio',
    speak: 'mouse',
    question: 'کدام کلمه را شنیدی؟',
    options: ['internet', 'computer', 'mouse', 'keyboard'],
    answer: 'mouse'
  },
  {
    type: 'audio',
    speak: 'internet',
    question: 'کدام کلمه را شنیدی؟',
    options: ['internet', 'email', 'computer', 'keyboard'],
    answer: 'internet'
  },
  {
    type: 'audio',
    speak: 'email',
    question: 'کدام کلمه را شنیدی؟',
    options: ['mouse', 'email', 'internet', 'computer'],
    answer: 'email'
  },

  // ===== بخش ۴: SPEAK (۵ تا) =====
  {
    type: 'speak',
    word: 'computer',
    image: '../../../media/a2/tech/computer.png',
    meaning: 'کامپیوتر'
  },
  {
    type: 'speak',
    word: 'keyboard',
    image: '../../../media/a2/tech/keyboard.png',
    meaning: 'صفحه کلید'
  },
  {
    type: 'speak',
    word: 'mouse',
    image: '../../../media/a2/tech/mouse.png',
    meaning: 'ماوس'
  },
  {
    type: 'speak',
    word: 'internet',
    image: '../../../media/a2/tech/internet.png',
    meaning: 'اینترنت'
  },
  {
    type: 'speak',
    word: 'email',
    image: '../../../media/a2/tech/email.png',
    meaning: 'ایمیل'
  },

  // ===== بخش ۵: BUILD EN (۵ تا) =====
  {
    type: 'build-en',
    speak: 'I have a computer',
    question: 'جمله انگلیسی را بساز:',
    text: 'من یک کامپیوتر دارم',
    words: ['computer', 'a', 'have', 'I'],
    answer: ['I', 'have', 'a', 'computer']
  },
  {
    type: 'build-en',
    speak: 'I use a keyboard',
    question: 'جمله انگلیسی را بساز:',
    text: 'من از صفحه کلید استفاده می‌کنم',
    words: ['keyboard', 'a', 'use', 'I'],
    answer: ['I', 'use', 'a', 'keyboard']
  },
  {
    type: 'build-en',
    speak: 'I have a mouse',
    question: 'جمله انگلیسی را بساز:',
    text: 'من یک ماوس دارم',
    words: ['mouse', 'a', 'have', 'I'],
    answer: ['I', 'have', 'a', 'mouse']
  },
  {
    type: 'build-en',
    speak: 'I use the internet',
    question: 'جمله انگلیسی را بساز:',
    text: 'من از اینترنت استفاده می‌کنم',
    words: ['internet', 'the', 'use', 'I'],
    answer: ['I', 'use', 'the', 'internet']
  },
  {
    type: 'build-en',
    speak: 'I send an email',
    question: 'جمله انگلیسی را بساز:',
    text: 'من یک ایمیل می‌فرستم',
    words: ['email', 'an', 'send', 'I'],
    answer: ['I', 'send', 'an', 'email']
  },

  // ===== بخش ۶: BUILD FA (۵ تا) =====
  {
    type: 'build-fa',
    speak: 'I have a computer',
    question: 'ترجمه را بساز:',
    text: 'I have a computer',
    words: ['دارم', 'کامپیوتر', 'یک', 'من'],
    answer: ['من', 'یک', 'کامپیوتر', 'دارم']
  },
  {
    type: 'build-fa',
    speak: 'I use a keyboard',
    question: 'ترجمه را بساز:',
    text: 'I use a keyboard',
    words: ['استفاده می‌کنم', 'صفحه کلید', 'یک', 'از', 'من'],
    answer: ['من', 'از', 'یک', 'صفحه کلید', 'استفاده می‌کنم']
  },
  {
    type: 'build-fa',
    speak: 'I have a mouse',
    question: 'ترجمه را بساز:',
    text: 'I have a mouse',
    words: ['دارم', 'ماوس', 'یک', 'من'],
    answer: ['من', 'یک', 'ماوس', 'دارم']
  },
  {
    type: 'build-fa',
    speak: 'I use the internet',
    question: 'ترجمه را بساز:',
    text: 'I use the internet',
    words: ['استفاده می‌کنم', 'اینترنت', 'از', 'من'],
    answer: ['من', 'از', 'اینترنت', 'استفاده می‌کنم']
  },
  {
    type: 'build-fa',
    speak: 'I send an email',
    question: 'ترجمه را بساز:',
    text: 'I send an email',
    words: ['می‌فرستم', 'ایمیل', 'یک', 'من'],
    answer: ['من', 'یک', 'ایمیل', 'می‌فرستم']
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