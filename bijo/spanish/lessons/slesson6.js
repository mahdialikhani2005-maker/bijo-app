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
question:"¿cuál es manzana ?",
speak:"manzana",
options:[
{text:"plátano",image:"../../media/fruits/banana.png"},
{text:"manzana",image:"../../media/fruits/apple.png"},
{text:"naranja",image:"../../media/fruits/orange.png"},
{text:"uva",image:"../../media/fruits/grape.png"}
],
answer:"manzana"
},

{
type:"image",
question:"¿cuál es plátano ?",
speak:"plátano",
options:[
{text:"naranja",image:"../../media/fruits/orange.png"},
{text:"plátano",image:"../../media/fruits/banana.png"},
{text:"sandía",image:"../../media/fruits/watermelon.png"},
{text:"manzana",image:"../../media/fruits/apple.png"}
],
answer:"plátano"
},

{
type:"image",
question:"¿cuál es naranja ?",
speak:"naranja",
options:[
{text:"manzana",image:"../../media/fruits/apple.png"},
{text:"naranja",image:"../../media/fruits/orange.png"},
{text:"uva",image:"../../media/fruits/grape.png"},
{text:"plátano",image:"../../media/fruits/banana.png"}
],
answer:"naranja"
},

{
type:"image",
question:"¿cuál es uva ?",
speak:"uva",
options:[
{text:"naranja",image:"../../media/fruits/orange.png"},
{text:"plátano",image:"../../media/fruits/banana.png"},
{text:"uva",image:"../../media/fruits/grape.png"},
{text:"manzana",image:"../../media/fruits/apple.png"}
],
answer:"uva"
},

{
type:"image",
question:"¿cuál es sandía ?",
speak:"sandía",
options:[
{text:"uva",image:"../../media/fruits/grape.png"},
{text:"manzana",image:"../../media/fruits/apple.png"},
{text:"plátano",image:"../../media/fruits/banana.png"},
{text:"sandía",image:"../../media/fruits/watermelon.png"}
],
answer:"sandía"
},

/* WORD */

{
type:"word",
question:"¿Qué es esta imagen?",
image:"../../media/fruits/apple.png",
options:["plátano","manzana","naranja","uva"],
answer:"manzana"
},

{
type:"word",
question:"¿Qué es esta imagen?",
image:"../../media/fruits/banana.png",
options:["naranja","plátano","sandía","manzana"],
answer:"plátano"
},

{
type:"word",
question:"¿Qué es esta imagen?",
image:"../../media/fruits/orange.png",
options:["manzana","naranja","uva","plátano"],
answer:"naranja"
},

{
type:"word",
question:"¿Qué es esta imagen?",
image:"../../media/fruits/grape.png",
options:["naranja","plátano","uva","manzana"],
answer:"uva"
},

{
type:"word",
question:"¿Qué es esta imagen?",
image:"../../media/fruits/watermelon.png",
options:["uva","manzana","plátano","sandía"],
answer:"sandía"
},

/* AUDIO */

{
type:"audio",
speak:"manzana",
question:"¿Qué palabra escuchaste?",
options:["plátano","manzana","naranja","uva"],
answer:"manzana"
},

{
type:"audio",
speak:"plátano",
question:"¿Qué palabra escuchaste?",
options:["naranja","plátano","sandía","manzana"],
answer:"plátano"
},

{
type:"audio",
speak:"naranja",
question:"¿Qué palabra escuchaste?",
options:["manzana","naranja","uva","plátano"],
answer:"naranja"
},

{
type:"audio",
speak:"uva",
question:"¿Qué palabra escuchaste?",
options:["naranja","plátano","uva","manzana"],
answer:"uva"
},

{
type:"audio",
speak:"sandía",
question:"¿Qué palabra escuchaste?",
options:["uva","manzana","plátano","sandía"],
answer:"sandía"
},

/* BUILD ES */

{
type:"build-es",
speak:"Yo como una manzana",
question:"Construya la frase en español:",
text:"من یک سیب می‌خورم",
words:["manzana","una","como","Yo"],
answer:["Yo","como","una","manzana"]
},

{
type:"build-es",
speak:"Yo como un plátano",
question:"Construya la frase en español:",
text:"من یک موز می‌خورم",
words:["plátano","un","como","Yo"],
answer:["Yo","como","un","plátano"]
},

{
type:"build-es",
speak:"Yo como una naranja",
question:"Construya la frase en español:",
text:"من یک پرتقال می‌خورم",
words:["naranja","una","como","Yo"],
answer:["Yo","como","una","naranja"]
},

{
type:"build-es",
speak:"Yo como uvas",
question:"Construya la frase en español:",
text:"من انگور می‌خورم",
words:["uvas","como","Yo"],
answer:["Yo","como","uvas"]
},

{
type:"build-es",
speak:"Yo como sandía",
question:"Construya la frase en español:",
text:"من هندوانه می‌خورم",
words:["sandía","como","Yo"],
answer:["Yo","como","sandía"]
},

/* BUILD FA */

{
type:"build-fa",
speak:"Yo como una manzana",
question:"ترجمه را بساز:",
text:"Yo como una manzana",
words:["می‌خورم","سیب","یک","من"],
answer:["من","یک","سیب","می‌خورم"]
},

{
type:"build-fa",
speak:"Yo como un plátano",
question:"ترجمه را بساز:",
text:"Yo como un plátano",
words:["می‌خورم","موز","یک","من"],
answer:["من","یک","موز","می‌خورم"]
},

{
type:"build-fa",
speak:"Yo como una naranja",
question:"ترجمه را بساز:",
text:"Yo como una naranja",
words:["می‌خورم","پرتقال","یک","من"],
answer:["من","یک","پرتقال","می‌خورم"]
},

{
type:"build-fa",
speak:"Yo como uvas",
question:"ترجمه را بساز:",
text:"Yo como uvas",
words:["می‌خورم","انگور","من"],
answer:["من","انگور","می‌خورم"]
},

{
type:"build-fa",
speak:"Yo como sandía",
question:"ترجمه را بساز:",
text:"Yo como sandía",
words:["می‌خورم","هندوانه","من"],
answer:["من","هندوانه","می‌خورم"]
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
