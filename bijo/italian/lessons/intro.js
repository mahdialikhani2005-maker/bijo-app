// ===== گرفتن شماره درس از آدرس =====
const urlParams = new URLSearchParams(window.location.search);
const lessonId = urlParams.get('lesson');

// ===== دیتابیس همه درس‌های ایتالیایی =====
const allLessons = {
  "it-lesson1": {
    title: "Lezione 1: Persone",
    nextPage: "lesson1.html",
    words: [
      { it: "uomo", fa: "مرد", image: "../../media/people/man.png" },
      { it: "donna", fa: "زن", image: "../../media/people/woman.png" },
      { it: "ragazzo", fa: "پسر", image: "../../media/people/boy.png" },
      { it: "ragazza", fa: "دختر", image: "../../media/people/girl.png" },
      { it: "bambino", fa: "نوزاد", image: "../../media/people/baby.png" }
    ]
  },
  "it-lesson2": {
    title: "Lezione 2: Il corpo",
    nextPage: "lesson2.html",
    words: [
      { it: "testa", fa: "سر", image: "../../media/body/head.png" },
      { it: "mano", fa: "دست", image: "../../media/body/hand.png" },
      { it: "occhio", fa: "چشم", image: "../../media/body/eye.png" },
      { it: "piede", fa: "پا", image: "../../media/body/foot.png" },
      { it: "naso", fa: "بینی", image: "../../media/body/nose.png" }
    ]
  },
  "it-lesson3": {
    title: "Lezione 3: Casa",
    nextPage: "lesson3.html",
    words: [
      { it: "casa", fa: "خانه", image: "../../media/house/house.png" },
      { it: "camera", fa: "اتاق", image: "../../media/house/room.png" },
      { it: "porta", fa: "در", image: "../../media/house/door.png" },
      { it: "finestra", fa: "پنجره", image: "../../media/house/window.png" },
      { it: "cucina", fa: "آشپزخانه", image: "../../media/house/kitchen.png" }
    ]
  },
  "it-lesson4": {
    title: "Lezione 4: Abbigliamento",
    nextPage: "lesson4.html",
    words: [
      { it: "camicia", fa: "پیراهن", image: "../../media/clothes/shirt.png" },
      { it: "pantaloni", fa: "شلوار", image: "../../media/clothes/pants.png" },
      { it: "scarpe", fa: "کفش", image: "../../media/clothes/shoes.png" },
      { it: "cappello", fa: "کلاه", image: "../../media/clothes/hat.png" },
      { it: "vestito", fa: "لباس", image: "../../media/clothes/dress.png" }
    ]
  },
  "it-lesson5": {
    title: "Lezione 5: Cibo",
    nextPage: "lesson5.html",
    words: [
      { it: "pane", fa: "نان", image: "../../media/food/bread.png" },
      { it: "riso", fa: "برنج", image: "../../media/food/rice.png" },
      { it: "carne", fa: "گوشت", image: "../../media/food/meat.png" },
      { it: "uovo", fa: "تخم‌مرغ", image: "../../media/food/egg.png" },
      { it: "latte", fa: "شیر", image: "../../media/food/milk.png" }
    ]
  },
  "it-lesson6": {
    title: "Lezione 6: Frutta",
    nextPage: "lesson6.html",
    words: [
      { it: "mela", fa: "سیب", image: "../../media/fruits/apple.png" },
      { it: "banana", fa: "موز", image: "../../media/fruits/banana.png" },
      { it: "arancia", fa: "پرتقال", image: "../../media/fruits/orange.png" },
      { it: "uva", fa: "انگور", image: "../../media/fruits/grape.png" },
      { it: "anguria", fa: "هندوانه", image: "../../media/fruits/watermelon.png" }
    ]
  },
  "it-lesson7": {
    title: "Lezione 7: Verdure",
    nextPage: "lesson7.html",
    words: [
      { it: "pomodoro", fa: "گوجه", image: "../../media/vegetables/tomato.png" },
      { it: "patata", fa: "سیب‌زمینی", image: "../../media/vegetables/potato.png" },
      { it: "carota", fa: "هویج", image: "../../media/vegetables/carrot.png" },
      { it: "cipolla", fa: "پیاز", image: "../../media/vegetables/onion.png" },
      { it: "cetriolo", fa: "خیار", image: "../../media/vegetables/cucumber.png" }
    ]
  },
  "it-lesson8": {
    title: "Lezione 8: Animali",
    nextPage: "lesson8.html",
    words: [
      { it: "cane", fa: "سگ", image: "../../media/animals/dog.png" },
      { it: "gatto", fa: "گربه", image: "../../media/animals/cat.png" },
      { it: "uccello", fa: "پرنده", image: "../../media/animals/bird.png" },
      { it: "pesce", fa: "ماهی", image: "../../media/animals/fish.png" },
      { it: "cavallo", fa: "اسب", image: "../../media/animals/horse.png" }
    ]
  },
  "it-lesson9": {
    title: "Lezione 9: Natura",
    nextPage: "lesson9.html",
    words: [
      { it: "sole", fa: "خورشید", image: "../../media/nature/sun.png" },
      { it: "luna", fa: "ماه", image: "../../media/nature/moon.png" },
      { it: "stella", fa: "ستاره", image: "../../media/nature/star.png" },
      { it: "cielo", fa: "آسمان", image: "../../media/nature/sky.png" },
      { it: "pioggia", fa: "باران", image: "../../media/nature/rain.png" }
    ]
  },
  "it-lesson10": {
    title: "Lezione 10: Meteo",
    nextPage: "lesson10.html",
    words: [
      { it: "caldo", fa: "گرم", image: "../../media/weather/hot.png" },
      { it: "freddo", fa: "سرد", image: "../../media/weather/cold.png" },
      { it: "soleggiato", fa: "آفتابی", image: "../../media/weather/sunny.png" },
      { it: "nuvoloso", fa: "ابری", image: "../../media/weather/cloudy.png" },
      { it: "vento", fa: "باد", image: "../../media/weather/wind.png" }
    ]
  },
  "it-lesson11": {
    title: "Lezione 11: Colori",
    nextPage: "lesson11.html",
    words: [
      { it: "rosso", fa: "قرمز", image: "../../media/colors/red.png" },
      { it: "blu", fa: "آبی", image: "../../media/colors/blue.png" },
      { it: "verde", fa: "سبز", image: "../../media/colors/green.png" },
      { it: "giallo", fa: "زرد", image: "../../media/colors/yellow.png" },
      { it: "nero", fa: "مشکی", image: "../../media/colors/black.png" }
    ]
  },
  "it-lesson12": {
    title: "Lezione 12: Numeri",
    nextPage: "lesson12.html",
    words: [
      { it: "uno", fa: "یک", image: "../../media/numbers/one.png" },
      { it: "due", fa: "دو", image: "../../media/numbers/two.png" },
      { it: "tre", fa: "سه", image: "../../media/numbers/three.png" },
      { it: "quattro", fa: "چهار", image: "../../media/numbers/four.png" },
      { it: "cinque", fa: "پنج", image: "../../media/numbers/five.png" }
    ]
  },
  "it-lesson13": {
    title: "Lezione 13: Tempo",
    nextPage: "lesson13.html",
    words: [
      { it: "oggi", fa: "امروز", image: "../../media/time/today.png" },
      { it: "domani", fa: "فردا", image: "../../media/time/tomorrow.png" },
      { it: "ieri", fa: "دیروز", image: "../../media/time/yesterday.png" },
      { it: "mattino", fa: "صبح", image: "../../media/time/morning.png" },
      { it: "notte", fa: "شب", image: "../../media/time/night.png" }
    ]
  },
  "it-lesson14": {
    title: "Lezione 14: Professioni",
    nextPage: "lesson14.html",
    words: [
      { it: "insegnante", fa: "معلم", image: "../../media/jobs/teacher.png" },
      { it: "medico", fa: "دکتر", image: "../../media/jobs/doctor.png" },
      { it: "ingegnere", fa: "مهندس", image: "../../media/jobs/engineer.png" },
      { it: "studente", fa: "دانش‌آموز", image: "../../media/jobs/student.png" },
      { it: "autista", fa: "راننده", image: "../../media/jobs/driver.png" }
    ]
  },
  "it-lesson15": {
    title: "Lezione 15: Veicoli",
    nextPage: "lesson15.html",
    words: [
      { it: "macchina", fa: "ماشین", image: "../../media/vehicles/car.png" },
      { it: "autobus", fa: "اتوبوس", image: "../../media/vehicles/bus.png" },
      { it: "treno", fa: "قطار", image: "../../media/vehicles/train.png" },
      { it: "aereo", fa: "هواپیما", image: "../../media/vehicles/airplane.png" },
      { it: "bicicletta", fa: "دوچرخه", image: "../../media/vehicles/bicycle.png" }
    ]
  },
  "it-lesson16": {
    title: "Lezione 16: Luoghi",
    nextPage: "lesson16.html",
    words: [
      { it: "scuola", fa: "مدرسه", image: "../../media/places/school.png" },
      { it: "ospedale", fa: "بیمارستان", image: "../../media/places/hospital.png" },
      { it: "negozio", fa: "فروشگاه", image: "../../media/places/store.png" },
      { it: "parco", fa: "پارک", image: "../../media/places/park.png" },
      { it: "moschea", fa: "مسجد", image: "../../media/places/mosque.png" }
    ]
  },
  "it-lesson17": {
    title: "Lezione 17: Emozioni",
    nextPage: "lesson17.html",
    words: [
      { it: "felice", fa: "خوشحال", image: "../../media/feelings/happy.png" },
      { it: "triste", fa: "ناراحت", image: "../../media/feelings/sad.png" },
      { it: "arrabbiato", fa: "عصبانی", image: "../../media/feelings/angry.png" },
      { it: "stanco", fa: "خسته", image: "../../media/feelings/tired.png" },
      { it: "affamato", fa: "گرسنه", image: "../../media/feelings/hungry.png" }
    ]
  },
  "it-lesson18": {
    title: "Lezione 18: Attività quotidiane",
    nextPage: "lesson18.html",
    words: [
      { it: "mangiare", fa: "خوردن", image: "../../media/actions/eat.png" },
      { it: "dormire", fa: "خوابیدن", image: "../../media/actions/sleep.png" },
      { it: "camminare", fa: "راه رفتن", image: "../../media/actions/walk.png" },
      { it: "leggere", fa: "خواندن", image: "../../media/actions/read.png" },
      { it: "scrivere", fa: "نوشتن", image: "../../media/actions/write.png" }
    ]
  },
  "it-lesson19": {
    title: "Lezione 19: Aggettivi",
    nextPage: "lesson19.html",
    words: [
      { it: "grande", fa: "بزرگ", image: "../../media/adjectives/big.png" },
      { it: "piccolo", fa: "کوچک", image: "../../media/adjectives/small.png" },
      { it: "alto", fa: "بلند", image: "../../media/adjectives/tall.png" },
      { it: "basso", fa: "کوتاه", image: "../../media/adjectives/short.png" },
      { it: "bello", fa: "زیبا", image: "../../media/adjectives/beautiful.png" }
    ]
  },
  "it-lesson20": {
    title: "Lezione 20: Domande",
    nextPage: "lesson20.html",
    words: [
      { it: "chi", fa: "چه کسی", image: "../../media/questions/who.png" },
      { it: "cosa", fa: "چه", image: "../../media/questions/what.png" },
      { it: "dove", fa: "کجا", image: "../../media/questions/where.png" },
      { it: "quando", fa: "کی", image: "../../media/questions/when.png" },
      { it: "perché", fa: "چرا", image: "../../media/questions/why.png" }
    ]
  }
};

