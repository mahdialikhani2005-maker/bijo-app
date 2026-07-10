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
question:"qual è sole ?",
speak:"sole",
options:[
{text:"luna",image:"../../media/nature/moon.png"},
{text:"sole",image:"../../media/nature/sun.png"},
{text:"stella",image:"../../media/nature/star.png"},
{text:"cielo",image:"../../media/nature/sky.png"}
],
answer:"sole"
},

{
type:"image",
question:"qual è luna ?",
speak:"luna",
options:[
{text:"stella",image:"../../media/nature/star.png"},
{text:"luna",image:"../../media/nature/moon.png"},
{text:"pioggia",image:"../../media/nature/rain.png"},
{text:"sole",image:"../../media/nature/sun.png"}
],
answer:"luna"
},

{
type:"image",
question:"qual è stella ?",
speak:"stella",
options:[
{text:"sole",image:"../../media/nature/sun.png"},
{text:"stella",image:"../../media/nature/star.png"},
{text:"pioggia",image:"../../media/nature/rain.png"},
{text:"luna",image:"../../media/nature/moon.png"}
],
answer:"stella"
},

{
type:"image",
question:"qual è cielo ?",
speak:"cielo",
options:[
{text:"stella",image:"../../media/nature/star.png"},
{text:"luna",image:"../../media/nature/moon.png"},
{text:"cielo",image:"../../media/nature/sky.png"},
{text:"sole",image:"../../media/nature/sun.png"}
],
answer:"cielo"
},

{
type:"image",
question:"qual è pioggia ?",
speak:"pioggia",
options:[
{text:"cielo",image:"../../media/nature/sky.png"},
{text:"sole",image:"../../media/nature/sun.png"},
{text:"luna",image:"../../media/nature/moon.png"},
{text:"pioggia",image:"../../media/nature/rain.png"}
],
answer:"pioggia"
},

/* WORD */

{
type:"word",
question:"Che immagine è?",
image:"../../media/nature/sun.png",
options:["luna","sole","stella","cielo"],
answer:"sole"
},

{
type:"word",
question:"Che immagine è?",
image:"../../media/nature/moon.png",
options:["stella","luna","pioggia","sole"],
answer:"luna"
},

{
type:"word",
question:"Che immagine è?",
image:"../../media/nature/star.png",
options:["sole","stella","pioggia","luna"],
answer:"stella"
},

{
type:"word",
question:"Che immagine è?",
image:"../../media/nature/sky.png",
options:["stella","luna","cielo","sole"],
answer:"cielo"
},

{
type:"word",
question:"Che immagine è?",
image:"../../media/nature/rain.png",
options:["cielo","sole","luna","pioggia"],
answer:"pioggia"
},

/* AUDIO */

{
type:"audio",
speak:"sole",
question:"Che parola hai sentito?",
options:["luna","sole","stella","cielo"],
answer:"sole"
},

{
type:"audio",
speak:"luna",
question:"Che parola hai sentito?",
options:["stella","luna","pioggia","sole"],
answer:"luna"
},

{
type:"audio",
speak:"stella",
question:"Che parola hai sentito?",
options:["sole","stella","pioggia","luna"],
answer:"stella"
},

{
type:"audio",
speak:"cielo",
question:"Che parola hai sentito?",
options:["stella","luna","cielo","sole"],
answer:"cielo"
},

{
type:"audio",
speak:"pioggia",
question:"Che parola hai sentito?",
options:["cielo","sole","luna","pioggia"],
answer:"pioggia"
},

/* BUILD IT */

{
type:"build-it",
speak:"Il sole è grande",
question:"Costruisci la frase in italiano:",
text:"خورشید بزرگ است",
words:["sole","Il","grande","è"],
answer:["Il","sole","è","grande"]
},

{
type:"build-it",
speak:"La luna è piccola",
question:"Costruisci la frase in italiano:",
text:"ماه کوچک است",
words:["luna","La","piccola","è"],
answer:["La","luna","è","piccola"]
},

{
type:"build-it",
speak:"La stella è brillante",
question:"Costruisci la frase in italiano:",
text:"ستاره درخشان است",
words:["stella","La","brillante","è"],
answer:["La","stella","è","brillante"]
},

{
type:"build-it",
speak:"Il cielo è azzurro",
question:"Costruisci la frase in italiano:",
text:"آسمان آبی است",
words:["cielo","Il","azzurro","è"],
answer:["Il","cielo","è","azzurro"]
},

{
type:"build-it",
speak:"La pioggia è fredda",
question:"Costruisci la frase in italiano:",
text:"باران سرد است",
words:["pioggia","La","fredda","è"],
answer:["La","pioggia","è","fredda"]
},

/* BUILD FA */

{
type:"build-fa",
speak:"Il sole è grande",
question:"ترجمه را بساز:",
text:"Il sole è grande",
words:["است","بزرگ","خورشید"],
answer:["خورشید","بزرگ","است"]
},

{
type:"build-fa",
speak:"La luna è piccola",
question:"ترجمه را بساز:",
text:"La luna è piccola",
words:["است","کوچک","ماه"],
answer:["ماه","کوچک","است"]
},

{
type:"build-fa",
speak:"La stella è brillante",
question:"ترجمه را بساز:",
text:"La stella è brillante",
words:["است","درخشان","ستاره"],
answer:["ستاره","درخشان","است"]
},

{
type:"build-fa",
speak:"Il cielo è azzurro",
question:"ترجمه را بساز:",
text:"Il cielo è azzurro",
words:["است","آبی","آسمان"],
answer:["آسمان","آبی","است"]
},

{
type:"build-fa",
speak:"La pioggia è fredda",
question:"ترجمه را بساز:",
text:"La pioggia è fredda",
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
