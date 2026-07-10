// ===== گرفتن شماره درس از آدرس =====
const urlParams = new URLSearchParams(window.location.search);
const lessonId = urlParams.get('lesson');

// ===== دیتابیس همه درس‌های اسپانیایی =====
const allLessons = {
  "es-lesson1": {
    title: "Lección 1: Personas",
    nextPage: "lesson1.html",
    words: [
      { es: "hombre", fa: "مرد", image: "../../media/people/man.png" },
      { es: "mujer", fa: "زن", image: "../../media/people/woman.png" },
      { es: "niño", fa: "پسر", image: "../../media/people/boy.png" },
      { es: "niña", fa: "دختر", image: "../../media/people/girl.png" },
      { es: "bebé", fa: "نوزاد", image: "../../media/people/baby.png" }
    ]
  },
  "es-lesson2": {
    title: "Lección 2: El cuerpo",
    nextPage: "lesson2.html",
    words: [
      { es: "cabeza", fa: "سر", image: "../../media/body/head.png" },
      { es: "mano", fa: "دست", image: "../../media/body/hand.png" },
      { es: "ojo", fa: "چشم", image: "../../media/body/eye.png" },
      { es: "pie", fa: "پا", image: "../../media/body/foot.png" },
      { es: "nariz", fa: "بینی", image: "../../media/body/nose.png" }
    ]
  },
  "es-lesson3": {
    title: "Lección 3: Casa",
    nextPage: "lesson3.html",
    words: [
      { es: "casa", fa: "خانه", image: "../../media/house/house.png" },
      { es: "habitación", fa: "اتاق", image: "../../media/house/room.png" },
      { es: "puerta", fa: "در", image: "../../media/house/door.png" },
      { es: "ventana", fa: "پنجره", image: "../../media/house/window.png" },
      { es: "cocina", fa: "آشپزخانه", image: "../../media/house/kitchen.png" }
    ]
  },
  "es-lesson4": {
    title: "Lección 4: Ropa",
    nextPage: "lesson4.html",
    words: [
      { es: "camisa", fa: "پیراهن", image: "../../media/clothes/shirt.png" },
      { es: "pantalón", fa: "شلوار", image: "../../media/clothes/pants.png" },
      { es: "zapatos", fa: "کفش", image: "../../media/clothes/shoes.png" },
      { es: "sombrero", fa: "کلاه", image: "../../media/clothes/hat.png" },
      { es: "vestido", fa: "لباس", image: "../../media/clothes/dress.png" }
    ]
  },
  "es-lesson5": {
    title: "Lección 5: Comida",
    nextPage: "lesson5.html",
    words: [
      { es: "pan", fa: "نان", image: "../../media/food/bread.png" },
      { es: "arroz", fa: "برنج", image: "../../media/food/rice.png" },
      { es: "carne", fa: "گوشت", image: "../../media/food/meat.png" },
      { es: "huevo", fa: "تخم‌مرغ", image: "../../media/food/egg.png" },
      { es: "leche", fa: "شیر", image: "../../media/food/milk.png" }
    ]
  },
  "es-lesson6": {
    title: "Lección 6: Frutas",
    nextPage: "lesson6.html",
    words: [
      { es: "manzana", fa: "سیب", image: "../../media/fruits/apple.png" },
      { es: "plátano", fa: "موز", image: "../../media/fruits/banana.png" },
      { es: "naranja", fa: "پرتقال", image: "../../media/fruits/orange.png" },
      { es: "uva", fa: "انگور", image: "../../media/fruits/grape.png" },
      { es: "sandía", fa: "هندوانه", image: "../../media/fruits/watermelon.png" }
    ]
  },
  "es-lesson7": {
    title: "Lección 7: Verduras",
    nextPage: "lesson7.html",
    words: [
      { es: "tomate", fa: "گوجه", image: "../../media/vegetables/tomato.png" },
      { es: "papa", fa: "سیب‌زمینی", image: "../../media/vegetables/potato.png" },
      { es: "zanahoria", fa: "هویج", image: "../../media/vegetables/carrot.png" },
      { es: "cebolla", fa: "پیاز", image: "../../media/vegetables/onion.png" },
      { es: "pepino", fa: "خیار", image: "../../media/vegetables/cucumber.png" }
    ]
  },
  "es-lesson8": {
    title: "Lección 8: Animales",
    nextPage: "lesson8.html",
    words: [
      { es: "perro", fa: "سگ", image: "../../media/animals/dog.png" },
      { es: "gato", fa: "گربه", image: "../../media/animals/cat.png" },
      { es: "pájaro", fa: "پرنده", image: "../../media/animals/bird.png" },
      { es: "pez", fa: "ماهی", image: "../../media/animals/fish.png" },
      { es: "caballo", fa: "اسب", image: "../../media/animals/horse.png" }
    ]
  },
  "es-lesson9": {
    title: "Lección 9: Naturaleza",
    nextPage: "lesson9.html",
    words: [
      { es: "sol", fa: "خورشید", image: "../../media/nature/sun.png" },
      { es: "luna", fa: "ماه", image: "../../media/nature/moon.png" },
      { es: "estrella", fa: "ستاره", image: "../../media/nature/star.png" },
      { es: "cielo", fa: "آسمان", image: "../../media/nature/sky.png" },
      { es: "lluvia", fa: "باران", image: "../../media/nature/rain.png" }
    ]
  },
  "es-lesson10": {
    title: "Lección 10: Clima",
    nextPage: "lesson10.html",
    words: [
      { es: "caliente", fa: "گرم", image: "../../media/weather/hot.png" },
      { es: "frío", fa: "سرد", image: "../../media/weather/cold.png" },
      { es: "soleado", fa: "آفتابی", image: "../../media/weather/sunny.png" },
      { es: "nublado", fa: "ابری", image: "../../media/weather/cloudy.png" },
      { es: "viento", fa: "باد", image: "../../media/weather/wind.png" }
    ]
  },
  "es-lesson11": {
    title: "Lección 11: Colores",
    nextPage: "lesson11.html",
    words: [
      { es: "rojo", fa: "قرمز", image: "../../media/colors/red.png" },
      { es: "azul", fa: "آبی", image: "../../media/colors/blue.png" },
      { es: "verde", fa: "سبز", image: "../../media/colors/green.png" },
      { es: "amarillo", fa: "زرد", image: "../../media/colors/yellow.png" },
      { es: "negro", fa: "مشکی", image: "../../media/colors/black.png" }
    ]
  },
  "es-lesson12": {
    title: "Lección 12: Números",
    nextPage: "lesson12.html",
    words: [
      { es: "uno", fa: "یک", image: "../../media/numbers/one.png" },
      { es: "dos", fa: "دو", image: "../../media/numbers/two.png" },
      { es: "tres", fa: "سه", image: "../../media/numbers/three.png" },
      { es: "cuatro", fa: "چهار", image: "../../media/numbers/four.png" },
      { es: "cinco", fa: "پنج", image: "../../media/numbers/five.png" }
    ]
  },
  "es-lesson13": {
    title: "Lección 13: Tiempo",
    nextPage: "lesson13.html",
    words: [
      { es: "hoy", fa: "امروز", image: "../../media/time/today.png" },
      { es: "mañana", fa: "فردا", image: "../../media/time/tomorrow.png" },
      { es: "ayer", fa: "دیروز", image: "../../media/time/yesterday.png" },
      { es: "mañana", fa: "صبح", image: "../../media/time/morning.png" },
      { es: "noche", fa: "شب", image: "../../media/time/night.png" }
    ]
  },
  "es-lesson14": {
    title: "Lección 14: Profesiones",
    nextPage: "lesson14.html",
    words: [
      { es: "profesor", fa: "معلم", image: "../../media/jobs/teacher.png" },
      { es: "médico", fa: "دکتر", image: "../../media/jobs/doctor.png" },
      { es: "ingeniero", fa: "مهندس", image: "../../media/jobs/engineer.png" },
      { es: "estudiante", fa: "دانش‌آموز", image: "../../media/jobs/student.png" },
      { es: "conductor", fa: "راننده", image: "../../media/jobs/driver.png" }
    ]
  },
  "es-lesson15": {
    title: "Lección 15: Vehículos",
    nextPage: "lesson15.html",
    words: [
      { es: "coche", fa: "ماشین", image: "../../media/vehicles/car.png" },
      { es: "autobús", fa: "اتوبوس", image: "../../media/vehicles/bus.png" },
      { es: "tren", fa: "قطار", image: "../../media/vehicles/train.png" },
      { es: "avión", fa: "هواپیما", image: "../../media/vehicles/airplane.png" },
      { es: "bicicleta", fa: "دوچرخه", image: "../../media/vehicles/bicycle.png" }
    ]
  },
  "es-lesson16": {
    title: "Lección 16: Lugares",
    nextPage: "lesson16.html",
    words: [
      { es: "escuela", fa: "مدرسه", image: "../../media/places/school.png" },
      { es: "hospital", fa: "بیمارستان", image: "../../media/places/hospital.png" },
      { es: "tienda", fa: "فروشگاه", image: "../../media/places/store.png" },
      { es: "parque", fa: "پارک", image: "../../media/places/park.png" },
      { es: "mezquita", fa: "مسجد", image: "../../media/places/mosque.png" }
    ]
  },
  "es-lesson17": {
    title: "Lección 17: Emociones",
    nextPage: "lesson17.html",
    words: [
      { es: "feliz", fa: "خوشحال", image: "../../media/feelings/happy.png" },
      { es: "triste", fa: "ناراحت", image: "../../media/feelings/sad.png" },
      { es: "enojado", fa: "عصبانی", image: "../../media/feelings/angry.png" },
      { es: "cansado", fa: "خسته", image: "../../media/feelings/tired.png" },
      { es: "hambriento", fa: "گرسنه", image: "../../media/feelings/hungry.png" }
    ]
  },
  "es-lesson18": {
    title: "Lección 18: Actividades diarias",
    nextPage: "lesson18.html",
    words: [
      { es: "comer", fa: "خوردن", image: "../../media/actions/eat.png" },
      { es: "dormir", fa: "خوابیدن", image: "../../media/actions/sleep.png" },
      { es: "caminar", fa: "راه رفتن", image: "../../media/actions/walk.png" },
      { es: "leer", fa: "خواندن", image: "../../media/actions/read.png" },
      { es: "escribir", fa: "نوشتن", image: "../../media/actions/write.png" }
    ]
  },
  "es-lesson19": {
    title: "Lección 19: Adjetivos",
    nextPage: "lesson19.html",
    words: [
      { es: "grande", fa: "بزرگ", image: "../../media/adjectives/big.png" },
      { es: "pequeño", fa: "کوچک", image: "../../media/adjectives/small.png" },
      { es: "alto", fa: "بلند", image: "../../media/adjectives/tall.png" },
      { es: "bajo", fa: "کوتاه", image: "../../media/adjectives/short.png" },
      { es: "hermoso", fa: "زیبا", image: "../../media/adjectives/beautiful.png" }
    ]
  },
  "es-lesson20": {
    title: "Lección 20: Preguntas",
    nextPage: "lesson20.html",
    words: [
      { es: "quién", fa: "چه کسی", image: "../../media/questions/who.png" },
      { es: "qué", fa: "چه", image: "../../media/questions/what.png" },
      { es: "dónde", fa: "کجا", image: "../../media/questions/where.png" },
      { es: "cuándo", fa: "کی", image: "../../media/questions/when.png" },
      { es: "por qué", fa: "چرا", image: "../../media/questions/why.png" }
    ]
  }
};

// ===== تابع پخش صدا (اسپانیایی) =====
function speak(text) {
  if (!window.speechSynthesis) return;
  const utter = new SpeechSynthesisUtterance(text);
  utter.lang = "es-ES";
  utter.rate = 0.9;
  speechSynthesis.cancel();
  speechSynthesis.speak(utter);
}

// ===== تابع نمایش صفحه معرفی =====
function renderIntro() {
  const lesson = allLessons[lessonId];
  
  if (!lesson) {
    document.getElementById("intro-container").innerHTML = `
      <h2>❌ ¡Lección no encontrada!</h2>
      <p>Por favor, ingrese desde la página principal.</p>
      <a href="../index.html">Volver al inicio</a>
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
      <img src="${w.image}" alt="${w.es}">
      <div class="word-en" style="font-size: 20px;">${w.es}</div>
      <div class="word-fa">${w.fa}</div>
    `;
    card.addEventListener("click", () => {
      speak(w.es);
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