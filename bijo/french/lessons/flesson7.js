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
question:"lequel est tomate ?",
speak:"tomate",
options:[
{text:"pomme de terre",image:"../../media/vegetables/potato.png"},
{text:"tomate",image:"../../media/vegetables/tomato.png"},
{text:"carotte",image:"../../media/vegetables/carrot.png"},
{text:"oignon",image:"../../media/vegetables/onion.png"}
],
answer:"tomate"
},

{
type:"image",
question:"lequel est pomme de terre ?",
speak:"pomme de terre",
options:[
{text:"oignon",image:"../../media/vegetables/onion.png"},
{text:"pomme de terre",image:"../../media/vegetables/potato.png"},
{text:"concombre",image:"../../media/vegetables/cucumber.png"},
{text:"tomate",image:"../../media/vegetables/tomato.png"}
],
answer:"pomme de terre"
},

{
type:"image",
question:"lequel est carotte ?",
speak:"carotte",
options:[
{text:"tomate",image:"../../media/vegetables/tomato.png"},
{text:"carotte",image:"../../media/vegetables/carrot.png"},
{text:"concombre",image:"../../media/vegetables/cucumber.png"},
{text:"pomme de terre",image:"../../media/vegetables/potato.png"}
],
answer:"carotte"
},

{
type:"image",
question:"lequel est oignon ?",
speak:"oignon",
options:[
{text:"carotte",image:"../../media/vegetables/carrot.png"},
{text:"pomme de terre",image:"../../media/vegetables/potato.png"},
{text:"oignon",image:"../../media/vegetables/onion.png"},
{text:"tomate",image:"../../media/vegetables/tomato.png"}
],
answer:"oignon"
},

{
type:"image",
question:"lequel est concombre ?",
speak:"concombre",
options:[
{text:"oignon",image:"../../media/vegetables/onion.png"},
{text:"tomate",image:"../../media/vegetables/tomato.png"},
{text:"pomme de terre",image:"../../media/vegetables/potato.png"},
{text:"concombre",image:"../../media/vegetables/cucumber.png"}
],
answer:"concombre"
},

/* WORD */

{
type:"word",
question:"Cette image représente quoi ?",
image:"../../media/vegetables/tomato.png",
options:["pomme de terre","tomate","carotte","oignon"],
answer:"tomate"
},

{
type:"word",
question:"Cette image représente quoi ?",
image:"../../media/vegetables/potato.png",
options:["oignon","pomme de terre","concombre","tomate"],
answer:"pomme de terre"
},

{
type:"word",
question:"Cette image représente quoi ?",
image:"../../media/vegetables/carrot.png",
options:["tomate","carotte","concombre","pomme de terre"],
answer:"carotte"
},

{
type:"word",
question:"Cette image représente quoi ?",
image:"../../media/vegetables/onion.png",
options:["carotte","pomme de terre","oignon","tomate"],
answer:"oignon"
},

{
type:"word",
question:"Cette image représente quoi ?",
image:"../../media/vegetables/cucumber.png",
options:["oignon","tomate","pomme de terre","concombre"],
answer:"concombre"
},

/* AUDIO */

{
type:"audio",
speak:"tomate",
question:"Quel mot as-tu entendu ?",
options:["pomme de terre","tomate","carotte","oignon"],
answer:"tomate"
},

{
type:"audio",
speak:"pomme de terre",
question:"Quel mot as-tu entendu ?",
options:["oignon","pomme de terre","concombre","tomate"],
answer:"pomme de terre"
},

{
type:"audio",
speak:"carotte",
question:"Quel mot as-tu entendu ?",
options:["tomate","carotte","concombre","pomme de terre"],
answer:"carotte"
},

{
type:"audio",
speak:"oignon",
question:"Quel mot as-tu entendu ?",
options:["carotte","pomme de terre","oignon","tomate"],
answer:"oignon"
},

{
type:"audio",
speak:"concombre",
question:"Quel mot as-tu entendu ?",
options:["oignon","tomate","pomme de terre","concombre"],
answer:"concombre"
},

/* BUILD FR */

{
type:"build-fr",
speak:"C'est une tomate",
question:"Construisez la phrase française :",
text:"این یک گوجه است",
words:["tomate","une","est","C'est"],
answer:["C'est","une","tomate"]
},

{
type:"build-fr",
speak:"C'est une pomme de terre",
question:"Construisez la phrase française :",
text:"این یک سیب‌زمینی است",
words:["pomme","terre","de","une","est","C'est"],
answer:["C'est","une","pomme","de","terre"]
},

{
type:"build-fr",
speak:"C'est une carotte",
question:"Construisez la phrase française :",
text:"این یک هویج است",
words:["carotte","une","est","C'est"],
answer:["C'est","une","carotte"]
},

{
type:"build-fr",
speak:"C'est un oignon",
question:"Construisez la phrase française :",
text:"این یک پیاز است",
words:["oignon","un","est","C'est"],
answer:["C'est","un","oignon"]
},

{
type:"build-fr",
speak:"C'est un concombre",
question:"Construisez la phrase française :",
text:"این یک خیار است",
words:["concombre","un","est","C'est"],
answer:["C'est","un","concombre"]
},

/* BUILD FA */

{
type:"build-fa",
speak:"C'est une tomate",
question:"ترجمه را بساز:",
text:"C'est une tomate",
words:["است","گوجه","یک","این"],
answer:["این","یک","گوجه","است"]
},

{
type:"build-fa",
speak:"C'est une pomme de terre",
question:"ترجمه را بساز:",
text:"C'est une pomme de terre",
words:["است","سیب‌زمینی","یک","این"],
answer:["این","یک","سیب‌زمینی","است"]
},

{
type:"build-fa",
speak:"C'est une carotte",
question:"ترجمه را بساز:",
text:"C'est une carotte",
words:["است","هویج","یک","این"],
answer:["این","یک","هویج","است"]
},

{
type:"build-fa",
speak:"C'est un oignon",
question:"ترجمه را بساز:",
text:"C'est un oignon",
words:["است","پیاز","یک","این"],
answer:["این","یک","پیاز","است"]
},

{
type:"build-fa",
speak:"C'est un concombre",
question:"ترجمه را بساز:",
text:"C'est un concombre",
words:["است","خیار","یک","این"],
answer:["این","یک","خیار","است"]
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
