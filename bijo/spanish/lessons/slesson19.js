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
question:"¿cuál es grande ?",
speak:"grande",
options:[
{text:"pequeño",image:"../../media/adjectives/small.png"},
{text:"grande",image:"../../media/adjectives/big.png"},
{text:"alto",image:"../../media/adjectives/tall.png"},
{text:"bajo",image:"../../media/adjectives/short.png"}
],
answer:"grande"
},

{
type:"image",
question:"¿cuál es pequeño ?",
speak:"pequeño",
options:[
{text:"hermoso",image:"../../media/adjectives/beautiful.png"},
{text:"pequeño",image:"../../media/adjectives/small.png"},
{text:"grande",image:"../../media/adjectives/big.png"},
{text:"alto",image:"../../media/adjectives/tall.png"}
],
answer:"pequeño"
},

{
type:"image",
question:"¿cuál es alto ?",
speak:"alto",
options:[
{text:"grande",image:"../../media/adjectives/big.png"},
{text:"alto",image:"../../media/adjectives/tall.png"},
{text:"hermoso",image:"../../media/adjectives/beautiful.png"},
{text:"pequeño",image:"../../media/adjectives/small.png"}
],
answer:"alto"
},

{
type:"image",
question:"¿cuál es bajo ?",
speak:"bajo",
options:[
{text:"alto",image:"../../media/adjectives/tall.png"},
{text:"pequeño",image:"../../media/adjectives/small.png"},
{text:"bajo",image:"../../media/adjectives/short.png"},
{text:"grande",image:"../../media/adjectives/big.png"}
],
answer:"bajo"
},

{
type:"image",
question:"¿cuál es hermoso ?",
speak:"hermoso",
options:[
{text:"bajo",image:"../../media/adjectives/short.png"},
{text:"grande",image:"../../media/adjectives/big.png"},
{text:"pequeño",image:"../../media/adjectives/small.png"},
{text:"hermoso",image:"../../media/adjectives/beautiful.png"}
],
answer:"hermoso"
},

/* WORD */

{
type:"word",
question:"¿Qué es esta imagen?",
image:"../../media/adjectives/big.png",
options:["pequeño","grande","alto","bajo"],
answer:"grande"
},

{
type:"word",
question:"¿Qué es esta imagen?",
image:"../../media/adjectives/small.png",
options:["hermoso","pequeño","grande","alto"],
answer:"pequeño"
},

{
type:"word",
question:"¿Qué es esta imagen?",
image:"../../media/adjectives/tall.png",
options:["grande","alto","hermoso","pequeño"],
answer:"alto"
},

{
type:"word",
question:"¿Qué es esta imagen?",
image:"../../media/adjectives/short.png",
options:["alto","pequeño","bajo","grande"],
answer:"bajo"
},

{
type:"word",
question:"¿Qué es esta imagen?",
image:"../../media/adjectives/beautiful.png",
options:["bajo","grande","pequeño","hermoso"],
answer:"hermoso"
},

/* AUDIO */

{
type:"audio",
speak:"grande",
question:"¿Qué palabra escuchaste?",
options:["pequeño","grande","alto","bajo"],
answer:"grande"
},

{
type:"audio",
speak:"pequeño",
question:"¿Qué palabra escuchaste?",
options:["hermoso","pequeño","grande","alto"],
answer:"pequeño"
},

{
type:"audio",
speak:"alto",
question:"¿Qué palabra escuchaste?",
options:["grande","alto","hermoso","pequeño"],
answer:"alto"
},

{
type:"audio",
speak:"bajo",
question:"¿Qué palabra escuchaste?",
options:["alto","pequeño","bajo","grande"],
answer:"bajo"
},

{
type:"audio",
speak:"hermoso",
question:"¿Qué palabra escuchaste?",
options:["bajo","grande","pequeño","hermoso"],
answer:"hermoso"
},

/* BUILD ES */

{
type:"build-es",
speak:"El perro es grande",
question:"Construya la frase en español:",
text:"سگ بزرگ است",
words:["perro","El","grande","es"],
answer:["El","perro","es","grande"]
},

{
type:"build-es",
speak:"El gato es pequeño",
question:"Construya la frase en español:",
text:"گربه کوچک است",
words:["gato","El","pequeño","es"],
answer:["El","gato","es","pequeño"]
},

{
type:"build-es",
speak:"Él es alto",
question:"Construya la frase en español:",
text:"او بلند است",
words:["alto","es","Él"],
answer:["Él","es","alto"]
},

{
type:"build-es",
speak:"Ella es baja",
question:"Construya la frase en español:",
text:"او کوتاه است",
words:["baja","es","Ella"],
answer:["Ella","es","baja"]
},

{
type:"build-es",
speak:"Ella es hermosa",
question:"Construya la frase en español:",
text:"او زیبا است",
words:["hermosa","es","Ella"],
answer:["Ella","es","hermosa"]
},

/* BUILD FA */

{
type:"build-fa",
speak:"El perro es grande",
question:"ترجمه را بساز:",
text:"El perro es grande",
words:["است","بزرگ","سگ"],
answer:["سگ","بزرگ","است"]
},

{
type:"build-fa",
speak:"El gato es pequeño",
question:"ترجمه را بساز:",
text:"El gato es pequeño",
words:["است","کوچک","گربه"],
answer:["گربه","کوچک","است"]
},

{
type:"build-fa",
speak:"Él es alto",
question:"ترجمه را بساز:",
text:"Él es alto",
words:["است","بلند","او"],
answer:["او","بلند","است"]
},

{
type:"build-fa",
speak:"Ella es baja",
question:"ترجمه را بساز:",
text:"Ella es baja",
words:["است","کوتاه","او"],
answer:["او","کوتاه","است"]
},

{
type:"build-fa",
speak:"Ella es hermosa",
question:"ترجمه را بساز:",
text:"Ella es hermosa",
words:["است","زیبا","او"],
answer:["او","زیبا","است"]
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
