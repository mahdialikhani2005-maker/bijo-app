let current = 0;
let xp = 0;

function speak(text){
  if (!window.speechSynthesis) return;

  const utter = new SpeechSynthesisUtterance(text);
  utter.lang = "it";
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
question:"qual è oggi ?",
speak:"oggi",
options:[
{text:"domani",image:"../../media/time/tomorrow.png"},
{text:"oggi",image:"../../media/time/today.png"},
{text:"ieri",image:"../../media/time/yesterday.png"},
{text:"mattino",image:"../../media/time/morning.png"}
],
answer:"oggi"
},

{
type:"image",
question:"qual è domani ?",
speak:"domani",
options:[
{text:"notte",image:"../../media/time/night.png"},
{text:"domani",image:"../../media/time/tomorrow.png"},
{text:"oggi",image:"../../media/time/today.png"},
{text:"ieri",image:"../../media/time/yesterday.png"}
],
answer:"domani"
},

{
type:"image",
question:"qual è ieri ?",
speak:"ieri",
options:[
{text:"oggi",image:"../../media/time/today.png"},
{text:"ieri",image:"../../media/time/yesterday.png"},
{text:"notte",image:"../../media/time/night.png"},
{text:"domani",image:"../../media/time/tomorrow.png"}
],
answer:"ieri"
},

{
type:"image",
question:"qual è mattino ?",
speak:"mattino",
options:[
{text:"ieri",image:"../../media/time/yesterday.png"},
{text:"domani",image:"../../media/time/tomorrow.png"},
{text:"mattino",image:"../../media/time/morning.png"},
{text:"oggi",image:"../../media/time/today.png"}
],
answer:"mattino"
},

{
type:"image",
question:"qual è notte ?",
speak:"notte",
options:[
{text:"mattino",image:"../../media/time/morning.png"},
{text:"oggi",image:"../../media/time/today.png"},
{text:"domani",image:"../../media/time/tomorrow.png"},
{text:"notte",image:"../../media/time/night.png"}
],
answer:"notte"
},

/* WORD */

{
type:"word",
question:"Che immagine è?",
image:"../../media/time/today.png",
options:["domani","oggi","ieri","mattino"],
answer:"oggi"
},

{
type:"word",
question:"Che immagine è?",
image:"../../media/time/tomorrow.png",
options:["notte","domani","oggi","ieri"],
answer:"domani"
},

{
type:"word",
question:"Che immagine è?",
image:"../../media/time/yesterday.png",
options:["oggi","ieri","notte","domani"],
answer:"ieri"
},

{
type:"word",
question:"Che immagine è?",
image:"../../media/time/morning.png",
options:["ieri","domani","mattino","oggi"],
answer:"mattino"
},

{
type:"word",
question:"Che immagine è?",
image:"../../media/time/night.png",
options:["mattino","oggi","domani","notte"],
answer:"notte"
},

/* AUDIO */

{
type:"audio",
speak:"oggi",
question:"Che parola hai sentito?",
options:["domani","oggi","ieri","mattino"],
answer:"oggi"
},

{
type:"audio",
speak:"domani",
question:"Che parola hai sentito?",
options:["notte","domani","oggi","ieri"],
answer:"domani"
},

{
type:"audio",
speak:"ieri",
question:"Che parola hai sentito?",
options:["oggi","ieri","notte","domani"],
answer:"ieri"
},

{
type:"audio",
speak:"mattino",
question:"Che parola hai sentito?",
options:["ieri","domani","mattino","oggi"],
answer:"mattino"
},

{
type:"audio",
speak:"notte",
question:"Che parola hai sentito?",
options:["mattino","oggi","domani","notte"],
answer:"notte"
},

/* BUILD IT */

{
type:"build-it",
speak:"Oggi è lunedì",
question:"Costruisci la frase in italiano:",
text:"امروز دوشنبه است",
words:["è","oggi","lunedì"],
answer:["Oggi","è","lunedì"]
},

{
type:"build-it",
speak:"Domani è martedì",
question:"Costruisci la frase in italiano:",
text:"فردا سه‌شنبه است",
words:["Domani","è","martedì"],
answer:["Domani","è","martedì"]
},

{
type:"build-it",
speak:"Ieri era domenica",
question:"Costruisci la frase in italiano:",
text:"دیروز یک‌شنبه بود",
words:["era","Ieri","domenica"],
answer:["Ieri","era","domenica"]
},

{
type:"build-it",
speak:"Buongiorno",
question:"Costruisci la frase in italiano:",
text:"صبح بخیر",
words:["Buongiorno"],
answer:["Buongiorno"]
},

{
type:"build-it",
speak:"Buonanotte",
question:"Costruisci la frase in italiano:",
text:"شب بخیر",
words:["Buonanotte"],
answer:["Buonanotte"]
},

/* BUILD FA */

{
type:"build-fa",
speak:"Oggi è lunedì",
question:"ترجمه را بساز:",
text:"Oggi è lunedì",
words:["است","دوشنبه","امروز"],
answer:["امروز","دوشنبه","است"]
},

{
type:"build-fa",
speak:"Domani è martedì",
question:"ترجمه را بساز:",
text:"Domani è martedì",
words:["است","سه‌شنبه","فردا"],
answer:["فردا","سه‌شنبه","است"]
},

{
type:"build-fa",
speak:"Ieri era domenica",
question:"ترجمه را بساز:",
text:"Ieri era domenica",
words:["بود","یک‌شنبه","دیروز"],
answer:["دیروز","یک‌شنبه","بود"]
},

{
type:"build-fa",
speak:"Buongiorno",
question:"ترجمه را بساز:",
text:"Buongiorno",
words:["بخیر","صبح"],
answer:["صبح","بخیر"]
},

{
type:"build-fa",
speak:"Buonanotte",
question:"ترجمه را بساز:",
text:"Buonanotte",
words:["بخیر","شب"],
answer:["شب","بخیر"]
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
