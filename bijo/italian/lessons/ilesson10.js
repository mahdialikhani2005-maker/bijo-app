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
question:"qual è caldo ?",
speak:"caldo",
options:[
{text:"freddo",image:"../../media/weather/cold.png"},
{text:"caldo",image:"../../media/weather/hot.png"},
{text:"soleggiato",image:"../../media/weather/sunny.png"},
{text:"nuvoloso",image:"../../media/weather/cloudy.png"}
],
answer:"caldo"
},

{
type:"image",
question:"qual è freddo ?",
speak:"freddo",
options:[
{text:"soleggiato",image:"../../media/weather/sunny.png"},
{text:"freddo",image:"../../media/weather/cold.png"},
{text:"vento",image:"../../media/weather/wind.png"},
{text:"caldo",image:"../../media/weather/hot.png"}
],
answer:"freddo"
},

{
type:"image",
question:"qual è soleggiato ?",
speak:"soleggiato",
options:[
{text:"caldo",image:"../../media/weather/hot.png"},
{text:"soleggiato",image:"../../media/weather/sunny.png"},
{text:"vento",image:"../../media/weather/wind.png"},
{text:"freddo",image:"../../media/weather/cold.png"}
],
answer:"soleggiato"
},

{
type:"image",
question:"qual è nuvoloso ?",
speak:"nuvoloso",
options:[
{text:"soleggiato",image:"../../media/weather/sunny.png"},
{text:"freddo",image:"../../media/weather/cold.png"},
{text:"nuvoloso",image:"../../media/weather/cloudy.png"},
{text:"caldo",image:"../../media/weather/hot.png"}
],
answer:"nuvoloso"
},

{
type:"image",
question:"qual è vento ?",
speak:"vento",
options:[
{text:"nuvoloso",image:"../../media/weather/cloudy.png"},
{text:"caldo",image:"../../media/weather/hot.png"},
{text:"freddo",image:"../../media/weather/cold.png"},
{text:"vento",image:"../../media/weather/wind.png"}
],
answer:"vento"
},

/* WORD */

{
type:"word",
question:"Che immagine è?",
image:"../../media/weather/hot.png",
options:["freddo","caldo","soleggiato","nuvoloso"],
answer:"caldo"
},

{
type:"word",
question:"Che immagine è?",
image:"../../media/weather/cold.png",
options:["soleggiato","freddo","vento","caldo"],
answer:"freddo"
},

{
type:"word",
question:"Che immagine è?",
image:"../../media/weather/sunny.png",
options:["caldo","soleggiato","vento","freddo"],
answer:"soleggiato"
},

{
type:"word",
question:"Che immagine è?",
image:"../../media/weather/cloudy.png",
options:["soleggiato","freddo","nuvoloso","caldo"],
answer:"nuvoloso"
},

{
type:"word",
question:"Che immagine è?",
image:"../../media/weather/wind.png",
options:["nuvoloso","caldo","freddo","vento"],
answer:"vento"
},

/* AUDIO */

{
type:"audio",
speak:"caldo",
question:"Che parola hai sentito?",
options:["freddo","caldo","soleggiato","nuvoloso"],
answer:"caldo"
},

{
type:"audio",
speak:"freddo",
question:"Che parola hai sentito?",
options:["soleggiato","freddo","vento","caldo"],
answer:"freddo"
},

{
type:"audio",
speak:"soleggiato",
question:"Che parola hai sentito?",
options:["caldo","soleggiato","vento","freddo"],
answer:"soleggiato"
},

{
type:"audio",
speak:"nuvoloso",
question:"Che parola hai sentito?",
options:["soleggiato","freddo","nuvoloso","caldo"],
answer:"nuvoloso"
},

{
type:"audio",
speak:"vento",
question:"Che parola hai sentito?",
options:["nuvoloso","caldo","freddo","vento"],
answer:"vento"
},

/* BUILD IT */

{
type:"build-it",
speak:"Fa caldo",
question:"Costruisci la frase in italiano:",
text:"هوا گرم است",
words:["caldo","Fa"],
answer:["Fa","caldo"]
},

{
type:"build-it",
speak:"Fa freddo",
question:"Costruisci la frase in italiano:",
text:"هوا سرد است",
words:["freddo","Fa"],
answer:["Fa","freddo"]
},

{
type:"build-it",
speak:"È soleggiato",
question:"Costruisci la frase in italiano:",
text:"هوا آفتابی است",
words:["soleggiato","È"],
answer:["È","soleggiato"]
},

{
type:"build-it",
speak:"È nuvoloso",
question:"Costruisci la frase in italiano:",
text:"هوا ابری است",
words:["nuvoloso","È"],
answer:["È","nuvoloso"]
},

{
type:"build-it",
speak:"C'è vento",
question:"Costruisci la frase in italiano:",
text:"هوا بادی است",
words:["vento","C'è"],
answer:["C'è","vento"]
},

/* BUILD FA */

{
type:"build-fa",
speak:"Fa caldo",
question:"ترجمه را بساز:",
text:"Fa caldo",
words:["است","گرم","هوا"],
answer:["هوا","گرم","است"]
},

{
type:"build-fa",
speak:"Fa freddo",
question:"ترجمه را بساز:",
text:"Fa freddo",
words:["است","سرد","هوا"],
answer:["هوا","سرد","است"]
},

{
type:"build-fa",
speak:"È soleggiato",
question:"ترجمه را بساز:",
text:"È soleggiato",
words:["است","آفتابی","هوا"],
answer:["هوا","آفتابی","است"]
},

{
type:"build-fa",
speak:"È nuvoloso",
question:"ترجمه را بساز:",
text:"È nuvoloso",
words:["است","ابری","هوا"],
answer:["هوا","ابری","است"]
},

{
type:"build-fa",
speak:"C'è vento",
question:"ترجمه را بساز:",
text:"C'è vento",
words:["است","بادی","هوا"],
answer:["هوا","بادی","است"]
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
