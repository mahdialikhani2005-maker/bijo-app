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
question:"どれがパン ですか？",
speak:"パン",
options:[
{text:"ごはん",image:"../../media/food/rice.png"},
{text:"パン",image:"../../media/food/bread.png"},
{text:"にく",image:"../../media/food/meat.png"},
{text:"たまご",image:"../../media/food/egg.png"}
],
answer:"パン"
},

{
type:"image",
question:"どれがごはん ですか？",
speak:"ごはん",
options:[
{text:"たまご",image:"../../media/food/egg.png"},
{text:"ごはん",image:"../../media/food/rice.png"},
{text:"ぎゅうにゅう",image:"../../media/food/milk.png"},
{text:"パン",image:"../../media/food/bread.png"}
],
answer:"ごはん"
},

{
type:"image",
question:"どれがにく ですか？",
speak:"にく",
options:[
{text:"パン",image:"../../media/food/bread.png"},
{text:"にく",image:"../../media/food/meat.png"},
{text:"ぎゅうにゅう",image:"../../media/food/milk.png"},
{text:"ごはん",image:"../../media/food/rice.png"}
],
answer:"にく"
},

{
type:"image",
question:"どれがたまご ですか？",
speak:"たまご",
options:[
{text:"にく",image:"../../media/food/meat.png"},
{text:"ごはん",image:"../../media/food/rice.png"},
{text:"たまご",image:"../../media/food/egg.png"},
{text:"パン",image:"../../media/food/bread.png"}
],
answer:"たまご"
},

{
type:"image",
question:"どれがぎゅうにゅう ですか？",
speak:"ぎゅうにゅう",
options:[
{text:"たまご",image:"../../media/food/egg.png"},
{text:"パン",image:"../../media/food/bread.png"},
{text:"ごはん",image:"../../media/food/rice.png"},
{text:"ぎゅうにゅう",image:"../../media/food/milk.png"}
],
answer:"ぎゅうにゅう"
},

/* WORD */

{
type:"word",
question:"この画像は何ですか？",
image:"../../media/food/bread.png",
options:["ごはん","パン","にく","たまご"],
answer:"パン"
},

{
type:"word",
question:"この画像は何ですか？",
image:"../../media/food/rice.png",
options:["たまご","ごはん","ぎゅうにゅう","パン"],
answer:"ごはん"
},

{
type:"word",
question:"この画像は何ですか？",
image:"../../media/food/meat.png",
options:["パン","にく","ぎゅうにゅう","ごはん"],
answer:"にく"
},

{
type:"word",
question:"この画像は何ですか？",
image:"../../media/food/egg.png",
options:["にく","ごはん","たまご","パン"],
answer:"たまご"
},

{
type:"word",
question:"この画像は何ですか？",
image:"../../media/food/milk.png",
options:["たまご","パン","ごはん","ぎゅうにゅう"],
answer:"ぎゅうにゅう"
},

/* AUDIO */

{
type:"audio",
speak:"パン",
question:"どの言葉を聞きましたか？",
options:["ごはん","パン","にく","たまご"],
answer:"パン"
},

{
type:"audio",
speak:"ごはん",
question:"どの言葉を聞きましたか？",
options:["たまご","ごはん","ぎゅうにゅう","パン"],
answer:"ごはん"
},

{
type:"audio",
speak:"にく",
question:"どの言葉を聞きましたか？",
options:["パン","にく","ぎゅうにゅう","ごはん"],
answer:"にく"
},

{
type:"audio",
speak:"たまご",
question:"どの言葉を聞きましたか？",
options:["にく","ごはん","たまご","パン"],
answer:"たまご"
},

{
type:"audio",
speak:"ぎゅうにゅう",
question:"どの言葉を聞きましたか？",
options:["たまご","パン","ごはん","ぎゅうにゅう"],
answer:"ぎゅうにゅう"
},

/* BUILD JA */

{
type:"build-ja",
speak:"わたしは パン を たべます",
question:"日本語の文を作ってください:",
text:"من نان می‌خورم",
words:["パン","を","たべます","わたしは"],
answer:["わたしは","パン","を","たべます"]
},

{
type:"build-ja",
speak:"わたしは ごはん を たべます",
question:"日本語の文を作ってください:",
text:"من برنج می‌خورم",
words:["ごはん","を","たべます","わたしは"],
answer:["わたしは","ごはん","を","たべます"]
},

{
type:"build-ja",
speak:"わたしは にく を たべます",
question:"日本語の文を作ってください:",
text:"من گوشت می‌خورم",
words:["にく","を","たべます","わたしは"],
answer:["わたしは","にく","を","たべます"]
},

{
type:"build-ja",
speak:"わたしは たまご を たべます",
question:"日本語の文を作ってください:",
text:"من تخم‌مرغ می‌خورم",
words:["たまご","を","たべます","わたしは"],
answer:["わたしは","たまご","を","たべます"]
},

{
type:"build-ja",
speak:"わたしは ぎゅうにゅう を のみます",
question:"日本語の文を作ってください:",
text:"من شیر می‌نوشم",
words:["ぎゅうにゅう","を","のみます","わたしは"],
answer:["わたしは","ぎゅうにゅう","を","のみます"]
},

/* BUILD FA */

{
type:"build-fa",
speak:"わたしは パン を たべます",
question:"ترجمه را بساز:",
text:"わたしは パン を たべます",
words:["می‌خورم","نان","من"],
answer:["من","نان","می‌خورم"]
},

{
type:"build-fa",
speak:"わたしは ごはん を たべます",
question:"ترجمه را بساز:",
text:"わたしは ごはん を たべます",
words:["می‌خورم","برنج","من"],
answer:["من","برنج","می‌خورم"]
},

{
type:"build-fa",
speak:"わたしは にく を たべます",
question:"ترجمه را بساز:",
text:"わたしは にく を たべます",
words:["می‌خورم","گوشت","من"],
answer:["من","گوشت","می‌خورم"]
},

{
type:"build-fa",
speak:"わたしは たまご を たべます",
question:"ترجمه را بساز:",
text:"わたしは たまご を たべます",
words:["می‌خورم","تخم‌مرغ","یک","من"],
answer:["من","یک","تخم‌مرغ","می‌خورم"]
},

{
type:"build-fa",
speak:"わたしは ぎゅうにゅう を のみます",
question:"ترجمه را بساز:",
text:"わたしは ぎゅうにゅう を のみます",
words:["می‌نوشم","شیر","من"],
answer:["من","شیر","می‌نوشم"]
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
