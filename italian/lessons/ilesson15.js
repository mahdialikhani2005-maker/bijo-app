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
question:"qual è macchina ?",
speak:"macchina",
options:[
{text:"autobus",image:"../../media/vehicles/bus.png"},
{text:"macchina",image:"../../media/vehicles/car.png"},
{text:"treno",image:"../../media/vehicles/train.png"},
{text:"aereo",image:"../../media/vehicles/airplane.png"}
],
answer:"macchina"
},

{
type:"image",
question:"qual è autobus ?",
speak:"autobus",
options:[
{text:"aereo",image:"../../media/vehicles/airplane.png"},
{text:"autobus",image:"../../media/vehicles/bus.png"},
{text:"bicicletta",image:"../../media/vehicles/bicycle.png"},
{text:"macchina",image:"../../media/vehicles/car.png"}
],
answer:"autobus"
},

{
type:"image",
question:"qual è treno ?",
speak:"treno",
options:[
{text:"macchina",image:"../../media/vehicles/car.png"},
{text:"treno",image:"../../media/vehicles/train.png"},
{text:"bicicletta",image:"../../media/vehicles/bicycle.png"},
{text:"autobus",image:"../../media/vehicles/bus.png"}
],
answer:"treno"
},

{
type:"image",
question:"qual è aereo ?",
speak:"aereo",
options:[
{text:"treno",image:"../../media/vehicles/train.png"},
{text:"autobus",image:"../../media/vehicles/bus.png"},
{text:"aereo",image:"../../media/vehicles/airplane.png"},
{text:"macchina",image:"../../media/vehicles/car.png"}
],
answer:"aereo"
},

{
type:"image",
question:"qual è bicicletta ?",
speak:"bicicletta",
options:[
{text:"aereo",image:"../../media/vehicles/airplane.png"},
{text:"macchina",image:"../../media/vehicles/car.png"},
{text:"autobus",image:"../../media/vehicles/bus.png"},
{text:"bicicletta",image:"../../media/vehicles/bicycle.png"}
],
answer:"bicicletta"
},

/* WORD */

{
type:"word",
question:"Che immagine è?",
image:"../../media/vehicles/car.png",
options:["autobus","macchina","treno","aereo"],
answer:"macchina"
},

{
type:"word",
question:"Che immagine è?",
image:"../../media/vehicles/bus.png",
options:["aereo","autobus","bicicletta","macchina"],
answer:"autobus"
},

{
type:"word",
question:"Che immagine è?",
image:"../../media/vehicles/train.png",
options:["macchina","treno","bicicletta","autobus"],
answer:"treno"
},

{
type:"word",
question:"Che immagine è?",
image:"../../media/vehicles/airplane.png",
options:["treno","autobus","aereo","macchina"],
answer:"aereo"
},

{
type:"word",
question:"Che immagine è?",
image:"../../media/vehicles/bicycle.png",
options:["aereo","macchina","autobus","bicicletta"],
answer:"bicicletta"
},

/* AUDIO */

{
type:"audio",
speak:"macchina",
question:"Che parola hai sentito?",
options:["autobus","macchina","treno","aereo"],
answer:"macchina"
},

{
type:"audio",
speak:"autobus",
question:"Che parola hai sentito?",
options:["aereo","autobus","bicicletta","macchina"],
answer:"autobus"
},

{
type:"audio",
speak:"treno",
question:"Che parola hai sentito?",
options:["macchina","treno","bicicletta","autobus"],
answer:"treno"
},

{
type:"audio",
speak:"aereo",
question:"Che parola hai sentito?",
options:["treno","autobus","aereo","macchina"],
answer:"aereo"
},

{
type:"audio",
speak:"bicicletta",
question:"Che parola hai sentito?",
options:["aereo","macchina","autobus","bicicletta"],
answer:"bicicletta"
},

/* BUILD IT */

{
type:"build-it",
speak:"Ho una macchina",
question:"Costruisci la frase in italiano:",
text:"من یک ماشین دارم",
words:["macchina","una","ho","Io"],
answer:["Io","ho","una","macchina"]
},

{
type:"build-it",
speak:"Ho un autobus",
question:"Costruisci la frase in italiano:",
text:"من یک اتوبوس دارم",
words:["autobus","un","ho","Io"],
answer:["Io","ho","un","autobus"]
},

{
type:"build-it",
speak:"Ho un treno",
question:"Costruisci la frase in italiano:",
text:"من یک قطار دارم",
words:["treno","un","ho","Io"],
answer:["Io","ho","un","treno"]
},

{
type:"build-it",
speak:"Ho un aereo",
question:"Costruisci la frase in italiano:",
text:"من یک هواپیما دارم",
words:["aereo","un","ho","Io"],
answer:["Io","ho","un","aereo"]
},

{
type:"build-it",
speak:"Ho una bicicletta",
question:"Costruisci la frase in italiano:",
text:"من یک دوچرخه دارم",
words:["bicicletta","una","ho","Io"],
answer:["Io","ho","una","bicicletta"]
},

/* BUILD FA */

{
type:"build-fa",
speak:"Ho una macchina",
question:"ترجمه را بساز:",
text:"Ho una macchina",
words:["دارم","ماشین","یک","من"],
answer:["من","یک","ماشین","دارم"]
},

{
type:"build-fa",
speak:"Ho un autobus",
question:"ترجمه را بساز:",
text:"Ho un autobus",
words:["دارم","اتوبوس","یک","من"],
answer:["من","یک","اتوبوس","دارم"]
},

{
type:"build-fa",
speak:"Ho un treno",
question:"ترجمه را بساز:",
text:"Ho un treno",
words:["دارم","قطار","یک","من"],
answer:["من","یک","قطار","دارم"]
},

{
type:"build-fa",
speak:"Ho un aereo",
question:"ترجمه را بساز:",
text:"Ho un aereo",
words:["دارم","هواپیما","یک","من"],
answer:["من","یک","هواپیما","دارم"]
},

{
type:"build-fa",
speak:"Ho una bicicletta",
question:"ترجمه را بساز:",
text:"Ho una bicicletta",
words:["دارم","دوچرخه","یک","من"],
answer:["من","یک","دوچرخه","دارم"]
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
