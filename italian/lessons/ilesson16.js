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
question:"qual è scuola ?",
speak:"scuola",
options:[
{text:"ospedale",image:"../../media/places/hospital.png"},
{text:"scuola",image:"../../media/places/school.png"},
{text:"negozio",image:"../../media/places/store.png"},
{text:"parco",image:"../../media/places/park.png"}
],
answer:"scuola"
},

{
type:"image",
question:"qual è ospedale ?",
speak:"ospedale",
options:[
{text:"parco",image:"../../media/places/park.png"},
{text:"ospedale",image:"../../media/places/hospital.png"},
{text:"moschea",image:"../../media/places/mosque.png"},
{text:"scuola",image:"../../media/places/school.png"}
],
answer:"ospedale"
},

{
type:"image",
question:"qual è negozio ?",
speak:"negozio",
options:[
{text:"scuola",image:"../../media/places/school.png"},
{text:"negozio",image:"../../media/places/store.png"},
{text:"moschea",image:"../../media/places/mosque.png"},
{text:"ospedale",image:"../../media/places/hospital.png"}
],
answer:"negozio"
},

{
type:"image",
question:"qual è parco ?",
speak:"parco",
options:[
{text:"negozio",image:"../../media/places/store.png"},
{text:"ospedale",image:"../../media/places/hospital.png"},
{text:"parco",image:"../../media/places/park.png"},
{text:"scuola",image:"../../media/places/school.png"}
],
answer:"parco"
},

{
type:"image",
question:"qual è moschea ?",
speak:"moschea",
options:[
{text:"parco",image:"../../media/places/park.png"},
{text:"scuola",image:"../../media/places/school.png"},
{text:"ospedale",image:"../../media/places/hospital.png"},
{text:"moschea",image:"../../media/places/mosque.png"}
],
answer:"moschea"
},

/* WORD */

{
type:"word",
question:"Che immagine è?",
image:"../../media/places/school.png",
options:["ospedale","scuola","negozio","parco"],
answer:"scuola"
},

{
type:"word",
question:"Che immagine è?",
image:"../../media/places/hospital.png",
options:["parco","ospedale","moschea","scuola"],
answer:"ospedale"
},

{
type:"word",
question:"Che immagine è?",
image:"../../media/places/store.png",
options:["scuola","negozio","moschea","ospedale"],
answer:"negozio"
},

{
type:"word",
question:"Che immagine è?",
image:"../../media/places/park.png",
options:["negozio","ospedale","parco","scuola"],
answer:"parco"
},

{
type:"word",
question:"Che immagine è?",
image:"../../media/places/mosque.png",
options:["parco","scuola","ospedale","moschea"],
answer:"moschea"
},

/* AUDIO */

{
type:"audio",
speak:"scuola",
question:"Che parola hai sentito?",
options:["ospedale","scuola","negozio","parco"],
answer:"scuola"
},

{
type:"audio",
speak:"ospedale",
question:"Che parola hai sentito?",
options:["parco","ospedale","moschea","scuola"],
answer:"ospedale"
},

{
type:"audio",
speak:"negozio",
question:"Che parola hai sentito?",
options:["scuola","negozio","moschea","ospedale"],
answer:"negozio"
},

{
type:"audio",
speak:"parco",
question:"Che parola hai sentito?",
options:["negozio","ospedale","parco","scuola"],
answer:"parco"
},

{
type:"audio",
speak:"moschea",
question:"Che parola hai sentito?",
options:["parco","scuola","ospedale","moschea"],
answer:"moschea"
},

/* BUILD IT */

{
type:"build-it",
speak:"Questa è una scuola",
question:"Costruisci la frase in italiano:",
text:"این یک مدرسه است",
words:["scuola","una","è","Questa"],
answer:["Questa","è","una","scuola"]
},

{
type:"build-it",
speak:"Questo è un ospedale",
question:"Costruisci la frase in italiano:",
text:"این یک بیمارستان است",
words:["ospedale","un","è","Questo"],
answer:["Questo","è","un","ospedale"]
},

{
type:"build-it",
speak:"Questo è un negozio",
question:"Costruisci la frase in italiano:",
text:"این یک فروشگاه است",
words:["negozio","un","è","Questo"],
answer:["Questo","è","un","negozio"]
},

{
type:"build-it",
speak:"Questo è un parco",
question:"Costruisci la frase in italiano:",
text:"این یک پارک است",
words:["parco","un","è","Questo"],
answer:["Questo","è","un","parco"]
},

{
type:"build-it",
speak:"Questa è una moschea",
question:"Costruisci la frase in italiano:",
text:"این یک مسجد است",
words:["moschea","una","è","Questa"],
answer:["Questa","è","una","moschea"]
},

/* BUILD FA */

{
type:"build-fa",
speak:"Questa è una scuola",
question:"ترجمه را بساز:",
text:"Questa è una scuola",
words:["است","مدرسه","یک","این"],
answer:["این","یک","مدرسه","است"]
},

{
type:"build-fa",
speak:"Questo è un ospedale",
question:"ترجمه را بساز:",
text:"Questo è un ospedale",
words:["است","بیمارستان","یک","این"],
answer:["این","یک","بیمارستان","است"]
},

{
type:"build-fa",
speak:"Questo è un negozio",
question:"ترجمه را بساز:",
text:"Questo è un negozio",
words:["است","فروشگاه","یک","این"],
answer:["این","یک","فروشگاه","است"]
},

{
type:"build-fa",
speak:"Questo è un parco",
question:"ترجمه را بساز:",
text:"Questo è un parco",
words:["است","پارک","یک","این"],
answer:["این","یک","پارک","است"]
},

{
type:"build-fa",
speak:"Questa è una moschea",
question:"ترجمه را بساز:",
text:"Questa è una moschea",
words:["است","مسجد","یک","این"],
answer:["این","یک","مسجد","است"]
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
