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

// ===== سوالات درس ۳۸ - فرانسوی به فارسی =====
const questions = [

  // ===== بخش ۱: IMAGE (۵ تا) =====
  {
    type: 'image',
    question: 'کدام تصویر برای "la plage" است؟',
    speak: 'la plage',
    options: [
      { text: 'la plage', image: '../../../media/a2/nature/beach.png' },
      { text: 'la côte', image: '../../../media/a2/nature/coast.png' },
      { text: 'la vague', image: '../../../media/a2/nature/wave.png' },
      { text: 'la falaise', image: '../../../media/a2/nature/cliff.png' }
    ],
    answer: 'la plage'
  },
  {
    type: 'image',
    question: 'کدام تصویر برای "la côte" است؟',
    speak: 'la côte',
    options: [
      { text: 'la plage', image: '../../../media/a2/nature/beach.png' },
      { text: 'la côte', image: '../../../media/a2/nature/coast.png' },
      { text: 'la marée', image: '../../../media/a2/nature/tide.png' },
      { text: 'la vague', image: '../../../media/a2/nature/wave.png' }
    ],
    answer: 'la côte'
  },
  {
    type: 'image',
    question: 'کدام تصویر برای "la vague" است؟',
    speak: 'la vague',
    options: [
      { text: 'la falaise', image: '../../../media/a2/nature/cliff.png' },
      { text: 'la plage', image: '../../../media/a2/nature/beach.png' },
      { text: 'la vague', image: '../../../media/a2/nature/wave.png' },
      { text: 'la côte', image: '../../../media/a2/nature/coast.png' }
    ],
    answer: 'la vague'
  },
  {
    type: 'image',
    question: 'کدام تصویر برای "la marée" است؟',
    speak: 'la marée',
    options: [
      { text: 'la côte', image: '../../../media/a2/nature/coast.png' },
      { text: 'la marée', image: '../../../media/a2/nature/tide.png' },
      { text: 'la falaise', image: '../../../media/a2/nature/cliff.png' },
      { text: 'la plage', image: '../../../media/a2/nature/beach.png' }
    ],
    answer: 'la marée'
  },
  {
    type: 'image',
    question: 'کدام تصویر برای "la falaise" است؟',
    speak: 'la falaise',
    options: [
      { text: 'la plage', image: '../../../media/a2/nature/beach.png' },
      { text: 'la vague', image: '../../../media/a2/nature/wave.png' },
      { text: 'la falaise', image: '../../../media/a2/nature/cliff.png' },
      { text: 'la marée', image: '../../../media/a2/nature/tide.png' }
    ],
    answer: 'la falaise'
  },

  // ===== بخش ۲: WORD (۵ تا) =====
  {
    type: 'word',
    question: 'این تصویر چیست؟',
    image: '../../../media/a2/nature/beach.png',
    options: ['la plage', 'la côte', 'la vague', 'la falaise'],
    answer: 'la plage'
  },
  {
    type: 'word',
    question: 'این تصویر چیست؟',
    image: '../../../media/a2/nature/coast.png',
    options: ['la plage', 'la côte', 'la marée', 'la vague'],
    answer: 'la côte'
  },
  {
    type: 'word',
    question: 'این تصویر چیست؟',
    image: '../../../media/a2/nature/wave.png',
    options: ['la falaise', 'la plage', 'la vague', 'la côte'],
    answer: 'la vague'
  },
  {
    type: 'word',
    question: 'این تصویر چیست؟',
    image: '../../../media/a2/nature/tide.png',
    options: ['la côte', 'la marée', 'la falaise', 'la plage'],
    answer: 'la marée'
  },
  {
    type: 'word',
    question: 'این تصویر چیست؟',
    image: '../../../media/a2/nature/cliff.png',
    options: ['la plage', 'la vague', 'la falaise', 'la marée'],
    answer: 'la falaise'
  },

  // ===== بخش ۳: AUDIO (۵ تا) =====
  {
    type: 'audio',
    speak: 'la plage',
    question: 'کدام کلمه را شنیدی؟',
    options: ['la plage', 'la côte', 'la vague', 'la falaise'],
    answer: 'la plage'
  },
  {
    type: 'audio',
    speak: 'la côte',
    question: 'کدام کلمه را شنیدی؟',
    options: ['la plage', 'la côte', 'la marée', 'la vague'],
    answer: 'la côte'
  },
  {
    type: 'audio',
    speak: 'la vague',
    question: 'کدام کلمه را شنیدی؟',
    options: ['la falaise', 'la plage', 'la vague', 'la côte'],
    answer: 'la vague'
  },
  {
    type: 'audio',
    speak: 'la marée',
    question: 'کدام کلمه را شنیدی؟',
    options: ['la côte', 'la marée', 'la falaise', 'la plage'],
    answer: 'la marée'
  },
  {
    type: 'audio',
    speak: 'la falaise',
    question: 'کدام کلمه را شنیدی؟',
    options: ['la plage', 'la vague', 'la falaise', 'la marée'],
    answer: 'la falaise'
  },

  // ===== بخش ۴: SPEAK (۵ تا) =====
  {
    type: 'speak',
    word: 'la plage',
    image: '../../../media/a2/nature/beach.png',
    meaning: 'ساحل'
  },
  {
    type: 'speak',
    word: 'la côte',
    image: '../../../media/a2/nature/coast.png',
    meaning: 'خط ساحلی'
  },
  {
    type: 'speak',
    word: 'la vague',
    image: '../../../media/a2/nature/wave.png',
    meaning: 'موج'
  },
  {
    type: 'speak',
    word: 'la marée',
    image: '../../../media/a2/nature/tide.png',
    meaning: 'جزر و مد'
  },
  {
    type: 'speak',
    word: 'la falaise',
    image: '../../../media/a2/nature/cliff.png',
    meaning: 'صخره ساحلی'
  },

  // ===== بخش ۵: BUILD EN (ساخت جمله فرانسوی) =====
  {
    type: 'build-en',
    speak: 'Je vais à la plage',
    question: 'جمله فرانسوی را بساز:',
    text: 'من به ساحل می‌روم',
    words: ['plage', 'la', 'à', 'vais', 'Je'],
    answer: ['Je', 'vais', 'à', 'la', 'plage']
  },
  {
    type: 'build-en',
    speak: 'Je vois la côte',
    question: 'جمله فرانسوی را بساز:',
    text: 'من خط ساحلی را می‌بینم',
    words: ['côte', 'la', 'vois', 'Je'],
    answer: ['Je', 'vois', 'la', 'côte']
  },
  {
    type: 'build-en',
    speak: 'Je vois une vague',
    question: 'جمله فرانسوی را بساز:',
    text: 'من یک موج می‌بینم',
    words: ['vague', 'une', 'vois', 'Je'],
    answer: ['Je', 'vois', 'une', 'vague']
  },
  {
    type: 'build-en',
    speak: 'Je vois la marée',
    question: 'جمله فرانسوی را بساز:',
    text: 'من جزر و مد را می‌بینم',
    words: ['marée', 'la', 'vois', 'Je'],
    answer: ['Je', 'vois', 'la', 'marée']
  },
  {
    type: 'build-en',
    speak: 'Je vois une falaise',
    question: 'جمله فرانسوی را بساز:',
    text: 'من یک صخره ساحلی می‌بینم',
    words: ['falaise', 'une', 'vois', 'Je'],
    answer: ['Je', 'vois', 'une', 'falaise']
  },

  // ===== بخش ۶: BUILD FA (ترجمه به فارسی) =====
  {
    type: 'build-fa',
    speak: 'Je vais à la plage',
    question: 'ترجمه را بساز:',
    text: 'Je vais à la plage',
    words: ['می‌روم', 'ساحل', 'به', 'من'],
    answer: ['من', 'به', 'ساحل', 'می‌روم']
  },
  {
    type: 'build-fa',
    speak: 'Je vois la côte',
    question: 'ترجمه را بساز:',
    text: 'Je vois la côte',
    words: ['می‌بینم', 'خط ساحلی', 'من'],
    answer: ['من', 'خط ساحلی', 'می‌بینم']
  },
  {
    type: 'build-fa',
    speak: 'Je vois une vague',
    question: 'ترجمه را بساز:',
    text: 'Je vois une vague',
    words: ['می‌بینم', 'موج', 'یک', 'من'],
    answer: ['من', 'یک', 'موج', 'می‌بینم']
  },
  {
    type: 'build-fa',
    speak: 'Je vois la marée',
    question: 'ترجمه را بساز:',
    text: 'Je vois la marée',
    words: ['می‌بینم', 'جزر و مد', 'من'],
    answer: ['من', 'جزر و مد', 'می‌بینم']
  },
  {
    type: 'build-fa',
    speak: 'Je vois une falaise',
    question: 'ترجمه را بساز:',
    text: 'Je vois une falaise',
    words: ['می‌بینم', 'صخره ساحلی', 'یک', 'من'],
    answer: ['من', 'یک', 'صخره ساحلی', 'می‌بینم']
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