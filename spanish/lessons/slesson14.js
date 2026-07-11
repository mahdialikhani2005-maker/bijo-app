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
question:"¿cuál es profesor ?",
speak:"profesor",
options:[
{text:"médico",image:"../../media/jobs/doctor.png"},
{text:"profesor",image:"../../media/jobs/teacher.png"},
{text:"ingeniero",image:"../../media/jobs/engineer.png"},
{text:"estudiante",image:"../../media/jobs/student.png"}
],
answer:"profesor"
},

{
type:"image",
question:"¿cuál es médico ?",
speak:"médico",
options:[
{text:"estudiante",image:"../../media/jobs/student.png"},
{text:"médico",image:"../../media/jobs/doctor.png"},
{text:"conductor",image:"../../media/jobs/driver.png"},
{text:"profesor",image:"../../media/jobs/teacher.png"}
],
answer:"médico"
},

{
type:"image",
question:"¿cuál es ingeniero ?",
speak:"ingeniero",
options:[
{text:"profesor",image:"../../media/jobs/teacher.png"},
{text:"ingeniero",image:"../../media/jobs/engineer.png"},
{text:"conductor",image:"../../media/jobs/driver.png"},
{text:"médico",image:"../../media/jobs/doctor.png"}
],
answer:"ingeniero"
},

{
type:"image",
question:"¿cuál es estudiante ?",
speak:"estudiante",
options:[
{text:"ingeniero",image:"../../media/jobs/engineer.png"},
{text:"médico",image:"../../media/jobs/doctor.png"},
{text:"estudiante",image:"../../media/jobs/student.png"},
{text:"profesor",image:"../../media/jobs/teacher.png"}
],
answer:"estudiante"
},

{
type:"image",
question:"¿cuál es conductor ?",
speak:"conductor",
options:[
{text:"estudiante",image:"../../media/jobs/student.png"},
{text:"profesor",image:"../../media/jobs/teacher.png"},
{text:"médico",image:"../../media/jobs/doctor.png"},
{text:"conductor",image:"../../media/jobs/driver.png"}
],
answer:"conductor"
},

/* WORD */

{
type:"word",
question:"¿Qué es esta imagen?",
image:"../../media/jobs/teacher.png",
options:["médico","profesor","ingeniero","estudiante"],
answer:"profesor"
},

{
type:"word",
question:"¿Qué es esta imagen?",
image:"../../media/jobs/doctor.png",
options:["estudiante","médico","conductor","profesor"],
answer:"médico"
},

{
type:"word",
question:"¿Qué es esta imagen?",
image:"../../media/jobs/engineer.png",
options:["profesor","ingeniero","conductor","médico"],
answer:"ingeniero"
},

{
type:"word",
question:"¿Qué es esta imagen?",
image:"../../media/jobs/student.png",
options:["ingeniero","médico","estudiante","profesor"],
answer:"estudiante"
},

{
type:"word",
question:"¿Qué es esta imagen?",
image:"../../media/jobs/driver.png",
options:["estudiante","profesor","médico","conductor"],
answer:"conductor"
},

/* AUDIO */

{
type:"audio",
speak:"profesor",
question:"¿Qué palabra escuchaste?",
options:["médico","profesor","ingeniero","estudiante"],
answer:"profesor"
},

{
type:"audio",
speak:"médico",
question:"¿Qué palabra escuchaste?",
options:["estudiante","médico","conductor","profesor"],
answer:"médico"
},

{
type:"audio",
speak:"ingeniero",
question:"¿Qué palabra escuchaste?",
options:["profesor","ingeniero","conductor","médico"],
answer:"ingeniero"
},

{
type:"audio",
speak:"estudiante",
question:"¿Qué palabra escuchaste?",
options:["ingeniero","médico","estudiante","profesor"],
answer:"estudiante"
},

{
type:"audio",
speak:"conductor",
question:"¿Qué palabra escuchaste?",
options:["estudiante","profesor","médico","conductor"],
answer:"conductor"
},

/* BUILD ES */

{
type:"build-es",
speak:"Ella es profesora",
question:"Construya la frase en español:",
text:"او یک معلم است",
words:["profesora","es","Ella"],
answer:["Ella","es","profesora"]
},

{
type:"build-es",
speak:"Él es médico",
question:"Construya la frase en español:",
text:"او یک دکتر است",
words:["médico","es","Él"],
answer:["Él","es","médico"]
},

{
type:"build-es",
speak:"Ella es ingeniera",
question:"Construya la frase en español:",
text:"او یک مهندس است",
words:["ingeniera","es","Ella"],
answer:["Ella","es","ingeniera"]
},

{
type:"build-es",
speak:"Yo soy estudiante",
question:"Construya la frase en español:",
text:"من یک دانش‌آموز هستم",
words:["estudiante","soy","Yo"],
answer:["Yo","soy","estudiante"]
},

{
type:"build-es",
speak:"Él es conductor",
question:"Construya la frase en español:",
text:"او یک راننده است",
words:["conductor","es","Él"],
answer:["Él","es","conductor"]
},

/* BUILD FA */

{
type:"build-fa",
speak:"Ella es profesora",
question:"ترجمه را بساز:",
text:"Ella es profesora",
words:["است","معلم","او"],
answer:["او","معلم","است"]
},

{
type:"build-fa",
speak:"Él es médico",
question:"ترجمه را بساز:",
text:"Él es médico",
words:["است","دکتر","او"],
answer:["او","دکتر","است"]
},

{
type:"build-fa",
speak:"Ella es ingeniera",
question:"ترجمه را بساز:",
text:"Ella es ingeniera",
words:["است","مهندس","او"],
answer:["او","مهندس","است"]
},

{
type:"build-fa",
speak:"Yo soy estudiante",
question:"ترجمه را بساز:",
text:"Yo soy estudiante",
words:["هستم","دانش‌آموز","من"],
answer:["من","دانش‌آموز","هستم"]
},

{
type:"build-fa",
speak:"Él es conductor",
question:"ترجمه را بساز:",
text:"Él es conductor",
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
