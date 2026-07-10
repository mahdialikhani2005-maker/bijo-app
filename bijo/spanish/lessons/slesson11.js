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
question:"¿cuál es rojo ?",
speak:"rojo",
options:[
{text:"azul",image:"../../media/colors/blue.png"},
{text:"rojo",image:"../../media/colors/red.png"},
{text:"verde",image:"../../media/colors/green.png"},
{text:"amarillo",image:"../../media/colors/yellow.png"}
],
answer:"rojo"
},

{
type:"image",
question:"¿cuál es azul ?",
speak:"azul",
options:[
{text:"amarillo",image:"../../media/colors/yellow.png"},
{text:"azul",image:"../../media/colors/blue.png"},
{text:"negro",image:"../../media/colors/black.png"},
{text:"rojo",image:"../../media/colors/red.png"}
],
answer:"azul"
},

{
type:"image",
question:"¿cuál es verde ?",
speak:"verde",
options:[
{text:"rojo",image:"../../media/colors/red.png"},
{text:"verde",image:"../../media/colors/green.png"},
{text:"negro",image:"../../media/colors/black.png"},
{text:"azul",image:"../../media/colors/blue.png"}
],
answer:"verde"
},

{
type:"image",
question:"¿cuál es amarillo ?",
speak:"amarillo",
options:[
{text:"verde",image:"../../media/colors/green.png"},
{text:"azul",image:"../../media/colors/blue.png"},
{text:"amarillo",image:"../../media/colors/yellow.png"},
{text:"rojo",image:"../../media/colors/red.png"}
],
answer:"amarillo"
},

{
type:"image",
question:"¿cuál es negro ?",
speak:"negro",
options:[
{text:"amarillo",image:"../../media/colors/yellow.png"},
{text:"rojo",image:"../../media/colors/red.png"},
{text:"azul",image:"../../media/colors/blue.png"},
{text:"negro",image:"../../media/colors/black.png"}
],
answer:"negro"
},

/* WORD */

{
type:"word",
question:"¿Qué color es esto?",
image:"../../media/colors/red.png",
options:["azul","rojo","verde","amarillo"],
answer:"rojo"
},

{
type:"word",
question:"¿Qué color es esto?",
image:"../../media/colors/blue.png",
options:["amarillo","azul","negro","rojo"],
answer:"azul"
},

{
type:"word",
question:"¿Qué color es esto?",
image:"../../media/colors/green.png",
options:["rojo","verde","negro","azul"],
answer:"verde"
},

{
type:"word",
question:"¿Qué color es esto?",
image:"../../media/colors/yellow.png",
options:["verde","azul","amarillo","rojo"],
answer:"amarillo"
},

{
type:"word",
question:"¿Qué color es esto?",
image:"../../media/colors/black.png",
options:["amarillo","rojo","azul","negro"],
answer:"negro"
},

/* AUDIO */

{
type:"audio",
speak:"rojo",
question:"¿Qué palabra escuchaste?",
options:["azul","rojo","verde","amarillo"],
answer:"rojo"
},

{
type:"audio",
speak:"azul",
question:"¿Qué palabra escuchaste?",
options:["amarillo","azul","negro","rojo"],
answer:"azul"
},

{
type:"audio",
speak:"verde",
question:"¿Qué palabra escuchaste?",
options:["rojo","verde","negro","azul"],
answer:"verde"
},

{
type:"audio",
speak:"amarillo",
question:"¿Qué palabra escuchaste?",
options:["verde","azul","amarillo","rojo"],
answer:"amarillo"
},

{
type:"audio",
speak:"negro",
question:"¿Qué palabra escuchaste?",
options:["amarillo","rojo","azul","negro"],
answer:"negro"
},

/* BUILD ES */

{
type:"build-es",
speak:"Esto es rojo",
question:"Construya la frase en español:",
text:"این قرمز است",
words:["rojo","es","Esto"],
answer:["Esto","es","rojo"]
},

{
type:"build-es",
speak:"Esto es azul",
question:"Construya la frase en español:",
text:"این آبی است",
words:["azul","es","Esto"],
answer:["Esto","es","azul"]
},

{
type:"build-es",
speak:"Esto es verde",
question:"Construya la frase en español:",
text:"این سبز است",
words:["verde","es","Esto"],
answer:["Esto","es","verde"]
},

{
type:"build-es",
speak:"Esto es amarillo",
question:"Construya la frase en español:",
text:"این زرد است",
words:["amarillo","es","Esto"],
answer:["Esto","es","amarillo"]
},

{
type:"build-es",
speak:"Esto es negro",
question:"Construya la frase en español:",
text:"این مشکی است",
words:["negro","es","Esto"],
answer:["Esto","es","negro"]
},

/* BUILD FA */

{
type:"build-fa",
speak:"Esto es rojo",
question:"ترجمه را بساز:",
text:"Esto es rojo",
words:["است","قرمز","این"],
answer:["این","قرمز","است"]
},

{
type:"build-fa",
speak:"Esto es azul",
question:"ترجمه را بساز:",
text:"Esto es azul",
words:["است","آبی","این"],
answer:["این","آبی","است"]
},

{
type:"build-fa",
speak:"Esto es verde",
question:"ترجمه را بساز:",
text:"Esto es verde",
words:["است","سبز","این"],
answer:["این","سبز","است"]
},

{
type:"build-fa",
speak:"Esto es amarillo",
question:"ترجمه را بساز:",
text:"Esto es amarillo",
words:["است","زرد","این"],
answer:["این","زرد","است"]
},

{
type:"build-fa",
speak:"Esto es negro",
question:"ترجمه را بساز:",
text:"Esto es negro",
words:["است","مشکی","این"],
answer:["این","مشکی","است"]
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
