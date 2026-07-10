let current = 0;
let xp = 0;

function speak(text){
  if (!window.speechSynthesis) return;

  const utter = new SpeechSynthesisUtterance(text);
  utter.lang = "es-ES";
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
question:"¿cuál es hoy ?",
speak:"hoy",
options:[
{text:"mañana",image:"../../media/time/tomorrow.png"},
{text:"hoy",image:"../../media/time/today.png"},
{text:"ayer",image:"../../media/time/yesterday.png"},
{text:"mañana",image:"../../media/time/morning.png"}
],
answer:"hoy"
},

{
type:"image",
question:"¿cuál es mañana ?",
speak:"mañana",
options:[
{text:"noche",image:"../../media/time/night.png"},
{text:"mañana",image:"../../media/time/tomorrow.png"},
{text:"hoy",image:"../../media/time/today.png"},
{text:"ayer",image:"../../media/time/yesterday.png"}
],
answer:"mañana"
},

{
type:"image",
question:"¿cuál es ayer ?",
speak:"ayer",
options:[
{text:"hoy",image:"../../media/time/today.png"},
{text:"ayer",image:"../../media/time/yesterday.png"},
{text:"noche",image:"../../media/time/night.png"},
{text:"mañana",image:"../../media/time/tomorrow.png"}
],
answer:"ayer"
},

{
type:"image",
question:"¿cuál es mañana (parte del día) ?",
speak:"mañana",
options:[
{text:"ayer",image:"../../media/time/yesterday.png"},
{text:"mañana",image:"../../media/time/tomorrow.png"},
{text:"mañana",image:"../../media/time/morning.png"},
{text:"hoy",image:"../../media/time/today.png"}
],
answer:"mañana"
},

{
type:"image",
question:"¿cuál es noche ?",
speak:"noche",
options:[
{text:"mañana",image:"../../media/time/morning.png"},
{text:"hoy",image:"../../media/time/today.png"},
{text:"mañana",image:"../../media/time/tomorrow.png"},
{text:"noche",image:"../../media/time/night.png"}
],
answer:"noche"
},

/* WORD */

{
type:"word",
question:"¿Qué es esta imagen?",
image:"../../media/time/today.png",
options:["mañana","hoy","ayer","mañana"],
answer:"hoy"
},

{
type:"word",
question:"¿Qué es esta imagen?",
image:"../../media/time/tomorrow.png",
options:["noche","mañana","hoy","ayer"],
answer:"mañana"
},

{
type:"word",
question:"¿Qué es esta imagen?",
image:"../../media/time/yesterday.png",
options:["hoy","ayer","noche","mañana"],
answer:"ayer"
},

{
type:"word",
question:"¿Qué es esta imagen?",
image:"../../media/time/morning.png",
options:["ayer","mañana","mañana","hoy"],
answer:"mañana"
},

{
type:"word",
question:"¿Qué es esta imagen?",
image:"../../media/time/night.png",
options:["mañana","hoy","mañana","noche"],
answer:"noche"
},

/* AUDIO */

{
type:"audio",
speak:"hoy",
question:"¿Qué palabra escuchaste?",
options:["mañana","hoy","ayer","mañana"],
answer:"hoy"
},

{
type:"audio",
speak:"mañana",
question:"¿Qué palabra escuchaste?",
options:["noche","mañana","hoy","ayer"],
answer:"mañana"
},

{
type:"audio",
speak:"ayer",
question:"¿Qué palabra escuchaste?",
options:["hoy","ayer","noche","mañana"],
answer:"ayer"
},

{
type:"audio",
speak:"mañana",
question:"¿Qué palabra escuchaste?",
options:["ayer","mañana","mañana","hoy"],
answer:"mañana"
},

{
type:"audio",
speak:"noche",
question:"¿Qué palabra escuchaste?",
options:["mañana","hoy","mañana","noche"],
answer:"noche"
},

/* BUILD ES */

{
type:"build-es",
speak:"Hoy es lunes",
question:"Construya la frase en español:",
text:"امروز دوشنبه است",
words:["es","hoy","lunes"],
answer:["Hoy","es","lunes"]
},

{
type:"build-es",
speak:"Mañana es martes",
question:"Construya la frase en español:",
text:"فردا سه‌شنبه است",
words:["Mañana","es","martes"],
answer:["Mañana","es","martes"]
},

{
type:"build-es",
speak:"Ayer fue domingo",
question:"Construya la frase en español:",
text:"دیروز یک‌شنبه بود",
words:["fue","Ayer","domingo"],
answer:["Ayer","fue","domingo"]
},

{
type:"build-es",
speak:"Buenos días",
question:"Construya la frase en español:",
text:"صبح بخیر",
words:["Buenos","días"],
answer:["Buenos","días"]
},

{
type:"build-es",
speak:"Buenas noches",
question:"Construya la frase en español:",
text:"شب بخیر",
words:["Buenas","noches"],
answer:["Buenas","noches"]
},

/* BUILD FA */

{
type:"build-fa",
speak:"Hoy es lunes",
question:"ترجمه را بساز:",
text:"Hoy es lunes",
words:["است","دوشنبه","امروز"],
answer:["امروز","دوشنبه","است"]
},

{
type:"build-fa",
speak:"Mañana es martes",
question:"ترجمه را بساز:",
text:"Mañana es martes",
words:["است","سه‌شنبه","فردا"],
answer:["فردا","سه‌شنبه","است"]
},

{
type:"build-fa",
speak:"Ayer fue domingo",
question:"ترجمه را بساز:",
text:"Ayer fue domingo",
words:["بود","یک‌شنبه","دیروز"],
answer:["دیروز","یک‌شنبه","بود"]
},

{
type:"build-fa",
speak:"Buenos días",
question:"ترجمه را بساز:",
text:"Buenos días",
words:["بخیر","صبح"],
answer:["صبح","بخیر"]
},

{
type:"build-fa",
speak:"Buenas noches",
question:"ترجمه را بساز:",
text:"Buenas noches",
words:["بخیر","شب"],
answer:["شب","بخیر"]
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
