let current = 0;
let xp = 0;

function speak(text){
  if (!window.speechSynthesis) return;

  const utter = new SpeechSynthesisUtterance(text);
  utter.lang = "ko";
  utter.rate = 0.9;

  speechSynthesis.cancel();
  speechSynthesis.speak(utter);
}

window.onload = function() {
  if (typeof checkAndRegenHearts === 'function') {
  checkAndRegenHearts();
}

    if (typeof getHearts === 'function') {
        const currentHearts = getHearts();
        const heartElement = document.getElementById("heart-count");
        if (heartElement) {
            heartElement.textContent = currentHearts;
        }
        
        // اگر قلب کاربر 0 بود، اجازه شروع درس را نده (اختیاری)
        if (currentHearts <= 0) {
            alert("قلب شما تمام شده است! لطفاً منتظر بمانید یا قلب تهیه کنید.");
            window.location.href = "../home.html";
        }
    }
};

const questions = [

/* IMAGE */

{
type:"image",
question:"어느 것이 오늘 입니까 ?",
speak:"오늘",
options:[
{text:"내일",image:"../../media/time/tomorrow.png"},
{text:"오늘",image:"../../media/time/today.png"},
{text:"어제",image:"../../media/time/yesterday.png"},
{text:"아침",image:"../../media/time/morning.png"}
],
answer:"오늘"
},

{
type:"image",
question:"어느 것이 내일 입니까 ?",
speak:"내일",
options:[
{text:"밤",image:"../../media/time/night.png"},
{text:"내일",image:"../../media/time/tomorrow.png"},
{text:"오늘",image:"../../media/time/today.png"},
{text:"어제",image:"../../media/time/yesterday.png"}
],
answer:"내일"
},

{
type:"image",
question:"어느 것이 어제 입니까 ?",
speak:"어제",
options:[
{text:"오늘",image:"../../media/time/today.png"},
{text:"어제",image:"../../media/time/yesterday.png"},
{text:"밤",image:"../../media/time/night.png"},
{text:"내일",image:"../../media/time/tomorrow.png"}
],
answer:"어제"
},

{
type:"image",
question:"어느 것이 아침 입니까 ?",
speak:"아침",
options:[
{text:"어제",image:"../../media/time/yesterday.png"},
{text:"내일",image:"../../media/time/tomorrow.png"},
{text:"아침",image:"../../media/time/morning.png"},
{text:"오늘",image:"../../media/time/today.png"}
],
answer:"아침"
},

{
type:"image",
question:"어느 것이 밤 입니까 ?",
speak:"밤",
options:[
{text:"아침",image:"../../media/time/morning.png"},
{text:"오늘",image:"../../media/time/today.png"},
{text:"내일",image:"../../media/time/tomorrow.png"},
{text:"밤",image:"../../media/time/night.png"}
],
answer:"밤"
},

/* WORD */

{
type:"word",
question:"이 그림은 무엇입니까?",
image:"../../media/time/today.png",
options:["내일","오늘","어제","아침"],
answer:"오늘"
},

{
type:"word",
question:"이 그림은 무엇입니까?",
image:"../../media/time/tomorrow.png",
options:["밤","내일","오늘","어제"],
answer:"내일"
},

{
type:"word",
question:"이 그림은 무엇입니까?",
image:"../../media/time/yesterday.png",
options:["오늘","어제","밤","내일"],
answer:"어제"
},

{
type:"word",
question:"이 그림은 무엇입니까?",
image:"../../media/time/morning.png",
options:["어제","내일","아침","오늘"],
answer:"아침"
},

{
type:"word",
question:"이 그림은 무엇입니까?",
image:"../../media/time/night.png",
options:["아침","오늘","내일","밤"],
answer:"밤"
},

/* AUDIO */

{
type:"audio",
speak:"오늘",
question:"어떤 단어를 들었습니까?",
options:["내일","오늘","어제","아침"],
answer:"오늘"
},

{
type:"audio",
speak:"내일",
question:"어떤 단어를 들었습니까?",
options:["밤","내일","오늘","어제"],
answer:"내일"
},

{
type:"audio",
speak:"어제",
question:"어떤 단어를 들었습니까?",
options:["오늘","어제","밤","내일"],
answer:"어제"
},

{
type:"audio",
speak:"아침",
question:"어떤 단어를 들었습니까?",
options:["어제","내일","아침","오늘"],
answer:"아침"
},

{
type:"audio",
speak:"밤",
question:"어떤 단어를 들었습니까?",
options:["아침","오늘","내일","밤"],
answer:"밤"
},

/* BUILD KO */

{
type:"build-ko",
speak:"오늘은 월요일입니다",
question:"한국어 문장을 만드세요:",
text:"امروز دوشنبه است",
words:["오늘은","월요일입니다"],
answer:["오늘은","월요일입니다"]
},

{
type:"build-ko",
speak:"내일은 화요일입니다",
question:"한국어 문장을 만드세요:",
text:"فردا سه‌شنبه است",
words:["내일은","화요일입니다"],
answer:["내일은","화요일입니다"]
},

{
type:"build-ko",
speak:"어제는 일요일이었습니다",
question:"한국어 문장을 만드세요:",
text:"دیروز یک‌شنبه بود",
words:["어제는","일요일이었습니다"],
answer:["어제는","일요일이었습니다"]
},

{
type:"build-ko",
speak:"안녕하세요 (아침)",
question:"한국어 문장을 만드세요:",
text:"صبح بخیر",
words:["안녕하세요"],
answer:["안녕하세요"]
},

{
type:"build-ko",
speak:"안녕히 주무세요",
question:"한국어 문장을 만드세요:",
text:"شب بخیر",
words:["안녕히","주무세요"],
answer:["안녕히","주무세요"]
},

/* BUILD FA */

{
type:"build-fa",
speak:"오늘은 월요일입니다",
question:"ترجمه را بساز:",
text:"오늘은 월요일입니다",
words:["است","دوشنبه","امروز"],
answer:["امروز","دوشنبه","است"]
},

{
type:"build-fa",
speak:"내일은 화요일입니다",
question:"ترجمه را بساز:",
text:"내일은 화요일입니다",
words:["است","سه‌شنبه","فردا"],
answer:["فردا","سه‌شنبه","است"]
},

{
type:"build-fa",
speak:"어제는 일요일이었습니다",
question:"ترجمه را بساز:",
text:"어제는 일요일이었습니다",
words:["بود","یک‌شنبه","دیروز"],
answer:["دیروز","یک‌شنبه","بود"]
},

{
type:"build-fa",
speak:"안녕하세요",
question:"ترجمه را بساز:",
text:"안녕하세요",
words:["بخیر","صبح"],
answer:["صبح","بخیر"]
},

{
type:"build-fa",
speak:"안녕히 주무세요",
question:"ترجمه را بساز:",
text:"안녕히 주무세요",
words:["بخیر","شب"],
answer:["شب","بخیر"]
}

];

