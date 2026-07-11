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
question:"lequel est qui ?",
speak:"qui",
options:[
{text:"quoi",image:"../../media/questions/what.png"},
{text:"qui",image:"../../media/questions/who.png"},
{text:"où",image:"../../media/questions/where.png"},
{text:"quand",image:"../../media/questions/when.png"}
],
answer:"qui"
},

{
type:"image",
question:"lequel est quoi ?",
speak:"quoi",
options:[
{text:"pourquoi",image:"../../media/questions/why.png"},
{text:"quoi",image:"../../media/questions/what.png"},
{text:"qui",image:"../../media/questions/who.png"},
{text:"où",image:"../../media/questions/where.png"}
],
answer:"quoi"
},

{
type:"image",
question:"lequel est où ?",
speak:"où",
options:[
{text:"quoi",image:"../../media/questions/what.png"},
{text:"où",image:"../../media/questions/where.png"},
{text:"pourquoi",image:"../../media/questions/why.png"},
{text:"qui",image:"../../media/questions/who.png"}
],
answer:"où"
},

{
type:"image",
question:"lequel est quand ?",
speak:"quand",
options:[
{text:"où",image:"../../media/questions/where.png"},
{text:"qui",image:"../../media/questions/who.png"},
{text:"quand",image:"../../media/questions/when.png"},
{text:"quoi",image:"../../media/questions/what.png"}
],
answer:"quand"
},

{
type:"image",
question:"lequel est pourquoi ?",
speak:"pourquoi",
options:[
{text:"quand",image:"../../media/questions/when.png"},
{text:"quoi",image:"../../media/questions/what.png"},
{text:"qui",image:"../../media/questions/who.png"},
{text:"pourquoi",image:"../../media/questions/why.png"}
],
answer:"pourquoi"
},

/* WORD */

{
type:"word",
question:"Cette image représente quoi ?",
image:"../../media/questions/who.png",
options:["quoi","qui","où","quand"],
answer:"qui"
},

{
type:"word",
question:"Cette image représente quoi ?",
image:"../../media/questions/what.png",
options:["pourquoi","quoi","qui","où"],
answer:"quoi"
},

{
type:"word",
question:"Cette image représente quoi ?",
image:"../../media/questions/where.png",
options:["quoi","où","pourquoi","qui"],
answer:"où"
},

{
type:"word",
question:"Cette image représente quoi ?",
image:"../../media/questions/when.png",
options:["où","qui","quand","quoi"],
answer:"quand"
},

{
type:"word",
question:"Cette image représente quoi ?",
image:"../../media/questions/why.png",
options:["quand","quoi","qui","pourquoi"],
answer:"pourquoi"
},

/* AUDIO */

{
type:"audio",
speak:"qui",
question:"Quel mot as-tu entendu ?",
options:["quoi","qui","où","quand"],
answer:"qui"
},

{
type:"audio",
speak:"quoi",
question:"Quel mot as-tu entendu ?",
options:["pourquoi","quoi","qui","où"],
answer:"quoi"
},

{
type:"audio",
speak:"où",
question:"Quel mot as-tu entendu ?",
options:["quoi","où","pourquoi","qui"],
answer:"où"
},

{
type:"audio",
speak:"quand",
question:"Quel mot as-tu entendu ?",
options:["où","qui","quand","quoi"],
answer:"quand"
},

{
type:"audio",
speak:"pourquoi",
question:"Quel mot as-tu entendu ?",
options:["quand","quoi","qui","pourquoi"],
answer:"pourquoi"
},

/* BUILD FR */

{
type:"build-fr",
speak:"Qui est-elle ?",
question:"Construisez la phrase française :",
text:"او کیست؟",
words:["Qui","elle","est"],
answer:["Qui","est","elle"]
},

{
type:"build-fr",
speak:"Qu'est-ce que c'est ?",
question:"Construisez la phrase française :",
text:"این چیست؟",
words:["Qu'est-ce","c'est","que"],
answer:["Qu'est-ce","que","c'est"]
},

{
type:"build-fr",
speak:"Où est l'école ?",
question:"Construisez la phrase française :",
text:"مدرسه کجاست؟",
words:["Où","école","l'","est"],
answer:["Où","est","l'","école"]
},

{
type:"build-fr",
speak:"Quand est le cours ?",
question:"Construisez la phrase française :",
text:"کلاس کی است؟",
words:["Quand","cours","le","est"],
answer:["Quand","est","le","cours"]
},

{
type:"build-fr",
speak:"Pourquoi es-tu heureux ?",
question:"Construisez la phrase française :",
text:"چرا خوشحالی؟",
words:["Pourquoi","tu","heureux","es"],
answer:["Pourquoi","es","tu","heureux"]
},

/* BUILD FA */

{
type:"build-fa",
speak:"Qui est-elle ?",
question:"ترجمه را بساز:",
text:"Qui est-elle ?",
words:["کیست","او"],
answer:["او","کیست"]
},

{
type:"build-fa",
speak:"Qu'est-ce que c'est ?",
question:"ترجمه را بساز:",
text:"Qu'est-ce que c'est ?",
words:["چیست","این"],
answer:["این","چیست"]
},

{
type:"build-fa",
speak:"Où est l'école ?",
question:"ترجمه را بساز:",
text:"Où est l'école ?",
words:["کجاست","مدرسه"],
answer:["مدرسه","کجاست"]
},

{
type:"build-fa",
speak:"Quand est le cours ?",
question:"ترجمه را بساز:",
text:"Quand est le cours ?",
words:["کیست","کلاس"],
answer:["کلاس","کیست"]
},

{
type:"build-fa",
speak:"Pourquoi es-tu heureux ?",
question:"ترجمه را بساز:",
text:"Pourquoi es-tu heureux ?",
words:["چرا","خوشحال","تو","هستی"],
answer:["تو","چرا","خوشحال","هستی"]
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
