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
question:"どれが男性 ですか？",
speak:"だんせい",
options:[
{text:"女性",image:"../../media/people/woman.png"},
{text:"男性",image:"../../media/people/man.png"},
{text:"男の子",image:"../../media/people/boy.png"},
{text:"女の子",image:"../../media/people/girl.png"}
],
answer:"男性"
},

{
type:"image",
question:"どれが女性 ですか？",
speak:"じょせい",
options:[
{text:"女の子",image:"../../media/people/girl.png"},
{text:"女性",image:"../../media/people/woman.png"},
{text:"男の子",image:"../../media/people/boy.png"},
{text:"男性",image:"../../media/people/man.png"}
],
answer:"女性"
},

{
type:"image",
question:"どれが男の子 ですか？",
speak:"おとこのこ",
options:[
{text:"男性",image:"../../media/people/man.png"},
{text:"男の子",image:"../../media/people/boy.png"},
{text:"赤ちゃん",image:"../../media/people/baby.png"},
{text:"女の子",image:"../../media/people/girl.png"}
],
answer:"男の子"
},

{
type:"image",
question:"どれが女の子 ですか？",
speak:"おんなのこ",
options:[
{text:"男の子",image:"../../media/people/boy.png"},
{text:"男性",image:"../../media/people/man.png"},
{text:"女の子",image:"../../media/people/girl.png"},
{text:"赤ちゃん",image:"../../media/people/baby.png"}
],
answer:"女の子"
},

{
type:"image",
question:"どれが赤ちゃん ですか？",
speak:"あかちゃん",
options:[
{text:"女の子",image:"../../media/people/girl.png"},
{text:"男の子",image:"../../media/people/boy.png"},
{text:"男性",image:"../../media/people/man.png"},
{text:"赤ちゃん",image:"../../media/people/baby.png"}
],
answer:"赤ちゃん"
},

/* WORD */

{
type:"word",
question:"この画像は何ですか？",
image:"../../media/people/man.png",
options:["男の子","男性","女性","女の子"],
answer:"男性"
},

{
type:"word",
question:"この画像は何ですか？",
image:"../../media/people/woman.png",
options:["女性","女の子","赤ちゃん","男性"],
answer:"女性"
},

{
type:"word",
question:"この画像は何ですか？",
image:"../../media/people/boy.png",
options:["男の子","男性","赤ちゃん","女の子"],
answer:"男の子"
},

{
type:"word",
question:"この画像は何ですか？",
image:"../../media/people/girl.png",
options:["女の子","女性","男の子","赤ちゃん"],
answer:"女の子"
},

{
type:"word",
question:"この画像は何ですか？",
image:"../../media/people/baby.png",
options:["赤ちゃん","男の子","女の子","男性"],
answer:"赤ちゃん"
},

/* AUDIO */

{
type:"audio",
speak:"だんせい",
question:"どの言葉を聞きましたか？",
options:["男性","男の子","女性","女の子"],
answer:"男性"
},

{
type:"audio",
speak:"じょせい",
question:"どの言葉を聞きましたか？",
options:["女の子","女性","男の子","男性"],
answer:"女性"
},

{
type:"audio",
speak:"おとこのこ",
question:"どの言葉を聞きましたか？",
options:["男の子","男性","赤ちゃん","女の子"],
answer:"男の子"
},

{
type:"audio",
speak:"おんなのこ",
question:"どの言葉を聞きましたか？",
options:["男の子","女性","女の子","赤ちゃん"],
answer:"女の子"
},

{
type:"audio",
speak:"あかちゃん",
question:"どの言葉を聞きましたか？",
options:["赤ちゃん","男の子","男性","女の子"],
answer:"赤ちゃん"
},

/* BUILD JA */

{
type:"build-ja",
speak:"かれは だんせい です",
question:"日本語の文を作ってください:",
text:"او یک مرد است",
words:["だんせい","です","かれは"],
answer:["かれは","だんせい","です"]
},

{
type:"build-ja",
speak:"かのじょは じょせい です",
question:"日本語の文を作ってください:",
text:"او یک زن است",
words:["じょせい","です","かのじょは"],
answer:["かのじょは","じょせい","です"]
},

{
type:"build-ja",
speak:"かれは おとこのこ です",
question:"日本語の文を作ってください:",
text:"او یک پسر است",
words:["おとこのこ","です","かれは"],
answer:["かれは","おとこのこ","です"]
},

{
type:"build-ja",
speak:"かのじょは おんなのこ です",
question:"日本語の文を作ってください:",
text:"او یک دختر است",
words:["おんなのこ","です","かのじょは"],
answer:["かのじょは","おんなのこ","です"]
},

{
type:"build-ja",
speak:"あかちゃんは ちいさい です",
question:"日本語の文を作ってください:",
text:"نوزاد کوچک است",
words:["あかちゃんは","ちいさい","です"],
answer:["あかちゃんは","ちいさい","です"]
},

/* BUILD FA */

{
type:"build-fa",
speak:"かれは だんせい です",
question:"ترجمه را بساز:",
text:"かれは だんせい です",
words:["است","مرد","یک","او"],
answer:["او","یک","مرد","است"]
},

{
type:"build-fa",
speak:"かのじょは じょせい です",
question:"ترجمه را بساز:",
text:"かのじょは じょせい です",
words:["یک","است","زن","او"],
answer:["او","یک","زن","است"]
},

{
type:"build-fa",
speak:"かれは おとこのこ です",
question:"ترجمه را بساز:",
text:"かれは おとこのこ です",
words:["است","پسر","یک","او"],
answer:["او","یک","پسر","است"]
},

{
type:"build-fa",
speak:"かのじょは おんなのこ です",
question:"ترجمه را بساز:",
text:"かのじょは おんなのこ です",
words:["است","دختر","یک","او"],
answer:["او","یک","دختر","است"]
},

{
type:"build-fa",
speak:"あかちゃんは ちいさい です",
question:"ترجمه را بساز:",
text:"あかちゃんは ちいさい です",
words:["است","کوچک","نوزاد"],
answer:["نوزاد","کوچک","است"]
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
