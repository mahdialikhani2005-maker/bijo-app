// ===== گرفتن شماره درس از آدرس =====
const urlParams = new URLSearchParams(window.location.search);
const lessonId = urlParams.get('lesson');

// ===== دیتابیس همه درس‌های کره‌ای =====
const allLessons = {
  "ko-lesson1": {
    title: "제1과: 사람들",
    nextPage: "lesson1.html",
    words: [
      { ko: "남자", fa: "مرد", image: "../../media/people/man.png" },
      { ko: "여자", fa: "زن", image: "../../media/people/woman.png" },
      { ko: "소년", fa: "پسر", image: "../../media/people/boy.png" },
      { ko: "소녀", fa: "دختر", image: "../../media/people/girl.png" },
      { ko: "아기", fa: "نوزاد", image: "../../media/people/baby.png" }
    ]
  },
  "ko-lesson2": {
    title: "제2과: 신체 부위",
    nextPage: "lesson2.html",
    words: [
      { ko: "머리", fa: "سر", image: "../../media/body/head.png" },
      { ko: "손", fa: "دست", image: "../../media/body/hand.png" },
      { ko: "눈", fa: "چشم", image: "../../media/body/eye.png" },
      { ko: "발", fa: "پا", image: "../../media/body/foot.png" },
      { ko: "코", fa: "بینی", image: "../../media/body/nose.png" }
    ]
  },
  "ko-lesson3": {
    title: "제3과: 집",
    nextPage: "lesson3.html",
    words: [
      { ko: "집", fa: "خانه", image: "../../media/house/house.png" },
      { ko: "방", fa: "اتاق", image: "../../media/house/room.png" },
      { ko: "문", fa: "در", image: "../../media/house/door.png" },
      { ko: "창문", fa: "پنجره", image: "../../media/house/window.png" },
      { ko: "부엌", fa: "آشپزخانه", image: "../../media/house/kitchen.png" }
    ]
  },
  "ko-lesson4": {
    title: "제4과: 옷",
    nextPage: "lesson4.html",
    words: [
      { ko: "셔츠", fa: "پیراهن", image: "../../media/clothes/shirt.png" },
      { ko: "바지", fa: "شلوار", image: "../../media/clothes/pants.png" },
      { ko: "신발", fa: "کفش", image: "../../media/clothes/shoes.png" },
      { ko: "모자", fa: "کلاه", image: "../../media/clothes/hat.png" },
      { ko: "드레스", fa: "لباس", image: "../../media/clothes/dress.png" }
    ]
  },
  "ko-lesson5": {
    title: "제5과: 음식",
    nextPage: "lesson5.html",
    words: [
      { ko: "빵", fa: "نان", image: "../../media/food/bread.png" },
      { ko: "밥", fa: "برنج", image: "../../media/food/rice.png" },
      { ko: "고기", fa: "گوشت", image: "../../media/food/meat.png" },
      { ko: "계란", fa: "تخم‌مرغ", image: "../../media/food/egg.png" },
      { ko: "우유", fa: "شیر", image: "../../media/food/milk.png" }
    ]
  },
  "ko-lesson6": {
    title: "제6과: 과일",
    nextPage: "lesson6.html",
    words: [
      { ko: "사과", fa: "سیب", image: "../../media/fruits/apple.png" },
      { ko: "바나나", fa: "موز", image: "../../media/fruits/banana.png" },
      { ko: "오렌지", fa: "پرتقال", image: "../../media/fruits/orange.png" },
      { ko: "포도", fa: "انگور", image: "../../media/fruits/grape.png" },
      { ko: "수박", fa: "هندوانه", image: "../../media/fruits/watermelon.png" }
    ]
  },
  "ko-lesson7": {
    title: "제7과: 채소",
    nextPage: "lesson7.html",
    words: [
      { ko: "토마토", fa: "گوجه", image: "../../media/vegetables/tomato.png" },
      { ko: "감자", fa: "سیب‌زمینی", image: "../../media/vegetables/potato.png" },
      { ko: "당근", fa: "هویج", image: "../../media/vegetables/carrot.png" },
      { ko: "양파", fa: "پیاز", image: "../../media/vegetables/onion.png" },
      { ko: "오이", fa: "خیار", image: "../../media/vegetables/cucumber.png" }
    ]
  },
  "ko-lesson8": {
    title: "제8과: 동물",
    nextPage: "lesson8.html",
    words: [
      { ko: "개", fa: "سگ", image: "../../media/animals/dog.png" },
      { ko: "고양이", fa: "گربه", image: "../../media/animals/cat.png" },
      { ko: "새", fa: "پرنده", image: "../../media/animals/bird.png" },
      { ko: "물고기", fa: "ماهی", image: "../../media/animals/fish.png" },
      { ko: "말", fa: "اسب", image: "../../media/animals/horse.png" }
    ]
  },
  "ko-lesson9": {
    title: "제9과: 자연",
    nextPage: "lesson9.html",
    words: [
      { ko: "해", fa: "خورشید", image: "../../media/nature/sun.png" },
      { ko: "달", fa: "ماه", image: "../../media/nature/moon.png" },
      { ko: "별", fa: "ستاره", image: "../../media/nature/star.png" },
      { ko: "하늘", fa: "آسمان", image: "../../media/nature/sky.png" },
      { ko: "비", fa: "باران", image: "../../media/nature/rain.png" }
    ]
  },
  "ko-lesson10": {
    title: "제10과: 날씨",
    nextPage: "lesson10.html",
    words: [
      { ko: "덥다", fa: "گرم", image: "../../media/weather/hot.png" },
      { ko: "춥다", fa: "سرد", image: "../../media/weather/cold.png" },
      { ko: "맑다", fa: "آفتابی", image: "../../media/weather/sunny.png" },
      { ko: "흐리다", fa: "ابری", image: "../../media/weather/cloudy.png" },
      { ko: "바람", fa: "باد", image: "../../media/weather/wind.png" }
    ]
  },
  "ko-lesson11": {
    title: "제11과: 색깔",
    nextPage: "lesson11.html",
    words: [
      { ko: "빨간색", fa: "قرمز", image: "../../media/colors/red.png" },
      { ko: "파란색", fa: "آبی", image: "../../media/colors/blue.png" },
      { ko: "초록색", fa: "سبز", image: "../../media/colors/green.png" },
      { ko: "노란색", fa: "زرد", image: "../../media/colors/yellow.png" },
      { ko: "검은색", fa: "مشکی", image: "../../media/colors/black.png" }
    ]
  },
  "ko-lesson12": {
    title: "제12과: 숫자",
    nextPage: "lesson12.html",
    words: [
      { ko: "하나", fa: "یک", image: "../../media/numbers/one.png" },
      { ko: "둘", fa: "دو", image: "../../media/numbers/two.png" },
      { ko: "셋", fa: "سه", image: "../../media/numbers/three.png" },
      { ko: "넷", fa: "چهار", image: "../../media/numbers/four.png" },
      { ko: "다섯", fa: "پنج", image: "../../media/numbers/five.png" }
    ]
  },
  "ko-lesson13": {
    title: "제13과: 시간",
    nextPage: "lesson13.html",
    words: [
      { ko: "오늘", fa: "امروز", image: "../../media/time/today.png" },
      { ko: "내일", fa: "فردا", image: "../../media/time/tomorrow.png" },
      { ko: "어제", fa: "دیروز", image: "../../media/time/yesterday.png" },
      { ko: "아침", fa: "صبح", image: "../../media/time/morning.png" },
      { ko: "밤", fa: "شب", image: "../../media/time/night.png" }
    ]
  },
  "ko-lesson14": {
    title: "제14과: 직업",
    nextPage: "lesson14.html",
    words: [
      { ko: "선생님", fa: "معلم", image: "../../media/jobs/teacher.png" },
      { ko: "의사", fa: "دکتر", image: "../../media/jobs/doctor.png" },
      { ko: "엔지니어", fa: "مهندس", image: "../../media/jobs/engineer.png" },
      { ko: "학생", fa: "دانش‌آموز", image: "../../media/jobs/student.png" },
      { ko: "운전사", fa: "راننده", image: "../../media/jobs/driver.png" }
    ]
  },
  "ko-lesson15": {
    title: "제15과: 탈것",
    nextPage: "lesson15.html",
    words: [
      { ko: "자동차", fa: "ماشین", image: "../../media/vehicles/car.png" },
      { ko: "버스", fa: "اتوبوس", image: "../../media/vehicles/bus.png" },
      { ko: "기차", fa: "قطار", image: "../../media/vehicles/train.png" },
      { ko: "비행기", fa: "هواپیما", image: "../../media/vehicles/airplane.png" },
      { ko: "자전거", fa: "دوچرخه", image: "../../media/vehicles/bicycle.png" }
    ]
  },
  "ko-lesson16": {
    title: "제16과: 장소",
    nextPage: "lesson16.html",
    words: [
      { ko: "학교", fa: "مدرسه", image: "../../media/places/school.png" },
      { ko: "병원", fa: "بیمارستان", image: "../../media/places/hospital.png" },
      { ko: "가게", fa: "فروشگاه", image: "../../media/places/store.png" },
      { ko: "공원", fa: "پارک", image: "../../media/places/park.png" },
      { ko: "사원", fa: "مسجد", image: "../../media/places/mosque.png" }
    ]
  },
  "ko-lesson17": {
    title: "제17과: 감정",
    nextPage: "lesson17.html",
    words: [
      { ko: "행복하다", fa: "خوشحال", image: "../../media/feelings/happy.png" },
      { ko: "슬프다", fa: "ناراحت", image: "../../media/feelings/sad.png" },
      { ko: "화나다", fa: "عصبانی", image: "../../media/feelings/angry.png" },
      { ko: "피곤하다", fa: "خسته", image: "../../media/feelings/tired.png" },
      { ko: "배고프다", fa: "گرسنه", image: "../../media/feelings/hungry.png" }
    ]
  },
  "ko-lesson18": {
    title: "제18과: 일상 활동",
    nextPage: "lesson18.html",
    words: [
      { ko: "먹다", fa: "خوردن", image: "../../media/actions/eat.png" },
      { ko: "자다", fa: "خوابیدن", image: "../../media/actions/sleep.png" },
      { ko: "걷다", fa: "راه رفتن", image: "../../media/actions/walk.png" },
      { ko: "읽다", fa: "خواندن", image: "../../media/actions/read.png" },
      { ko: "쓰다", fa: "نوشتن", image: "../../media/actions/write.png" }
    ]
  },
  "ko-lesson19": {
    title: "제19과: 형용사",
    nextPage: "lesson19.html",
    words: [
      { ko: "크다", fa: "بزرگ", image: "../../media/adjectives/big.png" },
      { ko: "작다", fa: "کوچک", image: "../../media/adjectives/small.png" },
      { ko: "키가 크다", fa: "بلند", image: "../../media/adjectives/tall.png" },
      { ko: "키가 작다", fa: "کوتاه", image: "../../media/adjectives/short.png" },
      { ko: "아름답다", fa: "زیبا", image: "../../media/adjectives/beautiful.png" }
    ]
  },
  "ko-lesson20": {
    title: "제20과: 질문",
    nextPage: "lesson20.html",
    words: [
      { ko: "누구", fa: "چه کسی", image: "../../media/questions/who.png" },
      { ko: "무엇", fa: "چه", image: "../../media/questions/what.png" },
      { ko: "어디", fa: "کجا", image: "../../media/questions/where.png" },
      { ko: "언제", fa: "کی", image: "../../media/questions/when.png" },
      { ko: "왜", fa: "چرا", image: "../../media/questions/why.png" }
    ]
  }
};

// ===== تابع پخش صدا (کره‌ای) =====
function speak(text) {
  if (!window.speechSynthesis) return;
  const utter = new SpeechSynthesisUtterance(text);
  utter.lang = "ko-KR";
  utter.rate = 0.9;
  speechSynthesis.cancel();
  speechSynthesis.speak(utter);
}

// ===== تابع نمایش صفحه معرفی =====
function renderIntro() {
  const lesson = allLessons[lessonId];
  
  if (!lesson) {
    document.getElementById("intro-container").innerHTML = `
      <h2>❌ 레슨을 찾을 수 없습니다!</h2>
      <p>홈페이지에서 들어가주세요.</p>
      <a href="../index.html">홈으로 돌아가기</a>
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
      <img src="${w.image}" alt="${w.ko}">
      <div class="word-en" style="font-size: 22px;">${w.ko}</div>
      <div class="word-fa">${w.fa}</div>
    `;
    card.addEventListener("click", () => {
      speak(w.ko);
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