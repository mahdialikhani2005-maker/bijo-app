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

// ===== سوالات درس ۴۵ =====
const questions = [

  // ===== بخش ۱: IMAGE (۵ تا) =====
  {
    type: 'image',
    question: 'surgery کدام است؟',
    speak: 'surgery',
    options: [
      { text: 'stretcher', image: '../../../media/a2/health/stretcher.png' },
      { text: 'surgery', image: '../../../media/a2/health/surgery.png' },
      { text: 'wheelchair', image: '../../../media/a2/health/wheelchair.png' },
      { text: 'cast', image: '../../../media/a2/health/cast.png' }
    ],
    answer: 'surgery'
  },
  {
    type: 'image',
    question: 'stretcher کدام است؟',
    speak: 'stretcher',
    options: [
      { text: 'cast', image: '../../../media/a2/health/cast.png' },
      { text: 'stretcher', image: '../../../media/a2/health/stretcher.png' },
      { text: 'bandage', image: '../../../media/a2/health/bandage.png' },
      { text: 'surgery', image: '../../../media/a2/health/surgery.png' }
    ],
    answer: 'stretcher'
  },
  {
    type: 'image',
    question: 'wheelchair کدام است؟',
    speak: 'wheelchair',
    options: [
      { text: 'surgery', image: '../../../media/a2/health/surgery.png' },
      { text: 'wheelchair', image: '../../../media/a2/health/wheelchair.png' },
      { text: 'bandage', image: '../../../media/a2/health/bandage.png' },
      { text: 'stretcher', image: '../../../media/a2/health/stretcher.png' }
    ],
    answer: 'wheelchair'
  },
  {
    type: 'image',
    question: 'cast کدام است؟',
    speak: 'cast',
    options: [
      { text: 'cast', image: '../../../media/a2/health/cast.png' },
      { text: 'stretcher', image: '../../../media/a2/health/stretcher.png' },
      { text: 'surgery', image: '../../../media/a2/health/surgery.png' },
      { text: 'wheelchair', image: '../../../media/a2/health/wheelchair.png' }
    ],
    answer: 'cast'
  },
  {
    type: 'image',
    question: 'bandage کدام است؟',
    speak: 'bandage',
    options: [
      { text: 'wheelchair', image: '../../../media/a2/health/wheelchair.png' },
      { text: 'surgery', image: '../../../media/a2/health/surgery.png' },
      { text: 'bandage', image: '../../../media/a2/health/bandage.png' },
      { text: 'stretcher', image: '../../../media/a2/health/stretcher.png' }
    ],
    answer: 'bandage'
  },

  // ===== بخش ۲: WORD (۵ تا) =====
  {
    type: 'word',
    question: 'این تصویر چیست؟',
    image: '../../../media/a2/health/surgery.png',
    options: ['stretcher', 'surgery', 'wheelchair', 'cast'],
    answer: 'surgery'
  },
  {
    type: 'word',
    question: 'این تصویر چیست؟',
    image: '../../../media/a2/health/stretcher.png',
    options: ['cast', 'stretcher', 'bandage', 'surgery'],
    answer: 'stretcher'
  },
  {
    type: 'word',
    question: 'این تصویر چیست؟',
    image: '../../../media/a2/health/wheelchair.png',
    options: ['surgery', 'wheelchair', 'bandage', 'stretcher'],
    answer: 'wheelchair'
  },
  {
    type: 'word',
    question: 'این تصویر چیست؟',
    image: '../../../media/a2/health/cast.png',
    options: ['cast', 'stretcher', 'surgery', 'wheelchair'],
    answer: 'cast'
  },
  {
    type: 'word',
    question: 'این تصویر چیست؟',
    image: '../../../media/a2/health/bandage.png',
    options: ['wheelchair', 'surgery', 'bandage', 'stretcher'],
    answer: 'bandage'
  },

  // ===== بخش ۳: AUDIO (۵ تا) =====
  {
    type: 'audio',
    speak: 'surgery',
    question: 'کدام کلمه را شنیدی؟',
    options: ['surgery', 'stretcher', 'wheelchair', 'cast'],
    answer: 'surgery'
  },
  {
    type: 'audio',
    speak: 'stretcher',
    question: 'کدام کلمه را شنیدی؟',
    options: ['cast', 'stretcher', 'bandage', 'surgery'],
    answer: 'stretcher'
  },
  {
    type: 'audio',
    speak: 'wheelchair',
    question: 'کدام کلمه را شنیدی؟',
    options: ['surgery', 'wheelchair', 'bandage', 'stretcher'],
    answer: 'wheelchair'
  },
  {
    type: 'audio',
    speak: 'cast',
    question: 'کدام کلمه را شنیدی؟',
    options: ['cast', 'stretcher', 'surgery', 'wheelchair'],
    answer: 'cast'
  },
  {
    type: 'audio',
    speak: 'bandage',
    question: 'کدام کلمه را شنیدی؟',
    options: ['wheelchair', 'surgery', 'bandage', 'stretcher'],
    answer: 'bandage'
  },

  // ===== بخش ۴: SPEAK (۵ تا) =====
  {
    type: 'speak',
    word: 'surgery',
    image: '../../../media/a2/health/surgery.png',
    meaning: 'جراحی'
  },
  {
    type: 'speak',
    word: 'stretcher',
    image: '../../../media/a2/health/stretcher.png',
    meaning: 'برانکارد'
  },
  {
    type: 'speak',
    word: 'wheelchair',
    image: '../../../media/a2/health/wheelchair.png',
    meaning: 'صندلی چرخدار'
  },
  {
    type: 'speak',
    word: 'cast',
    image: '../../../media/a2/health/cast.png',
    meaning: 'گچ'
  },
  {
    type: 'speak',
    word: 'bandage',
    image: '../../../media/a2/health/bandage.png',
    meaning: 'بانداژ'
  },

  // ===== بخش ۵: BUILD EN (۵ تا) =====
  {
    type: 'build-en',
    speak: 'I have surgery',
    question: 'جمله انگلیسی را بساز:',
    text: 'من جراحی دارم',
    words: ['surgery', 'have', 'I'],
    answer: ['I', 'have', 'surgery']
  },
  {
    type: 'build-en',
    speak: 'I see a stretcher',
    question: 'جمله انگلیسی را بساز:',
    text: 'من یک برانکارد می‌بینم',
    words: ['stretcher', 'a', 'see', 'I'],
    answer: ['I', 'see', 'a', 'stretcher']
  },
  {
    type: 'build-en',
    speak: 'I use a wheelchair',
    question: 'جمله انگلیسی را بساز:',
    text: 'من از صندلی چرخدار استفاده می‌کنم',
    words: ['wheelchair', 'a', 'use', 'I'],
    answer: ['I', 'use', 'a', 'wheelchair']
  },
  {
    type: 'build-en',
    speak: 'I have a cast',
    question: 'جمله انگلیسی را بساز:',
    text: 'من گچ دارم',
    words: ['cast', 'a', 'have', 'I'],
    answer: ['I', 'have', 'a', 'cast']
  },
  {
    type: 'build-en',
    speak: 'I have a bandage',
    question: 'جمله انگلیسی را بساز:',
    text: 'من بانداژ دارم',
    words: ['bandage', 'a', 'have', 'I'],
    answer: ['I', 'have', 'a', 'bandage']
  },

  // ===== بخش ۶: BUILD FA (۵ تا) =====
  {
    type: 'build-fa',
    speak: 'I have surgery',
    question: 'ترجمه را بساز:',
    text: 'I have surgery',
    words: ['دارم', 'جراحی', 'من'],
    answer: ['من', 'جراحی', 'دارم']
  },
  {
    type: 'build-fa',
    speak: 'I see a stretcher',
    question: 'ترجمه را بساز:',
    text: 'I see a stretcher',
    words: ['می‌بینم', 'برانکارد', 'یک', 'من'],
    answer: ['من', 'یک', 'برانکارد', 'می‌بینم']
  },
  {
    type: 'build-fa',
    speak: 'I use a wheelchair',
    question: 'ترجمه را بساز:',
    text: 'I use a wheelchair',
    words: ['استفاده می‌کنم', 'صندلی چرخدار', 'از', 'من'],
    answer: ['من', 'از', 'صندلی چرخدار', 'استفاده می‌کنم']
  },
  {
    type: 'build-fa',
    speak: 'I have a cast',
    question: 'ترجمه را بساز:',
    text: 'I have a cast',
    words: ['دارم', 'گچ', 'من'],
    answer: ['من', 'گچ', 'دارم']
  },
  {
    type: 'build-fa',
    speak: 'I have a bandage',
    question: 'ترجمه را بساز:',
    text: 'I have a bandage',
    words: ['دارم', 'بانداژ', 'من'],
    answer: ['من', 'بانداژ', 'دارم']
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