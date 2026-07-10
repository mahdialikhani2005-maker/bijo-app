let current = 0;
let xp = 0;

function speak(text){
  if (!window.speechSynthesis) return;

  const utter = new SpeechSynthesisUtterance(text);
  utter.lang = "tr";
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
question:"hangisi araba ?",
speak:"araba",
options:[
{text:"otobüs",image:"../../media/vehicles/bus.png"},
{text:"araba",image:"../../media/vehicles/car.png"},
{text:"tren",image:"../../media/vehicles/train.png"},
{text:"uçak",image:"../../media/vehicles/airplane.png"}
],
answer:"araba"
},

{
type:"image",
question:"hangisi otobüs ?",
speak:"otobüs",
options:[
{text:"uçak",image:"../../media/vehicles/airplane.png"},
{text:"otobüs",image:"../../media/vehicles/bus.png"},
{text:"bisiklet",image:"../../media/vehicles/bicycle.png"},
{text:"araba",image:"../../media/vehicles/car.png"}
],
answer:"otobüs"
},

{
type:"image",
question:"hangisi tren ?",
speak:"tren",
options:[
{text:"araba",image:"../../media/vehicles/car.png"},
{text:"tren",image:"../../media/vehicles/train.png"},
{text:"bisiklet",image:"../../media/vehicles/bicycle.png"},
{text:"otobüs",image:"../../media/vehicles/bus.png"}
],
answer:"tren"
},

{
type:"image",
question:"hangisi uçak ?",
speak:"uçak",
options:[
{text:"tren",image:"../../media/vehicles/train.png"},
{text:"otobüs",image:"../../media/vehicles/bus.png"},
{text:"uçak",image:"../../media/vehicles/airplane.png"},
{text:"araba",image:"../../media/vehicles/car.png"}
],
answer:"uçak"
},

{
type:"image",
question:"hangisi bisiklet ?",
speak:"bisiklet",
options:[
{text:"uçak",image:"../../media/vehicles/airplane.png"},
{text:"araba",image:"../../media/vehicles/car.png"},
{text:"otobüs",image:"../../media/vehicles/bus.png"},
{text:"bisiklet",image:"../../media/vehicles/bicycle.png"}
],
answer:"bisiklet"
},

/* WORD */

{
type:"word",
question:"Bu resim ne?",
image:"../../media/vehicles/car.png",
options:["otobüs","araba","tren","uçak"],
answer:"araba"
},

{
type:"word",
question:"Bu resim ne?",
image:"../../media/vehicles/bus.png",
options:["uçak","otobüs","bisiklet","araba"],
answer:"otobüs"
},

{
type:"word",
question:"Bu resim ne?",
image:"../../media/vehicles/train.png",
options:["araba","tren","bisiklet","otobüs"],
answer:"tren"
},

{
type:"word",
question:"Bu resim ne?",
image:"../../media/vehicles/airplane.png",
options:["tren","otobüs","uçak","araba"],
answer:"uçak"
},

{
type:"word",
question:"Bu resim ne?",
image:"../../media/vehicles/bicycle.png",
options:["uçak","araba","otobüs","bisiklet"],
answer:"bisiklet"
},

/* AUDIO */

{
type:"audio",
speak:"araba",
question:"Hangi kelimeyi duydun?",
options:["otobüs","araba","tren","uçak"],
answer:"araba"
},

{
type:"audio",
speak:"otobüs",
question:"Hangi kelimeyi duydun?",
options:["uçak","otobüs","bisiklet","araba"],
answer:"otobüs"
},

{
type:"audio",
speak:"tren",
question:"Hangi kelimeyi duydun?",
options:["araba","tren","bisiklet","otobüs"],
answer:"tren"
},

{
type:"audio",
speak:"uçak",
question:"Hangi kelimeyi duydun?",
options:["tren","otobüs","uçak","araba"],
answer:"uçak"
},

{
type:"audio",
speak:"bisiklet",
question:"Hangi kelimeyi duydun?",
options:["uçak","araba","otobüs","bisiklet"],
answer:"bisiklet"
},

/* BUILD TR */

{
type:"build-tr",
speak:"Bir arabam var",
question:"Türkçe cümleyi kur:",
text:"من یک ماشین دارم",
words:["arabam","var","Bir"],
answer:["Bir","arabam","var"]
},

{
type:"build-tr",
speak:"Bir otobüsüm var",
question:"Türkçe cümleyi kur:",
text:"من یک اتوبوس دارم",
words:["otobüsüm","var","Bir"],
answer:["Bir","otobüsüm","var"]
},

{
type:"build-tr",
speak:"Bir trenim var",
question:"Türkçe cümleyi kur:",
text:"من یک قطار دارم",
words:["trenim","var","Bir"],
answer:["Bir","trenim","var"]
},

{
type:"build-tr",
speak:"Bir uçağım var",
question:"Türkçe cümleyi kur:",
text:"من یک هواپیما دارم",
words:["uçağım","var","Bir"],
answer:["Bir","uçağım","var"]
},

{
type:"build-tr",
speak:"Bir bisikletim var",
question:"Türkçe cümleyi kur:",
text:"من یک دوچرخه دارم",
words:["bisikletim","var","Bir"],
answer:["Bir","bisikletim","var"]
},

/* BUILD FA */

{
type:"build-fa",
speak:"Bir arabam var",
question:"ترجمه را بساز:",
text:"Bir arabam var",
words:["دارم","ماشین","یک","من"],
answer:["من","یک","ماشین","دارم"]
},

{
type:"build-fa",
speak:"Bir otobüsüm var",
question:"ترجمه را بساز:",
text:"Bir otobüsüm var",
words:["دارم","اتوبوس","یک","من"],
answer:["من","یک","اتوبوس","دارم"]
},

{
type:"build-fa",
speak:"Bir trenim var",
question:"ترجمه را بساز:",
text:"Bir trenim var",
words:["دارم","قطار","یک","من"],
answer:["من","یک","قطار","دارم"]
},

{
type:"build-fa",
speak:"Bir uçağım var",
question:"ترجمه را بساز:",
text:"Bir uçağım var",
words:["دارم","هواپیما","یک","من"],
answer:["من","یک","هواپیما","دارم"]
},

{
type:"build-fa",
speak:"Bir bisikletim var",
question:"ترجمه را بساز:",
text:"Bir bisikletim var",
words:["دارم","دوچرخه","یک","من"],
answer:["من","یک","دوچرخه","دارم"]
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
