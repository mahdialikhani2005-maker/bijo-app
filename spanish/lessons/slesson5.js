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
question:"¿cuál es pan ?",
speak:"pan",
options:[
{text:"arroz",image:"../../media/food/rice.png"},
{text:"pan",image:"../../media/food/bread.png"},
{text:"carne",image:"../../media/food/meat.png"},
{text:"huevo",image:"../../media/food/egg.png"}
],
answer:"pan"
},

{
type:"image",
question:"¿cuál es arroz ?",
speak:"arroz",
options:[
{text:"huevo",image:"../../media/food/egg.png"},
{text:"arroz",image:"../../media/food/rice.png"},
{text:"leche",image:"../../media/food/milk.png"},
{text:"pan",image:"../../media/food/bread.png"}
],
answer:"arroz"
},

{
type:"image",
question:"¿cuál es carne ?",
speak:"carne",
options:[
{text:"pan",image:"../../media/food/bread.png"},
{text:"carne",image:"../../media/food/meat.png"},
{text:"leche",image:"../../media/food/milk.png"},
{text:"arroz",image:"../../media/food/rice.png"}
],
answer:"carne"
},

{
type:"image",
question:"¿cuál es huevo ?",
speak:"huevo",
options:[
{text:"carne",image:"../../media/food/meat.png"},
{text:"arroz",image:"../../media/food/rice.png"},
{text:"huevo",image:"../../media/food/egg.png"},
{text:"pan",image:"../../media/food/bread.png"}
],
answer:"huevo"
},

{
type:"image",
question:"¿cuál es leche ?",
speak:"leche",
options:[
{text:"huevo",image:"../../media/food/egg.png"},
{text:"pan",image:"../../media/food/bread.png"},
{text:"arroz",image:"../../media/food/rice.png"},
{text:"leche",image:"../../media/food/milk.png"}
],
answer:"leche"
},

/* WORD */

{
type:"word",
question:"¿Qué es esta imagen?",
image:"../../media/food/bread.png",
options:["arroz","pan","carne","huevo"],
answer:"pan"
},

{
type:"word",
question:"¿Qué es esta imagen?",
image:"../../media/food/rice.png",
options:["huevo","arroz","leche","pan"],
answer:"arroz"
},

{
type:"word",
question:"¿Qué es esta imagen?",
image:"../../media/food/meat.png",
options:["pan","carne","leche","arroz"],
answer:"carne"
},

{
type:"word",
question:"¿Qué es esta imagen?",
image:"../../media/food/egg.png",
options:["carne","arroz","huevo","pan"],
answer:"huevo"
},

{
type:"word",
question:"¿Qué es esta imagen?",
image:"../../media/food/milk.png",
options:["huevo","pan","arroz","leche"],
answer:"leche"
},

/* AUDIO */

{
type:"audio",
speak:"pan",
question:"¿Qué palabra escuchaste?",
options:["arroz","pan","carne","huevo"],
answer:"pan"
},

{
type:"audio",
speak:"arroz",
question:"¿Qué palabra escuchaste?",
options:["huevo","arroz","leche","pan"],
answer:"arroz"
},

{
type:"audio",
speak:"carne",
question:"¿Qué palabra escuchaste?",
options:["pan","carne","leche","arroz"],
answer:"carne"
},

{
type:"audio",
speak:"huevo",
question:"¿Qué palabra escuchaste?",
options:["carne","arroz","huevo","pan"],
answer:"huevo"
},

{
type:"audio",
speak:"leche",
question:"¿Qué palabra escuchaste?",
options:["huevo","pan","arroz","leche"],
answer:"leche"
},

/* BUILD ES */

{
type:"build-es",
speak:"Yo como pan",
question:"Construya la frase en español:",
text:"من نان می‌خورم",
words:["pan","como","Yo"],
answer:["Yo","como","pan"]
},

{
type:"build-es",
speak:"Yo como arroz",
question:"Construya la frase en español:",
text:"من برنج می‌خورم",
words:["arroz","como","Yo"],
answer:["Yo","como","arroz"]
},

{
type:"build-es",
speak:"Yo como carne",
question:"Construya la frase en español:",
text:"من گوشت می‌خورم",
words:["carne","como","Yo"],
answer:["Yo","como","carne"]
},

{
type:"build-es",
speak:"Yo como un huevo",
question:"Construya la frase en español:",
text:"من تخم‌مرغ می‌خورم",
words:["huevo","un","como","Yo"],
answer:["Yo","como","un","huevo"]
},

{
type:"build-es",
speak:"Yo bebo leche",
question:"Construya la frase en español:",
text:"من شیر می‌نوشم",
words:["leche","bebo","Yo"],
answer:["Yo","bebo","leche"]
},

/* BUILD FA */

{
type:"build-fa",
speak:"Yo como pan",
question:"ترجمه را بساز:",
text:"Yo como pan",
words:["می‌خورم","نان","من"],
answer:["من","نان","می‌خورم"]
},

{
type:"build-fa",
speak:"Yo como arroz",
question:"ترجمه را بساز:",
text:"Yo como arroz",
words:["می‌خورم","برنج","من"],
answer:["من","برنج","می‌خورم"]
},

{
type:"build-fa",
speak:"Yo como carne",
question:"ترجمه را بساز:",
text:"Yo como carne",
words:["می‌خورم","گوشت","من"],
answer:["من","گوشت","می‌خورم"]
},

{
type:"build-fa",
speak:"Yo como un huevo",
question:"ترجمه را بساز:",
text:"Yo como un huevo",
words:["می‌خورم","تخم‌مرغ","یک","من"],
answer:["من","یک","تخم‌مرغ","می‌خورم"]
},

{
type:"build-fa",
speak:"Yo bebo leche",
question:"ترجمه را بساز:",
text:"Yo bebo leche",
words:["می‌نوشم","شیر","من"],
answer:["من","شیر","می‌نوشم"]
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
