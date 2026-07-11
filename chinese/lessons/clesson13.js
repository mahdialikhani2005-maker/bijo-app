let current = 0;
let xp = 0;

function speak(text){
  if (!window.speechSynthesis) return;

  const utter = new SpeechSynthesisUtterance(text);
  utter.lang = "zh-CN";
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
question:"哪个是今天 ？",
speak:"jīntiān",
options:[
{text:"明天",image:"../../media/time/tomorrow.png"},
{text:"今天",image:"../../media/time/today.png"},
{text:"昨天",image:"../../media/time/yesterday.png"},
{text:"早上",image:"../../media/time/morning.png"}
],
answer:"今天"
},

{
type:"image",
question:"哪个是明天 ？",
speak:"míngtiān",
options:[
{text:"晚上",image:"../../media/time/night.png"},
{text:"明天",image:"../../media/time/tomorrow.png"},
{text:"今天",image:"../../media/time/today.png"},
{text:"昨天",image:"../../media/time/yesterday.png"}
],
answer:"明天"
},

{
type:"image",
question:"哪个是昨天 ？",
speak:"zuótiān",
options:[
{text:"今天",image:"../../media/time/today.png"},
{text:"昨天",image:"../../media/time/yesterday.png"},
{text:"晚上",image:"../../media/time/night.png"},
{text:"明天",image:"../../media/time/tomorrow.png"}
],
answer:"昨天"
},

{
type:"image",
question:"哪个是早上 ？",
speak:"zǎoshàng",
options:[
{text:"昨天",image:"../../media/time/yesterday.png"},
{text:"明天",image:"../../media/time/tomorrow.png"},
{text:"早上",image:"../../media/time/morning.png"},
{text:"今天",image:"../../media/time/today.png"}
],
answer:"早上"
},

{
type:"image",
question:"哪个是晚上 ？",
speak:"wǎnshàng",
options:[
{text:"早上",image:"../../media/time/morning.png"},
{text:"今天",image:"../../media/time/today.png"},
{text:"明天",image:"../../media/time/tomorrow.png"},
{text:"晚上",image:"../../media/time/night.png"}
],
answer:"晚上"
},

/* WORD */

{
type:"word",
question:"这是什么图片？",
image:"../../media/time/today.png",
options:["明天","今天","昨天","早上"],
answer:"今天"
},

{
type:"word",
question:"这是什么图片？",
image:"../../media/time/tomorrow.png",
options:["晚上","明天","今天","昨天"],
answer:"明天"
},

{
type:"word",
question:"这是什么图片？",
image:"../../media/time/yesterday.png",
options:["今天","昨天","晚上","明天"],
answer:"昨天"
},

{
type:"word",
question:"这是什么图片？",
image:"../../media/time/morning.png",
options:["昨天","明天","早上","今天"],
answer:"早上"
},

{
type:"word",
question:"这是什么图片？",
image:"../../media/time/night.png",
options:["早上","今天","明天","晚上"],
answer:"晚上"
},

/* AUDIO */

{
type:"audio",
speak:"jīntiān",
question:"你听到了哪个词？",
options:["明天","今天","昨天","早上"],
answer:"今天"
},

{
type:"audio",
speak:"míngtiān",
question:"你听到了哪个词？",
options:["晚上","明天","今天","昨天"],
answer:"明天"
},

{
type:"audio",
speak:"zuótiān",
question:"你听到了哪个词？",
options:["今天","昨天","晚上","明天"],
answer:"昨天"
},

{
type:"audio",
speak:"zǎoshàng",
question:"你听到了哪个词？",
options:["昨天","明天","早上","今天"],
answer:"早上"
},

{
type:"audio",
speak:"wǎnshàng",
question:"你听到了哪个词？",
options:["早上","今天","明天","晚上"],
answer:"晚上"
},

/* BUILD ZH */

{
type:"build-zh",
speak:"今天是星期一",
question:"请组成中文句子：",
text:"امروز دوشنبه است",
words:["今天","是","星期一"],
answer:["今天","是","星期一"]
},

{
type:"build-zh",
speak:"明天是星期二",
question:"请组成中文句子：",
text:"فردا سه‌شنبه است",
words:["明天","是","星期二"],
answer:["明天","是","星期二"]
},

{
type:"build-zh",
speak:"昨天是星期日",
question:"请组成中文句子：",
text:"دیروز یک‌شنبه بود",
words:["昨天","是","星期日"],
answer:["昨天","是","星期日"]
},

{
type:"build-zh",
speak:"早上好",
question:"请组成中文句子：",
text:"صبح بخیر",
words:["早上","好"],
answer:["早上","好"]
},

{
type:"build-zh",
speak:"晚安",
question:"请组成中文句子：",
text:"شب بخیر",
words:["晚","安"],
answer:["晚","安"]
},

/* BUILD FA */

{
type:"build-fa",
speak:"今天是星期一",
question:"ترجمه را بساز:",
text:"今天是星期一",
words:["است","دوشنبه","امروز"],
answer:["امروز","دوشنبه","است"]
},

{
type:"build-fa",
speak:"明天是星期二",
question:"ترجمه را بساز:",
text:"明天是星期二",
words:["است","سه‌شنبه","فردا"],
answer:["فردا","سه‌شنبه","است"]
},

{
type:"build-fa",
speak:"昨天是星期日",
question:"ترجمه را بساز:",
text:"昨天是星期日",
words:["بود","یک‌شنبه","دیروز"],
answer:["دیروز","یک‌شنبه","بود"]
},

{
type:"build-fa",
speak:"早上好",
question:"ترجمه را بساز:",
text:"早上好",
words:["بخیر","صبح"],
answer:["صبح","بخیر"]
},

{
type:"build-fa",
speak:"晚安",
question:"ترجمه را بساز:",
text:"晚安",
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

  else if (q.type === "build-en" || q.type === "build-fa" || q.type === "build-zh-CN") {
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

if (q.type === "build-en" || q.type === "build-zh-CN") {
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
