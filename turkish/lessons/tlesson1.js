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
question:"hangisi adam ?",
speak:"adam",
options:[
{text:"kadın",image:"../../media/people/woman.png"},
{text:"adam",image:"../../media/people/man.png"},
{text:"oğlan",image:"../../media/people/boy.png"},
{text:"kız",image:"../../media/people/girl.png"}
],
answer:"adam"
},

{
type:"image",
question:"hangisi kadın ?",
speak:"kadın",
options:[
{text:"kız",image:"../../media/people/girl.png"},
{text:"kadın",image:"../../media/people/woman.png"},
{text:"oğlan",image:"../../media/people/boy.png"},
{text:"adam",image:"../../media/people/man.png"}
],
answer:"kadın"
},

{
type:"image",
question:"hangisi oğlan ?",
speak:"oğlan",
options:[
{text:"adam",image:"../../media/people/man.png"},
{text:"oğlan",image:"../../media/people/boy.png"},
{text:"bebek",image:"../../media/people/baby.png"},
{text:"kız",image:"../../media/people/girl.png"}
],
answer:"oğlan"
},

{
type:"image",
question:"hangisi kız ?",
speak:"kız",
options:[
{text:"oğlan",image:"../../media/people/boy.png"},
{text:"adam",image:"../../media/people/man.png"},
{text:"kız",image:"../../media/people/girl.png"},
{text:"bebek",image:"../../media/people/baby.png"}
],
answer:"kız"
},

{
type:"image",
question:"hangisi bebek ?",
speak:"bebek",
options:[
{text:"kız",image:"../../media/people/girl.png"},
{text:"oğlan",image:"../../media/people/boy.png"},
{text:"adam",image:"../../media/people/man.png"},
{text:"bebek",image:"../../media/people/baby.png"}
],
answer:"bebek"
},

/* WORD */

{
type:"word",
question:"Bu resim ne?",
image:"../../media/people/man.png",
options:["oğlan","adam","kadın","kız"],
answer:"adam"
},

{
type:"word",
question:"Bu resim ne?",
image:"../../media/people/woman.png",
options:["kadın","kız","bebek","adam"],
answer:"kadın"
},

{
type:"word",
question:"Bu resim ne?",
image:"../../media/people/boy.png",
options:["oğlan","adam","bebek","kız"],
answer:"oğlan"
},

{
type:"word",
question:"Bu resim ne?",
image:"../../media/people/girl.png",
options:["kız","kadın","oğlan","bebek"],
answer:"kız"
},

{
type:"word",
question:"Bu resim ne?",
image:"../../media/people/baby.png",
options:["bebek","oğlan","kız","adam"],
answer:"bebek"
},

/* AUDIO */

{
type:"audio",
speak:"adam",
question:"Hangi kelimeyi duydun?",
options:["adam","oğlan","kadın","kız"],
answer:"adam"
},

{
type:"audio",
speak:"kadın",
question:"Hangi kelimeyi duydun?",
options:["kız","kadın","oğlan","adam"],
answer:"kadın"
},

{
type:"audio",
speak:"oğlan",
question:"Hangi kelimeyi duydun?",
options:["oğlan","adam","bebek","kız"],
answer:"oğlan"
},

{
type:"audio",
speak:"kız",
question:"Hangi kelimeyi duydun?",
options:["oğlan","kadın","kız","bebek"],
answer:"kız"
},

{
type:"audio",
speak:"bebek",
question:"Hangi kelimeyi duydun?",
options:["bebek","oğlan","adam","kız"],
answer:"bebek"
},

/* BUILD TR */

{
type:"build-tr",
speak:"O bir adam",
question:"Türkçe cümleyi kur:",
text:"او یک مرد است",
words:["adam","bir","O"],
answer:["O","bir","adam"]
},

{
type:"build-tr",
speak:"O bir kadın",
question:"Türkçe cümleyi kur:",
text:"او یک زن است",
words:["kadın","bir","O"],
answer:["O","bir","kadın"]
},

{
type:"build-tr",
speak:"O bir oğlan",
question:"Türkçe cümleyi kur:",
text:"او یک پسر است",
words:["oğlan","bir","O"],
answer:["O","bir","oğlan"]
},

{
type:"build-tr",
speak:"O bir kız",
question:"Türkçe cümleyi kur:",
text:"او یک دختر است",
words:["kız","bir","O"],
answer:["O","bir","kız"]
},

{
type:"build-tr",
speak:"Bebek küçük",
question:"Türkçe cümleyi kur:",
text:"نوزاد کوچک است",
words:["Bebek","küçük"],
answer:["Bebek","küçük"]
},

/* BUILD FA */

{
type:"build-fa",
speak:"O bir adam",
question:"ترجمه را بساز:",
text:"O bir adam",
words:["است","مرد","یک","او"],
answer:["او","یک","مرد","است"]
},

{
type:"build-fa",
speak:"O bir kadın",
question:"ترجمه را بساز:",
text:"O bir kadın",
words:["یک","است","زن","او"],
answer:["او","یک","زن","است"]
},

{
type:"build-fa",
speak:"O bir oğlan",
question:"ترجمه را بساز:",
text:"O bir oğlan",
words:["است","پسر","یک","او"],
answer:["او","یک","پسر","است"]
},

{
type:"build-fa",
speak:"O bir kız",
question:"ترجمه را بساز:",
text:"O bir kız",
words:["است","دختر","یک","او"],
answer:["او","یک","دختر","است"]
},

{
type:"build-fa",
speak:"Bebek küçük",
question:"ترجمه را بساز:",
text:"Bebek küçük",
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
