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
question:"どれが嬉しい ですか？",
speak:"うれしい",
options:[
{text:"悲しい",image:"../../media/feelings/sad.png"},
{text:"嬉しい",image:"../../media/feelings/happy.png"},
{text:"怒っている",image:"../../media/feelings/angry.png"},
{text:"疲れた",image:"../../media/feelings/tired.png"}
],
answer:"嬉しい"
},

{
type:"image",
question:"どれが悲しい ですか？",
speak:"かなしい",
options:[
{text:"疲れた",image:"../../media/feelings/tired.png"},
{text:"悲しい",image:"../../media/feelings/sad.png"},
{text:"お腹すいた",image:"../../media/feelings/hungry.png"},
{text:"嬉しい",image:"../../media/feelings/happy.png"}
],
answer:"悲しい"
},

{
type:"image",
question:"どれが怒っている ですか？",
speak:"おこっている",
options:[
{text:"嬉しい",image:"../../media/feelings/happy.png"},
{text:"怒っている",image:"../../media/feelings/angry.png"},
{text:"お腹すいた",image:"../../media/feelings/hungry.png"},
{text:"悲しい",image:"../../media/feelings/sad.png"}
],
answer:"怒っている"
},

{
type:"image",
question:"どれが疲れた ですか？",
speak:"つかれた",
options:[
{text:"怒っている",image:"../../media/feelings/angry.png"},
{text:"悲しい",image:"../../media/feelings/sad.png"},
{text:"疲れた",image:"../../media/feelings/tired.png"},
{text:"嬉しい",image:"../../media/feelings/happy.png"}
],
answer:"疲れた"
},

{
type:"image",
question:"どれがお腹すいた ですか？",
speak:"おなかすいた",
options:[
{text:"疲れた",image:"../../media/feelings/tired.png"},
{text:"嬉しい",image:"../../media/feelings/happy.png"},
{text:"悲しい",image:"../../media/feelings/sad.png"},
{text:"お腹すいた",image:"../../media/feelings/hungry.png"}
],
answer:"お腹すいた"
},

/* WORD */

{
type:"word",
question:"この画像は何ですか？",
image:"../../media/feelings/happy.png",
options:["悲しい","嬉しい","怒っている","疲れた"],
answer:"嬉しい"
},

{
type:"word",
question:"この画像は何ですか？",
image:"../../media/feelings/sad.png",
options:["疲れた","悲しい","お腹すいた","嬉しい"],
answer:"悲しい"
},

{
type:"word",
question:"この画像は何ですか？",
image:"../../media/feelings/angry.png",
options:["嬉しい","怒っている","お腹すいた","悲しい"],
answer:"怒っている"
},

{
type:"word",
question:"この画像は何ですか？",
image:"../../media/feelings/tired.png",
options:["怒っている","悲しい","疲れた","嬉しい"],
answer:"疲れた"
},

{
type:"word",
question:"この画像は何ですか？",
image:"../../media/feelings/hungry.png",
options:["疲れた","嬉しい","悲しい","お腹すいた"],
answer:"お腹すいた"
},

/* AUDIO */

{
type:"audio",
speak:"うれしい",
question:"どの言葉を聞きましたか？",
options:["悲しい","嬉しい","怒っている","疲れた"],
answer:"嬉しい"
},

{
type:"audio",
speak:"かなしい",
question:"どの言葉を聞きましたか？",
options:["疲れた","悲しい","お腹すいた","嬉しい"],
answer:"悲しい"
},

{
type:"audio",
speak:"おこっている",
question:"どの言葉を聞きましたか？",
options:["嬉しい","怒っている","お腹すいた","悲しい"],
answer:"怒っている"
},

{
type:"audio",
speak:"つかれた",
question:"どの言葉を聞きましたか？",
options:["怒っている","悲しい","疲れた","嬉しい"],
answer:"疲れた"
},

{
type:"audio",
speak:"おなかすいた",
question:"どの言葉を聞きましたか？",
options:["疲れた","嬉しい","悲しい","お腹すいた"],
answer:"お腹すいた"
},

/* BUILD JA */

{
type:"build-ja",
speak:"わたしは うれしい です",
question:"日本語の文を作ってください:",
text:"من خوشحال هستم",
words:["うれしい","です","わたしは"],
answer:["わたしは","うれしい","です"]
},

{
type:"build-ja",
speak:"わたしは かなしい です",
question:"日本語の文を作ってください:",
text:"من ناراحت هستم",
words:["かなしい","です","わたしは"],
answer:["わたしは","かなしい","です"]
},

{
type:"build-ja",
speak:"わたしは おこっています",
question:"日本語の文を作ってください:",
text:"من عصبانی هستم",
words:["おこっています","わたしは"],
answer:["わたしは","おこっています"]
},

{
type:"build-ja",
speak:"わたしは つかれています",
question:"日本語の文を作ってください:",
text:"من خسته هستم",
words:["つかれています","わたしは"],
answer:["わたしは","つかれています"]
},

{
type:"build-ja",
speak:"わたしは おなかが すきました",
question:"日本語の文を作ってください:",
text:"من گرسنه هستم",
words:["おなかが","すきました","わたしは"],
answer:["わたしは","おなかが","すきました"]
},

/* BUILD FA */

{
type:"build-fa",
speak:"わたしは うれしい です",
question:"ترجمه را بساز:",
text:"わたしは うれしい です",
words:["هستم","خوشحال","من"],
answer:["من","خوشحال","هستم"]
},

{
type:"build-fa",
speak:"わたしは かなしい です",
question:"ترجمه را بساز:",
text:"わたしは かなしい です",
words:["هستم","ناراحت","من"],
answer:["من","ناراحت","هستم"]
},

{
type:"build-fa",
speak:"わたしは おこっています",
question:"ترجمه را بساز:",
text:"わたしは おこっています",
words:["هستم","عصبانی","من"],
answer:["من","عصبانی","هستم"]
},

{
type:"build-fa",
speak:"わたしは つかれています",
question:"ترجمه را بساز:",
text:"わたしは つかれています",
words:["هستم","خسته","من"],
answer:["من","خسته","هستم"]
},

{
type:"build-fa",
speak:"わたしは おなかが すきました",
question:"ترجمه را بساز:",
text:"わたしは おなかが すきました",
words:["هستم","گرسنه","من"],
answer:["من","گرسنه","هستم"]
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
