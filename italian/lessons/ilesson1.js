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
question:"qual è uomo ?",
speak:"uomo",
options:[
{text:"donna",image:"../../media/people/woman.png"},
{text:"uomo",image:"../../media/people/man.png"},
{text:"ragazzo",image:"../../media/people/boy.png"},
{text:"ragazza",image:"../../media/people/girl.png"}
],
answer:"uomo"
},

{
type:"image",
question:"qual è donna ?",
speak:"donna",
options:[
{text:"ragazza",image:"../../media/people/girl.png"},
{text:"donna",image:"../../media/people/woman.png"},
{text:"ragazzo",image:"../../media/people/boy.png"},
{text:"uomo",image:"../../media/people/man.png"}
],
answer:"donna"
},

{
type:"image",
question:"qual è ragazzo ?",
speak:"ragazzo",
options:[
{text:"uomo",image:"../../media/people/man.png"},
{text:"ragazzo",image:"../../media/people/boy.png"},
{text:"bambino",image:"../../media/people/baby.png"},
{text:"ragazza",image:"../../media/people/girl.png"}
],
answer:"ragazzo"
},

{
type:"image",
question:"qual è ragazza ?",
speak:"ragazza",
options:[
{text:"ragazzo",image:"../../media/people/boy.png"},
{text:"uomo",image:"../../media/people/man.png"},
{text:"ragazza",image:"../../media/people/girl.png"},
{text:"bambino",image:"../../media/people/baby.png"}
],
answer:"ragazza"
},

{
type:"image",
question:"qual è bambino ?",
speak:"bambino",
options:[
{text:"ragazza",image:"../../media/people/girl.png"},
{text:"ragazzo",image:"../../media/people/boy.png"},
{text:"uomo",image:"../../media/people/man.png"},
{text:"bambino",image:"../../media/people/baby.png"}
],
answer:"bambino"
},

/* WORD */

{
type:"word",
question:"Che immagine è?",
image:"../../media/people/man.png",
options:["ragazzo","uomo","donna","ragazza"],
answer:"uomo"
},

{
type:"word",
question:"Che immagine è?",
image:"../../media/people/woman.png",
options:["donna","ragazza","bambino","uomo"],
answer:"donna"
},

{
type:"word",
question:"Che immagine è?",
image:"../../media/people/boy.png",
options:["ragazzo","uomo","bambino","ragazza"],
answer:"ragazzo"
},

{
type:"word",
question:"Che immagine è?",
image:"../../media/people/girl.png",
options:["ragazza","donna","ragazzo","bambino"],
answer:"ragazza"
},

{
type:"word",
question:"Che immagine è?",
image:"../../media/people/baby.png",
options:["bambino","ragazzo","ragazza","uomo"],
answer:"bambino"
},

/* AUDIO */

{
type:"audio",
speak:"uomo",
question:"Che parola hai sentito?",
options:["uomo","ragazzo","donna","ragazza"],
answer:"uomo"
},

{
type:"audio",
speak:"donna",
question:"Che parola hai sentito?",
options:["ragazza","donna","ragazzo","uomo"],
answer:"donna"
},

{
type:"audio",
speak:"ragazzo",
question:"Che parola hai sentito?",
options:["ragazzo","uomo","bambino","ragazza"],
answer:"ragazzo"
},

{
type:"audio",
speak:"ragazza",
question:"Che parola hai sentito?",
options:["ragazzo","donna","ragazza","bambino"],
answer:"ragazza"
},

{
type:"audio",
speak:"bambino",
question:"Che parola hai sentito?",
options:["bambino","ragazzo","uomo","ragazza"],
answer:"bambino"
},

/* BUILD IT */

{
type:"build-it",
speak:"Lui è un uomo",
question:"Costruisci la frase in italiano:",
text:"او یک مرد است",
words:["uomo","un","è","Lui"],
answer:["Lui","è","un","uomo"]
},

{
type:"build-it",
speak:"Lei è una donna",
question:"Costruisci la frase in italiano:",
text:"او یک زن است",
words:["donna","una","è","Lei"],
answer:["Lei","è","una","donna"]
},

{
type:"build-it",
speak:"Lui è un ragazzo",
question:"Costruisci la frase in italiano:",
text:"او یک پسر است",
words:["ragazzo","un","è","Lui"],
answer:["Lui","è","un","ragazzo"]
},

{
type:"build-it",
speak:"Lei è una ragazza",
question:"Costruisci la frase in italiano:",
text:"او یک دختر است",
words:["ragazza","una","è","Lei"],
answer:["Lei","è","una","ragazza"]
},

{
type:"build-it",
speak:"Il bambino è piccolo",
question:"Costruisci la frase in italiano:",
text:"نوزاد کوچک است",
words:["bambino","Il","piccolo","è"],
answer:["Il","bambino","è","piccolo"]
},

/* BUILD FA */

{
type:"build-fa",
speak:"Lui è un uomo",
question:"ترجمه را بساز:",
text:"Lui è un uomo",
words:["است","مرد","یک","او"],
answer:["او","یک","مرد","است"]
},

{
type:"build-fa",
speak:"Lei è una donna",
question:"ترجمه را بساز:",
text:"Lei è una donna",
words:["یک","است","زن","او"],
answer:["او","یک","زن","است"]
},

{
type:"build-fa",
speak:"Lui è un ragazzo",
question:"ترجمه را بساز:",
text:"Lui è un ragazzo",
words:["است","پسر","یک","او"],
answer:["او","یک","پسر","است"]
},

{
type:"build-fa",
speak:"Lei è una ragazza",
question:"ترجمه را بساز:",
text:"Lei è una ragazza",
words:["است","دختر","یک","او"],
answer:["او","یک","دختر","است"]
},

{
type:"build-fa",
speak:"Il bambino è piccolo",
question:"ترجمه را بساز:",
text:"Il bambino è piccolo",
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
