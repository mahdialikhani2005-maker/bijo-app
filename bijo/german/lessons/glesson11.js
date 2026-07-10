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
question:"welches ist rot ?",
speak:"rot",
options:[
{text:"blau",image:"../../media/colors/blue.png"},
{text:"rot",image:"../../media/colors/red.png"},
{text:"grün",image:"../../media/colors/green.png"},
{text:"gelb",image:"../../media/colors/yellow.png"}
],
answer:"rot"
},

{
type:"image",
question:"welches ist blau ?",
speak:"blau",
options:[
{text:"gelb",image:"../../media/colors/yellow.png"},
{text:"blau",image:"../../media/colors/blue.png"},
{text:"schwarz",image:"../../media/colors/black.png"},
{text:"rot",image:"../../media/colors/red.png"}
],
answer:"blau"
},

{
type:"image",
question:"welches ist grün ?",
speak:"grün",
options:[
{text:"rot",image:"../../media/colors/red.png"},
{text:"grün",image:"../../media/colors/green.png"},
{text:"schwarz",image:"../../media/colors/black.png"},
{text:"blau",image:"../../media/colors/blue.png"}
],
answer:"grün"
},

{
type:"image",
question:"welches ist gelb ?",
speak:"gelb",
options:[
{text:"grün",image:"../../media/colors/green.png"},
{text:"blau",image:"../../media/colors/blue.png"},
{text:"gelb",image:"../../media/colors/yellow.png"},
{text:"rot",image:"../../media/colors/red.png"}
],
answer:"gelb"
},

{
type:"image",
question:"welches ist schwarz ?",
speak:"schwarz",
options:[
{text:"gelb",image:"../../media/colors/yellow.png"},
{text:"rot",image:"../../media/colors/red.png"},
{text:"blau",image:"../../media/colors/blue.png"},
{text:"schwarz",image:"../../media/colors/black.png"}
],
answer:"schwarz"
},

/* WORD */

{
type:"word",
question:"Welche Farbe ist das?",
image:"../../media/colors/red.png",
options:["blau","rot","grün","gelb"],
answer:"rot"
},

{
type:"word",
question:"Welche Farbe ist das?",
image:"../../media/colors/blue.png",
options:["gelb","blau","schwarz","rot"],
answer:"blau"
},

{
type:"word",
question:"Welche Farbe ist das?",
image:"../../media/colors/green.png",
options:["rot","grün","schwarz","blau"],
answer:"grün"
},

{
type:"word",
question:"Welche Farbe ist das?",
image:"../../media/colors/yellow.png",
options:["grün","blau","gelb","rot"],
answer:"gelb"
},

{
type:"word",
question:"Welche Farbe ist das?",
image:"../../media/colors/black.png",
options:["gelb","rot","blau","schwarz"],
answer:"schwarz"
},

/* AUDIO */

{
type:"audio",
speak:"rot",
question:"Welches Wort hast du gehört?",
options:["blau","rot","grün","gelb"],
answer:"rot"
},

{
type:"audio",
speak:"blau",
question:"Welches Wort hast du gehört?",
options:["gelb","blau","schwarz","rot"],
answer:"blau"
},

{
type:"audio",
speak:"grün",
question:"Welches Wort hast du gehört?",
options:["rot","grün","schwarz","blau"],
answer:"grün"
},

{
type:"audio",
speak:"gelb",
question:"Welches Wort hast du gehört?",
options:["grün","blau","gelb","rot"],
answer:"gelb"
},

{
type:"audio",
speak:"schwarz",
question:"Welches Wort hast du gehört?",
options:["gelb","rot","blau","schwarz"],
answer:"schwarz"
},

/* BUILD DE */

{
type:"build-de",
speak:"Das ist rot",
question:"Bauen Sie den deutschen Satz:",
text:"این قرمز است",
words:["rot","ist","Das"],
answer:["Das","ist","rot"]
},

{
type:"build-de",
speak:"Das ist blau",
question:"Bauen Sie den deutschen Satz:",
text:"این آبی است",
words:["blau","ist","Das"],
answer:["Das","ist","blau"]
},

{
type:"build-de",
speak:"Das ist grün",
question:"Bauen Sie den deutschen Satz:",
text:"این سبز است",
words:["grün","ist","Das"],
answer:["Das","ist","grün"]
},

{
type:"build-de",
speak:"Das ist gelb",
question:"Bauen Sie den deutschen Satz:",
text:"این زرد است",
words:["gelb","ist","Das"],
answer:["Das","ist","gelb"]
},

{
type:"build-de",
speak:"Das ist schwarz",
question:"Bauen Sie den deutschen Satz:",
text:"این مشکی است",
words:["schwarz","ist","Das"],
answer:["Das","ist","schwarz"]
},

/* BUILD FA */

{
type:"build-fa",
speak:"Das ist rot",
question:"ترجمه را بساز:",
text:"Das ist rot",
words:["است","قرمز","این"],
answer:["این","قرمز","است"]
},

{
type:"build-fa",
speak:"Das ist blau",
question:"ترجمه را بساز:",
text:"Das ist blau",
words:["است","آبی","این"],
answer:["این","آبی","است"]
},

{
type:"build-fa",
speak:"Das ist grün",
question:"ترجمه را بساز:",
text:"Das ist grün",
words:["است","سبز","این"],
answer:["این","سبز","است"]
},

{
type:"build-fa",
speak:"Das ist gelb",
question:"ترجمه را بساز:",
text:"Das ist gelb",
words:["است","زرد","این"],
answer:["این","زرد","است"]
},

{
type:"build-fa",
speak:"Das ist schwarz",
question:"ترجمه را بساز:",
text:"Das ist schwarz",
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
