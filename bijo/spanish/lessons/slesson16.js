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
question:"¿cuál es escuela ?",
speak:"escuela",
options:[
{text:"hospital",image:"../../media/places/hospital.png"},
{text:"escuela",image:"../../media/places/school.png"},
{text:"tienda",image:"../../media/places/store.png"},
{text:"parque",image:"../../media/places/park.png"}
],
answer:"escuela"
},

{
type:"image",
question:"¿cuál es hospital ?",
speak:"hospital",
options:[
{text:"parque",image:"../../media/places/park.png"},
{text:"hospital",image:"../../media/places/hospital.png"},
{text:"mezquita",image:"../../media/places/mosque.png"},
{text:"escuela",image:"../../media/places/school.png"}
],
answer:"hospital"
},

{
type:"image",
question:"¿cuál es tienda ?",
speak:"tienda",
options:[
{text:"escuela",image:"../../media/places/school.png"},
{text:"tienda",image:"../../media/places/store.png"},
{text:"mezquita",image:"../../media/places/mosque.png"},
{text:"hospital",image:"../../media/places/hospital.png"}
],
answer:"tienda"
},

{
type:"image",
question:"¿cuál es parque ?",
speak:"parque",
options:[
{text:"tienda",image:"../../media/places/store.png"},
{text:"hospital",image:"../../media/places/hospital.png"},
{text:"parque",image:"../../media/places/park.png"},
{text:"escuela",image:"../../media/places/school.png"}
],
answer:"parque"
},

{
type:"image",
question:"¿cuál es mezquita ?",
speak:"mezquita",
options:[
{text:"parque",image:"../../media/places/park.png"},
{text:"escuela",image:"../../media/places/school.png"},
{text:"hospital",image:"../../media/places/hospital.png"},
{text:"mezquita",image:"../../media/places/mosque.png"}
],
answer:"mezquita"
},

/* WORD */

{
type:"word",
question:"¿Qué es esta imagen?",
image:"../../media/places/school.png",
options:["hospital","escuela","tienda","parque"],
answer:"escuela"
},

{
type:"word",
question:"¿Qué es esta imagen?",
image:"../../media/places/hospital.png",
options:["parque","hospital","mezquita","escuela"],
answer:"hospital"
},

{
type:"word",
question:"¿Qué es esta imagen?",
image:"../../media/places/store.png",
options:["escuela","tienda","mezquita","hospital"],
answer:"tienda"
},

{
type:"word",
question:"¿Qué es esta imagen?",
image:"../../media/places/park.png",
options:["tienda","hospital","parque","escuela"],
answer:"parque"
},

{
type:"word",
question:"¿Qué es esta imagen?",
image:"../../media/places/mosque.png",
options:["parque","escuela","hospital","mezquita"],
answer:"mezquita"
},

/* AUDIO */

{
type:"audio",
speak:"escuela",
question:"¿Qué palabra escuchaste?",
options:["hospital","escuela","tienda","parque"],
answer:"escuela"
},

{
type:"audio",
speak:"hospital",
question:"¿Qué palabra escuchaste?",
options:["parque","hospital","mezquita","escuela"],
answer:"hospital"
},

{
type:"audio",
speak:"tienda",
question:"¿Qué palabra escuchaste?",
options:["escuela","tienda","mezquita","hospital"],
answer:"tienda"
},

{
type:"audio",
speak:"parque",
question:"¿Qué palabra escuchaste?",
options:["tienda","hospital","parque","escuela"],
answer:"parque"
},

{
type:"audio",
speak:"mezquita",
question:"¿Qué palabra escuchaste?",
options:["parque","escuela","hospital","mezquita"],
answer:"mezquita"
},

/* BUILD ES */

{
type:"build-es",
speak:"Esta es una escuela",
question:"Construya la frase en español:",
text:"این یک مدرسه است",
words:["escuela","una","es","Esta"],
answer:["Esta","es","una","escuela"]
},

{
type:"build-es",
speak:"Este es un hospital",
question:"Construya la frase en español:",
text:"این یک بیمارستان است",
words:["hospital","un","es","Este"],
answer:["Este","es","un","hospital"]
},

{
type:"build-es",
speak:"Esta es una tienda",
question:"Construya la frase en español:",
text:"این یک فروشگاه است",
words:["tienda","una","es","Esta"],
answer:["Esta","es","una","tienda"]
},

{
type:"build-es",
speak:"Este es un parque",
question:"Construya la frase en español:",
text:"این یک پارک است",
words:["parque","un","es","Este"],
answer:["Este","es","un","parque"]
},

{
type:"build-es",
speak:"Esta es una mezquita",
question:"Construya la frase en español:",
text:"این یک مسجد است",
words:["mezquita","una","es","Esta"],
answer:["Esta","es","una","mezquita"]
},

/* BUILD FA */

{
type:"build-fa",
speak:"Esta es una escuela",
question:"ترجمه را بساز:",
text:"Esta es una escuela",
words:["است","مدرسه","یک","این"],
answer:["این","یک","مدرسه","است"]
},

{
type:"build-fa",
speak:"Este es un hospital",
question:"ترجمه را بساز:",
text:"Este es un hospital",
words:["است","بیمارستان","یک","این"],
answer:["این","یک","بیمارستان","است"]
},

{
type:"build-fa",
speak:"Esta es una tienda",
question:"ترجمه را بساز:",
text:"Esta es una tienda",
words:["است","فروشگاه","یک","این"],
answer:["این","یک","فروشگاه","است"]
},

{
type:"build-fa",
speak:"Este es un parque",
question:"ترجمه را بساز:",
text:"Este es un parque",
words:["است","پارک","یک","این"],
answer:["این","یک","پارک","است"]
},

{
type:"build-fa",
speak:"Esta es una mezquita",
question:"ترجمه را بساز:",
text:"Esta es una mezquita",
words:["است","مسجد","یک","این"],
answer:["این","یک","مسجد","است"]
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
