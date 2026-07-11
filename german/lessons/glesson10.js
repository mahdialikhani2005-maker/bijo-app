let current = 0;
let xp = 0;

function speak(text){
  if (!window.speechSynthesis) return;

  const utter = new SpeechSynthesisUtterance(text);
  utter.lang = "de";
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
question:"welches ist heiß ?",
speak:"heiß",
options:[
{text:"kalt",image:"../../media/weather/cold.png"},
{text:"heiß",image:"../../media/weather/hot.png"},
{text:"sonnig",image:"../../media/weather/sunny.png"},
{text:"bewölkt",image:"../../media/weather/cloudy.png"}
],
answer:"heiß"
},

{
type:"image",
question:"welches ist kalt ?",
speak:"kalt",
options:[
{text:"sonnig",image:"../../media/weather/sunny.png"},
{text:"kalt",image:"../../media/weather/cold.png"},
{text:"Wind",image:"../../media/weather/wind.png"},
{text:"heiß",image:"../../media/weather/hot.png"}
],
answer:"kalt"
},

{
type:"image",
question:"welches ist sonnig ?",
speak:"sonnig",
options:[
{text:"heiß",image:"../../media/weather/hot.png"},
{text:"sonnig",image:"../../media/weather/sunny.png"},
{text:"Wind",image:"../../media/weather/wind.png"},
{text:"kalt",image:"../../media/weather/cold.png"}
],
answer:"sonnig"
},

{
type:"image",
question:"welches ist bewölkt ?",
speak:"bewölkt",
options:[
{text:"sonnig",image:"../../media/weather/sunny.png"},
{text:"kalt",image:"../../media/weather/cold.png"},
{text:"bewölkt",image:"../../media/weather/cloudy.png"},
{text:"heiß",image:"../../media/weather/hot.png"}
],
answer:"bewölkt"
},

{
type:"image",
question:"welches ist Wind ?",
speak:"Wind",
options:[
{text:"bewölkt",image:"../../media/weather/cloudy.png"},
{text:"heiß",image:"../../media/weather/hot.png"},
{text:"kalt",image:"../../media/weather/cold.png"},
{text:"Wind",image:"../../media/weather/wind.png"}
],
answer:"Wind"
},

/* WORD */

{
type:"word",
question:"Was ist das für ein Bild?",
image:"../../media/weather/hot.png",
options:["kalt","heiß","sonnig","bewölkt"],
answer:"heiß"
},

{
type:"word",
question:"Was ist das für ein Bild?",
image:"../../media/weather/cold.png",
options:["sonnig","kalt","Wind","heiß"],
answer:"kalt"
},

{
type:"word",
question:"Was ist das für ein Bild?",
image:"../../media/weather/sunny.png",
options:["heiß","sonnig","Wind","kalt"],
answer:"sonnig"
},

{
type:"word",
question:"Was ist das für ein Bild?",
image:"../../media/weather/cloudy.png",
options:["sonnig","kalt","bewölkt","heiß"],
answer:"bewölkt"
},

{
type:"word",
question:"Was ist das für ein Bild?",
image:"../../media/weather/wind.png",
options:["bewölkt","heiß","kalt","Wind"],
answer:"Wind"
},

/* AUDIO */

{
type:"audio",
speak:"heiß",
question:"Welches Wort hast du gehört?",
options:["kalt","heiß","sonnig","bewölkt"],
answer:"heiß"
},

{
type:"audio",
speak:"kalt",
question:"Welches Wort hast du gehört?",
options:["sonnig","kalt","Wind","heiß"],
answer:"kalt"
},

{
type:"audio",
speak:"sonnig",
question:"Welches Wort hast du gehört?",
options:["heiß","sonnig","Wind","kalt"],
answer:"sonnig"
},

{
type:"audio",
speak:"bewölkt",
question:"Welches Wort hast du gehört?",
options:["sonnig","kalt","bewölkt","heiß"],
answer:"bewölkt"
},

{
type:"audio",
speak:"Wind",
question:"Welches Wort hast du gehört?",
options:["bewölkt","heiß","kalt","Wind"],
answer:"Wind"
},

/* BUILD DE */

{
type:"build-de",
speak:"Es ist heiß",
question:"Bauen Sie den deutschen Satz:",
text:"هوا گرم است",
words:["heiß","ist","Es"],
answer:["Es","ist","heiß"]
},

{
type:"build-de",
speak:"Es ist kalt",
question:"Bauen Sie den deutschen Satz:",
text:"هوا سرد است",
words:["kalt","ist","Es"],
answer:["Es","ist","kalt"]
},

{
type:"build-de",
speak:"Es ist sonnig",
question:"Bauen Sie den deutschen Satz:",
text:"هوا آفتابی است",
words:["sonnig","ist","Es"],
answer:["Es","ist","sonnig"]
},

{
type:"build-de",
speak:"Es ist bewölkt",
question:"Bauen Sie den deutschen Satz:",
text:"هوا ابری است",
words:["bewölkt","ist","Es"],
answer:["Es","ist","bewölkt"]
},

{
type:"build-de",
speak:"Es ist windig",
question:"Bauen Sie den deutschen Satz:",
text:"هوا بادی است",
words:["windig","ist","Es"],
answer:["Es","ist","windig"]
},

/* BUILD FA */

{
type:"build-fa",
speak:"Es ist heiß",
question:"ترجمه را بساز:",
text:"Es ist heiß",
words:["است","گرم","هوا"],
answer:["هوا","گرم","است"]
},

{
type:"build-fa",
speak:"Es ist kalt",
question:"ترجمه را بساز:",
text:"Es ist kalt",
words:["است","سرد","هوا"],
answer:["هوا","سرد","است"]
},

{
type:"build-fa",
speak:"Es ist sonnig",
question:"ترجمه را بساز:",
text:"Es ist sonnig",
words:["است","آفتابی","هوا"],
answer:["هوا","آفتابی","است"]
},

{
type:"build-fa",
speak:"Es ist bewölkt",
question:"ترجمه را بساز:",
text:"Es ist bewölkt",
words:["است","ابری","هوا"],
answer:["هوا","ابری","است"]
},

{
type:"build-fa",
speak:"Es ist windig",
question:"ترجمه را بساز:",
text:"Es ist windig",
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

  else if (q.type === "build-en" || q.type === "build-fa") {
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

  if (q.type === "build-en") {
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
