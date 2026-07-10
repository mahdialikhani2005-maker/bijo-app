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
question:"¿cuál es uno ?",
speak:"uno",
options:[
{text:"dos",image:"../../media/numbers/two.png"},
{text:"uno",image:"../../media/numbers/one.png"},
{text:"tres",image:"../../media/numbers/three.png"},
{text:"cuatro",image:"../../media/numbers/four.png"}
],
answer:"uno"
},

{
type:"image",
question:"¿cuál es dos ?",
speak:"dos",
options:[
{text:"cuatro",image:"../../media/numbers/four.png"},
{text:"dos",image:"../../media/numbers/two.png"},
{text:"cinco",image:"../../media/numbers/five.png"},
{text:"uno",image:"../../media/numbers/one.png"}
],
answer:"dos"
},

{
type:"image",
question:"¿cuál es tres ?",
speak:"tres",
options:[
{text:"uno",image:"../../media/numbers/one.png"},
{text:"tres",image:"../../media/numbers/three.png"},
{text:"cinco",image:"../../media/numbers/five.png"},
{text:"dos",image:"../../media/numbers/two.png"}
],
answer:"tres"
},

{
type:"image",
question:"¿cuál es cuatro ?",
speak:"cuatro",
options:[
{text:"tres",image:"../../media/numbers/three.png"},
{text:"dos",image:"../../media/numbers/two.png"},
{text:"cuatro",image:"../../media/numbers/four.png"},
{text:"uno",image:"../../media/numbers/one.png"}
],
answer:"cuatro"
},

{
type:"image",
question:"¿cuál es cinco ?",
speak:"cinco",
options:[
{text:"cuatro",image:"../../media/numbers/four.png"},
{text:"uno",image:"../../media/numbers/one.png"},
{text:"dos",image:"../../media/numbers/two.png"},
{text:"cinco",image:"../../media/numbers/five.png"}
],
answer:"cinco"
},

/* WORD */

{
type:"word",
question:"¿Qué número es esto?",
image:"../../media/numbers/one.png",
options:["dos","uno","tres","cuatro"],
answer:"uno"
},

{
type:"word",
question:"¿Qué número es esto?",
image:"../../media/numbers/two.png",
options:["cuatro","dos","cinco","uno"],
answer:"dos"
},

{
type:"word",
question:"¿Qué número es esto?",
image:"../../media/numbers/three.png",
options:["uno","tres","cinco","dos"],
answer:"tres"
},

{
type:"word",
question:"¿Qué número es esto?",
image:"../../media/numbers/four.png",
options:["tres","dos","cuatro","uno"],
answer:"cuatro"
},

{
type:"word",
question:"¿Qué número es esto?",
image:"../../media/numbers/five.png",
options:["cuatro","uno","dos","cinco"],
answer:"cinco"
},

/* AUDIO */

{
type:"audio",
speak:"uno",
question:"¿Qué palabra escuchaste?",
options:["dos","uno","tres","cuatro"],
answer:"uno"
},

{
type:"audio",
speak:"dos",
question:"¿Qué palabra escuchaste?",
options:["cuatro","dos","cinco","uno"],
answer:"dos"
},

{
type:"audio",
speak:"tres",
question:"¿Qué palabra escuchaste?",
options:["uno","tres","cinco","dos"],
answer:"tres"
},

{
type:"audio",
speak:"cuatro",
question:"¿Qué palabra escuchaste?",
options:["tres","dos","cuatro","uno"],
answer:"cuatro"
},

{
type:"audio",
speak:"cinco",
question:"¿Qué palabra escuchaste?",
options:["cuatro","uno","dos","cinco"],
answer:"cinco"
},

/* BUILD ES */

{
type:"build-es",
speak:"Tengo un libro",
question:"Construya la frase en español:",
text:"من یک کتاب دارم",
words:["un","libro","tengo","Yo"],
answer:["Yo","tengo","un","libro"]
},

{
type:"build-es",
speak:"Tengo dos libros",
question:"Construya la frase en español:",
text:"من دو کتاب دارم",
words:["dos","libros","tengo","Yo"],
answer:["Yo","tengo","dos","libros"]
},

{
type:"build-es",
speak:"Tengo tres libros",
question:"Construya la frase en español:",
text:"من سه کتاب دارم",
words:["tres","libros","tengo","Yo"],
answer:["Yo","tengo","tres","libros"]
},

{
type:"build-es",
speak:"Tengo cuatro libros",
question:"Construya la frase en español:",
text:"من چهار کتاب دارم",
words:["cuatro","libros","tengo","Yo"],
answer:["Yo","tengo","cuatro","libros"]
},

{
type:"build-es",
speak:"Tengo cinco libros",
question:"Construya la frase en español:",
text:"من پنج کتاب دارم",
words:["cinco","libros","tengo","Yo"],
answer:["Yo","tengo","cinco","libros"]
},

/* BUILD FA */

{
type:"build-fa",
speak:"Tengo un libro",
question:"ترجمه را بساز:",
text:"Tengo un libro",
words:["دارم","یک","کتاب","من"],
answer:["من","یک","کتاب","دارم"]
},

{
type:"build-fa",
speak:"Tengo dos libros",
question:"ترجمه را بساز:",
text:"Tengo dos libros",
words:["دارم","دو","کتاب","من"],
answer:["من","دو","کتاب","دارم"]
},

{
type:"build-fa",
speak:"Tengo tres libros",
question:"ترجمه را بساز:",
text:"Tengo tres libros",
words:["دارم","سه","کتاب","من"],
answer:["من","سه","کتاب","دارم"]
},

{
type:"build-fa",
speak:"Tengo cuatro libros",
question:"ترجمه را بساز:",
text:"Tengo cuatro libros",
words:["دارم","چهار","کتاب","من"],
answer:["من","چهار","کتاب","دارم"]
},

{
type:"build-fa",
speak:"Tengo cinco libros",
question:"ترجمه را بساز:",
text:"Tengo cinco libros",
words:["دارم","پنج","کتاب","من"],
answer:["من","پنج","کتاب","دارم"]
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
