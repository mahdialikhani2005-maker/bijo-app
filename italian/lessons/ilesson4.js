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
question:"qual è camicia ?",
speak:"camicia",
options:[
{text:"pantaloni",image:"../../media/clothes/pants.png"},
{text:"camicia",image:"../../media/clothes/shirt.png"},
{text:"cappello",image:"../../media/clothes/hat.png"},
{text:"vestito",image:"../../media/clothes/dress.png"}
],
answer:"camicia"
},

{
type:"image",
question:"qual è pantaloni ?",
speak:"pantaloni",
options:[
{text:"vestito",image:"../../media/clothes/dress.png"},
{text:"pantaloni",image:"../../media/clothes/pants.png"},
{text:"scarpe",image:"../../media/clothes/shoes.png"},
{text:"camicia",image:"../../media/clothes/shirt.png"}
],
answer:"pantaloni"
},

{
type:"image",
question:"qual è scarpe ?",
speak:"scarpe",
options:[
{text:"camicia",image:"../../media/clothes/shirt.png"},
{text:"scarpe",image:"../../media/clothes/shoes.png"},
{text:"cappello",image:"../../media/clothes/hat.png"},
{text:"pantaloni",image:"../../media/clothes/pants.png"}
],
answer:"scarpe"
},

{
type:"image",
question:"qual è cappello ?",
speak:"cappello",
options:[
{text:"scarpe",image:"../../media/clothes/shoes.png"},
{text:"pantaloni",image:"../../media/clothes/pants.png"},
{text:"cappello",image:"../../media/clothes/hat.png"},
{text:"camicia",image:"../../media/clothes/shirt.png"}
],
answer:"cappello"
},

{
type:"image",
question:"qual è vestito ?",
speak:"vestito",
options:[
{text:"cappello",image:"../../media/clothes/hat.png"},
{text:"camicia",image:"../../media/clothes/shirt.png"},
{text:"pantaloni",image:"../../media/clothes/pants.png"},
{text:"vestito",image:"../../media/clothes/dress.png"}
],
answer:"vestito"
},

/* WORD */

{
type:"word",
question:"Che immagine è?",
image:"../../media/clothes/shirt.png",
options:["pantaloni","camicia","cappello","vestito"],
answer:"camicia"
},

{
type:"word",
question:"Che immagine è?",
image:"../../media/clothes/pants.png",
options:["vestito","pantaloni","scarpe","camicia"],
answer:"pantaloni"
},

{
type:"word",
question:"Che immagine è?",
image:"../../media/clothes/shoes.png",
options:["camicia","scarpe","cappello","pantaloni"],
answer:"scarpe"
},

{
type:"word",
question:"Che immagine è?",
image:"../../media/clothes/hat.png",
options:["scarpe","pantaloni","cappello","camicia"],
answer:"cappello"
},

{
type:"word",
question:"Che immagine è?",
image:"../../media/clothes/dress.png",
options:["cappello","camicia","pantaloni","vestito"],
answer:"vestito"
},

/* AUDIO */

{
type:"audio",
speak:"camicia",
question:"Che parola hai sentito?",
options:["pantaloni","camicia","cappello","vestito"],
answer:"camicia"
},

{
type:"audio",
speak:"pantaloni",
question:"Che parola hai sentito?",
options:["vestito","pantaloni","scarpe","camicia"],
answer:"pantaloni"
},

{
type:"audio",
speak:"scarpe",
question:"Che parola hai sentito?",
options:["camicia","scarpe","cappello","pantaloni"],
answer:"scarpe"
},

{
type:"audio",
speak:"cappello",
question:"Che parola hai sentito?",
options:["scarpe","pantaloni","cappello","camicia"],
answer:"cappello"
},

{
type:"audio",
speak:"vestito",
question:"Che parola hai sentito?",
options:["cappello","camicia","pantaloni","vestito"],
answer:"vestito"
},

/* BUILD IT */

{
type:"build-it",
speak:"Questa è una camicia",
question:"Costruisci la frase in italiano:",
text:"این یک پیراهن است",
words:["camicia","una","è","Questa"],
answer:["Questa","è","una","camicia"]
},

{
type:"build-it",
speak:"Questi sono pantaloni",
question:"Costruisci la frase in italiano:",
text:"این یک شلوار است",
words:["pantaloni","sono","Questi"],
answer:["Questi","sono","pantaloni"]
},

{
type:"build-it",
speak:"Queste sono scarpe",
question:"Costruisci la frase in italiano:",
text:"این کفش‌ها هستند",
words:["scarpe","sono","Queste"],
answer:["Queste","sono","scarpe"]
},

{
type:"build-it",
speak:"Questo è un cappello",
question:"Costruisci la frase in italiano:",
text:"این یک کلاه است",
words:["cappello","un","è","Questo"],
answer:["Questo","è","un","cappello"]
},

{
type:"build-it",
speak:"Questo è un vestito",
question:"Costruisci la frase in italiano:",
text:"این یک لباس است",
words:["vestito","un","è","Questo"],
answer:["Questo","è","un","vestito"]
},

/* BUILD FA */

{
type:"build-fa",
speak:"Questa è una camicia",
question:"ترجمه را بساز:",
text:"Questa è una camicia",
words:["است","پیراهن","یک","این"],
answer:["این","یک","پیراهن","است"]
},

{
type:"build-fa",
speak:"Questi sono pantaloni",
question:"ترجمه را بساز:",
text:"Questi sono pantaloni",
words:["است","شلوار","یک","این"],
answer:["این","یک","شلوار","است"]
},

{
type:"build-fa",
speak:"Queste sono scarpe",
question:"ترجمه را بساز:",
text:"Queste sono scarpe",
words:["هستند","کفش‌ها","این"],
answer:["این","کفش‌ها","هستند"]
},

{
type:"build-fa",
speak:"Questo è un cappello",
question:"ترجمه را بساز:",
text:"Questo è un cappello",
words:["است","کلاه","یک","این"],
answer:["این","یک","کلاه","است"]
},

{
type:"build-fa",
speak:"Questo è un vestito",
question:"ترجمه را بساز:",
text:"Questo è un vestito",
words:["است","لباس","یک","این"],
answer:["این","یک","لباس","است"]
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
