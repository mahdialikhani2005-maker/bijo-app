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

// ===== سوالات درس ۱۶ =====
const questions = [

  // ===== بخش ۱: IMAGE (۵ تا) =====
  {
    type: 'image',
    question: 'pilot کدام است؟',
    speak: 'pilot',
    options: [
      { text: 'nurse', image: '../../../media/a2/jobs/nurse.png' },
      { text: 'pilot', image: '../../../media/a2/jobs/pilot.png' },
      { text: 'lawyer', image: '../../../media/a2/jobs/lawyer.png' },
      { text: 'artist', image: '../../../media/a2/jobs/artist.png' }
    ],
    answer: 'pilot'
  },
  {
    type: 'image',
    question: 'nurse کدام است؟',
    speak: 'nurse',
    options: [
      { text: 'artist', image: '../../../media/a2/jobs/artist.png' },
      { text: 'nurse', image: '../../../media/a2/jobs/nurse.png' },
      { text: 'chef', image: '../../../media/a2/jobs/chef.png' },
      { text: 'pilot', image: '../../../media/a2/jobs/pilot.png' }
    ],
    answer: 'nurse'
  },
  {
    type: 'image',
    question: 'lawyer کدام است؟',
    speak: 'lawyer',
    options: [
      { text: 'pilot', image: '../../../media/a2/jobs/pilot.png' },
      { text: 'lawyer', image: '../../../media/a2/jobs/lawyer.png' },
      { text: 'chef', image: '../../../media/a2/jobs/chef.png' },
      { text: 'nurse', image: '../../../media/a2/jobs/nurse.png' }
    ],
    answer: 'lawyer'
  },
  {
    type: 'image',
    question: 'artist کدام است؟',
    speak: 'artist',
    options: [
      { text: 'artist', image: '../../../media/a2/jobs/artist.png' },
      { text: 'nurse', image: '../../../media/a2/jobs/nurse.png' },
      { text: 'pilot', image: '../../../media/a2/jobs/pilot.png' },
      { text: 'lawyer', image: '../../../media/a2/jobs/lawyer.png' }
    ],
    answer: 'artist'
  },
  {
    type: 'image',
    question: 'chef کدام است؟',
    speak: 'chef',
    options: [
      { text: 'lawyer', image: '../../../media/a2/jobs/lawyer.png' },
      { text: 'pilot', image: '../../../media/a2/jobs/pilot.png' },
      { text: 'chef', image: '../../../media/a2/jobs/chef.png' },
      { text: 'nurse', image: '../../../media/a2/jobs/nurse.png' }
    ],
    answer: 'chef'
  },

  // ===== بخش ۲: WORD (۵ تا) =====
  {
    type: 'word',
    question: 'این تصویر چیست؟',
    image: '../../../media/a2/jobs/pilot.png',
    options: ['nurse', 'pilot', 'lawyer', 'artist'],
    answer: 'pilot'
  },
  {
    type: 'word',
    question: 'این تصویر چیست؟',
    image: '../../../media/a2/jobs/nurse.png',
    options: ['artist', 'nurse', 'chef', 'pilot'],
    answer: 'nurse'
  },
  {
    type: 'word',
    question: 'این تصویر چیست؟',
    image: '../../../media/a2/jobs/lawyer.png',
    options: ['pilot', 'lawyer', 'chef', 'nurse'],
    answer: 'lawyer'
  },
  {
    type: 'word',
    question: 'این تصویر چیست؟',
    image: '../../../media/a2/jobs/artist.png',
    options: ['artist', 'nurse', 'pilot', 'lawyer'],
    answer: 'artist'
  },
  {
    type: 'word',
    question: 'این تصویر چیست؟',
    image: '../../../media/a2/jobs/chef.png',
    options: ['lawyer', 'pilot', 'chef', 'nurse'],
    answer: 'chef'
  },

  // ===== بخش ۳: AUDIO (۵ تا) =====
  {
    type: 'audio',
    speak: 'pilot',
    question: 'کدام کلمه را شنیدی؟',
    options: ['pilot', 'nurse', 'lawyer', 'artist'],
    answer: 'pilot'
  },
  {
    type: 'audio',
    speak: 'nurse',
    question: 'کدام کلمه را شنیدی؟',
    options: ['artist', 'nurse', 'chef', 'pilot'],
    answer: 'nurse'
  },
  {
    type: 'audio',
    speak: 'lawyer',
    question: 'کدام کلمه را شنیدی؟',
    options: ['pilot', 'lawyer', 'chef', 'nurse'],
    answer: 'lawyer'
  },
  {
    type: 'audio',
    speak: 'artist',
    question: 'کدام کلمه را شنیدی؟',
    options: ['artist', 'nurse', 'pilot', 'lawyer'],
    answer: 'artist'
  },
  {
    type: 'audio',
    speak: 'chef',
    question: 'کدام کلمه را شنیدی؟',
    options: ['lawyer', 'pilot', 'chef', 'nurse'],
    answer: 'chef'
  },

  // ===== بخش ۴: SPEAK (۵ تا) =====
  {
    type: 'speak',
    word: 'pilot',
    image: '../../../media/a2/jobs/pilot.png',
    meaning: 'خلبان'
  },
  {
    type: 'speak',
    word: 'nurse',
    image: '../../../media/a2/jobs/nurse.png',
    meaning: 'پرستار'
  },
  {
    type: 'speak',
    word: 'lawyer',
    image: '../../../media/a2/jobs/lawyer.png',
    meaning: 'وکیل'
  },
  {
    type: 'speak',
    word: 'artist',
    image: '../../../media/a2/jobs/artist.png',
    meaning: 'هنرمند'
  },
  {
    type: 'speak',
    word: 'chef',
    image: '../../../media/a2/jobs/chef.png',
    meaning: 'آشپز'
  },

  // ===== بخش ۵: BUILD EN (۵ تا) =====
  {
    type: 'build-en',
    speak: 'He is a pilot',
    question: 'جمله انگلیسی را بساز:',
    text: 'او خلبان است',
    words: ['pilot', 'a', 'is', 'He'],
    answer: ['He', 'is', 'a', 'pilot']
  },
  {
    type: 'build-en',
    speak: 'She is a nurse',
    question: 'جمله انگلیسی را بساز:',
    text: 'او پرستار است',
    words: ['nurse', 'a', 'is', 'She'],
    answer: ['She', 'is', 'a', 'nurse']
  },
  {
    type: 'build-en',
    speak: 'He is a lawyer',
    question: 'جمله انگلیسی را بساز:',
    text: 'او وکیل است',
    words: ['lawyer', 'a', 'is', 'He'],
    answer: ['He', 'is', 'a', 'lawyer']
  },
  {
    type: 'build-en',
    speak: 'She is an artist',
    question: 'جمله انگلیسی را بساز:',
    text: 'او هنرمند است',
    words: ['artist', 'an', 'is', 'She'],
    answer: ['She', 'is', 'an', 'artist']
  },
  {
    type: 'build-en',
    speak: 'He is a chef',
    question: 'جمله انگلیسی را بساز:',
    text: 'او آشپز است',
    words: ['chef', 'a', 'is', 'He'],
    answer: ['He', 'is', 'a', 'chef']
  },

  // ===== بخش ۶: BUILD FA (۵ تا) =====
  {
    type: 'build-fa',
    speak: 'He is a pilot',
    question: 'ترجمه را بساز:',
    text: 'He is a pilot',
    words: ['است', 'خلبان', 'او'],
    answer: ['او', 'خلبان', 'است']
  },
  {
    type: 'build-fa',
    speak: 'She is a nurse',
    question: 'ترجمه را بساز:',
    text: 'She is a nurse',
    words: ['است', 'پرستار', 'او'],
    answer: ['او', 'پرستار', 'است']
  },
  {
    type: 'build-fa',
    speak: 'He is a lawyer',
    question: 'ترجمه را بساز:',
    text: 'He is a lawyer',
    words: ['است', 'وکیل', 'او'],
    answer: ['او', 'وکیل', 'است']
  },
  {
    type: 'build-fa',
    speak: 'She is an artist',
    question: 'ترجمه را بساز:',
    text: 'She is an artist',
    words: ['است', 'هنرمند', 'او'],
    answer: ['او', 'هنرمند', 'است']
  },
  {
    type: 'build-fa',
    speak: 'He is a chef',
    question: 'ترجمه را بساز:',
    text: 'He is a chef',
    words: ['است', 'آشپز', 'او'],
    answer: ['او', 'آشپز', 'است']
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