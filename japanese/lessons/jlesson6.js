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
question:"どれがりんご ですか？",
speak:"りんご",
options:[
{text:"バナナ",image:"../../media/fruits/banana.png"},
{text:"りんご",image:"../../media/fruits/apple.png"},
{text:"オレンジ",image:"../../media/fruits/orange.png"},
{text:"ぶどう",image:"../../media/fruits/grape.png"}
],
answer:"りんご"
},

{
type:"image",
question:"どれがバナナ ですか？",
speak:"バナナ",
options:[
{text:"オレンジ",image:"../../media/fruits/orange.png"},
{text:"バナナ",image:"../../media/fruits/banana.png"},
{text:"すいか",image:"../../media/fruits/watermelon.png"},
{text:"りんご",image:"../../media/fruits/apple.png"}
],
answer:"バナナ"
},

{
type:"image",
question:"どれがオレンジ ですか？",
speak:"オレンジ",
options:[
{text:"りんご",image:"../../media/fruits/apple.png"},
{text:"オレンジ",image:"../../media/fruits/orange.png"},
{text:"ぶどう",image:"../../media/fruits/grape.png"},
{text:"バナナ",image:"../../media/fruits/banana.png"}
],
answer:"オレンジ"
},

{
type:"image",
question:"どれがぶどう ですか？",
speak:"ぶどう",
options:[
{text:"オレンジ",image:"../../media/fruits/orange.png"},
{text:"バナナ",image:"../../media/fruits/banana.png"},
{text:"ぶどう",image:"../../media/fruits/grape.png"},
{text:"りんご",image:"../../media/fruits/apple.png"}
],
answer:"ぶどう"
},

{
type:"image",
question:"どれがすいか ですか？",
speak:"すいか",
options:[
{text:"ぶどう",image:"../../media/fruits/grape.png"},
{text:"りんご",image:"../../media/fruits/apple.png"},
{text:"バナナ",image:"../../media/fruits/banana.png"},
{text:"すいか",image:"../../media/fruits/watermelon.png"}
],
answer:"すいか"
},

/* WORD */

{
type:"word",
question:"この画像は何ですか？",
image:"../../media/fruits/apple.png",
options:["バナナ","りんご","オレンジ","ぶどう"],
answer:"りんご"
},

{
type:"word",
question:"この画像は何ですか？",
image:"../../media/fruits/banana.png",
options:["オレンジ","バナナ","すいか","りんご"],
answer:"バナナ"
},

{
type:"word",
question:"この画像は何ですか？",
image:"../../media/fruits/orange.png",
options:["りんご","オレンジ","ぶどう","バナナ"],
answer:"オレンジ"
},

{
type:"word",
question:"この画像は何ですか？",
image:"../../media/fruits/grape.png",
options:["オレンジ","バナナ","ぶどう","りんご"],
answer:"ぶどう"
},

{
type:"word",
question:"この画像は何ですか？",
image:"../../media/fruits/watermelon.png",
options:["ぶどう","りんご","バナナ","すいか"],
answer:"すいか"
},

/* AUDIO */

{
type:"audio",
speak:"りんご",
question:"どの言葉を聞きましたか？",
options:["バナナ","りんご","オレンジ","ぶどう"],
answer:"りんご"
},

{
type:"audio",
speak:"バナナ",
question:"どの言葉を聞きましたか？",
options:["オレンジ","バナナ","すいか","りんご"],
answer:"バナナ"
},

{
type:"audio",
speak:"オレンジ",
question:"どの言葉を聞きましたか？",
options:["りんご","オレンジ","ぶどう","バナナ"],
answer:"オレンジ"
},

{
type:"audio",
speak:"ぶどう",
question:"どの言葉を聞きましたか？",
options:["オレンジ","バナナ","ぶどう","りんご"],
answer:"ぶどう"
},

{
type:"audio",
speak:"すいか",
question:"どの言葉を聞きましたか？",
options:["ぶどう","りんご","バナナ","すいか"],
answer:"すいか"
},

/* BUILD JA */

{
type:"build-ja",
speak:"わたしは りんご を たべます",
question:"日本語の文を作ってください:",
text:"من یک سیب می‌خورم",
words:["りんご","を","たべます","わたしは"],
answer:["わたしは","りんご","を","たべます"]
},

{
type:"build-ja",
speak:"わたしは バナナ を たべます",
question:"日本語の文を作ってください:",
text:"من یک موز می‌خورم",
words:["バナナ","を","たべます","わたしは"],
answer:["わたしは","バナナ","を","たべます"]
},

{
type:"build-ja",
speak:"わたしは オレンジ を たべます",
question:"日本語の文を作ってください:",
text:"من یک پرتقال می‌خورم",
words:["オレンジ","を","たべます","わたしは"],
answer:["わたしは","オレンジ","を","たべます"]
},

{
type:"build-ja",
speak:"わたしは ぶどう を たべます",
question:"日本語の文を作ってください:",
text:"من انگور می‌خورم",
words:["ぶどう","を","たべます","わたしは"],
answer:["わたしは","ぶどう","を","たべます"]
},

{
type:"build-ja",
speak:"わたしは すいか を たべます",
question:"日本語の文を作ってください:",
text:"من هندوانه می‌خورم",
words:["すいか","を","たべます","わたしは"],
answer:["わたしは","すいか","を","たべます"]
},

/* BUILD FA */

{
type:"build-fa",
speak:"わたしは りんご を たべます",
question:"ترجمه را بساز:",
text:"わたしは りんご を たべます",
words:["می‌خورم","سیب","یک","من"],
answer:["من","یک","سیب","می‌خورم"]
},

{
type:"build-fa",
speak:"わたしは バナナ を たべます",
question:"ترجمه را بساز:",
text:"わたしは バナナ を たべます",
words:["می‌خورم","موز","یک","من"],
answer:["من","یک","موز","می‌خورم"]
},

{
type:"build-fa",
speak:"わたしは オレンジ を たべます",
question:"ترجمه را بساز:",
text:"わたしは オレンジ を たべます",
words:["می‌خورم","پرتقال","یک","من"],
answer:["من","یک","پرتقال","می‌خورم"]
},

{
type:"build-fa",
speak:"わたしは ぶどう を たべます",
question:"ترجمه را بساز:",
text:"わたしは ぶどう を たべます",
words:["می‌خورم","انگور","من"],
answer:["من","انگور","می‌خورم"]
},

{
type:"build-fa",
speak:"わたしは すいか を たべます",
question:"ترجمه را بساز:",
text:"わたしは すいか を たべます",
words:["می‌خورم","هندوانه","من"],
answer:["من","هندوانه","می‌خورم"]
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
