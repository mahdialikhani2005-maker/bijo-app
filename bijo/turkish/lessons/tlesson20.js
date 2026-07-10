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
question:"hangisi kim ?",
speak:"kim",
options:[
{text:"ne",image:"../../media/questions/what.png"},
{text:"kim",image:"../../media/questions/who.png"},
{text:"nerede",image:"../../media/questions/where.png"},
{text:"ne zaman",image:"../../media/questions/when.png"}
],
answer:"kim"
},

{
type:"image",
question:"hangisi ne ?",
speak:"ne",
options:[
{text:"neden",image:"../../media/questions/why.png"},
{text:"ne",image:"../../media/questions/what.png"},
{text:"kim",image:"../../media/questions/who.png"},
{text:"nerede",image:"../../media/questions/where.png"}
],
answer:"ne"
},

{
type:"image",
question:"hangisi nerede ?",
speak:"nerede",
options:[
{text:"ne",image:"../../media/questions/what.png"},
{text:"nerede",image:"../../media/questions/where.png"},
{text:"neden",image:"../../media/questions/why.png"},
{text:"kim",image:"../../media/questions/who.png"}
],
answer:"nerede"
},

{
type:"image",
question:"hangisi ne zaman ?",
speak:"ne zaman",
options:[
{text:"nerede",image:"../../media/questions/where.png"},
{text:"kim",image:"../../media/questions/who.png"},
{text:"ne zaman",image:"../../media/questions/when.png"},
{text:"ne",image:"../../media/questions/what.png"}
],
answer:"ne zaman"
},

{
type:"image",
question:"hangisi neden ?",
speak:"neden",
options:[
{text:"ne zaman",image:"../../media/questions/when.png"},
{text:"ne",image:"../../media/questions/what.png"},
{text:"kim",image:"../../media/questions/who.png"},
{text:"neden",image:"../../media/questions/why.png"}
],
answer:"neden"
},

/* WORD */

{
type:"word",
question:"Bu resim ne?",
image:"../../media/questions/who.png",
options:["ne","kim","nerede","ne zaman"],
answer:"kim"
},

{
type:"word",
question:"Bu resim ne?",
image:"../../media/questions/what.png",
options:["neden","ne","kim","nerede"],
answer:"ne"
},

{
type:"word",
question:"Bu resim ne?",
image:"../../media/questions/where.png",
options:["ne","nerede","neden","kim"],
answer:"nerede"
},

{
type:"word",
question:"Bu resim ne?",
image:"../../media/questions/when.png",
options:["nerede","kim","ne zaman","ne"],
answer:"ne zaman"
},

{
type:"word",
question:"Bu resim ne?",
image:"../../media/questions/why.png",
options:["ne zaman","ne","kim","neden"],
answer:"neden"
},

/* AUDIO */

{
type:"audio",
speak:"kim",
question:"Hangi kelimeyi duydun?",
options:["ne","kim","nerede","ne zaman"],
answer:"kim"
},

{
type:"audio",
speak:"ne",
question:"Hangi kelimeyi duydun?",
options:["neden","ne","kim","nerede"],
answer:"ne"
},

{
type:"audio",
speak:"nerede",
question:"Hangi kelimeyi duydun?",
options:["ne","nerede","neden","kim"],
answer:"nerede"
},

{
type:"audio",
speak:"ne zaman",
question:"Hangi kelimeyi duydun?",
options:["nerede","kim","ne zaman","ne"],
answer:"ne zaman"
},

{
type:"audio",
speak:"neden",
question:"Hangi kelimeyi duydun?",
options:["ne zaman","ne","kim","neden"],
answer:"neden"
},

/* BUILD TR */

{
type:"build-tr",
speak:"O kim?",
question:"Türkçe cümleyi kur:",
text:"او کیست؟",
words:["O","kim"],
answer:["O","kim?"]
},

{
type:"build-tr",
speak:"Bu ne?",
question:"Türkçe cümleyi kur:",
text:"این چیست؟",
words:["Bu","ne"],
answer:["Bu","ne?"]
},

{
type:"build-tr",
speak:"Okul nerede?",
question:"Türkçe cümleyi kur:",
text:"مدرسه کجاست؟",
words:["Okul","nerede"],
answer:["Okul","nerede?"]
},

{
type:"build-tr",
speak:"Ders ne zaman?",
question:"Türkçe cümleyi kur:",
text:"کلاس کی است؟",
words:["Ders","ne","zaman"],
answer:["Ders","ne","zaman?"]
},

{
type:"build-tr",
speak:"Neden mutlusun?",
question:"Türkçe cümleyi kur:",
text:"چرا خوشحالی؟",
words:["Neden","mutlusun"],
answer:["Neden","mutlusun?"]
},

/* BUILD FA */

{
type:"build-fa",
speak:"O kim?",
question:"ترجمه را بساز:",
text:"O kim?",
words:["کیست","او"],
answer:["او","کیست؟"]
},

{
type:"build-fa",
speak:"Bu ne?",
question:"ترجمه را بساز:",
text:"Bu ne?",
words:["چیست","این"],
answer:["این","چیست؟"]
},

{
type:"build-fa",
speak:"Okul nerede?",
question:"ترجمه را بساز:",
text:"Okul nerede?",
words:["کجاست","مدرسه"],
answer:["مدرسه","کجاست؟"]
},

{
type:"build-fa",
speak:"Ders ne zaman?",
question:"ترجمه را بساز:",
text:"Ders ne zaman?",
words:["کیست","کلاس"],
answer:["کلاس","کیست؟"]
},

{
type:"build-fa",
speak:"Neden mutlusun?",
question:"ترجمه را بساز:",
text:"Neden mutlusun?",
words:["چرا","خوشحال","تو","هستی"],
answer:["تو","چرا","خوشحال","هستی؟"]
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
