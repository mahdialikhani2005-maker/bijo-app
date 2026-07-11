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

// ===== سوالات درس ۳ =====
const questions = [

  // ===== بخش ۱: IMAGE (۵ تا) =====
  {
    type: 'image',
    question: 'relative کدام است؟',
    speak: 'relative',
    options: [
      { text: 'twin', image: '../../../media/a2/family/twin.png' },
      { text: 'relative', image: '../../../media/a2/family/relative.png' },
      { text: 'orphan', image: '../../../media/a2/family/orphan.png' },
      { text: 'widow', image: '../../../media/a2/family/widow.png' }
    ],
    answer: 'relative'
  },
  {
    type: 'image',
    question: 'twin کدام است؟',
    speak: 'twin',
    options: [
      { text: 'widow', image: '../../../media/a2/family/widow.png' },
      { text: 'twin', image: '../../../media/a2/family/twin.png' },
      { text: 'bride', image: '../../../media/a2/family/bride.png' },
      { text: 'relative', image: '../../../media/a2/family/relative.png' }
    ],
    answer: 'twin'
  },
  {
    type: 'image',
    question: 'orphan کدام است؟',
    speak: 'orphan',
    options: [
      { text: 'relative', image: '../../../media/a2/family/relative.png' },
      { text: 'orphan', image: '../../../media/a2/family/orphan.png' },
      { text: 'bride', image: '../../../media/a2/family/bride.png' },
      { text: 'twin', image: '../../../media/a2/family/twin.png' }
    ],
    answer: 'orphan'
  },
  {
    type: 'image',
    question: 'widow کدام است؟',
    speak: 'widow',
    options: [
      { text: 'widow', image: '../../../media/a2/family/widow.png' },
      { text: 'twin', image: '../../../media/a2/family/twin.png' },
      { text: 'relative', image: '../../../media/a2/family/relative.png' },
      { text: 'orphan', image: '../../../media/a2/family/orphan.png' }
    ],
    answer: 'widow'
  },
  {
    type: 'image',
    question: 'bride کدام است؟',
    speak: 'bride',
    options: [
      { text: 'orphan', image: '../../../media/a2/family/orphan.png' },
      { text: 'relative', image: '../../../media/a2/family/relative.png' },
      { text: 'bride', image: '../../../media/a2/family/bride.png' },
      { text: 'twin', image: '../../../media/a2/family/twin.png' }
    ],
    answer: 'bride'
  },

  // ===== بخش ۲: WORD (۵ تا) =====
  {
    type: 'word',
    question: 'این تصویر چیست؟',
    image: '../../../media/a2/family/relative.png',
    options: ['twin', 'relative', 'orphan', 'widow'],
    answer: 'relative'
  },
  {
    type: 'word',
    question: 'این تصویر چیست؟',
    image: '../../../media/a2/family/twin.png',
    options: ['widow', 'twin', 'bride', 'relative'],
    answer: 'twin'
  },
  {
    type: 'word',
    question: 'این تصویر چیست؟',
    image: '../../../media/a2/family/orphan.png',
    options: ['relative', 'orphan', 'bride', 'twin'],
    answer: 'orphan'
  },
  {
    type: 'word',
    question: 'این تصویر چیست؟',
    image: '../../../media/a2/family/widow.png',
    options: ['widow', 'twin', 'relative', 'orphan'],
    answer: 'widow'
  },
  {
    type: 'word',
    question: 'این تصویر چیست؟',
    image: '../../../media/a2/family/bride.png',
    options: ['orphan', 'relative', 'bride', 'twin'],
    answer: 'bride'
  },

  // ===== بخش ۳: AUDIO (۵ تا) =====
  {
    type: 'audio',
    speak: 'relative',
    question: 'کدام کلمه را شنیدی؟',
    options: ['relative', 'twin', 'orphan', 'widow'],
    answer: 'relative'
  },
  {
    type: 'audio',
    speak: 'twin',
    question: 'کدام کلمه را شنیدی؟',
    options: ['widow', 'twin', 'bride', 'relative'],
    answer: 'twin'
  },
  {
    type: 'audio',
    speak: 'orphan',
    question: 'کدام کلمه را شنیدی؟',
    options: ['relative', 'orphan', 'bride', 'twin'],
    answer: 'orphan'
  },
  {
    type: 'audio',
    speak: 'widow',
    question: 'کدام کلمه را شنیدی؟',
    options: ['widow', 'twin', 'relative', 'orphan'],
    answer: 'widow'
  },
  {
    type: 'audio',
    speak: 'bride',
    question: 'کدام کلمه را شنیدی؟',
    options: ['orphan', 'relative', 'bride', 'twin'],
    answer: 'bride'
  },

  // ===== بخش ۴: SPEAK (۵ تا) =====
  {
    type: 'speak',
    word: 'relative',
    image: '../../../media/a2/family/relative.png',
    meaning: 'خویشاوند'
  },
  {
    type: 'speak',
    word: 'twin',
    image: '../../../media/a2/family/twin.png',
    meaning: 'دوقلو'
  },
  {
    type: 'speak',
    word: 'orphan',
    image: '../../../media/a2/family/orphan.png',
    meaning: 'یتیم'
  },
  {
    type: 'speak',
    word: 'widow',
    image: '../../../media/a2/family/widow.png',
    meaning: 'بیوه زن'
  },
  {
    type: 'speak',
    word: 'bride',
    image: '../../../media/a2/family/bride.png',
    meaning: 'عروس'
  },

  // ===== بخش ۵: BUILD EN (۵ تا) =====
  {
    type: 'build-en',
    speak: 'She is my relative',
    question: 'جمله انگلیسی را بساز:',
    text: 'او خویشاوند من است',
    words: ['relative', 'my', 'is', 'She'],
    answer: ['She', 'is', 'my', 'relative']
  },
  {
    type: 'build-en',
    speak: 'They are twins',
    question: 'جمله انگلیسی را بساز:',
    text: 'آنها دوقلو هستند',
    words: ['twins', 'are', 'They'],
    answer: ['They', 'are', 'twins']
  },
  {
    type: 'build-en',
    speak: 'He is an orphan',
    question: 'جمله انگلیسی را بساز:',
    text: 'او یتیم است',
    words: ['orphan', 'an', 'is', 'He'],
    answer: ['He', 'is', 'an', 'orphan']
  },
  {
    type: 'build-en',
    speak: 'She is a widow',
    question: 'جمله انگلیسی را بساز:',
    text: 'او بیوه است',
    words: ['widow', 'a', 'is', 'She'],
    answer: ['She', 'is', 'a', 'widow']
  },
  {
    type: 'build-en',
    speak: 'She is a bride',
    question: 'جمله انگلیسی را بساز:',
    text: 'او عروس است',
    words: ['bride', 'a', 'is', 'She'],
    answer: ['She', 'is', 'a', 'bride']
  },

  // ===== بخش ۶: BUILD FA (۵ تا) =====
  {
    type: 'build-fa',
    speak: 'She is my relative',
    question: 'ترجمه را بساز:',
    text: 'She is my relative',
    words: ['است', 'خویشاوند', 'او', 'من'],
    answer: ['او', 'خویشاوند', 'من', 'است']
  },
  {
    type: 'build-fa',
    speak: 'They are twins',
    question: 'ترجمه را بساز:',
    text: 'They are twins',
    words: ['هستند', 'دوقلو', 'آنها'],
    answer: ['آنها', 'دوقلو', 'هستند']
  },
  {
    type: 'build-fa',
    speak: 'He is an orphan',
    question: 'ترجمه را بساز:',
    text: 'He is an orphan',
    words: ['است', 'یتیم', 'او'],
    answer: ['او', 'یتیم', 'است']
  },
  {
    type: 'build-fa',
    speak: 'She is a widow',
    question: 'ترجمه را بساز:',
    text: 'She is a widow',
    words: ['است', 'بیوه', 'او'],
    answer: ['او', 'بیوه', 'است']
  },
  {
    type: 'build-fa',
    speak: 'She is a bride',
    question: 'ترجمه را بساز:',
    text: 'She is a bride',
    words: ['است', 'عروس', 'او'],
    answer: ['او', 'عروس', 'است']
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