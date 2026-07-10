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
question:"どれがトマト ですか？",
speak:"トマト",
options:[
{text:"じゃがいも",image:"../../media/vegetables/potato.png"},
{text:"トマト",image:"../../media/vegetables/tomato.png"},
{text:"にんじん",image:"../../media/vegetables/carrot.png"},
{text:"たまねぎ",image:"../../media/vegetables/onion.png"}
],
answer:"トマト"
},

{
type:"image",
question:"どれがじゃがいも ですか？",
speak:"じゃがいも",
options:[
{text:"たまねぎ",image:"../../media/vegetables/onion.png"},
{text:"じゃがいも",image:"../../media/vegetables/potato.png"},
{text:"きゅうり",image:"../../media/vegetables/cucumber.png"},
{text:"トマト",image:"../../media/vegetables/tomato.png"}
],
answer:"じゃがいも"
},

{
type:"image",
question:"どれがにんじん ですか？",
speak:"にんじん",
options:[
{text:"トマト",image:"../../media/vegetables/tomato.png"},
{text:"にんじん",image:"../../media/vegetables/carrot.png"},
{text:"きゅうり",image:"../../media/vegetables/cucumber.png"},
{text:"じゃがいも",image:"../../media/vegetables/potato.png"}
],
answer:"にんじん"
},

{
type:"image",
question:"どれがたまねぎ ですか？",
speak:"たまねぎ",
options:[
{text:"にんじん",image:"../../media/vegetables/carrot.png"},
{text:"じゃがいも",image:"../../media/vegetables/potato.png"},
{text:"たまねぎ",image:"../../media/vegetables/onion.png"},
{text:"トマト",image:"../../media/vegetables/tomato.png"}
],
answer:"たまねぎ"
},

{
type:"image",
question:"どれがきゅうり ですか？",
speak:"きゅうり",
options:[
{text:"たまねぎ",image:"../../media/vegetables/onion.png"},
{text:"トマト",image:"../../media/vegetables/tomato.png"},
{text:"じゃがいも",image:"../../media/vegetables/potato.png"},
{text:"きゅうり",image:"../../media/vegetables/cucumber.png"}
],
answer:"きゅうり"
},

/* WORD */

{
type:"word",
question:"この画像は何ですか？",
image:"../../media/vegetables/tomato.png",
options:["じゃがいも","トマト","にんじん","たまねぎ"],
answer:"トマト"
},

{
type:"word",
question:"この画像は何ですか？",
image:"../../media/vegetables/potato.png",
options:["たまねぎ","じゃがいも","きゅうり","トマト"],
answer:"じゃがいも"
},

{
type:"word",
question:"この画像は何ですか？",
image:"../../media/vegetables/carrot.png",
options:["トマト","にんじん","きゅうり","じゃがいも"],
answer:"にんじん"
},

{
type:"word",
question:"この画像は何ですか？",
image:"../../media/vegetables/onion.png",
options:["にんじん","じゃがいも","たまねぎ","トマト"],
answer:"たまねぎ"
},

{
type:"word",
question:"この画像は何ですか？",
image:"../../media/vegetables/cucumber.png",
options:["たまねぎ","トマト","じゃがいも","きゅうり"],
answer:"きゅうり"
},

/* AUDIO */

{
type:"audio",
speak:"トマト",
question:"どの言葉を聞きましたか？",
options:["じゃがいも","トマト","にんじん","たまねぎ"],
answer:"トマト"
},

{
type:"audio",
speak:"じゃがいも",
question:"どの言葉を聞きましたか？",
options:["たまねぎ","じゃがいも","きゅうり","トマト"],
answer:"じゃがいも"
},

{
type:"audio",
speak:"にんじん",
question:"どの言葉を聞きましたか？",
options:["トマト","にんじん","きゅうり","じゃがいも"],
answer:"にんじん"
},

{
type:"audio",
speak:"たまねぎ",
question:"どの言葉を聞きましたか？",
options:["にんじん","じゃがいも","たまねぎ","トマト"],
answer:"たまねぎ"
},

{
type:"audio",
speak:"きゅうり",
question:"どの言葉を聞きましたか？",
options:["たまねぎ","トマト","じゃがいも","きゅうり"],
answer:"きゅうり"
},

/* BUILD JA */

{
type:"build-ja",
speak:"これは トマト です",
question:"日本語の文を作ってください:",
text:"این یک گوجه است",
words:["トマト","です","これは"],
answer:["これは","トマト","です"]
},

{
type:"build-ja",
speak:"これは じゃがいも です",
question:"日本語の文を作ってください:",
text:"این یک سیب‌زمینی است",
words:["じゃがいも","です","これは"],
answer:["これは","じゃがいも","です"]
},

{
type:"build-ja",
speak:"これは にんじん です",
question:"日本語の文を作ってください:",
text:"این یک هویج است",
words:["にんじん","です","これは"],
answer:["これは","にんじん","です"]
},

{
type:"build-ja",
speak:"これは たまねぎ です",
question:"日本語の文を作ってください:",
text:"این یک پیاز است",
words:["たまねぎ","です","これは"],
answer:["これは","たまねぎ","です"]
},

{
type:"build-ja",
speak:"これは きゅうり です",
question:"日本語の文を作ってください:",
text:"این یک خیار است",
words:["きゅうり","です","これは"],
answer:["これは","きゅうり","です"]
},

/* BUILD FA */

{
type:"build-fa",
speak:"これは トマト です",
question:"ترجمه را بساز:",
text:"これは トマト です",
words:["است","گوجه","یک","این"],
answer:["این","یک","گوجه","است"]
},

{
type:"build-fa",
speak:"これは じゃがいも です",
question:"ترجمه را بساز:",
text:"これは じゃがいも です",
words:["است","سیب‌زمینی","یک","این"],
answer:["این","یک","سیب‌زمینی","است"]
},

{
type:"build-fa",
speak:"これは にんじん です",
question:"ترجمه را بساز:",
text:"これは にんじん です",
words:["است","هویج","یک","این"],
answer:["این","یک","هویج","است"]
},

{
type:"build-fa",
speak:"これは たまねぎ です",
question:"ترجمه را بساز:",
text:"これは たまねぎ です",
words:["است","پیاز","یک","این"],
answer:["این","یک","پیاز","است"]
},

{
type:"build-fa",
speak:"これは きゅうり です",
question:"ترجمه را بساز:",
text:"これは きゅうり です",
words:["است","خیار","یک","این"],
answer:["این","یک","خیار","است"]
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
