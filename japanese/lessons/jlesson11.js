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
question:"どれが赤 ですか？",
speak:"あか",
options:[
{text:"青",image:"../../media/colors/blue.png"},
{text:"赤",image:"../../media/colors/red.png"},
{text:"緑",image:"../../media/colors/green.png"},
{text:"黄色",image:"../../media/colors/yellow.png"}
],
answer:"赤"
},

{
type:"image",
question:"どれが青 ですか？",
speak:"あお",
options:[
{text:"黄色",image:"../../media/colors/yellow.png"},
{text:"青",image:"../../media/colors/blue.png"},
{text:"黒",image:"../../media/colors/black.png"},
{text:"赤",image:"../../media/colors/red.png"}
],
answer:"青"
},

{
type:"image",
question:"どれが緑 ですか？",
speak:"みどり",
options:[
{text:"赤",image:"../../media/colors/red.png"},
{text:"緑",image:"../../media/colors/green.png"},
{text:"黒",image:"../../media/colors/black.png"},
{text:"青",image:"../../media/colors/blue.png"}
],
answer:"緑"
},

{
type:"image",
question:"どれが黄色 ですか？",
speak:"きいろ",
options:[
{text:"緑",image:"../../media/colors/green.png"},
{text:"青",image:"../../media/colors/blue.png"},
{text:"黄色",image:"../../media/colors/yellow.png"},
{text:"赤",image:"../../media/colors/red.png"}
],
answer:"黄色"
},

{
type:"image",
question:"どれが黒 ですか？",
speak:"くろ",
options:[
{text:"黄色",image:"../../media/colors/yellow.png"},
{text:"赤",image:"../../media/colors/red.png"},
{text:"青",image:"../../media/colors/blue.png"},
{text:"黒",image:"../../media/colors/black.png"}
],
answer:"黒"
},

/* WORD */

{
type:"word",
question:"この色は何ですか？",
image:"../../media/colors/red.png",
options:["青","赤","緑","黄色"],
answer:"赤"
},

{
type:"word",
question:"この色は何ですか？",
image:"../../media/colors/blue.png",
options:["黄色","青","黒","赤"],
answer:"青"
},

{
type:"word",
question:"この色は何ですか？",
image:"../../media/colors/green.png",
options:["赤","緑","黒","青"],
answer:"緑"
},

{
type:"word",
question:"この色は何ですか？",
image:"../../media/colors/yellow.png",
options:["緑","青","黄色","赤"],
answer:"黄色"
},

{
type:"word",
question:"この色は何ですか？",
image:"../../media/colors/black.png",
options:["黄色","赤","青","黒"],
answer:"黒"
},

/* AUDIO */

{
type:"audio",
speak:"あか",
question:"どの言葉を聞きましたか？",
options:["青","赤","緑","黄色"],
answer:"赤"
},

{
type:"audio",
speak:"あお",
question:"どの言葉を聞きましたか？",
options:["黄色","青","黒","赤"],
answer:"青"
},

{
type:"audio",
speak:"みどり",
question:"どの言葉を聞きましたか？",
options:["赤","緑","黒","青"],
answer:"緑"
},

{
type:"audio",
speak:"きいろ",
question:"どの言葉を聞きましたか？",
options:["緑","青","黄色","赤"],
answer:"黄色"
},

{
type:"audio",
speak:"くろ",
question:"どの言葉を聞きましたか？",
options:["黄色","赤","青","黒"],
answer:"黒"
},

/* BUILD JA */

{
type:"build-ja",
speak:"これは あか です",
question:"日本語の文を作ってください:",
text:"این قرمز است",
words:["あか","です","これは"],
answer:["これは","あか","です"]
},

{
type:"build-ja",
speak:"これは あお です",
question:"日本語の文を作ってください:",
text:"این آبی است",
words:["あお","です","これは"],
answer:["これは","あお","です"]
},

{
type:"build-ja",
speak:"これは みどり です",
question:"日本語の文を作ってください:",
text:"این سبز است",
words:["みどり","です","これは"],
answer:["これは","みどり","です"]
},

{
type:"build-ja",
speak:"これは きいろ です",
question:"日本語の文を作ってください:",
text:"این زرد است",
words:["きいろ","です","これは"],
answer:["これは","きいろ","です"]
},

{
type:"build-ja",
speak:"これは くろ です",
question:"日本語の文を作ってください:",
text:"این مشکی است",
words:["くろ","です","これは"],
answer:["これは","くろ","です"]
},

/* BUILD FA */

{
type:"build-fa",
speak:"これは あか です",
question:"ترجمه را بساز:",
text:"これは あか です",
words:["است","قرمز","این"],
answer:["این","قرمز","است"]
},

{
type:"build-fa",
speak:"これは あお です",
question:"ترجمه را بساز:",
text:"これは あお です",
words:["است","آبی","این"],
answer:["این","آبی","است"]
},

{
type:"build-fa",
speak:"これは みどり です",
question:"ترجمه را بساز:",
text:"これは みどり です",
words:["است","سبز","این"],
answer:["این","سبز","است"]
},

{
type:"build-fa",
speak:"これは きいろ です",
question:"ترجمه را بساز:",
text:"これは きいろ です",
words:["است","زرد","این"],
answer:["این","زرد","است"]
},

{
type:"build-fa",
speak:"これは くろ です",
question:"ترجمه را بساز:",
text:"これは くろ です",
words:["است","مشکی","این"],
answer:["این","مشکی","است"]
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
