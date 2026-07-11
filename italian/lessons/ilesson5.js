let current = 0;
let xp = 0;

function speak(text){
  if (!window.speechSynthesis) return;

  const utter = new SpeechSynthesisUtterance(text);
  utter.lang = "it";
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
question:"qual è pane ?",
speak:"pane",
options:[
{text:"riso",image:"../../media/food/rice.png"},
{text:"pane",image:"../../media/food/bread.png"},
{text:"carne",image:"../../media/food/meat.png"},
{text:"uovo",image:"../../media/food/egg.png"}
],
answer:"pane"
},

{
type:"image",
question:"qual è riso ?",
speak:"riso",
options:[
{text:"uovo",image:"../../media/food/egg.png"},
{text:"riso",image:"../../media/food/rice.png"},
{text:"latte",image:"../../media/food/milk.png"},
{text:"pane",image:"../../media/food/bread.png"}
],
answer:"riso"
},

{
type:"image",
question:"qual è carne ?",
speak:"carne",
options:[
{text:"pane",image:"../../media/food/bread.png"},
{text:"carne",image:"../../media/food/meat.png"},
{text:"latte",image:"../../media/food/milk.png"},
{text:"riso",image:"../../media/food/rice.png"}
],
answer:"carne"
},

{
type:"image",
question:"qual è uovo ?",
speak:"uovo",
options:[
{text:"carne",image:"../../media/food/meat.png"},
{text:"riso",image:"../../media/food/rice.png"},
{text:"uovo",image:"../../media/food/egg.png"},
{text:"pane",image:"../../media/food/bread.png"}
],
answer:"uovo"
},

{
type:"image",
question:"qual è latte ?",
speak:"latte",
options:[
{text:"uovo",image:"../../media/food/egg.png"},
{text:"pane",image:"../../media/food/bread.png"},
{text:"riso",image:"../../media/food/rice.png"},
{text:"latte",image:"../../media/food/milk.png"}
],
answer:"latte"
},

/* WORD */

{
type:"word",
question:"Che immagine è?",
image:"../../media/food/bread.png",
options:["riso","pane","carne","uovo"],
answer:"pane"
},

{
type:"word",
question:"Che immagine è?",
image:"../../media/food/rice.png",
options:["uovo","riso","latte","pane"],
answer:"riso"
},

{
type:"word",
question:"Che immagine è?",
image:"../../media/food/meat.png",
options:["pane","carne","latte","riso"],
answer:"carne"
},

{
type:"word",
question:"Che immagine è?",
image:"../../media/food/egg.png",
options:["carne","riso","uovo","pane"],
answer:"uovo"
},

{
type:"word",
question:"Che immagine è?",
image:"../../media/food/milk.png",
options:["uovo","pane","riso","latte"],
answer:"latte"
},

/* AUDIO */

{
type:"audio",
speak:"pane",
question:"Che parola hai sentito?",
options:["riso","pane","carne","uovo"],
answer:"pane"
},

{
type:"audio",
speak:"riso",
question:"Che parola hai sentito?",
options:["uovo","riso","latte","pane"],
answer:"riso"
},

{
type:"audio",
speak:"carne",
question:"Che parola hai sentito?",
options:["pane","carne","latte","riso"],
answer:"carne"
},

{
type:"audio",
speak:"uovo",
question:"Che parola hai sentito?",
options:["carne","riso","uovo","pane"],
answer:"uovo"
},

{
type:"audio",
speak:"latte",
question:"Che parola hai sentito?",
options:["uovo","pane","riso","latte"],
answer:"latte"
},

/* BUILD IT */

{
type:"build-it",
speak:"Io mangio il pane",
question:"Costruisci la frase in italiano:",
text:"من نان می‌خورم",
words:["pane","il","mangio","Io"],
answer:["Io","mangio","il","pane"]
},

{
type:"build-it",
speak:"Io mangio il riso",
question:"Costruisci la frase in italiano:",
text:"من برنج می‌خورم",
words:["riso","il","mangio","Io"],
answer:["Io","mangio","il","riso"]
},

{
type:"build-it",
speak:"Io mangio la carne",
question:"Costruisci la frase in italiano:",
text:"من گوشت می‌خورم",
words:["carne","la","mangio","Io"],
answer:["Io","mangio","la","carne"]
},

{
type:"build-it",
speak:"Io mangio un uovo",
question:"Costruisci la frase in italiano:",
text:"من تخم‌مرغ می‌خورم",
words:["uovo","un","mangio","Io"],
answer:["Io","mangio","un","uovo"]
},

{
type:"build-it",
speak:"Io bevo il latte",
question:"Costruisci la frase in italiano:",
text:"من شیر می‌نوشم",
words:["latte","il","bevo","Io"],
answer:["Io","bevo","il","latte"]
},

/* BUILD FA */

{
type:"build-fa",
speak:"Io mangio il pane",
question:"ترجمه را بساز:",
text:"Io mangio il pane",
words:["می‌خورم","نان","من"],
answer:["من","نان","می‌خورم"]
},

{
type:"build-fa",
speak:"Io mangio il riso",
question:"ترجمه را بساز:",
text:"Io mangio il riso",
words:["می‌خورم","برنج","من"],
answer:["من","برنج","می‌خورم"]
},

{
type:"build-fa",
speak:"Io mangio la carne",
question:"ترجمه را بساز:",
text:"Io mangio la carne",
words:["می‌خورم","گوشت","من"],
answer:["من","گوشت","می‌خورم"]
},

{
type:"build-fa",
speak:"Io mangio un uovo",
question:"ترجمه را بساز:",
text:"Io mangio un uovo",
words:["می‌خورم","تخم‌مرغ","یک","من"],
answer:["من","یک","تخم‌مرغ","می‌خورم"]
},

{
type:"build-fa",
speak:"Io bevo il latte",
question:"ترجمه را بساز:",
text:"Io bevo il latte",
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
