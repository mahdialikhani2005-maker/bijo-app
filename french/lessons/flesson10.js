let current = 0;
let xp = 0;

function speak(text){
  if (!window.speechSynthesis) return;

  const utter = new SpeechSynthesisUtterance(text);
  utter.lang = "fr";
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
question:"lequel est chaud ?",
speak:"chaud",
options:[
{text:"froid",image:"../../media/weather/cold.png"},
{text:"chaud",image:"../../media/weather/hot.png"},
{text:"ensoleillé",image:"../../media/weather/sunny.png"},
{text:"nuageux",image:"../../media/weather/cloudy.png"}
],
answer:"chaud"
},

{
type:"image",
question:"lequel est froid ?",
speak:"froid",
options:[
{text:"ensoleillé",image:"../../media/weather/sunny.png"},
{text:"froid",image:"../../media/weather/cold.png"},
{text:"vent",image:"../../media/weather/wind.png"},
{text:"chaud",image:"../../media/weather/hot.png"}
],
answer:"froid"
},

{
type:"image",
question:"lequel est ensoleillé ?",
speak:"ensoleillé",
options:[
{text:"chaud",image:"../../media/weather/hot.png"},
{text:"ensoleillé",image:"../../media/weather/sunny.png"},
{text:"vent",image:"../../media/weather/wind.png"},
{text:"froid",image:"../../media/weather/cold.png"}
],
answer:"ensoleillé"
},

{
type:"image",
question:"lequel est nuageux ?",
speak:"nuageux",
options:[
{text:"ensoleillé",image:"../../media/weather/sunny.png"},
{text:"froid",image:"../../media/weather/cold.png"},
{text:"nuageux",image:"../../media/weather/cloudy.png"},
{text:"chaud",image:"../../media/weather/hot.png"}
],
answer:"nuageux"
},

{
type:"image",
question:"lequel est vent ?",
speak:"vent",
options:[
{text:"nuageux",image:"../../media/weather/cloudy.png"},
{text:"chaud",image:"../../media/weather/hot.png"},
{text:"froid",image:"../../media/weather/cold.png"},
{text:"vent",image:"../../media/weather/wind.png"}
],
answer:"vent"
},

/* WORD */

{
type:"word",
question:"Cette image représente quoi ?",
image:"../../media/weather/hot.png",
options:["froid","chaud","ensoleillé","nuageux"],
answer:"chaud"
},

{
type:"word",
question:"Cette image représente quoi ?",
image:"../../media/weather/cold.png",
options:["ensoleillé","froid","vent","chaud"],
answer:"froid"
},

{
type:"word",
question:"Cette image représente quoi ?",
image:"../../media/weather/sunny.png",
options:["chaud","ensoleillé","vent","froid"],
answer:"ensoleillé"
},

{
type:"word",
question:"Cette image représente quoi ?",
image:"../../media/weather/cloudy.png",
options:["ensoleillé","froid","nuageux","chaud"],
answer:"nuageux"
},

{
type:"word",
question:"Cette image représente quoi ?",
image:"../../media/weather/wind.png",
options:["nuageux","chaud","froid","vent"],
answer:"vent"
},

/* AUDIO */

{
type:"audio",
speak:"chaud",
question:"Quel mot as-tu entendu ?",
options:["froid","chaud","ensoleillé","nuageux"],
answer:"chaud"
},

{
type:"audio",
speak:"froid",
question:"Quel mot as-tu entendu ?",
options:["ensoleillé","froid","vent","chaud"],
answer:"froid"
},

{
type:"audio",
speak:"ensoleillé",
question:"Quel mot as-tu entendu ?",
options:["chaud","ensoleillé","vent","froid"],
answer:"ensoleillé"
},

{
type:"audio",
speak:"nuageux",
question:"Quel mot as-tu entendu ?",
options:["ensoleillé","froid","nuageux","chaud"],
answer:"nuageux"
},

{
type:"audio",
speak:"vent",
question:"Quel mot as-tu entendu ?",
options:["nuageux","chaud","froid","vent"],
answer:"vent"
},

/* BUILD FR */

{
type:"build-fr",
speak:"Il fait chaud",
question:"Construisez la phrase française :",
text:"هوا گرم است",
words:["chaud","fait","Il"],
answer:["Il","fait","chaud"]
},

{
type:"build-fr",
speak:"Il fait froid",
question:"Construisez la phrase française :",
text:"هوا سرد است",
words:["froid","fait","Il"],
answer:["Il","fait","froid"]
},

{
type:"build-fr",
speak:"Il fait ensoleillé",
question:"Construisez la phrase française :",
text:"هوا آفتابی است",
words:["ensoleillé","fait","Il"],
answer:["Il","fait","ensoleillé"]
},

{
type:"build-fr",
speak:"Il fait nuageux",
question:"Construisez la phrase française :",
text:"هوا ابری است",
words:["nuageux","fait","Il"],
answer:["Il","fait","nuageux"]
},

{
type:"build-fr",
speak:"Il fait venteux",
question:"Construisez la phrase française :",
text:"هوا بادی است",
words:["venteux","fait","Il"],
answer:["Il","fait","venteux"]
},

/* BUILD FA */

{
type:"build-fa",
speak:"Il fait chaud",
question:"ترجمه را بساز:",
text:"Il fait chaud",
words:["است","گرم","هوا"],
answer:["هوا","گرم","است"]
},

{
type:"build-fa",
speak:"Il fait froid",
question:"ترجمه را بساز:",
text:"Il fait froid",
words:["است","سرد","هوا"],
answer:["هوا","سرد","است"]
},

{
type:"build-fa",
speak:"Il fait ensoleillé",
question:"ترجمه را بساز:",
text:"Il fait ensoleillé",
words:["است","آفتابی","هوا"],
answer:["هوا","آفتابی","است"]
},

{
type:"build-fa",
speak:"Il fait nuageux",
question:"ترجمه را بساز:",
text:"Il fait nuageux",
words:["است","ابری","هوا"],
answer:["هوا","ابری","است"]
},

{
type:"build-fa",
speak:"Il fait venteux",
question:"ترجمه را بساز:",
text:"Il fait venteux",
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

 else if (q.type === "build-en" || q.type === "build-fr" || q.type === "build-fa") {
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

  if (q.type === "build-en" || q.type === "build-fr") {
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
