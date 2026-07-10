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
question:"lequel est maison ?",
speak:"maison",
options:[
{text:"chambre",image:"../../media/house/room.png"},
{text:"maison",image:"../../media/house/house.png"},
{text:"porte",image:"../../media/house/door.png"},
{text:"fenêtre",image:"../../media/house/window.png"}
],
answer:"maison"
},

{
type:"image",
question:"lequel est chambre ?",
speak:"chambre",
options:[
{text:"fenêtre",image:"../../media/house/window.png"},
{text:"chambre",image:"../../media/house/room.png"},
{text:"cuisine",image:"../../media/house/kitchen.png"},
{text:"maison",image:"../../media/house/house.png"}
],
answer:"chambre"
},

{
type:"image",
question:"lequel est porte ?",
speak:"porte",
options:[
{text:"maison",image:"../../media/house/house.png"},
{text:"porte",image:"../../media/house/door.png"},
{text:"fenêtre",image:"../../media/house/window.png"},
{text:"chambre",image:"../../media/house/room.png"}
],
answer:"porte"
},

{
type:"image",
question:"lequel est fenêtre ?",
speak:"fenêtre",
options:[
{text:"porte",image:"../../media/house/door.png"},
{text:"maison",image:"../../media/house/house.png"},
{text:"fenêtre",image:"../../media/house/window.png"},
{text:"chambre",image:"../../media/house/room.png"}
],
answer:"fenêtre"
},

{
type:"image",
question:"lequel est cuisine ?",
speak:"cuisine",
options:[
{text:"chambre",image:"../../media/house/room.png"},
{text:"fenêtre",image:"../../media/house/window.png"},
{text:"maison",image:"../../media/house/house.png"},
{text:"cuisine",image:"../../media/house/kitchen.png"}
],
answer:"cuisine"
},

/* WORD */

{
type:"word",
question:"Cette image représente quoi ?",
image:"../../media/house/house.png",
options:["chambre","maison","porte","fenêtre"],
answer:"maison"
},

{
type:"word",
question:"Cette image représente quoi ?",
image:"../../media/house/room.png",
options:["fenêtre","chambre","cuisine","maison"],
answer:"chambre"
},

{
type:"word",
question:"Cette image représente quoi ?",
image:"../../media/house/door.png",
options:["maison","porte","fenêtre","chambre"],
answer:"porte"
},

{
type:"word",
question:"Cette image représente quoi ?",
image:"../../media/house/window.png",
options:["porte","maison","fenêtre","chambre"],
answer:"fenêtre"
},

{
type:"word",
question:"Cette image représente quoi ?",
image:"../../media/house/kitchen.png",
options:["chambre","fenêtre","maison","cuisine"],
answer:"cuisine"
},

/* AUDIO */

{
type:"audio",
speak:"maison",
question:"Quel mot as-tu entendu ?",
options:["chambre","maison","porte","fenêtre"],
answer:"maison"
},

{
type:"audio",
speak:"chambre",
question:"Quel mot as-tu entendu ?",
options:["fenêtre","chambre","cuisine","maison"],
answer:"chambre"
},

{
type:"audio",
speak:"porte",
question:"Quel mot as-tu entendu ?",
options:["maison","porte","fenêtre","chambre"],
answer:"porte"
},

{
type:"audio",
speak:"fenêtre",
question:"Quel mot as-tu entendu ?",
options:["porte","maison","fenêtre","chambre"],
answer:"fenêtre"
},

{
type:"audio",
speak:"cuisine",
question:"Quel mot as-tu entendu ?",
options:["chambre","fenêtre","maison","cuisine"],
answer:"cuisine"
},

/* BUILD FR */

{
type:"build-fr",
speak:"C'est une maison",
question:"Construisez la phrase française :",
text:"این یک خانه است",
words:["maison","une","est","C'est"],
answer:["C'est","une","maison"]
},

{
type:"build-fr",
speak:"C'est une chambre",
question:"Construisez la phrase française :",
text:"این یک اتاق است",
words:["chambre","une","est","C'est"],
answer:["C'est","une","chambre"]
},

{
type:"build-fr",
speak:"C'est une porte",
question:"Construisez la phrase française :",
text:"این یک در است",
words:["porte","une","est","C'est"],
answer:["C'est","une","porte"]
},

{
type:"build-fr",
speak:"C'est une fenêtre",
question:"Construisez la phrase française :",
text:"این یک پنجره است",
words:["fenêtre","une","est","C'est"],
answer:["C'est","une","fenêtre"]
},

{
type:"build-fr",
speak:"C'est une cuisine",
question:"Construisez la phrase française :",
text:"این یک آشپزخانه است",
words:["cuisine","une","est","C'est"],
answer:["C'est","une","cuisine"]
},

/* BUILD FA */

{
type:"build-fa",
speak:"C'est une maison",
question:"ترجمه را بساز:",
text:"C'est une maison",
words:["است","خانه","یک","این"],
answer:["این","یک","خانه","است"]
},

{
type:"build-fa",
speak:"C'est une chambre",
question:"ترجمه را بساز:",
text:"C'est une chambre",
words:["است","اتاق","یک","این"],
answer:["این","یک","اتاق","است"]
},

{
type:"build-fa",
speak:"C'est une porte",
question:"ترجمه را بساز:",
text:"C'est une porte",
words:["است","در","یک","این"],
answer:["این","یک","در","است"]
},

{
type:"build-fa",
speak:"C'est une fenêtre",
question:"ترجمه را بساز:",
text:"C'est une fenêtre",
words:["است","پنجره","یک","این"],
answer:["این","یک","پنجره","است"]
},

{
type:"build-fa",
speak:"C'est une cuisine",
question:"ترجمه را بساز:",
text:"C'est une cuisine",
words:["است","آشپزخانه","یک","این"],
answer:["این","یک","آشپزخانه","است"]
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
