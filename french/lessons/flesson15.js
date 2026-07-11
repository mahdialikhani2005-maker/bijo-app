let current = 0;
let xp = 0;

function speak(text){
  if (!window.speechSynthesis) return;

  const utter = new SpeechSynthesisUtterance(text);
  utter.lang = "fr";
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
question:"lequel est voiture ?",
speak:"voiture",
options:[
{text:"bus",image:"../../media/vehicles/bus.png"},
{text:"voiture",image:"../../media/vehicles/car.png"},
{text:"train",image:"../../media/vehicles/train.png"},
{text:"avion",image:"../../media/vehicles/airplane.png"}
],
answer:"voiture"
},

{
type:"image",
question:"lequel est bus ?",
speak:"bus",
options:[
{text:"avion",image:"../../media/vehicles/airplane.png"},
{text:"bus",image:"../../media/vehicles/bus.png"},
{text:"vélo",image:"../../media/vehicles/bicycle.png"},
{text:"voiture",image:"../../media/vehicles/car.png"}
],
answer:"bus"
},

{
type:"image",
question:"lequel est train ?",
speak:"train",
options:[
{text:"voiture",image:"../../media/vehicles/car.png"},
{text:"train",image:"../../media/vehicles/train.png"},
{text:"vélo",image:"../../media/vehicles/bicycle.png"},
{text:"bus",image:"../../media/vehicles/bus.png"}
],
answer:"train"
},

{
type:"image",
question:"lequel est avion ?",
speak:"avion",
options:[
{text:"train",image:"../../media/vehicles/train.png"},
{text:"bus",image:"../../media/vehicles/bus.png"},
{text:"avion",image:"../../media/vehicles/airplane.png"},
{text:"voiture",image:"../../media/vehicles/car.png"}
],
answer:"avion"
},

{
type:"image",
question:"lequel est vélo ?",
speak:"vélo",
options:[
{text:"avion",image:"../../media/vehicles/airplane.png"},
{text:"voiture",image:"../../media/vehicles/car.png"},
{text:"bus",image:"../../media/vehicles/bus.png"},
{text:"vélo",image:"../../media/vehicles/bicycle.png"}
],
answer:"vélo"
},

/* WORD */

{
type:"word",
question:"Cette image représente quoi ?",
image:"../../media/vehicles/car.png",
options:["bus","voiture","train","avion"],
answer:"voiture"
},

{
type:"word",
question:"Cette image représente quoi ?",
image:"../../media/vehicles/bus.png",
options:["avion","bus","vélo","voiture"],
answer:"bus"
},

{
type:"word",
question:"Cette image représente quoi ?",
image:"../../media/vehicles/train.png",
options:["voiture","train","vélo","bus"],
answer:"train"
},

{
type:"word",
question:"Cette image représente quoi ?",
image:"../../media/vehicles/airplane.png",
options:["train","bus","avion","voiture"],
answer:"avion"
},

{
type:"word",
question:"Cette image représente quoi ?",
image:"../../media/vehicles/bicycle.png",
options:["avion","voiture","bus","vélo"],
answer:"vélo"
},

/* AUDIO */

{
type:"audio",
speak:"voiture",
question:"Quel mot as-tu entendu ?",
options:["bus","voiture","train","avion"],
answer:"voiture"
},

{
type:"audio",
speak:"bus",
question:"Quel mot as-tu entendu ?",
options:["avion","bus","vélo","voiture"],
answer:"bus"
},

{
type:"audio",
speak:"train",
question:"Quel mot as-tu entendu ?",
options:["voiture","train","vélo","bus"],
answer:"train"
},

{
type:"audio",
speak:"avion",
question:"Quel mot as-tu entendu ?",
options:["train","bus","avion","voiture"],
answer:"avion"
},

{
type:"audio",
speak:"vélo",
question:"Quel mot as-tu entendu ?",
options:["avion","voiture","bus","vélo"],
answer:"vélo"
},

/* BUILD FR */

{
type:"build-fr",
speak:"J'ai une voiture",
question:"Construisez la phrase française :",
text:"من یک ماشین دارم",
words:["voiture","une","ai","J'"],
answer:["J'","ai","une","voiture"]
},

{
type:"build-fr",
speak:"J'ai un bus",
question:"Construisez la phrase française :",
text:"من یک اتوبوس دارم",
words:["bus","un","ai","J'"],
answer:["J'","ai","un","bus"]
},

{
type:"build-fr",
speak:"J'ai un train",
question:"Construisez la phrase française :",
text:"من یک قطار دارم",
words:["train","un","ai","J'"],
answer:["J'","ai","un","train"]
},

{
type:"build-fr",
speak:"J'ai un avion",
question:"Construisez la phrase française :",
text:"من یک هواپیما دارم",
words:["avion","un","ai","J'"],
answer:["J'","ai","un","avion"]
},

{
type:"build-fr",
speak:"J'ai un vélo",
question:"Construisez la phrase française :",
text:"من یک دوچرخه دارم",
words:["vélo","un","ai","J'"],
answer:["J'","ai","un","vélo"]
},

/* BUILD FA */

{
type:"build-fa",
speak:"J'ai une voiture",
question:"ترجمه را بساز:",
text:"J'ai une voiture",
words:["دارم","ماشین","یک","من"],
answer:["من","یک","ماشین","دارم"]
},

{
type:"build-fa",
speak:"J'ai un bus",
question:"ترجمه را بساز:",
text:"J'ai un bus",
words:["دارم","اتوبوس","یک","من"],
answer:["من","یک","اتوبوس","دارم"]
},

{
type:"build-fa",
speak:"J'ai un train",
question:"ترجمه را بساز:",
text:"J'ai un train",
words:["دارم","قطار","یک","من"],
answer:["من","یک","قطار","دارم"]
},

{
type:"build-fa",
speak:"J'ai un avion",
question:"ترجمه را بساز:",
text:"J'ai un avion",
words:["دارم","هواپیما","یک","من"],
answer:["من","یک","هواپیما","دارم"]
},

{
type:"build-fa",
speak:"J'ai un vélo",
question:"ترجمه را بساز:",
text:"J'ai un vélo",
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

 else if (q.type === "build-en" || q.type === "build-fr" || q.type === "build-fa") {
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

  if (q.type === "build-en" || q.type === "build-fr") {
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
