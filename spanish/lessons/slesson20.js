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
question:"¿cuál es quién ?",
speak:"quién",
options:[
{text:"qué",image:"../../media/questions/what.png"},
{text:"quién",image:"../../media/questions/who.png"},
{text:"dónde",image:"../../media/questions/where.png"},
{text:"cuándo",image:"../../media/questions/when.png"}
],
answer:"quién"
},

{
type:"image",
question:"¿cuál es qué ?",
speak:"qué",
options:[
{text:"por qué",image:"../../media/questions/why.png"},
{text:"qué",image:"../../media/questions/what.png"},
{text:"quién",image:"../../media/questions/who.png"},
{text:"dónde",image:"../../media/questions/where.png"}
],
answer:"qué"
},

{
type:"image",
question:"¿cuál es dónde ?",
speak:"dónde",
options:[
{text:"qué",image:"../../media/questions/what.png"},
{text:"dónde",image:"../../media/questions/where.png"},
{text:"por qué",image:"../../media/questions/why.png"},
{text:"quién",image:"../../media/questions/who.png"}
],
answer:"dónde"
},

{
type:"image",
question:"¿cuál es cuándo ?",
speak:"cuándo",
options:[
{text:"dónde",image:"../../media/questions/where.png"},
{text:"quién",image:"../../media/questions/who.png"},
{text:"cuándo",image:"../../media/questions/when.png"},
{text:"qué",image:"../../media/questions/what.png"}
],
answer:"cuándo"
},

{
type:"image",
question:"¿cuál es por qué ?",
speak:"por qué",
options:[
{text:"cuándo",image:"../../media/questions/when.png"},
{text:"qué",image:"../../media/questions/what.png"},
{text:"quién",image:"../../media/questions/who.png"},
{text:"por qué",image:"../../media/questions/why.png"}
],
answer:"por qué"
},

/* WORD */

{
type:"word",
question:"¿Qué es esta imagen?",
image:"../../media/questions/who.png",
options:["qué","quién","dónde","cuándo"],
answer:"quién"
},

{
type:"word",
question:"¿Qué es esta imagen?",
image:"../../media/questions/what.png",
options:["por qué","qué","quién","dónde"],
answer:"qué"
},

{
type:"word",
question:"¿Qué es esta imagen?",
image:"../../media/questions/where.png",
options:["qué","dónde","por qué","quién"],
answer:"dónde"
},

{
type:"word",
question:"¿Qué es esta imagen?",
image:"../../media/questions/when.png",
options:["dónde","quién","cuándo","qué"],
answer:"cuándo"
},

{
type:"word",
question:"¿Qué es esta imagen?",
image:"../../media/questions/why.png",
options:["cuándo","qué","quién","por qué"],
answer:"por qué"
},

/* AUDIO */

{
type:"audio",
speak:"quién",
question:"¿Qué palabra escuchaste?",
options:["qué","quién","dónde","cuándo"],
answer:"quién"
},

{
type:"audio",
speak:"qué",
question:"¿Qué palabra escuchaste?",
options:["por qué","qué","quién","dónde"],
answer:"qué"
},

{
type:"audio",
speak:"dónde",
question:"¿Qué palabra escuchaste?",
options:["qué","dónde","por qué","quién"],
answer:"dónde"
},

{
type:"audio",
speak:"cuándo",
question:"¿Qué palabra escuchaste?",
options:["dónde","quién","cuándo","qué"],
answer:"cuándo"
},

{
type:"audio",
speak:"por qué",
question:"¿Qué palabra escuchaste?",
options:["cuándo","qué","quién","por qué"],
answer:"por qué"
},

/* BUILD ES */

{
type:"build-es",
speak:"¿Quién es ella?",
question:"Construya la frase en español:",
text:"او کیست؟",
words:["Quién","ella","es"],
answer:["¿Quién","es","ella?"]
},

{
type:"build-es",
speak:"¿Qué es esto?",
question:"Construya la frase en español:",
text:"این چیست؟",
words:["Qué","esto","es"],
answer:["¿Qué","es","esto?"]
},

{
type:"build-es",
speak:"¿Dónde está la escuela?",
question:"Construya la frase en español:",
text:"مدرسه کجاست؟",
words:["Dónde","escuela","la","está"],
answer:["¿Dónde","está","la","escuela?"]
},

{
type:"build-es",
speak:"¿Cuándo es la clase?",
question:"Construya la frase en español:",
text:"کلاس کی است؟",
words:["Cuándo","clase","la","es"],
answer:["¿Cuándo","es","la","clase?"]
},

{
type:"build-es",
speak:"¿Por qué estás feliz?",
question:"Construya la frase en español:",
text:"چرا خوشحالی؟",
words:["Por","qué","feliz","estás"],
answer:["¿Por","qué","estás","feliz?"]
},

/* BUILD FA */

{
type:"build-fa",
speak:"¿Quién es ella?",
question:"ترجمه را بساز:",
text:"¿Quién es ella?",
words:["کیست","او"],
answer:["او","کیست؟"]
},

{
type:"build-fa",
speak:"¿Qué es esto?",
question:"ترجمه را بساز:",
text:"¿Qué es esto?",
words:["چیست","این"],
answer:["این","چیست؟"]
},

{
type:"build-fa",
speak:"¿Dónde está la escuela?",
question:"ترجمه را بساز:",
text:"¿Dónde está la escuela?",
words:["کجاست","مدرسه"],
answer:["مدرسه","کجاست؟"]
},

{
type:"build-fa",
speak:"¿Cuándo es la clase?",
question:"ترجمه را بساز:",
text:"¿Cuándo es la clase?",
words:["کیست","کلاس"],
answer:["کلاس","کیست؟"]
},

{
type:"build-fa",
speak:"¿Por qué estás feliz?",
question:"ترجمه را بساز:",
text:"¿Por qué estás feliz?",
words:["چرا","خوشحال","تو","هستی"],
answer:["تو","چرا","خوشحال","هستی؟"]
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
