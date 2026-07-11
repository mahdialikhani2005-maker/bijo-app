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
question:"どれが太陽 ですか？",
speak:"たいよう",
options:[
{text:"月",image:"../../media/nature/moon.png"},
{text:"太陽",image:"../../media/nature/sun.png"},
{text:"星",image:"../../media/nature/star.png"},
{text:"空",image:"../../media/nature/sky.png"}
],
answer:"太陽"
},

{
type:"image",
question:"どれが月 ですか？",
speak:"つき",
options:[
{text:"星",image:"../../media/nature/star.png"},
{text:"月",image:"../../media/nature/moon.png"},
{text:"雨",image:"../../media/nature/rain.png"},
{text:"太陽",image:"../../media/nature/sun.png"}
],
answer:"月"
},

{
type:"image",
question:"どれが星 ですか？",
speak:"ほし",
options:[
{text:"太陽",image:"../../media/nature/sun.png"},
{text:"星",image:"../../media/nature/star.png"},
{text:"雨",image:"../../media/nature/rain.png"},
{text:"月",image:"../../media/nature/moon.png"}
],
answer:"星"
},

{
type:"image",
question:"どれが空 ですか？",
speak:"そら",
options:[
{text:"星",image:"../../media/nature/star.png"},
{text:"月",image:"../../media/nature/moon.png"},
{text:"空",image:"../../media/nature/sky.png"},
{text:"太陽",image:"../../media/nature/sun.png"}
],
answer:"空"
},

{
type:"image",
question:"どれが雨 ですか？",
speak:"あめ",
options:[
{text:"空",image:"../../media/nature/sky.png"},
{text:"太陽",image:"../../media/nature/sun.png"},
{text:"月",image:"../../media/nature/moon.png"},
{text:"雨",image:"../../media/nature/rain.png"}
],
answer:"雨"
},

/* WORD */

{
type:"word",
question:"この画像は何ですか？",
image:"../../media/nature/sun.png",
options:["月","太陽","星","空"],
answer:"太陽"
},

{
type:"word",
question:"この画像は何ですか？",
image:"../../media/nature/moon.png",
options:["星","月","雨","太陽"],
answer:"月"
},

{
type:"word",
question:"この画像は何ですか？",
image:"../../media/nature/star.png",
options:["太陽","星","雨","月"],
answer:"星"
},

{
type:"word",
question:"この画像は何ですか？",
image:"../../media/nature/sky.png",
options:["星","月","空","太陽"],
answer:"空"
},

{
type:"word",
question:"この画像は何ですか？",
image:"../../media/nature/rain.png",
options:["空","太陽","月","雨"],
answer:"雨"
},

/* AUDIO */

{
type:"audio",
speak:"たいよう",
question:"どの言葉を聞きましたか？",
options:["月","太陽","星","空"],
answer:"太陽"
},

{
type:"audio",
speak:"つき",
question:"どの言葉を聞きましたか？",
options:["星","月","雨","太陽"],
answer:"月"
},

{
type:"audio",
speak:"ほし",
question:"どの言葉を聞きましたか？",
options:["太陽","星","雨","月"],
answer:"星"
},

{
type:"audio",
speak:"そら",
question:"どの言葉を聞きましたか？",
options:["星","月","空","太陽"],
answer:"空"
},

{
type:"audio",
speak:"あめ",
question:"どの言葉を聞きましたか？",
options:["空","太陽","月","雨"],
answer:"雨"
},

/* BUILD JA */

{
type:"build-ja",
speak:"たいよう は おおきい です",
question:"日本語の文を作ってください:",
text:"خورشید بزرگ است",
words:["たいよう","は","おおきい","です"],
answer:["たいよう","は","おおきい","です"]
},

{
type:"build-ja",
speak:"つき は ちいさい です",
question:"日本語の文を作ってください:",
text:"ماه کوچک است",
words:["つき","は","ちいさい","です"],
answer:["つき","は","ちいさい","です"]
},

{
type:"build-ja",
speak:"ほし は あかるい です",
question:"日本語の文を作ってください:",
text:"ستاره درخشان است",
words:["ほし","は","あかるい","です"],
answer:["ほし","は","あかるい","です"]
},

{
type:"build-ja",
speak:"そら は あおい です",
question:"日本語の文を作ってください:",
text:"آسمان آبی است",
words:["そら","は","あおい","です"],
answer:["そら","は","あおい","です"]
},

{
type:"build-ja",
speak:"あめ は つめたい です",
question:"日本語の文を作ってください:",
text:"باران سرد است",
words:["あめ","は","つめたい","です"],
answer:["あめ","は","つめたい","です"]
},

/* BUILD FA */

{
type:"build-fa",
speak:"たいよう は おおきい です",
question:"ترجمه را بساز:",
text:"たいよう は おおきい です",
words:["است","بزرگ","خورشید"],
answer:["خورشید","بزرگ","است"]
},

{
type:"build-fa",
speak:"つき は ちいさい です",
question:"ترجمه را بساز:",
text:"つき は ちいさい です",
words:["است","کوچک","ماه"],
answer:["ماه","کوچک","است"]
},

{
type:"build-fa",
speak:"ほし は あかるい です",
question:"ترجمه را بساز:",
text:"ほし は あかるい です",
words:["است","درخشان","ستاره"],
answer:["ستاره","درخشان","است"]
},

{
type:"build-fa",
speak:"そら は あおい です",
question:"ترجمه را بساز:",
text:"そら は あおい です",
words:["است","آبی","آسمان"],
answer:["آسمان","آبی","است"]
},

{
type:"build-fa",
speak:"あめ は つめたい です",
question:"ترجمه را بساز:",
text:"あめ は つめたい です",
words:["است","سرد","باران"],
answer:["باران","سرد","است"]
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
