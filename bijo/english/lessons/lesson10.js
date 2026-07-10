let current = 0;
let xp = 0;

function speak(text){
  if (!window.speechSynthesis) return;

  const utter = new SpeechSynthesisUtterance(text);
  utter.lang = "en-US";
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
question:"hot کدام است؟",
speak:"hot",
options:[
{text:"cold",image:"../../media/weather/cold.png"},
{text:"hot",image:"../../media/weather/hot.png"},
{text:"sunny",image:"../../media/weather/sunny.png"},
{text:"cloudy",image:"../../media/weather/cloudy.png"}
],
answer:"hot"
},

{
type:"image",
question:"cold کدام است؟",
speak:"cold",
options:[
{text:"sunny",image:"../../media/weather/sunny.png"},
{text:"cold",image:"../../media/weather/cold.png"},
{text:"wind",image:"../../media/weather/wind.png"},
{text:"hot",image:"../../media/weather/hot.png"}
],
answer:"cold"
},

{
type:"image",
question:"sunny کدام است؟",
speak:"sunny",
options:[
{text:"hot",image:"../../media/weather/hot.png"},
{text:"sunny",image:"../../media/weather/sunny.png"},
{text:"wind",image:"../../media/weather/wind.png"},
{text:"cold",image:"../../media/weather/cold.png"}
],
answer:"sunny"
},

{
type:"image",
question:"cloudy کدام است؟",
speak:"cloudy",
options:[
{text:"sunny",image:"../../media/weather/sunny.png"},
{text:"cold",image:"../../media/weather/cold.png"},
{text:"cloudy",image:"../../media/weather/cloudy.png"},
{text:"hot",image:"../../media/weather/hot.png"}
],
answer:"cloudy"
},

{
type:"image",
question:"wind کدام است؟",
speak:"wind",
options:[
{text:"cloudy",image:"../../media/weather/cloudy.png"},
{text:"hot",image:"../../media/weather/hot.png"},
{text:"cold",image:"../../media/weather/cold.png"},
{text:"wind",image:"../../media/weather/wind.png"}
],
answer:"wind"
},

/* WORD */

{
type:"word",
question:"این تصویر چیست؟",
image:"../../media/weather/hot.png",
options:["cold","hot","sunny","cloudy"],
answer:"hot"
},

{
type:"word",
question:"این تصویر چیست؟",
image:"../../media/weather/cold.png",
options:["sunny","cold","wind","hot"],
answer:"cold"
},

{
type:"word",
question:"این تصویر چیست؟",
image:"../../media/weather/sunny.png",
options:["hot","sunny","wind","cold"],
answer:"sunny"
},

{
type:"word",
question:"این تصویر چیست؟",
image:"../../media/weather/cloudy.png",
options:["sunny","cold","cloudy","hot"],
answer:"cloudy"
},

{
type:"word",
question:"این تصویر چیست؟",
image:"../../media/weather/wind.png",
options:["cloudy","hot","cold","wind"],
answer:"wind"
},

/* AUDIO */

{
type:"audio",
speak:"hot",
question:"کدام کلمه را شنیدی؟",
options:["cold","hot","sunny","cloudy"],
answer:"hot"
},

{
type:"audio",
speak:"cold",
question:"کدام کلمه را شنیدی؟",
options:["sunny","cold","wind","hot"],
answer:"cold"
},

{
type:"audio",
speak:"sunny",
question:"کدام کلمه را شنیدی؟",
options:["hot","sunny","wind","cold"],
answer:"sunny"
},

{
type:"audio",
speak:"cloudy",
question:"کدام کلمه را شنیدی؟",
options:["sunny","cold","cloudy","hot"],
answer:"cloudy"
},

{
type:"audio",
speak:"wind",
question:"کدام کلمه را شنیدی؟",
options:["cloudy","hot","cold","wind"],
answer:"wind"
},

/* BUILD EN */

{
type:"build-en",
speak:"It is hot",
question:"جمله انگلیسی را بساز:",
text:"هوا گرم است",
words:["hot","is","It"],
answer:["It","is","hot"]
},

{
type:"build-en",
speak:"It is cold",
question:"جمله انگلیسی را بساز:",
text:"هوا سرد است",
words:["cold","is","It"],
answer:["It","is","cold"]
},

{
type:"build-en",
speak:"It is sunny",
question:"جمله انگلیسی را بساز:",
text:"هوا آفتابی است",
words:["sunny","is","It"],
answer:["It","is","sunny"]
},

{
type:"build-en",
speak:"It is cloudy",
question:"جمله انگلیسی را بساز:",
text:"هوا ابری است",
words:["cloudy","is","It"],
answer:["It","is","cloudy"]
},

{
type:"build-en",
speak:"It is windy",
question:"جمله انگلیسی را بساز:",
text:"هوا بادی است",
words:["windy","is","It"],
answer:["It","is","windy"]
},

/* BUILD FA */

{
type:"build-fa",
speak:"It is hot",
question:"ترجمه را بساز:",
text:"It is hot",
words:["است","گرم","هوا"],
answer:["هوا","گرم","است"]
},

{
type:"build-fa",
speak:"It is cold",
question:"ترجمه را بساز:",
text:"It is cold",
words:["است","سرد","هوا"],
answer:["هوا","سرد","است"]
},

{
type:"build-fa",
speak:"It is sunny",
question:"ترجمه را بساز:",
text:"It is sunny",
words:["است","آفتابی","هوا"],
answer:["هوا","آفتابی","است"]
},

{
type:"build-fa",
speak:"It is cloudy",
question:"ترجمه را بساز:",
text:"It is cloudy",
words:["است","ابری","هوا"],
answer:["هوا","ابری","است"]
},

{
type:"build-fa",
speak:"It is windy",
question:"ترجمه را بساز:",
text:"It is windy",
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
