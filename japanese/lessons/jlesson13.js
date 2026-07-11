let current = 0;
let xp = 0;

function speak(text){
  if (!window.speechSynthesis) return;

  const utter = new SpeechSynthesisUtterance(text);
  utter.lang = "ja";
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
question:"どれが今日 ですか？",
speak:"きょう",
options:[
{text:"明日",image:"../../media/time/tomorrow.png"},
{text:"今日",image:"../../media/time/today.png"},
{text:"昨日",image:"../../media/time/yesterday.png"},
{text:"朝",image:"../../media/time/morning.png"}
],
answer:"今日"
},

{
type:"image",
question:"どれが明日 ですか？",
speak:"あした",
options:[
{text:"夜",image:"../../media/time/night.png"},
{text:"明日",image:"../../media/time/tomorrow.png"},
{text:"今日",image:"../../media/time/today.png"},
{text:"昨日",image:"../../media/time/yesterday.png"}
],
answer:"明日"
},

{
type:"image",
question:"どれが昨日 ですか？",
speak:"きのう",
options:[
{text:"今日",image:"../../media/time/today.png"},
{text:"昨日",image:"../../media/time/yesterday.png"},
{text:"夜",image:"../../media/time/night.png"},
{text:"明日",image:"../../media/time/tomorrow.png"}
],
answer:"昨日"
},

{
type:"image",
question:"どれが朝 ですか？",
speak:"あさ",
options:[
{text:"昨日",image:"../../media/time/yesterday.png"},
{text:"明日",image:"../../media/time/tomorrow.png"},
{text:"朝",image:"../../media/time/morning.png"},
{text:"今日",image:"../../media/time/today.png"}
],
answer:"朝"
},

{
type:"image",
question:"どれが夜 ですか？",
speak:"よる",
options:[
{text:"朝",image:"../../media/time/morning.png"},
{text:"今日",image:"../../media/time/today.png"},
{text:"明日",image:"../../media/time/tomorrow.png"},
{text:"夜",image:"../../media/time/night.png"}
],
answer:"夜"
},

/* WORD */

{
type:"word",
question:"この画像は何ですか？",
image:"../../media/time/today.png",
options:["明日","今日","昨日","朝"],
answer:"今日"
},

{
type:"word",
question:"この画像は何ですか？",
image:"../../media/time/tomorrow.png",
options:["夜","明日","今日","昨日"],
answer:"明日"
},

{
type:"word",
question:"この画像は何ですか？",
image:"../../media/time/yesterday.png",
options:["今日","昨日","夜","明日"],
answer:"昨日"
},

{
type:"word",
question:"この画像は何ですか？",
image:"../../media/time/morning.png",
options:["昨日","明日","朝","今日"],
answer:"朝"
},

{
type:"word",
question:"この画像は何ですか？",
image:"../../media/time/night.png",
options:["朝","今日","明日","夜"],
answer:"夜"
},

/* AUDIO */

{
type:"audio",
speak:"きょう",
question:"どの言葉を聞きましたか？",
options:["明日","今日","昨日","朝"],
answer:"今日"
},

{
type:"audio",
speak:"あした",
question:"どの言葉を聞きましたか？",
options:["夜","明日","今日","昨日"],
answer:"明日"
},

{
type:"audio",
speak:"きのう",
question:"どの言葉を聞きましたか？",
options:["今日","昨日","夜","明日"],
answer:"昨日"
},

{
type:"audio",
speak:"あさ",
question:"どの言葉を聞きましたか？",
options:["昨日","明日","朝","今日"],
answer:"朝"
},

{
type:"audio",
speak:"よる",
question:"どの言葉を聞きましたか？",
options:["朝","今日","明日","夜"],
answer:"夜"
},

/* BUILD JA */

{
type:"build-ja",
speak:"きょう は げつようび です",
question:"日本語の文を作ってください:",
text:"امروز دوشنبه است",
words:["きょう","は","げつようび","です"],
answer:["きょう","は","げつようび","です"]
},

{
type:"build-ja",
speak:"あした は かようび です",
question:"日本語の文を作ってください:",
text:"فردا سه‌شنبه است",
words:["あした","は","かようび","です"],
answer:["あした","は","かようび","です"]
},

{
type:"build-ja",
speak:"きのう は にちようび でした",
question:"日本語の文を作ってください:",
text:"دیروز یک‌شنبه بود",
words:["きのう","は","にちようび","でした"],
answer:["きのう","は","にちようび","でした"]
},

{
type:"build-ja",
speak:"おはよう ございます",
question:"日本語の文を作ってください:",
text:"صبح بخیر",
words:["おはよう","ございます"],
answer:["おはよう","ございます"]
},

{
type:"build-ja",
speak:"おやすみ なさい",
question:"日本語の文を作ってください:",
text:"شب بخیر",
words:["おやすみ","なさい"],
answer:["おやすみ","なさい"]
},

/* BUILD FA */

{
type:"build-fa",
speak:"きょう は げつようび です",
question:"ترجمه را بساز:",
text:"きょう は げつようび です",
words:["است","دوشنبه","امروز"],
answer:["امروز","دوشنبه","است"]
},

{
type:"build-fa",
speak:"あした は かようび です",
question:"ترجمه را بساز:",
text:"あした は かようび です",
words:["است","سه‌شنبه","فردا"],
answer:["فردا","سه‌شنبه","است"]
},

{
type:"build-fa",
speak:"きのう は にちようび でした",
question:"ترجمه را بساز:",
text:"きのう は にちようび でした",
words:["بود","یک‌شنبه","دیروز"],
answer:["دیروز","یک‌شنبه","بود"]
},

{
type:"build-fa",
speak:"おはよう ございます",
question:"ترجمه را بساز:",
text:"おはよう ございます",
words:["بخیر","صبح"],
answer:["صبح","بخیر"]
},

{
type:"build-fa",
speak:"おやすみ なさい",
question:"ترجمه را بساز:",
text:"おやすみ なさい",
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

  else if (q.type === "build-en" || q.type === "build-fa" || q.type === "build-ja") {
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

if (q.type === "build-en" || q.type === "build-ja") {
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
