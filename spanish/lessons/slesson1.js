let current = 0;
let xp = 0;

function speak(text){
  if (!window.speechSynthesis) return;

  const utter = new SpeechSynthesisUtterance(text);
  utter.lang = "es-ES";
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
question:"¿cuál es hombre ?",
speak:"hombre",
options:[
{text:"mujer",image:"../../media/people/woman.png"},
{text:"hombre",image:"../../media/people/man.png"},
{text:"niño",image:"../../media/people/boy.png"},
{text:"niña",image:"../../media/people/girl.png"}
],
answer:"hombre"
},

{
type:"image",
question:"¿cuál es mujer ?",
speak:"mujer",
options:[
{text:"niña",image:"../../media/people/girl.png"},
{text:"mujer",image:"../../media/people/woman.png"},
{text:"niño",image:"../../media/people/boy.png"},
{text:"hombre",image:"../../media/people/man.png"}
],
answer:"mujer"
},

{
type:"image",
question:"¿cuál es niño ?",
speak:"niño",
options:[
{text:"hombre",image:"../../media/people/man.png"},
{text:"niño",image:"../../media/people/boy.png"},
{text:"bebé",image:"../../media/people/baby.png"},
{text:"niña",image:"../../media/people/girl.png"}
],
answer:"niño"
},

{
type:"image",
question:"¿cuál es niña ?",
speak:"niña",
options:[
{text:"niño",image:"../../media/people/boy.png"},
{text:"hombre",image:"../../media/people/man.png"},
{text:"niña",image:"../../media/people/girl.png"},
{text:"bebé",image:"../../media/people/baby.png"}
],
answer:"niña"
},

{
type:"image",
question:"¿cuál es bebé ?",
speak:"bebé",
options:[
{text:"niña",image:"../../media/people/girl.png"},
{text:"niño",image:"../../media/people/boy.png"},
{text:"hombre",image:"../../media/people/man.png"},
{text:"bebé",image:"../../media/people/baby.png"}
],
answer:"bebé"
},

/* WORD */

{
type:"word",
question:"¿Qué es esta imagen?",
image:"../../media/people/man.png",
options:["niño","hombre","mujer","niña"],
answer:"hombre"
},

{
type:"word",
question:"¿Qué es esta imagen?",
image:"../../media/people/woman.png",
options:["mujer","niña","bebé","hombre"],
answer:"mujer"
},

{
type:"word",
question:"¿Qué es esta imagen?",
image:"../../media/people/boy.png",
options:["niño","hombre","bebé","niña"],
answer:"niño"
},

{
type:"word",
question:"¿Qué es esta imagen?",
image:"../../media/people/girl.png",
options:["niña","mujer","niño","bebé"],
answer:"niña"
},

{
type:"word",
question:"¿Qué es esta imagen?",
image:"../../media/people/baby.png",
options:["bebé","niño","niña","hombre"],
answer:"bebé"
},

/* AUDIO */

{
type:"audio",
speak:"hombre",
question:"¿Qué palabra escuchaste?",
options:["hombre","niño","mujer","niña"],
answer:"hombre"
},

{
type:"audio",
speak:"mujer",
question:"¿Qué palabra escuchaste?",
options:["niña","mujer","niño","hombre"],
answer:"mujer"
},

{
type:"audio",
speak:"niño",
question:"¿Qué palabra escuchaste?",
options:["niño","hombre","bebé","niña"],
answer:"niño"
},

{
type:"audio",
speak:"niña",
question:"¿Qué palabra escuchaste?",
options:["niño","mujer","niña","bebé"],
answer:"niña"
},

{
type:"audio",
speak:"bebé",
question:"¿Qué palabra escuchaste?",
options:["bebé","niño","hombre","niña"],
answer:"bebé"
},

/* BUILD ES */

{
type:"build-es",
speak:"Él es un hombre",
question:"Construya la frase en español:",
text:"او یک مرد است",
words:["hombre","un","es","Él"],
answer:["Él","es","un","hombre"]
},

{
type:"build-es",
speak:"Ella es una mujer",
question:"Construya la frase en español:",
text:"او یک زن است",
words:["mujer","una","es","Ella"],
answer:["Ella","es","una","mujer"]
},

{
type:"build-es",
speak:"Él es un niño",
question:"Construya la frase en español:",
text:"او یک پسر است",
words:["niño","un","es","Él"],
answer:["Él","es","un","niño"]
},

{
type:"build-es",
speak:"Ella es una niña",
question:"Construya la frase en español:",
text:"او یک دختر است",
words:["niña","una","es","Ella"],
answer:["Ella","es","una","niña"]
},

{
type:"build-es",
speak:"El bebé es pequeño",
question:"Construya la frase en español:",
text:"نوزاد کوچک است",
words:["bebé","El","pequeño","es"],
answer:["El","bebé","es","pequeño"]
},

/* BUILD FA */

{
type:"build-fa",
speak:"Él es un hombre",
question:"ترجمه را بساز:",
text:"Él es un hombre",
words:["است","مرد","یک","او"],
answer:["او","یک","مرد","است"]
},

{
type:"build-fa",
speak:"Ella es una mujer",
question:"ترجمه را بساز:",
text:"Ella es una mujer",
words:["یک","است","زن","او"],
answer:["او","یک","زن","است"]
},

{
type:"build-fa",
speak:"Él es un niño",
question:"ترجمه را بساز:",
text:"Él es un niño",
words:["است","پسر","یک","او"],
answer:["او","یک","پسر","است"]
},

{
type:"build-fa",
speak:"Ella es una niña",
question:"ترجمه را بساز:",
text:"Ella es una niña",
words:["است","دختر","یک","او"],
answer:["او","یک","دختر","است"]
},

{
type:"build-fa",
speak:"El bebé es pequeño",
question:"ترجمه را بساز:",
text:"El bebé es pequeño",
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
