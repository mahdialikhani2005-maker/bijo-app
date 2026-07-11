// ===== گرفتن شماره درس از آدرس =====
const urlParams = new URLSearchParams(window.location.search);
const lessonId = urlParams.get('lesson');

// ===== دیتابیس همه درس‌های A2 ترکی استانبولی (درس ۱ تا ۳۰) =====
const allLessons = {

  // ===== دسته ۱: خانواده و روابط (درس ۱-۵) =====
  "a2-lesson1": {
    title: "Ders 1: Aile",
    nextPage: "lesson1.html",
    words: [
      { tr: "amca/dayı", fa: "عمو/دایی", image: "../../../media/a2/family/uncle.png" },
      { tr: "teyze/hala", fa: "عمه/خاله", image: "../../../media/a2/family/aunt.png" },
      { tr: "kuzen", fa: "پسرعمو/دخترعمو", image: "../../../media/a2/family/cousin.png" },
      { tr: "yeğen (erkek)", fa: "برادرزاده", image: "../../../media/a2/family/nephew.png" },
      { tr: "yeğen (kız)", fa: "خواهرزاده", image: "../../../media/a2/family/niece.png" }
    ]
  },
  "a2-lesson2": {
    title: "Ders 2: Aile 2",
    nextPage: "lesson2.html",
    words: [
      { tr: "koca", fa: "شوهر", image: "../../../media/a2/family/husband.png" },
      { tr: "karı", fa: "همسر", image: "../../../media/a2/family/wife.png" },
      { tr: "ebeveyn", fa: "والدین", image: "../../../media/a2/family/parent.png" },
      { tr: "dede", fa: "پدربزرگ", image: "../../../media/a2/family/grandparent.png" },
      { tr: "torun", fa: "نوه", image: "../../../media/a2/family/grandchild.png" }
    ]
  },
  "a2-lesson3": {
    title: "Ders 3: Aile ilişkileri",
    nextPage: "lesson3.html",
    words: [
      { tr: "akraba", fa: "خویشاوند", image: "../../../media/a2/family/relative.png" },
      { tr: "ikiz", fa: "دوقلو", image: "../../../media/a2/family/twin.png" },
      { tr: "yetim", fa: "یتیم", image: "../../../media/a2/family/orphan.png" },
      { tr: "dul kadın", fa: "بیوه زن", image: "../../../media/a2/family/widow.png" },
      { tr: "gelin", fa: "عروس", image: "../../../media/a2/family/bride.png" }
    ]
  },
  "a2-lesson4": {
    title: "Ders 4: Üvey aile",
    nextPage: "lesson4.html",
    words: [
      { tr: "damat", fa: "داماد", image: "../../../media/a2/family/groom.png" },
      { tr: "kayın", fa: "خویشاوند سببی", image: "../../../media/a2/family/inlaw.png" },
      { tr: "üvey baba", fa: "پدرخوانده", image: "../../../media/a2/family/stepfather.png" },
      { tr: "üvey anne", fa: "مادرخوانده", image: "../../../media/a2/family/stepmother.png" },
      { tr: "üvey kız kardeş", fa: "خواهر ناتنی", image: "../../../media/a2/family/stepsister.png" }
    ]
  },
  "a2-lesson5": {
    title: "Ders 5: Soy",
    nextPage: "lesson5.html",
    words: [
      { tr: "ata", fa: "جد", image: "../../../media/a2/family/ancestor.png" },
      { tr: "soyundan gelen", fa: "فرزند", image: "../../../media/a2/family/descendant.png" },
      { tr: "kardeş", fa: "خواهر/برادر", image: "../../../media/a2/family/sibling.png" },
      { tr: "nişanlı (erkek)", fa: "نامزد (مرد)", image: "../../../media/a2/family/fiance.png" },
      { tr: "nişanlı (kız)", fa: "نامزد (زن)", image: "../../../media/a2/family/fiancee.png" }
    ]
  },

  // ===== دسته ۲: خانه و وسایل (درس ۶-۱۰) =====
  "a2-lesson6": {
    title: "Ders 6: Ev mobilyaları",
    nextPage: "lesson6.html",
    words: [
      { tr: "kanepe", fa: "مبل", image: "../../../media/a2/house/sofa.png" },
      { tr: "buzdolabı", fa: "یخچال", image: "../../../media/a2/house/fridge.png" },
      { tr: "gardırop", fa: "کمد لباس", image: "../../../media/a2/house/wardrobe.png" },
      { tr: "ayna", fa: "آینه", image: "../../../media/a2/house/mirror.png" },
      { tr: "raf", fa: "قفسه", image: "../../../media/a2/house/shelf.png" }
    ]
  },
  "a2-lesson7": {
    title: "Ders 7: Ev mobilyaları 2",
    nextPage: "lesson7.html",
    words: [
      { tr: "perde", fa: "پرده", image: "../../../media/a2/house/curtain.png" },
      { tr: "halı", fa: "فرش", image: "../../../media/a2/house/carpet.png" },
      { tr: "yastık", fa: "بالش", image: "../../../media/a2/house/pillow.png" },
      { tr: "battaniye", fa: "پتو", image: "../../../media/a2/house/blanket.png" },
      { tr: "lamba", fa: "چراغ", image: "../../../media/a2/house/lamp.png" }
    ]
  },
  "a2-lesson8": {
    title: "Ders 8: Evin bölümleri",
    nextPage: "lesson8.html",
    words: [
      { tr: "balkon", fa: "بالکن", image: "../../../media/a2/house/balcony.png" },
      { tr: "garaj", fa: "گاراژ", image: "../../../media/a2/house/garage.png" },
      { tr: "bodrum", fa: "زیرزمین", image: "../../../media/a2/house/basement.png" },
      { tr: "çatı katı", fa: "اتاق زیرشیروانی", image: "../../../media/a2/house/attic.png" },
      { tr: "avlu", fa: "حیاط", image: "../../../media/a2/house/yard.png" }
    ]
  },
  "a2-lesson9": {
    title: "Ders 9: Mutfak aletleri",
    nextPage: "lesson9.html",
    words: [
      { tr: "su ısıtıcısı", fa: "کتری", image: "../../../media/a2/house/kettle.png" },
      { tr: "tost makinesi", fa: "توستر", image: "../../../media/a2/house/toaster.png" },
      { tr: "blender", fa: "مخلوط‌کن", image: "../../../media/a2/house/blender.png" },
      { tr: "mikrodalga", fa: "مایکروویو", image: "../../../media/a2/house/microwave.png" },
      { tr: "bulaşık makinesi", fa: "ماشین ظرفشویی", image: "../../../media/a2/house/dishwasher.png" }
    ]
  },
  "a2-lesson10": {
    title: "Ders 10: Elektrikli aletler",
    nextPage: "lesson10.html",
    words: [
      { tr: "kombi", fa: "بخاری", image: "../../../media/a2/house/heater.png" },
      { tr: "vantilatör", fa: "پنکه", image: "../../../media/a2/house/fan.png" },
      { tr: "ütü", fa: "اتو", image: "../../../media/a2/house/iron.png" },
      { tr: "elektrikli süpürge", fa: "جاروبرقی", image: "../../../media/a2/house/vacuum.png" },
      { tr: "süpürge", fa: "جارو", image: "../../../media/a2/house/broom.png" }
    ]
  },

  // ===== دسته ۳: شهر و مکان‌ها (درس ۱۱-۱۵) =====
  "a2-lesson11": {
    title: "Ders 11: Şehir yerleri",
    nextPage: "lesson11.html",
    words: [
      { tr: "banka", fa: "بانک", image: "../../../media/a2/city/bank.png" },
      { tr: "kütüphane", fa: "کتابخانه", image: "../../../media/a2/city/library.png" },
      { tr: "sinema", fa: "سینما", image: "../../../media/a2/city/cinema.png" },
      { tr: "müze", fa: "موزه", image: "../../../media/a2/city/museum.png" },
      { tr: "restoran", fa: "رستوران", image: "../../../media/a2/city/restaurant.png" }
    ]
  },
  "a2-lesson12": {
    title: "Ders 12: Şehir yerleri 2",
    nextPage: "lesson12.html",
    words: [
      { tr: "otel", fa: "هتل", image: "../../../media/a2/city/hotel.png" },
      { tr: "kafe", fa: "کافه", image: "../../../media/a2/city/cafe.png" },
      { tr: "fırın", fa: "نانوایی", image: "../../../media/a2/city/bakery.png" },
      { tr: "eczane", fa: "داروخانه", image: "../../../media/a2/city/pharmacy.png" },
      { tr: "kasap", fa: "قصابی", image: "../../../media/a2/city/butchery.png" }
    ]
  },
  "a2-lesson13": {
    title: "Ders 13: Anıtlar ve yapılar",
    nextPage: "lesson13.html",
    words: [
      { tr: "köprü", fa: "پل", image: "../../../media/a2/city/bridge.png" },
      { tr: "meydan", fa: "میدان", image: "../../../media/a2/city/square.png" },
      { tr: "çeşme", fa: "آبنما", image: "../../../media/a2/city/fountain.png" },
      { tr: "kule", fa: "برج", image: "../../../media/a2/city/tower.png" },
      { tr: "kale", fa: "قلعه", image: "../../../media/a2/city/castle.png" }
    ]
  },
  "a2-lesson14": {
    title: "Ders 14: İbadet yerleri",
    nextPage: "lesson14.html",
    words: [
      { tr: "tapınak", fa: "معبد", image: "../../../media/a2/city/temple.png" },
      { tr: "kilise", fa: "کلیسا", image: "../../../media/a2/city/church.png" },
      { tr: "sinagog", fa: "کنیسه", image: "../../../media/a2/city/synagogue.png" },
      { tr: "cami", fa: "مسجد", image: "../../../media/a2/city/mosque.png" },
      { tr: "türbe", fa: "زیارتگاه", image: "../../../media/a2/city/shrine.png" }
    ]
  },
  "a2-lesson15": {
    title: "Ders 15: Kamu binaları",
    nextPage: "lesson15.html",
    words: [
      { tr: "büyükelçilik", fa: "سفارت", image: "../../../media/a2/city/embassy.png" },
      { tr: "mahkeme", fa: "دادگاه", image: "../../../media/a2/city/court.png" },
      { tr: "hapishane", fa: "زندان", image: "../../../media/a2/city/jail.png" },
      { tr: "fabrika", fa: "کارخانه", image: "../../../media/a2/city/factory.png" },
      { tr: "depo", fa: "انبار", image: "../../../media/a2/city/warehouse.png" }
    ]
  },

  // ===== دسته ۴: حرفه‌ها (درس ۱۶-۲۰) =====
  "a2-lesson16": {
    title: "Ders 16: Meslekler 1",
    nextPage: "lesson16.html",
    words: [
      { tr: "pilot", fa: "خلبان", image: "../../../media/a2/jobs/pilot.png" },
      { tr: "hemşire", fa: "پرستار", image: "../../../media/a2/jobs/nurse.png" },
      { tr: "avukat", fa: "وکیل", image: "../../../media/a2/jobs/lawyer.png" },
      { tr: "sanatçı", fa: "هنرمند", image: "../../../media/a2/jobs/artist.png" },
      { tr: "aşçı", fa: "آشپز", image: "../../../media/a2/jobs/chef.png" }
    ]
  },
  "a2-lesson17": {
    title: "Ders 17: Meslekler 2",
    nextPage: "lesson17.html",
    words: [
      { tr: "garson", fa: "پیشخدمت", image: "../../../media/a2/jobs/waiter.png" },
      { tr: "garson (kadın)", fa: "پیشخدمت (زن)", image: "../../../media/a2/jobs/waitress.png" },
      { tr: "berber", fa: "آرایشگر", image: "../../../media/a2/jobs/barber.png" },
      { tr: "terzi", fa: "خیاط", image: "../../../media/a2/jobs/tailor.png" },
      { tr: "kasap", fa: "قصاب", image: "../../../media/a2/jobs/butcher.png" }
    ]
  },
  "a2-lesson18": {
    title: "Ders 18: Meslekler 3",
    nextPage: "lesson18.html",
    words: [
      { tr: "tamirci", fa: "مکانیک", image: "../../../media/a2/jobs/mechanic.png" },
      { tr: "tesisatçı", fa: "لوله‌کش", image: "../../../media/a2/jobs/plumber.png" },
      { tr: "elektrikçi", fa: "برق‌کار", image: "../../../media/a2/jobs/electrician.png" },
      { tr: "marangoz", fa: "نجار", image: "../../../media/a2/jobs/carpenter.png" },
      { tr: "duvarcı", fa: "بنّا", image: "../../../media/a2/jobs/mason.png" }
    ]
  },
  "a2-lesson19": {
    title: "Ders 19: Meslekler 4",
    nextPage: "lesson19.html",
    words: [
      { tr: "bilim insanı", fa: "دانشمند", image: "../../../media/a2/jobs/scientist.png" },
      { tr: "profesör", fa: "استاد", image: "../../../media/a2/jobs/professor.png" },
      { tr: "yazar", fa: "نویسنده", image: "../../../media/a2/jobs/author.png" },
      { tr: "şair", fa: "شاعر", image: "../../../media/a2/jobs/poet.png" },
      { tr: "müzisyen", fa: "نوازنده", image: "../../../media/a2/jobs/musician.png" }
    ]
  },
  "a2-lesson20": {
    title: "Ders 20: Meslekler 5",
    nextPage: "lesson20.html",
    words: [
      { tr: "aktör", fa: "بازیگر", image: "../../../media/a2/jobs/actor.png" },
      { tr: "aktris", fa: "بازیگر (زن)", image: "../../../media/a2/jobs/actress.png" },
      { tr: "yönetmen", fa: "کارگردان", image: "../../../media/a2/jobs/director.png" },
      { tr: "yapımcı", fa: "تهیه‌کننده", image: "../../../media/a2/jobs/producer.png" },
      { tr: "editör", fa: "ویراستار", image: "../../../media/a2/jobs/editor.png" }
    ]
  },

  // ===== دسته ۵: غذا و نوشیدنی (درس ۲۱-۲۵) =====
  "a2-lesson21": {
    title: "Ders 21: İçecekler",
    nextPage: "lesson21.html",
    words: [
      { tr: "meyve suyu", fa: "آبمیوه", image: "../../../media/a2/food/juice.png" },
      { tr: "kahve", fa: "قهوه", image: "../../../media/a2/food/coffee.png" },
      { tr: "çay", fa: "چای", image: "../../../media/a2/food/tea.png" },
      { tr: "çorba", fa: "سوپ", image: "../../../media/a2/food/soup.png" },
      { tr: "pasta", fa: "کیک", image: "../../../media/a2/food/cake.png" }
    ]
  },
  "a2-lesson22": {
    title: "Ders 22: Yaygın yiyecekler",
    nextPage: "lesson22.html",
    words: [
      { tr: "pizza", fa: "پیتزا", image: "../../../media/a2/food/pizza.png" },
      { tr: "makarna", fa: "پاستا", image: "../../../media/a2/food/pasta.png" },
      { tr: "salata", fa: "سالاد", image: "../../../media/a2/food/salad.png" },
      { tr: "sandviç", fa: "ساندویچ", image: "../../../media/a2/food/sandwich.png" },
      { tr: "burger", fa: "برگر", image: "../../../media/a2/food/burger.png" }
    ]
  },
  "a2-lesson23": {
    title: "Ders 23: Deniz ürünleri",
    nextPage: "lesson23.html",
    words: [
      { tr: "biftek", fa: "استیک", image: "../../../media/a2/food/steak.png" },
      { tr: "karides", fa: "میگو", image: "../../../media/a2/food/shrimp.png" },
      { tr: "ıstakoz", fa: "خرچنگ", image: "../../../media/a2/food/lobster.png" },
      { tr: "istiridye", fa: "صدف", image: "../../../media/a2/food/oyster.png" },
      { tr: "yengeç", fa: "خرچنگ دریایی", image: "../../../media/a2/food/crab.png" }
    ]
  },
  "a2-lesson24": {
    title: "Ders 24: Süt ürünleri",
    nextPage: "lesson24.html",
    words: [
      { tr: "tereyağı", fa: "کره", image: "../../../media/a2/food/butter.png" },
      { tr: "peynir", fa: "پنیر", image: "../../../media/a2/food/cheese.png" },
      { tr: "krema", fa: "خامه", image: "../../../media/a2/food/cream.png" },
      { tr: "yoğurt", fa: "ماست", image: "../../../media/a2/food/yogurt.png" },
      { tr: "dondurma", fa: "بستنی", image: "../../../media/a2/food/icecream.png" }
    ]
  },
  "a2-lesson25": {
    title: "Ders 25: Kahvaltı",
    nextPage: "lesson25.html",
    words: [
      { tr: "tost", fa: "نان تست", image: "../../../media/a2/food/toast.png" },
      { tr: "tahıl", fa: "غلات صبحانه", image: "../../../media/a2/food/cereal.png" },
      { tr: "yulaf ezmesi", fa: "بلغور جو", image: "../../../media/a2/food/oatmeal.png" },
      { tr: "reçel", fa: "مربا", image: "../../../media/a2/food/jam.png" },
      { tr: "bal", fa: "عسل", image: "../../../media/a2/food/honey.png" }
    ]
  },

  // ===== دسته ۶: پوشاک و اکسسوری (درس ۲۶-۳۰) =====
  "a2-lesson26": {
    title: "Ders 26: Aksesuarlar",
    nextPage: "lesson26.html",
    words: [
      { tr: "kemer", fa: "کمربند", image: "../../../media/a2/clothes/belt.png" },
      { tr: "atkı", fa: "شال", image: "../../../media/a2/clothes/scarf.png" },
      { tr: "eldiven", fa: "دستکش", image: "../../../media/a2/clothes/gloves.png" },
      { tr: "kol saati", fa: "ساعت مچی", image: "../../../media/a2/clothes/watch.png" },
      { tr: "kolye", fa: "گردنبند", image: "../../../media/a2/clothes/necklace.png" }
    ]
  },
  "a2-lesson27": {
    title: "Ders 27: Takılar",
    nextPage: "lesson27.html",
    words: [
      { tr: "bilezik", fa: "دستبند", image: "../../../media/a2/clothes/bracelet.png" },
      { tr: "küpe", fa: "گوشواره", image: "../../../media/a2/clothes/earring.png" },
      { tr: "yüzük", fa: "حلقه", image: "../../../media/a2/clothes/ring.png" },
      { tr: "zincir", fa: "زنجیر", image: "../../../media/a2/clothes/chain.png" },
      { tr: "taç", fa: "تاج", image: "../../../media/a2/clothes/crown.png" }
    ]
  },
  "a2-lesson28": {
    title: "Ders 28: Kalın giysiler",
    nextPage: "lesson28.html",
    words: [
      { tr: "kot pantolon", fa: "شلوار جین", image: "../../../media/a2/clothes/jeans.png" },
      { tr: "ceket", fa: "ژاکت", image: "../../../media/a2/clothes/jacket.png" },
      { tr: "palto", fa: "کت", image: "../../../media/a2/clothes/coat.png" },
      { tr: "yelek", fa: "جلیقه", image: "../../../media/a2/clothes/vest.png" },
      { tr: "kazak", fa: "پلیور", image: "../../../media/a2/clothes/sweater.png" }
    ]
  },
  "a2-lesson29": {
    title: "Ders 29: Yazlık giysiler",
    nextPage: "lesson29.html",
    words: [
      { tr: "şort", fa: "شورت", image: "../../../media/a2/clothes/shorts.png" },
      { tr: "etek", fa: "دامن", image: "../../../media/a2/clothes/skirt.png" },
      { tr: "çorap", fa: "جوراب", image: "../../../media/a2/clothes/socks.png" },
      { tr: "iç çamaşırı", fa: "لباس زیر", image: "../../../media/a2/clothes/underwear.png" },
      { tr: "pijama", fa: "پیژامه", image: "../../../media/a2/clothes/pajama.png" }
    ]
  },
  "a2-lesson30": {
    title: "Ders 30: Kişisel eşyalar",
    nextPage: "lesson30.html",
    words: [
      { tr: "şemsiye", fa: "چتر", image: "../../../media/a2/clothes/umbrella.png" },
      { tr: "çanta", fa: "کیف", image: "../../../media/a2/clothes/bag.png" },
      { tr: "sırt çantası", fa: "کوله پشتی", image: "../../../media/a2/clothes/backpack.png" },
      { tr: "cüzdan", fa: "کیف پول", image: "../../../media/a2/clothes/wallet.png" },
      { tr: "el çantası", fa: "کیف دستی", image: "../../../media/a2/clothes/purse.png" }
    ]
  },
  // ===== ادامه دیتابیس درس‌های A2 ترکی استانبولی (درس ۳۱ تا ۶۰) =====

  // ===== دسته ۷: حمل و نقل (درس ۳۱-۳۵) =====
  "a2-lesson31": {
    title: "Ders 31: Ulaşım araçları 1",
    nextPage: "lesson31.html",
    words: [
      { tr: "taksi", fa: "تاکسی", image: "../../../media/a2/vehicles/taxi.png" },
      { tr: "tekne", fa: "قایق", image: "../../../media/a2/vehicles/boat.png" },
      { tr: "motosiklet", fa: "موتورسیکلت", image: "../../../media/a2/vehicles/motorcycle.png" },
      { tr: "helikopter", fa: "بالگرد", image: "../../../media/a2/vehicles/helicopter.png" },
      { tr: "kamyon", fa: "کامیون", image: "../../../media/a2/vehicles/truck.png" }
    ]
  },
  "a2-lesson32": {
    title: "Ders 32: Ulaşım araçları 2",
    nextPage: "lesson32.html",
    words: [
      { tr: "minibüs", fa: "ون", image: "../../../media/a2/vehicles/van.png" },
      { tr: "ciip", fa: "جیپ", image: "../../../media/a2/vehicles/jeep.png" },
      { tr: "limuzin", fa: "لیموزین", image: "../../../media/a2/vehicles/limousine.png" },
      { tr: "ambulans", fa: "آمبولانس", image: "../../../media/a2/vehicles/ambulance.png" },
      { tr: "itfaiye aracı", fa: "آتش‌نشانی", image: "../../../media/a2/vehicles/firetruck.png" }
    ]
  },
  "a2-lesson33": {
    title: "Ders 33: Su araçları",
    nextPage: "lesson33.html",
    words: [
      { tr: "denizaltı", fa: "زیردریایی", image: "../../../media/a2/vehicles/submarine.png" },
      { tr: "feribot", fa: "کشتی", image: "../../../media/a2/vehicles/ferry.png" },
      { tr: "yat", fa: "قایق تفریحی", image: "../../../media/a2/vehicles/yacht.png" },
      { tr: "kano", fa: "کانو", image: "../../../media/a2/vehicles/canoe.png" },
      { tr: "sal", fa: "قایق بادی", image: "../../../media/a2/vehicles/raft.png" }
    ]
  },
  "a2-lesson34": {
    title: "Ders 34: Modern araçlar",
    nextPage: "lesson34.html",
    words: [
      { tr: "scooter", fa: "اسکوتر", image: "../../../media/a2/vehicles/scooter.png" },
      { tr: "kaykay", fa: "اسکیت‌برد", image: "../../../media/a2/vehicles/skateboard.png" },
      { tr: "paten", fa: "اسکیت خطی", image: "../../../media/a2/vehicles/rollerblade.png" },
      { tr: "hoverboard", fa: "هووربرد", image: "../../../media/a2/vehicles/hoverboard.png" },
      { tr: "tek tekerlekli bisiklet", fa: "دوچرخه یک چرخ", image: "../../../media/a2/vehicles/unicycle.png" }
    ]
  },
  "a2-lesson35": {
    title: "Ders 35: Geleneksel araçlar",
    nextPage: "lesson35.html",
    words: [
      { tr: "at arabası", fa: "درشکه", image: "../../../media/a2/vehicles/carriage.png" },
      { tr: "vagon", fa: "واگن", image: "../../../media/a2/vehicles/wagon.png" },
      { tr: "kızak", fa: "سورتمه", image: "../../../media/a2/vehicles/sleigh.png" },
      { tr: "riksa", fa: "ریکشا", image: "../../../media/a2/vehicles/rickshaw.png" },
      { tr: "tramvay", fa: "تراموا", image: "../../../media/a2/vehicles/tram.png" }
    ]
  },

  // ===== دسته ۸: طبیعت و آب و هوا (درس ۳۶-۴۰) =====
  "a2-lesson36": {
    title: "Ders 36: Doğa",
    nextPage: "lesson36.html",
    words: [
      { tr: "nehir", fa: "رودخانه", image: "../../../media/a2/nature/river.png" },
      { tr: "orman", fa: "جنگل", image: "../../../media/a2/nature/forest.png" },
      { tr: "çöl", fa: "بیابان", image: "../../../media/a2/nature/desert.png" },
      { tr: "ada", fa: "جزیره", image: "../../../media/a2/nature/island.png" },
      { tr: "fırtına", fa: "طوفان", image: "../../../media/a2/nature/storm.png" }
    ]
  },
  "a2-lesson37": {
    title: "Ders 37: Doğal olaylar",
    nextPage: "lesson37.html",
    words: [
      { tr: "şelale", fa: "آبشار", image: "../../../media/a2/nature/waterfall.png" },
      { tr: "yanardağ", fa: "آتشفشان", image: "../../../media/a2/nature/volcano.png" },
      { tr: "buzul", fa: "یخچال طبیعی", image: "../../../media/a2/nature/glacier.png" },
      { tr: "kanyon", fa: "دره", image: "../../../media/a2/nature/canyon.png" },
      { tr: "mağara", fa: "غار", image: "../../../media/a2/nature/cave.png" }
    ]
  },
  "a2-lesson38": {
    title: "Ders 38: Plaj ve deniz",
    nextPage: "lesson38.html",
    words: [
      { tr: "plaj", fa: "ساحل", image: "../../../media/a2/nature/beach.png" },
      { tr: "sahil", fa: "خط ساحلی", image: "../../../media/a2/nature/coast.png" },
      { tr: "dalga", fa: "موج", image: "../../../media/a2/nature/wave.png" },
      { tr: "gelgit", fa: "جزر و مد", image: "../../../media/a2/nature/tide.png" },
      { tr: "uçurum", fa: "صخره", image: "../../../media/a2/nature/cliff.png" }
    ]
  },
  "a2-lesson39": {
    title: "Ders 39: Hava durumu",
    nextPage: "lesson39.html",
    words: [
      { tr: "sis", fa: "مه", image: "../../../media/a2/weather/fog.png" },
      { tr: "dolu", fa: "تگرگ", image: "../../../media/a2/weather/hail.png" },
      { tr: "kar tanesi", fa: "دانه برف", image: "../../../media/a2/weather/snowflake.png" },
      { tr: "şimşek", fa: "صاعقه", image: "../../../media/a2/weather/lightning.png" },
      { tr: "gök gürültüsü", fa: "رعد", image: "../../../media/a2/weather/thunder.png" }
    ]
  },
  "a2-lesson40": {
    title: "Ders 40: Atmosferik olaylar",
    nextPage: "lesson40.html",
    words: [
      { tr: "gökkuşağı", fa: "رنگین‌کمان", image: "../../../media/a2/weather/rainbow.png" },
      { tr: "hafif rüzgar", fa: "نسیم", image: "../../../media/a2/weather/breeze.png" },
      { tr: "sel", fa: "سیل", image: "../../../media/a2/weather/flood.png" },
      { tr: "kuraklık", fa: "خشکسالی", image: "../../../media/a2/weather/drought.png" },
      { tr: "deprem", fa: "زلزله", image: "../../../media/a2/weather/earthquake.png" }
    ]
  },

  // ===== دسته ۹: سلامتی و بدن (درس ۴۱-۴۵) =====
  "a2-lesson41": {
    title: "Ders 41: İnsan vücudu",
    nextPage: "lesson41.html",
    words: [
      { tr: "kalp", fa: "قلب", image: "../../../media/a2/health/heart.png" },
      { tr: "kemik", fa: "استخوان", image: "../../../media/a2/health/bone.png" },
      { tr: "kas", fa: "عضله", image: "../../../media/a2/health/muscle.png" },
      { tr: "cilt", fa: "پوست", image: "../../../media/a2/health/skin.png" },
      { tr: "kan", fa: "خون", image: "../../../media/a2/health/blood.png" }
    ]
  },
  "a2-lesson42": {
    title: "Ders 42: Vücut sistemi",
    nextPage: "lesson42.html",
    words: [
      { tr: "beyin", fa: "مغز", image: "../../../media/a2/health/brain.png" },
      { tr: "sinir", fa: "عصب", image: "../../../media/a2/health/nerve.png" },
      { tr: "damar", fa: "ورید", image: "../../../media/a2/health/vein.png" },
      { tr: "atardamar", fa: "سرخرگ", image: "../../../media/a2/health/artery.png" },
      { tr: "eklem", fa: "مفصل", image: "../../../media/a2/health/joint.png" }
    ]
  },
  "a2-lesson43": {
    title: "Ders 43: Hastalıklar",
    nextPage: "lesson43.html",
    words: [
      { tr: "öksürük", fa: "سرفه", image: "../../../media/a2/health/cough.png" },
      { tr: "ateş", fa: "تب", image: "../../../media/a2/health/fever.png" },
      { tr: "aspirin", fa: "آسپرین", image: "../../../media/a2/health/aspirin.png" },
      { tr: "ilaç", fa: "دارو", image: "../../../media/a2/health/medicine.png" },
      { tr: "iğne", fa: "آمپول", image: "../../../media/a2/health/injection.png" }
    ]
  },
  "a2-lesson44": {
    title: "Ders 44: Yaralar ve tedaviler",
    nextPage: "lesson44.html",
    words: [
      { tr: "alerji", fa: "حساسیت", image: "../../../media/a2/health/allergy.png" },
      { tr: "enfeksiyon", fa: "عفونت", image: "../../../media/a2/health/infection.png" },
      { tr: "yaralanma", fa: "آسیب", image: "../../../media/a2/health/injury.png" },
      { tr: "yara", fa: "زخم", image: "../../../media/a2/health/wound.png" },
      { tr: "yara izi", fa: "جای زخم", image: "../../../media/a2/health/scar.png" }
    ]
  },
  "a2-lesson45": {
    title: "Ders 45: Tedaviler ve hastane",
    nextPage: "lesson45.html",
    words: [
      { tr: "ameliyat", fa: "جراحی", image: "../../../media/a2/health/surgery.png" },
      { tr: "sedye", fa: "برانکارد", image: "../../../media/a2/health/stretcher.png" },
      { tr: "tekerlekli sandalye", fa: "صندلی چرخدار", image: "../../../media/a2/health/wheelchair.png" },
      { tr: "alçı", fa: "گچ", image: "../../../media/a2/health/cast.png" },
      { tr: "bandaj", fa: "بانداژ", image: "../../../media/a2/health/bandage.png" }
    ]
  },
  "a2-lesson46": {
    title: "Ders 46: Okul malzemeleri",
    nextPage: "lesson46.html",
    words: [
      { tr: "defter", fa: "دفتر", image: "../../../media/a2/school/notebook.png" },
      { tr: "kalem", fa: "مداد", image: "../../../media/a2/school/pencil.png" },
      { tr: "cetvel", fa: "خط‌کش", image: "../../../media/a2/school/ruler.png" },
      { tr: "silgi", fa: "پاک‌کن", image: "../../../media/a2/school/eraser.png" },
      { tr: "hesap makinesi", fa: "ماشین حساب", image: "../../../media/a2/school/calculator.png" }
    ]
  },
  "a2-lesson47": {
    title: "Ders 47: Kitaplar ve çalışma",
    nextPage: "lesson47.html",
    words: [
      { tr: "sözlük", fa: "فرهنگ لغت", image: "../../../media/a2/school/dictionary.png" },
      { tr: "ansiklopedi", fa: "دایره‌المعارف", image: "../../../media/a2/school/encyclopedia.png" },
      { tr: "atlas", fa: "اطلس", image: "../../../media/a2/school/atlas.png" },
      { tr: "pusula", fa: "قطب‌نما", image: "../../../media/a2/school/compass.png" },
      { tr: "iletki", fa: "نقاله", image: "../../../media/a2/school/protractor.png" }
    ]
  },
  "a2-lesson48": {
    title: "Ders 48: Üniversite",
    nextPage: "lesson48.html",
    words: [
      { tr: "üniversite", fa: "دانشگاه", image: "../../../media/a2/school/university.png" },
      { tr: "kolej", fa: "کالج", image: "../../../media/a2/school/college.png" },
      { tr: "kampüs", fa: "محوطه دانشگاه", image: "../../../media/a2/school/campus.png" },
      { tr: "yurt", fa: "خوابگاه", image: "../../../media/a2/school/dormitory.png" },
      { tr: "laboratuvar", fa: "آزمایشگاه", image: "../../../media/a2/school/laboratory.png" }
    ]
  },
  "a2-lesson49": {
    title: "Ders 49: Çalışma",
    nextPage: "lesson49.html",
    words: [
      { tr: "not", fa: "نمره", image: "../../../media/a2/school/grade.png" },
      { tr: "sınav", fa: "امتحان", image: "../../../media/a2/school/exam.png" },
      { tr: "ders", fa: "درس", image: "../../../media/a2/school/lesson.png" },
      { tr: "konu", fa: "موضوع درسی", image: "../../../media/a2/school/subject.png" },
      { tr: "öğretmen", fa: "معلم", image: "../../../media/a2/school/teacher.png" }
    ]
  },
  "a2-lesson50": {
    title: "Ders 50: Araştırma ve makaleler",
    nextPage: "lesson50.html",
    words: [
      { tr: "makale", fa: "مقاله", image: "../../../media/a2/school/essay.png" },
      { tr: "tez", fa: "پایان‌نامه", image: "../../../media/a2/school/thesis.png" },
      { tr: "rapor", fa: "گزارش", image: "../../../media/a2/school/report.png" },
      { tr: "proje", fa: "پروژه", image: "../../../media/a2/school/project.png" },
      { tr: "atölye", fa: "کارگاه آموزشی", image: "../../../media/a2/school/workshop.png" }
    ]
  },

  // ===== دسته ۱۱: سفر و گردشگری (درس ۵۱-۵۵) =====
  "a2-lesson51": {
    title: "Ders 51: Seyahat",
    nextPage: "lesson51.html",
    words: [
      { tr: "pasaport", fa: "گذرنامه", image: "../../../media/a2/travel/passport.png" },
      { tr: "otel", fa: "هتل", image: "../../../media/a2/travel/hotel.png" },
      { tr: "bagaj", fa: "چمدان", image: "../../../media/a2/travel/luggage.png" },
      { tr: "uçuş", fa: "پرواز", image: "../../../media/a2/travel/flight.png" },
      { tr: "harita", fa: "نقشه", image: "../../../media/a2/travel/map.png" }
    ]
  },
  "a2-lesson52": {
    title: "Ders 52: Seyahat ekipmanları",
    nextPage: "lesson52.html",
    words: [
      { tr: "sırt çantası", fa: "کوله پشتی", image: "../../../media/a2/travel/backpack.png" },
      { tr: "çadır", fa: "چادر", image: "../../../media/a2/travel/tent.png" },
      { tr: "pusula", fa: "قطب‌نما", image: "../../../media/a2/travel/compass.png" },
      { tr: "dürbün", fa: "دوربین دوچشمی", image: "../../../media/a2/travel/binoculars.png" },
      { tr: "güneş kremi", fa: "کرم ضدآفتاب", image: "../../../media/a2/travel/sunscreen.png" }
    ]
  },
  "a2-lesson53": {
    title: "Ders 53: Turizm",
    nextPage: "lesson53.html",
    words: [
      { tr: "rehber", fa: "راهنما", image: "../../../media/a2/travel/guide.png" },
      { tr: "turist", fa: "گردشگر", image: "../../../media/a2/travel/tourist.png" },
      { tr: "hatıra", fa: "سوغاتی", image: "../../../media/a2/travel/souvenir.png" },
      { tr: "macera", fa: "ماجراجویی", image: "../../../media/a2/travel/adventure.png" },
      { tr: "seyahat", fa: "سفر", image: "../../../media/a2/travel/journey.png" }
    ]
  },
  "a2-lesson54": {
    title: "Ders 54: Liman ve havalimanı",
    nextPage: "lesson54.html",
    words: [
      { tr: "liman", fa: "بندر", image: "../../../media/a2/travel/harbor.png" },
      { tr: "liman", fa: "بندرگاه", image: "../../../media/a2/travel/port.png" },
      { tr: "terminal", fa: "ترمینال", image: "../../../media/a2/travel/terminal.png" },
      { tr: "kapı", fa: "دروازه", image: "../../../media/a2/travel/gate.png" },
      { tr: "mürettebat", fa: "خدمه", image: "../../../media/a2/travel/crew.png" }
    ]
  },
  "a2-lesson55": {
    title: "Ders 55: Seyahat belgeleri",
    nextPage: "lesson55.html",
    words: [
      { tr: "vize", fa: "ویزا", image: "../../../media/a2/travel/visa.png" },
      { tr: "para birimi", fa: "ارز", image: "../../../media/a2/travel/currency.png" },
      { tr: "döviz", fa: "تبادل", image: "../../../media/a2/travel/exchange.png" },
      { tr: "kalkış", fa: "حرکت", image: "../../../media/a2/travel/departure.png" },
      { tr: "varış", fa: "ورود", image: "../../../media/a2/travel/arrival.png" }
    ]
  },

  // ===== دسته ۱۲: فناوری و کامپیوتر (درس ۵۶-۶۰) =====
  "a2-lesson56": {
    title: "Ders 56: Bilgisayar",
    nextPage: "lesson56.html",
    words: [
      { tr: "bilgisayar", fa: "کامپیوتر", image: "../../../media/a2/technology/computer.png" },
      { tr: "klavye", fa: "صفحه کلید", image: "../../../media/a2/technology/keyboard.png" },
      { tr: "fare", fa: "موشواره", image: "../../../media/a2/technology/mouse.png" },
      { tr: "internet", fa: "اینترنت", image: "../../../media/a2/technology/internet.png" },
      { tr: "e-posta", fa: "ایمیل", image: "../../../media/a2/technology/email.png" }
    ]
  },
  "a2-lesson57": {
    title: "Ders 57: Bilgisayar aksesuarları",
    nextPage: "lesson57.html",
    words: [
      { tr: "ekran", fa: "صفحه نمایش", image: "../../../media/a2/technology/screen.png" },
      { tr: "monitör", fa: "مانیتور", image: "../../../media/a2/technology/monitor.png" },
      { tr: "yazıcı", fa: "چاپگر", image: "../../../media/a2/technology/printer.png" },
      { tr: "tarayıcı", fa: "اسکنر", image: "../../../media/a2/technology/scanner.png" },
      { tr: "hoparlör", fa: "بلندگو", image: "../../../media/a2/technology/speaker.png" }
    ]
  },
  "a2-lesson58": {
    title: "Ders 58: Yazılım",
    nextPage: "lesson58.html",
    words: [
      { tr: "yazılım", fa: "نرم‌افزار", image: "../../../media/a2/technology/software.png" },
      { tr: "donanım", fa: "سخت‌افزار", image: "../../../media/a2/technology/hardware.png" },
      { tr: "güncelleme", fa: "به‌روزرسانی", image: "../../../media/a2/technology/update.png" },
      { tr: "şifre", fa: "رمز عبور", image: "../../../media/a2/technology/password.png" },
      { tr: "hesap", fa: "حساب کاربری", image: "../../../media/a2/technology/account.png" }
    ]
  },
  "a2-lesson59": {
    title: "Ders 59: İnternet",
    nextPage: "lesson59.html",
    words: [
      { tr: "indirme", fa: "دانلود", image: "../../../media/a2/technology/download.png" },
      { tr: "yükleme", fa: "آپلود", image: "../../../media/a2/technology/upload.png" },
      { tr: "canlı yayın", fa: "پخش زنده", image: "../../../media/a2/technology/stream.png" },
      { tr: "video", fa: "ویدیو", image: "../../../media/a2/technology/video.png" },
      { tr: "ses", fa: "صوت", image: "../../../media/a2/technology/audio.png" }
    ]
  },
  "a2-lesson60": {
    title: "Ders 60: Yeni teknolojiler",
    nextPage: "lesson60.html",
    words: [
      { tr: "cihaz", fa: "دستگاه", image: "../../../media/a2/technology/device.png" },
      { tr: "alet", fa: "ابزار", image: "../../../media/a2/technology/gadget.png" },
      { tr: "robot", fa: "ربات", image: "../../../media/a2/technology/robot.png" },
      { tr: "drone", fa: "پهپاد", image: "../../../media/a2/technology/drone.png" },
      { tr: "akıllı saat", fa: "ساعت هوشمند", image: "../../../media/a2/technology/smartwatch.png" }
    ]
  }
};

// ===== تابع پخش صدا (ترکی) =====
function speak(text) {
  if (!window.speechSynthesis) return;
  const utter = new SpeechSynthesisUtterance(text);
  utter.lang = "tr-TR";
  utter.rate = 0.9;
  speechSynthesis.cancel();
  speechSynthesis.speak(utter);
}

// ===== تابع نمایش صفحه معرفی =====
function renderIntro() {
  const lesson = allLessons[lessonId];
  
  if (!lesson) {
    document.getElementById("intro-container").innerHTML = `
      <h2>❌ Ders bulunamadı!</h2>
      <p>Lütfen ana sayfadan girin.</p>
      <a href="../index.html">Ana sayfaya dön</a>
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
      <img src="${w.image}" alt="${w.tr}">
      <div class="word-en" style="font-size: 20px;">${w.tr}</div>
      <div class="word-fa">${w.fa}</div>
    `;
    card.addEventListener("click", () => {
      speak(w.tr);
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