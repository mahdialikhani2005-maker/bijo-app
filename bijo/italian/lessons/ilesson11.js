let current = 0;
let xp = 0;

function speak(text){
  if (!window.speechSynthesis) return;

  const utter = new SpeechSynthesisUtterance(text);
  utter.lang = "it";
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
question:"qual è rosso ?",
speak:"rosso",
options:[
{text:"blu",image:"../../media/colors/blue.png"},
{text:"rosso",image:"../../media/colors/red.png"},
{text:"verde",image:"../../media/colors/green.png"},
{text:"giallo",image:"../../media/colors/yellow.png"}
],
answer:"rosso"
},

{
type:"image",
question:"qual è blu ?",
speak:"blu",
options:[
{text:"giallo",image:"../../media/colors/yellow.png"},
{text:"blu",image:"../../media/colors/blue.png"},
{text:"nero",image:"../../media/colors/black.png"},
{text:"rosso",image:"../../media/colors/red.png"}
],
answer:"blu"
},

{
type:"image",
question:"qual è verde ?",
speak:"verde",
options:[
{text:"rosso",image:"../../media/colors/red.png"},
{text:"verde",image:"../../media/colors/green.png"},
{text:"nero",image:"../../media/colors/black.png"},
{text:"blu",image:"../../media/colors/blue.png"}
],
answer:"verde"
},

{
type:"image",
question:"qual è giallo ?",
speak:"giallo",
options:[
{text:"verde",image:"../../media/colors/green.png"},
{text:"blu",image:"../../media/colors/blue.png"},
{text:"giallo",image:"../../media/colors/yellow.png"},
{text:"rosso",image:"../../media/colors/red.png"}
],
answer:"giallo"
},

{
type:"image",
question:"qual è nero ?",
speak:"nero",
options:[
{text:"giallo",image:"../../media/colors/yellow.png"},
{text:"rosso",image:"../../media/colors/red.png"},
{text:"blu",image:"../../media/colors/blue.png"},
{text:"nero",image:"../../media/colors/black.png"}
],
answer:"nero"
},

/* WORD */

{
type:"word",
question:"Che colore è?",
image:"../../media/colors/red.png",
options:["blu","rosso","verde","giallo"],
answer:"rosso"
},

{
type:"word",
question:"Che colore è?",
image:"../../media/colors/blue.png",
options:["giallo","blu","nero","rosso"],
answer:"blu"
},

{
type:"word",
question:"Che colore è?",
image:"../../media/colors/green.png",
options:["rosso","verde","nero","blu"],
answer:"verde"
},

{
type:"word",
question:"Che colore è?",
image:"../../media/colors/yellow.png",
options:["verde","blu","giallo","rosso"],
answer:"giallo"
},

{
type:"word",
question:"Che colore è?",
image:"../../media/colors/black.png",
options:["giallo","rosso","blu","nero"],
answer:"nero"
},

/* AUDIO */

{
type:"audio",
speak:"rosso",
question:"Che parola hai sentito?",
options:["blu","rosso","verde","giallo"],
answer:"rosso"
},

{
type:"audio",
speak:"blu",
question:"Che parola hai sentito?",
options:["giallo","blu","nero","rosso"],
answer:"blu"
},

{
type:"audio",
speak:"verde",
question:"Che parola hai sentito?",
options:["rosso","verde","nero","blu"],
answer:"verde"
},

{
type:"audio",
speak:"giallo",
question:"Che parola hai sentito?",
options:["verde","blu","giallo","rosso"],
answer:"giallo"
},

{
type:"audio",
speak:"nero",
question:"Che parola hai sentito?",
options:["giallo","rosso","blu","nero"],
answer:"nero"
},

/* BUILD IT */

{
type:"build-it",
speak:"Questo è rosso",
question:"Costruisci la frase in italiano:",
text:"این قرمز است",
words:["rosso","è","Questo"],
answer:["Questo","è","rosso"]
},

{
type:"build-it",
speak:"Questo è blu",
question:"Costruisci la frase in italiano:",
text:"این آبی است",
words:["blu","è","Questo"],
answer:["Questo","è","blu"]
},

{
type:"build-it",
speak:"Questo è verde",
question:"Costruisci la frase in italiano:",
text:"این سبز است",
words:["verde","è","Questo"],
answer:["Questo","è","verde"]
},

{
type:"build-it",
speak:"Questo è giallo",
question:"Costruisci la frase in italiano:",
text:"این زرد است",
words:["giallo","è","Questo"],
answer:["Questo","è","giallo"]
},

{
type:"build-it",
speak:"Questo è nero",
question:"Costruisci la frase in italiano:",
text:"این مشکی است",
words:["nero","è","Questo"],
answer:["Questo","è","nero"]
},

/* BUILD FA */

{
type:"build-fa",
speak:"Questo è rosso",
question:"ترجمه را بساز:",
text:"Questo è rosso",
words:["است","قرمز","این"],
answer:["این","قرمز","است"]
},

{
type:"build-fa",
speak:"Questo è blu",
question:"ترجمه را بساز:",
text:"Questo è blu",
words:["است","آبی","این"],
answer:["این","آبی","است"]
},

{
type:"build-fa",
speak:"Questo è verde",
question:"ترجمه را بساز:",
text:"Questo è verde",
words:["است","سبز","این"],
answer:["این","سبز","است"]
},

{
type:"build-fa",
speak:"Questo è giallo",
question:"ترجمه را بساز:",
text:"Questo è giallo",
words:["است","زرد","این"],
answer:["این","زرد","است"]
},

{
type:"build-fa",
speak:"Questo è nero",
question:"ترجمه را بساز:",
text:"Questo è nero",
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
