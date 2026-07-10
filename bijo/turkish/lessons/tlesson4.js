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
question:"hangisi gömlek ?",
speak:"gömlek",
options:[
{text:"pantolon",image:"../../media/clothes/pants.png"},
{text:"gömlek",image:"../../media/clothes/shirt.png"},
{text:"şapka",image:"../../media/clothes/hat.png"},
{text:"elbise",image:"../../media/clothes/dress.png"}
],
answer:"gömlek"
},

{
type:"image",
question:"hangisi pantolon ?",
speak:"pantolon",
options:[
{text:"elbise",image:"../../media/clothes/dress.png"},
{text:"pantolon",image:"../../media/clothes/pants.png"},
{text:"ayakkabı",image:"../../media/clothes/shoes.png"},
{text:"gömlek",image:"../../media/clothes/shirt.png"}
],
answer:"pantolon"
},

{
type:"image",
question:"hangisi ayakkabı ?",
speak:"ayakkabı",
options:[
{text:"gömlek",image:"../../media/clothes/shirt.png"},
{text:"ayakkabı",image:"../../media/clothes/shoes.png"},
{text:"şapka",image:"../../media/clothes/hat.png"},
{text:"pantolon",image:"../../media/clothes/pants.png"}
],
answer:"ayakkabı"
},

{
type:"image",
question:"hangisi şapka ?",
speak:"şapka",
options:[
{text:"ayakkabı",image:"../../media/clothes/shoes.png"},
{text:"pantolon",image:"../../media/clothes/pants.png"},
{text:"şapka",image:"../../media/clothes/hat.png"},
{text:"gömlek",image:"../../media/clothes/shirt.png"}
],
answer:"şapka"
},

{
type:"image",
question:"hangisi elbise ?",
speak:"elbise",
options:[
{text:"şapka",image:"../../media/clothes/hat.png"},
{text:"gömlek",image:"../../media/clothes/shirt.png"},
{text:"pantolon",image:"../../media/clothes/pants.png"},
{text:"elbise",image:"../../media/clothes/dress.png"}
],
answer:"elbise"
},

/* WORD */

{
type:"word",
question:"Bu resim ne?",
image:"../../media/clothes/shirt.png",
options:["pantolon","gömlek","şapka","elbise"],
answer:"gömlek"
},

{
type:"word",
question:"Bu resim ne?",
image:"../../media/clothes/pants.png",
options:["elbise","pantolon","ayakkabı","gömlek"],
answer:"pantolon"
},

{
type:"word",
question:"Bu resim ne?",
image:"../../media/clothes/shoes.png",
options:["gömlek","ayakkabı","şapka","pantolon"],
answer:"ayakkabı"
},

{
type:"word",
question:"Bu resim ne?",
image:"../../media/clothes/hat.png",
options:["ayakkabı","pantolon","şapka","gömlek"],
answer:"şapka"
},

{
type:"word",
question:"Bu resim ne?",
image:"../../media/clothes/dress.png",
options:["şapka","gömlek","pantolon","elbise"],
answer:"elbise"
},

/* AUDIO */

{
type:"audio",
speak:"gömlek",
question:"Hangi kelimeyi duydun?",
options:["pantolon","gömlek","şapka","elbise"],
answer:"gömlek"
},

{
type:"audio",
speak:"pantolon",
question:"Hangi kelimeyi duydun?",
options:["elbise","pantolon","ayakkabı","gömlek"],
answer:"pantolon"
},

{
type:"audio",
speak:"ayakkabı",
question:"Hangi kelimeyi duydun?",
options:["gömlek","ayakkabı","şapka","pantolon"],
answer:"ayakkabı"
},

{
type:"audio",
speak:"şapka",
question:"Hangi kelimeyi duydun?",
options:["ayakkabı","pantolon","şapka","gömlek"],
answer:"şapka"
},

{
type:"audio",
speak:"elbise",
question:"Hangi kelimeyi duydun?",
options:["şapka","gömlek","pantolon","elbise"],
answer:"elbise"
},

/* BUILD TR */

{
type:"build-tr",
speak:"Bu bir gömlek",
question:"Türkçe cümleyi kur:",
text:"این یک پیراهن است",
words:["gömlek","bir","Bu"],
answer:["Bu","bir","gömlek"]
},

{
type:"build-tr",
speak:"Bu bir pantolon",
question:"Türkçe cümleyi kur:",
text:"این یک شلوار است",
words:["pantolon","bir","Bu"],
answer:["Bu","bir","pantolon"]
},

{
type:"build-tr",
speak:"Bunlar ayakkabı",
question:"Türkçe cümleyi kur:",
text:"این کفش‌ها هستند",
words:["ayakkabı","Bunlar"],
answer:["Bunlar","ayakkabı"]
},

{
type:"build-tr",
speak:"Bu bir şapka",
question:"Türkçe cümleyi kur:",
text:"این یک کلاه است",
words:["şapka","bir","Bu"],
answer:["Bu","bir","şapka"]
},

{
type:"build-tr",
speak:"Bu bir elbise",
question:"Türkçe cümleyi kur:",
text:"این یک لباس است",
words:["elbise","bir","Bu"],
answer:["Bu","bir","elbise"]
},

/* BUILD FA */

{
type:"build-fa",
speak:"Bu bir gömlek",
question:"ترجمه را بساز:",
text:"Bu bir gömlek",
words:["است","پیراهن","یک","این"],
answer:["این","یک","پیراهن","است"]
},

{
type:"build-fa",
speak:"Bu bir pantolon",
question:"ترجمه را بساز:",
text:"Bu bir pantolon",
words:["است","شلوار","یک","این"],
answer:["این","یک","شلوار","است"]
},

{
type:"build-fa",
speak:"Bunlar ayakkabı",
question:"ترجمه را بساز:",
text:"Bunlar ayakkabı",
words:["هستند","کفش‌ها","این"],
answer:["این","کفش‌ها","هستند"]
},

{
type:"build-fa",
speak:"Bu bir şapka",
question:"ترجمه را بساز:",
text:"Bu bir şapka",
words:["است","کلاه","یک","این"],
answer:["این","یک","کلاه","است"]
},

{
type:"build-fa",
speak:"Bu bir elbise",
question:"ترجمه را بساز:",
text:"Bu bir elbise",
words:["است","لباس","یک","این"],
answer:["این","یک","لباس","است"]
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