// =====================================
// نمایش سوال
// =====================================
    // اضافه کردن XP کسب شده به دیتابیس پروفایل در پایان درس


    function showQuestion() {
  if (current >= questions.length) {
    const finalXP = typeof getTotalXP === "function" ? getTotalXP() : xp;

    document.getElementById("app").innerHTML = `
      <h2>درس تمام شد 🎉</h2>
      <p>XP دریافت‌شده: <b>${finalXP}</b></p>
      <a href="../index.html">بازگشت</a>
    `;
    return;
  }


  const q = questions[current];
  if (q.speak) {
  setTimeout(() => {
    speak(q.speak);
  }, 200);
}

  const title = document.getElementById("question-title");
  const content = document.getElementById("question-content");
  const optionsBox = document.getElementById("options");
  const wordBuilder = document.getElementById("word-builder");

  title.innerText = q.question;
  content.innerHTML = "";
  optionsBox.innerHTML = "";
  wordBuilder.innerHTML = "";
wordBuilder.classList.add("hidden");

  // IMAGE SELECTION
  // IMAGE SELECTION
if (q.type === "image") {
  optionsBox.classList.add("image-grid");

 shuffleArray(q.options).forEach(opt => {

    let btn = document.createElement("button");
    btn.className = "option image-option";
    btn.innerHTML = `
      <img src="${opt.image}" alt="${opt.text}">
    `;
    btn.onclick = () => select(opt.text);
    optionsBox.appendChild(btn);
  });
}


  // WORD FROM IMAGE
  if (q.type === "word") {
    content.innerHTML = `<img src="${q.image}">`;
shuffleArray(q.options).forEach(opt => {

      let b = document.createElement("button");
      b.className = "option";
      b.innerText = opt;
      b.onclick = () => select(opt);
      optionsBox.appendChild(b);
    });
  }

  // AUDIO
  if (q.type === "audio") {
    content.innerHTML = `<button class="audio-btn" onclick="speak('${q.speak}')">🔊 پخش</button>`;

shuffleArray(q.options).forEach(opt => {
      let b = document.createElement("button");
      b.className = "option";
      b.innerText = opt;
      b.onclick = () => select(opt);
      optionsBox.appendChild(b);
    });
  }

  // BUILD ENGLISH
    // BUILD ENGLISH / FA

  else if (q.type === "build-en" || q.type === "build-fa" || q.type === "build-ko") {
  content.innerHTML = `<p>${q.text}</p>`;

  const wordBuilder = document.getElementById("word-builder");
  const optionsBox = document.getElementById("options");
  if (!wordBuilder || !optionsBox) return;

  // پاک کردن محتوای قبلی
  wordBuilder.innerHTML = "";
  optionsBox.innerHTML = "";
 wordBuilder.classList.remove("hidden");
  // تنظیم جهت
  wordBuilder.classList.remove("ltr", "rtl");
  optionsBox.classList.remove("ltr", "rtl");

if (q.type === "build-en" || q.type === "build-ko") {
    wordBuilder.classList.add("ltr");
    optionsBox.classList.add("ltr");
  } else {
    wordBuilder.classList.add("rtl");
    optionsBox.classList.add("rtl");
  }

shuffleArray(q.words).forEach(w => {

    const tile = document.createElement("span");
    tile.className = "tile";
    tile.innerText = w;
    tile.dataset.word = w;

    // کلیک اول: انتقال از options به word-builder
    tile.onclick = () => {
  // اگر کارت در گزینه‌هاست → بفرستش داخل builder
  if (tile.parentNode === optionsBox) {
    wordBuilder.appendChild(tile);

  // اگر کارت داخل builder بود → برگردونش به گزینه‌ها
  } else if (tile.parentNode === wordBuilder) {
    optionsBox.appendChild(tile);
  }

  // بررسی کامل بودن جواب
  const userWords = [...wordBuilder.children].map(el => el.dataset.word);
  if (userWords.length === q.answer.length) {
    checkBuild(userWords, q.answer);
  }
};


    optionsBox.appendChild(tile);
  });
}

async function checkBuild(selected, correct) {
  const s = selected.map(w => w.trim().toLowerCase());
  const c = correct.map(w => w.trim().toLowerCase());

  if (JSON.stringify(s) === JSON.stringify(c)) {
    xp += 5;

    if (typeof addXP === "function") {
      await addXP(5);
    }

    current++;
    showQuestion();
  } else {
    alert("اشتباه بود! دوباره تلاش کن.");

    if (typeof loseHeart === "function") {
      await loseHeart();
    }

    if (typeof checkAndRegenHearts === "function") {
      checkAndRegenHearts();
    }

    const heartElement = document.getElementById("heart-count");
    if (heartElement && typeof getHearts === "function") {
      heartElement.textContent = getHearts();
    }

    if (typeof getHearts === "function" && getHearts() <= 0) {
      document.getElementById("app").innerHTML = `
        <h2>قلب شما تمام شد 💔</h2>
        <p>برای ادامه باید صبر کنید تا قلب‌ها برگردند.</p>
        <a href="../home.html">بازگشت</a>
      `;
      return;
    }
  }
}


async function select(ans) {
  const correct = questions[current].answer;

  if (String(ans).trim().toLowerCase() === String(correct).trim().toLowerCase()) {
    xp += 5;

    if (typeof addXP === "function") {
      await addXP(5);
    }

    current++;
    showQuestion();
  } else {
    alert("اشتباه بود! دوباره تلاش کن.");

    if (typeof loseHeart === "function") {
      await loseHeart();
    }

    if (typeof checkAndRegenHearts === "function") {
      checkAndRegenHearts();
    }

    const heartElement = document.getElementById("heart-count");
    if (heartElement && typeof getHearts === "function") {
      heartElement.textContent = getHearts();
    }

    if (typeof getHearts === "function" && getHearts() <= 0) {
      document.getElementById("app").innerHTML = `
        <h2>قلب شما تمام شد 💔</h2>
        <p>برای ادامه باید صبر کنید تا قلب‌ها برگردند.</p>
        <a href="../home.html">بازگشت</a>
      `;
      return;
    }
  }
}



  // اگر بعداً آرایه‌ی selected هم ساختی، اینجا باید از آن هم حذف شود
}
function removeLastBuilderItem() {
  const wordBuilder = document.getElementById("word-builder");
  const optionsBox = document.getElementById("options");

  if (!wordBuilder || !optionsBox) return;
  if (wordBuilder.children.length === 0) return;

  const lastItem = wordBuilder.lastElementChild;
  if (lastItem) {
    optionsBox.prepend(lastItem);
  }
}

// Word Builder Keyboard Control

document.addEventListener("keydown", function (e) {
  const wordBuilder = document.getElementById("word-builder");
  if (!wordBuilder) return;

  //if (document.activeElement !== wordBuilder) return;

  if (e.key === "Backspace") {
    e.preventDefault();
    removeLastBuilderItem();
  }
});

function returnTileToOptions(tile) {
  const optionsBox = document.getElementById("options");
  if (!optionsBox || !tile) return;

  optionsBox.appendChild(tile);
  tile.classList.remove("selected");

  if (tile.returnFunction) {
    tile.removeEventListener("click", tile.returnFunction);
    delete tile.returnFunction;
  }
}


function shuffleArray(arr) {
  let array = [...arr];

  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));

    [array[i], array[j]] = [array[j], array[i]];
  }

  return array;
}


showQuestion(); 
