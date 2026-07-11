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
question:"どれが暑い ですか？",
speak:"あつい",
options:[
{text:"寒い",image:"../../media/weather/cold.png"},
{text:"暑い",image:"../../media/weather/hot.png"},
{text:"晴れ",image:"../../media/weather/sunny.png"},
{text:"曇り",image:"../../media/weather/cloudy.png"}
],
answer:"暑い"
},

{
type:"image",
question:"どれが寒い ですか？",
speak:"さむい",
options:[
{text:"晴れ",image:"../../media/weather/sunny.png"},
{text:"寒い",image:"../../media/weather/cold.png"},
{text:"風",image:"../../media/weather/wind.png"},
{text:"暑い",image:"../../media/weather/hot.png"}
],
answer:"寒い"
},

{
type:"image",
question:"どれが晴れ ですか？",
speak:"はれ",
options:[
{text:"暑い",image:"../../media/weather/hot.png"},
{text:"晴れ",image:"../../media/weather/sunny.png"},
{text:"風",image:"../../media/weather/wind.png"},
{text:"寒い",image:"../../media/weather/cold.png"}
],
answer:"晴れ"
},

{
type:"image",
question:"どれが曇り ですか？",
speak:"くもり",
options:[
{text:"晴れ",image:"../../media/weather/sunny.png"},
{text:"寒い",image:"../../media/weather/cold.png"},
{text:"曇り",image:"../../media/weather/cloudy.png"},
{text:"暑い",image:"../../media/weather/hot.png"}
],
answer:"曇り"
},

{
type:"image",
question:"どれが風 ですか？",
speak:"かぜ",
options:[
{text:"曇り",image:"../../media/weather/cloudy.png"},
{text:"暑い",image:"../../media/weather/hot.png"},
{text:"寒い",image:"../../media/weather/cold.png"},
{text:"風",image:"../../media/weather/wind.png"}
],
answer:"風"
},

/* WORD */

{
type:"word",
question:"この画像は何ですか？",
image:"../../media/weather/hot.png",
options:["寒い","暑い","晴れ","曇り"],
answer:"暑い"
},

{
type:"word",
question:"この画像は何ですか？",
image:"../../media/weather/cold.png",
options:["晴れ","寒い","風","暑い"],
answer:"寒い"
},

{
type:"word",
question:"この画像は何ですか？",
image:"../../media/weather/sunny.png",
options:["暑い","晴れ","風","寒い"],
answer:"晴れ"
},

{
type:"word",
question:"この画像は何ですか？",
image:"../../media/weather/cloudy.png",
options:["晴れ","寒い","曇り","暑い"],
answer:"曇り"
},

{
type:"word",
question:"この画像は何ですか？",
image:"../../media/weather/wind.png",
options:["曇り","暑い","寒い","風"],
answer:"風"
},

/* AUDIO */

{
type:"audio",
speak:"あつい",
question:"どの言葉を聞きましたか？",
options:["寒い","暑い","晴れ","曇り"],
answer:"暑い"
},

{
type:"audio",
speak:"さむい",
question:"どの言葉を聞きましたか？",
options:["晴れ","寒い","風","暑い"],
answer:"寒い"
},

{
type:"audio",
speak:"はれ",
question:"どの言葉を聞きましたか？",
options:["暑い","晴れ","風","寒い"],
answer:"晴れ"
},

{
type:"audio",
speak:"くもり",
question:"どの言葉を聞きましたか？",
options:["晴れ","寒い","曇り","暑い"],
answer:"曇り"
},

{
type:"audio",
speak:"かぜ",
question:"どの言葉を聞きましたか？",
options:["曇り","暑い","寒い","風"],
answer:"風"
},

/* BUILD JA */

{
type:"build-ja",
speak:"あつい です",
question:"日本語の文を作ってください:",
text:"هوا گرم است",
words:["あつい","です"],
answer:["あつい","です"]
},

{
type:"build-ja",
speak:"さむい です",
question:"日本語の文を作ってください:",
text:"هوا سرد است",
words:["さむい","です"],
answer:["さむい","です"]
},

{
type:"build-ja",
speak:"はれ です",
question:"日本語の文を作ってください:",
text:"هوا آفتابی است",
words:["はれ","です"],
answer:["はれ","です"]
},

{
type:"build-ja",
speak:"くもり です",
question:"日本語の文を作ってください:",
text:"هوا ابری است",
words:["くもり","です"],
answer:["くもり","です"]
},

{
type:"build-ja",
speak:"かぜ が ふいています",
question:"日本語の文を作ってください:",
text:"هوا بادی است",
words:["かぜ","が","ふいています"],
answer:["かぜ","が","ふいています"]
},

/* BUILD FA */

{
type:"build-fa",
speak:"あつい です",
question:"ترجمه را بساز:",
text:"あつい です",
words:["است","گرم","هوا"],
answer:["هوا","گرم","است"]
},

{
type:"build-fa",
speak:"さむい です",
question:"ترجمه را بساز:",
text:"さむい です",
words:["است","سرد","هوا"],
answer:["هوا","سرد","است"]
},

{
type:"build-fa",
speak:"はれ です",
question:"ترجمه را بساز:",
text:"はれ です",
words:["است","آفتابی","هوا"],
answer:["هوا","آفتابی","است"]
},

{
type:"build-fa",
speak:"くもり です",
question:"ترجمه را بساز:",
text:"くもり です",
words:["است","ابری","هوا"],
answer:["هوا","ابری","است"]
},

{
type:"build-fa",
speak:"かぜ が ふいています",
question:"ترجمه را بساز:",
text:"かぜ が ふいています",
words:["است","بادی","هوا"],
answer:["هوا","بادی","است"]
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
