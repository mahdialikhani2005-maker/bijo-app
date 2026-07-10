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
question:"¿cuál es cabeza ?",
speak:"cabeza",
options:[
{text:"mano",image:"../../media/body/hand.png"},
{text:"cabeza",image:"../../media/body/head.png"},
{text:"ojo",image:"../../media/body/eye.png"},
{text:"nariz",image:"../../media/body/nose.png"}
],
answer:"cabeza"
},

{
type:"image",
question:"¿cuál es mano ?",
speak:"mano",
options:[
{text:"ojo",image:"../../media/body/eye.png"},
{text:"mano",image:"../../media/body/hand.png"},
{text:"pie",image:"../../media/body/foot.png"},
{text:"cabeza",image:"../../media/body/head.png"}
],
answer:"mano"
},

{
type:"image",
question:"¿cuál es ojo ?",
speak:"ojo",
options:[
{text:"cabeza",image:"../../media/body/head.png"},
{text:"ojo",image:"../../media/body/eye.png"},
{text:"nariz",image:"../../media/body/nose.png"},
{text:"mano",image:"../../media/body/hand.png"}
],
answer:"ojo"
},

{
type:"image",
question:"¿cuál es pie ?",
speak:"pie",
options:[
{text:"mano",image:"../../media/body/hand.png"},
{text:"cabeza",image:"../../media/body/head.png"},
{text:"pie",image:"../../media/body/foot.png"},
{text:"ojo",image:"../../media/body/eye.png"}
],
answer:"pie"
},

{
type:"image",
question:"¿cuál es nariz ?",
speak:"nariz",
options:[
{text:"ojo",image:"../../media/body/eye.png"},
{text:"nariz",image:"../../media/body/nose.png"},
{text:"cabeza",image:"../../media/body/head.png"},
{text:"mano",image:"../../media/body/hand.png"}
],
answer:"nariz"
},

/* WORD */

{
type:"word",
question:"¿Qué es esta imagen?",
image:"../../media/body/head.png",
options:["mano","cabeza","ojo","nariz"],
answer:"cabeza"
},

{
type:"word",
question:"¿Qué es esta imagen?",
image:"../../media/body/hand.png",
options:["ojo","mano","pie","cabeza"],
answer:"mano"
},

{
type:"word",
question:"¿Qué es esta imagen?",
image:"../../media/body/eye.png",
options:["cabeza","ojo","nariz","mano"],
answer:"ojo"
},

{
type:"word",
question:"¿Qué es esta imagen?",
image:"../../media/body/foot.png",
options:["mano","pie","cabeza","ojo"],
answer:"pie"
},

{
type:"word",
question:"¿Qué es esta imagen?",
image:"../../media/body/nose.png",
options:["ojo","nariz","mano","cabeza"],
answer:"nariz"
},

/* AUDIO */

{
type:"audio",
speak:"cabeza",
question:"¿Qué palabra escuchaste?",
options:["mano","cabeza","ojo","nariz"],
answer:"cabeza"
},

{
type:"audio",
speak:"mano",
question:"¿Qué palabra escuchaste?",
options:["ojo","mano","pie","cabeza"],
answer:"mano"
},

{
type:"audio",
speak:"ojo",
question:"¿Qué palabra escuchaste?",
options:["cabeza","ojo","nariz","mano"],
answer:"ojo"
},

{
type:"audio",
speak:"pie",
question:"¿Qué palabra escuchaste?",
options:["mano","pie","cabeza","ojo"],
answer:"pie"
},

{
type:"audio",
speak:"nariz",
question:"¿Qué palabra escuchaste?",
options:["ojo","nariz","mano","cabeza"],
answer:"nariz"
},

/* BUILD ES */

{
type:"build-es",
speak:"Esta es mi cabeza",
question:"Construya la frase en español:",
text:"این سر من است",
words:["cabeza","mi","es","Esta"],
answer:["Esta","es","mi","cabeza"]
},

{
type:"build-es",
speak:"Esta es mi mano",
question:"Construya la frase en español:",
text:"این دست من است",
words:["mano","mi","es","Esta"],
answer:["Esta","es","mi","mano"]
},

{
type:"build-es",
speak:"Este es mi ojo",
question:"Construya la frase en español:",
text:"این چشم من است",
words:["ojo","mi","es","Este"],
answer:["Este","es","mi","ojo"]
},

{
type:"build-es",
speak:"Este es mi pie",
question:"Construya la frase en español:",
text:"این پای من است",
words:["pie","mi","es","Este"],
answer:["Este","es","mi","pie"]
},

{
type:"build-es",
speak:"Esta es mi nariz",
question:"Construya la frase en español:",
text:"این بینی من است",
words:["nariz","mi","es","Esta"],
answer:["Esta","es","mi","nariz"]
},

/* BUILD FA */

{
type:"build-fa",
speak:"Esta es mi cabeza",
question:"ترجمه را بساز:",
text:"Esta es mi cabeza",
words:["است","سر","این","من"],
answer:["این","سر","من","است"]
},

{
type:"build-fa",
speak:"Esta es mi mano",
question:"ترجمه را بساز:",
text:"Esta es mi mano",
words:["است","دست","این","من"],
answer:["این","دست","من","است"]
},

{
type:"build-fa",
speak:"Este es mi ojo",
question:"ترجمه را بساز:",
text:"Este es mi ojo",
words:["است","چشم","این","من"],
answer:["این","چشم","من","است"]
},

{
type:"build-fa",
speak:"Este es mi pie",
question:"ترجمه را بساز:",
text:"Este es mi pie",
words:["است","پا","این","من"],
answer:["این","پا","من","است"]
},

{
type:"build-fa",
speak:"Esta es mi nariz",
question:"ترجمه را بساز:",
text:"Esta es mi nariz",
words:["است","بینی","این","من"],
answer:["این","بینی","من","است"]
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
