let current = 0;
let xp = 0;

function speak(text){
  if (!window.speechSynthesis) return;

  const utter = new SpeechSynthesisUtterance(text);
  utter.lang = "fr";
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
question:"lequel est pain ?",
speak:"pain",
options:[
{text:"riz",image:"../../media/food/rice.png"},
{text:"pain",image:"../../media/food/bread.png"},
{text:"viande",image:"../../media/food/meat.png"},
{text:"œuf",image:"../../media/food/egg.png"}
],
answer:"pain"
},

{
type:"image",
question:"lequel est riz ?",
speak:"riz",
options:[
{text:"œuf",image:"../../media/food/egg.png"},
{text:"riz",image:"../../media/food/rice.png"},
{text:"lait",image:"../../media/food/milk.png"},
{text:"pain",image:"../../media/food/bread.png"}
],
answer:"riz"
},

{
type:"image",
question:"lequel est viande ?",
speak:"viande",
options:[
{text:"pain",image:"../../media/food/bread.png"},
{text:"viande",image:"../../media/food/meat.png"},
{text:"lait",image:"../../media/food/milk.png"},
{text:"riz",image:"../../media/food/rice.png"}
],
answer:"viande"
},

{
type:"image",
question:"lequel est œuf ?",
speak:"œuf",
options:[
{text:"viande",image:"../../media/food/meat.png"},
{text:"riz",image:"../../media/food/rice.png"},
{text:"œuf",image:"../../media/food/egg.png"},
{text:"pain",image:"../../media/food/bread.png"}
],
answer:"œuf"
},

{
type:"image",
question:"lequel est lait ?",
speak:"lait",
options:[
{text:"œuf",image:"../../media/food/egg.png"},
{text:"pain",image:"../../media/food/bread.png"},
{text:"riz",image:"../../media/food/rice.png"},
{text:"lait",image:"../../media/food/milk.png"}
],
answer:"lait"
},

/* WORD */

{
type:"word",
question:"Cette image représente quoi ?",
image:"../../media/food/bread.png",
options:["riz","pain","viande","œuf"],
answer:"pain"
},

{
type:"word",
question:"Cette image représente quoi ?",
image:"../../media/food/rice.png",
options:["œuf","riz","lait","pain"],
answer:"riz"
},

{
type:"word",
question:"Cette image représente quoi ?",
image:"../../media/food/meat.png",
options:["pain","viande","lait","riz"],
answer:"viande"
},

{
type:"word",
question:"Cette image représente quoi ?",
image:"../../media/food/egg.png",
options:["viande","riz","œuf","pain"],
answer:"œuf"
},

{
type:"word",
question:"Cette image représente quoi ?",
image:"../../media/food/milk.png",
options:["œuf","pain","riz","lait"],
answer:"lait"
},

/* AUDIO */

{
type:"audio",
speak:"pain",
question:"Quel mot as-tu entendu ?",
options:["riz","pain","viande","œuf"],
answer:"pain"
},

{
type:"audio",
speak:"riz",
question:"Quel mot as-tu entendu ?",
options:["œuf","riz","lait","pain"],
answer:"riz"
},

{
type:"audio",
speak:"viande",
question:"Quel mot as-tu entendu ?",
options:["pain","viande","lait","riz"],
answer:"viande"
},

{
type:"audio",
speak:"œuf",
question:"Quel mot as-tu entendu ?",
options:["viande","riz","œuf","pain"],
answer:"œuf"
},

{
type:"audio",
speak:"lait",
question:"Quel mot as-tu entendu ?",
options:["œuf","pain","riz","lait"],
answer:"lait"
},

/* BUILD FR */

{
type:"build-fr",
speak:"Je mange du pain",
question:"Construisez la phrase française :",
text:"من نان می‌خورم",
words:["pain","du","mange","Je"],
answer:["Je","mange","du","pain"]
},

{
type:"build-fr",
speak:"Je mange du riz",
question:"Construisez la phrase française :",
text:"من برنج می‌خورم",
words:["riz","du","mange","Je"],
answer:["Je","mange","du","riz"]
},

{
type:"build-fr",
speak:"Je mange de la viande",
question:"Construisez la phrase française :",
text:"من گوشت می‌خورم",
words:["viande","la","de","mange","Je"],
answer:["Je","mange","de","la","viande"]
},

{
type:"build-fr",
speak:"Je mange un œuf",
question:"Construisez la phrase française :",
text:"من تخم‌مرغ می‌خورم",
words:["œuf","un","mange","Je"],
answer:["Je","mange","un","œuf"]
},

{
type:"build-fr",
speak:"Je bois du lait",
question:"Construisez la phrase française :",
text:"من شیر می‌نوشم",
words:["lait","du","bois","Je"],
answer:["Je","bois","du","lait"]
},

/* BUILD FA */

{
type:"build-fa",
speak:"Je mange du pain",
question:"ترجمه را بساز:",
text:"Je mange du pain",
words:["می‌خورم","نان","من"],
answer:["من","نان","می‌خورم"]
},

{
type:"build-fa",
speak:"Je mange du riz",
question:"ترجمه را بساز:",
text:"Je mange du riz",
words:["می‌خورم","برنج","من"],
answer:["من","برنج","می‌خورم"]
},

{
type:"build-fa",
speak:"Je mange de la viande",
question:"ترجمه را بساز:",
text:"Je mange de la viande",
words:["می‌خورم","گوشت","من"],
answer:["من","گوشت","می‌خورم"]
},

{
type:"build-fa",
speak:"Je mange un œuf",
question:"ترجمه را بساز:",
text:"Je mange un œuf",
words:["می‌خورم","تخم‌مرغ","یک","من"],
answer:["من","یک","تخم‌مرغ","می‌خورم"]
},

{
type:"build-fa",
speak:"Je bois du lait",
question:"ترجمه را بساز:",
text:"Je bois du lait",
words:["می‌نوشم","شیر","من"],
answer:["من","شیر","می‌نوشم"]
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

 else if (q.type === "build-en" || q.type === "build-fr" || q.type === "build-fa") {
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

  if (q.type === "build-en" || q.type === "build-fr") {
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