// ===== تابع پخش صدا (ایتالیایی) =====
function speak(text) {
  if (!window.speechSynthesis) return;
  const utter = new SpeechSynthesisUtterance(text);
  utter.lang = "it-IT";
  utter.rate = 0.9;
  speechSynthesis.cancel();
  speechSynthesis.speak(utter);
}

// ===== تابع نمایش صفحه معرفی =====
function renderIntro() {
  const lesson = allLessons[lessonId];
  
  if (!lesson) {
    document.getElementById("intro-container").innerHTML = `
      <h2>❌ Lezione non trovata!</h2>
      <p>Si prega di entrare dalla pagina principale.</p>
      <a href="../index.html">Torna alla home</a>
    `;
    return;
  }

  document.getElementById("lesson-title").textContent = "📚 " + lesson.title;

  const container = document.getElementById("word-grid");
  container.innerHTML = "";

  lesson.words.forEach((w) => {
    const card = document.createElement("div");
    card.className = "word-card";
    card.innerHTML = `
      <img src="${w.image}" alt="${w.it}">
      <div class="word-en" style="font-size: 20px;">${w.it}</div>
      <div class="word-fa">${w.fa}</div>
    `;
    card.addEventListener("click", () => {
      speak(w.it);
      card.style.borderColor = "#00b894";
      setTimeout(() => {
        card.style.borderColor = "transparent";
      }, 800);
    });
    container.appendChild(card);
  });

  document.getElementById("start-lesson-btn").addEventListener("click", () => {
    window.location.href = lesson.nextPage;
  });
}

window.onload = renderIntro;