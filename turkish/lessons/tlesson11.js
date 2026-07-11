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
question:"hangisi kırmızı ?",
speak:"kırmızı",
options:[
{text:"mavi",image:"../../media/colors/blue.png"},
{text:"kırmızı",image:"../../media/colors/red.png"},
{text:"yeşil",image:"../../media/colors/green.png"},
{text:"sarı",image:"../../media/colors/yellow.png"}
],
answer:"kırmızı"
},

{
type:"image",
question:"hangisi mavi ?",
speak:"mavi",
options:[
{text:"sarı",image:"../../media/colors/yellow.png"},
{text:"mavi",image:"../../media/colors/blue.png"},
{text:"siyah",image:"../../media/colors/black.png"},
{text:"kırmızı",image:"../../media/colors/red.png"}
],
answer:"mavi"
},

{
type:"image",
question:"hangisi yeşil ?",
speak:"yeşil",
options:[
{text:"kırmızı",image:"../../media/colors/red.png"},
{text:"yeşil",image:"../../media/colors/green.png"},
{text:"siyah",image:"../../media/colors/black.png"},
{text:"mavi",image:"../../media/colors/blue.png"}
],
answer:"yeşil"
},

{
type:"image",
question:"hangisi sarı ?",
speak:"sarı",
options:[
{text:"yeşil",image:"../../media/colors/green.png"},
{text:"mavi",image:"../../media/colors/blue.png"},
{text:"sarı",image:"../../media/colors/yellow.png"},
{text:"kırmızı",image:"../../media/colors/red.png"}
],
answer:"sarı"
},

{
type:"image",
question:"hangisi siyah ?",
speak:"siyah",
options:[
{text:"sarı",image:"../../media/colors/yellow.png"},
{text:"kırmızı",image:"../../media/colors/red.png"},
{text:"mavi",image:"../../media/colors/blue.png"},
{text:"siyah",image:"../../media/colors/black.png"}
],
answer:"siyah"
},

/* WORD */

{
type:"word",
question:"Bu renk ne?",
image:"../../media/colors/red.png",
options:["mavi","kırmızı","yeşil","sarı"],
answer:"kırmızı"
},

{
type:"word",
question:"Bu renk ne?",
image:"../../media/colors/blue.png",
options:["sarı","mavi","siyah","kırmızı"],
answer:"mavi"
},

{
type:"word",
question:"Bu renk ne?",
image:"../../media/colors/green.png",
options:["kırmızı","yeşil","siyah","mavi"],
answer:"yeşil"
},

{
type:"word",
question:"Bu renk ne?",
image:"../../media/colors/yellow.png",
options:["yeşil","mavi","sarı","kırmızı"],
answer:"sarı"
},

{
type:"word",
question:"Bu renk ne?",
image:"../../media/colors/black.png",
options:["sarı","kırmızı","mavi","siyah"],
answer:"siyah"
},

/* AUDIO */

{
type:"audio",
speak:"kırmızı",
question:"Hangi kelimeyi duydun?",
options:["mavi","kırmızı","yeşil","sarı"],
answer:"kırmızı"
},

{
type:"audio",
speak:"mavi",
question:"Hangi kelimeyi duydun?",
options:["sarı","mavi","siyah","kırmızı"],
answer:"mavi"
},

{
type:"audio",
speak:"yeşil",
question:"Hangi kelimeyi duydun?",
options:["kırmızı","yeşil","siyah","mavi"],
answer:"yeşil"
},

{
type:"audio",
speak:"sarı",
question:"Hangi kelimeyi duydun?",
options:["yeşil","mavi","sarı","kırmızı"],
answer:"sarı"
},

{
type:"audio",
speak:"siyah",
question:"Hangi kelimeyi duydun?",
options:["sarı","kırmızı","mavi","siyah"],
answer:"siyah"
},

/* BUILD TR */

{
type:"build-tr",
speak:"Bu kırmızı",
question:"Türkçe cümleyi kur:",
text:"این قرمز است",
words:["kırmızı","Bu"],
answer:["Bu","kırmızı"]
},

{
type:"build-tr",
speak:"Bu mavi",
question:"Türkçe cümleyi kur:",
text:"این آبی است",
words:["mavi","Bu"],
answer:["Bu","mavi"]
},

{
type:"build-tr",
speak:"Bu yeşil",
question:"Türkçe cümleyi kur:",
text:"این سبز است",
words:["yeşil","Bu"],
answer:["Bu","yeşil"]
},

{
type:"build-tr",
speak:"Bu sarı",
question:"Türkçe cümleyi kur:",
text:"این زرد است",
words:["sarı","Bu"],
answer:["Bu","sarı"]
},

{
type:"build-tr",
speak:"Bu siyah",
question:"Türkçe cümleyi kur:",
text:"این مشکی است",
words:["siyah","Bu"],
answer:["Bu","siyah"]
},

/* BUILD FA */

{
type:"build-fa",
speak:"Bu kırmızı",
question:"ترجمه را بساز:",
text:"Bu kırmızı",
words:["است","قرمز","این"],
answer:["این","قرمز","است"]
},

{
type:"build-fa",
speak:"Bu mavi",
question:"ترجمه را بساز:",
text:"Bu mavi",
words:["است","آبی","این"],
answer:["این","آبی","است"]
},

{
type:"build-fa",
speak:"Bu yeşil",
question:"ترجمه را بساز:",
text:"Bu yeşil",
words:["است","سبز","این"],
answer:["این","سبز","است"]
},

{
type:"build-fa",
speak:"Bu sarı",
question:"ترجمه را بساز:",
text:"Bu sarı",
words:["است","زرد","این"],
answer:["این","زرد","است"]
},

{
type:"build-fa",
speak:"Bu siyah",
question:"ترجمه را بساز:",
text:"Bu siyah",
words:["است","مشکی","این"],
answer:["این","مشکی","است"]
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
