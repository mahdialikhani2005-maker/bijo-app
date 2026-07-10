let current = 0;
let xp = 0;

function speak(text){
  if (!window.speechSynthesis) return;

  const utter = new SpeechSynthesisUtterance(text);
  utter.lang = "en-US";
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
question:"today کدام است؟",
speak:"today",
options:[
{text:"tomorrow",image:"../../media/time/tomorrow.png"},
{text:"today",image:"../../media/time/today.png"},
{text:"yesterday",image:"../../media/time/yesterday.png"},
{text:"morning",image:"../../media/time/morning.png"}
],
answer:"today"
},

{
type:"image",
question:"tomorrow کدام است؟",
speak:"tomorrow",
options:[
{text:"night",image:"../../media/time/night.png"},
{text:"tomorrow",image:"../../media/time/tomorrow.png"},
{text:"today",image:"../../media/time/today.png"},
{text:"yesterday",image:"../../media/time/yesterday.png"}
],
answer:"tomorrow"
},

{
type:"image",
question:"yesterday کدام است؟",
speak:"yesterday",
options:[
{text:"today",image:"../../media/time/today.png"},
{text:"yesterday",image:"../../media/time/yesterday.png"},
{text:"night",image:"../../media/time/night.png"},
{text:"tomorrow",image:"../../media/time/tomorrow.png"}
],
answer:"yesterday"
},

{
type:"image",
question:"morning کدام است؟",
speak:"morning",
options:[
{text:"yesterday",image:"../../media/time/yesterday.png"},
{text:"tomorrow",image:"../../media/time/tomorrow.png"},
{text:"morning",image:"../../media/time/morning.png"},
{text:"today",image:"../../media/time/today.png"}
],
answer:"morning"
},

{
type:"image",
question:"night کدام است؟",
speak:"night",
options:[
{text:"morning",image:"../../media/time/morning.png"},
{text:"today",image:"../../media/time/today.png"},
{text:"tomorrow",image:"../../media/time/tomorrow.png"},
{text:"night",image:"../../media/time/night.png"}
],
answer:"night"
},

/* WORD */

{
type:"word",
question:"این تصویر چیست؟",
image:"../../media/time/today.png",
options:["tomorrow","today","yesterday","morning"],
answer:"today"
},

{
type:"word",
question:"این تصویر چیست؟",
image:"../../media/time/tomorrow.png",
options:["night","tomorrow","today","yesterday"],
answer:"tomorrow"
},

{
type:"word",
question:"این تصویر چیست؟",
image:"../../media/time/yesterday.png",
options:["today","yesterday","night","tomorrow"],
answer:"yesterday"
},

{
type:"word",
question:"این تصویر چیست؟",
image:"../../media/time/morning.png",
options:["yesterday","tomorrow","morning","today"],
answer:"morning"
},

{
type:"word",
question:"این تصویر چیست؟",
image:"../../media/time/night.png",
options:["morning","today","tomorrow","night"],
answer:"night"
},

/* AUDIO */

{
type:"audio",
speak:"today",
question:"کدام کلمه را شنیدی؟",
options:["tomorrow","today","yesterday","morning"],
answer:"today"
},

{
type:"audio",
speak:"tomorrow",
question:"کدام کلمه را شنیدی؟",
options:["night","tomorrow","today","yesterday"],
answer:"tomorrow"
},

{
type:"audio",
speak:"yesterday",
question:"کدام کلمه را شنیدی؟",
options:["today","yesterday","night","tomorrow"],
answer:"yesterday"
},

{
type:"audio",
speak:"morning",
question:"کدام کلمه را شنیدی؟",
options:["yesterday","tomorrow","morning","today"],
answer:"morning"
},

{
type:"audio",
speak:"night",
question:"کدام کلمه را شنیدی؟",
options:["morning","today","tomorrow","night"],
answer:"night"
},

/* BUILD EN */

{
type:"build-en",
speak:"Today is Monday",
question:"جمله انگلیسی را بساز:",
text:"امروز دوشنبه است",
words:["is","Today","Monday"],
answer:["Today","is","Monday"]
},

{
type:"build-en",
speak:"Tomorrow is Tuesday",
question:"جمله انگلیسی را بساز:",
text:"فردا سه‌شنبه است",
words:["Tomorrow","is","Tuesday"],
answer:["Tomorrow","is","Tuesday"]
},

{
type:"build-en",
speak:"Yesterday was Sunday",
question:"جمله انگلیسی را بساز:",
text:"دیروز یک‌شنبه بود",
words:["was","Yesterday","Sunday"],
answer:["Yesterday","was","Sunday"]
},

{
type:"build-en",
speak:"Good morning",
question:"جمله انگلیسی را بساز:",
text:"صبح بخیر",
words:["morning","Good"],
answer:["Good","morning"]
},

{
type:"build-en",
speak:"Good night",
question:"جمله انگلیسی را بساز:",
text:"شب بخیر",
words:["night","Good"],
answer:["Good","night"]
},

/* BUILD FA */

{
type:"build-fa",
speak:"Today is Monday",
question:"ترجمه را بساز:",
text:"Today is Monday",
words:["است","دوشنبه","امروز"],
answer:["امروز","دوشنبه","است"]
},

{
type:"build-fa",
speak:"Tomorrow is Tuesday",
question:"ترجمه را بساز:",
text:"Tomorrow is Tuesday",
words:["است","سه‌شنبه","فردا"],
answer:["فردا","سه‌شنبه","است"]
},

{
type:"build-fa",
speak:"Yesterday was Sunday",
question:"ترجمه را بساز:",
text:"Yesterday was Sunday",
words:["بود","یک‌شنبه","دیروز"],
answer:["دیروز","یک‌شنبه","بود"]
},

{
type:"build-fa",
speak:"Good morning",
question:"ترجمه را بساز:",
text:"Good morning",
words:["بخیر","صبح"],
answer:["صبح","بخیر"]
},

{
type:"build-fa",
speak:"Good night",
question:"ترجمه را بساز:",
text:"Good night",
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

  else if (q.type === "build-en" || q.type === "build-fa") {
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

  if (q.type === "build-en") {
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
