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
question:"¿cuál es perro ?",
speak:"perro",
options:[
{text:"gato",image:"../../media/animals/cat.png"},
{text:"perro",image:"../../media/animals/dog.png"},
{text:"pájaro",image:"../../media/animals/bird.png"},
{text:"pez",image:"../../media/animals/fish.png"}
],
answer:"perro"
},

{
type:"image",
question:"¿cuál es gato ?",
speak:"gato",
options:[
{text:"pez",image:"../../media/animals/fish.png"},
{text:"gato",image:"../../media/animals/cat.png"},
{text:"caballo",image:"../../media/animals/horse.png"},
{text:"perro",image:"../../media/animals/dog.png"}
],
answer:"gato"
},

{
type:"image",
question:"¿cuál es pájaro ?",
speak:"pájaro",
options:[
{text:"perro",image:"../../media/animals/dog.png"},
{text:"pájaro",image:"../../media/animals/bird.png"},
{text:"caballo",image:"../../media/animals/horse.png"},
{text:"gato",image:"../../media/animals/cat.png"}
],
answer:"pájaro"
},

{
type:"image",
question:"¿cuál es pez ?",
speak:"pez",
options:[
{text:"pájaro",image:"../../media/animals/bird.png"},
{text:"gato",image:"../../media/animals/cat.png"},
{text:"pez",image:"../../media/animals/fish.png"},
{text:"perro",image:"../../media/animals/dog.png"}
],
answer:"pez"
},

{
type:"image",
question:"¿cuál es caballo ?",
speak:"caballo",
options:[
{text:"pez",image:"../../media/animals/fish.png"},
{text:"perro",image:"../../media/animals/dog.png"},
{text:"gato",image:"../../media/animals/cat.png"},
{text:"caballo",image:"../../media/animals/horse.png"}
],
answer:"caballo"
},

/* WORD */

{
type:"word",
question:"¿Qué es esta imagen?",
image:"../../media/animals/dog.png",
options:["gato","perro","pájaro","pez"],
answer:"perro"
},

{
type:"word",
question:"¿Qué es esta imagen?",
image:"../../media/animals/cat.png",
options:["pez","gato","caballo","perro"],
answer:"gato"
},

{
type:"word",
question:"¿Qué es esta imagen?",
image:"../../media/animals/bird.png",
options:["perro","pájaro","caballo","gato"],
answer:"pájaro"
},

{
type:"word",
question:"¿Qué es esta imagen?",
image:"../../media/animals/fish.png",
options:["pájaro","gato","pez","perro"],
answer:"pez"
},

{
type:"word",
question:"¿Qué es esta imagen?",
image:"../../media/animals/horse.png",
options:["pez","perro","gato","caballo"],
answer:"caballo"
},

/* AUDIO */

{
type:"audio",
speak:"perro",
question:"¿Qué palabra escuchaste?",
options:["gato","perro","pájaro","pez"],
answer:"perro"
},

{
type:"audio",
speak:"gato",
question:"¿Qué palabra escuchaste?",
options:["pez","gato","caballo","perro"],
answer:"gato"
},

{
type:"audio",
speak:"pájaro",
question:"¿Qué palabra escuchaste?",
options:["perro","pájaro","caballo","gato"],
answer:"pájaro"
},

{
type:"audio",
speak:"pez",
question:"¿Qué palabra escuchaste?",
options:["pájaro","gato","pez","perro"],
answer:"pez"
},

{
type:"audio",
speak:"caballo",
question:"¿Qué palabra escuchaste?",
options:["pez","perro","gato","caballo"],
answer:"caballo"
},

/* BUILD ES */

{
type:"build-es",
speak:"Este es un perro",
question:"Construya la frase en español:",
text:"این یک سگ است",
words:["perro","un","es","Este"],
answer:["Este","es","un","perro"]
},

{
type:"build-es",
speak:"Este es un gato",
question:"Construya la frase en español:",
text:"این یک گربه است",
words:["gato","un","es","Este"],
answer:["Este","es","un","gato"]
},

{
type:"build-es",
speak:"Este es un pájaro",
question:"Construya la frase en español:",
text:"این یک پرنده است",
words:["pájaro","un","es","Este"],
answer:["Este","es","un","pájaro"]
},

{
type:"build-es",
speak:"Este es un pez",
question:"Construya la frase en español:",
text:"این یک ماهی است",
words:["pez","un","es","Este"],
answer:["Este","es","un","pez"]
},

{
type:"build-es",
speak:"Este es un caballo",
question:"Construya la frase en español:",
text:"این یک اسب است",
words:["caballo","un","es","Este"],
answer:["Este","es","un","caballo"]
},

/* BUILD FA */

{
type:"build-fa",
speak:"Este es un perro",
question:"ترجمه را بساز:",
text:"Este es un perro",
words:["است","سگ","یک","این"],
answer:["این","یک","سگ","است"]
},

{
type:"build-fa",
speak:"Este es un gato",
question:"ترجمه را بساز:",
text:"Este es un gato",
words:["است","گربه","یک","این"],
answer:["این","یک","گربه","است"]
},

{
type:"build-fa",
speak:"Este es un pájaro",
question:"ترجمه را بساز:",
text:"Este es un pájaro",
words:["است","پرنده","یک","این"],
answer:["این","یک","پرنده","است"]
},

{
type:"build-fa",
speak:"Este es un pez",
question:"ترجمه را بساز:",
text:"Este es un pez",
words:["است","ماهی","یک","این"],
answer:["این","یک","ماهی","است"]
},

{
type:"build-fa",
speak:"Este es un caballo",
question:"ترجمه را بساز:",
text:"Este es un caballo",
words:["است","اسب","یک","این"],
answer:["این","یک","اسب","است"]
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
