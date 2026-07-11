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
question:"lequel est homme ?",
speak:"homme",
options:[
{text:"femme",image:"../../media/people/woman.png"},
{text:"homme",image:"../../media/people/man.png"},
{text:"garçon",image:"../../media/people/boy.png"},
{text:"fille",image:"../../media/people/girl.png"}
],
answer:"homme"
},

{
type:"image",
question:"lequel est femme ?",
speak:"femme",
options:[
{text:"fille",image:"../../media/people/girl.png"},
{text:"femme",image:"../../media/people/woman.png"},
{text:"garçon",image:"../../media/people/boy.png"},
{text:"homme",image:"../../media/people/man.png"}
],
answer:"femme"
},

{
type:"image",
question:"lequel est garçon ?",
speak:"garçon",
options:[
{text:"homme",image:"../../media/people/man.png"},
{text:"garçon",image:"../../media/people/boy.png"},
{text:"bébé",image:"../../media/people/baby.png"},
{text:"fille",image:"../../media/people/girl.png"}
],
answer:"garçon"
},

{
type:"image",
question:"lequel est fille ?",
speak:"fille",
options:[
{text:"garçon",image:"../../media/people/boy.png"},
{text:"homme",image:"../../media/people/man.png"},
{text:"fille",image:"../../media/people/girl.png"},
{text:"bébé",image:"../../media/people/baby.png"}
],
answer:"fille"
},

{
type:"image",
question:"lequel est bébé ?",
speak:"bébé",
options:[
{text:"fille",image:"../../media/people/girl.png"},
{text:"garçon",image:"../../media/people/boy.png"},
{text:"homme",image:"../../media/people/man.png"},
{text:"bébé",image:"../../media/people/baby.png"}
],
answer:"bébé"
},

/* WORD */

{
type:"word",
question:"Cette image représente quoi ?",
image:"../../media/people/man.png",
options:["garçon","homme","femme","fille"],
answer:"homme"
},

{
type:"word",
question:"Cette image représente quoi ?",
image:"../../media/people/woman.png",
options:["femme","fille","bébé","homme"],
answer:"femme"
},

{
type:"word",
question:"Cette image représente quoi ?",
image:"../../media/people/boy.png",
options:["garçon","homme","bébé","fille"],
answer:"garçon"
},

{
type:"word",
question:"Cette image représente quoi ?",
image:"../../media/people/girl.png",
options:["fille","femme","garçon","bébé"],
answer:"fille"
},

{
type:"word",
question:"Cette image représente quoi ?",
image:"../../media/people/baby.png",
options:["bébé","garçon","fille","homme"],
answer:"bébé"
},

/* AUDIO */

{
type:"audio",
speak:"homme",
question:"Quel mot as-tu entendu ?",
options:["homme","garçon","femme","fille"],
answer:"homme"
},

{
type:"audio",
speak:"femme",
question:"Quel mot as-tu entendu ?",
options:["fille","femme","garçon","homme"],
answer:"femme"
},

{
type:"audio",
speak:"garçon",
question:"Quel mot as-tu entendu ?",
options:["garçon","homme","bébé","fille"],
answer:"garçon"
},

{
type:"audio",
speak:"fille",
question:"Quel mot as-tu entendu ?",
options:["garçon","femme","fille","bébé"],
answer:"fille"
},

{
type:"audio",
speak:"bébé",
question:"Quel mot as-tu entendu ?",
options:["bébé","garçon","homme","fille"],
answer:"bébé"
},

/* BUILD FR */

{
type:"build-fr",
speak:"Il est un homme",
question:"Construisez la phrase française :",
text:"او یک مرد است",
words:["homme","un","est","Il"],
answer:["Il","est","un","homme"]
},

{
type:"build-fr",
speak:"Elle est une femme",
question:"Construisez la phrase française :",
text:"او یک زن است",
words:["femme","une","est","Elle"],
answer:["Elle","est","une","femme"]
},

{
type:"build-fr",
speak:"Il est un garçon",
question:"Construisez la phrase française :",
text:"او یک پسر است",
words:["garçon","un","est","Il"],
answer:["Il","est","un","garçon"]
},

{
type:"build-fr",
speak:"Elle est une fille",
question:"Construisez la phrase française :",
text:"او یک دختر است",
words:["fille","une","est","Elle"],
answer:["Elle","est","une","fille"]
},

{
type:"build-fr",
speak:"Le bébé est petit",
question:"Construisez la phrase française :",
text:"نوزاد کوچک است",
words:["bébé","Le","petit","est"],
answer:["Le","bébé","est","petit"]
},

/* BUILD FA */

{
type:"build-fa",
speak:"Il est un homme",
question:"ترجمه را بساز:",
text:"Il est un homme",
words:["است","مرد","یک","او"],
answer:["او","یک","مرد","است"]
},

{
type:"build-fa",
speak:"Elle est une femme",
question:"ترجمه را بساز:",
text:"Elle est une femme",
words:["یک","است","زن","او"],
answer:["او","یک","زن","است"]
},

{
type:"build-fa",
speak:"Il est un garçon",
question:"ترجمه را بساز:",
text:"Il est un garçon",
words:["است","پسر","یک","او"],
answer:["او","یک","پسر","است"]
},

{
type:"build-fa",
speak:"Elle est une fille",
question:"ترجمه را بساز:",
text:"Elle est une fille",
words:["است","دختر","یک","او"],
answer:["او","یک","دختر","است"]
},

{
type:"build-fa",
speak:"Le bébé est petit",
question:"ترجمه را بساز:",
text:"Le bébé est petit",
words:["است","کوچک","نوزاد"],
answer:["نوزاد","کوچک","است"]
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
