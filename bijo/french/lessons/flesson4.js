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
question:"lequel est chemise ?",
speak:"chemise",
options:[
{text:"pantalon",image:"../../media/clothes/pants.png"},
{text:"chemise",image:"../../media/clothes/shirt.png"},
{text:"chapeau",image:"../../media/clothes/hat.png"},
{text:"robe",image:"../../media/clothes/dress.png"}
],
answer:"chemise"
},

{
type:"image",
question:"lequel est pantalon ?",
speak:"pantalon",
options:[
{text:"robe",image:"../../media/clothes/dress.png"},
{text:"pantalon",image:"../../media/clothes/pants.png"},
{text:"chaussures",image:"../../media/clothes/shoes.png"},
{text:"chemise",image:"../../media/clothes/shirt.png"}
],
answer:"pantalon"
},

{
type:"image",
question:"lequel est chaussures ?",
speak:"chaussures",
options:[
{text:"chemise",image:"../../media/clothes/shirt.png"},
{text:"chaussures",image:"../../media/clothes/shoes.png"},
{text:"chapeau",image:"../../media/clothes/hat.png"},
{text:"pantalon",image:"../../media/clothes/pants.png"}
],
answer:"chaussures"
},

{
type:"image",
question:"lequel est chapeau ?",
speak:"chapeau",
options:[
{text:"chaussures",image:"../../media/clothes/shoes.png"},
{text:"pantalon",image:"../../media/clothes/pants.png"},
{text:"chapeau",image:"../../media/clothes/hat.png"},
{text:"chemise",image:"../../media/clothes/shirt.png"}
],
answer:"chapeau"
},

{
type:"image",
question:"lequel est robe ?",
speak:"robe",
options:[
{text:"chapeau",image:"../../media/clothes/hat.png"},
{text:"chemise",image:"../../media/clothes/shirt.png"},
{text:"pantalon",image:"../../media/clothes/pants.png"},
{text:"robe",image:"../../media/clothes/dress.png"}
],
answer:"robe"
},

/* WORD */

{
type:"word",
question:"Cette image représente quoi ?",
image:"../../media/clothes/shirt.png",
options:["pantalon","chemise","chapeau","robe"],
answer:"chemise"
},

{
type:"word",
question:"Cette image représente quoi ?",
image:"../../media/clothes/pants.png",
options:["robe","pantalon","chaussures","chemise"],
answer:"pantalon"
},

{
type:"word",
question:"Cette image représente quoi ?",
image:"../../media/clothes/shoes.png",
options:["chemise","chaussures","chapeau","pantalon"],
answer:"chaussures"
},

{
type:"word",
question:"Cette image représente quoi ?",
image:"../../media/clothes/hat.png",
options:["chaussures","pantalon","chapeau","chemise"],
answer:"chapeau"
},

{
type:"word",
question:"Cette image représente quoi ?",
image:"../../media/clothes/dress.png",
options:["chapeau","chemise","pantalon","robe"],
answer:"robe"
},

/* AUDIO */

{
type:"audio",
speak:"chemise",
question:"Quel mot as-tu entendu ?",
options:["pantalon","chemise","chapeau","robe"],
answer:"chemise"
},

{
type:"audio",
speak:"pantalon",
question:"Quel mot as-tu entendu ?",
options:["robe","pantalon","chaussures","chemise"],
answer:"pantalon"
},

{
type:"audio",
speak:"chaussures",
question:"Quel mot as-tu entendu ?",
options:["chemise","chaussures","chapeau","pantalon"],
answer:"chaussures"
},

{
type:"audio",
speak:"chapeau",
question:"Quel mot as-tu entendu ?",
options:["chaussures","pantalon","chapeau","chemise"],
answer:"chapeau"
},

{
type:"audio",
speak:"robe",
question:"Quel mot as-tu entendu ?",
options:["chapeau","chemise","pantalon","robe"],
answer:"robe"
},

/* BUILD FR */

{
type:"build-fr",
speak:"C'est une chemise",
question:"Construisez la phrase française :",
text:"این یک پیراهن است",
words:["chemise","une","est","C'est"],
answer:["C'est","une","chemise"]
},

{
type:"build-fr",
speak:"C'est un pantalon",
question:"Construisez la phrase française :",
text:"این یک شلوار است",
words:["pantalon","un","est","C'est"],
answer:["C'est","un","pantalon"]
},

{
type:"build-fr",
speak:"Ce sont des chaussures",
question:"Construisez la phrase française :",
text:"این کفش‌ها هستند",
words:["chaussures","des","sont","Ce"],
answer:["Ce","sont","des","chaussures"]
},

{
type:"build-fr",
speak:"C'est un chapeau",
question:"Construisez la phrase française :",
text:"این یک کلاه است",
words:["chapeau","un","est","C'est"],
answer:["C'est","un","chapeau"]
},

{
type:"build-fr",
speak:"C'est une robe",
question:"Construisez la phrase française :",
text:"این یک لباس است",
words:["robe","une","est","C'est"],
answer:["C'est","une","robe"]
},

/* BUILD FA */

{
type:"build-fa",
speak:"C'est une chemise",
question:"ترجمه را بساز:",
text:"C'est une chemise",
words:["است","پیراهن","یک","این"],
answer:["این","یک","پیراهن","است"]
},

{
type:"build-fa",
speak:"C'est un pantalon",
question:"ترجمه را بساز:",
text:"C'est un pantalon",
words:["است","شلوار","یک","این"],
answer:["این","یک","شلوار","است"]
},

{
type:"build-fa",
speak:"Ce sont des chaussures",
question:"ترجمه را بساز:",
text:"Ce sont des chaussures",
words:["هستند","کفش‌ها","این"],
answer:["این","کفش‌ها","هستند"]
},

{
type:"build-fa",
speak:"C'est un chapeau",
question:"ترجمه را بساز:",
text:"C'est un chapeau",
words:["است","کلاه","یک","این"],
answer:["این","یک","کلاه","است"]
},

{
type:"build-fa",
speak:"C'est une robe",
question:"ترجمه را بساز:",
text:"C'est une robe",
words:["است","لباس","یک","این"],
answer:["این","یک","لباس","است"]
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
