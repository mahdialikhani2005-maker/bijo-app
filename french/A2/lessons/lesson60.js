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

// ===== سوالات درس ۶۰ - فرانسوی به فارسی =====
const questions = [

  // ===== بخش ۱: IMAGE (۵ تا) =====
  {
    type: 'image',
    question: 'کدام تصویر برای "l\'appareil" است؟',
    speak: 'l\'appareil',
    options: [
      { text: 'l\'appareil', image: '../../../media/a2/tech/device.png' },
      { text: 'le gadget', image: '../../../media/a2/tech/gadget.png' },
      { text: 'le robot', image: '../../../media/a2/tech/robot.png' },
      { text: 'le drone', image: '../../../media/a2/tech/drone.png' }
    ],
    answer: 'l\'appareil'
  },
  {
    type: 'image',
    question: 'کدام تصویر برای "le gadget" است؟',
    speak: 'le gadget',
    options: [
      { text: 'l\'appareil', image: '../../../media/a2/tech/device.png' },
      { text: 'le gadget', image: '../../../media/a2/tech/gadget.png' },
      { text: 'la montre connectée', image: '../../../media/a2/tech/smart-watch.png' },
      { text: 'le robot', image: '../../../media/a2/tech/robot.png' }
    ],
    answer: 'le gadget'
  },
  {
    type: 'image',
    question: 'کدام تصویر برای "le robot" است؟',
    speak: 'le robot',
    options: [
      { text: 'le drone', image: '../../../media/a2/tech/drone.png' },
      { text: 'l\'appareil', image: '../../../media/a2/tech/device.png' },
      { text: 'le robot', image: '../../../media/a2/tech/robot.png' },
      { text: 'le gadget', image: '../../../media/a2/tech/gadget.png' }
    ],
    answer: 'le robot'
  },
  {
    type: 'image',
    question: 'کدام تصویر برای "le drone" است؟',
    speak: 'le drone',
    options: [
      { text: 'le gadget', image: '../../../media/a2/tech/gadget.png' },
      { text: 'le drone', image: '../../../media/a2/tech/drone.png' },
      { text: 'la montre connectée', image: '../../../media/a2/tech/smart-watch.png' },
      { text: 'l\'appareil', image: '../../../media/a2/tech/device.png' }
    ],
    answer: 'le drone'
  },
  {
    type: 'image',
    question: 'کدام تصویر برای "la montre connectée" است؟',
    speak: 'la montre connectée',
    options: [
      { text: 'l\'appareil', image: '../../../media/a2/tech/device.png' },
      { text: 'le robot', image: '../../../media/a2/tech/robot.png' },
      { text: 'la montre connectée', image: '../../../media/a2/tech/smart-watch.png' },
      { text: 'le drone', image: '../../../media/a2/tech/drone.png' }
    ],
    answer: 'la montre connectée'
  },

  // ===== بخش ۲: WORD (۵ تا) =====
  {
    type: 'word',
    question: 'این تصویر چیست؟',
    image: '../../../media/a2/tech/device.png',
    options: ['l\'appareil', 'le gadget', 'le robot', 'le drone'],
    answer: 'l\'appareil'
  },
  {
    type: 'word',
    question: 'این تصویر چیست؟',
    image: '../../../media/a2/tech/gadget.png',
    options: ['l\'appareil', 'le gadget', 'la montre connectée', 'le robot'],
    answer: 'le gadget'
  },
  {
    type: 'word',
    question: 'این تصویر چیست؟',
    image: '../../../media/a2/tech/robot.png',
    options: ['le drone', 'l\'appareil', 'le robot', 'le gadget'],
    answer: 'le robot'
  },
  {
    type: 'word',
    question: 'این تصویر چیست؟',
    image: '../../../media/a2/tech/drone.png',
    options: ['le gadget', 'le drone', 'la montre connectée', 'l\'appareil'],
    answer: 'le drone'
  },
  {
    type: 'word',
    question: 'این تصویر چیست؟',
    image: '../../../media/a2/tech/smart-watch.png',
    options: ['l\'appareil', 'le robot', 'la montre connectée', 'le drone'],
    answer: 'la montre connectée'
  },

  // ===== بخش ۳: AUDIO (۵ تا) =====
  {
    type: 'audio',
    speak: 'l\'appareil',
    question: 'کدام کلمه را شنیدی؟',
    options: ['l\'appareil', 'le gadget', 'le robot', 'le drone'],
    answer: 'l\'appareil'
  },
  {
    type: 'audio',
    speak: 'le gadget',
    question: 'کدام کلمه را شنیدی؟',
    options: ['l\'appareil', 'le gadget', 'la montre connectée', 'le robot'],
    answer: 'le gadget'
  },
  {
    type: 'audio',
    speak: 'le robot',
    question: 'کدام کلمه را شنیدی؟',
    options: ['le drone', 'l\'appareil', 'le robot', 'le gadget'],
    answer: 'le robot'
  },
  {
    type: 'audio',
    speak: 'le drone',
    question: 'کدام کلمه را شنیدی؟',
    options: ['le gadget', 'le drone', 'la montre connectée', 'l\'appareil'],
    answer: 'le drone'
  },
  {
    type: 'audio',
    speak: 'la montre connectée',
    question: 'کدام کلمه را شنیدی؟',
    options: ['l\'appareil', 'le robot', 'la montre connectée', 'le drone'],
    answer: 'la montre connectée'
  },

  // ===== بخش ۴: SPEAK (۵ تا) =====
  {
    type: 'speak',
    word: 'l\'appareil',
    image: '../../../media/a2/tech/device.png',
    meaning: 'دستگاه'
  },
  {
    type: 'speak',
    word: 'le gadget',
    image: '../../../media/a2/tech/gadget.png',
    meaning: 'گجت'
  },
  {
    type: 'speak',
    word: 'le robot',
    image: '../../../media/a2/tech/robot.png',
    meaning: 'ربات'
  },
  {
    type: 'speak',
    word: 'le drone',
    image: '../../../media/a2/tech/drone.png',
    meaning: 'پهپاد'
  },
  {
    type: 'speak',
    word: 'la montre connectée',
    image: '../../../media/a2/tech/smart-watch.png',
    meaning: 'ساعت هوشمند'
  },

  // ===== بخش ۵: BUILD EN (ساخت جمله فرانسوی) =====
  {
    type: 'build-en',
    speak: 'J\'ai un appareil',
    question: 'جمله فرانسوی را بساز:',
    text: 'من یک دستگاه دارم',
    words: ['appareil', 'un', 'ai', 'J\''],
    answer: ['J\'', 'ai', 'un', 'appareil']
  },
  {
    type: 'build-en',
    speak: 'J\'ai un gadget',
    question: 'جمله فرانسوی را بساز:',
    text: 'من یک گجت دارم',
    words: ['gadget', 'un', 'ai', 'J\''],
    answer: ['J\'', 'ai', 'un', 'gadget']
  },
  {
    type: 'build-en',
    speak: 'J\'ai un robot',
    question: 'جمله فرانسوی را بساز:',
    text: 'من یک ربات دارم',
    words: ['robot', 'un', 'ai', 'J\''],
    answer: ['J\'', 'ai', 'un', 'robot']
  },
  {
    type: 'build-en',
    speak: 'J\'ai un drone',
    question: 'جمله فرانسوی را بساز:',
    text: 'من یک پهپاد دارم',
    words: ['drone', 'un', 'ai', 'J\''],
    answer: ['J\'', 'ai', 'un', 'drone']
  },
  {
    type: 'build-en',
    speak: 'J\'ai une montre connectée',
    question: 'جمله فرانسوی را بساز:',
    text: 'من یک ساعت هوشمند دارم',
    words: ['connectée', 'montre', 'une', 'ai', 'J\''],
    answer: ['J\'', 'ai', 'une', 'montre', 'connectée']
  },

  // ===== بخش ۶: BUILD FA (ترجمه به فارسی) =====
  {
    type: 'build-fa',
    speak: 'J\'ai un appareil',
    question: 'ترجمه را بساز:',
    text: 'J\'ai un appareil',
    words: ['دارم', 'دستگاه', 'یک', 'من'],
    answer: ['من', 'یک', 'دستگاه', 'دارم']
  },
  {
    type: 'build-fa',
    speak: 'J\'ai un gadget',
    question: 'ترجمه را بساز:',
    text: 'J\'ai un gadget',
    words: ['دارم', 'گجت', 'یک', 'من'],
    answer: ['من', 'یک', 'گجت', 'دارم']
  },
  {
    type: 'build-fa',
    speak: 'J\'ai un robot',
    question: 'ترجمه را بساز:',
    text: 'J\'ai un robot',
    words: ['دارم', 'ربات', 'یک', 'من'],
    answer: ['من', 'یک', 'ربات', 'دارم']
  },
  {
    type: 'build-fa',
    speak: 'J\'ai un drone',
    question: 'ترجمه را بساز:',
    text: 'J\'ai un drone',
    words: ['دارم', 'پهپاد', 'یک', 'من'],
    answer: ['من', 'یک', 'پهپاد', 'دارم']
  },
  {
    type: 'build-fa',
    speak: 'J\'ai une montre connectée',
    question: 'ترجمه را بساز:',
    text: 'J\'ai une montre connectée',
    words: ['دارم', 'ساعت هوشمند', 'یک', 'من'],
    answer: ['من', 'یک', 'ساعت هوشمند', 'دارم']
  }
];

// ===== نمایش سوال =====
function showQuestion() {
  if (current >= questions.length) {
    const finalXP = typeof getTotalXP === 'function' ? getTotalXP() : xp;
    document.getElementById('app').innerHTML = `
      <h2>🎉 تبریک! همه ۶۰ درس فرانسوی تمام شد! 🎉</h2>
      <p>امتیاز دریافت‌شده: <b>${finalXP}</b></p>
      <p>🌟 شما ۳۰۰ کلمه فرانسوی سطح A2 را یاد گرفتید! 🌟</p>
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