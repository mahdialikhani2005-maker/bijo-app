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
question:"hangisi güneş ?",
speak:"güneş",
options:[
{text:"ay",image:"../../media/nature/moon.png"},
{text:"güneş",image:"../../media/nature/sun.png"},
{text:"yıldız",image:"../../media/nature/star.png"},
{text:"gökyüzü",image:"../../media/nature/sky.png"}
],
answer:"güneş"
},

{
type:"image",
question:"hangisi ay ?",
speak:"ay",
options:[
{text:"yıldız",image:"../../media/nature/star.png"},
{text:"ay",image:"../../media/nature/moon.png"},
{text:"yağmur",image:"../../media/nature/rain.png"},
{text:"güneş",image:"../../media/nature/sun.png"}
],
answer:"ay"
},

{
type:"image",
question:"hangisi yıldız ?",
speak:"yıldız",
options:[
{text:"güneş",image:"../../media/nature/sun.png"},
{text:"yıldız",image:"../../media/nature/star.png"},
{text:"yağmur",image:"../../media/nature/rain.png"},
{text:"ay",image:"../../media/nature/moon.png"}
],
answer:"yıldız"
},

{
type:"image",
question:"hangisi gökyüzü ?",
speak:"gökyüzü",
options:[
{text:"yıldız",image:"../../media/nature/star.png"},
{text:"ay",image:"../../media/nature/moon.png"},
{text:"gökyüzü",image:"../../media/nature/sky.png"},
{text:"güneş",image:"../../media/nature/sun.png"}
],
answer:"gökyüzü"
},

{
type:"image",
question:"hangisi yağmur ?",
speak:"yağmur",
options:[
{text:"gökyüzü",image:"../../media/nature/sky.png"},
{text:"güneş",image:"../../media/nature/sun.png"},
{text:"ay",image:"../../media/nature/moon.png"},
{text:"yağmur",image:"../../media/nature/rain.png"}
],
answer:"yağmur"
},

/* WORD */

{
type:"word",
question:"Bu resim ne?",
image:"../../media/nature/sun.png",
options:["ay","güneş","yıldız","gökyüzü"],
answer:"güneş"
},

{
type:"word",
question:"Bu resim ne?",
image:"../../media/nature/moon.png",
options:["yıldız","ay","yağmur","güneş"],
answer:"ay"
},

{
type:"word",
question:"Bu resim ne?",
image:"../../media/nature/star.png",
options:["güneş","yıldız","yağmur","ay"],
answer:"yıldız"
},

{
type:"word",
question:"Bu resim ne?",
image:"../../media/nature/sky.png",
options:["yıldız","ay","gökyüzü","güneş"],
answer:"gökyüzü"
},

{
type:"word",
question:"Bu resim ne?",
image:"../../media/nature/rain.png",
options:["gökyüzü","güneş","ay","yağmur"],
answer:"yağmur"
},

/* AUDIO */

{
type:"audio",
speak:"güneş",
question:"Hangi kelimeyi duydun?",
options:["ay","güneş","yıldız","gökyüzü"],
answer:"güneş"
},

{
type:"audio",
speak:"ay",
question:"Hangi kelimeyi duydun?",
options:["yıldız","ay","yağmur","güneş"],
answer:"ay"
},

{
type:"audio",
speak:"yıldız",
question:"Hangi kelimeyi duydun?",
options:["güneş","yıldız","yağmur","ay"],
answer:"yıldız"
},

{
type:"audio",
speak:"gökyüzü",
question:"Hangi kelimeyi duydun?",
options:["yıldız","ay","gökyüzü","güneş"],
answer:"gökyüzü"
},

{
type:"audio",
speak:"yağmur",
question:"Hangi kelimeyi duydun?",
options:["gökyüzü","güneş","ay","yağmur"],
answer:"yağmur"
},

/* BUILD TR */

{
type:"build-tr",
speak:"Güneş büyük",
question:"Türkçe cümleyi kur:",
text:"خورشید بزرگ است",
words:["Güneş","büyük"],
answer:["Güneş","büyük"]
},

{
type:"build-tr",
speak:"Ay küçük",
question:"Türkçe cümleyi kur:",
text:"ماه کوچک است",
words:["Ay","küçük"],
answer:["Ay","küçük"]
},

{
type:"build-tr",
speak:"Yıldız parlak",
question:"Türkçe cümleyi kur:",
text:"ستاره درخشان است",
words:["Yıldız","parlak"],
answer:["Yıldız","parlak"]
},

{
type:"build-tr",
speak:"Gökyüzü mavi",
question:"Türkçe cümleyi kur:",
text:"آسمان آبی است",
words:["Gökyüzü","mavi"],
answer:["Gökyüzü","mavi"]
},

{
type:"build-tr",
speak:"Yağmur soğuk",
question:"Türkçe cümleyi kur:",
text:"باران سرد است",
words:["Yağmur","soğuk"],
answer:["Yağmur","soğuk"]
},

/* BUILD FA */

{
type:"build-fa",
speak:"Güneş büyük",
question:"ترجمه را بساز:",
text:"Güneş büyük",
words:["است","بزرگ","خورشید"],
answer:["خورشید","بزرگ","است"]
},

{
type:"build-fa",
speak:"Ay küçük",
question:"ترجمه را بساز:",
text:"Ay küçük",
words:["است","کوچک","ماه"],
answer:["ماه","کوچک","است"]
},

{
type:"build-fa",
speak:"Yıldız parlak",
question:"ترجمه را بساز:",
text:"Yıldız parlak",
words:["است","درخشان","ستاره"],
answer:["ستاره","درخشان","است"]
},

{
type:"build-fa",
speak:"Gökyüzü mavi",
question:"ترجمه را بساز:",
text:"Gökyüzü mavi",
words:["است","آبی","آسمان"],
answer:["آسمان","آبی","است"]
},

{
type:"build-fa",
speak:"Yağmur soğuk",
question:"ترجمه را بساز:",
text:"Yağmur soğuk",
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
