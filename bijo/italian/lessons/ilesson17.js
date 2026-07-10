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
question:"qual è felice ?",
speak:"felice",
options:[
{text:"triste",image:"../../media/feelings/sad.png"},
{text:"felice",image:"../../media/feelings/happy.png"},
{text:"arrabbiato",image:"../../media/feelings/angry.png"},
{text:"stanco",image:"../../media/feelings/tired.png"}
],
answer:"felice"
},

{
type:"image",
question:"qual è triste ?",
speak:"triste",
options:[
{text:"stanco",image:"../../media/feelings/tired.png"},
{text:"triste",image:"../../media/feelings/sad.png"},
{text:"affamato",image:"../../media/feelings/hungry.png"},
{text:"felice",image:"../../media/feelings/happy.png"}
],
answer:"triste"
},

{
type:"image",
question:"qual è arrabbiato ?",
speak:"arrabbiato",
options:[
{text:"felice",image:"../../media/feelings/happy.png"},
{text:"arrabbiato",image:"../../media/feelings/angry.png"},
{text:"affamato",image:"../../media/feelings/hungry.png"},
{text:"triste",image:"../../media/feelings/sad.png"}
],
answer:"arrabbiato"
},

{
type:"image",
question:"qual è stanco ?",
speak:"stanco",
options:[
{text:"arrabbiato",image:"../../media/feelings/angry.png"},
{text:"triste",image:"../../media/feelings/sad.png"},
{text:"stanco",image:"../../media/feelings/tired.png"},
{text:"felice",image:"../../media/feelings/happy.png"}
],
answer:"stanco"
},

{
type:"image",
question:"qual è affamato ?",
speak:"affamato",
options:[
{text:"stanco",image:"../../media/feelings/tired.png"},
{text:"felice",image:"../../media/feelings/happy.png"},
{text:"triste",image:"../../media/feelings/sad.png"},
{text:"affamato",image:"../../media/feelings/hungry.png"}
],
answer:"affamato"
},

/* WORD */

{
type:"word",
question:"Che immagine è?",
image:"../../media/feelings/happy.png",
options:["triste","felice","arrabbiato","stanco"],
answer:"felice"
},

{
type:"word",
question:"Che immagine è?",
image:"../../media/feelings/sad.png",
options:["stanco","triste","affamato","felice"],
answer:"triste"
},

{
type:"word",
question:"Che immagine è?",
image:"../../media/feelings/angry.png",
options:["felice","arrabbiato","affamato","triste"],
answer:"arrabbiato"
},

{
type:"word",
question:"Che immagine è?",
image:"../../media/feelings/tired.png",
options:["arrabbiato","triste","stanco","felice"],
answer:"stanco"
},

{
type:"word",
question:"Che immagine è?",
image:"../../media/feelings/hungry.png",
options:["stanco","felice","triste","affamato"],
answer:"affamato"
},

/* AUDIO */

{
type:"audio",
speak:"felice",
question:"Che parola hai sentito?",
options:["triste","felice","arrabbiato","stanco"],
answer:"felice"
},

{
type:"audio",
speak:"triste",
question:"Che parola hai sentito?",
options:["stanco","triste","affamato","felice"],
answer:"triste"
},

{
type:"audio",
speak:"arrabbiato",
question:"Che parola hai sentito?",
options:["felice","arrabbiato","affamato","triste"],
answer:"arrabbiato"
},

{
type:"audio",
speak:"stanco",
question:"Che parola hai sentito?",
options:["arrabbiato","triste","stanco","felice"],
answer:"stanco"
},

{
type:"audio",
speak:"affamato",
question:"Che parola hai sentito?",
options:["stanco","felice","triste","affamato"],
answer:"affamato"
},

/* BUILD IT */

{
type:"build-it",
speak:"Io sono felice",
question:"Costruisci la frase in italiano:",
text:"من خوشحال هستم",
words:["felice","sono","Io"],
answer:["Io","sono","felice"]
},

{
type:"build-it",
speak:"Io sono triste",
question:"Costruisci la frase in italiano:",
text:"من ناراحت هستم",
words:["triste","sono","Io"],
answer:["Io","sono","triste"]
},

{
type:"build-it",
speak:"Io sono arrabbiato",
question:"Costruisci la frase in italiano:",
text:"من عصبانی هستم",
words:["arrabbiato","sono","Io"],
answer:["Io","sono","arrabbiato"]
},

{
type:"build-it",
speak:"Io sono stanco",
question:"Costruisci la frase in italiano:",
text:"من خسته هستم",
words:["stanco","sono","Io"],
answer:["Io","sono","stanco"]
},

{
type:"build-it",
speak:"Io ho fame",
question:"Costruisci la frase in italiano:",
text:"من گرسنه هستم",
words:["fame","ho","Io"],
answer:["Io","ho","fame"]
},

/* BUILD FA */

{
type:"build-fa",
speak:"Io sono felice",
question:"ترجمه را بساز:",
text:"Io sono felice",
words:["هستم","خوشحال","من"],
answer:["من","خوشحال","هستم"]
},

{
type:"build-fa",
speak:"Io sono triste",
question:"ترجمه را بساز:",
text:"Io sono triste",
words:["هستم","ناراحت","من"],
answer:["من","ناراحت","هستم"]
},

{
type:"build-fa",
speak:"Io sono arrabbiato",
question:"ترجمه را بساز:",
text:"Io sono arrabbiato",
words:["هستم","عصبانی","من"],
answer:["من","عصبانی","هستم"]
},

{
type:"build-fa",
speak:"Io sono stanco",
question:"ترجمه را بساز:",
text:"Io sono stanco",
words:["هستم","خسته","من"],
answer:["من","خسته","هستم"]
},

{
type:"build-fa",
speak:"Io ho fame",
question:"ترجمه را بساز:",
text:"Io ho fame",
words:["هستم","گرسنه","من"],
answer:["من","گرسنه","هستم"]
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
