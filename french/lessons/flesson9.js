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
question:"lequel est soleil ?",
speak:"soleil",
options:[
{text:"lune",image:"../../media/nature/moon.png"},
{text:"soleil",image:"../../media/nature/sun.png"},
{text:"étoile",image:"../../media/nature/star.png"},
{text:"ciel",image:"../../media/nature/sky.png"}
],
answer:"soleil"
},

{
type:"image",
question:"lequel est lune ?",
speak:"lune",
options:[
{text:"étoile",image:"../../media/nature/star.png"},
{text:"lune",image:"../../media/nature/moon.png"},
{text:"pluie",image:"../../media/nature/rain.png"},
{text:"soleil",image:"../../media/nature/sun.png"}
],
answer:"lune"
},

{
type:"image",
question:"lequel est étoile ?",
speak:"étoile",
options:[
{text:"soleil",image:"../../media/nature/sun.png"},
{text:"étoile",image:"../../media/nature/star.png"},
{text:"pluie",image:"../../media/nature/rain.png"},
{text:"lune",image:"../../media/nature/moon.png"}
],
answer:"étoile"
},

{
type:"image",
question:"lequel est ciel ?",
speak:"ciel",
options:[
{text:"étoile",image:"../../media/nature/star.png"},
{text:"lune",image:"../../media/nature/moon.png"},
{text:"ciel",image:"../../media/nature/sky.png"},
{text:"soleil",image:"../../media/nature/sun.png"}
],
answer:"ciel"
},

{
type:"image",
question:"lequel est pluie ?",
speak:"pluie",
options:[
{text:"ciel",image:"../../media/nature/sky.png"},
{text:"soleil",image:"../../media/nature/sun.png"},
{text:"lune",image:"../../media/nature/moon.png"},
{text:"pluie",image:"../../media/nature/rain.png"}
],
answer:"pluie"
},

/* WORD */

{
type:"word",
question:"Cette image représente quoi ?",
image:"../../media/nature/sun.png",
options:["lune","soleil","étoile","ciel"],
answer:"soleil"
},

{
type:"word",
question:"Cette image représente quoi ?",
image:"../../media/nature/moon.png",
options:["étoile","lune","pluie","soleil"],
answer:"lune"
},

{
type:"word",
question:"Cette image représente quoi ?",
image:"../../media/nature/star.png",
options:["soleil","étoile","pluie","lune"],
answer:"étoile"
},

{
type:"word",
question:"Cette image représente quoi ?",
image:"../../media/nature/sky.png",
options:["étoile","lune","ciel","soleil"],
answer:"ciel"
},

{
type:"word",
question:"Cette image représente quoi ?",
image:"../../media/nature/rain.png",
options:["ciel","soleil","lune","pluie"],
answer:"pluie"
},

/* AUDIO */

{
type:"audio",
speak:"soleil",
question:"Quel mot as-tu entendu ?",
options:["lune","soleil","étoile","ciel"],
answer:"soleil"
},

{
type:"audio",
speak:"lune",
question:"Quel mot as-tu entendu ?",
options:["étoile","lune","pluie","soleil"],
answer:"lune"
},

{
type:"audio",
speak:"étoile",
question:"Quel mot as-tu entendu ?",
options:["soleil","étoile","pluie","lune"],
answer:"étoile"
},

{
type:"audio",
speak:"ciel",
question:"Quel mot as-tu entendu ?",
options:["étoile","lune","ciel","soleil"],
answer:"ciel"
},

{
type:"audio",
speak:"pluie",
question:"Quel mot as-tu entendu ?",
options:["ciel","soleil","lune","pluie"],
answer:"pluie"
},

/* BUILD FR */

{
type:"build-fr",
speak:"Le soleil est grand",
question:"Construisez la phrase française :",
text:"خورشید بزرگ است",
words:["soleil","Le","grand","est"],
answer:["Le","soleil","est","grand"]
},

{
type:"build-fr",
speak:"La lune est petite",
question:"Construisez la phrase française :",
text:"ماه کوچک است",
words:["lune","La","petite","est"],
answer:["La","lune","est","petite"]
},

{
type:"build-fr",
speak:"L'étoile est brillante",
question:"Construisez la phrase française :",
text:"ستاره درخشان است",
words:["étoile","L'","brillante","est"],
answer:["L'","étoile","est","brillante"]
},

{
type:"build-fr",
speak:"Le ciel est bleu",
question:"Construisez la phrase française :",
text:"آسمان آبی است",
words:["ciel","Le","bleu","est"],
answer:["Le","ciel","est","bleu"]
},

{
type:"build-fr",
speak:"La pluie est froide",
question:"Construisez la phrase française :",
text:"باران سرد است",
words:["pluie","La","froide","est"],
answer:["La","pluie","est","froide"]
},

/* BUILD FA */

{
type:"build-fa",
speak:"Le soleil est grand",
question:"ترجمه را بساز:",
text:"Le soleil est grand",
words:["است","بزرگ","خورشید"],
answer:["خورشید","بزرگ","است"]
},

{
type:"build-fa",
speak:"La lune est petite",
question:"ترجمه را بساز:",
text:"La lune est petite",
words:["است","کوچک","ماه"],
answer:["ماه","کوچک","است"]
},

{
type:"build-fa",
speak:"L'étoile est brillante",
question:"ترجمه را بساز:",
text:"L'étoile est brillante",
words:["است","درخشان","ستاره"],
answer:["ستاره","درخشان","است"]
},

{
type:"build-fa",
speak:"Le ciel est bleu",
question:"ترجمه را بساز:",
text:"Le ciel est bleu",
words:["است","آبی","آسمان"],
answer:["آسمان","آبی","است"]
},

{
type:"build-fa",
speak:"La pluie est froide",
question:"ترجمه را بساز:",
text:"La pluie est froide",
words:["است","سرد","باران"],
answer:["باران","سرد","است"]
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
