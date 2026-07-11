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
question:"qual è mangiare ?",
speak:"mangiare",
options:[
{text:"dormire",image:"../../media/actions/sleep.png"},
{text:"mangiare",image:"../../media/actions/eat.png"},
{text:"camminare",image:"../../media/actions/walk.png"},
{text:"leggere",image:"../../media/actions/read.png"}
],
answer:"mangiare"
},

{
type:"image",
question:"qual è dormire ?",
speak:"dormire",
options:[
{text:"scrivere",image:"../../media/actions/write.png"},
{text:"dormire",image:"../../media/actions/sleep.png"},
{text:"mangiare",image:"../../media/actions/eat.png"},
{text:"camminare",image:"../../media/actions/walk.png"}
],
answer:"dormire"
},

{
type:"image",
question:"qual è camminare ?",
speak:"camminare",
options:[
{text:"mangiare",image:"../../media/actions/eat.png"},
{text:"camminare",image:"../../media/actions/walk.png"},
{text:"scrivere",image:"../../media/actions/write.png"},
{text:"dormire",image:"../../media/actions/sleep.png"}
],
answer:"camminare"
},

{
type:"image",
question:"qual è leggere ?",
speak:"leggere",
options:[
{text:"camminare",image:"../../media/actions/walk.png"},
{text:"dormire",image:"../../media/actions/sleep.png"},
{text:"leggere",image:"../../media/actions/read.png"},
{text:"mangiare",image:"../../media/actions/eat.png"}
],
answer:"leggere"
},

{
type:"image",
question:"qual è scrivere ?",
speak:"scrivere",
options:[
{text:"leggere",image:"../../media/actions/read.png"},
{text:"mangiare",image:"../../media/actions/eat.png"},
{text:"dormire",image:"../../media/actions/sleep.png"},
{text:"scrivere",image:"../../media/actions/write.png"}
],
answer:"scrivere"
},

/* WORD */

{
type:"word",
question:"Che immagine è?",
image:"../../media/actions/eat.png",
options:["dormire","mangiare","camminare","leggere"],
answer:"mangiare"
},

{
type:"word",
question:"Che immagine è?",
image:"../../media/actions/sleep.png",
options:["scrivere","dormire","mangiare","camminare"],
answer:"dormire"
},

{
type:"word",
question:"Che immagine è?",
image:"../../media/actions/walk.png",
options:["mangiare","camminare","scrivere","dormire"],
answer:"camminare"
},

{
type:"word",
question:"Che immagine è?",
image:"../../media/actions/read.png",
options:["camminare","dormire","leggere","mangiare"],
answer:"leggere"
},

{
type:"word",
question:"Che immagine è?",
image:"../../media/actions/write.png",
options:["leggere","mangiare","dormire","scrivere"],
answer:"scrivere"
},

/* AUDIO */

{
type:"audio",
speak:"mangiare",
question:"Che parola hai sentito?",
options:["dormire","mangiare","camminare","leggere"],
answer:"mangiare"
},

{
type:"audio",
speak:"dormire",
question:"Che parola hai sentito?",
options:["scrivere","dormire","mangiare","camminare"],
answer:"dormire"
},

{
type:"audio",
speak:"camminare",
question:"Che parola hai sentito?",
options:["mangiare","camminare","scrivere","dormire"],
answer:"camminare"
},

{
type:"audio",
speak:"leggere",
question:"Che parola hai sentito?",
options:["camminare","dormire","leggere","mangiare"],
answer:"leggere"
},

{
type:"audio",
speak:"scrivere",
question:"Che parola hai sentito?",
options:["leggere","mangiare","dormire","scrivere"],
answer:"scrivere"
},

/* BUILD IT */

{
type:"build-it",
speak:"Io mangio il pane",
question:"Costruisci la frase in italiano:",
text:"من نان می‌خورم",
words:["pane","il","mangio","Io"],
answer:["Io","mangio","il","pane"]
},

{
type:"build-it",
speak:"Io dormo di notte",
question:"Costruisci la frase in italiano:",
text:"من شب می‌خوابم",
words:["dormo","notte","di","Io"],
answer:["Io","dormo","di","notte"]
},

{
type:"build-it",
speak:"Io cammino a scuola",
question:"Costruisci la frase in italiano:",
text:"من به مدرسه راه می‌روم",
words:["cammino","scuola","a","Io"],
answer:["Io","cammino","a","scuola"]
},

{
type:"build-it",
speak:"Io leggo un libro",
question:"Costruisci la frase in italiano:",
text:"من یک کتاب می‌خوانم",
words:["leggo","libro","un","Io"],
answer:["Io","leggo","un","libro"]
},

{
type:"build-it",
speak:"Io scrivo una lettera",
question:"Costruisci la frase in italiano:",
text:"من یک نامه می‌نویسم",
words:["scrivo","lettera","una","Io"],
answer:["Io","scrivo","una","lettera"]
},

/* BUILD FA */

{
type:"build-fa",
speak:"Io mangio il pane",
question:"ترجمه را بساز:",
text:"Io mangio il pane",
words:["می‌خورم","نان","من"],
answer:["من","نان","می‌خورم"]
},

{
type:"build-fa",
speak:"Io dormo di notte",
question:"ترجمه را بساز:",
text:"Io dormo di notte",
words:["می‌خوابم","شب","در","من"],
answer:["من","شب","می‌خوابم"]
},

{
type:"build-fa",
speak:"Io cammino a scuola",
question:"ترجمه را بساز:",
text:"Io cammino a scuola",
words:["می‌روم","مدرسه","به","من"],
answer:["من","به","مدرسه","می‌روم"]
},

{
type:"build-fa",
speak:"Io leggo un libro",
question:"ترجمه را بساز:",
text:"Io leggo un libro",
words:["می‌خوانم","کتاب","یک","من"],
answer:["من","یک","کتاب","می‌خوانم"]
},

{
type:"build-fa",
speak:"Io scrivo una lettera",
question:"ترجمه را بساز:",
text:"Io scrivo una lettera",
words:["می‌نویسم","نامه","یک","من"],
answer:["من","یک","نامه","می‌نویسم"]
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
