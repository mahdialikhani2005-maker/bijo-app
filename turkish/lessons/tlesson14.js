let current = 0;
let xp = 0;

function speak(text){
  if (!window.speechSynthesis) return;

  const utter = new SpeechSynthesisUtterance(text);
  utter.lang = "tr";
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
question:"hangisi öğretmen ?",
speak:"öğretmen",
options:[
{text:"doktor",image:"../../media/jobs/doctor.png"},
{text:"öğretmen",image:"../../media/jobs/teacher.png"},
{text:"mühendis",image:"../../media/jobs/engineer.png"},
{text:"öğrenci",image:"../../media/jobs/student.png"}
],
answer:"öğretmen"
},

{
type:"image",
question:"hangisi doktor ?",
speak:"doktor",
options:[
{text:"öğrenci",image:"../../media/jobs/student.png"},
{text:"doktor",image:"../../media/jobs/doctor.png"},
{text:"şoför",image:"../../media/jobs/driver.png"},
{text:"öğretmen",image:"../../media/jobs/teacher.png"}
],
answer:"doktor"
},

{
type:"image",
question:"hangisi mühendis ?",
speak:"mühendis",
options:[
{text:"öğretmen",image:"../../media/jobs/teacher.png"},
{text:"mühendis",image:"../../media/jobs/engineer.png"},
{text:"şoför",image:"../../media/jobs/driver.png"},
{text:"doktor",image:"../../media/jobs/doctor.png"}
],
answer:"mühendis"
},

{
type:"image",
question:"hangisi öğrenci ?",
speak:"öğrenci",
options:[
{text:"mühendis",image:"../../media/jobs/engineer.png"},
{text:"doktor",image:"../../media/jobs/doctor.png"},
{text:"öğrenci",image:"../../media/jobs/student.png"},
{text:"öğretmen",image:"../../media/jobs/teacher.png"}
],
answer:"öğrenci"
},

{
type:"image",
question:"hangisi şoför ?",
speak:"şoför",
options:[
{text:"öğrenci",image:"../../media/jobs/student.png"},
{text:"öğretmen",image:"../../media/jobs/teacher.png"},
{text:"doktor",image:"../../media/jobs/doctor.png"},
{text:"şoför",image:"../../media/jobs/driver.png"}
],
answer:"şoför"
},

/* WORD */

{
type:"word",
question:"Bu resim ne?",
image:"../../media/jobs/teacher.png",
options:["doktor","öğretmen","mühendis","öğrenci"],
answer:"öğretmen"
},

{
type:"word",
question:"Bu resim ne?",
image:"../../media/jobs/doctor.png",
options:["öğrenci","doktor","şoför","öğretmen"],
answer:"doktor"
},

{
type:"word",
question:"Bu resim ne?",
image:"../../media/jobs/engineer.png",
options:["öğretmen","mühendis","şoför","doktor"],
answer:"mühendis"
},

{
type:"word",
question:"Bu resim ne?",
image:"../../media/jobs/student.png",
options:["mühendis","doktor","öğrenci","öğretmen"],
answer:"öğrenci"
},

{
type:"word",
question:"Bu resim ne?",
image:"../../media/jobs/driver.png",
options:["öğrenci","öğretmen","doktor","şoför"],
answer:"şoför"
},

/* AUDIO */

{
type:"audio",
speak:"öğretmen",
question:"Hangi kelimeyi duydun?",
options:["doktor","öğretmen","mühendis","öğrenci"],
answer:"öğretmen"
},

{
type:"audio",
speak:"doktor",
question:"Hangi kelimeyi duydun?",
options:["öğrenci","doktor","şoför","öğretmen"],
answer:"doktor"
},

{
type:"audio",
speak:"mühendis",
question:"Hangi kelimeyi duydun?",
options:["öğretmen","mühendis","şoför","doktor"],
answer:"mühendis"
},

{
type:"audio",
speak:"öğrenci",
question:"Hangi kelimeyi duydun?",
options:["mühendis","doktor","öğrenci","öğretmen"],
answer:"öğrenci"
},

{
type:"audio",
speak:"şoför",
question:"Hangi kelimeyi duydun?",
options:["öğrenci","öğretmen","doktor","şoför"],
answer:"şoför"
},

/* BUILD TR */

{
type:"build-tr",
speak:"O bir öğretmen",
question:"Türkçe cümleyi kur:",
text:"او یک معلم است",
words:["öğretmen","bir","O"],
answer:["O","bir","öğretmen"]
},

{
type:"build-tr",
speak:"O bir doktor",
question:"Türkçe cümleyi kur:",
text:"او یک دکتر است",
words:["doktor","bir","O"],
answer:["O","bir","doktor"]
},

{
type:"build-tr",
speak:"O bir mühendis",
question:"Türkçe cümleyi kur:",
text:"او یک مهندس است",
words:["mühendis","bir","O"],
answer:["O","bir","mühendis"]
},

{
type:"build-tr",
speak:"Ben bir öğrenciyim",
question:"Türkçe cümleyi kur:",
text:"من یک دانش‌آموز هستم",
words:["öğrenciyim","Ben"],
answer:["Ben","öğrenciyim"]
},

{
type:"build-tr",
speak:"O bir şoför",
question:"Türkçe cümleyi kur:",
text:"او یک راننده است",
words:["şoför","bir","O"],
answer:["O","bir","şoför"]
},

/* BUILD FA */

{
type:"build-fa",
speak:"O bir öğretmen",
question:"ترجمه را بساز:",
text:"O bir öğretmen",
words:["است","معلم","او"],
answer:["او","معلم","است"]
},

{
type:"build-fa",
speak:"O bir doktor",
question:"ترجمه را بساز:",
text:"O bir doktor",
words:["است","دکتر","او"],
answer:["او","دکتر","است"]
},

{
type:"build-fa",
speak:"O bir mühendis",
question:"ترجمه را بساز:",
text:"O bir mühendis",
words:["است","مهندس","او"],
answer:["او","مهندس","است"]
},

{
type:"build-fa",
speak:"Ben bir öğrenciyim",
question:"ترجمه را بساز:",
text:"Ben bir öğrenciyim",
words:["هستم","دانش‌آموز","من"],
answer:["من","دانش‌آموز","هستم"]
},

{
type:"build-fa",
speak:"O bir şoför",
question:"ترجمه را بساز:",
text:"O bir şoför",
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
