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
question:"どれが車 ですか？",
speak:"くるま",
options:[
{text:"バス",image:"../../media/vehicles/bus.png"},
{text:"車",image:"../../media/vehicles/car.png"},
{text:"電車",image:"../../media/vehicles/train.png"},
{text:"飛行機",image:"../../media/vehicles/airplane.png"}
],
answer:"車"
},

{
type:"image",
question:"どれがバス ですか？",
speak:"バス",
options:[
{text:"飛行機",image:"../../media/vehicles/airplane.png"},
{text:"バス",image:"../../media/vehicles/bus.png"},
{text:"自転車",image:"../../media/vehicles/bicycle.png"},
{text:"車",image:"../../media/vehicles/car.png"}
],
answer:"バス"
},

{
type:"image",
question:"どれが電車 ですか？",
speak:"でんしゃ",
options:[
{text:"車",image:"../../media/vehicles/car.png"},
{text:"電車",image:"../../media/vehicles/train.png"},
{text:"自転車",image:"../../media/vehicles/bicycle.png"},
{text:"バス",image:"../../media/vehicles/bus.png"}
],
answer:"電車"
},

{
type:"image",
question:"どれが飛行機 ですか？",
speak:"ひこうき",
options:[
{text:"電車",image:"../../media/vehicles/train.png"},
{text:"バス",image:"../../media/vehicles/bus.png"},
{text:"飛行機",image:"../../media/vehicles/airplane.png"},
{text:"車",image:"../../media/vehicles/car.png"}
],
answer:"飛行機"
},

{
type:"image",
question:"どれが自転車 ですか？",
speak:"じてんしゃ",
options:[
{text:"飛行機",image:"../../media/vehicles/airplane.png"},
{text:"車",image:"../../media/vehicles/car.png"},
{text:"バス",image:"../../media/vehicles/bus.png"},
{text:"自転車",image:"../../media/vehicles/bicycle.png"}
],
answer:"自転車"
},

/* WORD */

{
type:"word",
question:"この画像は何ですか？",
image:"../../media/vehicles/car.png",
options:["バス","車","電車","飛行機"],
answer:"車"
},

{
type:"word",
question:"この画像は何ですか？",
image:"../../media/vehicles/bus.png",
options:["飛行機","バス","自転車","車"],
answer:"バス"
},

{
type:"word",
question:"この画像は何ですか？",
image:"../../media/vehicles/train.png",
options:["車","電車","自転車","バス"],
answer:"電車"
},

{
type:"word",
question:"この画像は何ですか？",
image:"../../media/vehicles/airplane.png",
options:["電車","バス","飛行機","車"],
answer:"飛行機"
},

{
type:"word",
question:"この画像は何ですか？",
image:"../../media/vehicles/bicycle.png",
options:["飛行機","車","バス","自転車"],
answer:"自転車"
},

/* AUDIO */

{
type:"audio",
speak:"くるま",
question:"どの言葉を聞きましたか？",
options:["バス","車","電車","飛行機"],
answer:"車"
},

{
type:"audio",
speak:"バス",
question:"どの言葉を聞きましたか？",
options:["飛行機","バス","自転車","車"],
answer:"バス"
},

{
type:"audio",
speak:"でんしゃ",
question:"どの言葉を聞きましたか？",
options:["車","電車","自転車","バス"],
answer:"電車"
},

{
type:"audio",
speak:"ひこうき",
question:"どの言葉を聞きましたか？",
options:["電車","バス","飛行機","車"],
answer:"飛行機"
},

{
type:"audio",
speak:"じてんしゃ",
question:"どの言葉を聞きましたか？",
options:["飛行機","車","バス","自転車"],
answer:"自転車"
},

/* BUILD JA */

{
type:"build-ja",
speak:"わたしは くるま を もっています",
question:"日本語の文を作ってください:",
text:"من یک ماشین دارم",
words:["くるま","を","もっています","わたしは"],
answer:["わたしは","くるま","を","もっています"]
},

{
type:"build-ja",
speak:"わたしは バス を もっています",
question:"日本語の文を作ってください:",
text:"من یک اتوبوس دارم",
words:["バス","を","もっています","わたしは"],
answer:["わたしは","バス","を","もっています"]
},

{
type:"build-ja",
speak:"わたしは でんしゃ を もっています",
question:"日本語の文を作ってください:",
text:"من یک قطار دارم",
words:["でんしゃ","を","もっています","わたしは"],
answer:["わたしは","でんしゃ","を","もっています"]
},

{
type:"build-ja",
speak:"わたしは ひこうき を もっています",
question:"日本語の文を作ってください:",
text:"من یک هواپیما دارم",
words:["ひこうき","を","もっています","わたしは"],
answer:["わたしは","ひこうき","を","もっています"]
},

{
type:"build-ja",
speak:"わたしは じてんしゃ を もっています",
question:"日本語の文を作ってください:",
text:"من یک دوچرخه دارم",
words:["じてんしゃ","を","もっています","わたしは"],
answer:["わたしは","じてんしゃ","を","もっています"]
},

/* BUILD FA */

{
type:"build-fa",
speak:"わたしは くるま を もっています",
question:"ترجمه را بساز:",
text:"わたしは くるま を もっています",
words:["دارم","ماشین","یک","من"],
answer:["من","یک","ماشین","دارم"]
},

{
type:"build-fa",
speak:"わたしは バス を もっています",
question:"ترجمه را بساز:",
text:"わたしは バス を もっています",
words:["دارم","اتوبوس","یک","من"],
answer:["من","یک","اتوبوس","دارم"]
},

{
type:"build-fa",
speak:"わたしは でんしゃ を もっています",
question:"ترجمه را بساز:",
text:"わたしは でんしゃ を もっています",
words:["دارم","قطار","یک","من"],
answer:["من","یک","قطار","دارم"]
},

{
type:"build-fa",
speak:"わたしは ひこうき を もっています",
question:"ترجمه را بساز:",
text:"わたしは ひこうき を もっています",
words:["دارم","هواپیما","یک","من"],
answer:["من","یک","هواپیما","دارم"]
},

{
type:"build-fa",
speak:"わたしは じてんしゃ を もっています",
question:"ترجمه را بساز:",
text:"わたしは じてんしゃ を もっています",
words:["دارم","دوچرخه","یک","من"],
answer:["من","یک","دوچرخه","دارم"]
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
