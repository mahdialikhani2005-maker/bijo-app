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
question:"welches ist Lehrer ?",
speak:"Lehrer",
options:[
{text:"Arzt",image:"../../media/jobs/doctor.png"},
{text:"Lehrer",image:"../../media/jobs/teacher.png"},
{text:"Ingenieur",image:"../../media/jobs/engineer.png"},
{text:"Student",image:"../../media/jobs/student.png"}
],
answer:"Lehrer"
},

{
type:"image",
question:"welches ist Arzt ?",
speak:"Arzt",
options:[
{text:"Student",image:"../../media/jobs/student.png"},
{text:"Arzt",image:"../../media/jobs/doctor.png"},
{text:"Fahrer",image:"../../media/jobs/driver.png"},
{text:"Lehrer",image:"../../media/jobs/teacher.png"}
],
answer:"Arzt"
},

{
type:"image",
question:"welches ist Ingenieur ?",
speak:"Ingenieur",
options:[
{text:"Lehrer",image:"../../media/jobs/teacher.png"},
{text:"Ingenieur",image:"../../media/jobs/engineer.png"},
{text:"Fahrer",image:"../../media/jobs/driver.png"},
{text:"Arzt",image:"../../media/jobs/doctor.png"}
],
answer:"Ingenieur"
},

{
type:"image",
question:"welches ist Student ?",
speak:"Student",
options:[
{text:"Ingenieur",image:"../../media/jobs/engineer.png"},
{text:"Arzt",image:"../../media/jobs/doctor.png"},
{text:"Student",image:"../../media/jobs/student.png"},
{text:"Lehrer",image:"../../media/jobs/teacher.png"}
],
answer:"Student"
},

{
type:"image",
question:"welches ist Fahrer ?",
speak:"Fahrer",
options:[
{text:"Student",image:"../../media/jobs/student.png"},
{text:"Lehrer",image:"../../media/jobs/teacher.png"},
{text:"Arzt",image:"../../media/jobs/doctor.png"},
{text:"Fahrer",image:"../../media/jobs/driver.png"}
],
answer:"Fahrer"
},

/* WORD */

{
type:"word",
question:"Was ist das für ein Bild?",
image:"../../media/jobs/teacher.png",
options:["Arzt","Lehrer","Ingenieur","Student"],
answer:"Lehrer"
},

{
type:"word",
question:"Was ist das für ein Bild?",
image:"../../media/jobs/doctor.png",
options:["Student","Arzt","Fahrer","Lehrer"],
answer:"Arzt"
},

{
type:"word",
question:"Was ist das für ein Bild?",
image:"../../media/jobs/engineer.png",
options:["Lehrer","Ingenieur","Fahrer","Arzt"],
answer:"Ingenieur"
},

{
type:"word",
question:"Was ist das für ein Bild?",
image:"../../media/jobs/student.png",
options:["Ingenieur","Arzt","Student","Lehrer"],
answer:"Student"
},

{
type:"word",
question:"Was ist das für ein Bild?",
image:"../../media/jobs/driver.png",
options:["Student","Lehrer","Arzt","Fahrer"],
answer:"Fahrer"
},

/* AUDIO */

{
type:"audio",
speak:"Lehrer",
question:"Welches Wort hast du gehört?",
options:["Arzt","Lehrer","Ingenieur","Student"],
answer:"Lehrer"
},

{
type:"audio",
speak:"Arzt",
question:"Welches Wort hast du gehört?",
options:["Student","Arzt","Fahrer","Lehrer"],
answer:"Arzt"
},

{
type:"audio",
speak:"Ingenieur",
question:"Welches Wort hast du gehört?",
options:["Lehrer","Ingenieur","Fahrer","Arzt"],
answer:"Ingenieur"
},

{
type:"audio",
speak:"Student",
question:"Welches Wort hast du gehört?",
options:["Ingenieur","Arzt","Student","Lehrer"],
answer:"Student"
},

{
type:"audio",
speak:"Fahrer",
question:"Welches Wort hast du gehört?",
options:["Student","Lehrer","Arzt","Fahrer"],
answer:"Fahrer"
},

/* BUILD DE */

{
type:"build-de",
speak:"Sie ist Lehrerin",
question:"Bauen Sie den deutschen Satz:",
text:"او یک معلم است",
words:["Lehrerin","ist","Sie"],
answer:["Sie","ist","Lehrerin"]
},

{
type:"build-de",
speak:"Er ist Arzt",
question:"Bauen Sie den deutschen Satz:",
text:"او یک دکتر است",
words:["Arzt","ist","Er"],
answer:["Er","ist","Arzt"]
},

{
type:"build-de",
speak:"Sie ist Ingenieurin",
question:"Bauen Sie den deutschen Satz:",
text:"او یک مهندس است",
words:["Ingenieurin","ist","Sie"],
answer:["Sie","ist","Ingenieurin"]
},

{
type:"build-de",
speak:"Ich bin Student",
question:"Bauen Sie den deutschen Satz:",
text:"من یک دانش‌آموز هستم",
words:["Student","bin","Ich"],
answer:["Ich","bin","Student"]
},

{
type:"build-de",
speak:"Er ist Fahrer",
question:"Bauen Sie den deutschen Satz:",
text:"او یک راننده است",
words:["Fahrer","ist","Er"],
answer:["Er","ist","Fahrer"]
},

/* BUILD FA */

{
type:"build-fa",
speak:"Sie ist Lehrerin",
question:"ترجمه را بساز:",
text:"Sie ist Lehrerin",
words:["است","معلم","او"],
answer:["او","معلم","است"]
},

{
type:"build-fa",
speak:"Er ist Arzt",
question:"ترجمه را بساز:",
text:"Er ist Arzt",
words:["است","دکتر","او"],
answer:["او","دکتر","است"]
},

{
type:"build-fa",
speak:"Sie ist Ingenieurin",
question:"ترجمه را بساز:",
text:"Sie ist Ingenieurin",
words:["است","مهندس","او"],
answer:["او","مهندس","است"]
},

{
type:"build-fa",
speak:"Ich bin Student",
question:"ترجمه را بساز:",
text:"Ich bin Student",
words:["هستم","دانش‌آموز","من"],
answer:["من","دانش‌آموز","هستم"]
},

{
type:"build-fa",
speak:"Er ist Fahrer",
question:"ترجمه را بساز:",
text:"Er ist Fahrer",
words:["است","راننده","او"],
answer:["او","راننده","است"]
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
