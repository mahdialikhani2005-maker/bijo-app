let current = 0;
let xp = 0;

function speak(text){
  if (!window.speechSynthesis) return;

  const utter = new SpeechSynthesisUtterance(text);
  utter.lang = "ru";
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
question:"какой из них учитель ?",
speak:"учитель",
options:[
{text:"врач",image:"../../media/jobs/doctor.png"},
{text:"учитель",image:"../../media/jobs/teacher.png"},
{text:"инженер",image:"../../media/jobs/engineer.png"},
{text:"студент",image:"../../media/jobs/student.png"}
],
answer:"учитель"
},

{
type:"image",
question:"какой из них врач ?",
speak:"врач",
options:[
{text:"студент",image:"../../media/jobs/student.png"},
{text:"врач",image:"../../media/jobs/doctor.png"},
{text:"водитель",image:"../../media/jobs/driver.png"},
{text:"учитель",image:"../../media/jobs/teacher.png"}
],
answer:"врач"
},

{
type:"image",
question:"какой из них инженер ?",
speak:"инженер",
options:[
{text:"учитель",image:"../../media/jobs/teacher.png"},
{text:"инженер",image:"../../media/jobs/engineer.png"},
{text:"водитель",image:"../../media/jobs/driver.png"},
{text:"врач",image:"../../media/jobs/doctor.png"}
],
answer:"инженер"
},

{
type:"image",
question:"какой из них студент ?",
speak:"студент",
options:[
{text:"инженер",image:"../../media/jobs/engineer.png"},
{text:"врач",image:"../../media/jobs/doctor.png"},
{text:"студент",image:"../../media/jobs/student.png"},
{text:"учитель",image:"../../media/jobs/teacher.png"}
],
answer:"студент"
},

{
type:"image",
question:"какой из них водитель ?",
speak:"водитель",
options:[
{text:"студент",image:"../../media/jobs/student.png"},
{text:"учитель",image:"../../media/jobs/teacher.png"},
{text:"врач",image:"../../media/jobs/doctor.png"},
{text:"водитель",image:"../../media/jobs/driver.png"}
],
answer:"водитель"
},

/* WORD */

{
type:"word",
question:"Что это за изображение?",
image:"../../media/jobs/teacher.png",
options:["врач","учитель","инженер","студент"],
answer:"учитель"
},

{
type:"word",
question:"Что это за изображение?",
image:"../../media/jobs/doctor.png",
options:["студент","врач","водитель","учитель"],
answer:"врач"
},

{
type:"word",
question:"Что это за изображение?",
image:"../../media/jobs/engineer.png",
options:["учитель","инженер","водитель","врач"],
answer:"инженер"
},

{
type:"word",
question:"Что это за изображение?",
image:"../../media/jobs/student.png",
options:["инженер","врач","студент","учитель"],
answer:"студент"
},

{
type:"word",
question:"Что это за изображение?",
image:"../../media/jobs/driver.png",
options:["студент","учитель","врач","водитель"],
answer:"водитель"
},

/* AUDIO */

{
type:"audio",
speak:"учитель",
question:"Какое слово ты услышал?",
options:["врач","учитель","инженер","студент"],
answer:"учитель"
},

{
type:"audio",
speak:"врач",
question:"Какое слово ты услышал?",
options:["студент","врач","водитель","учитель"],
answer:"врач"
},

{
type:"audio",
speak:"инженер",
question:"Какое слово ты услышал?",
options:["учитель","инженер","водитель","врач"],
answer:"инженер"
},

{
type:"audio",
speak:"студент",
question:"Какое слово ты услышал?",
options:["инженер","врач","студент","учитель"],
answer:"студент"
},

{
type:"audio",
speak:"водитель",
question:"Какое слово ты услышал?",
options:["студент","учитель","врач","водитель"],
answer:"водитель"
},

/* BUILD RU */

{
type:"build-ru",
speak:"Она учитель",
question:"Составьте русское предложение:",
text:"او یک معلم است",
words:["учитель","Она"],
answer:["Она","учитель"]
},

{
type:"build-ru",
speak:"Он врач",
question:"Составьте русское предложение:",
text:"او یک دکتر است",
words:["врач","Он"],
answer:["Он","врач"]
},

{
type:"build-ru",
speak:"Она инженер",
question:"Составьте русское предложение:",
text:"او یک مهندس است",
words:["инженер","Она"],
answer:["Она","инженер"]
},

{
type:"build-ru",
speak:"Я студент",
question:"Составьте русское предложение:",
text:"من یک دانش‌آموز هستم",
words:["студент","Я"],
answer:["Я","студент"]
},

{
type:"build-ru",
speak:"Он водитель",
question:"Составьте русское предложение:",
text:"او یک راننده است",
words:["водитель","Он"],
answer:["Он","водитель"]
},

/* BUILD FA */

{
type:"build-fa",
speak:"Она учитель",
question:"ترجمه را بساز:",
text:"Она учитель",
words:["است","معلم","او"],
answer:["او","معلم","است"]
},

{
type:"build-fa",
speak:"Он врач",
question:"ترجمه را بساز:",
text:"Он врач",
words:["است","دکتر","او"],
answer:["او","دکتر","است"]
},

{
type:"build-fa",
speak:"Она инженер",
question:"ترجمه را بساز:",
text:"Она инженер",
words:["است","مهندس","او"],
answer:["او","مهندس","است"]
},

{
type:"build-fa",
speak:"Я студент",
question:"ترجمه را بساز:",
text:"Я студент",
words:["هستم","دانش‌آموز","من"],
answer:["من","دانش‌آموز","هستم"]
},

{
type:"build-fa",
speak:"Он водитель",
question:"ترجمه را بساز:",
text:"Он водитель",
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
