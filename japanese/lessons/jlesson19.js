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
question:"どれが大きい ですか？",
speak:"おおきい",
options:[
{text:"小さい",image:"../../media/adjectives/small.png"},
{text:"大きい",image:"../../media/adjectives/big.png"},
{text:"高い",image:"../../media/adjectives/tall.png"},
{text:"低い",image:"../../media/adjectives/short.png"}
],
answer:"大きい"
},

{
type:"image",
question:"どれが小さい ですか？",
speak:"ちいさい",
options:[
{text:"きれい",image:"../../media/adjectives/beautiful.png"},
{text:"小さい",image:"../../media/adjectives/small.png"},
{text:"大きい",image:"../../media/adjectives/big.png"},
{text:"高い",image:"../../media/adjectives/tall.png"}
],
answer:"小さい"
},

{
type:"image",
question:"どれが高い ですか？",
speak:"たかい",
options:[
{text:"大きい",image:"../../media/adjectives/big.png"},
{text:"高い",image:"../../media/adjectives/tall.png"},
{text:"きれい",image:"../../media/adjectives/beautiful.png"},
{text:"小さい",image:"../../media/adjectives/small.png"}
],
answer:"高い"
},

{
type:"image",
question:"どれが低い ですか？",
speak:"ひくい",
options:[
{text:"高い",image:"../../media/adjectives/tall.png"},
{text:"小さい",image:"../../media/adjectives/small.png"},
{text:"低い",image:"../../media/adjectives/short.png"},
{text:"大きい",image:"../../media/adjectives/big.png"}
],
answer:"低い"
},

{
type:"image",
question:"どれがきれい ですか？",
speak:"きれい",
options:[
{text:"低い",image:"../../media/adjectives/short.png"},
{text:"大きい",image:"../../media/adjectives/big.png"},
{text:"小さい",image:"../../media/adjectives/small.png"},
{text:"きれい",image:"../../media/adjectives/beautiful.png"}
],
answer:"きれい"
},

/* WORD */

{
type:"word",
question:"この画像は何ですか？",
image:"../../media/adjectives/big.png",
options:["小さい","大きい","高い","低い"],
answer:"大きい"
},

{
type:"word",
question:"この画像は何ですか？",
image:"../../media/adjectives/small.png",
options:["きれい","小さい","大きい","高い"],
answer:"小さい"
},

{
type:"word",
question:"この画像は何ですか？",
image:"../../media/adjectives/tall.png",
options:["大きい","高い","きれい","小さい"],
answer:"高い"
},

{
type:"word",
question:"この画像は何ですか？",
image:"../../media/adjectives/short.png",
options:["高い","小さい","低い","大きい"],
answer:"低い"
},

{
type:"word",
question:"この画像は何ですか？",
image:"../../media/adjectives/beautiful.png",
options:["低い","大きい","小さい","きれい"],
answer:"きれい"
},

/* AUDIO */

{
type:"audio",
speak:"おおきい",
question:"どの言葉を聞きましたか？",
options:["小さい","大きい","高い","低い"],
answer:"大きい"
},

{
type:"audio",
speak:"ちいさい",
question:"どの言葉を聞きましたか？",
options:["きれい","小さい","大きい","高い"],
answer:"小さい"
},

{
type:"audio",
speak:"たかい",
question:"どの言葉を聞きましたか？",
options:["大きい","高い","きれい","小さい"],
answer:"高い"
},

{
type:"audio",
speak:"ひくい",
question:"どの言葉を聞きましたか？",
options:["高い","小さい","低い","大きい"],
answer:"低い"
},

{
type:"audio",
speak:"きれい",
question:"どの言葉を聞きましたか？",
options:["低い","大きい","小さい","きれい"],
answer:"きれい"
},

/* BUILD JA */

{
type:"build-ja",
speak:"いぬ は おおきい です",
question:"日本語の文を作ってください:",
text:"سگ بزرگ است",
words:["いぬ","は","おおきい","です"],
answer:["いぬ","は","おおきい","です"]
},

{
type:"build-ja",
speak:"ねこ は ちいさい です",
question:"日本語の文を作ってください:",
text:"گربه کوچک است",
words:["ねこ","は","ちいさい","です"],
answer:["ねこ","は","ちいさい","です"]
},

{
type:"build-ja",
speak:"かれ は たかい です",
question:"日本語の文を作ってください:",
text:"او بلند است",
words:["かれ","は","たかい","です"],
answer:["かれ","は","たかい","です"]
},

{
type:"build-ja",
speak:"かのじょ は ひくい です",
question:"日本語の文を作ってください:",
text:"او کوتاه است",
words:["かのじょ","は","ひくい","です"],
answer:["かのじょ","は","ひくい","です"]
},

{
type:"build-ja",
speak:"かのじょ は きれい です",
question:"日本語の文を作ってください:",
text:"او زیبا است",
words:["かのじょ","は","きれい","です"],
answer:["かのじょ","は","きれい","です"]
},

/* BUILD FA */

{
type:"build-fa",
speak:"いぬ は おおきい です",
question:"ترجمه را بساز:",
text:"いぬ は おおきい です",
words:["است","بزرگ","سگ"],
answer:["سگ","بزرگ","است"]
},

{
type:"build-fa",
speak:"ねこ は ちいさい です",
question:"ترجمه را بساز:",
text:"ねこ は ちいさい です",
words:["است","کوچک","گربه"],
answer:["گربه","کوچک","است"]
},

{
type:"build-fa",
speak:"かれ は たかい です",
question:"ترجمه را بساز:",
text:"かれ は たかい です",
words:["است","بلند","او"],
answer:["او","بلند","است"]
},

{
type:"build-fa",
speak:"かのじょ は ひくい です",
question:"ترجمه را بساز:",
text:"かのじょ は ひくい です",
words:["است","کوتاه","او"],
answer:["او","کوتاه","است"]
},

{
type:"build-fa",
speak:"かのじょ は きれい です",
question:"ترجمه را بساز:",
text:"かのじょ は きれい です",
words:["است","زیبا","او"],
answer:["او","زیبا","است"]
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
