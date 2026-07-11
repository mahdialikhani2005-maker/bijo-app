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
question:"hangisi mutlu ?",
speak:"mutlu",
options:[
{text:"üzgün",image:"../../media/feelings/sad.png"},
{text:"mutlu",image:"../../media/feelings/happy.png"},
{text:"kızgın",image:"../../media/feelings/angry.png"},
{text:"yorgun",image:"../../media/feelings/tired.png"}
],
answer:"mutlu"
},

{
type:"image",
question:"hangisi üzgün ?",
speak:"üzgün",
options:[
{text:"yorgun",image:"../../media/feelings/tired.png"},
{text:"üzgün",image:"../../media/feelings/sad.png"},
{text:"aç",image:"../../media/feelings/hungry.png"},
{text:"mutlu",image:"../../media/feelings/happy.png"}
],
answer:"üzgün"
},

{
type:"image",
question:"hangisi kızgın ?",
speak:"kızgın",
options:[
{text:"mutlu",image:"../../media/feelings/happy.png"},
{text:"kızgın",image:"../../media/feelings/angry.png"},
{text:"aç",image:"../../media/feelings/hungry.png"},
{text:"üzgün",image:"../../media/feelings/sad.png"}
],
answer:"kızgın"
},

{
type:"image",
question:"hangisi yorgun ?",
speak:"yorgun",
options:[
{text:"kızgın",image:"../../media/feelings/angry.png"},
{text:"üzgün",image:"../../media/feelings/sad.png"},
{text:"yorgun",image:"../../media/feelings/tired.png"},
{text:"mutlu",image:"../../media/feelings/happy.png"}
],
answer:"yorgun"
},

{
type:"image",
question:"hangisi aç ?",
speak:"aç",
options:[
{text:"yorgun",image:"../../media/feelings/tired.png"},
{text:"mutlu",image:"../../media/feelings/happy.png"},
{text:"üzgün",image:"../../media/feelings/sad.png"},
{text:"aç",image:"../../media/feelings/hungry.png"}
],
answer:"aç"
},

/* WORD */

{
type:"word",
question:"Bu resim ne?",
image:"../../media/feelings/happy.png",
options:["üzgün","mutlu","kızgın","yorgun"],
answer:"mutlu"
},

{
type:"word",
question:"Bu resim ne?",
image:"../../media/feelings/sad.png",
options:["yorgun","üzgün","aç","mutlu"],
answer:"üzgün"
},

{
type:"word",
question:"Bu resim ne?",
image:"../../media/feelings/angry.png",
options:["mutlu","kızgın","aç","üzgün"],
answer:"kızgın"
},

{
type:"word",
question:"Bu resim ne?",
image:"../../media/feelings/tired.png",
options:["kızgın","üzgün","yorgun","mutlu"],
answer:"yorgun"
},

{
type:"word",
question:"Bu resim ne?",
image:"../../media/feelings/hungry.png",
options:["yorgun","mutlu","üzgün","aç"],
answer:"aç"
},

/* AUDIO */

{
type:"audio",
speak:"mutlu",
question:"Hangi kelimeyi duydun?",
options:["üzgün","mutlu","kızgın","yorgun"],
answer:"mutlu"
},

{
type:"audio",
speak:"üzgün",
question:"Hangi kelimeyi duydun?",
options:["yorgun","üzgün","aç","mutlu"],
answer:"üzgün"
},

{
type:"audio",
speak:"kızgın",
question:"Hangi kelimeyi duydun?",
options:["mutlu","kızgın","aç","üzgün"],
answer:"kızgın"
},

{
type:"audio",
speak:"yorgun",
question:"Hangi kelimeyi duydun?",
options:["kızgın","üzgün","yorgun","mutlu"],
answer:"yorgun"
},

{
type:"audio",
speak:"aç",
question:"Hangi kelimeyi duydun?",
options:["yorgun","mutlu","üzgün","aç"],
answer:"aç"
},

/* BUILD TR */

{
type:"build-tr",
speak:"Ben mutluyum",
question:"Türkçe cümleyi kur:",
text:"من خوشحال هستم",
words:["mutluyum","Ben"],
answer:["Ben","mutluyum"]
},

{
type:"build-tr",
speak:"Ben üzgünüm",
question:"Türkçe cümleyi kur:",
text:"من ناراحت هستم",
words:["üzgünüm","Ben"],
answer:["Ben","üzgünüm"]
},

{
type:"build-tr",
speak:"Ben kızgınım",
question:"Türkçe cümleyi kur:",
text:"من عصبانی هستم",
words:["kızgınım","Ben"],
answer:["Ben","kızgınım"]
},

{
type:"build-tr",
speak:"Ben yorgunum",
question:"Türkçe cümleyi kur:",
text:"من خسته هستم",
words:["yorgunum","Ben"],
answer:["Ben","yorgunum"]
},

{
type:"build-tr",
speak:"Ben açım",
question:"Türkçe cümleyi kur:",
text:"من گرسنه هستم",
words:["açım","Ben"],
answer:["Ben","açım"]
},

/* BUILD FA */

{
type:"build-fa",
speak:"Ben mutluyum",
question:"ترجمه را بساز:",
text:"Ben mutluyum",
words:["هستم","خوشحال","من"],
answer:["من","خوشحال","هستم"]
},

{
type:"build-fa",
speak:"Ben üzgünüm",
question:"ترجمه را بساز:",
text:"Ben üzgünüm",
words:["هستم","ناراحت","من"],
answer:["من","ناراحت","هستم"]
},

{
type:"build-fa",
speak:"Ben kızgınım",
question:"ترجمه را بساز:",
text:"Ben kızgınım",
words:["هستم","عصبانی","من"],
answer:["من","عصبانی","هستم"]
},

{
type:"build-fa",
speak:"Ben yorgunum",
question:"ترجمه را بساز:",
text:"Ben yorgunum",
words:["هستم","خسته","من"],
answer:["من","خسته","هستم"]
},

{
type:"build-fa",
speak:"Ben açım",
question:"ترجمه را بساز:",
text:"Ben açım",
words:["هستم","گرسنه","من"],
answer:["من","گرسنه","هستم"]
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
