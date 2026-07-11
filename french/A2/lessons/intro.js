
const urlParams = new URLSearchParams(window.location.search);
const lessonId = urlParams.get('lesson');

// ===== Base de données de toutes les leçons A2 (leçon 1 à 30) =====
const allLessons = {

  // ===== Catégorie 1: Famille et relations (leçon 1-5) =====
  "a2-lesson1": {
    title: "Leçon 1: La famille",
    nextPage: "lesson1.html",
    words: [
      { fr: "oncle", fa: "عمو / دایی", image: "../../../media/a2/family/uncle.png" },
      { fr: "tante", fa: "عمه / خاله", image: "../../../media/a2/family/aunt.png" },
      { fr: "cousin / cousine", fa: "پسرعمو / دخترعمو", image: "../../../media/a2/family/cousin.png" },
      { fr: "neveu", fa: "برادرزاده", image: "../../../media/a2/family/nephew.png" },
      { fr: "nièce", fa: "خواهرزاده", image: "../../../media/a2/family/niece.png" }
    ]
  },
  "a2-lesson2": {
    title: "Leçon 2: La famille 2",
    nextPage: "lesson2.html",
    words: [
      { fr: "mari", fa: "شوهر", image: "../../../media/a2/family/husband.png" },
      { fr: "femme", fa: "همسر", image: "../../../media/a2/family/wife.png" },
      { fr: "parent", fa: "پدر و مادر", image: "../../../media/a2/family/parent.png" },
      { fr: "grand-parent", fa: "پدربزرگ / مادربزرگ", image: "../../../media/a2/family/grandparent.png" },
      { fr: "petit-enfant", fa: "نوه", image: "../../../media/a2/family/grandchild.png" }
    ]
  },
  "a2-lesson3": {
    title: "Leçon 3: Relations familiales",
    nextPage: "lesson3.html",
    words: [
      { fr: "parent", fa: "خویشاوند", image: "../../../media/a2/family/relative.png" },
      { fr: "jumeau / jumelle", fa: "دوقلو", image: "../../../media/a2/family/twin.png" },
      { fr: "orphelin", fa: "یتیم", image: "../../../media/a2/family/orphan.png" },
      { fr: "veuve", fa: "بیوه زن", image: "../../../media/a2/family/widow.png" },
      { fr: "mariée", fa: "عروس", image: "../../../media/a2/family/bride.png" }
    ]
  },
  "a2-lesson4": {
    title: "Leçon 4: Famille recomposée",
    nextPage: "lesson4.html",
    words: [
      { fr: "marié", fa: "داماد", image: "../../../media/a2/family/groom.png" },
      { fr: "allié", fa: "خویشاوند سببی", image: "../../../media/a2/family/inlaw.png" },
      { fr: "beau-père", fa: "پدرخوانده", image: "../../../media/a2/family/stepfather.png" },
      { fr: "belle-mère", fa: "مادرخوانده", image: "../../../media/a2/family/stepmother.png" },
      { fr: "demi-sœur", fa: "خواهر ناتنی", image: "../../../media/a2/family/stepsister.png" }
    ]
  },
  "a2-lesson5": {
    title: "Leçon 5: Ascendance et descendance",
    nextPage: "lesson5.html",
    words: [
      { fr: "ancêtre", fa: "جد", image: "../../../media/a2/family/ancestor.png" },
      { fr: "descendant", fa: "فرزند", image: "../../../media/a2/family/descendant.png" },
      { fr: "frère / sœur", fa: "برادر / خواهر", image: "../../../media/a2/family/sibling.png" },
      { fr: "fiancé", fa: "نامزد (مرد)", image: "../../../media/a2/family/fiance.png" },
      { fr: "fiancée", fa: "نامزد (زن)", image: "../../../media/a2/family/fiancee.png" }
    ]
  },

  // ===== Catégorie 2: Maison et meubles (leçon 6-10) =====
  "a2-lesson6": {
    title: "Leçon 6: Meubles de la maison",
    nextPage: "lesson6.html",
    words: [
      { fr: "canapé", fa: "مبل", image: "../../../media/a2/house/sofa.png" },
      { fr: "réfrigérateur", fa: "یخچال", image: "../../../media/a2/house/fridge.png" },
      { fr: "armoire", fa: "کمد لباس", image: "../../../media/a2/house/wardrobe.png" },
      { fr: "miroir", fa: "آینه", image: "../../../media/a2/house/mirror.png" },
      { fr: "étagère", fa: "قفسه", image: "../../../media/a2/house/shelf.png" }
    ]
  },
  "a2-lesson7": {
    title: "Leçon 7: Meubles de la maison 2",
    nextPage: "lesson7.html",
    words: [
      { fr: "rideau", fa: "پرده", image: "../../../media/a2/house/curtain.png" },
      { fr: "tapis", fa: "فرش", image: "../../../media/a2/house/carpet.png" },
      { fr: "oreiller", fa: "بالش", image: "../../../media/a2/house/pillow.png" },
      { fr: "couverture", fa: "پتو", image: "../../../media/a2/house/blanket.png" },
      { fr: "lampe", fa: "چراغ", image: "../../../media/a2/house/lamp.png" }
    ]
  },
  "a2-lesson8": {
    title: "Leçon 8: Pièces de la maison",
    nextPage: "lesson8.html",
    words: [
      { fr: "balcon", fa: "بالکن", image: "../../../media/a2/house/balcony.png" },
      { fr: "garage", fa: "گاراژ", image: "../../../media/a2/house/garage.png" },
      { fr: "sous-sol", fa: "زیرزمین", image: "../../../media/a2/house/basement.png" },
      { fr: "grenier", fa: "اتاق زیرشیروانی", image: "../../../media/a2/house/attic.png" },
      { fr: "jardin", fa: "حیاط", image: "../../../media/a2/house/yard.png" }
    ]
  },
  "a2-lesson9": {
    title: "Leçon 9: Ustensiles de cuisine",
    nextPage: "lesson9.html",
    words: [
      { fr: "bouilloire", fa: "کتری", image: "../../../media/a2/house/kettle.png" },
      { fr: "grille-pain", fa: "توستر", image: "../../../media/a2/house/toaster.png" },
      { fr: "mixeur", fa: "مخلوط‌کن", image: "../../../media/a2/house/blender.png" },
      { fr: "micro-ondes", fa: "مایکروویو", image: "../../../media/a2/house/microwave.png" },
      { fr: "lave-vaisselle", fa: "ماشین ظرفشویی", image: "../../../media/a2/house/dishwasher.png" }
    ]
  },
  "a2-lesson10": {
    title: "Leçon 10: Appareils électriques",
    nextPage: "lesson10.html",
    words: [
      { fr: "radiateur", fa: "بخاری", image: "../../../media/a2/house/heater.png" },
      { fr: "ventilateur", fa: "پنکه", image: "../../../media/a2/house/fan.png" },
      { fr: "fer à repasser", fa: "اتو", image: "../../../media/a2/house/iron.png" },
      { fr: "aspirateur", fa: "جاروبرقی", image: "../../../media/a2/house/vacuum.png" },
      { fr: "balai", fa: "جارو", image: "../../../media/a2/house/broom.png" }
    ]
  },

  // ===== Catégorie 3: Ville et lieux (leçon 11-15) =====
  "a2-lesson11": {
    title: "Leçon 11: Lieux de la ville",
    nextPage: "lesson11.html",
    words: [
      { fr: "banque", fa: "بانک", image: "../../../media/a2/city/bank.png" },
      { fr: "bibliothèque", fa: "کتابخانه", image: "../../../media/a2/city/library.png" },
      { fr: "cinéma", fa: "سینما", image: "../../../media/a2/city/cinema.png" },
      { fr: "musée", fa: "موزه", image: "../../../media/a2/city/museum.png" },
      { fr: "restaurant", fa: "رستوران", image: "../../../media/a2/city/restaurant.png" }
    ]
  },
  "a2-lesson12": {
    title: "Leçon 12: Lieux de la ville 2",
    nextPage: "lesson12.html",
    words: [
      { fr: "hôtel", fa: "هتل", image: "../../../media/a2/city/hotel.png" },
      { fr: "café", fa: "کافه", image: "../../../media/a2/city/cafe.png" },
      { fr: "boulangerie", fa: "نانوایی", image: "../../../media/a2/city/bakery.png" },
      { fr: "pharmacie", fa: "داروخانه", image: "../../../media/a2/city/pharmacy.png" },
      { fr: "boucherie", fa: "قصابی", image: "../../../media/a2/city/butchery.png" }
    ]
  },
  "a2-lesson13": {
    title: "Leçon 13: Bâtiments et structures",
    nextPage: "lesson13.html",
    words: [
      { fr: "pont", fa: "پل", image: "../../../media/a2/city/bridge.png" },
      { fr: "place", fa: "میدان", image: "../../../media/a2/city/square.png" },
      { fr: "fontaine", fa: "آبنما", image: "../../../media/a2/city/fountain.png" },
      { fr: "tour", fa: "برج", image: "../../../media/a2/city/tower.png" },
      { fr: "château", fa: "قلعه", image: "../../../media/a2/city/castle.png" }
    ]
  },
  "a2-lesson14": {
    title: "Leçon 14: Lieux de culte",
    nextPage: "lesson14.html",
    words: [
      { fr: "temple", fa: "معبد", image: "../../../media/a2/city/temple.png" },
      { fr: "église", fa: "کلیسا", image: "../../../media/a2/city/church.png" },
      { fr: "synagogue", fa: "کنیسه", image: "../../../media/a2/city/synagogue.png" },
      { fr: "mosquée", fa: "مسجد", image: "../../../media/a2/city/mosque.png" },
      { fr: "sanctuaire", fa: "زیارتگاه", image: "../../../media/a2/city/shrine.png" }
    ]
  },
  "a2-lesson15": {
    title: "Leçon 15: Lieux administratifs",
    nextPage: "lesson15.html",
    words: [
      { fr: "ambassade", fa: "سفارت", image: "../../../media/a2/city/embassy.png" },
      { fr: "tribunal", fa: "دادگاه", image: "../../../media/a2/city/court.png" },
      { fr: "prison", fa: "زندان", image: "../../../media/a2/city/jail.png" },
      { fr: "usine", fa: "کارخانه", image: "../../../media/a2/city/factory.png" },
      { fr: "entrepôt", fa: "انبار", image: "../../../media/a2/city/warehouse.png" }
    ]
  },

  // ===== Catégorie 4: Métiers (leçon 16-20) =====
  "a2-lesson16": {
    title: "Leçon 16: Métiers 1",
    nextPage: "lesson16.html",
    words: [
      { fr: "pilote", fa: "خلبان", image: "../../../media/a2/jobs/pilot.png" },
      { fr: "infirmier / infirmière", fa: "پرستار", image: "../../../media/a2/jobs/nurse.png" },
      { fr: "avocat", fa: "وکیل", image: "../../../media/a2/jobs/lawyer.png" },
      { fr: "artiste", fa: "هنرمند", image: "../../../media/a2/jobs/artist.png" },
      { fr: "chef cuisinier", fa: "آشپز", image: "../../../media/a2/jobs/chef.png" }
    ]
  },
  "a2-lesson17": {
    title: "Leçon 17: Métiers 2",
    nextPage: "lesson17.html",
    words: [
      { fr: "serveur", fa: "پیشخدمت", image: "../../../media/a2/jobs/waiter.png" },
      { fr: "serveuse", fa: "پیشخدمت (زن)", image: "../../../media/a2/jobs/waitress.png" },
      { fr: "coiffeur", fa: "آرایشگر", image: "../../../media/a2/jobs/barber.png" },
      { fr: "tailleur", fa: "خیاط", image: "../../../media/a2/jobs/tailor.png" },
      { fr: "boucher", fa: "قصاب", image: "../../../media/a2/jobs/butcher.png" }
    ]
  },
  "a2-lesson18": {
    title: "Leçon 18: Métiers 3",
    nextPage: "lesson18.html",
    words: [
      { fr: "mécanicien", fa: "مکانیک", image: "../../../media/a2/jobs/mechanic.png" },
      { fr: "plombier", fa: "لوله‌کش", image: "../../../media/a2/jobs/plumber.png" },
      { fr: "électricien", fa: "برق‌کار", image: "../../../media/a2/jobs/electrician.png" },
      { fr: "charpentier", fa: "نجار", image: "../../../media/a2/jobs/carpenter.png" },
      { fr: "maçon", fa: "بنا", image: "../../../media/a2/jobs/mason.png" }
    ]
  },
  "a2-lesson19": {
    title: "Leçon 19: Métiers 4",
    nextPage: "lesson19.html",
    words: [
      { fr: "scientifique", fa: "دانشمند", image: "../../../media/a2/jobs/scientist.png" },
      { fr: "professeur", fa: "استاد", image: "../../../media/a2/jobs/professor.png" },
      { fr: "auteur", fa: "نویسنده", image: "../../../media/a2/jobs/author.png" },
      { fr: "poète", fa: "شاعر", image: "../../../media/a2/jobs/poet.png" },
      { fr: "musicien", fa: "نوازنده", image: "../../../media/a2/jobs/musician.png" }
    ]
  },
  "a2-lesson20": {
    title: "Leçon 20: Métiers 5",
    nextPage: "lesson20.html",
    words: [
      { fr: "acteur", fa: "بازیگر", image: "../../../media/a2/jobs/actor.png" },
      { fr: "actrice", fa: "بازیگر (زن)", image: "../../../media/a2/jobs/actress.png" },
      { fr: "réalisateur", fa: "کارگردان", image: "../../../media/a2/jobs/director.png" },
      { fr: "producteur", fa: "تهیه‌کننده", image: "../../../media/a2/jobs/producer.png" },
      { fr: "rédacteur", fa: "ویراستار", image: "../../../media/a2/jobs/editor.png" }
    ]
  },

  // ===== Catégorie 5: Nourriture et boissons (leçon 21-25) =====
  "a2-lesson21": {
    title: "Leçon 21: Boissons",
    nextPage: "lesson21.html",
    words: [
      { fr: "jus", fa: "آبمیوه", image: "../../../media/a2/food/juice.png" },
      { fr: "café", fa: "قهوه", image: "../../../media/a2/food/coffee.png" },
      { fr: "thé", fa: "چای", image: "../../../media/a2/food/tea.png" },
      { fr: "soupe", fa: "سوپ", image: "../../../media/a2/food/soup.png" },
      { fr: "gâteau", fa: "کیک", image: "../../../media/a2/food/cake.png" }
    ]
  },
  "a2-lesson22": {
    title: "Leçon 22: Plats courants",
    nextPage: "lesson22.html",
    words: [
      { fr: "pizza", fa: "پیتزا", image: "../../../media/a2/food/pizza.png" },
      { fr: "pâtes", fa: "پاستا", image: "../../../media/a2/food/pasta.png" },
      { fr: "salade", fa: "سالاد", image: "../../../media/a2/food/salad.png" },
      { fr: "sandwich", fa: "ساندویچ", image: "../../../media/a2/food/sandwich.png" },
      { fr: "burger", fa: "برگر", image: "../../../media/a2/food/burger.png" }
    ]
  },
  "a2-lesson23": {
    title: "Leçon 23: Fruits de mer",
    nextPage: "lesson23.html",
    words: [
      { fr: "steak", fa: "استیک", image: "../../../media/a2/food/steak.png" },
      { fr: "crevette", fa: "میگو", image: "../../../media/a2/food/shrimp.png" },
      { fr: "homard", fa: "خرچنگ دریایی", image: "../../../media/a2/food/lobster.png" },
      { fr: "huître", fa: "صدف", image: "../../../media/a2/food/oyster.png" },
      { fr: "crabe", fa: "خرچنگ", image: "../../../media/a2/food/crab.png" }
    ]
  },
  "a2-lesson24": {
    title: "Leçon 24: Produits laitiers",
    nextPage: "lesson24.html",
    words: [
      { fr: "beurre", fa: "کره", image: "../../../media/a2/food/butter.png" },
      { fr: "fromage", fa: "پنیر", image: "../../../media/a2/food/cheese.png" },
      { fr: "crème", fa: "خامه", image: "../../../media/a2/food/cream.png" },
      { fr: "yaourt", fa: "ماست", image: "../../../media/a2/food/yogurt.png" },
      { fr: "glace", fa: "بستنی", image: "../../../media/a2/food/icecream.png" }
    ]
  },
  "a2-lesson25": {
    title: "Leçon 25: Petit-déjeuner",
    nextPage: "lesson25.html",
    words: [
      { fr: "toast", fa: "نان تست", image: "../../../media/a2/food/toast.png" },
      { fr: "céréales", fa: "غلات صبحانه", image: "../../../media/a2/food/cereal.png" },
      { fr: "flocons d'avoine", fa: "بلغور جو", image: "../../../media/a2/food/oatmeal.png" },
      { fr: "confiture", fa: "مربا", image: "../../../media/a2/food/jam.png" },
      { fr: "miel", fa: "عسل", image: "../../../media/a2/food/honey.png" }
    ]
  },

  // ===== Catégorie 6: Vêtements et accessoires (leçon 26-30) =====
  "a2-lesson26": {
    title: "Leçon 26: Accessoires",
    nextPage: "lesson26.html",
    words: [
      { fr: "ceinture", fa: "کمربند", image: "../../../media/a2/clothes/belt.png" },
      { fr: "écharpe", fa: "شال", image: "../../../media/a2/clothes/scarf.png" },
      { fr: "gants", fa: "دستکش", image: "../../../media/a2/clothes/gloves.png" },
      { fr: "montre", fa: "ساعت مچی", image: "../../../media/a2/clothes/watch.png" },
      { fr: "collier", fa: "گردنبند", image: "../../../media/a2/clothes/necklace.png" }
    ]
  },
  "a2-lesson27": {
    title: "Leçon 27: Bijoux",
    nextPage: "lesson27.html",
    words: [
      { fr: "bracelet", fa: "دستبند", image: "../../../media/a2/clothes/bracelet.png" },
      { fr: "boucle d'oreille", fa: "گوشواره", image: "../../../media/a2/clothes/earring.png" },
      { fr: "bague", fa: "حلقه", image: "../../../media/a2/clothes/ring.png" },
      { fr: "chaîne", fa: "زنجیر", image: "../../../media/a2/clothes/chain.png" },
      { fr: "couronne", fa: "تاج", image: "../../../media/a2/clothes/crown.png" }
    ]
  },
  "a2-lesson28": {
    title: "Leçon 28: Vêtements chauds",
    nextPage: "lesson28.html",
    words: [
      { fr: "jean", fa: "شلوار جین", image: "../../../media/a2/clothes/jeans.png" },
      { fr: "veste", fa: "ژاکت", image: "../../../media/a2/clothes/jacket.png" },
      { fr: "manteau", fa: "کت", image: "../../../media/a2/clothes/coat.png" },
      { fr: "gilet", fa: "جلیقه", image: "../../../media/a2/clothes/vest.png" },
      { fr: "pull-over", fa: "پلیور", image: "../../../media/a2/clothes/sweater.png" }
    ]
  },
  "a2-lesson29": {
    title: "Leçon 29: Vêtements d'été",
    nextPage: "lesson29.html",
    words: [
      { fr: "short", fa: "شورت", image: "../../../media/a2/clothes/shorts.png" },
      { fr: "jupe", fa: "دامن", image: "../../../media/a2/clothes/skirt.png" },
      { fr: "chaussettes", fa: "جوراب", image: "../../../media/a2/clothes/socks.png" },
      { fr: "sous-vêtements", fa: "لباس زیر", image: "../../../media/a2/clothes/underwear.png" },
      { fr: "pyjama", fa: "پیژامه", image: "../../../media/a2/clothes/pajama.png" }
    ]
  },
  "a2-lesson30": {
    title: "Leçon 30: Objets personnels",
    nextPage: "lesson30.html",
    words: [
      { fr: "parapluie", fa: "چتر", image: "../../../media/a2/clothes/umbrella.png" },
      { fr: "sac", fa: "کیف", image: "../../../media/a2/clothes/bag.png" },
      { fr: "sac à dos", fa: "کوله پشتی", image: "../../../media/a2/clothes/backpack.png" },
      { fr: "portefeuille", fa: "کیف پول", image: "../../../media/a2/clothes/wallet.png" },
      { fr: "sac à main", fa: "کیف دستی", image: "../../../media/a2/clothes/purse.png" }
    ]
  },
  // ===== Catégorie 7: Moyens de transport (leçon 31-35) =====
  "a2-lesson31": {
    title: "Leçon 31: Moyens de transport 1",
    nextPage: "lesson31.html",
    words: [
      { fr: "taxi", fa: "تاکسی", image: "../../../media/a2/vehicles/taxi.png" },
      { fr: "bateau", fa: "قایق", image: "../../../media/a2/vehicles/boat.png" },
      { fr: "moto", fa: "موتورسیکلت", image: "../../../media/a2/vehicles/motorcycle.png" },
      { fr: "hélicoptère", fa: "بالگرد", image: "../../../media/a2/vehicles/helicopter.png" },
      { fr: "camion", fa: "کامیون", image: "../../../media/a2/vehicles/truck.png" }
    ]
  },
  "a2-lesson32": {
    title: "Leçon 32: Moyens de transport 2",
    nextPage: "lesson32.html",
    words: [
      { fr: "fourgonnette", fa: "ون", image: "../../../media/a2/vehicles/van.png" },
      { fr: "jeep", fa: "جیپ", image: "../../../media/a2/vehicles/jeep.png" },
      { fr: "limousine", fa: "لیموزین", image: "../../../media/a2/vehicles/limousine.png" },
      { fr: "ambulance", fa: "آمبولانس", image: "../../../media/a2/vehicles/ambulance.png" },
      { fr: "camion de pompiers", fa: "آتش‌نشانی", image: "../../../media/a2/vehicles/firetruck.png" }
    ]
  },
  "a2-lesson33": {
    title: "Leçon 33: Moyens de transport maritimes",
    nextPage: "lesson33.html",
    words: [
      { fr: "sous-marin", fa: "زیردریایی", image: "../../../media/a2/vehicles/submarine.png" },
      { fr: "ferry", fa: "کشتی", image: "../../../media/a2/vehicles/ferry.png" },
      { fr: "yacht", fa: "قایق تفریحی", image: "../../../media/a2/vehicles/yacht.png" },
      { fr: "canoë", fa: "کانو", image: "../../../media/a2/vehicles/canoe.png" },
      { fr: "radeau", fa: "قایق بادی", image: "../../../media/a2/vehicles/raft.png" }
    ]
  },
  "a2-lesson34": {
    title: "Leçon 34: Moyens de transport modernes",
    nextPage: "lesson34.html",
    words: [
      { fr: "trottinette", fa: "اسکوتر", image: "../../../media/a2/vehicles/scooter.png" },
      { fr: "planche à roulettes", fa: "اسکیت‌برد", image: "../../../media/a2/vehicles/skateboard.png" },
      { fr: "patins à roulettes", fa: "اسکیت خطی", image: "../../../media/a2/vehicles/rollerblade.png" },
      { fr: "hoverboard", fa: "هووربرد", image: "../../../media/a2/vehicles/hoverboard.png" },
      { fr: "monocycle", fa: "دوچرخه یک چرخ", image: "../../../media/a2/vehicles/unicycle.png" }
    ]
  },
  "a2-lesson35": {
    title: "Leçon 35: Moyens de transport traditionnels",
    nextPage: "lesson35.html",
    words: [
      { fr: "calèche", fa: "درشکه", image: "../../../media/a2/vehicles/carriage.png" },
      { fr: "wagon", fa: "واگن", image: "../../../media/a2/vehicles/wagon.png" },
      { fr: "traîneau", fa: "سورتمه", image: "../../../media/a2/vehicles/sleigh.png" },
      { fr: "pousse-pousse", fa: "ریکشا", image: "../../../media/a2/vehicles/rickshaw.png" },
      { fr: "tramway", fa: "تراموا", image: "../../../media/a2/vehicles/tram.png" }
    ]
  },

  // ===== Catégorie 8: Nature et météo (leçon 36-40) =====
  "a2-lesson36": {
    title: "Leçon 36: La nature",
    nextPage: "lesson36.html",
    words: [
      { fr: "rivière", fa: "رودخانه", image: "../../../media/a2/nature/river.png" },
      { fr: "forêt", fa: "جنگل", image: "../../../media/a2/nature/forest.png" },
      { fr: "désert", fa: "بیابان", image: "../../../media/a2/nature/desert.png" },
      { fr: "île", fa: "جزیره", image: "../../../media/a2/nature/island.png" },
      { fr: "tempête", fa: "طوفان", image: "../../../media/a2/nature/storm.png" }
    ]
  },
  "a2-lesson37": {
    title: "Leçon 37: Phénomènes naturels",
    nextPage: "lesson37.html",
    words: [
      { fr: "cascade", fa: "آبشار", image: "../../../media/a2/nature/waterfall.png" },
      { fr: "volcan", fa: "آتشفشان", image: "../../../media/a2/nature/volcano.png" },
      { fr: "glacier", fa: "یخچال طبیعی", image: "../../../media/a2/nature/glacier.png" },
      { fr: "canyon", fa: "دره", image: "../../../media/a2/nature/canyon.png" },
      { fr: "grotte", fa: "غار", image: "../../../media/a2/nature/cave.png" }
    ]
  },
  "a2-lesson38": {
    title: "Leçon 38: Plage et mer",
    nextPage: "lesson38.html",
    words: [
      { fr: "plage", fa: "ساحل", image: "../../../media/a2/nature/beach.png" },
      { fr: "côte", fa: "خط ساحلی", image: "../../../media/a2/nature/coast.png" },
      { fr: "vague", fa: "موج", image: "../../../media/a2/nature/wave.png" },
      { fr: "marée", fa: "جزر و مد", image: "../../../media/a2/nature/tide.png" },
      { fr: "falaise", fa: "صخره", image: "../../../media/a2/nature/cliff.png" }
    ]
  },
  "a2-lesson39": {
    title: "Leçon 39: La météo",
    nextPage: "lesson39.html",
    words: [
      { fr: "brouillard", fa: "مه", image: "../../../media/a2/nature/fog.png" },
      { fr: "grêle", fa: "تگرگ", image: "../../../media/a2/nature/hail.png" },
      { fr: "flocon de neige", fa: "دانه برف", image: "../../../media/a2/nature/snowflake.png" },
      { fr: "éclair", fa: "صاعقه", image: "../../../media/a2/nature/lightning.png" },
      { fr: "tonnerre", fa: "رعد", image: "../../../media/a2/nature/thunder.png" }
    ]
  },
  "a2-lesson40": {
    title: "Leçon 40: Phénomènes atmosphériques",
    nextPage: "lesson40.html",
    words: [
      { fr: "arc-en-ciel", fa: "رنگین‌کمان", image: "../../../media/a2/nature/rainbow.png" },
      { fr: "brise", fa: "نسیم", image: "../../../media/a2/nature/breeze.png" },
      { fr: "inondation", fa: "سیل", image: "../../../media/a2/nature/flood.png" },
      { fr: "sécheresse", fa: "خشکسالی", image: "../../../media/a2/nature/drought.png" },
      { fr: "tremblement de terre", fa: "زلزله", image: "../../../media/a2/nature/earthquake.png" }
    ]
  },

  // ===== Catégorie 9: Santé et corps (leçon 41-45) =====
  "a2-lesson41": {
    title: "Leçon 41: Le corps humain",
    nextPage: "lesson41.html",
    words: [
      { fr: "cœur", fa: "قلب", image: "../../../media/a2/health/heart.png" },
      { fr: "os", fa: "استخوان", image: "../../../media/a2/health/bone.png" },
      { fr: "muscle", fa: "عضله", image: "../../../media/a2/health/muscle.png" },
      { fr: "peau", fa: "پوست", image: "../../../media/a2/health/skin.png" },
      { fr: "sang", fa: "خون", image: "../../../media/a2/health/blood.png" }
    ]
  },
  "a2-lesson42": {
    title: "Leçon 42: Systèmes du corps",
    nextPage: "lesson42.html",
    words: [
      { fr: "cerveau", fa: "مغز", image: "../../../media/a2/health/brain.png" },
      { fr: "nerf", fa: "عصب", image: "../../../media/a2/health/nerve.png" },
      { fr: "veine", fa: "ورید", image: "../../../media/a2/health/vein.png" },
      { fr: "artère", fa: "سرخرگ", image: "../../../media/a2/health/artery.png" },
      { fr: "articulation", fa: "مفصل", image: "../../../media/a2/health/joint.png" }
    ]
  },
  "a2-lesson43": {
    title: "Leçon 43: Maladies",
    nextPage: "lesson43.html",
    words: [
      { fr: "toux", fa: "سرفه", image: "../../../media/a2/health/cough.png" },
      { fr: "fièvre", fa: "تب", image: "../../../media/a2/health/fever.png" },
      { fr: "aspirine", fa: "آسپرین", image: "../../../media/a2/health/aspirin.png" },
      { fr: "médicament", fa: "دارو", image: "../../../media/a2/health/medicine.png" },
      { fr: "injection", fa: "آمپول", image: "../../../media/a2/health/injection.png" }
    ]
  },
  "a2-lesson44": {
    title: "Leçon 44: Blessures et traitements",
    nextPage: "lesson44.html",
    words: [
      { fr: "allergie", fa: "حساسیت", image: "../../../media/a2/health/allergy.png" },
      { fr: "infection", fa: "عفونت", image: "../../../media/a2/health/infection.png" },
      { fr: "blessure", fa: "آسیب", image: "../../../media/a2/health/injury.png" },
      { fr: "plaie", fa: "زخم", image: "../../../media/a2/health/wound.png" },
      { fr: "cicatrice", fa: "جای زخم", image: "../../../media/a2/health/scar.png" }
    ]
  },
  "a2-lesson45": {
    title: "Leçon 45: Traitement et hôpital",
    nextPage: "lesson45.html",
    words: [
      { fr: "chirurgie", fa: "جراحی", image: "../../../media/a2/health/surgery.png" },
      { fr: "brancard", fa: "برانکارد", image: "../../../media/a2/health/stretcher.png" },
      { fr: "fauteuil roulant", fa: "صندلی چرخدار", image: "../../../media/a2/health/wheelchair.png" },
      { fr: "plâtre", fa: "گچ", image: "../../../media/a2/health/cast.png" },
      { fr: "bandage", fa: "بانداژ", image: "../../../media/a2/health/bandage.png" }
    ]
  },

  // ===== Catégorie 10: Éducation et école (leçon 46-50) =====
  "a2-lesson46": {
    title: "Leçon 46: Fournitures scolaires",
    nextPage: "lesson46.html",
    words: [
      { fr: "cahier", fa: "دفتر", image: "../../../media/a2/school/notebook.png" },
      { fr: "crayon", fa: "مداد", image: "../../../media/a2/school/pencil.png" },
      { fr: "règle", fa: "خط‌کش", image: "../../../media/a2/school/ruler.png" },
      { fr: "gomme", fa: "پاک‌کن", image: "../../../media/a2/school/eraser.png" },
      { fr: "calculatrice", fa: "ماشین حساب", image: "../../../media/a2/school/calculator.png" }
    ]
  },
  "a2-lesson47": {
    title: "Leçon 47: Livres et étude",
    nextPage: "lesson47.html",
    words: [
      { fr: "dictionnaire", fa: "فرهنگ لغت", image: "../../../media/a2/school/dictionary.png" },
      { fr: "encyclopédie", fa: "دایره‌المعارف", image: "../../../media/a2/school/encyclopedia.png" },
      { fr: "atlas", fa: "اطلس", image: "../../../media/a2/school/atlas.png" },
      { fr: "boussole", fa: "قطب‌نما", image: "../../../media/a2/school/compass.png" },
      { fr: "rapporteur", fa: "نقاله", image: "../../../media/a2/school/protractor.png" }
    ]
  },
  "a2-lesson48": {
    title: "Leçon 48: Université",
    nextPage: "lesson48.html",
    words: [
      { fr: "université", fa: "دانشگاه", image: "../../../media/a2/school/university.png" },
      { fr: "faculté", fa: "کالج", image: "../../../media/a2/school/college.png" },
      { fr: "campus", fa: "محوطه دانشگاه", image: "../../../media/a2/school/campus.png" },
      { fr: "dortoir", fa: "خوابگاه", image: "../../../media/a2/school/dormitory.png" },
      { fr: "laboratoire", fa: "آزمایشگاه", image: "../../../media/a2/school/laboratory.png" }
    ]
  },
  "a2-lesson49": {
    title: "Leçon 49: Études",
    nextPage: "lesson49.html",
    words: [
      { fr: "note", fa: "نمره", image: "../../../media/a2/school/grade.png" },
      { fr: "examen", fa: "امتحان", image: "../../../media/a2/school/exam.png" },
      { fr: "leçon", fa: "درس", image: "../../../media/a2/school/lesson.png" },
      { fr: "matière", fa: "موضوع درسی", image: "../../../media/a2/school/subject.png" },
      { fr: "professeur", fa: "معلم", image: "../../../media/a2/school/teacher.png" }
    ]
  },
  "a2-lesson50": {
    title: "Leçon 50: Recherche et dissertation",
    nextPage: "lesson50.html",
    words: [
      { fr: "dissertation", fa: "مقاله", image: "../../../media/a2/school/essay.png" },
      { fr: "thèse", fa: "پایان‌نامه", image: "../../../media/a2/school/thesis.png" },
      { fr: "rapport", fa: "گزارش", image: "../../../media/a2/school/report.png" },
      { fr: "projet", fa: "پروژه", image: "../../../media/a2/school/project.png" },
      { fr: "atelier", fa: "کارگاه آموزشی", image: "../../../media/a2/school/workshop.png" }
    ]
  },

  // ===== Catégorie 11: Voyage et tourisme (leçon 51-55) =====
  "a2-lesson51": {
    title: "Leçon 51: Voyage",
    nextPage: "lesson51.html",
    words: [
      { fr: "passeport", fa: "گذرنامه", image: "../../../media/a2/travel/passport.png" },
      { fr: "hôtel", fa: "هتل", image: "../../../media/a2/travel/hotel.png" },
      { fr: "bagage", fa: "چمدان", image: "../../../media/a2/travel/luggage.png" },
      { fr: "vol", fa: "پرواز", image: "../../../media/a2/travel/flight.png" },
      { fr: "carte", fa: "نقشه", image: "../../../media/a2/travel/map.png" }
    ]
  },
  "a2-lesson52": {
    title: "Leçon 52: Équipement de voyage",
    nextPage: "lesson52.html",
    words: [
      { fr: "sac à dos", fa: "کوله پشتی", image: "../../../media/a2/travel/backpack.png" },
      { fr: "tente", fa: "چادر", image: "../../../media/a2/travel/tent.png" },
      { fr: "boussole", fa: "قطب‌نما", image: "../../../media/a2/travel/compass.png" },
      { fr: "jumelles", fa: "دوربین دوچشمی", image: "../../../media/a2/travel/binoculars.png" },
      { fr: "crème solaire", fa: "کرم ضدآفتاب", image: "../../../media/a2/travel/sunscreen.png" }
    ]
  },
  "a2-lesson53": {
    title: "Leçon 53: Tourisme",
    nextPage: "lesson53.html",
    words: [
      { fr: "guide", fa: "راهنما", image: "../../../media/a2/travel/guide.png" },
      { fr: "touriste", fa: "گردشگر", image: "../../../media/a2/travel/tourist.png" },
      { fr: "souvenir", fa: "سوغاتی", image: "../../../media/a2/travel/souvenir.png" },
      { fr: "aventure", fa: "ماجراجویی", image: "../../../media/a2/travel/adventure.png" },
      { fr: "voyage", fa: "سفر", image: "../../../media/a2/travel/journey.png" }
    ]
  },
  "a2-lesson54": {
    title: "Leçon 54: Port et aéroport",
    nextPage: "lesson54.html",
    words: [
      { fr: "port", fa: "بندر", image: "../../../media/a2/travel/harbor.png" },
      { fr: "quai", fa: "بندرگاه", image: "../../../media/a2/travel/port.png" },
      { fr: "terminal", fa: "ترمینال", image: "../../../media/a2/travel/terminal.png" },
      { fr: "porte", fa: "دروازه", image: "../../../media/a2/travel/gate.png" },
      { fr: "équipage", fa: "خدمه", image: "../../../media/a2/travel/crew.png" }
    ]
  },
  "a2-lesson55": {
    title: "Leçon 55: Documents de voyage",
    nextPage: "lesson55.html",
    words: [
      { fr: "visa", fa: "ویزا", image: "../../../media/a2/travel/visa.png" },
      { fr: "monnaie", fa: "واحد پول", image: "../../../media/a2/travel/currency.png" },
      { fr: "change", fa: "تبادل", image: "../../../media/a2/travel/exchange.png" },
      { fr: "départ", fa: "خروج", image: "../../../media/a2/travel/departure.png" },
      { fr: "arrivée", fa: "ورود", image: "../../../media/a2/travel/arrival.png" }
    ]
  },

  // ===== Catégorie 12: Technologie et informatique (leçon 56-60) =====
  "a2-lesson56": {
    title: "Leçon 56: Informatique",
    nextPage: "lesson56.html",
    words: [
      { fr: "ordinateur", fa: "کامپیوتر", image: "../../../media/a2/technology/computer.png" },
      { fr: "clavier", fa: "صفحه کلید", image: "../../../media/a2/technology/keyboard.png" },
      { fr: "souris", fa: "موشواره", image: "../../../media/a2/technology/mouse.png" },
      { fr: "internet", fa: "اینترنت", image: "../../../media/a2/technology/internet.png" },
      { fr: "courriel", fa: "ایمیل", image: "../../../media/a2/technology/email.png" }
    ]
  },
  "a2-lesson57": {
    title: "Leçon 57: Périphériques informatiques",
    nextPage: "lesson57.html",
    words: [
      { fr: "écran", fa: "صفحه نمایش", image: "../../../media/a2/technology/screen.png" },
      { fr: "moniteur", fa: "مانیتور", image: "../../../media/a2/technology/monitor.png" },
      { fr: "imprimante", fa: "چاپگر", image: "../../../media/a2/technology/printer.png" },
      { fr: "scanner", fa: "اسکنر", image: "../../../media/a2/technology/scanner.png" },
      { fr: "haut-parleur", fa: "بلندگو", image: "../../../media/a2/technology/speaker.png" }
    ]
  },
  "a2-lesson58": {
    title: "Leçon 58: Logiciels",
    nextPage: "lesson58.html",
    words: [
      { fr: "logiciel", fa: "نرم‌افزار", image: "../../../media/a2/technology/software.png" },
      { fr: "matériel", fa: "سخت‌افزار", image: "../../../media/a2/technology/hardware.png" },
      { fr: "mise à jour", fa: "به‌روزرسانی", image: "../../../media/a2/technology/update.png" },
      { fr: "mot de passe", fa: "رمز عبور", image: "../../../media/a2/technology/password.png" },
      { fr: "compte", fa: "حساب کاربری", image: "../../../media/a2/technology/account.png" }
    ]
  },
  "a2-lesson59": {
    title: "Leçon 59: Internet",
    nextPage: "lesson59.html",
    words: [
      { fr: "téléchargement", fa: "دانلود", image: "../../../media/a2/technology/download.png" },
      { fr: "téléversement", fa: "آپلود", image: "../../../media/a2/technology/upload.png" },
      { fr: "diffusion en direct", fa: "پخش زنده", image: "../../../media/a2/technology/stream.png" },
      { fr: "vidéo", fa: "ویدیو", image: "../../../media/a2/technology/video.png" },
      { fr: "audio", fa: "صوت", image: "../../../media/a2/technology/audio.png" }
    ]
  },
  "a2-lesson60": {
    title: "Leçon 60: Nouvelles technologies",
    nextPage: "lesson60.html",
    words: [
      { fr: "appareil", fa: "دستگاه", image: "../../../media/a2/technology/device.png" },
      { fr: "gadget", fa: "ابزار دیجیتال", image: "../../../media/a2/technology/gadget.png" },
      { fr: "robot", fa: "ربات", image: "../../../media/a2/technology/robot.png" },
      { fr: "drone", fa: "پهپاد", image: "../../../media/a2/technology/drone.png" },
      { fr: "montre connectée", fa: "ساعت هوشمند", image: "../../../media/a2/technology/smartwatch.png" }
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

