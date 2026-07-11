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
question:"lequel est pomme ?",
speak:"pomme",
options:[
{text:"banane",image:"../../media/fruits/banana.png"},
{text:"pomme",image:"../../media/fruits/apple.png"},
{text:"orange",image:"../../media/fruits/orange.png"},
{text:"raisin",image:"../../media/fruits/grape.png"}
],
answer:"pomme"
},

{
type:"image",
question:"lequel est banane ?",
speak:"banane",
options:[
{text:"orange",image:"../../media/fruits/orange.png"},
{text:"banane",image:"../../media/fruits/banana.png"},
{text:"pastèque",image:"../../media/fruits/watermelon.png"},
{text:"pomme",image:"../../media/fruits/apple.png"}
],
answer:"banane"
},

{
type:"image",
question:"lequel est orange ?",
speak:"orange",
options:[
{text:"pomme",image:"../../media/fruits/apple.png"},
{text:"orange",image:"../../media/fruits/orange.png"},
{text:"raisin",image:"../../media/fruits/grape.png"},
{text:"banane",image:"../../media/fruits/banana.png"}
],
answer:"orange"
},

{
type:"image",
question:"lequel est raisin ?",
speak:"raisin",
options:[
{text:"orange",image:"../../media/fruits/orange.png"},
{text:"banane",image:"../../media/fruits/banana.png"},
{text:"raisin",image:"../../media/fruits/grape.png"},
{text:"pomme",image:"../../media/fruits/apple.png"}
],
answer:"raisin"
},

{
type:"image",
question:"lequel est pastèque ?",
speak:"pastèque",
options:[
{text:"raisin",image:"../../media/fruits/grape.png"},
{text:"pomme",image:"../../media/fruits/apple.png"},
{text:"banane",image:"../../media/fruits/banana.png"},
{text:"pastèque",image:"../../media/fruits/watermelon.png"}
],
answer:"pastèque"
},

/* WORD */

{
type:"word",
question:"Cette image représente quoi ?",
image:"../../media/fruits/apple.png",
options:["banane","pomme","orange","raisin"],
answer:"pomme"
},

{
type:"word",
question:"Cette image représente quoi ?",
image:"../../media/fruits/banana.png",
options:["orange","banane","pastèque","pomme"],
answer:"banane"
},

{
type:"word",
question:"Cette image représente quoi ?",
image:"../../media/fruits/orange.png",
options:["pomme","orange","raisin","banane"],
answer:"orange"
},

{
type:"word",
question:"Cette image représente quoi ?",
image:"../../media/fruits/grape.png",
options:["orange","banane","raisin","pomme"],
answer:"raisin"
},

{
type:"word",
question:"Cette image représente quoi ?",
image:"../../media/fruits/watermelon.png",
options:["raisin","pomme","banane","pastèque"],
answer:"pastèque"
},

/* AUDIO */

{
type:"audio",
speak:"pomme",
question:"Quel mot as-tu entendu ?",
options:["banane","pomme","orange","raisin"],
answer:"pomme"
},

{
type:"audio",
speak:"banane",
question:"Quel mot as-tu entendu ?",
options:["orange","banane","pastèque","pomme"],
answer:"banane"
},

{
type:"audio",
speak:"orange",
question:"Quel mot as-tu entendu ?",
options:["pomme","orange","raisin","banane"],
answer:"orange"
},

{
type:"audio",
speak:"raisin",
question:"Quel mot as-tu entendu ?",
options:["orange","banane","raisin","pomme"],
answer:"raisin"
},

{
type:"audio",
speak:"pastèque",
question:"Quel mot as-tu entendu ?",
options:["raisin","pomme","banane","pastèque"],
answer:"pastèque"
},

/* BUILD FR */

{
type:"build-fr",
speak:"Je mange une pomme",
question:"Construisez la phrase française :",
text:"من یک سیب می‌خورم",
words:["pomme","une","mange","Je"],
answer:["Je","mange","une","pomme"]
},

{
type:"build-fr",
speak:"Je mange une banane",
question:"Construisez la phrase française :",
text:"من یک موز می‌خورم",
words:["banane","une","mange","Je"],
answer:["Je","mange","une","banane"]
},

{
type:"build-fr",
speak:"Je mange une orange",
question:"Construisez la phrase française :",
text:"من یک پرتقال می‌خورم",
words:["orange","une","mange","Je"],
answer:["Je","mange","une","orange"]
},

{
type:"build-fr",
speak:"Je mange des raisins",
question:"Construisez la phrase française :",
text:"من انگور می‌خورم",
words:["raisins","des","mange","Je"],
answer:["Je","mange","des","raisins"]
},

{
type:"build-fr",
speak:"Je mange de la pastèque",
question:"Construisez la phrase française :",
text:"من هندوانه می‌خورم",
words:["pastèque","la","de","mange","Je"],
answer:["Je","mange","de","la","pastèque"]
},

/* BUILD FA */

{
type:"build-fa",
speak:"Je mange une pomme",
question:"ترجمه را بساز:",
text:"Je mange une pomme",
words:["می‌خورم","سیب","یک","من"],
answer:["من","یک","سیب","می‌خورم"]
},

{
type:"build-fa",
speak:"Je mange une banane",
question:"ترجمه را بساز:",
text:"Je mange une banane",
words:["می‌خورم","موز","یک","من"],
answer:["من","یک","موز","می‌خورم"]
},

{
type:"build-fa",
speak:"Je mange une orange",
question:"ترجمه را بساز:",
text:"Je mange une orange",
words:["می‌خورم","پرتقال","یک","من"],
answer:["من","یک","پرتقال","می‌خورم"]
},

{
type:"build-fa",
speak:"Je mange des raisins",
question:"ترجمه را بساز:",
text:"Je mange des raisins",
words:["می‌خورم","انگور","من"],
answer:["من","انگور","می‌خورم"]
},

{
type:"build-fa",
speak:"Je mange de la pastèque",
question:"ترجمه را بساز:",
text:"Je mange de la pastèque",
words:["می‌خورم","هندوانه","من"],
answer:["من","هندوانه","می‌خورم"]
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
