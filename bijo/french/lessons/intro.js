// ===== گرفتن شماره درس از آدرس =====
const urlParams = new URLSearchParams(window.location.search);
const lessonId = urlParams.get('lesson');

// ===== دیتابیس همه درس‌های فرانسوی =====
const allLessons = {
  "fr-lesson1": {
    title: "Leçon 1: Les gens",
    nextPage: "lesson1.html",
    words: [
      { fr: "homme", fa: "مرد", image: "../../media/people/man.png" },
      { fr: "femme", fa: "زن", image: "../../media/people/woman.png" },
      { fr: "garçon", fa: "پسر", image: "../../media/people/boy.png" },
      { fr: "fille", fa: "دختر", image: "../../media/people/girl.png" },
      { fr: "bébé", fa: "نوزاد", image: "../../media/people/baby.png" }
    ]
  },
  "fr-lesson2": {
    title: "Leçon 2: Le corps",
    nextPage: "lesson2.html",
    words: [
      { fr: "tête", fa: "سر", image: "../../media/body/head.png" },
      { fr: "main", fa: "دست", image: "../../media/body/hand.png" },
      { fr: "œil", fa: "چشم", image: "../../media/body/eye.png" },
      { fr: "pied", fa: "پا", image: "../../media/body/foot.png" },
      { fr: "nez", fa: "بینی", image: "../../media/body/nose.png" }
    ]
  },
  "fr-lesson3": {
    title: "Leçon 3: La maison",
    nextPage: "lesson3.html",
    words: [
      { fr: "maison", fa: "خانه", image: "../../media/house/house.png" },
      { fr: "chambre", fa: "اتاق", image: "../../media/house/room.png" },
      { fr: "porte", fa: "در", image: "../../media/house/door.png" },
      { fr: "fenêtre", fa: "پنجره", image: "../../media/house/window.png" },
      { fr: "cuisine", fa: "آشپزخانه", image: "../../media/house/kitchen.png" }
    ]
  },
  "fr-lesson4": {
    title: "Leçon 4: Les vêtements",
    nextPage: "lesson4.html",
    words: [
      { fr: "chemise", fa: "پیراهن", image: "../../media/clothes/shirt.png" },
      { fr: "pantalon", fa: "شلوار", image: "../../media/clothes/pants.png" },
      { fr: "chaussures", fa: "کفش", image: "../../media/clothes/shoes.png" },
      { fr: "chapeau", fa: "کلاه", image: "../../media/clothes/hat.png" },
      { fr: "robe", fa: "لباس", image: "../../media/clothes/dress.png" }
    ]
  },
  "fr-lesson5": {
    title: "Leçon 5: La nourriture",
    nextPage: "lesson5.html",
    words: [
      { fr: "pain", fa: "نان", image: "../../media/food/bread.png" },
      { fr: "riz", fa: "برنج", image: "../../media/food/rice.png" },
      { fr: "viande", fa: "گوشت", image: "../../media/food/meat.png" },
      { fr: "œuf", fa: "تخم‌مرغ", image: "../../media/food/egg.png" },
      { fr: "lait", fa: "شیر", image: "../../media/food/milk.png" }
    ]
  },
  "fr-lesson6": {
    title: "Leçon 6: Les fruits",
    nextPage: "lesson6.html",
    words: [
      { fr: "pomme", fa: "سیب", image: "../../media/fruits/apple.png" },
      { fr: "banane", fa: "موز", image: "../../media/fruits/banana.png" },
      { fr: "orange", fa: "پرتقال", image: "../../media/fruits/orange.png" },
      { fr: "raisin", fa: "انگور", image: "../../media/fruits/grape.png" },
      { fr: "pastèque", fa: "هندوانه", image: "../../media/fruits/watermelon.png" }
    ]
  },
  "fr-lesson7": {
    title: "Leçon 7: Les légumes",
    nextPage: "lesson7.html",
    words: [
      { fr: "tomate", fa: "گوجه", image: "../../media/vegetables/tomato.png" },
      { fr: "pomme de terre", fa: "سیب‌زمینی", image: "../../media/vegetables/potato.png" },
      { fr: "carotte", fa: "هویج", image: "../../media/vegetables/carrot.png" },
      { fr: "oignon", fa: "پیاز", image: "../../media/vegetables/onion.png" },
      { fr: "concombre", fa: "خیار", image: "../../media/vegetables/cucumber.png" }
    ]
  },
  "fr-lesson8": {
    title: "Leçon 8: Les animaux",
    nextPage: "lesson8.html",
    words: [
      { fr: "chien", fa: "سگ", image: "../../media/animals/dog.png" },
      { fr: "chat", fa: "گربه", image: "../../media/animals/cat.png" },
      { fr: "oiseau", fa: "پرنده", image: "../../media/animals/bird.png" },
      { fr: "poisson", fa: "ماهی", image: "../../media/animals/fish.png" },
      { fr: "cheval", fa: "اسب", image: "../../media/animals/horse.png" }
    ]
  },
  "fr-lesson9": {
    title: "Leçon 9: La nature",
    nextPage: "lesson9.html",
    words: [
      { fr: "soleil", fa: "خورشید", image: "../../media/nature/sun.png" },
      { fr: "lune", fa: "ماه", image: "../../media/nature/moon.png" },
      { fr: "étoile", fa: "ستاره", image: "../../media/nature/star.png" },
      { fr: "ciel", fa: "آسمان", image: "../../media/nature/sky.png" },
      { fr: "pluie", fa: "باران", image: "../../media/nature/rain.png" }
    ]
  },
  "fr-lesson10": {
    title: "Leçon 10: La météo",
    nextPage: "lesson10.html",
    words: [
      { fr: "chaud", fa: "گرم", image: "../../media/weather/hot.png" },
      { fr: "froid", fa: "سرد", image: "../../media/weather/cold.png" },
      { fr: "ensoleillé", fa: "آفتابی", image: "../../media/weather/sunny.png" },
      { fr: "nuageux", fa: "ابری", image: "../../media/weather/cloudy.png" },
      { fr: "vent", fa: "باد", image: "../../media/weather/wind.png" }
    ]
  },
  "fr-lesson11": {
    title: "Leçon 11: Les couleurs",
    nextPage: "lesson11.html",
    words: [
      { fr: "rouge", fa: "قرمز", image: "../../media/colors/red.png" },
      { fr: "bleu", fa: "آبی", image: "../../media/colors/blue.png" },
      { fr: "vert", fa: "سبز", image: "../../media/colors/green.png" },
      { fr: "jaune", fa: "زرد", image: "../../media/colors/yellow.png" },
      { fr: "noir", fa: "مشکی", image: "../../media/colors/black.png" }
    ]
  },
  "fr-lesson12": {
    title: "Leçon 12: Les nombres",
    nextPage: "lesson12.html",
    words: [
      { fr: "un", fa: "یک", image: "../../media/numbers/one.png" },
      { fr: "deux", fa: "دو", image: "../../media/numbers/two.png" },
      { fr: "trois", fa: "سه", image: "../../media/numbers/three.png" },
      { fr: "quatre", fa: "چهار", image: "../../media/numbers/four.png" },
      { fr: "cinq", fa: "پنج", image: "../../media/numbers/five.png" }
    ]
  },
  "fr-lesson13": {
    title: "Leçon 13: Le temps",
    nextPage: "lesson13.html",
    words: [
      { fr: "aujourd'hui", fa: "امروز", image: "../../media/time/today.png" },
      { fr: "demain", fa: "فردا", image: "../../media/time/tomorrow.png" },
      { fr: "hier", fa: "دیروز", image: "../../media/time/yesterday.png" },
      { fr: "matin", fa: "صبح", image: "../../media/time/morning.png" },
      { fr: "nuit", fa: "شب", image: "../../media/time/night.png" }
    ]
  },
  "fr-lesson14": {
    title: "Leçon 14: Les métiers",
    nextPage: "lesson14.html",
    words: [
      { fr: "professeur", fa: "معلم", image: "../../media/jobs/teacher.png" },
      { fr: "médecin", fa: "دکتر", image: "../../media/jobs/doctor.png" },
      { fr: "ingénieur", fa: "مهندس", image: "../../media/jobs/engineer.png" },
      { fr: "étudiant", fa: "دانش‌آموز", image: "../../media/jobs/student.png" },
      { fr: "chauffeur", fa: "راننده", image: "../../media/jobs/driver.png" }
    ]
  },
  "fr-lesson15": {
    title: "Leçon 15: Les véhicules",
    nextPage: "lesson15.html",
    words: [
      { fr: "voiture", fa: "ماشین", image: "../../media/vehicles/car.png" },
      { fr: "bus", fa: "اتوبوس", image: "../../media/vehicles/bus.png" },
      { fr: "train", fa: "قطار", image: "../../media/vehicles/train.png" },
      { fr: "avion", fa: "هواپیما", image: "../../media/vehicles/airplane.png" },
      { fr: "vélo", fa: "دوچرخه", image: "../../media/vehicles/bicycle.png" }
    ]
  },
  "fr-lesson16": {
    title: "Leçon 16: Les lieux",
    nextPage: "lesson16.html",
    words: [
      { fr: "école", fa: "مدرسه", image: "../../media/places/school.png" },
      { fr: "hôpital", fa: "بیمارستان", image: "../../media/places/hospital.png" },
      { fr: "magasin", fa: "فروشگاه", image: "../../media/places/store.png" },
      { fr: "parc", fa: "پارک", image: "../../media/places/park.png" },
      { fr: "mosquée", fa: "مسجد", image: "../../media/places/mosque.png" }
    ]
  },
  "fr-lesson17": {
    title: "Leçon 17: Les émotions",
    nextPage: "lesson17.html",
    words: [
      { fr: "heureux", fa: "خوشحال", image: "../../media/feelings/happy.png" },
      { fr: "triste", fa: "ناراحت", image: "../../media/feelings/sad.png" },
      { fr: "fâché", fa: "عصبانی", image: "../../media/feelings/angry.png" },
      { fr: "fatigué", fa: "خسته", image: "../../media/feelings/tired.png" },
      { fr: "affamé", fa: "گرسنه", image: "../../media/feelings/hungry.png" }
    ]
  },
  "fr-lesson18": {
    title: "Leçon 18: Les activités quotidiennes",
    nextPage: "lesson18.html",
    words: [
      { fr: "manger", fa: "خوردن", image: "../../media/actions/eat.png" },
      { fr: "dormir", fa: "خوابیدن", image: "../../media/actions/sleep.png" },
      { fr: "marcher", fa: "راه رفتن", image: "../../media/actions/walk.png" },
      { fr: "lire", fa: "خواندن", image: "../../media/actions/read.png" },
      { fr: "écrire", fa: "نوشتن", image: "../../media/actions/write.png" }
    ]
  },
  "fr-lesson19": {
    title: "Leçon 19: Les adjectifs",
    nextPage: "lesson19.html",
    words: [
      { fr: "grand", fa: "بزرگ", image: "../../media/adjectives/big.png" },
      { fr: "petit", fa: "کوچک", image: "../../media/adjectives/small.png" },
      { fr: "grand", fa: "بلند", image: "../../media/adjectives/tall.png" },
      { fr: "court", fa: "کوتاه", image: "../../media/adjectives/short.png" },
      { fr: "beau", fa: "زیبا", image: "../../media/adjectives/beautiful.png" }
    ]
  },
  "fr-lesson20": {
    title: "Leçon 20: Les questions",
    nextPage: "lesson20.html",
    words: [
      { fr: "qui", fa: "چه کسی", image: "../../media/questions/who.png" },
      { fr: "quoi", fa: "چه", image: "../../media/questions/what.png" },
      { fr: "où", fa: "کجا", image: "../../media/questions/where.png" },
      { fr: "quand", fa: "کی", image: "../../media/questions/when.png" },
      { fr: "pourquoi", fa: "چرا", image: "../../media/questions/why.png" }
    ]
  }
};

// ===== تابع پخش صدا (فرانسوی) =====
function speak(text) {
  if (!window.speechSynthesis) return;
  const utter = new SpeechSynthesisUtterance(text);
  utter.lang = "fr-FR";
  utter.rate = 0.9;
  speechSynthesis.cancel();
  speechSynthesis.speak(utter);
}

// ===== تابع نمایش صفحه معرفی =====
function renderIntro() {
  const lesson = allLessons[lessonId];
  
  if (!lesson) {
    document.getElementById("intro-container").innerHTML = `
      <h2>❌ Leçon introuvable!</h2>
      <p>Veuillez entrer depuis la page d'accueil.</p>
      <a href="../index.html">Retour à l'accueil</a>
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
      <img src="${w.image}" alt="${w.fr}">
      <div class="word-en" style="font-size: 20px;">${w.fr}</div>
      <div class="word-fa">${w.fa}</div>
    `;
    card.addEventListener("click", () => {
      speak(w.fr);
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