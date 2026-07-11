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

// ===== سوالات درس ۵۹ - فرانسوی به فارسی =====
const questions = [

  // ===== بخش ۱: IMAGE (۵ تا) =====
  {
    type: 'image',
    question: 'کدام تصویر برای "télécharger" است؟',
    speak: 'télécharger',
    options: [
      { text: 'télécharger', image: '../../../media/a2/tech/download.png' },
      { text: 'téléverser', image: '../../../media/a2/tech/upload.png' },
      { text: 'diffuser en continu', image: '../../../media/a2/tech/stream.png' },
      { text: 'la vidéo', image: '../../../media/a2/tech/video.png' }
    ],
    answer: 'télécharger'
  },
  {
    type: 'image',
    question: 'کدام تصویر برای "téléverser" است؟',
    speak: 'téléverser',
    options: [
      { text: 'télécharger', image: '../../../media/a2/tech/download.png' },
      { text: 'téléverser', image: '../../../media/a2/tech/upload.png' },
      { text: 'l\'audio', image: '../../../media/a2/tech/audio.png' },
      { text: 'diffuser en continu', image: '../../../media/a2/tech/stream.png' }
    ],
    answer: 'téléverser'
  },
  {
    type: 'image',
    question: 'کدام تصویر برای "diffuser en continu" است؟',
    speak: 'diffuser en continu',
    options: [
      { text: 'la vidéo', image: '../../../media/a2/tech/video.png' },
      { text: 'télécharger', image: '../../../media/a2/tech/download.png' },
      { text: 'diffuser en continu', image: '../../../media/a2/tech/stream.png' },
      { text: 'téléverser', image: '../../../media/a2/tech/upload.png' }
    ],
    answer: 'diffuser en continu'
  },
  {
    type: 'image',
    question: 'کدام تصویر برای "la vidéo" است؟',
    speak: 'la vidéo',
    options: [
      { text: 'téléverser', image: '../../../media/a2/tech/upload.png' },
      { text: 'la vidéo', image: '../../../media/a2/tech/video.png' },
      { text: 'l\'audio', image: '../../../media/a2/tech/audio.png' },
      { text: 'télécharger', image: '../../../media/a2/tech/download.png' }
    ],
    answer: 'la vidéo'
  },
  {
    type: 'image',
    question: 'کدام تصویر برای "l\'audio" است؟',
    speak: 'l\'audio',
    options: [
      { text: 'télécharger', image: '../../../media/a2/tech/download.png' },
      { text: 'diffuser en continu', image: '../../../media/a2/tech/stream.png' },
      { text: 'l\'audio', image: '../../../media/a2/tech/audio.png' },
      { text: 'la vidéo', image: '../../../media/a2/tech/video.png' }
    ],
    answer: 'l\'audio'
  },

  // ===== بخش ۲: WORD (۵ تا) =====
  {
    type: 'word',
    question: 'این تصویر چیست؟',
    image: '../../../media/a2/tech/download.png',
    options: ['télécharger', 'téléverser', 'diffuser en continu', 'la vidéo'],
    answer: 'télécharger'
  },
  {
    type: 'word',
    question: 'این تصویر چیست؟',
    image: '../../../media/a2/tech/upload.png',
    options: ['télécharger', 'téléverser', 'l\'audio', 'diffuser en continu'],
    answer: 'téléverser'
  },
  {
    type: 'word',
    question: 'این تصویر چیست؟',
    image: '../../../media/a2/tech/stream.png',
    options: ['la vidéo', 'télécharger', 'diffuser en continu', 'téléverser'],
    answer: 'diffuser en continu'
  },
  {
    type: 'word',
    question: 'این تصویر چیست؟',
    image: '../../../media/a2/tech/video.png',
    options: ['téléverser', 'la vidéo', 'l\'audio', 'télécharger'],
    answer: 'la vidéo'
  },
  {
    type: 'word',
    question: 'این تصویر چیست؟',
    image: '../../../media/a2/tech/audio.png',
    options: ['télécharger', 'diffuser en continu', 'l\'audio', 'la vidéo'],
    answer: 'l\'audio'
  },

  // ===== بخش ۳: AUDIO (۵ تا) =====
  {
    type: 'audio',
    speak: 'télécharger',
    question: 'کدام کلمه را شنیدی؟',
    options: ['télécharger', 'téléverser', 'diffuser en continu', 'la vidéo'],
    answer: 'télécharger'
  },
  {
    type: 'audio',
    speak: 'téléverser',
    question: 'کدام کلمه را شنیدی؟',
    options: ['télécharger', 'téléverser', 'l\'audio', 'diffuser en continu'],
    answer: 'téléverser'
  },
  {
    type: 'audio',
    speak: 'diffuser en continu',
    question: 'کدام کلمه را شنیدی؟',
    options: ['la vidéo', 'télécharger', 'diffuser en continu', 'téléverser'],
    answer: 'diffuser en continu'
  },
  {
    type: 'audio',
    speak: 'la vidéo',
    question: 'کدام کلمه را شنیدی؟',
    options: ['téléverser', 'la vidéo', 'l\'audio', 'télécharger'],
    answer: 'la vidéo'
  },
  {
    type: 'audio',
    speak: 'l\'audio',
    question: 'کدام کلمه را شنیدی؟',
    options: ['télécharger', 'diffuser en continu', 'l\'audio', 'la vidéo'],
    answer: 'l\'audio'
  },

  // ===== بخش ۴: SPEAK (۵ تا) =====
  {
    type: 'speak',
    word: 'télécharger',
    image: '../../../media/a2/tech/download.png',
    meaning: 'دانلود کردن'
  },
  {
    type: 'speak',
    word: 'téléverser',
    image: '../../../media/a2/tech/upload.png',
    meaning: 'آپلود کردن'
  },
  {
    type: 'speak',
    word: 'diffuser en continu',
    image: '../../../media/a2/tech/stream.png',
    meaning: 'استریم کردن'
  },
  {
    type: 'speak',
    word: 'la vidéo',
    image: '../../../media/a2/tech/video.png',
    meaning: 'ویدئو'
  },
  {
    type: 'speak',
    word: 'l\'audio',
    image: '../../../media/a2/tech/audio.png',
    meaning: 'صدا'
  },

  // ===== بخش ۵: BUILD EN (ساخت جمله فرانسوی) =====
  {
    type: 'build-en',
    speak: 'Je télécharge un fichier',
    question: 'جمله فرانسوی را بساز:',
    text: 'من یک فایل دانلود می‌کنم',
    words: ['fichier', 'un', 'télécharge', 'Je'],
    answer: ['Je', 'télécharge', 'un', 'fichier']
  },
  {
    type: 'build-en',
    speak: 'Je téléverse un fichier',
    question: 'جمله فرانسوی را بساز:',
    text: 'من یک فایل آپلود می‌کنم',
    words: ['fichier', 'un', 'téléverse', 'Je'],
    answer: ['Je', 'téléverse', 'un', 'fichier']
  },
  {
    type: 'build-en',
    speak: 'Je diffuse en continu',
    question: 'جمله فرانسوی را بساز:',
    text: 'من استریم می‌کنم',
    words: ['continu', 'en', 'diffuse', 'Je'],
    answer: ['Je', 'diffuse', 'en', 'continu']
  },
  {
    type: 'build-en',
    speak: 'Je regarde une vidéo',
    question: 'جمله فرانسوی را بساز:',
    text: 'من یک ویدئو می‌بینم',
    words: ['vidéo', 'une', 'regarde', 'Je'],
    answer: ['Je', 'regarde', 'une', 'vidéo']
  },
  {
    type: 'build-en',
    speak: 'J\'écoute l\'audio',
    question: 'جمله فرانسوی را بساز:',
    text: 'من صدا را گوش می‌دهم',
    words: ['l\'audio', 'écoute', 'J\''],
    answer: ['J\'', 'écoute', 'l\'audio']
  },

  // ===== بخش ۶: BUILD FA (ترجمه به فارسی) =====
  {
    type: 'build-fa',
    speak: 'Je télécharge un fichier',
    question: 'ترجمه را بساز:',
    text: 'Je télécharge un fichier',
    words: ['می‌کنم', 'فایل', 'یک', 'دانلود', 'من'],
    answer: ['من', 'یک', 'فایل', 'دانلود', 'می‌کنم']
  },
  {
    type: 'build-fa',
    speak: 'Je téléverse un fichier',
    question: 'ترجمه را بساز:',
    text: 'Je téléverse un fichier',
    words: ['می‌کنم', 'فایل', 'یک', 'آپلود', 'من'],
    answer: ['من', 'یک', 'فایل', 'آپلود', 'می‌کنم']
  },
  {
    type: 'build-fa',
    speak: 'Je diffuse en continu',
    question: 'ترجمه را بساز:',
    text: 'Je diffuse en continu',
    words: ['می‌کنم', 'استریم', 'من'],
    answer: ['من', 'استریم', 'می‌کنم']
  },
  {
    type: 'build-fa',
    speak: 'Je regarde une vidéo',
    question: 'ترجمه را بساز:',
    text: 'Je regarde une vidéo',
    words: ['می‌بینم', 'ویدئو', 'یک', 'من'],
    answer: ['من', 'یک', 'ویدئو', 'می‌بینم']
  },
  {
    type: 'build-fa',
    speak: 'J\'écoute l\'audio',
    question: 'ترجمه را بساز:',
    text: 'J\'écoute l\'audio',
    words: ['می‌دهم', 'صدا', 'گوش', 'من'],
    answer: ['من', 'صدا', 'گوش', 'می‌دهم']
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