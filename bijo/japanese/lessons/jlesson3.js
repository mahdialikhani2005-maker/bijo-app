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
question:"どれが家 ですか？",
speak:"いえ",
options:[
{text:"部屋",image:"../../media/house/room.png"},
{text:"家",image:"../../media/house/house.png"},
{text:"ドア",image:"../../media/house/door.png"},
{text:"窓",image:"../../media/house/window.png"}
],
answer:"家"
},

{
type:"image",
question:"どれが部屋 ですか？",
speak:"へや",
options:[
{text:"窓",image:"../../media/house/window.png"},
{text:"部屋",image:"../../media/house/room.png"},
{text:"キッチン",image:"../../media/house/kitchen.png"},
{text:"家",image:"../../media/house/house.png"}
],
answer:"部屋"
},

{
type:"image",
question:"どれがドア ですか？",
speak:"ドア",
options:[
{text:"家",image:"../../media/house/house.png"},
{text:"ドア",image:"../../media/house/door.png"},
{text:"窓",image:"../../media/house/window.png"},
{text:"部屋",image:"../../media/house/room.png"}
],
answer:"ドア"
},

{
type:"image",
question:"どれが窓 ですか？",
speak:"まど",
options:[
{text:"ドア",image:"../../media/house/door.png"},
{text:"家",image:"../../media/house/house.png"},
{text:"窓",image:"../../media/house/window.png"},
{text:"部屋",image:"../../media/house/room.png"}
],
answer:"窓"
},

{
type:"image",
question:"どれがキッチン ですか？",
speak:"キッチン",
options:[
{text:"部屋",image:"../../media/house/room.png"},
{text:"窓",image:"../../media/house/window.png"},
{text:"家",image:"../../media/house/house.png"},
{text:"キッチン",image:"../../media/house/kitchen.png"}
],
answer:"キッチン"
},

/* WORD */

{
type:"word",
question:"この画像は何ですか？",
image:"../../media/house/house.png",
options:["部屋","家","ドア","窓"],
answer:"家"
},

{
type:"word",
question:"この画像は何ですか？",
image:"../../media/house/room.png",
options:["窓","部屋","キッチン","家"],
answer:"部屋"
},

{
type:"word",
question:"この画像は何ですか？",
image:"../../media/house/door.png",
options:["家","ドア","窓","部屋"],
answer:"ドア"
},

{
type:"word",
question:"この画像は何ですか？",
image:"../../media/house/window.png",
options:["ドア","家","窓","部屋"],
answer:"窓"
},

{
type:"word",
question:"この画像は何ですか？",
image:"../../media/house/kitchen.png",
options:["部屋","窓","家","キッチン"],
answer:"キッチン"
},

/* AUDIO */

{
type:"audio",
speak:"いえ",
question:"どの言葉を聞きましたか？",
options:["部屋","家","ドア","窓"],
answer:"家"
},

{
type:"audio",
speak:"へや",
question:"どの言葉を聞きましたか？",
options:["窓","部屋","キッチン","家"],
answer:"部屋"
},

{
type:"audio",
speak:"ドア",
question:"どの言葉を聞きましたか？",
options:["家","ドア","窓","部屋"],
answer:"ドア"
},

{
type:"audio",
speak:"まど",
question:"どの言葉を聞きましたか？",
options:["ドア","家","窓","部屋"],
answer:"窓"
},

{
type:"audio",
speak:"キッチン",
question:"どの言葉を聞きましたか？",
options:["部屋","窓","家","キッチン"],
answer:"キッチン"
},

/* BUILD JA */

{
type:"build-ja",
speak:"これは いえ です",
question:"日本語の文を作ってください:",
text:"این یک خانه است",
words:["いえ","です","これは"],
answer:["これは","いえ","です"]
},

{
type:"build-ja",
speak:"これは へや です",
question:"日本語の文を作ってください:",
text:"این یک اتاق است",
words:["へや","です","これは"],
answer:["これは","へや","です"]
},

{
type:"build-ja",
speak:"これは ドア です",
question:"日本語の文を作ってください:",
text:"این یک در است",
words:["ドア","です","これは"],
answer:["これは","ドア","です"]
},

{
type:"build-ja",
speak:"これは まど です",
question:"日本語の文を作ってください:",
text:"این یک پنجره است",
words:["まど","です","これは"],
answer:["これは","まど","です"]
},

{
type:"build-ja",
speak:"これは キッチン です",
question:"日本語の文を作ってください:",
text:"این یک آشپزخانه است",
words:["キッチン","です","これは"],
answer:["これは","キッチン","です"]
},

/* BUILD FA */

{
type:"build-fa",
speak:"これは いえ です",
question:"ترجمه را بساز:",
text:"これは いえ です",
words:["است","خانه","یک","این"],
answer:["این","یک","خانه","است"]
},

{
type:"build-fa",
speak:"これは へや です",
question:"ترجمه را بساز:",
text:"これは へや です",
words:["است","اتاق","یک","این"],
answer:["این","یک","اتاق","است"]
},

{
type:"build-fa",
speak:"これは ドア です",
question:"ترجمه را بساز:",
text:"これは ドア です",
words:["است","در","یک","این"],
answer:["این","یک","در","است"]
},

{
type:"build-fa",
speak:"これは まど です",
question:"ترجمه را بساز:",
text:"これは まど です",
words:["است","پنجره","یک","این"],
answer:["این","یک","پنجره","است"]
},

{
type:"build-fa",
speak:"これは キッチン です",
question:"ترجمه را بساز:",
text:"これは キッチン です",
words:["است","آشپزخانه","یک","این"],
answer:["این","یک","آشپزخانه","است"]
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
