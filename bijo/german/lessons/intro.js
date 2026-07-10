// ===== گرفتن شماره درس از آدرس =====
const urlParams = new URLSearchParams(window.location.search);
const lessonId = urlParams.get('lesson');

// ===== دیتابیس همه درس‌های آلمانی =====
const allLessons = {
  "de-lesson1": {
    title: "Lektion 1: Menschen",
    nextPage: "lesson1.html",
    words: [
      { de: "Mann", fa: "مرد", image: "../../media/people/man.png" },
      { de: "Frau", fa: "زن", image: "../../media/people/woman.png" },
      { de: "Junge", fa: "پسر", image: "../../media/people/boy.png" },
      { de: "Mädchen", fa: "دختر", image: "../../media/people/girl.png" },
      { de: "Baby", fa: "نوزاد", image: "../../media/people/baby.png" }
    ]
  },
  "de-lesson2": {
    title: "Lektion 2: Körperteile",
    nextPage: "lesson2.html",
    words: [
      { de: "Kopf", fa: "سر", image: "../../media/body/head.png" },
      { de: "Hand", fa: "دست", image: "../../media/body/hand.png" },
      { de: "Auge", fa: "چشم", image: "../../media/body/eye.png" },
      { de: "Fuß", fa: "پا", image: "../../media/body/foot.png" },
      { de: "Nase", fa: "بینی", image: "../../media/body/nose.png" }
    ]
  },
  "de-lesson3": {
    title: "Lektion 3: Haus",
    nextPage: "lesson3.html",
    words: [
      { de: "Haus", fa: "خانه", image: "../../media/house/house.png" },
      { de: "Zimmer", fa: "اتاق", image: "../../media/house/room.png" },
      { de: "Tür", fa: "در", image: "../../media/house/door.png" },
      { de: "Fenster", fa: "پنجره", image: "../../media/house/window.png" },
      { de: "Küche", fa: "آشپزخانه", image: "../../media/house/kitchen.png" }
    ]
  },
  "de-lesson4": {
    title: "Lektion 4: Kleidung",
    nextPage: "lesson4.html",
    words: [
      { de: "Hemd", fa: "پیراهن", image: "../../media/clothes/shirt.png" },
      { de: "Hose", fa: "شلوار", image: "../../media/clothes/pants.png" },
      { de: "Schuhe", fa: "کفش", image: "../../media/clothes/shoes.png" },
      { de: "Hut", fa: "کلاه", image: "../../media/clothes/hat.png" },
      { de: "Kleid", fa: "لباس", image: "../../media/clothes/dress.png" }
    ]
  },
  "de-lesson5": {
    title: "Lektion 5: Essen",
    nextPage: "lesson5.html",
    words: [
      { de: "Brot", fa: "نان", image: "../../media/food/bread.png" },
      { de: "Reis", fa: "برنج", image: "../../media/food/rice.png" },
      { de: "Fleisch", fa: "گوشت", image: "../../media/food/meat.png" },
      { de: "Ei", fa: "تخم‌مرغ", image: "../../media/food/egg.png" },
      { de: "Milch", fa: "شیر", image: "../../media/food/milk.png" }
    ]
  },
  "de-lesson6": {
    title: "Lektion 6: Obst",
    nextPage: "lesson6.html",
    words: [
      { de: "Apfel", fa: "سیب", image: "../../media/fruits/apple.png" },
      { de: "Banane", fa: "موز", image: "../../media/fruits/banana.png" },
      { de: "Orange", fa: "پرتقال", image: "../../media/fruits/orange.png" },
      { de: "Traube", fa: "انگور", image: "../../media/fruits/grape.png" },
      { de: "Wassermelone", fa: "هندوانه", image: "../../media/fruits/watermelon.png" }
    ]
  },
  "de-lesson7": {
    title: "Lektion 7: Gemüse",
    nextPage: "lesson7.html",
    words: [
      { de: "Tomate", fa: "گوجه", image: "../../media/vegetables/tomato.png" },
      { de: "Kartoffel", fa: "سیب‌زمینی", image: "../../media/vegetables/potato.png" },
      { de: "Karotte", fa: "هویج", image: "../../media/vegetables/carrot.png" },
      { de: "Zwiebel", fa: "پیاز", image: "../../media/vegetables/onion.png" },
      { de: "Gurke", fa: "خیار", image: "../../media/vegetables/cucumber.png" }
    ]
  },
  "de-lesson8": {
    title: "Lektion 8: Tiere",
    nextPage: "lesson8.html",
    words: [
      { de: "Hund", fa: "سگ", image: "../../media/animals/dog.png" },
      { de: "Katze", fa: "گربه", image: "../../media/animals/cat.png" },
      { de: "Vogel", fa: "پرنده", image: "../../media/animals/bird.png" },
      { de: "Fisch", fa: "ماهی", image: "../../media/animals/fish.png" },
      { de: "Pferd", fa: "اسب", image: "../../media/animals/horse.png" }
    ]
  },
  "de-lesson9": {
    title: "Lektion 9: Natur",
    nextPage: "lesson9.html",
    words: [
      { de: "Sonne", fa: "خورشید", image: "../../media/nature/sun.png" },
      { de: "Mond", fa: "ماه", image: "../../media/nature/moon.png" },
      { de: "Stern", fa: "ستاره", image: "../../media/nature/star.png" },
      { de: "Himmel", fa: "آسمان", image: "../../media/nature/sky.png" },
      { de: "Regen", fa: "باران", image: "../../media/nature/rain.png" }
    ]
  },
  "de-lesson10": {
    title: "Lektion 10: Wetter",
    nextPage: "lesson10.html",
    words: [
      { de: "heiß", fa: "گرم", image: "../../media/weather/hot.png" },
      { de: "kalt", fa: "سرد", image: "../../media/weather/cold.png" },
      { de: "sonnig", fa: "آفتابی", image: "../../media/weather/sunny.png" },
      { de: "bewölkt", fa: "ابری", image: "../../media/weather/cloudy.png" },
      { de: "Wind", fa: "باد", image: "../../media/weather/wind.png" }
    ]
  },
  "de-lesson11": {
    title: "Lektion 11: Farben",
    nextPage: "lesson11.html",
    words: [
      { de: "rot", fa: "قرمز", image: "../../media/colors/red.png" },
      { de: "blau", fa: "آبی", image: "../../media/colors/blue.png" },
      { de: "grün", fa: "سبز", image: "../../media/colors/green.png" },
      { de: "gelb", fa: "زرد", image: "../../media/colors/yellow.png" },
      { de: "schwarz", fa: "مشکی", image: "../../media/colors/black.png" }
    ]
  },
  "de-lesson12": {
    title: "Lektion 12: Zahlen",
    nextPage: "lesson12.html",
    words: [
      { de: "eins", fa: "یک", image: "../../media/numbers/one.png" },
      { de: "zwei", fa: "دو", image: "../../media/numbers/two.png" },
      { de: "drei", fa: "سه", image: "../../media/numbers/three.png" },
      { de: "vier", fa: "چهار", image: "../../media/numbers/four.png" },
      { de: "fünf", fa: "پنج", image: "../../media/numbers/five.png" }
    ]
  },
  "de-lesson13": {
    title: "Lektion 13: Zeit",
    nextPage: "lesson13.html",
    words: [
      { de: "heute", fa: "امروز", image: "../../media/time/today.png" },
      { de: "morgen", fa: "فردا", image: "../../media/time/tomorrow.png" },
      { de: "gestern", fa: "دیروز", image: "../../media/time/yesterday.png" },
      { de: "Morgen", fa: "صبح", image: "../../media/time/morning.png" },
      { de: "Nacht", fa: "شب", image: "../../media/time/night.png" }
    ]
  },
  "de-lesson14": {
    title: "Lektion 14: Berufe",
    nextPage: "lesson14.html",
    words: [
      { de: "Lehrer", fa: "معلم", image: "../../media/jobs/teacher.png" },
      { de: "Arzt", fa: "دکتر", image: "../../media/jobs/doctor.png" },
      { de: "Ingenieur", fa: "مهندس", image: "../../media/jobs/engineer.png" },
      { de: "Student", fa: "دانش‌آموز", image: "../../media/jobs/student.png" },
      { de: "Fahrer", fa: "راننده", image: "../../media/jobs/driver.png" }
    ]
  },
  "de-lesson15": {
    title: "Lektion 15: Fahrzeuge",
    nextPage: "lesson15.html",
    words: [
      { de: "Auto", fa: "ماشین", image: "../../media/vehicles/car.png" },
      { de: "Bus", fa: "اتوبوس", image: "../../media/vehicles/bus.png" },
      { de: "Zug", fa: "قطار", image: "../../media/vehicles/train.png" },
      { de: "Flugzeug", fa: "هواپیما", image: "../../media/vehicles/airplane.png" },
      { de: "Fahrrad", fa: "دوچرخه", image: "../../media/vehicles/bicycle.png" }
    ]
  },
  "de-lesson16": {
    title: "Lektion 16: Orte",
    nextPage: "lesson16.html",
    words: [
      { de: "Schule", fa: "مدرسه", image: "../../media/places/school.png" },
      { de: "Krankenhaus", fa: "بیمارستان", image: "../../media/places/hospital.png" },
      { de: "Geschäft", fa: "فروشگاه", image: "../../media/places/store.png" },
      { de: "Park", fa: "پارک", image: "../../media/places/park.png" },
      { de: "Moschee", fa: "مسجد", image: "../../media/places/mosque.png" }
    ]
  },
  "de-lesson17": {
    title: "Lektion 17: Gefühle",
    nextPage: "lesson17.html",
    words: [
      { de: "glücklich", fa: "خوشحال", image: "../../media/feelings/happy.png" },
      { de: "traurig", fa: "ناراحت", image: "../../media/feelings/sad.png" },
      { de: "wütend", fa: "عصبانی", image: "../../media/feelings/angry.png" },
      { de: "müde", fa: "خسته", image: "../../media/feelings/tired.png" },
      { de: "hungrig", fa: "گرسنه", image: "../../media/feelings/hungry.png" }
    ]
  },
  "de-lesson18": {
    title: "Lektion 18: Tägliche Aktivitäten",
    nextPage: "lesson18.html",
    words: [
      { de: "essen", fa: "خوردن", image: "../../media/actions/eat.png" },
      { de: "schlafen", fa: "خوابیدن", image: "../../media/actions/sleep.png" },
      { de: "gehen", fa: "راه رفتن", image: "../../media/actions/walk.png" },
      { de: "lesen", fa: "خواندن", image: "../../media/actions/read.png" },
      { de: "schreiben", fa: "نوشتن", image: "../../media/actions/write.png" }
    ]
  },
  "de-lesson19": {
    title: "Lektion 19: Adjektive",
    nextPage: "lesson19.html",
    words: [
      { de: "groß", fa: "بزرگ", image: "../../media/adjectives/big.png" },
      { de: "klein", fa: "کوچک", image: "../../media/adjectives/small.png" },
      { de: "groß", fa: "بلند", image: "../../media/adjectives/tall.png" },
      { de: "kurz", fa: "کوتاه", image: "../../media/adjectives/short.png" },
      { de: "schön", fa: "زیبا", image: "../../media/adjectives/beautiful.png" }
    ]
  },
  "de-lesson20": {
    title: "Lektion 20: Fragen",
    nextPage: "lesson20.html",
    words: [
      { de: "wer", fa: "چه کسی", image: "../../media/questions/who.png" },
      { de: "was", fa: "چه", image: "../../media/questions/what.png" },
      { de: "wo", fa: "کجا", image: "../../media/questions/where.png" },
      { de: "wann", fa: "کی", image: "../../media/questions/when.png" },
      { de: "warum", fa: "چرا", image: "../../media/questions/why.png" }
    ]
  }
};

// ===== تابع پخش صدا (آلمانی) =====
function speak(text) {
  if (!window.speechSynthesis) return;
  const utter = new SpeechSynthesisUtterance(text);
  utter.lang = "de-DE";
  utter.rate = 0.9;
  speechSynthesis.cancel();
  speechSynthesis.speak(utter);
}

// ===== تابع نمایش صفحه معرفی =====
function renderIntro() {
  const lesson = allLessons[lessonId];
  
  if (!lesson) {
    document.getElementById("intro-container").innerHTML = `
      <h2>❌ Lektion nicht gefunden!</h2>
      <p>Bitte von der Hauptseite aus eingeben.</p>
      <a href="../index.html">Zurück zur Hauptseite</a>
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
      <img src="${w.image}" alt="${w.de}">
      <div class="word-en" style="font-size: 20px;">${w.de}</div>
      <div class="word-fa">${w.fa}</div>
    `;
    card.addEventListener("click", () => {
      speak(w.de);
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