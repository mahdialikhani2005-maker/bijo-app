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
question:"どれが食べる ですか？",
speak:"たべる",
options:[
{text:"寝る",image:"../../media/actions/sleep.png"},
{text:"食べる",image:"../../media/actions/eat.png"},
{text:"歩く",image:"../../media/actions/walk.png"},
{text:"読む",image:"../../media/actions/read.png"}
],
answer:"食べる"
},

{
type:"image",
question:"どれが寝る ですか？",
speak:"ねる",
options:[
{text:"書く",image:"../../media/actions/write.png"},
{text:"寝る",image:"../../media/actions/sleep.png"},
{text:"食べる",image:"../../media/actions/eat.png"},
{text:"歩く",image:"../../media/actions/walk.png"}
],
answer:"寝る"
},

{
type:"image",
question:"どれが歩く ですか？",
speak:"あるく",
options:[
{text:"食べる",image:"../../media/actions/eat.png"},
{text:"歩く",image:"../../media/actions/walk.png"},
{text:"書く",image:"../../media/actions/write.png"},
{text:"寝る",image:"../../media/actions/sleep.png"}
],
answer:"歩く"
},

{
type:"image",
question:"どれが読む ですか？",
speak:"よむ",
options:[
{text:"歩く",image:"../../media/actions/walk.png"},
{text:"寝る",image:"../../media/actions/sleep.png"},
{text:"読む",image:"../../media/actions/read.png"},
{text:"食べる",image:"../../media/actions/eat.png"}
],
answer:"読む"
},

{
type:"image",
question:"どれが書く ですか？",
speak:"かく",
options:[
{text:"読む",image:"../../media/actions/read.png"},
{text:"食べる",image:"../../media/actions/eat.png"},
{text:"寝る",image:"../../media/actions/sleep.png"},
{text:"書く",image:"../../media/actions/write.png"}
],
answer:"書く"
},

/* WORD */

{
type:"word",
question:"この画像は何ですか？",
image:"../../media/actions/eat.png",
options:["寝る","食べる","歩く","読む"],
answer:"食べる"
},

{
type:"word",
question:"この画像は何ですか？",
image:"../../media/actions/sleep.png",
options:["書く","寝る","食べる","歩く"],
answer:"寝る"
},

{
type:"word",
question:"この画像は何ですか？",
image:"../../media/actions/walk.png",
options:["食べる","歩く","書く","寝る"],
answer:"歩く"
},

{
type:"word",
question:"この画像は何ですか？",
image:"../../media/actions/read.png",
options:["歩く","寝る","読む","食べる"],
answer:"読む"
},

{
type:"word",
question:"この画像は何ですか？",
image:"../../media/actions/write.png",
options:["読む","食べる","寝る","書く"],
answer:"書く"
},

/* AUDIO */

{
type:"audio",
speak:"たべる",
question:"どの言葉を聞きましたか？",
options:["寝る","食べる","歩く","読む"],
answer:"食べる"
},

{
type:"audio",
speak:"ねる",
question:"どの言葉を聞きましたか？",
options:["書く","寝る","食べる","歩く"],
answer:"寝る"
},

{
type:"audio",
speak:"あるく",
question:"どの言葉を聞きましたか？",
options:["食べる","歩く","書く","寝る"],
answer:"歩く"
},

{
type:"audio",
speak:"よむ",
question:"どの言葉を聞きましたか？",
options:["歩く","寝る","読む","食べる"],
answer:"読む"
},

{
type:"audio",
speak:"かく",
question:"どの言葉を聞きましたか？",
options:["読む","食べる","寝る","書く"],
answer:"書く"
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
speak:"わたしは よる ねます",
question:"日本語の文を作ってください:",
text:"من شب می‌خوابم",
words:["よる","ねます","わたしは"],
answer:["わたしは","よる","ねます"]
},

{
type:"build-ja",
speak:"わたしは がっこう に あるきます",
question:"日本語の文を作ってください:",
text:"من به مدرسه راه می‌روم",
words:["がっこう","に","あるきます","わたしは"],
answer:["わたしは","がっこう","に","あるきます"]
},

{
type:"build-ja",
speak:"わたしは ほん を よみます",
question:"日本語の文を作ってください:",
text:"من یک کتاب می‌خوانم",
words:["ほん","を","よみます","わたしは"],
answer:["わたしは","ほん","を","よみます"]
},

{
type:"build-ja",
speak:"わたしは てがみ を かきます",
question:"日本語の文を作ってください:",
text:"من یک نامه می‌نویسم",
words:["てがみ","を","かきます","わたしは"],
answer:["わたしは","てがみ","を","かきます"]
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
speak:"わたしは よる ねます",
question:"ترجمه را بساز:",
text:"わたしは よる ねます",
words:["می‌خوابم","شب","در","من"],
answer:["من","شب","می‌خوابم"]
},

{
type:"build-fa",
speak:"わたしは がっこう に あるきます",
question:"ترجمه را بساز:",
text:"わたしは がっこう に あるきます",
words:["می‌روم","مدرسه","به","من"],
answer:["من","به","مدرسه","می‌روم"]
},

{
type:"build-fa",
speak:"わたしは ほん を よみます",
question:"ترجمه را بساز:",
text:"わたしは ほん を よみます",
words:["می‌خوانم","کتاب","یک","من"],
answer:["من","یک","کتاب","می‌خوانم"]
},

{
type:"build-fa",
speak:"わたしは てがみ を かきます",
question:"ترجمه را بساز:",
text:"わたしは てがみ を かきます",
words:["می‌نویسم","نامه","یک","من"],
answer:["من","یک","نامه","می‌نویسم"]
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
