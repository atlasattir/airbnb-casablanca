/*
 * Darna Collection — Marrakech, for Darna Marrakech (Daoudiate).
 *
 * Same structure as content/cities/casablanca.js (see the notes at the top of
 * that file for every field). Starter guide: few places, each one confirmed by
 * a web search in 2026-10; the source is in a comment above each item.
 *
 * Prices and opening hours change: check each place before publishing,
 * then update the "checked" date. No exact pin for the house is known yet,
 * so nothing here claims a walking time from the door.
 */
window.CASA = window.CASA || {};
CASA.cities = CASA.cities || {};

CASA.cities.marrakech = {
  checked: '2026-10',
  name: { fr: 'Marrakech', en: 'Marrakech', ar: 'مراكش', es: 'Marrakech' },
  // Used by the airport-transfer service: "Un chauffeur depuis {airport}"
  airport: { fr: 'l’aéroport Marrakech-Ménara', en: 'Marrakech Menara Airport', ar: 'مطار مراكش المنارة', es: 'el aeropuerto Marrakech-Menara' },
  // film: 'brand' plays the Morocco film of content/brand.js; null shows the drawing (scene) only.
  film: 'brand',
  scene: 'plain',

  /* Daoudiate: a residential quarter of the Guéliz arrondissement, on the
     Semlalia side (Cadi Ayyad university area).
     source: https://www.mubawab.ma/fr/is/appartement-location_marrakech_daoudiat_pas-cher
     source: https://www.routard.com/fr/guide/afrique/maroc/marrakech/semlalia
     No sight, restaurant or café below is confirmed within ~15 minutes on foot,
     so the list stays empty until the house's pin is known. */
  areas: { daoudiate: { near: [] } },

  group: {
    title: { fr: 'Que souhaitez-vous faire aujourd’hui ?', en: 'What would you like to do today?', ar: 'ماذا تودّ أن تفعل اليوم؟', es: '¿Qué te apetece hacer hoy?' },
    items: ['visit', 'restaurants', 'cafes', 'souks', 'experiences', 'family', 'transport', 'itineraries'],
    wide: ['visit', 'itineraries']
  },

  sections: {

    /* ------------------------------------------------------------------ */
    visit: {
      icon: 'arch', tint: '#876A41',
      type: 'places',
      title: { fr: 'À visiter', en: 'Places to visit', ar: 'أماكن للزيارة', es: 'Qué visitar' },
      intro: {
        fr: 'Sept lieux pour une première fois à Marrakech, de la médina aux jardins.',
        en: 'Seven places for a first time in Marrakech, from the medina to the gardens.',
        ar: 'سبعة أماكن لزيارتك الأولى لمراكش، من المدينة العتيقة إلى الحدائق.',
        es: 'Siete lugares para una primera vez en Marrakech, de la medina a los jardines.'
      },
      items: [
        // source: https://www.nomadotravel.app/en/places/jemaa-el-fna
        // source: https://www.bergadventures.com/v3_main/destination-info/marrakesh.php
        // source: https://www.avygeo.com/en/guide/africa/morocco/2119-marrakech
        // UNESCO Masterpiece of the Oral and Intangible Heritage of Humanity, 2001.
        {
          id: 'jemaa',
          icon: 'lantern',
          short: { fr: 'Le cœur de la médina, magique le soir', en: 'The heart of the medina, magical at night', ar: 'قلب المدينة العتيقة، ساحر ليلاً', es: 'El corazón de la medina, mágico de noche' },
          name: { fr: 'Place Jemaa el‑Fna', en: 'Jemaa el-Fna Square', ar: 'ساحة جامع الفنا', es: 'Plaza Jemaa el-Fna' },
          area: { fr: 'Médina', en: 'Medina', ar: 'المدينة العتيقة', es: 'Medina' },
          desc: {
            fr: 'La grande place de la médina, reconnue par l’UNESCO en 2001 pour son patrimoine oral et immatériel. Le soir, les stands de cuisine s’installent et la place s’anime.',
            en: 'The medina’s great square, recognised by UNESCO in 2001 for its oral and intangible heritage. In the evening the food stalls set up and the square comes alive.',
            ar: 'الساحة الكبرى للمدينة العتيقة، اعترفت بها اليونسكو سنة 2001 لتراثها الشفهي واللامادي. في المساء تُنصب أكشاك الطعام وتدبّ الحياة في الساحة.',
            es: 'La gran plaza de la medina, reconocida por la UNESCO en 2001 por su patrimonio oral e inmaterial. Al caer la tarde se montan los puestos de comida y la plaza cobra vida.'
          },
          tip: {
            fr: 'Arrivez au coucher du soleil, quand les stands s’installent et que le minaret de la Koutoubia se voit encore.',
            en: 'Come at sunset, while the stalls are setting up and the Koutoubia minaret is still in view.',
            ar: 'تعال وقت الغروب، حين تُنصب الأكشاك وما تزال صومعة الكتبية ظاهرة.',
            es: 'Ven al atardecer, cuando se montan los puestos y aún se ve el minarete de la Koutoubia.'
          },
          duration: 90, price: 0, sunset: true,
          maps: 'Place Jemaa el-Fna, Marrakech'
        },
        // source: https://www.nomadotravel.app/en/places/jemaa-el-fna
        // source: https://www.nomadotravel.app/it/places/jemaa-el-fna
        // Non-Muslims: outside only; the Lalla Hasna gardens next to it are open to all.
        // The sources disagree on the minaret's height, so it is not given.
        {
          id: 'koutoubia',
          icon: 'minaret',
          short: { fr: 'Minaret du XIIe siècle et jardins', en: '12th-century minaret and gardens', ar: 'صومعة من القرن الثاني عشر وحدائق', es: 'Minarete del siglo XII y jardines' },
          name: { fr: 'Mosquée Koutoubia', en: 'Koutoubia Mosque', ar: 'مسجد الكتبية', es: 'Mezquita Koutoubia' },
          area: { fr: 'Médina', en: 'Medina', ar: 'المدينة العتيقة', es: 'Medina' },
          desc: {
            fr: 'Le minaret almohade du XIIe siècle, repère de toute la ville, à deux pas de Jemaa el-Fna. La mosquée est réservée aux musulmans, mais l’extérieur et les jardins voisins sont ouverts à tous.',
            en: 'The 12th-century Almohad minaret, the landmark of the whole city, a short walk from Jemaa el-Fna. The mosque is for Muslims only, but the outside and the nearby gardens are open to all.',
            ar: 'صومعة موحّدية من القرن الثاني عشر، معلَم المدينة كلها، على بُعد خطوات من جامع الفنا. المسجد مخصّص للمسلمين، أما محيطه والحدائق المجاورة فمفتوحة للجميع.',
            es: 'El minarete almohade del siglo XII, referencia de toda la ciudad, a dos pasos de Jemaa el-Fna. La mezquita es solo para musulmanes, pero el exterior y los jardines cercanos están abiertos a todos.'
          },
          tip: {
            fr: 'Les jardins Lalla Hasna, à côté, sont un coin calme où les familles se promènent le soir.',
            en: 'The Lalla Hasna gardens next door are a quiet spot where families stroll in the evening.',
            ar: 'حدائق للا حسناء المجاورة ركن هادئ تتنزّه فيه العائلات مساءً.',
            es: 'Los jardines Lalla Hasna, al lado, son un rincón tranquilo donde pasean las familias por la tarde.'
          },
          duration: 30, price: 0,
          maps: 'Mosquée Koutoubia, Marrakech'
        },
        // source: https://www.medersabenyoussef.ma/en/
        // source: https://fr.le360.ma/societe/marrakech-la-reouverture-hative-de-la-medersa-ben-youssef-258905/
        // source: https://h24info.ma/?p=576564
        // source: https://www.routard.com/fr/guide/afrique/maroc/marrakech/medina/medersa-ben-youssef
        // source: https://guias-viajar.com/fr/Afrique/tourisme-au-maroc/marrakech-madrassa-ben-youssef/
        // Official site: daily 9:00–19:00, 50 MAD, 10 MAD under 12, tickets at the entrance only.
        // Routard (2026-10 review): 50 DH, tickets on site only, daily 9:00–19:00 (9:00–18:00 in Ramadan).
        // Length of the closure not confirmed: the text says "several years".
        {
          id: 'ben-youssef',
          icon: 'arch',
          short: { fr: 'Joyau architectural, rouvert en 2022', en: 'An architectural gem, reopened in 2022', ar: 'تحفة معمارية أُعيد فتحها سنة 2022', es: 'Joya arquitectónica, reabierta en 2022' },
          name: { fr: 'Médersa Ben Youssef', en: 'Ben Youssef Madrasa', ar: 'مدرسة ابن يوسف', es: 'Madrasa Ben Youssef' },
          area: { fr: 'Médina', en: 'Medina', ar: 'المدينة العتيقة', es: 'Medina' },
          desc: {
            fr: 'L’ancienne école coranique de la médina, un joyau architectural rouvert au public en 2022 après plusieurs années de restauration.',
            en: 'The medina’s former Koranic school, an architectural gem reopened to the public in 2022 after several years of restoration.',
            ar: 'المدرسة القرآنية القديمة في المدينة العتيقة، تحفة معمارية أُعيد فتحها للعموم سنة 2022 بعد سنوات من الترميم.',
            es: 'La antigua escuela coránica de la medina, una joya arquitectónica reabierta al público en 2022 tras varios años de restauración.'
          },
          tip: {
            fr: 'Ouverte tous les jours de 9 h à 19 h selon son site ; billets en vente à l’entrée (10 MAD pour les moins de 12 ans).',
            en: 'Open daily 9 am to 7 pm according to its website; tickets sold at the entrance (10 MAD for under-12s).',
            ar: 'مفتوحة يومياً من 9:00 إلى 19:00 حسب موقعها الإلكتروني، والتذاكر تُباع عند المدخل (10 دراهم لمن هم دون 12 سنة).',
            es: 'Abre a diario de 9:00 a 19:00 según su web; entradas en la puerta (10 MAD para menores de 12 años).'
          },
          duration: 60, price: 50,
          maps: 'Médersa Ben Youssef, Marrakech'
        },
        // source: https://medias24.com/2016/10/17/marrakech-le-jardin-secret-ouvre-ses-portes-apres-3-ans-de-travaux/
        // source: https://telquel.ma/2021/12/10/le-jardin-secret-un-riad-temoin-de-lhistoire-de-marrakech_1744354
        // source: https://www.headout.com/fr/jardin-secret/billet-dentree-au-jardin-secret-e-40087/
        // Rue Mouassine. Seasonal hours (shorter in winter and Ramadan); free under 12.
        {
          id: 'jardin-secret',
          icon: 'drop',
          short: { fr: 'Deux jardins et une tour panoramique', en: 'Two gardens and a viewing tower', ar: 'حديقتان وبرج بإطلالة بانورامية', es: 'Dos jardines y una torre mirador' },
          name: { fr: 'Le Jardin Secret', en: 'Le Jardin Secret', ar: 'الحديقة السرية', es: 'Le Jardin Secret' },
          area: { fr: 'Mouassine · Médina', en: 'Mouassine · Medina', ar: 'المواسين · المدينة العتيقة', es: 'Mouassine · Medina' },
          desc: {
            fr: 'Un ancien riad de la médina, ouvert au public en 2016 après trois ans de travaux : un jardin islamique autour de ses bassins, un jardin exotique et une tour avec vue sur la ville.',
            en: 'A former riad in the medina, opened to the public in 2016 after three years of work: an Islamic garden around its pools, an exotic garden and a tower with a view over the city.',
            ar: 'رياض قديم في المدينة العتيقة فُتح للعموم سنة 2016 بعد ثلاث سنوات من الأشغال: حديقة إسلامية حول أحواضه، وحديقة نباتات من مختلف القارات، وبرج يطلّ على المدينة.',
            es: 'Un antiguo riad de la medina, abierto al público en 2016 tras tres años de obras: un jardín islámico en torno a sus estanques, un jardín exótico y una torre con vistas a la ciudad.'
          },
          tip: {
            fr: 'Les horaires changent selon la saison et pendant le Ramadan ; entrée gratuite pour les moins de 12 ans.',
            en: 'Hours change with the season and during Ramadan; free entry for under-12s.',
            ar: 'تتغيّر المواعيد حسب الفصل وفي رمضان، والدخول مجاني لمن هم دون 12 سنة.',
            es: 'El horario cambia según la temporada y en Ramadán; entrada gratis para menores de 12 años.'
          },
          duration: 60,
          maps: 'Le Jardin Secret, Marrakech'
        },
        // source: https://www.nomadotravel.app/en/guides/marrakech-palaces-guide
        // source: https://www.redfedoradiary.com/?p=3203
        // Published prices disagree (70 to 100 MAD for foreign adults): no price given.
        {
          id: 'bahia',
          icon: 'gate',
          short: { fr: 'Cours, jardins et plafonds peints', en: 'Courtyards, gardens, painted ceilings', ar: 'أفنية وحدائق وسقوف مزخرفة', es: 'Patios, jardines y techos pintados' },
          name: { fr: 'Palais de la Bahia', en: 'Bahia Palace', ar: 'قصر الباهية', es: 'Palacio de la Bahía' },
          area: { fr: 'Médina', en: 'Medina', ar: 'المدينة العتيقة', es: 'Medina' },
          desc: {
            fr: 'Un palais de la fin du XIXe siècle, avec ses cours, ses jardins et ses salons décorés de zelliges et de plafonds en bois peint.',
            en: 'A late 19th-century palace, with courtyards, gardens and rooms decorated with zellige tiles and painted wooden ceilings.',
            ar: 'قصر من أواخر القرن التاسع عشر، بأفنيته وحدائقه وقاعاته المزيّنة بالزليج والسقوف الخشبية المزخرفة.',
            es: 'Un palacio de finales del siglo XIX, con patios, jardines y salones decorados con azulejos zellige y techos de madera pintada.'
          },
          tip: {
            fr: 'Les tarifs publiés varient selon les sources : vérifiez le prix sur place.',
            en: 'Published prices vary from one source to another: check the price at the gate.',
            ar: 'تختلف الأسعار المنشورة من مصدر لآخر، فتحقّق من الثمن عند المدخل.',
            es: 'Los precios publicados varían según la fuente: comprueba el precio en la entrada.'
          },
          duration: 60,
          maps: 'Palais de la Bahia, Marrakech'
        },
        // source: https://introducingmarrakech.com/saadian-tombs
        // source: https://www.naturallymorocco.co.uk/morocco-travel-blog/v/1236-holiday-attractions-in-morocco-saadian-tombs-and-el-badi-palace/
        {
          id: 'saadiens',
          icon: 'shrine',
          short: { fr: 'Mausolées de la dynastie saadienne', en: 'Mausoleums of the Saadian dynasty', ar: 'أضرحة الدولة السعدية', es: 'Mausoleos de la dinastía saadí' },
          name: { fr: 'Tombeaux saadiens', en: 'Saadian Tombs', ar: 'قبور السعديين', es: 'Tumbas saadíes' },
          area: { fr: 'Kasbah', en: 'Kasbah', ar: 'القصبة', es: 'Kasbah' },
          desc: {
            fr: 'Les tombeaux des sultans saadiens et de leurs proches, du XVIe siècle, ornés de marbre, de stucs et de cèdre sculpté.',
            en: 'The 16th-century tombs of the Saadian sultans and their families, decorated with marble, stucco and carved cedar.',
            ar: 'مدافن سلاطين الدولة السعدية وذويهم من القرن السادس عشر، مزيّنة بالرخام والجصّ وخشب الأرز المنقوش.',
            es: 'Las tumbas del siglo XVI de los sultanes saadíes y sus familias, decoradas con mármol, yesería y cedro tallado.'
          },
          tip: {
            fr: 'Combinez la visite avec le palais El Badi, tout proche.',
            en: 'Combine the visit with El Badi Palace, close by.',
            ar: 'اجمع بين هذه الزيارة وزيارة قصر البديع القريب.',
            es: 'Combina la visita con el palacio El Badi, muy cerca.'
          },
          duration: 45,
          maps: 'Tombeaux Saadiens, Marrakech'
        },
        // source: https://fr.le360.ma/culture/jardin-majorelle-musee-yves-saint-laurent-musee-berbere-les-billets-desormais-disponibles-uniquement_SFTIPBETLVCP5CKTIDMQP3GAEA/
        // source: https://medias24.com/2024/03/22/marrakech-le-jardin-majorelle-alerte-sur-les-arnaques-aux-faux-billets-dentree/
        // source: https://www.avygeo.com/fr/guide/lieux-interet/21572-jardin-majorelle
        // source: https://www.ticketlens.com/fr/p687565/marrakech/jardin-majorelle
        // Online tickets only since January 2023, 30-minute slots. No official 2026 price found.
        {
          id: 'majorelle',
          icon: 'palm',
          short: { fr: 'Le jardin bleu, billets en ligne', en: 'The blue garden, tickets online only', ar: 'الحديقة الزرقاء، التذاكر عبر الإنترنت', es: 'El jardín azul, entradas en línea' },
          name: { fr: 'Jardin Majorelle', en: 'Majorelle Garden', ar: 'حديقة ماجوريل', es: 'Jardín Majorelle' },
          area: { fr: 'Guéliz', en: 'Guéliz', ar: 'جليز', es: 'Guéliz' },
          desc: {
            fr: 'Le célèbre jardin au bleu Majorelle, et à côté le musée Yves Saint Laurent. Un billet combiné couvre les deux.',
            en: 'The famous garden in Majorelle blue, with the Yves Saint Laurent Museum next door. A combined ticket covers both.',
            ar: 'الحديقة الشهيرة بلونها الأزرق «ماجوريل»، وإلى جانبها متحف إيف سان لوران. تذكرة مشتركة تشمل الاثنين.',
            es: 'El famoso jardín de azul Majorelle, con el Museo Yves Saint Laurent al lado. Una entrada combinada incluye los dos.'
          },
          tip: {
            fr: 'Billets uniquement sur le site officiel, par créneau de 30 minutes : ceux vendus ailleurs peuvent être refusés.',
            en: 'Tickets only on the official website, in 30-minute slots: tickets bought elsewhere may be refused.',
            ar: 'التذاكر عبر الموقع الرسمي فقط وبحصص من 30 دقيقة، وقد تُرفض التذاكر المشتراة من مواقع أخرى.',
            es: 'Entradas solo en la web oficial, por franjas de 30 minutos: las compradas en otros sitios pueden ser rechazadas.'
          },
          duration: 90,
          maps: 'Jardin Majorelle, Marrakech'
        },
        // source: https://simply-morocco.com/scams-in-marrakech/
        // source: https://marocmama.com/marrakech-scams-faux-guides/
        // source: https://kupi.com/en/explore/morocco/marrakech/weather
        // source: https://introducingmarrakech.com/climate
        // Dress, Friday prayer, Ramadan and water are in content/morocco.js: not repeated here.
        {
          kind: 'note',
          id: 'note-tips',
          photo: 'lanterns',
          icon: 'bulb',
          short: { fr: 'Faux guides, henné, chaleur', en: 'Fake guides, henna, heat', ar: 'مرشدون مزيّفون، حنّاء، حرارة', es: 'Falsos guías, henna, calor' },
          name: { fr: 'Bon à savoir à Marrakech', en: 'Good to know in Marrakech', ar: 'معلومات مفيدة في مراكش', es: 'Conviene saber en Marrakech' },
          desc: {
            fr: 'Quelques réflexes pour profiter de la ville sereinement :',
            en: 'A few habits to enjoy the city with peace of mind:',
            ar: 'بعض العادات لتستمتع بالمدينة براحة بال:',
            es: 'Algunos hábitos para disfrutar de la ciudad con tranquilidad:'
          },
          list: [
            { text: { fr: '« C’est fermé par là » ? C’est presque toujours faux : continuez votre chemin.', en: '“That way is closed”? It almost never is: keep going.', ar: '«الطريق مغلق»؟ غالباً ما يكون ذلك غير صحيح، فتابع طريقك.', es: '¿«Por ahí está cerrado»? Casi nunca es cierto: sigue tu camino.' } },
            { text: { fr: 'Déclinez poliment les guides improvisés ; prenez un guide officiel ou suivez votre carte.', en: 'Politely turn down self-appointed guides; hire an official guide or follow your map.', ar: 'ارفض بلطف عروض المرشدين غير الرسميين، واستعن بمرشد رسمي أو اتبع خريطتك.', es: 'Rechaza con amabilidad a los guías improvisados; contrata un guía oficial o sigue tu mapa.' } },
            { text: { fr: 'Henné sur la place : ne tendez pas la main avant d’avoir fixé le prix.', en: 'Henna on the square: do not hold out your hand until the price is agreed.', ar: 'الحنّاء في الساحة: لا تمدّ يدك قبل الاتفاق على الثمن.', es: 'Henna en la plaza: no tiendas la mano hasta acordar el precio.' } },
            { text: { fr: 'Juillet et août : souvent 36–37 °C l’après-midi. Sortez le matin et en fin de journée.', en: 'July and August: often 36–37 °C in the afternoon. Go out in the morning and late in the day.', ar: 'في يوليو وأغسطس: غالباً 36–37 درجة بعد الظهر، فاخرج صباحاً وآخر النهار.', es: 'Julio y agosto: a menudo 36–37 °C por la tarde. Sal por la mañana y al final del día.' } },
            { text: { fr: 'En hiver, les journées sont douces mais les nuits froides (5–7 °C) : prenez une veste.', en: 'In winter, days are mild but nights are cold (5–7 °C): bring a jacket.', ar: 'في الشتاء، النهار معتدل لكن الليل بارد (5–7 درجات)، فاحمل سترة.', es: 'En invierno, los días son suaves pero las noches frías (5–7 °C): lleva una chaqueta.' } }
          ]
        }
      ]
    },

    /* ------------------------------------------------------------------ */
    restaurants: {
      icon: 'tagine', tint: '#8C4A3B',
      type: 'places',
      title: { fr: 'Restaurants', en: 'Restaurants', ar: 'مطاعم', es: 'Restaurantes' },
      intro: {
        fr: 'Des stands de la place aux tables de Guéliz : quelques adresses sûres.',
        en: 'From the square’s stalls to Guéliz tables: a few reliable addresses.',
        ar: 'من أكشاك الساحة إلى مطاعم جليز: عناوين قليلة مضمونة.',
        es: 'De los puestos de la plaza a las mesas de Guéliz: unas pocas direcciones seguras.'
      },
      filters: [
        { id: 'moroccan', label: { fr: 'Marocain', en: 'Moroccan', ar: 'مغربي', es: 'Marroquí' } },
        { id: 'medina', label: { fr: 'Médina', en: 'Medina', ar: 'المدينة العتيقة', es: 'Medina' } },
        { id: 'gueliz', label: { fr: 'Guéliz', en: 'Guéliz', ar: 'جليز', es: 'Guéliz' } },
        { id: 'budget', label: { fr: 'Petit budget', en: 'Budget', ar: 'اقتصادي', es: 'Económico' } }
      ],
      items: [
        // source: https://www.nomadotravel.app/en/places/jemaa-el-fna
        // "At night, restaurant terraces fill the square, serving couscous and tajines."
        {
          id: 'jemaa-stalls',
          icon: 'tagine',
          short: { fr: 'Dîner sur la place, à petit prix', en: 'Dinner on the square, on a budget', ar: 'عشاء في الساحة بثمن زهيد', es: 'Cenar en la plaza, a buen precio' },
          name: { fr: 'Stands de Jemaa el‑Fna', en: 'Jemaa el-Fna food stalls', ar: 'أكشاك الطعام في جامع الفنا', es: 'Puestos de Jemaa el-Fna' },
          area: { fr: 'Médina', en: 'Medina', ar: 'المدينة العتيقة', es: 'Medina' },
          tags: ['moroccan', 'medina', 'budget'],
          desc: {
            fr: 'Chaque soir, la place se couvre de stands de cuisine qui servent couscous et tajines.',
            en: 'Every evening the square fills with food stalls serving couscous and tagines.',
            ar: 'كل مساء تمتلئ الساحة بأكشاك تقدّم الكسكس والطواجن.',
            es: 'Cada noche la plaza se llena de puestos que sirven cuscús y tajines.'
          },
          tip: {
            fr: 'Demandez le prix des plats avant de commander.',
            en: 'Ask the price of dishes before ordering.',
            ar: 'اسأل عن ثمن الأطباق قبل الطلب.',
            es: 'Pregunta el precio de los platos antes de pedir.'
          },
          budget: 1,
          maps: 'Place Jemaa el-Fna, Marrakech'
        },
        // source: https://experience.transat.com/restaurants-in-marrakesh-morocco/
        // source: https://thewanderingquinn.com/best-restaurants-in-marrakech/
        // source: https://visitmarrakech.com/en/the-7-must-see-rooftops-of-Marrakech/
        // Former carpet shop just off Rahba Kedima, next to Café des Épices; rooftop with Atlas views; book ahead.
        {
          id: 'nomad',
          icon: 'sun',
          short: { fr: 'Cuisine marocaine moderne en rooftop', en: 'Modern Moroccan food on a rooftop', ar: 'مطبخ مغربي عصري على السطح', es: 'Cocina marroquí moderna en una azotea' },
          name: { fr: 'Nomad' },
          area: { fr: 'Rahba Kedima · Médina', en: 'Rahba Kedima · Medina', ar: 'الرحبة القديمة · المدينة العتيقة', es: 'Rahba Kedima · Medina' },
          tags: ['moroccan', 'medina'],
          desc: {
            fr: 'Cuisine marocaine revisitée dans un ancien magasin de tapis, juste à côté de la place Rahba Kedima. Ses terrasses donnent sur la médina et l’Atlas.',
            en: 'Modern Moroccan cooking in a former carpet shop just off Rahba Kedima square. Its terraces look over the medina and the Atlas.',
            ar: 'مطبخ مغربي بلمسة عصرية في محلّ زرابي قديم بجوار الرحبة القديمة، وتطلّ سطوحه على المدينة العتيقة والأطلس.',
            es: 'Cocina marroquí renovada en una antigua tienda de alfombras, junto a la plaza Rahba Kedima. Sus terrazas miran a la medina y al Atlas.'
          },
          tip: {
            fr: 'Réservez, surtout pour une table en terrasse.',
            en: 'Book ahead, especially for a terrace table.',
            ar: 'احجز مسبقاً، خاصة لطاولة على السطح.',
            es: 'Reserva, sobre todo para una mesa en la terraza.'
          },
          budget: 2,
          maps: 'Nomad, Marrakech'
        },
        // source: https://thewanderingquinn.com/best-restaurants-in-marrakech/
        // source: https://www.easyjet.com/en/traveller/morocco/marrakech/best-restaurants-in-marrakech
        // source: https://www.theworlds50best.com/discovery/Establishments/Morocco/Marrakech/Le-Jardin.html
        // source: https://tablejourney.com/morocco/marrakech/restaurants/le-jardin/
        // 32 Souk Jeld Sidi Abdelaziz; courtyard of a 16th-century riad, banana trees and palms;
        // Moroccan classics; no alcohol. The "vegetable-led menu" claim was not confirmed: removed.
        // One source says no bookings, arrive before 13:00 for lunch.
        {
          id: 'le-jardin',
          icon: 'palm',
          short: { fr: 'Déjeuner au vert dans un riad', en: 'Lunch in a leafy riad garden', ar: 'غداء في حديقة رياض', es: 'Comer entre plantas en un riad' },
          name: { fr: 'Le Jardin' },
          area: { fr: 'Médina', en: 'Medina', ar: 'المدينة العتيقة', es: 'Medina' },
          tags: ['moroccan', 'medina'],
          desc: {
            fr: 'Un restaurant dans la cour d’un riad du XVIe siècle, entre bananiers et palmiers. Classiques marocains, sans alcool.',
            en: 'A restaurant in the courtyard of a 16th-century riad, among banana trees and palms. Moroccan classics, no alcohol.',
            ar: 'مطعم في فناء رياض من القرن السادس عشر، بين أشجار الموز والنخيل. أطباق مغربية كلاسيكية، دون كحول.',
            es: 'Un restaurante en el patio de un riad del siglo XVI, entre bananos y palmeras. Clásicos marroquíes, sin alcohol.'
          },
          tip: {
            fr: 'Pour déjeuner, arrivez de préférence avant 13 h.',
            en: 'For lunch, try to arrive before 1 pm.',
            ar: 'للغداء، يُستحسن أن تصل قبل الواحدة ظهراً.',
            es: 'Para comer, mejor llega antes de las 13:00.'
          },
          budget: 2,
          maps: 'Le Jardin restaurant, Médina, Marrakech'
        },
        // source: https://experience.transat.com/restaurants-in-marrakesh-morocco/
        // source: https://isleblue.co/categories/morocco-guide/articles/recommended-restaurants-in-marrakech
        // Run entirely by women since 1987; one source also lists a second address in Agdal.
        {
          id: 'al-fassia',
          icon: 'tagine',
          short: { fr: 'Tenu par des femmes depuis 1987', en: 'Run by women since 1987', ar: 'تديره نساء منذ 1987', es: 'Llevado por mujeres desde 1987' },
          name: { fr: 'Al Fassia', ar: 'الفاسية' },
          area: { fr: 'Guéliz', en: 'Guéliz', ar: 'جليز', es: 'Guéliz' },
          tags: ['moroccan', 'gueliz'],
          desc: {
            fr: 'Une institution de la cuisine marocaine, tenue entièrement par des femmes. On y vient pour l’agneau cuit longuement, le couscous et les pâtisseries.',
            en: 'An institution of Moroccan cooking, run entirely by women. People come for the slow-cooked lamb, the couscous and the pastries.',
            ar: 'مؤسسة عريقة في الطبخ المغربي تديرها نساء بالكامل. يقصدها الناس من أجل لحم الخروف المطهوّ ببطء والكسكس والحلويات.',
            es: 'Una institución de la cocina marroquí, llevada solo por mujeres. Se viene por el cordero de cocción lenta, el cuscús y los pasteles.'
          },
          tip: {
            fr: 'Réservez, et préférez les tajines à la carte plutôt que le menu.',
            en: 'Book ahead, and choose the à la carte tagines over the set menu.',
            ar: 'احجز مسبقاً، واختر الطواجن من القائمة بدل الوجبة الثابتة.',
            es: 'Reserva y elige los tajines a la carta en vez del menú.'
          },
          budget: 2,
          maps: 'Al Fassia Guéliz, Marrakech'
        },
        // source: https://thewanderingquinn.com/best-restaurants-in-marrakech/
        // source: https://www.easyjet.com/en/traveller/morocco/marrakech/best-restaurants-in-marrakech
        // source: https://www.theworlds50best.com/restaurants/best-in-middle-east-and-north-africa/the-list/-61.html
        // source: https://www.easyjet.com/en/traveller/morocco/marrakech/where-chefs-eat-61-marrakech-andrew-cibej
        // source: https://indagare.com/restaurant/plus61
        // Written "+61"; 96 rue Mohammed el Beqal, Guéliz; opened 2019; Sydney-style dishes to
        // share, bread and pasta made in house; No. 31 in MENA's 50 Best Restaurants 2026.
        // "Fair prices" and "good coffee" were not confirmed: removed.
        {
          id: 'plus61',
          icon: 'chef',
          short: { fr: 'Plats à partager, esprit Sydney', en: 'Sharing plates, Sydney style', ar: 'أطباق للمشاركة بروح سيدني', es: 'Platos para compartir, estilo Sídney' },
          name: { fr: '+61', ar: 'Plus61' }, // ar: '+61' would show as '61+' in right-to-left text
          area: { fr: 'Guéliz', en: 'Guéliz', ar: 'جليز', es: 'Guéliz' },
          tags: ['gueliz'],
          desc: {
            fr: 'Un restaurant fondé par des Australiens : des plats à partager entre Australie, Maroc et Méditerranée, avec pain et pâtes faits maison.',
            en: 'A restaurant founded by Australians: dishes to share, between Australia, Morocco and the Mediterranean, with bread and pasta made in house.',
            ar: 'مطعم أسّسه أستراليون: أطباق للمشاركة تجمع بين أستراليا والمغرب والمتوسط، مع خبز ومعكرونة من صنع البيت.',
            es: 'Un restaurante fundado por australianos: platos para compartir entre Australia, Marruecos y el Mediterráneo, con pan y pasta caseros.'
          },
          tip: {
            fr: 'Une table primée et très demandée : réservez.',
            en: 'An award-winning, much sought-after table: book ahead.',
            ar: 'مطعم حائز على جوائز وعليه إقبال كبير، فاحجز مسبقاً.',
            es: 'Una mesa premiada y muy solicitada: reserva.'
          },
          budget: 2,
          maps: 'Plus61, Marrakech'
        },
        // source: https://tablejourney.com/morocco/marrakech/cooking-classes/amal-center-cooking-class/
        // source: https://marocmama.com/choosing-the-best-marrakech-cooking-class-for-you/
        // source: https://www.businessday.co.za/bd/life/2018-03-15-cooking-classes-lift-the-lid-on-a-new-life-for-the-poor/
        // Non-profit; lunch in a garden. Sources disagree on the centre's location (Guéliz or
        // Targa), so the card only says "outside the medina". No price found: no budget mark.
        {
          id: 'amal',
          icon: 'heart',
          short: { fr: 'Un repas qui forme des femmes', en: 'A meal that trains women', ar: 'وجبة تدعم تكوين النساء', es: 'Una comida que forma a mujeres' },
          name: { fr: 'Centre Amal', en: 'Amal Center', ar: 'مركز أمل', es: 'Centro Amal' },
          area: { fr: 'Hors médina', en: 'Outside the medina', ar: 'خارج المدينة العتيقة', es: 'Fuera de la medina' },
          tags: ['moroccan'],
          desc: {
            fr: 'Une association qui forme aux métiers de la restauration des femmes en situation difficile. On y déjeune d’une cuisine marocaine, dans un jardin.',
            en: 'A non-profit that trains women in difficulty for restaurant work. You lunch on Moroccan food, in a garden.',
            ar: 'جمعية غير ربحية تُدرّب نساءً في وضع صعب على مهن المطاعم، ويمكنك أن تتناول فيها غداءً مغربياً في حديقة.',
            es: 'Una asociación que forma a mujeres en situación difícil en el oficio de la restauración. Se come cocina marroquí en un jardín.'
          },
          tip: {
            fr: 'Le centre propose aussi des cours de cuisine, sur réservation.',
            en: 'The centre also runs cooking classes, by booking.',
            ar: 'يقدّم المركز أيضاً دروساً في الطبخ بحجز مسبق.',
            es: 'El centro también ofrece clases de cocina, con reserva.'
          },
          maps: 'Amal Women\'s Training Center, Marrakech'
        },
        {
          id: 'host-table',
          icon: 'star',
          short: { fr: 'L’adresse personnelle de {host}', en: '{host}’s personal pick', ar: 'اختيار {host} الشخصي', es: 'La elección personal de {host}' },
          kind: 'placeholder',
          name: { fr: 'La table préférée de {host}', en: '{host}’s favourite table', ar: 'المطعم المفضّل لدى {host}', es: 'La mesa favorita de {host}' },
          desc: {
            fr: 'Une adresse personnelle, choisie par votre hôte.',
            en: 'A personal pick, chosen by your host.',
            ar: 'عنوان شخصي يختاره مضيفك.',
            es: 'Una dirección personal, elegida por tu anfitrión.'
          }
        }
      ]
    },

    /* ------------------------------------------------------------------ */
    cafes: {
      icon: 'cup', tint: '#6B4F3A',
      type: 'places',
      title: { fr: 'Cafés & rooftops', en: 'Cafés & rooftops', ar: 'مقاهٍ وسطوح', es: 'Cafés y azoteas' },
      intro: {
        fr: 'Un thé en terrasse au-dessus des souks, un café à l’ombre : les pauses qui font Marrakech.',
        en: 'Tea on a terrace above the souks, coffee in the shade: the breaks that make Marrakech.',
        ar: 'شاي على سطح فوق الأسواق أو قهوة في الظل: استراحات تصنع سحر مراكش.',
        es: 'Un té en una terraza sobre los zocos, un café a la sombra: las pausas que hacen Marrakech.'
      },
      items: [
        // Same explainer as in casablanca.js (a dish list, not a place).
        {
          kind: 'note',
          id: 'note-breakfast',
          photo: 'breakfast',
          icon: 'steam',
          short: { fr: 'Msemen, baghrir, amlou et atay', en: 'Msemen, baghrir, amlou and atay', ar: 'مسمن وبغرير وأملو وأتاي', es: 'Msemen, baghrir, amlou y atay' },
          name: { fr: 'Le petit-déjeuner marocain', en: 'The Moroccan breakfast', ar: 'الفطور المغربي', es: 'El desayuno marroquí' },
          desc: {
            fr: 'Dans la plupart des cafés, demandez le « petit-déjeuner marocain ». Voici ce qui arrive sur la table :',
            en: 'In most cafés, ask for the “Moroccan breakfast”. This is what comes to the table:',
            ar: 'في معظم المقاهي، اطلب «الفطور المغربي». هذا ما يُقدَّم لك:',
            es: 'En la mayoría de los cafés, pide el «desayuno marroquí». Esto es lo que llega a la mesa:'
          },
          list: [
            { term: { fr: 'Msemen', ar: 'مسمن' }, text: { fr: 'crêpe feuilletée, servie avec miel ou fromage', en: 'flaky square flatbread, with honey or cheese', ar: 'رغيف مورّق يُقدَّم بالعسل أو الجبن', es: 'torta hojaldrada, con miel o queso' } },
            { term: { fr: 'Baghrir', ar: 'بغرير' }, text: { fr: 'la « crêpe aux mille trous », au beurre et au miel', en: 'the “thousand-hole pancake”, with butter and honey', ar: '«فطيرة الألف ثقب» بالزبدة والعسل', es: 'la «crepe de los mil agujeros», con mantequilla y miel' } },
            { term: { fr: 'Harcha', ar: 'حرشة' }, text: { fr: 'galette de semoule dorée', en: 'golden semolina griddle cake', ar: 'خبز السميد المحمّر', es: 'torta dorada de sémola' } },
            { term: { fr: 'Amlou', ar: 'أملو' }, text: { fr: 'pâte d’amandes, huile d’argan et miel', en: 'almond, argan oil and honey spread', ar: 'معجون اللوز وزيت الأركان والعسل', es: 'crema de almendras, aceite de argán y miel' } },
            { term: { fr: 'Atay', ar: 'أتاي' }, text: { fr: 'le thé à la menthe, servi de haut pour faire mousser', en: 'mint tea, poured from high to make it foam', ar: 'الشاي بالنعناع، يُصبّ من علوّ ليرغو', es: 'el té a la menta, servido desde lo alto para que haga espuma' } }
          ]
        },
        // source: https://www.mochileandoporelmundo.com/mejores-terrazas-marrakech/
        // source: https://visitmarrakech.com/en/the-7-must-see-rooftops-of-Marrakech/
        // Three floors: small terrace on the square, air-conditioned first floor, panoramic roof.
        {
          id: 'cafe-epices',
          icon: 'mint',
          short: { fr: 'Terrasse au-dessus des épices', en: 'A terrace above the spice square', ar: 'سطح يطلّ على ساحة التوابل', es: 'Terraza sobre la plaza de especias' },
          name: { fr: 'Café des Épices', ar: 'مقهى التوابل' },
          area: { fr: 'Rahba Kedima · Médina', en: 'Rahba Kedima · Medina', ar: 'الرحبة القديمة · المدينة العتيقة', es: 'Rahba Kedima · Medina' },
          desc: {
            fr: 'Trois niveaux sur la place Rahba Kedima : une petite terrasse sur la place, une salle climatisée et une terrasse panoramique au sommet. Thé, jus frais et plats simples.',
            en: 'Three floors on Rahba Kedima square: a small terrace on the square, an air-conditioned room and a panoramic terrace on top. Tea, fresh juice and simple dishes.',
            ar: 'ثلاثة طوابق في الرحبة القديمة: شرفة صغيرة على الساحة، وقاعة مكيّفة، وسطح بانورامي في الأعلى. شاي وعصير طازج وأطباق بسيطة.',
            es: 'Tres plantas en la plaza Rahba Kedima: una terracita en la plaza, una sala con aire acondicionado y una terraza panorámica arriba. Té, zumos naturales y platos sencillos.'
          },
          tip: {
            fr: 'En plein été, l’étage climatisé est le meilleur refuge de la mi-journée.',
            en: 'In high summer, the air-conditioned floor is the best refuge at midday.',
            ar: 'في عزّ الصيف، الطابق المكيّف أفضل ملجأ وقت الظهيرة.',
            es: 'En pleno verano, la planta con aire acondicionado es el mejor refugio a mediodía.'
          },
          budget: 1,
          maps: 'Café des Épices, Marrakech'
        },
        // source: https://wanderlog.com/place/details/51201/le-grand-balcon-du-café-glacier
        // source: https://holidayexpert.com/food-and-drink/sip-a-mint-tea-and-watch-the-sunset-at-le-grand-balcon-du-cafe-glacier/
        // One drink per person required for the balcony. Reviews mixed on price and service.
        {
          id: 'grand-balcon',
          icon: 'sunset',
          short: { fr: 'Le coucher du soleil sur la place', en: 'Sunset over the square', ar: 'الغروب فوق الساحة', es: 'El atardecer sobre la plaza' },
          name: { fr: 'Le Grand Balcon du Café Glacier' },
          area: { fr: 'Jemaa el-Fna', en: 'Jemaa el-Fna', ar: 'جامع الفنا', es: 'Jemaa el-Fna' },
          desc: {
            fr: 'Un balcon qui domine Jemaa el-Fna, l’un des postes d’observation les plus connus pour voir la place s’allumer au coucher du soleil.',
            en: 'A balcony overlooking Jemaa el-Fna, one of the best-known spots to watch the square light up at sunset.',
            ar: 'شرفة تطلّ على جامع الفنا، من أشهر الأماكن لمشاهدة الساحة وهي تتلألأ عند الغروب.',
            es: 'Un balcón que domina Jemaa el-Fna, uno de los miradores más conocidos para ver la plaza encenderse al atardecer.'
          },
          tip: {
            fr: 'Une boisson par personne est obligatoire pour accéder au balcon ; arrivez avant le coucher du soleil pour avoir une place.',
            en: 'One drink per person is required to reach the balcony; arrive before sunset to get a spot.',
            ar: 'يُشترط طلب مشروب لكل شخص لدخول الشرفة، فتعال قبل الغروب لتجد مكاناً.',
            es: 'Es obligatorio tomar una bebida por persona para acceder al balcón; llega antes del atardecer para tener sitio.'
          },
          sunset: true, budget: 1,
          maps: 'Café Glacier, Jemaa el-Fna, Marrakech'
        },
        // source: https://wanderlog.com/place/details/1490014/café-kessabine
        // source: https://www.touchscreentravels.com/apps/marrakeshs-best/21880/cafe-kessabine
        // 77 rue Dabbachi, by the Kissariat el Guessabine; small, budget, three floors; the roof
        // sees only the north-east corner of the square (best from the two front seats).
        // Service reviews mixed.
        {
          id: 'kessabine',
          icon: 'cup',
          short: { fr: 'Petit rooftop au bord de la place', en: 'A small rooftop by the square', ar: 'سطح صغير على طرف الساحة', es: 'Pequeña azotea junto a la plaza' },
          name: { fr: 'Café Kessabine' },
          area: { fr: 'Jemaa el-Fna', en: 'Jemaa el-Fna', ar: 'جامع الفنا', es: 'Jemaa el-Fna' },
          desc: {
            fr: 'Un petit café-restaurant sur trois niveaux, en bordure de Jemaa el-Fna. Du toit, on voit un coin de la place, un thé à la main.',
            en: 'A small café-restaurant on three floors, at the edge of Jemaa el-Fna. From the roof you see a corner of the square, tea in hand.',
            ar: 'مقهى ومطعم صغير من ثلاثة طوابق على طرف جامع الفنا. من سطحه ترى ركناً من الساحة وكأس الشاي في يدك.',
            es: 'Un pequeño café-restaurante de tres plantas, al borde de Jemaa el-Fna. Desde la azotea se ve una esquina de la plaza, con un té en la mano.'
          },
          tip: {
            fr: 'Visez les deux places à l’avant du toit, qui ont la meilleure vue.',
            en: 'Aim for the two front seats on the roof, which have the best view.',
            ar: 'اختر أحد المقعدين الأماميين على السطح، فلهما أفضل إطلالة.',
            es: 'Intenta conseguir uno de los dos asientos delanteros de la azotea, con la mejor vista.'
          },
          budget: 1,
          maps: 'Café Kessabine, Marrakech'
        },
        // source: https://thirdeyetraveller.com/bacha-coffee-marrakech-worth-waiting-for/
        // source: https://passportandstamps.com/bacha-coffee-marrakech-review
        // source: https://visitmarrakech.com/en/listing/dar-el-bacha-bacha-coffee-un-voyage-entre-histoire-et-raffinement-a-marrakech/
        // source: https://tablejourney.com/morocco/marrakech/cafes/bacha-coffee/
        // No bookings; waits of 1–3 h. Closed Monday (tablejourney and the tourism listing agree).
        // Hours: 10:00–16:00 (one blog) or 10:00–18:00 (tablejourney): only the 10:00 opening is shown.
        // Museum ticket needed to reach the café; given as 10, 60 or 70 MAD: not shown.
        {
          id: 'bacha',
          icon: 'cup',
          short: { fr: 'Plus de 200 cafés dans un palais', en: 'Over 200 coffees in a palace', ar: 'أكثر من 200 نوع قهوة في قصر', es: 'Más de 200 cafés en un palacio' },
          name: { fr: 'Bacha Coffee' },
          area: { fr: 'Dar El Bacha · Médina', en: 'Dar El Bacha · Medina', ar: 'دار الباشا · المدينة العتيقة', es: 'Dar El Bacha · Medina' },
          desc: {
            fr: 'Le café du palais Dar El Bacha, aujourd’hui Musée des Confluences : un salon Belle Époque et plus de 200 cafés. On y entre avec le billet du musée.',
            en: 'The café of the Dar El Bacha palace, now the Musée des Confluences: a Belle Époque room and over 200 coffees. You get in with a museum ticket.',
            ar: 'مقهى قصر دار الباشا، متحف الملتقيات حالياً: صالون على طراز «الحقبة الجميلة» وأكثر من 200 نوع من القهوة. يُدخل إليه بتذكرة المتحف.',
            es: 'El café del palacio Dar El Bacha, hoy Musée des Confluences: un salón Belle Époque y más de 200 cafés. Se entra con la entrada del museo.'
          },
          tip: {
            fr: 'Sans réservation, avec souvent plus d’une heure d’attente : venez dès l’ouverture (10 h). Fermé le lundi.',
            en: 'No bookings, and often more than an hour’s wait: come at opening time (10 am). Closed on Mondays.',
            ar: 'لا حجز مسبق والانتظار غالباً أكثر من ساعة، فتعال عند الافتتاح (10:00). مغلق يوم الاثنين.',
            es: 'Sin reservas y a menudo más de una hora de espera: ven a la hora de apertura (10:00). Cerrado los lunes.'
          },
          maps: 'Bacha Coffee, Dar El Bacha, Marrakech'
        },
        {
          id: 'host-cafe',
          icon: 'star',
          short: { fr: 'Le café de quartier de {host}', en: '{host}’s local café', ar: 'مقهى الحيّ لدى {host}', es: 'El café de barrio de {host}' },
          kind: 'placeholder',
          name: { fr: 'Le café préféré de {host}', en: '{host}’s favourite café', ar: 'المقهى المفضّل لدى {host}', es: 'El café favorito de {host}' },
          desc: {
            fr: 'Un café du quartier pour le petit-déjeuner, choisi par votre hôte.',
            en: 'A local café for breakfast, chosen by your host.',
            ar: 'مقهى في الحيّ للفطور، يختاره مضيفك.',
            es: 'Un café del barrio para desayunar, elegido por tu anfitrión.'
          }
        }
      ]
    },

    /* ------------------------------------------------------------------ */
    souks: {
      icon: 'bag', tint: '#7A4E62',
      type: 'places',
      title: { fr: 'Souks', en: 'Souks', ar: 'الأسواق', es: 'Zocos' },
      intro: {
        fr: 'Chaque souk a son métier. Flânez, comparez, puis négociez avec le sourire.',
        en: 'Each souk has its own craft. Wander, compare, then bargain with a smile.',
        ar: 'لكل سوق حرفته. تجوّل وقارن، ثم ساوم بابتسامة.',
        es: 'Cada zoco tiene su oficio. Pasea, compara y luego regatea con una sonrisa.'
      },
      items: [
        // source: https://www.frommers.com/destinations/marrakech/things-to-do/markets/
        // source: https://nomadepicureans.com/?p=5943
        // source: https://curlytales.com/?p=530121
        {
          id: 'semmarine',
          icon: 'bag',
          short: { fr: 'L’artère principale des souks', en: 'The main street of the souks', ar: 'الشارع الرئيسي للأسواق', es: 'La arteria principal de los zocos' },
          name: { fr: 'Souk Semmarine', en: 'Souk Semmarine', ar: 'سوق السمّارين', es: 'Zoco Semmarine' },
          area: { fr: 'Médina', en: 'Medina', ar: 'المدينة العتيقة', es: 'Medina' },
          desc: {
            fr: 'La longue rue qui mène aux autres souks, la plus fréquentée par les visiteurs : tissus, vêtements traditionnels, et parfums et huiles à son extrémité ouest.',
            en: 'The long street leading to the other souks, the busiest with visitors: fabrics, traditional clothes, and perfumes and oils at its western end.',
            ar: 'الشارع الطويل المؤدّي إلى باقي الأسواق، والأكثر ارتياداً من الزوار: أقمشة وملابس تقليدية، وعطور وزيوت في طرفه الغربي.',
            es: 'La larga calle que lleva a los demás zocos, la más concurrida por los visitantes: telas, ropa tradicional y, en su extremo oeste, perfumes y aceites.'
          },
          duration: 60,
          maps: 'Souk Semmarine, Marrakech'
        },
        // source: https://www.frommers.com/destinations/marrakech/things-to-do/markets/
        // source: https://nomadepicureans.com/?p=88867
        {
          id: 'rahba-kedima',
          icon: 'sparkle',
          short: { fr: 'Paniers, chapeaux et herboristes', en: 'Baskets, hats and herbalists', ar: 'سلال وقبعات وعطّارون', es: 'Cestos, sombreros y herbolarios' },
          name: { fr: 'Rahba Kedima', en: 'Rahba Kedima', ar: 'الرحبة القديمة', es: 'Rahba Kedima' },
          area: { fr: 'Médina', en: 'Medina', ar: 'المدينة العتيقة', es: 'Medina' },
          desc: {
            fr: 'Une place où l’on vend chapeaux berbères et paniers tressés, avec ses « pharmacies berbères » : cosmétiques traditionnels et remèdes aux plantes.',
            en: 'A square selling Berber hats and woven baskets, with its “Berber pharmacies”: traditional cosmetics and herbal remedies.',
            ar: 'ساحة تُباع فيها القبعات الأمازيغية والسلال المنسوجة، وفيها دكاكين العطّارين: مستحضرات تقليدية وأعشاب طبية.',
            es: 'Una plaza donde se venden sombreros bereberes y cestos trenzados, con sus «farmacias bereberes»: cosmética tradicional y remedios de plantas.'
          },
          tip: {
            fr: 'Faites une pause en terrasse au Café des Épices, sur la place.',
            en: 'Take a break on the terrace of Café des Épices, on the square.',
            ar: 'خذ استراحة على سطح مقهى التوابل المطلّ على الساحة.',
            es: 'Haz una pausa en la terraza del Café des Épices, en la plaza.'
          },
          duration: 45,
          maps: 'Rahba Kedima, Marrakech'
        },
        // source: https://www.frommers.com/destinations/marrakech/things-to-do/markets/
        // source: https://visitmarrakech.com/en/listing/one-thing-leads-to-another-colorful-journey-in-the-crafts-of-Marrakech/
        {
          id: 'teinturiers',
          icon: 'drop',
          short: { fr: 'Laines teintes séchant dans les ruelles', en: 'Dyed wool drying over the alleys', ar: 'صوف مصبوغ يجفّ فوق الأزقة', es: 'Lana teñida secándose en las callejas' },
          name: { fr: 'Souk des teinturiers', en: 'Dyers’ souk', ar: 'سوق الصبّاغين', es: 'Zoco de los tintoreros' },
          area: { fr: 'Médina', en: 'Medina', ar: 'المدينة العتيقة', es: 'Medina' },
          desc: {
            fr: 'Les laines et les tissus teints sont suspendus au-dessus des ruelles pour sécher : l’un des coins les plus photogéniques de la médina.',
            en: 'Dyed wool and fabric hang over the alleys to dry: one of the most photogenic corners of the medina.',
            ar: 'تُعلَّق الأصواف والأقمشة المصبوغة فوق الأزقة لتجفّ، في واحد من أجمل أركان المدينة العتيقة للتصوير.',
            es: 'Las lanas y telas teñidas cuelgan sobre las callejas para secarse: uno de los rincones más fotogénicos de la medina.'
          },
          duration: 30,
          maps: 'Souk des Teinturiers, Marrakech'
        },
        // source: https://www.fodors.com/world/africa-and-middle-east/morocco/marrakesh/things-to-do/shopping
        // source: https://www.worldtravelguide.net/guides/africa/morocco/marrakech/shopping
        {
          id: 'haddadine',
          icon: 'lantern',
          short: { fr: 'Lanternes et métal travaillé', en: 'Lanterns and metalwork', ar: 'فوانيس ومعادن مشغولة', es: 'Faroles y metal trabajado' },
          name: { fr: 'Souk Haddadine', en: 'Souk Haddadine', ar: 'سوق الحدّادين', es: 'Zoco Haddadine' },
          area: { fr: 'Médina', en: 'Medina', ar: 'المدينة العتيقة', es: 'Medina' },
          desc: {
            fr: 'Le souk du métal, où l’on trouve lanternes et objets en fer forgé.',
            en: 'The metalwork souk, for lanterns and wrought-iron pieces.',
            ar: 'سوق المعادن، حيث تجد الفوانيس والقطع من الحديد المشغول.',
            es: 'El zoco del metal, donde encontrarás faroles y piezas de hierro forjado.'
          },
          duration: 30,
          maps: 'Souk Haddadine, Marrakech'
        },
        // source: https://holidayexpert.com/things-to-do/shop-at-fixed-prices-at-ensemble-artisanal/
        // source: https://www.arrivalguides.com/en/Travelguide/MARRAKECH/shopping/ensemble-artisanal-92871
        // source: https://www.worldtravelguide.net/guides/africa/morocco/marrakech/shopping
        // Government-run, about forty shops and workshops, fixed prices, slightly dearer than the
        // souks, mostly cash. Hours listed: Mon–Sat 9:30–19:00, Sun 9:00–14:00.
        {
          id: 'ensemble-artisanal',
          icon: 'building',
          short: { fr: 'Artisanat à prix fixes', en: 'Crafts at fixed prices', ar: 'صناعة تقليدية بأسعار ثابتة', es: 'Artesanía a precio fijo' },
          name: { fr: 'Ensemble Artisanal', en: 'Ensemble Artisanal', ar: 'المجمّع الحرفي', es: 'Ensemble Artisanal' },
          area: { fr: 'Avenue Mohammed V', en: 'Avenue Mohammed V', ar: 'شارع محمد الخامس', es: 'Avenida Mohammed V' },
          desc: {
            fr: 'Un ensemble public d’une quarantaine de boutiques et d’ateliers : cuir, bijoux, tapis, cuivre et lanternes, à prix affichés.',
            en: 'A government-run complex of some forty shops and workshops: leather, jewellery, rugs, copper and lanterns, at marked prices.',
            ar: 'مجمّع عمومي يضمّ نحو أربعين محلاً وورشة: جلد وحُليّ وزرابي ونحاس وفوانيس، بأسعار معروضة.',
            es: 'Un complejo público de unas cuarenta tiendas y talleres: cuero, joyas, alfombras, cobre y faroles, a precio marcado.'
          },
          tip: {
            fr: 'Un peu plus cher que les souks, mais idéal pour connaître les prix avant de négocier ; prévoyez des espèces.',
            en: 'A little dearer than the souks, but ideal for learning prices before you bargain; bring cash.',
            ar: 'أغلى قليلاً من الأسواق، لكنه مثالي لمعرفة الأسعار قبل المساومة، واحمل معك نقوداً.',
            es: 'Algo más caro que los zocos, pero ideal para conocer los precios antes de regatear; lleva efectivo.'
          },
          duration: 60,
          maps: 'Ensemble Artisanal, Marrakech'
        },
        // source: https://www.fodors.com/world/africa-and-middle-east/morocco/marrakesh/things-to-do/shopping
        // source: https://holidayexpert.com/things-to-do/shop-at-fixed-prices-at-ensemble-artisanal/
        {
          kind: 'note',
          id: 'note-bargain',
          photo: 'souk-goods',
          icon: 'chat',
          short: { fr: 'Souriez, comparez, proposez moins', en: 'Smile, compare, offer less', ar: 'ابتسم وقارن واقترح أقل', es: 'Sonríe, compara, ofrece menos' },
          name: { fr: 'L’art de négocier', en: 'The art of bargaining', ar: 'فن المساومة', es: 'El arte de regatear' },
          list: [
            { text: { fr: 'Dans les souks, les prix se négocient : demandez avec le sourire et proposez nettement moins.', en: 'In the souks prices are negotiable: ask with a smile and offer much less.', ar: 'الأسعار في الأسواق قابلة للتفاوض: اسأل بابتسامة واقترح أقل بكثير.', es: 'En los zocos los precios se negocian: pregunta con una sonrisa y ofrece bastante menos.' } },
            { text: { fr: 'Les prix affichés de l’Ensemble Artisanal sont un bon repère.', en: 'The marked prices at the Ensemble Artisanal are a good benchmark.', ar: 'الأسعار المعروضة في المجمّع الحرفي مرجع جيد.', es: 'Los precios marcados del Ensemble Artisanal son una buena referencia.' } },
            { text: { fr: 'Ne négociez que si vous comptez vraiment acheter.', en: 'Only bargain if you really intend to buy.', ar: 'لا تساوم إلا إذا كنت تنوي الشراء فعلاً.', es: 'Regatea solo si de verdad piensas comprar.' } },
            { text: { fr: 'Ayez des espèces : beaucoup de petites boutiques ne prennent pas la carte.', en: 'Carry cash: many small shops do not take cards.', ar: 'احمل نقوداً، فكثير من المحلات الصغيرة لا تقبل البطاقات.', es: 'Lleva efectivo: muchas tiendas pequeñas no aceptan tarjeta.' } }
          ]
        }
      ]
    },

    /* ------------------------------------------------------------------ */
    experiences: {
      icon: 'lantern', tint: '#8A6A2F',
      type: 'places',
      title: { fr: 'Expériences', en: 'Experiences', ar: 'تجارب', es: 'Experiencias' },
      intro: {
        fr: 'Hammam, désert et montagnes : quelques expériences à vivre à Marrakech et autour.',
        en: 'Hammam, desert and mountains: a few experiences in and around Marrakech.',
        ar: 'حمّام وصحراء وجبال: تجارب تستحقّ أن تعيشها في مراكش وضواحيها.',
        es: 'Hammam, desierto y montañas: algunas experiencias en Marrakech y alrededores.'
      },
      items: [
        // source: https://www.nationalgeographic.com/travel/article/best-traditional-hammam-spa
        // source: https://theculturetrip.com/articles/the-6-best-hammams-in-marrakech
        // source: https://www.lonelyplanet.fr/destinations/afrique/maroc/marrakech/que-faire/les-hammams-marrakech
        // Oldest public bathhouse per National Geographic, but sources date it 1572 or 1652, so the
        // card only says "historic". Separate entrances for men and women.
        // Entry about 10 MAD (Culture Trip and Lonely Planet agree). Scrub prices conflict
        // (60, 150 or 170 MAD): not shown.
        {
          id: 'hammam-mouassine',
          photo: 'hammam',
          icon: 'steam',
          short: { fr: 'Le hammam public historique', en: 'The historic public hammam', ar: 'الحمّام العمومي التاريخي', es: 'El hammam público histórico' },
          name: { fr: 'Hammam Mouassine', ar: 'حمّام المواسين' },
          area: { fr: 'Mouassine · Médina', en: 'Mouassine · Medina', ar: 'المواسين · المدينة العتيقة', es: 'Mouassine · Medina' },
          desc: {
            fr: 'Un hammam public historique de la médina : vapeur, gommage et masque au rhassoul, avec des entrées séparées pour les hommes et les femmes.',
            en: 'A historic public bathhouse in the medina: steam, a scrub and a rhassoul clay mask, with separate entrances for men and women.',
            ar: 'حمّام عمومي تاريخي في المدينة العتيقة: بخار وتقشير وقناع بالغاسول، بمدخلين منفصلين للرجال والنساء.',
            es: 'Un baño público histórico de la medina: vapor, exfoliación y mascarilla de rhassoul, con entradas separadas para hombres y mujeres.'
          },
          tip: {
            fr: 'L’entrée simple coûte environ 10 MAD ; le gommage est en supplément, demandez le prix avant.',
            en: 'Basic entry is about 10 MAD; the scrub costs extra, so ask the price first.',
            ar: 'الدخول العادي بنحو 10 دراهم، والتقشير بثمن إضافي، فاسأل عن الثمن مسبقاً.',
            es: 'La entrada simple cuesta unos 10 MAD; la exfoliación se paga aparte, pregunta el precio antes.'
          },
          duration: 90, price: 10, priceFrom: true,
          maps: 'Hammam Mouassine, Marrakech'
        },
        // source: https://www.nationalgeographic.com/travel/article/best-traditional-hammam-spa
        // source: https://introducingmarrakech.com/hammams
        // Private hammam, double massage rooms and duo baths; treatments must be booked ahead.
        // The 220–450 MAD range was not confirmed by a 2025–2026 source: no price shown.
        {
          id: 'bains-marrakech',
          photo: 'spa',
          icon: 'bath',
          short: { fr: 'Hammam-spa, idéal à deux', en: 'Spa hammam, great for couples', ar: 'حمّام وسبا، مثالي للثنائي', es: 'Hammam spa, ideal en pareja' },
          name: { fr: 'Les Bains de Marrakech' },
          area: { fr: 'Hammam privé', en: 'Private hammam', ar: 'حمّام خاص', es: 'Hammam privado' },
          desc: {
            fr: 'Un hammam privé avec salles de massage doubles et bains en duo, pour un moment plus confortable qu’au hammam public.',
            en: 'A private hammam with double massage rooms and duo baths, for a more comfortable time than a public hammam.',
            ar: 'حمّام خاص بقاعات تدليك مزدوجة وحمّامات ثنائية، لتجربة أكثر راحة من الحمّام العمومي.',
            es: 'Un hammam privado con salas de masaje dobles y baños para dos, más cómodo que un hammam público.'
          },
          tip: {
            fr: 'Très demandé : réservez à l’avance.',
            en: 'Very popular: book ahead.',
            ar: 'عليه إقبال كبير، فاحجز مسبقاً.',
            es: 'Muy solicitado: reserva con antelación.'
          },
          duration: 120,
          maps: 'Les Bains de Marrakech, Marrakech'
        },
        // source: https://www.lonelyplanet.com/news/best-day-trips-from-marrakesh
        // source: https://press.fourseasons.com/marrakech/trending-now/day-trips
        // About 30 km south, about 45 min by car; camel, quad, sunset tea, dinner in a tent.
        // TODO (host): `request` lets guests ask you for a driver or a trip; remove it if you
        // do not arrange this.
        {
          id: 'agafay',
          icon: 'sunset',
          short: { fr: 'Désert de pierres au coucher du soleil', en: 'Stone desert at sunset', ar: 'صحراء صخرية عند الغروب', es: 'Desierto de piedra al atardecer' },
          name: { fr: 'Désert d’Agafay', en: 'Agafay Desert', ar: 'صحراء أكافاي', es: 'Desierto de Agafay' },
          area: { fr: '≈ 30 km au sud', en: '≈ 30 km south', ar: '≈ 30 كلم جنوباً', es: '≈ 30 km al sur' },
          desc: {
            fr: 'Un désert de pierres à environ 45 minutes de route. Les camps proposent thé au coucher du soleil, dîner sous la tente, balade à dos de chameau ou en quad.',
            en: 'A stone desert about 45 minutes’ drive away. Camps offer sunset tea, dinner in a tent, camel rides or quad biking.',
            ar: 'صحراء صخرية على بُعد نحو 45 دقيقة بالسيارة. تقدّم المخيّمات الشاي عند الغروب وعشاءً تحت الخيمة وجولات على الجمال أو بالدراجات الرباعية.',
            es: 'Un desierto de piedra a unos 45 minutos en coche. Los campamentos ofrecen té al atardecer, cena en jaima, paseos en camello o en quad.'
          },
          duration: 240, sunset: true,
          request: { fr: 'une sortie au désert d’Agafay', en: 'a trip to the Agafay desert', ar: 'رحلة إلى صحراء أكافاي', es: 'una excursión al desierto de Agafay' },
          maps: 'Désert d\'Agafay, Marrakech'
        },
        // source: https://www.firstchoice.co.uk/inspire/top-five-daytrips-marrakech
        // source: https://local-morocco-tours.com/all-marrakech-day-trips/excursion-from-marrakech-to-ourika-valley/
        // source: https://loveholidays.musement.com/uk/marrakech/guided-ourika-valley-day-trip-from-marrakech-231003
        // About an hour's drive; from Setti Fatma, a 1.5 h walk over narrow bridges to the falls.
        // TODO (host): same as Agafay for `request`.
        {
          id: 'ourika',
          icon: 'mountain',
          short: { fr: 'Vallée de l’Atlas et cascades', en: 'Atlas valley and waterfalls', ar: 'وادٍ في الأطلس وشلالات', es: 'Valle del Atlas y cascadas' },
          name: { fr: 'Vallée de l’Ourika', en: 'Ourika Valley', ar: 'وادي أوريكا', es: 'Valle de Ourika' },
          area: { fr: '≈ 1 h au sud', en: '≈ 1 h south', ar: '≈ ساعة جنوباً', es: '≈ 1 h al sur' },
          desc: {
            fr: 'Une vallée de l’Atlas à environ une heure de route. Depuis le village de Setti Fatma, une marche d’environ 1 h 30 mène aux cascades.',
            en: 'An Atlas valley about an hour’s drive away. From the village of Setti Fatma, a walk of about 1½ hours leads to the waterfalls.',
            ar: 'وادٍ في الأطلس على بُعد ساعة تقريباً بالسيارة. من قرية ستي فاطمة، يوصلك مسار مشي يستغرق نحو ساعة ونصف إلى الشلالات.',
            es: 'Un valle del Atlas a una hora en coche. Desde el pueblo de Setti Fatma, una caminata de aproximadamente 1 h 30 lleva a las cascadas.'
          },
          tip: {
            fr: 'Prévoyez de bonnes chaussures : le chemin passe par une série de petits ponts.',
            en: 'Wear good shoes: the path crosses a series of narrow bridges.',
            ar: 'البس حذاءً مريحاً، فالمسار يعبر سلسلة من الجسور الضيقة.',
            es: 'Lleva buen calzado: el camino cruza una serie de puentes estrechos.'
          },
          duration: 480,
          request: { fr: 'une excursion dans la vallée de l’Ourika', en: 'a day trip to the Ourika Valley', ar: 'رحلة إلى وادي أوريكا', es: 'una excursión al valle de Ourika' },
          maps: 'Setti Fatma, Ourika'
        },
        // source: https://tablejourney.com/morocco/cooking-classes/
        // source: https://willflyforfood.net/marrakech-cooking-classes
        // source: https://www.scottdunn.com/us/experiences/cooking-lesson-in-marrakech
        // Half-day workshop with a dada, French–English translation, groups of 8–10. Price given
        // in USD only (about $60): not shown.
        {
          id: 'maison-arabe-cooking',
          icon: 'chef',
          short: { fr: 'Atelier avec une dada marocaine', en: 'A workshop with a Moroccan dada', ar: 'ورشة مع «دادة» مغربية', es: 'Taller con una dada marroquí' },
          name: { fr: 'Cuisine à La Maison Arabe', en: 'Cooking at La Maison Arabe', ar: 'الطبخ في «لا ميزون أراب»', es: 'Cocina en La Maison Arabe' },
          area: { fr: 'Médina', en: 'Medina', ar: 'المدينة العتيقة', es: 'Medina' },
          desc: {
            fr: 'L’atelier de cuisine le plus connu de la ville : une demi-journée avec une dada (cuisinière traditionnelle), traduction en français et en anglais, en petits groupes.',
            en: 'The city’s best-known cooking workshop: half a day with a dada (a traditional cook), with French–English translation, in small groups.',
            ar: 'أشهر ورشة طبخ في المدينة: نصف يوم مع «دادة» (طبّاخة تقليدية)، مع ترجمة بالفرنسية والإنجليزية، وفي مجموعات صغيرة.',
            es: 'El taller de cocina más conocido de la ciudad: medio día con una dada (cocinera tradicional), con traducción al francés y al inglés, en grupos reducidos.'
          },
          tip: {
            fr: 'Réservez à l’avance ; option solidaire : les cours du centre Amal.',
            en: 'Book ahead; for a social-enterprise option, try the Amal Center’s classes.',
            ar: 'احجز مسبقاً، وكخيار تضامني جرّب دروس مركز أمل.',
            es: 'Reserva con antelación; como opción solidaria, las clases del centro Amal.'
          },
          duration: 180,
          maps: 'La Maison Arabe, Marrakech'
        },
        // source: https://simply-morocco.com/scams-in-marrakech/
        // "Hire only official licensed guides."
        // TODO (host): kind 'request' says you can arrange an official guide. If you cannot,
        // remove `kind` and `request` (or the whole item).
        {
          id: 'official-guide',
          photo: 'jemaa',
          icon: 'map',
          short: { fr: 'Un guide officiel pour la médina', en: 'An official guide for the medina', ar: 'مرشد رسمي للمدينة العتيقة', es: 'Un guía oficial para la medina' },
          kind: 'request',
          name: { fr: 'Guide officiel', en: 'Official guide', ar: 'مرشد رسمي', es: 'Guía oficial' },
          area: { fr: 'Sur demande', en: 'On request', ar: 'عند الطلب', es: 'Bajo petición' },
          desc: {
            fr: 'Pour une première visite de la médina, un guide officiel vous évite les faux guides et les détours imposés.',
            en: 'For a first visit to the medina, an official guide spares you fake guides and unwanted detours.',
            ar: 'في زيارتك الأولى للمدينة العتيقة، يجنّبك المرشد الرسمي المرشدين المزيّفين والمسارات المفروضة عليك.',
            es: 'En una primera visita a la medina, un guía oficial te evita falsos guías y desvíos impuestos.'
          },
          request: { fr: 'un guide officiel pour la médina', en: 'an official guide for the medina', ar: 'مرشداً رسمياً للمدينة العتيقة', es: 'un guía oficial para la medina' }
        }
      ]
    },

    /* ------------------------------------------------------------------ */
    family: {
      icon: 'family', tint: '#4E6B4A',
      type: 'places',
      title: { fr: 'Famille', en: 'Family', ar: 'العائلة', es: 'En familia' },
      intro: {
        fr: 'Eau, verdure et grands espaces : de quoi occuper les enfants, même en été.',
        en: 'Water, greenery and open space: plenty to keep children busy, even in summer.',
        ar: 'ماء وخضرة وفضاءات واسعة: ما يكفي لإسعاد الأطفال حتى في الصيف.',
        es: 'Agua, verde y espacio: planes para los niños, incluso en verano.'
      },
      items: [
        // source: https://www.nomadotravel.app/en/attractions/oasiria-water-park
        // source: https://www.hoteles.com/go/morocco/best-things-with-family-marrakech
        // source: https://marocmama.com/water-parks-in-marrakech/
        // Km 4, route d'Amizmiz; seasonal (about the last Friday of March to the first Sunday of
        // November, per nomadotravel); adult prices quoted 270–300 MAD, varying: not shown.
        {
          id: 'oasiria',
          icon: 'pool',
          short: { fr: 'Le grand parc aquatique, en saison', en: 'The big water park, in season', ar: 'أكبر منتزه مائي، في الموسم', es: 'El gran parque acuático, en temporada' },
          name: { fr: 'Oasiria', ar: 'أوازيريا' },
          area: { fr: 'Route d’Amizmiz', en: 'Amizmiz road', ar: 'طريق أمزميز', es: 'Carretera de Amizmiz' },
          desc: {
            fr: 'Présenté comme le plus grand parc aquatique du Maroc : piscine à vagues, rivière lente et espace pirate pour les petits.',
            en: 'Described as Morocco’s biggest water park: a wave pool, a lazy river and a pirate area for little ones.',
            ar: 'يُقدَّم على أنه أكبر منتزه مائي في المغرب: مسبح أمواج، ونهر بطيء، وفضاء القراصنة للصغار.',
            es: 'Presentado como el mayor parque acuático de Marruecos: piscina de olas, río lento y zona pirata para los pequeños.'
          },
          tip: {
            fr: 'Ouvert en saison, environ de fin mars à début novembre : vérifiez dates et prix sur son site.',
            en: 'Open in season, roughly late March to early November: check dates and prices on its website.',
            ar: 'مفتوح في الموسم، تقريباً من أواخر مارس إلى أوائل نوفمبر، فتحقّق من المواعيد والأسعار على موقعه.',
            es: 'Abre en temporada, aproximadamente de finales de marzo a principios de noviembre: consulta fechas y precios en su web.'
          },
          duration: 300,
          maps: 'Oasiria, Marrakech'
        },
        // source: https://www.lonelyplanet.com/articles/best-parks-marrakesh
        // source: https://ask-aladdin.com/all-destinations/morocco/category/where-to-go-in-morocco/page/top-5-parks-in-marrakesh-that-offer-a-unique-experience
        // Free; near the airport; pavilion reflected in the basin on a clear, calm day.
        {
          id: 'menara',
          icon: 'mountain',
          short: { fr: 'Bassin, pavillon et vue sur l’Atlas', en: 'Pool, pavilion and Atlas views', ar: 'حوض وجناح وإطلالة على الأطلس', es: 'Estanque, pabellón y vistas al Atlas' },
          name: { fr: 'Jardins de la Ménara', en: 'Menara Gardens', ar: 'حدائق المنارة', es: 'Jardines de la Menara' },
          area: { fr: 'Près de l’aéroport', en: 'Near the airport', ar: 'قرب المطار', es: 'Cerca del aeropuerto' },
          desc: {
            fr: 'Un grand bassin au milieu des vergers, avec son pavillon au toit vert ; par temps clair, le Haut Atlas se dresse derrière.',
            en: 'A large pool among orchards, with its green-roofed pavilion; on a clear day, the High Atlas rises behind it.',
            ar: 'حوض كبير وسط البساتين وجناحه ذو السقف الأخضر، وفي الأيام الصافية يرتفع الأطلس الكبير خلفه.',
            es: 'Un gran estanque entre huertos, con su pabellón de tejado verde; en días claros, el Alto Atlas se alza detrás.'
          },
          tip: {
            fr: 'Venez par temps clair et sans vent pour voir le pavillon se refléter dans l’eau.',
            en: 'Come on a clear, calm day to see the pavilion reflected in the water.',
            ar: 'تعال في يوم صافٍ وهادئ لترى الجناح منعكساً على الماء.',
            es: 'Ven un día claro y sin viento para ver el pabellón reflejado en el agua.'
          },
          duration: 60, price: 0,
          maps: 'Jardins de la Ménara, Marrakech'
        },
        // source: https://holidayexpert.com/things-to-do/take-a-break-in-cyber-park/
        // source: https://www.lonelyplanet.com/articles/best-parks-marrakesh
        // Free; 18th-century royal garden; free Wi-Fi, not always reliable.
        {
          id: 'cyberpark',
          icon: 'palm',
          short: { fr: 'Parc ombragé et gratuit en ville', en: 'A shady, free park in town', ar: 'حديقة ظليلة ومجانية في المدينة', es: 'Parque con sombra y gratis' },
          name: { fr: 'Cyber Parc', en: 'Cyber Park', ar: 'حديقة السيبر بارك', es: 'Cyber Parc' },
          area: { fr: 'Arsat Moulay Abdeslam', en: 'Arsat Moulay Abdeslam', ar: 'عرصة مولاي عبد السلام', es: 'Arsat Moulay Abdeslam' },
          desc: {
            fr: 'Un ancien jardin royal du XVIIIe siècle devenu parc public : ombre, fontaines et allées, avec un Wi-Fi gratuit pas toujours fiable.',
            en: 'An 18th-century royal garden turned public park: shade, fountains and paths, with free Wi-Fi that is not always reliable.',
            ar: 'حديقة ملكية من القرن الثامن عشر تحوّلت إلى منتزه عمومي: ظلال ونوافير وممرات، مع واي فاي مجاني غير مستقرّ دائماً.',
            es: 'Un antiguo jardín real del siglo XVIII convertido en parque público: sombra, fuentes y paseos, con Wi-Fi gratis no siempre fiable.'
          },
          duration: 45, price: 0,
          maps: 'Cyber Parc Arsat Moulay Abdeslam, Marrakech'
        },
        // source: https://www.routard.com/fr/guide/a/transports/afrique/maroc/marrakech
        // source: https://www.lonelyplanet.fr/destinations/afrique/maroc/marrakech/comment-circuler
        // source: https://www.routard.com/forums/t/caleches-marrakech/8659
        // Official rates on a board at the head of the rank, per carriage. Routard and Lonely
        // Planet give different prices, so none is printed. Main rank: place Foucauld.
        {
          id: 'caleche',
          icon: 'wheel',
          short: { fr: 'La ville au pas des chevaux', en: 'The city at a horse’s pace', ar: 'المدينة على إيقاع الخيول', es: 'La ciudad al paso de los caballos' },
          name: { fr: 'Tour en calèche', en: 'Horse-drawn carriage ride', ar: 'جولة في عربة خيول', es: 'Paseo en calesa' },
          area: { fr: 'Près de Jemaa el-Fna', en: 'Near Jemaa el-Fna', ar: 'قرب جامع الفنا', es: 'Cerca de Jemaa el-Fna' },
          desc: {
            fr: 'Un tour de la médina et des remparts en calèche, que les enfants adorent. Le prix vaut pour la calèche, quel que soit le nombre de passagers.',
            en: 'A carriage ride around the medina and its walls, which children love. The price is per carriage, however many passengers.',
            ar: 'جولة حول المدينة العتيقة وأسوارها في عربة خيول يحبّها الأطفال. الثمن للعربة كلها مهما كان عدد الركاب.',
            es: 'Un paseo en calesa por la medina y las murallas, que encanta a los niños. El precio es por calesa, sea cual sea el número de pasajeros.'
          },
          tip: {
            fr: 'Les tarifs officiels sont affichés en tête de file : faites répéter le prix total avant de monter.',
            en: 'Official rates are posted at the head of the rank: have the full price repeated before you get in.',
            ar: 'الأسعار الرسمية معلّقة في رأس الصف، فاطلب تأكيد الثمن الإجمالي قبل الركوب.',
            es: 'Las tarifas oficiales están en un cartel al inicio de la fila: haz que te repitan el precio total antes de subir.'
          },
          duration: 45,
          maps: 'Place Foucauld, Marrakech'
        },
        // source: https://www.headout.com/fr/jardin-secret/billet-dentree-au-jardin-secret-e-40087/
        // source: https://medias24.com/2016/10/17/marrakech-le-jardin-secret-ouvre-ses-portes-apres-3-ans-de-travaux/
        {
          id: 'jardin-secret-family',
          icon: 'drop',
          short: { fr: 'Gratuit pour les moins de 12 ans', en: 'Free for under-12s', ar: 'مجاني لمن هم دون 12 سنة', es: 'Gratis para menores de 12 años' },
          name: { fr: 'Le Jardin Secret en famille', en: 'Le Jardin Secret with children', ar: 'الحديقة السرية مع الأطفال', es: 'Le Jardin Secret en familia' },
          area: { fr: 'Mouassine · Médina', en: 'Mouassine · Medina', ar: 'المواسين · المدينة العتيقة', es: 'Mouassine · Medina' },
          desc: {
            fr: 'Deux jardins à explorer et une tour avec vue, au calme au milieu de la médina.',
            en: 'Two gardens to explore and a tower with a view, a calm spot in the middle of the medina.',
            ar: 'حديقتان للاستكشاف وبرج بإطلالة، في ركن هادئ وسط المدينة العتيقة.',
            es: 'Dos jardines para explorar y una torre con vistas, un rincón tranquilo en plena medina.'
          },
          duration: 60,
          maps: 'Le Jardin Secret, Marrakech'
        }
      ]
    },

    /* ------------------------------------------------------------------ */
    transport: {
      icon: 'car', tint: '#A1423A',
      type: 'info',
      title: { fr: 'Transport', en: 'Getting around', ar: 'التنقّل', es: 'Transporte' },
      sub: { fr: 'Taxi · Bus · Aéroport · Train', en: 'Taxi · Bus · Airport · Train', ar: 'طاكسي · حافلة · مطار · قطار', es: 'Taxi · Bus · Aeropuerto · Tren' },
      intro: {
        fr: 'Les repères pour circuler à Marrakech.',
        en: 'The basics for getting around Marrakech.',
        ar: 'أساسيات التنقّل في مراكش.',
        es: 'Lo básico para moverse por Marrakech.'
      },
      blocks: [
        // source: https://en.wikipedia.org/wiki/Taxis_of_Morocco
        // source: https://www.expat.com/fr/forum/afrique/maroc/649368-petit-lexique-conseils-pratiques-pour-nouveaux-arrivants.html
        // source: https://www.expat.com/en/guide/africa/morocco/924-taking-taxis-in-marrakech.html
        // source: https://marocmama.com/marrakech-scams-the-taxi-scam-and-how-to-avoid-it/
        // source: https://www.thetraveler.org/marrakech-airport-taxi-guide-fares-driver-tips/
        // source: https://travelfeed.com/@katecarter/how-to-take-a-taxi-in-marrakech-a-traveler-s-story
        // Colour: "ochre yellow" (Wikipedia), "ocre (beige)" (expat forum), "yellow" elsewhere.
        // Night tariff about +50 % (one source: 20:00–06:00).
        {
          title: { fr: 'Petits taxis', en: 'Petits taxis', ar: 'الطاكسيات الصغيرة', es: 'Petits taxis' },
          icon: 'car',
          key: { fr: 'Demandez le compteur', en: 'Ask for the meter', ar: 'اطلب تشغيل العدّاد', es: 'Pide el taxímetro' },
          list: [
            { fr: 'De couleur ocre (beige), ils circulent partout en ville. Demandez « le compteur » au départ.', en: 'Ochre (beige) in colour, they run everywhere in town. Ask for “le compteur” (the meter) when you get in.', ar: 'لونها أصفر ترابي (بيج)، وتجوب المدينة كلها. اطلب تشغيل «العدّاد» عند الانطلاق.', es: 'De color ocre (beige), circulan por toda la ciudad. Pide «le compteur» (el taxímetro) al subir.' },
            { fr: 'Trois passagers maximum. « Compteur en panne » ? Prenez-en un autre.', en: 'Three passengers maximum. “The meter is broken”? Take another one.', ar: 'ثلاثة ركاب كحدّ أقصى. «العدّاد معطّل»؟ استقلّ طاكسياً آخر.', es: 'Tres pasajeros como máximo. ¿«El taxímetro no funciona»? Toma otro.' },
            { fr: 'La nuit, le tarif augmente d’environ 50 %. Payez en espèces, avec de la petite monnaie.', en: 'At night the fare goes up by about 50%. Pay in cash, with small change.', ar: 'ليلاً ترتفع التعريفة بنحو 50٪. ادفع نقداً وبقطع نقدية صغيرة.', es: 'Por la noche la tarifa sube un 50 % aprox. Paga en efectivo, con cambio pequeño.' },
            { fr: 'Les chauffeurs connaissent mal les noms de rue : donnez un lieu connu proche de votre destination.', en: 'Drivers may not know street names: give a well-known place near where you are going.', ar: 'قد لا يعرف السائقون أسماء الشوارع، فاذكر مكاناً معروفاً قرب وجهتك.', es: 'Los conductores no siempre conocen las calles: da un lugar conocido cerca de tu destino.' }
          ]
        },
        // source: https://www.nomadlawyer.org/marrakech-airport-taxi-guide-fares-driver-tips-2026
        // source: https://www.thetraveler.org/marrakech-airport-taxi-guide-fares-driver-tips/
        // source: https://telquel.ma/2025/11/27/uber-annonce-officiellement-son-retour-au-maroc-a-la-veille-de-la-can-2025_1962895
        // source: https://www.uber.com/en-MA/newsroom/uber-in-morocco
        // source: https://medias24.com/2025/11/27/uber-reprend-du-service-au-maroc-a-casablanca-et-marrakech-1585009/
        // Uber's own newsroom: relaunched 27 Nov 2025 in Marrakech and Casablanca (UberX, UberXL),
        // licensed vehicles only. "InDrive also operates in Marrakech" (nomadlawyer, thetraveler).
        {
          title: { fr: 'Applications de VTC', en: 'Ride-hailing apps', ar: 'تطبيقات النقل', es: 'Apps de VTC' },
          icon: 'phone',
          key: { fr: 'Uber ou inDrive', en: 'Uber or inDrive', ar: 'Uber أو inDrive', es: 'Uber o inDrive' },
          body: {
            fr: 'Uber, de retour au Maroc fin 2025, fonctionne à Marrakech, tout comme inDrive. Le prix s’affiche avant la course.',
            en: 'Uber, back in Morocco since late 2025, works in Marrakech, as does inDrive. The price shows before the ride.',
            ar: 'يعمل Uber، الذي عاد إلى المغرب أواخر 2025، في مراكش، وكذلك inDrive. يظهر الثمن قبل الرحلة.',
            es: 'Uber, de vuelta en Marruecos desde finales de 2025, funciona en Marrakech, igual que inDrive. El precio aparece antes del viaje.'
          }
        },
        // source: https://www.cestujlevne.com/letiste/marrakes/doprava
        // source: https://www.wandernundmehr.at/faq/wie-viel-kostet-der-flughafenbus-in-marrakesch
        // source: https://cep24.uca.ma/1632-2/
        // source: https://www.nomadotravel.app/en/guides/marrakech-airport-transfer-guide
        // source: https://www.thetraveler.org/marrakech-airport-taxi-guide-fares-driver-tips/
        // source: https://www.pointswithacrew.com/how-to-use-marrakech-airport-bus-19-to-marrakech-city-center-a-step-by-step-guide/
        // source: https://airconnect.live/en/airports/marrakech-airport-transport-guide
        // Bus 19: 30 MAD one way (return 50 MAD per one source), every 20–30 min; hours differ by
        // source (to ~21:30 or ~23:30). How to pay differs (driver, kiosk, or on board by card):
        // the text only says to carry cash. Operator not named (not confirmed). Taxi 70–100 MAD by day.
        {
          title: { fr: 'Aéroport Marrakech-Ménara', en: 'Marrakech Menara Airport', ar: 'مطار مراكش المنارة', es: 'Aeropuerto Marrakech-Menara' },
          icon: 'plane',
          key: { fr: 'Bus 19 · ≈ 30 MAD', en: 'Bus 19 · ≈ 30 MAD', ar: 'الحافلة 19 · ≈ 30 درهماً', es: 'Bus 19 · ≈ 30 MAD' },
          list: [
            { fr: 'Bus ligne 19 : environ 30 MAD l’aller ; prévoyez des espèces. Il passe par Jemaa el-Fna et la gare toutes les 20 à 30 minutes ; vérifiez les horaires.', en: 'Bus line 19: about 30 MAD one way; carry cash. It stops at Jemaa el-Fna and the railway station every 20 to 30 minutes; check the times.', ar: 'الحافلة رقم 19: نحو 30 درهماً للذهاب، فاحمل معك نقوداً. تمرّ بجامع الفنا ومحطة القطار كل 20 إلى 30 دقيقة، فتحقّق من المواعيد.', es: 'Bus línea 19: unos 30 MAD la ida; lleva efectivo. Pasa por Jemaa el-Fna y la estación de tren cada 20 a 30 minutos; consulta los horarios.' },
            { fr: 'Taxi : environ 70 à 100 MAD de jour vers la médina ou Guéliz, davantage la nuit. Convenez du prix avant de partir.', en: 'Taxi: about 70 to 100 MAD by day to the medina or Guéliz, more at night. Agree the price before you leave.', ar: 'الطاكسي: نحو 70 إلى 100 درهم نهاراً نحو المدينة العتيقة أو جليز، وأكثر ليلاً. اتفق على الثمن قبل الانطلاق.', es: 'Taxi: unos 70 a 100 MAD de día a la medina o Guéliz, más de noche. Acuerda el precio antes de salir.' },
            { fr: 'Transfert privé : {host} peut l’organiser pour vous.', en: 'Private transfer: {host} can arrange it for you.', ar: 'نقل خاص: يمكن لـ{host} تنظيمه لك.', es: 'Traslado privado: {host} puede organizarlo.' }
          ],
          request: { fr: 'un transfert aéroport', en: 'an airport transfer', ar: 'نقلاً من/إلى المطار', es: 'un traslado al aeropuerto' }
        },
        // source: https://www.nomadotravel.app/en/guides/marrakech-to-casablanca-guide
        // source: https://www.rome2rio.com/s/Ma%C3%A2rif/Marrakesh
        // Station in Guéliz, avenue Hassan II; about 2 h 39 to 3 h to Casa Voyageurs. "Every 2 hours"
        // rests on one guide: the text says "several a day". Check the timetable on oncf.ma.
        {
          title: { fr: 'Gare de Marrakech', en: 'Marrakech railway station', ar: 'محطة قطار مراكش', es: 'Estación de tren de Marrakech' },
          icon: 'train',
          key: { fr: 'Casablanca ≈ 2 h 40', en: 'Casablanca ≈ 2 h 40', ar: 'الدار البيضاء ≈ ساعتان و40 دقيقة', es: 'Casablanca ≈ 2 h 40' },
          body: {
            fr: 'La gare ONCF est à Guéliz, avenue Hassan II. Plusieurs trains directs par jour rejoignent Casa Voyageurs en 2 h 40 à 3 h environ.',
            en: 'The ONCF station is in Guéliz, on Avenue Hassan II. Several direct trains a day reach Casa Voyageurs in about 2 h 40 to 3 h.',
            ar: 'تقع محطة ONCF في جليز بشارع الحسن الثاني. تصل عدة قطارات مباشرة يومياً إلى محطة الدار البيضاء المسافرين في نحو ساعتين و40 دقيقة إلى 3 ساعات.',
            es: 'La estación de ONCF está en Guéliz, en la avenida Hassan II. Varios trenes directos al día llegan a Casa Voyageurs en unas 2 h 40 a 3 h.'
          },
          list: [
            { fr: 'Arrivez au moins 15 minutes avant le départ, plus pendant l’Aïd et les vacances d’été.', en: 'Arrive at least 15 minutes before departure, more during Eid and the summer holidays.', ar: 'احضر قبل الانطلاق بربع ساعة على الأقل، وأبكر من ذلك في العيد والعطلة الصيفية.', es: 'Llega al menos 15 minutos antes de la salida, más en el Aíd y en vacaciones de verano.' }
          ]
        },
        // source: https://www.routard.com/fr/guide/a/transports/afrique/maroc/marrakech
        // source: https://www.routard.com/forums/t/caleches-marrakech/8659
        // source: https://www.lonelyplanet.fr/destinations/afrique/maroc/marrakech/comment-circuler
        {
          title: { fr: 'Calèches', en: 'Horse carriages', ar: 'عربات الخيول', es: 'Calesas' },
          icon: 'wheel',
          key: { fr: 'Prix affiché, à confirmer', en: 'Posted price, confirm first', ar: 'سعر معلّق، أكّده أولاً', es: 'Precio a la vista, confírmalo' },
          body: {
            fr: 'Les calèches attendent près de Jemaa el-Fna. Les tarifs officiels sont affichés en tête de file et valent pour la calèche entière : faites confirmer le prix total avant de monter.',
            en: 'Carriages wait near Jemaa el-Fna. Official rates are posted at the head of the rank and apply to the whole carriage: confirm the total price before you get in.',
            ar: 'تنتظر العربات قرب جامع الفنا. الأسعار الرسمية معلّقة في رأس الصف وتخصّ العربة كاملة، فأكّد الثمن الإجمالي قبل الركوب.',
            es: 'Las calesas esperan cerca de Jemaa el-Fna. Las tarifas oficiales están a la vista al inicio de la fila y valen para toda la calesa: confirma el precio total antes de subir.'
          }
        }
      ]
    },

    /* ------------------------------------------------------------------ */
    itineraries: {
      icon: 'map', tint: '#2C5A55',
      type: 'routes',
      title: { fr: 'Itinéraires', en: 'Itineraries', ar: 'مسارات', es: 'Itinerarios' },
      intro: {
        fr: 'Des journées déjà organisées. Chaque parcours s’ouvre dans Google Maps en un geste.',
        en: 'Days already planned for you. Each route opens in Google Maps in one tap.',
        ar: 'أيام منظّمة مسبقاً. يُفتح كل مسار في خرائط Google بلمسة واحدة.',
        es: 'Días ya organizados. Cada ruta se abre en Google Maps con un toque.'
      },
      items: [
        // Every stop is an item above, with its own source.
        {
          id: 'medina-day',
          photo: 'ben-youssef',
          title: { fr: 'Une journée dans la médina', en: 'A day in the medina', ar: 'يوم في المدينة العتيقة', es: 'Un día en la medina' },
          duration: { fr: 'Journée · à pied', en: 'Full day · on foot', ar: 'يوم كامل · مشياً', es: 'Día completo · a pie' },
          intro: {
            fr: 'Les grands lieux de la médina, puis le coucher du soleil et le dîner sur Jemaa el-Fna. Prenez un taxi jusqu’au premier arrêt.',
            en: 'The medina’s great sights, then sunset and dinner on Jemaa el-Fna. Take a taxi to the first stop.',
            ar: 'أبرز معالم المدينة العتيقة، ثم الغروب والعشاء في جامع الفنا. خذ طاكسياً حتى المحطة الأولى.',
            es: 'Los grandes lugares de la medina, luego el atardecer y la cena en Jemaa el-Fna. Toma un taxi hasta la primera parada.'
          },
          mode: 'walking',
          stops: [
            { time: '09:30', title: { fr: 'Médersa Ben Youssef', en: 'Ben Youssef Madrasa', ar: 'مدرسة ابن يوسف', es: 'Madrasa Ben Youssef' }, text: { fr: 'Ouverte dès 9 h, plus calme le matin.', en: 'Opens at 9 am, calmer in the morning.', ar: 'تفتح من التاسعة، وهي أهدأ صباحاً.', es: 'Abre a las 9:00, más tranquila por la mañana.' }, maps: 'Médersa Ben Youssef, Marrakech' },
            { time: '10:45', title: { fr: 'Le Jardin Secret', en: 'Le Jardin Secret', ar: 'الحديقة السرية', es: 'Le Jardin Secret' }, text: { fr: 'Les deux jardins, puis la vue depuis la tour.', en: 'The two gardens, then the view from the tower.', ar: 'الحديقتان، ثم الإطلالة من البرج.', es: 'Los dos jardines y luego la vista desde la torre.' }, maps: 'Le Jardin Secret, Marrakech' },
            { time: '12:30', title: { fr: 'Déjeuner à Rahba Kedima', en: 'Lunch at Rahba Kedima', ar: 'الغداء في الرحبة القديمة', es: 'Almuerzo en Rahba Kedima' }, text: { fr: 'Nomad ou le Café des Épices, sur la place des épices.', en: 'Nomad or Café des Épices, on the spice square.', ar: 'نوماد أو مقهى التوابل، في ساحة التوابل.', es: 'Nomad o el Café des Épices, en la plaza de las especias.' }, maps: 'Rahba Kedima, Marrakech' },
            { time: '14:00', title: { fr: 'Souks Semmarine et teinturiers', en: 'Semmarine and dyers’ souks', ar: 'سوق السمّارين والصبّاغين', es: 'Zocos Semmarine y tintoreros' }, text: { fr: 'Flânez, comparez, négociez avec le sourire.', en: 'Wander, compare, bargain with a smile.', ar: 'تجوّل وقارن وساوم بابتسامة.', es: 'Pasea, compara y regatea con una sonrisa.' }, maps: 'Souk Semmarine, Marrakech' },
            { time: '17:00', rel: -75, title: { fr: 'Koutoubia et ses jardins', en: 'The Koutoubia and its gardens', ar: 'الكتبية وحدائقها', es: 'La Koutoubia y sus jardines' }, text: { fr: 'Le minaret et les jardins Lalla Hasna.', en: 'The minaret and the Lalla Hasna gardens.', ar: 'الصومعة وحدائق للا حسناء.', es: 'El minarete y los jardines Lalla Hasna.' }, maps: 'Mosquée Koutoubia, Marrakech' },
            { time: '17:50', rel: -25, title: { fr: 'Le Grand Balcon du Café Glacier', en: 'Le Grand Balcon du Café Glacier', ar: 'شرفة مقهى غلاسيي', es: 'Le Grand Balcon du Café Glacier' }, text: { fr: 'Un thé au balcon pour voir la place s’allumer.', en: 'Tea on the balcony to watch the square light up.', ar: 'شاي على الشرفة لمشاهدة الساحة وهي تتلألأ.', es: 'Un té en el balcón para ver la plaza encenderse.' }, maps: 'Café Glacier, Jemaa el-Fna, Marrakech' },
            { time: '18:45', rel: 30, title: { fr: 'Dîner sur Jemaa el-Fna', en: 'Dinner on Jemaa el-Fna', ar: 'العشاء في جامع الفنا', es: 'Cena en Jemaa el-Fna' }, text: { fr: 'Les stands de cuisine de la place.', en: 'The food stalls on the square.', ar: 'أكشاك الطعام في الساحة.', es: 'Los puestos de comida de la plaza.' }, maps: 'Place Jemaa el-Fna, Marrakech' }
          ]
        },
        {
          id: 'gueliz-majorelle',
          photo: 'majorelle',
          title: { fr: 'Majorelle et Guéliz', en: 'Majorelle and Guéliz', ar: 'ماجوريل وجليز', es: 'Majorelle y Guéliz' },
          duration: { fr: 'Demi-journée · taxi', en: 'Half day · taxi', ar: 'نصف يوم · طاكسي', es: 'Medio día · taxi' },
          intro: {
            fr: 'Le côté moderne de la ville : le jardin bleu, un déjeuner à Guéliz et l’artisanat à prix fixes.',
            en: 'The modern side of town: the blue garden, lunch in Guéliz and crafts at fixed prices.',
            ar: 'الوجه العصري للمدينة: الحديقة الزرقاء وغداء في جليز وصناعة تقليدية بأسعار ثابتة.',
            es: 'La cara moderna de la ciudad: el jardín azul, un almuerzo en Guéliz y artesanía a precio fijo.'
          },
          mode: 'driving', fromHome: true,
          stops: [
            { time: '09:30', title: { fr: 'Jardin Majorelle', en: 'Majorelle Garden', ar: 'حديقة ماجوريل', es: 'Jardín Majorelle' }, text: { fr: 'Votre créneau réservé en ligne, puis le musée Yves Saint Laurent.', en: 'Your slot booked online, then the Yves Saint Laurent Museum.', ar: 'موعدك المحجوز عبر الإنترنت، ثم متحف إيف سان لوران.', es: 'Tu franja reservada en línea y luego el Museo Yves Saint Laurent.' }, maps: 'Jardin Majorelle, Marrakech' },
            { time: '12:30', title: { fr: 'Déjeuner à Guéliz', en: 'Lunch in Guéliz', ar: 'الغداء في جليز', es: 'Almuerzo en Guéliz' }, text: { fr: 'Al Fassia ou +61.', en: 'Al Fassia or +61.', ar: 'الفاسية أو Plus61.', es: 'Al Fassia o +61.' }, maps: 'Al Fassia Guéliz, Marrakech' },
            { time: '14:30', title: { fr: 'Ensemble Artisanal', en: 'Ensemble Artisanal', ar: 'المجمّع الحرفي', es: 'Ensemble Artisanal' }, text: { fr: 'Les prix fixes, un bon repère avant les souks.', en: 'Fixed prices, a good benchmark before the souks.', ar: 'أسعار ثابتة، مرجع جيد قبل الأسواق.', es: 'Precios fijos, una buena referencia antes de los zocos.' }, maps: 'Ensemble Artisanal, Marrakech' },
            { time: '15:30', title: { fr: 'Cyber Parc', en: 'Cyber Park', ar: 'حديقة السيبر بارك', es: 'Cyber Parc' }, text: { fr: 'Une pause à l’ombre pour finir.', en: 'A rest in the shade to finish.', ar: 'استراحة في الظل للختام.', es: 'Un descanso a la sombra para terminar.' }, maps: 'Cyber Parc Arsat Moulay Abdeslam, Marrakech' }
          ]
        }
      ]
    }
  }
};
