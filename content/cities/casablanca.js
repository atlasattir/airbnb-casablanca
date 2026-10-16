/*
 * Atlas Stays — Casablanca, shared by the four places in and around the city
 * (Bourgogne 133, Casa B Suites, Ocean 21, DarB Inn).
 *
 * Each menu button opens one section. Section types:
 *   places → a list of addresses (items)
 *   routes → ready-made itineraries (items with stops)
 *   info   → practical blocks (blocks)
 *
 * Place fields: id (unique in the city, used by favourites), name, area, tags
 * (for filters), desc, tip, duration (minutes), price (MAD; 0 = free), priceFrom,
 * budget (1–3), maps (Google Maps search text).
 * kind: 'note' for an explainer card, 'placeholder' for a slot the host still has
 * to fill, 'request' for something the host can organise (opens WhatsApp).
 * areas: ['bourgogne'] shows an item only to the places of those neighbourhoods.
 *
 * Itinerary stops may carry rel: minutes before (negative) or after today's
 * sunset; the app then shows the real time for the day instead of 'time'.
 * fromHome: the route starts at the guest's own address.
 *
 * Prices and opening hours change: check each place before publishing,
 * then update the "checked" date. Last full check: 2026-10.
 */
window.CASA = window.CASA || {};
CASA.cities = CASA.cities || {};

CASA.cities.casablanca = {
  checked: '2026-10',
  name: { fr: 'Casablanca', en: 'Casablanca', ar: 'الدار البيضاء', es: 'Casablanca' },
  // Used by the airport-transfer service: "Un chauffeur depuis {airport}"
  airport: { fr: 'l’aéroport Mohammed V', en: 'Mohammed V Airport', ar: 'مطار محمد الخامس', es: 'el aeropuerto Mohammed V' },
  // film: 'brand' plays the film of content/brand.js; null shows the drawing only.
  // scene: the drawing shown while the film loads or when it cannot play:
  // 'atlantic' (ocean and minaret), 'sea' (sea only) or 'plain' (sky only).
  film: 'brand',
  scene: 'atlantic',

  /* Per neighbourhood: the addresses within walking distance ("À pied" badge
     and walking directions). Ids refer to the items below. */
  areas: {
    bourgogne: { near: ['hassan2', 'elhank', 'cabestan', 'sunset-elhank', 'corniche', 'corniche-family', 'mosque-night'] },
    'ain-diab': { near: ['anfaplace', 'corniche', 'corniche-family', 'corniche-night', 'anfaplace-beach'] },
    'dar-bouazza': { near: [] }
  },

  /* The city's group of buttons on the home screen. 'wide' buttons take a full row. */
  group: {
    title: { fr: 'Que souhaitez-vous faire aujourd’hui ?', en: 'What would you like to do today?', ar: 'ماذا تودّ أن تفعل اليوم؟', es: '¿Qué te apetece hacer hoy?' },
    items: ['visit', 'restaurants', 'cafes', 'nightlife', 'shopping', 'beaches', 'family', 'experiences', 'transport', 'itineraries'],
    wide: ['visit', 'itineraries']
  },

  sections: {

    /* ------------------------------------------------------------------ */
    visit: {
      icon: 'arch', tint: '#876A41',
      type: 'places',
      title: { fr: 'À visiter', en: 'Places to visit', ar: 'أماكن للزيارة', es: 'Qué visitar' },
      intro: {
        fr: 'Huit lieux pour comprendre Casablanca, de l’océan à l’Art déco.',
        en: 'Eight places to understand Casablanca, from the ocean to Art Deco.',
        ar: 'ثمانية أماكن لفهم الدار البيضاء، من المحيط إلى فن الآرت ديكو.',
        es: 'Ocho lugares para entender Casablanca, del océano al art déco.'
      },
      items: [
        {
          id: 'hassan2',
          icon: 'minaret',
          short: { fr: 'Ouverte aux non-musulmans, visite guidée', en: 'Open to non-Muslims, guided tours', ar: 'زيارات بمرشد لغير المسلمين', es: 'Visitas guiadas para no musulmanes' },
          name: { fr: 'Mosquée Hassan II', en: 'Hassan II Mosque', ar: 'مسجد الحسن الثاني', es: 'Mezquita Hassan II' },
          area: { fr: 'Front de mer', en: 'Seafront', ar: 'الواجهة البحرية', es: 'Frente al mar' },
          desc: {
            fr: 'Construite au bord de l’Atlantique, avec un minaret de 210 mètres. C’est l’une des rares mosquées du Maroc ouvertes aux non-musulmans, en visite guidée.',
            en: 'Built on the edge of the Atlantic, with a 210-metre minaret. One of the few mosques in Morocco open to non-Muslims, on a guided tour.',
            ar: 'شُيّد على ضفاف المحيط الأطلسي بصومعة يبلغ علوّها 210 أمتار. من المساجد القليلة في المغرب المفتوحة لغير المسلمين عبر زيارة مرشدة.',
            es: 'Construida al borde del Atlántico, con un minarete de 210 metros. Es una de las pocas mezquitas de Marruecos abiertas a no musulmanes, con visita guiada.'
          },
          tip: {
            fr: 'Visites d’environ 45 minutes, plusieurs fois par jour (moins le vendredi). Épaules et genoux couverts ; on retire ses chaussures à l’entrée.',
            en: 'Tours last about 45 minutes and run several times a day (fewer on Fridays). Cover shoulders and knees; shoes come off at the entrance.',
            ar: 'تدوم الزيارة نحو 45 دقيقة وتُنظَّم عدة مرات يومياً (أقل يوم الجمعة). يُرجى ستر الكتفين والركبتين، وتُخلع الأحذية عند المدخل.',
            es: 'Las visitas duran unos 45 minutos y hay varias al día (menos los viernes). Hombros y rodillas cubiertos; los zapatos se quitan en la entrada.'
          },
          duration: 90, price: 130,
          maps: 'Mosquée Hassan II, Casablanca'
        },
        {
          id: 'elhank',
          icon: 'lighthouse',
          short: { fr: 'Le couchant depuis les rochers', en: 'Sunset from the rocks', ar: 'الغروب من فوق الصخور', es: 'Atardecer desde las rocas' },
          name: { fr: 'Phare d’El Hank', en: 'El Hank Lighthouse', ar: 'منارة العنق', es: 'Faro de El Hank' },
          area: { fr: 'El Hank', ar: 'العنق' },
          desc: {
            fr: 'Le grand phare blanc de la pointe d’El Hank, en service depuis plus d’un siècle. Les rochers autour offrent l’un des plus beaux couchers de soleil de la ville.',
            en: 'The tall white lighthouse on El Hank point, in service for more than a century. The rocks around it give one of the best sunsets in the city.',
            ar: 'المنارة البيضاء الشامخة على رأس العنق، تعمل منذ أكثر من قرن. الصخور المحيطة بها تمنحك واحداً من أجمل مشاهد الغروب في المدينة.',
            es: 'El gran faro blanco de la punta de El Hank, en servicio desde hace más de un siglo. Las rocas de alrededor ofrecen una de las mejores puestas de sol de la ciudad.'
          },
          tip: {
            fr: 'Venez 30 minutes avant le coucher du soleil, puis continuez à pied le long de la Corniche.',
            en: 'Arrive 30 minutes before sunset, then walk on along the Corniche.',
            ar: 'تعال قبل الغروب بنصف ساعة، ثم واصل المشي على طول الكورنيش.',
            es: 'Llega 30 minutos antes del atardecer y sigue a pie por la Corniche.'
          },
          duration: 30, price: 0, sunset: true,
          maps: 'Phare d\'El Hank, Casablanca'
        },
        {
          id: 'medina',
          icon: 'gate',
          short: { fr: 'Vie de quartier, sans foule', en: 'Neighbourhood life, no tourist crowds', ar: 'حياة الحيّ بلا زحام سياحي', es: 'Vida de barrio, sin multitudes' },
          name: { fr: 'Ancienne Médina', en: 'Old Medina', ar: 'المدينة القديمة', es: 'Antigua medina' },
          area: { fr: 'Port', en: 'Port', ar: 'الميناء', es: 'Puerto' },
          desc: {
            fr: 'Le cœur historique de Casablanca, derrière ses remparts face au port : ruelles, petits commerces et vraie vie de quartier, sans la foule touristique d’autres médinas.',
            en: 'Casablanca’s historic heart, behind its walls facing the port: narrow lanes, small shops and real neighbourhood life, without the tourist crowds of other medinas.',
            ar: 'القلب التاريخي للدار البيضاء خلف أسوارها المطلّة على الميناء: أزقّة ضيقة ومحلات صغيرة وحياة حيّ حقيقية، بعيداً عن زحام السياح.',
            es: 'El corazón histórico de Casablanca, tras sus murallas frente al puerto: callejuelas, pequeñas tiendas y vida de barrio auténtica, sin las multitudes de otras medinas.'
          },
          tip: {
            fr: 'Visitez-la de jour. Gardez téléphone et portefeuille dans une poche avant dans les ruelles animées.',
            en: 'Go during the day. Keep your phone and wallet in a front pocket in busy lanes.',
            ar: 'زُرها نهاراً، واحتفظ بهاتفك ومحفظتك في جيب أمامي في الأزقة المزدحمة.',
            es: 'Visítala de día. Lleva el móvil y la cartera en un bolsillo delantero en las calles concurridas.'
          },
          duration: 90, price: 0,
          maps: 'Ancienne Médina, Casablanca'
        },
        {
          id: 'habous',
          icon: 'arch',
          short: { fr: 'Arcades blanches et souvenirs', en: 'White arcades and souvenirs', ar: 'أقواس بيضاء وهدايا تذكارية', es: 'Arcadas blancas y recuerdos' },
          name: { fr: 'Quartier des Habous', en: 'Habous Quarter', ar: 'حي الأحباس', es: 'Barrio de los Habous' },
          area: { fr: 'Habous', ar: 'الأحباس' },
          desc: {
            fr: 'La « nouvelle médina », construite dans les années 1930 : arcades blanches, artisans, marchands d’olives et pâtisseries traditionnelles. Le meilleur endroit pour les souvenirs.',
            en: 'The “new medina”, built in the 1930s: white arcades, craftsmen, olive sellers and traditional pastry shops. The best place for souvenirs.',
            ar: '«المدينة الجديدة» التي شُيّدت في ثلاثينيات القرن الماضي: أقواس بيضاء وحرفيون وباعة زيتون ومحلات حلويات تقليدية. أفضل مكان لشراء الهدايا.',
            es: 'La «nueva medina», construida en los años 30: arcadas blancas, artesanos, vendedores de aceitunas y pastelerías tradicionales. El mejor lugar para comprar recuerdos.'
          },
          tip: {
            fr: 'Faites une pause à la Pâtisserie Bennis pour goûter les cornes de gazelle.',
            en: 'Stop at Pâtisserie Bennis to try cornes de gazelle, the famous almond pastries.',
            ar: 'توقّف في حلويات بنيس لتذوّق «كعب الغزال».',
            es: 'Para en la Pâtisserie Bennis y prueba los cuernos de gacela.'
          },
          duration: 120, price: 0,
          maps: 'Quartier Habous, Casablanca'
        },
        {
          id: 'artdeco',
          icon: 'building',
          short: { fr: 'Façades Art déco et ferronneries', en: 'Art Deco façades and ironwork', ar: 'واجهات الآرت ديكو والحديد المشغول', es: 'Fachadas art déco y forja' },
          name: { fr: 'Place Mohammed V et centre Art déco', en: 'Mohammed V Square and the Art Deco centre', ar: 'ساحة محمد الخامس ووسط المدينة', es: 'Plaza Mohammed V y centro art déco' },
          area: { fr: 'Centre-ville', en: 'City centre', ar: 'وسط المدينة', es: 'Centro' },
          desc: {
            fr: 'Casablanca possède l’un des grands ensembles Art déco du monde. Autour de la place Mohammed V et du boulevard du même nom, levez les yeux : façades, ferronneries, horloges.',
            en: 'Casablanca has one of the world’s great collections of Art Deco buildings. Around Mohammed V Square and the boulevard of the same name, look up: façades, ironwork, clock towers.',
            ar: 'تضمّ الدار البيضاء واحدة من أهم مجموعات مباني الآرت ديكو في العالم. حول ساحة محمد الخامس والشارع الذي يحمل اسمه، ارفع نظرك: واجهات وحديد مشغول وساعات.',
            es: 'Casablanca tiene uno de los grandes conjuntos art déco del mundo. Alrededor de la plaza Mohammed V y del bulevar del mismo nombre, mira hacia arriba: fachadas, forja y torres de reloj.'
          },
          tip: {
            fr: 'La lumière du matin est idéale pour les photos. Le tramway s’arrête sur place.',
            en: 'Morning light is best for photos. The tram stops right there.',
            ar: 'ضوء الصباح مثالي للتصوير، والترامواي يتوقف في المكان.',
            es: 'La luz de la mañana es la mejor para las fotos. El tranvía para allí mismo.'
          },
          duration: 90, price: 0,
          maps: 'Place Mohammed V, Casablanca'
        },
        {
          id: 'sacrecoeur',
          icon: 'cathedral',
          short: { fr: 'Néo-gothique et Art déco', en: 'Gothic Revival meets Art Deco', ar: 'بين القوطي الجديد والآرت ديكو', es: 'Neogótico y art déco' },
          name: { fr: 'Cathédrale du Sacré-Cœur', en: 'Sacred Heart Cathedral', ar: 'كاتدرائية القلب المقدس', es: 'Catedral del Sagrado Corazón' },
          area: { fr: 'Centre-ville', en: 'City centre', ar: 'وسط المدينة', es: 'Centro' },
          desc: {
            fr: 'Une cathédrale blanche de 1930 qui mêle néo-gothique et Art déco, devenue lieu culturel. Sa façade est l’une des images de Casablanca.',
            en: 'A white 1930 cathedral mixing Gothic Revival and Art Deco, now a cultural venue. Its façade is one of Casablanca’s signature images.',
            ar: 'كاتدرائية بيضاء تعود إلى سنة 1930 تمزج بين الطراز القوطي الجديد والآرت ديكو، وأصبحت فضاءً ثقافياً. واجهتها من أشهر صور الدار البيضاء.',
            es: 'Una catedral blanca de 1930 que mezcla neogótico y art déco, hoy espacio cultural. Su fachada es una de las imágenes de Casablanca.'
          },
          tip: {
            fr: 'L’accès à l’intérieur dépend des expositions en cours ; la façade se voit à tout moment.',
            en: 'Access inside depends on current exhibitions; the façade can be seen at any time.',
            ar: 'الدخول إلى الداخل مرتبط بالمعارض الجارية، أما الواجهة فيمكن رؤيتها في أي وقت.',
            es: 'El acceso al interior depende de las exposiciones; la fachada se puede ver siempre.'
          },
          duration: 30,
          maps: 'Cathédrale du Sacré-Cœur, Casablanca'
        },
        {
          id: 'slaoui',
          icon: 'museum',
          short: { fr: 'Villa Art déco, bijoux anciens', en: 'Art Deco villa, antique jewellery', ar: 'فيلا آرت ديكو وحُليّ قديمة', es: 'Villa art déco, joyas antiguas' },
          name: { fr: 'Musée Abderrahman Slaoui', ar: 'متحف عبد الرحمن السلاوي' },
          area: { fr: 'Centre-ville', en: 'City centre', ar: 'وسط المدينة', es: 'Centro' },
          desc: {
            fr: 'Une villa Art déco des années 1940 qui abrite la collection d’un grand collectionneur casablancais : bijoux anciens, affiches de voyage, objets d’art.',
            en: 'A 1940s Art Deco villa holding a great Casablanca collector’s treasures: antique jewellery, vintage travel posters and decorative art.',
            ar: 'فيلا على طراز الآرت ديكو من أربعينيات القرن الماضي تضمّ مجموعة أحد كبار جامعي التحف البيضاويين: حُليّ قديمة وملصقات سفر وتحف فنية.',
            es: 'Una villa art déco de los años 40 con la colección de un gran coleccionista de Casablanca: joyas antiguas, carteles de viaje y objetos de arte.'
          },
          tip: {
            fr: 'À cinq minutes à pied du Sacré-Cœur : combinez les deux. Vérifiez les horaires avant d’y aller.',
            en: 'Five minutes on foot from the Sacred Heart, so combine the two. Check opening hours before you go.',
            ar: 'على بُعد خمس دقائق مشياً من كاتدرائية القلب المقدس، فاجمع بين الزيارتين. تحقّق من أوقات الفتح قبل الذهاب.',
            es: 'A cinco minutos a pie del Sagrado Corazón: combina las dos visitas. Consulta el horario antes de ir.'
          },
          duration: 45,
          maps: 'Musée Abderrahman Slaoui, Casablanca'
        },
        {
          id: 'ligue',
          icon: 'palm',
          short: { fr: 'Palmiers, cafés, jeux d’enfants', en: 'Palm-lined paths, cafés, playgrounds', ar: 'نخيل ومقاهٍ وألعاب للأطفال', es: 'Palmeras, cafés y zonas infantiles' },
          name: { fr: 'Parc de la Ligue Arabe', en: 'Arab League Park', ar: 'حديقة الجامعة العربية', es: 'Parque de la Liga Árabe' },
          area: { fr: 'Centre-ville', en: 'City centre', ar: 'وسط المدينة', es: 'Centro' },
          desc: {
            fr: 'Le grand parc de la ville, rénové, avec ses allées de palmiers, ses cafés et ses aires de jeux. Une vraie respiration entre deux visites.',
            en: 'The city’s great park, renovated, with palm-lined paths, cafés and playgrounds. A real breather between visits.',
            ar: 'أكبر حدائق المدينة بعد تجديدها، بممرات النخيل والمقاهي وفضاءات ألعاب الأطفال. استراحة حقيقية بين زيارتين.',
            es: 'El gran parque de la ciudad, renovado, con paseos de palmeras, cafés y zonas infantiles. Un respiro entre visitas.'
          },
          tip: {
            fr: 'Idéal en fin d’après-midi, quand la chaleur retombe.',
            en: 'Best in the late afternoon, when the heat drops.',
            ar: 'مثالية في آخر النهار حين تخفّ الحرارة.',
            es: 'Ideal al final de la tarde, cuando baja el calor.'
          },
          duration: 60, price: 0,
          maps: 'Parc de la Ligue Arabe, Casablanca'
        }
      ]
    },

    /* ------------------------------------------------------------------ */
    restaurants: {
      icon: 'tagine', tint: '#8C4A3B',
      type: 'places',
      title: { fr: 'Restaurants', en: 'Restaurants', ar: 'مطاعم', es: 'Restaurantes' },
      intro: {
        fr: 'Peu d’adresses, mais des valeurs sûres. Choisissez selon votre envie.',
        en: 'Only a few addresses, all reliable. Choose by what you feel like.',
        ar: 'عناوين قليلة لكنها مضمونة. اختر حسب رغبتك.',
        es: 'Pocas direcciones, todas seguras. Elige según lo que te apetezca.'
      },
      filters: [
        { id: 'moroccan', label: { fr: 'Marocain', en: 'Moroccan', ar: 'مغربي', es: 'Marroquí' } },
        { id: 'seafood', label: { fr: 'Poisson', en: 'Seafood', ar: 'سمك', es: 'Pescado' } },
        { id: 'sea', label: { fr: 'Vue mer', en: 'Sea view', ar: 'إطلالة بحرية', es: 'Vistas al mar' } },
        { id: 'chic', label: { fr: 'Chic', en: 'Upscale', ar: 'راقٍ', es: 'Elegante' } },
        { id: 'budget', label: { fr: 'Petit budget', en: 'Budget', ar: 'اقتصادي', es: 'Económico' } }
      ],
      items: [
        {
          id: 'sqala',
          icon: 'tagine',
          short: { fr: 'Tajines au pied des remparts', en: 'Tagines beneath the ramparts', ar: 'طواجن بجوار الأسوار', es: 'Tajines junto a las murallas' },
          name: { fr: 'La Sqala' },
          area: { fr: 'Remparts · Port', en: 'Ramparts · Port', ar: 'الأسوار · الميناء', es: 'Murallas · Puerto' },
          tags: ['moroccan'],
          desc: {
            fr: 'Cuisine marocaine dans un bastion fortifié du XVIIIe siècle, avec un jardin au pied des remparts. Tajines, pastilla et petit-déjeuner marocain.',
            en: 'Moroccan cooking inside an 18th-century fortified bastion, with a garden beneath the ramparts. Tagines, pastilla and Moroccan breakfast.',
            ar: 'مطبخ مغربي داخل برج محصّن يعود إلى القرن الثامن عشر، مع حديقة عند سفح الأسوار. طواجن وبسطيلة وفطور مغربي.',
            es: 'Cocina marroquí en un bastión fortificado del siglo XVIII, con un jardín al pie de las murallas. Tajines, pastela y desayuno marroquí.'
          },
          tip: {
            fr: 'Réservez pour le dîner, surtout le week-end.',
            en: 'Book for dinner, especially at weekends.',
            ar: 'احجز للعشاء، خاصة في نهاية الأسبوع.',
            es: 'Reserva para cenar, sobre todo el fin de semana.'
          },
          budget: 2,
          maps: 'La Sqala, Casablanca'
        },
        {
          id: 'portpeche',
          icon: 'fish',
          short: { fr: 'Poisson du jour, très frais', en: 'The day’s catch, very fresh', ar: 'سمك اليوم، طازج جداً', es: 'Pescado del día, muy fresco' },
          name: { fr: 'Restaurant du Port de Pêche', ar: 'مطعم ميناء الصيد' },
          area: { fr: 'Port', en: 'Port', ar: 'الميناء', es: 'Puerto' },
          tags: ['seafood'],
          desc: {
            fr: 'L’adresse historique du poisson à Casablanca, dans l’enceinte du port. Pas de décor : le poisson du jour, très frais, bien cuisiné.',
            en: 'Casablanca’s classic seafood address, inside the fishing port. No frills: the catch of the day, very fresh and well cooked.',
            ar: 'العنوان التاريخي للسمك في الدار البيضاء، داخل ميناء الصيد. بلا تكلّف: سمك اليوم طازج جداً ومطبوخ بإتقان.',
            es: 'La dirección clásica del pescado en Casablanca, dentro del puerto pesquero. Sin adornos: pescado del día, muy fresco y bien cocinado.'
          },
          tip: {
            fr: 'En petit taxi, demandez simplement « le port de pêche ».',
            en: 'In a petit taxi, just ask for “le port de pêche”.',
            ar: 'في الطاكسي الصغير، اطلب ببساطة «ميناء الصيد» (لو بور دو بيش).',
            es: 'En petit taxi, pide simplemente «le port de pêche».'
          },
          budget: 2,
          maps: 'Restaurant du Port de Pêche, Casablanca'
        },
        {
          id: 'cabestan',
          icon: 'waves',
          short: { fr: 'Élégant, face à l’océan', en: 'Elegant, facing the ocean', ar: 'أنيق في مواجهة المحيط', es: 'Elegante, frente al océano' },
          name: { fr: 'Le Cabestan' },
          area: { fr: 'El Hank · Corniche', ar: 'العنق · الكورنيش' },
          tags: ['sea', 'chic', 'seafood'],
          desc: {
            fr: 'Au pied du phare d’El Hank, face à l’océan. Cuisine méditerranéenne et poissons, cadre élégant, bar au coucher du soleil.',
            en: 'At the foot of El Hank lighthouse, facing the ocean. Mediterranean cooking and seafood, an elegant room and a sunset bar.',
            ar: 'عند سفح منارة العنق، في مواجهة المحيط. مطبخ متوسطي وأسماك، فضاء أنيق وبار وقت الغروب.',
            es: 'Al pie del faro de El Hank, frente al océano. Cocina mediterránea y pescados, ambiente elegante y bar al atardecer.'
          },
          tip: {
            fr: 'Très demandé le week-end : réservez et demandez une table côté mer.',
            en: 'Very busy at weekends: book and ask for a table on the sea side.',
            ar: 'مزدحم جداً في نهاية الأسبوع: احجز واطلب طاولة مطلّة على البحر.',
            es: 'Muy solicitado el fin de semana: reserva y pide una mesa junto al mar.'
          },
          budget: 3,
          maps: 'Le Cabestan, Casablanca'
        },
        {
          id: 'ricks',
          icon: 'music',
          short: { fr: 'Inspiré du film Casablanca', en: 'Inspired by the film Casablanca', ar: 'مستوحى من فيلم «كازابلانكا»', es: 'Inspirado en la película Casablanca' },
          name: { fr: 'Rick’s Café' },
          area: { fr: 'Ancienne Médina', en: 'Old Medina', ar: 'المدينة القديمة', es: 'Antigua medina' },
          tags: ['chic'],
          desc: {
            fr: 'Le restaurant inspiré du film Casablanca, dans une maison à patio restaurée contre les remparts de la médina. Piano le soir, ambiance années 1940.',
            en: 'The restaurant inspired by the film Casablanca, in a restored courtyard house against the medina walls. Piano in the evening, 1940s atmosphere.',
            ar: 'المطعم المستوحى من فيلم «كازابلانكا»، في دار ذات فناء مرمّمة ملاصقة لأسوار المدينة القديمة. عزف على البيانو مساءً وأجواء الأربعينيات.',
            es: 'El restaurante inspirado en la película Casablanca, en una casa con patio restaurada junto a las murallas de la medina. Piano por la noche, ambiente de los años 40.'
          },
          tip: {
            fr: 'On y vient d’abord pour l’atmosphère. Réservation conseillée, tenue soignée appréciée.',
            en: 'You come here for the atmosphere first. Booking advised, smart dress appreciated.',
            ar: 'يُقصد أولاً لأجوائه. يُنصح بالحجز، ويُستحسن اللباس الأنيق.',
            es: 'Se viene sobre todo por el ambiente. Conviene reservar; se agradece ir bien vestido.'
          },
          budget: 3,
          maps: 'Rick\'s Café, Casablanca'
        },
        {
          id: 'dauphin',
          icon: 'fish',
          short: { fr: 'Fritures et prix raisonnables', en: 'Fried fish, fair prices', ar: 'سمك مقلي بأسعار معقولة', es: 'Frituras a precios razonables' },
          name: { fr: 'La Taverne du Dauphin' },
          area: { fr: 'Centre · Port', en: 'Centre · Port', ar: 'الوسط · الميناء', es: 'Centro · Puerto' },
          tags: ['seafood', 'budget'],
          desc: {
            fr: 'Une maison de poisson à l’ancienne près du port, connue pour ses fritures et ses prix raisonnables.',
            en: 'An old-school fish house near the port, known for its fried fish and fair prices.',
            ar: 'مطعم أسماك عريق قرب الميناء، معروف بالسمك المقلي وأسعاره المعقولة.',
            es: 'Una casa de pescado de toda la vida cerca del puerto, conocida por sus frituras y precios razonables.'
          },
          tip: {
            fr: 'Parfait pour un déjeuner simple après la médina.',
            en: 'Perfect for a simple lunch after the medina.',
            ar: 'مثالي لغداء بسيط بعد زيارة المدينة القديمة.',
            es: 'Perfecto para un almuerzo sencillo después de la medina.'
          },
          budget: 2,
          maps: 'La Taverne du Dauphin, Casablanca'
        },
        {
          id: 'marchecentral',
          icon: 'chef',
          short: { fr: 'Poisson grillé, très local', en: 'Grilled fish, very local', ar: 'سمك مشوي، محلّي جداً', es: 'Pescado asado, muy local' },
          name: { fr: 'Marché Central', en: 'Central Market', ar: 'السوق المركزي', es: 'Mercado Central' },
          area: { fr: 'Centre-ville', en: 'City centre', ar: 'وسط المدينة', es: 'Centro' },
          tags: ['seafood', 'budget'],
          desc: {
            fr: 'Choisissez votre poisson aux étals, puis faites-le griller dans l’un des petits restaurants du marché. Simple, vivant, très local.',
            en: 'Pick your fish at the stalls, then have it grilled at one of the small restaurants in the market. Simple, lively, very local.',
            ar: 'اختر سمكك من دكاكين السوق، ثم اطلب شَيّه في أحد المطاعم الصغيرة داخله. بسيط وحيوي ومحلّي جداً.',
            es: 'Elige tu pescado en los puestos y haz que te lo asen en uno de los pequeños restaurantes del mercado. Sencillo, animado y muy local.'
          },
          tip: {
            fr: 'Venez à midi et demandez le prix au kilo avant de choisir.',
            en: 'Come at lunchtime and ask the price per kilo before you choose.',
            ar: 'تعال وقت الغداء واسأل عن ثمن الكيلو قبل الاختيار.',
            es: 'Ven a mediodía y pregunta el precio por kilo antes de elegir.'
          },
          budget: 1,
          maps: 'Marché Central, Casablanca'
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
        },
        // source: https://fr.le360.ma/societe/plages-privees-de-dar-bouazza-sept-etablissements-sous-le-coup-dune-demolition_4XVBT4G5HZARPG7RCNESB3RIRM/
        // (seven private-beach venues listed for demolition: Sunny Beach, Baya Beach (Les 3 Mâts), Seven Beach Balboa 1,
        //  Malibu Beach (Nomade Beach), Atlantic Boulevard, Taloche, Babaloo Beach)
        // source: https://medias24.com/2025/05/15/dar-bouazza-debut-de-la-liberation-du-domaine-public-maritime-demolition-de-deux-restaurants-de-luxe/
        // (operation started on 15 May 2025; Atlantic and Beach House demolished first)
        {
          kind: 'note',
          id: 'note-darbouazza-food',
          icon: 'info',
          areas: ['dar-bouazza'],
          short: { fr: 'Vérifiez avant d’y aller', en: 'Check before you go', ar: 'تحقّق قبل الذهاب', es: 'Compruébalo antes de ir' },
          name: { fr: 'Manger à Dar Bouazza', en: 'Eating out in Dar Bouazza', ar: 'المطاعم في دار بوعزة', es: 'Comer fuera en Dar Bouazza' },
          desc: {
            fr: 'En mai 2025, plusieurs restaurants de plage connus de Dar Bouazza ont été démolis : des adresses encore en ligne n’existent plus. Avant d’y aller :',
            en: 'In May 2025, several well-known beach restaurants in Dar Bouazza were demolished: some addresses still online no longer exist. Before you go:',
            ar: 'في ماي 2025، هُدمت عدة مطاعم شاطئية معروفة في دار بوعزة، فبعض العناوين التي لا تزال على الإنترنت لم تعد موجودة. قبل الذهاب:',
            es: 'En mayo de 2025 se demolieron varios restaurantes de playa conocidos de Dar Bouazza: algunas direcciones que siguen en internet ya no existen. Antes de ir:'
          },
          list: [
            { text: { fr: 'Regardez les avis récents sur Google Maps.', en: 'Look at recent reviews on Google Maps.', ar: 'اطّلع على أحدث التقييمات في خرائط Google.', es: 'Mira las reseñas recientes en Google Maps.' } },
            { text: { fr: 'Le week-end, appelez ou réservez.', en: 'At weekends, call or book ahead.', ar: 'في نهاية الأسبوع، اتصل أو احجز مسبقاً.', es: 'El fin de semana, llama o reserva.' } },
            { text: { fr: 'Demandez à {host} ses adresses du moment.', en: 'Ask {host} for their current favourites.', ar: 'اسأل {host} عن عناوينه المفضّلة حالياً.', es: 'Pregunta a {host} por sus sitios favoritos del momento.' } }
          ]
        }
      ]
    },

    /* ------------------------------------------------------------------ */
    cafes: {
      icon: 'cup', tint: '#6B4F3A',
      type: 'places',
      title: { fr: 'Cafés', en: 'Cafés', ar: 'المقاهي', es: 'Cafés' },
      intro: {
        fr: 'Petit-déjeuner marocain, café de spécialité ou pâtisseries : de quoi bien commencer la journée.',
        en: 'Moroccan breakfast, specialty coffee or pastries: a good start to the day.',
        ar: 'فطور مغربي أو قهوة مختصة أو حلويات: بداية جميلة ليومك.',
        es: 'Desayuno marroquí, café de especialidad o pasteles: un buen comienzo del día.'
      },
      items: [
        {
          kind: 'note',
          id: 'note-breakfast',
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
        {
          id: 'sqala-breakfast',
          icon: 'mint',
          short: { fr: 'Petit-déjeuner complet au jardin', en: 'Full breakfast in the garden', ar: 'فطور كامل في الحديقة', es: 'Desayuno completo en el jardín' },
          name: { fr: 'La Sqala, le matin', en: 'La Sqala, in the morning', ar: 'الصقالة صباحاً', es: 'La Sqala, por la mañana' },
          area: { fr: 'Remparts · Port', en: 'Ramparts · Port', ar: 'الأسوار · الميناء', es: 'Murallas · Puerto' },
          desc: {
            fr: 'Le petit-déjeuner marocain complet dans le jardin du bastion : msemen, baghrir, œufs, jus d’orange et thé à la menthe.',
            en: 'The full Moroccan breakfast in the bastion garden: msemen, baghrir, eggs, orange juice and mint tea.',
            ar: 'فطور مغربي كامل في حديقة البرج: مسمن وبغرير وبيض وعصير برتقال وشاي بالنعناع.',
            es: 'El desayuno marroquí completo en el jardín del bastión: msemen, baghrir, huevos, zumo de naranja y té a la menta.'
          },
          tip: {
            fr: 'Le brunch est servi le matin, en général jusqu’à midi.',
            en: 'Brunch is served in the morning, usually until noon.',
            ar: 'يُقدَّم الفطور المتأخر صباحاً، عادةً حتى منتصف النهار.',
            es: 'El brunch se sirve por la mañana, normalmente hasta mediodía.'
          },
          budget: 2,
          maps: 'La Sqala, Casablanca'
        },
        {
          id: 'bennis',
          icon: 'bag',
          short: { fr: 'Cornes de gazelle à emporter', en: 'Cornes de gazelle to go', ar: 'كعب الغزال لتأخذه معك', es: 'Cuernos de gacela para llevar' },
          name: { fr: 'Pâtisserie Bennis', ar: 'حلويات بنيس' },
          area: { fr: 'Habous', ar: 'الأحباس' },
          desc: {
            fr: 'Une pâtisserie familiale des Habous, réputée pour ses cornes de gazelle, ses fekkas et ses douceurs aux amandes. À emporter ou à offrir.',
            en: 'A family pastry shop in the Habous, known for its cornes de gazelle, fekkas and almond sweets. To take away or bring home as a gift.',
            ar: 'محل حلويات عائلي في الأحباس، مشهور بكعب الغزال والفقّاص وحلويات اللوز. للأخذ أو للإهداء.',
            es: 'Una pastelería familiar de los Habous, famosa por sus cuernos de gacela, fekkas y dulces de almendra. Para llevar o regalar.'
          },
          tip: {
            fr: 'Les boîtes assorties voyagent bien pour le retour.',
            en: 'The assorted boxes travel well for the trip home.',
            ar: 'العلب المشكّلة تتحمّل السفر جيداً.',
            es: 'Las cajas surtidas aguantan bien el viaje de vuelta.'
          },
          budget: 1,
          maps: 'Pâtisserie Bennis Habous, Casablanca'
        },
        {
          id: 'bondi',
          icon: 'cup',
          short: { fr: 'Café de spécialité et brunch', en: 'Specialty coffee and brunch', ar: 'قهوة مختصة وبرانش', es: 'Café de especialidad y brunch' },
          name: { fr: 'Bondi Coffee Kitchen' },
          desc: {
            fr: 'Café de spécialité à l’australienne : espresso soigné, avocado toast et brunch. Une valeur sûre pour les amateurs de café.',
            en: 'Australian-style specialty coffee: careful espresso, avocado toast and brunch. A safe bet for coffee lovers.',
            ar: 'مقهى قهوة مختصة على الطريقة الأسترالية: إسبريسو متقن وتوست بالأفوكادو وفطور متأخر. خيار مضمون لعشّاق القهوة.',
            es: 'Café de especialidad al estilo australiano: espresso cuidado, tostadas de aguacate y brunch. Una apuesta segura para los amantes del café.'
          },
          budget: 2,
          maps: 'Bondi Coffee Kitchen, Casablanca'
        },
        {
          id: 'holybrunch',
          icon: 'sun',
          short: { fr: 'Brunch tranquille, cadre lumineux', en: 'Unhurried brunch, bright room', ar: 'برانش هادئ في فضاء مشرق', es: 'Brunch sin prisas, local luminoso' },
          name: { fr: 'Holy Brunch' },
          desc: {
            fr: 'Une adresse entièrement dédiée au brunch, dans un cadre moderne et lumineux. Pour une fin de matinée sans se presser.',
            en: 'A place devoted entirely to brunch, in a bright, modern room. For a slow late morning.',
            ar: 'عنوان مخصّص بالكامل للفطور المتأخر في فضاء عصري ومشرق، لصباح هادئ بلا عجلة.',
            es: 'Un local dedicado por completo al brunch, en un espacio moderno y luminoso. Para una mañana sin prisas.'
          },
          tip: {
            fr: 'Le week-end, venez tôt ou prévoyez un peu d’attente.',
            en: 'At weekends, come early or expect a short wait.',
            ar: 'في نهاية الأسبوع، تعال باكراً أو توقّع بعض الانتظار.',
            es: 'El fin de semana, ven temprano o cuenta con algo de espera.'
          },
          budget: 2,
          maps: 'Holy Brunch, Casablanca'
        },
        {
          id: 'host-cafe',
          icon: 'cup',
          areas: ['bourgogne'],
          short: { fr: 'Café du quartier, tout près', en: 'Local café, steps away', ar: 'مقهى الحيّ، على بُعد خطوات', es: 'Café de barrio, muy cerca' },
          kind: 'placeholder',
          name: { fr: 'Le café de {host} à Bourgogne', en: '{host}’s café in Bourgogne', ar: 'مقهى {host} في بورغون', es: 'El café de {host} en Bourgogne' },
          desc: {
            fr: 'Le café du quartier où votre hôte prend le sien, à quelques pas de chez vous.',
            en: 'The neighbourhood café where your host has their own coffee, steps from your door.',
            ar: 'مقهى الحي الذي يرتاده مضيفك، على بُعد خطوات من مسكنك.',
            es: 'El café del barrio donde tu anfitrión toma el suyo, a pocos pasos de tu alojamiento.'
          }
        },
        // source: none needed: a placeholder for the host's own pick (shows "Bientôt")
        {
          id: 'host-cafe-aindiab',
          icon: 'cup',
          areas: ['ain-diab'],
          short: { fr: 'Café du quartier, tout près', en: 'Local café, close by', ar: 'مقهى الحيّ، على مقربة منك', es: 'Café de barrio, muy cerca' },
          kind: 'placeholder',
          name: { fr: 'Le café de {host} à Aïn Diab', en: '{host}’s café in Ain Diab', ar: 'مقهى {host} في عين الذئاب', es: 'El café de {host} en Aïn Diab' },
          desc: {
            fr: 'Le café où votre hôte prend le sien, près d’Anfa Place.',
            en: 'The café where your host has their own coffee, near Anfa Place.',
            ar: 'المقهى الذي يرتاده مضيفك، قرب أنفا بلاس.',
            es: 'El café donde tu anfitrión toma el suyo, cerca de Anfa Place.'
          }
        },
        // source: none needed: a placeholder for the host's own pick (shows "Bientôt")
        {
          id: 'host-cafe-darbouazza',
          icon: 'cup',
          areas: ['dar-bouazza'],
          short: { fr: 'Café du coin, près de chez vous', en: 'Local café, close by', ar: 'مقهى قريب منك', es: 'Café cercano' },
          kind: 'placeholder',
          name: { fr: 'Le café de {host} à Dar Bouazza', en: '{host}’s café in Dar Bouazza', ar: 'مقهى {host} في دار بوعزة', es: 'El café de {host} en Dar Bouazza' },
          desc: {
            fr: 'Le café où votre hôte prend le sien, à Dar Bouazza.',
            en: 'The café where your host has their own coffee, in Dar Bouazza.',
            ar: 'المقهى الذي يرتاده مضيفك في دار بوعزة.',
            es: 'El café donde tu anfitrión toma el suyo, en Dar Bouazza.'
          }
        }
      ]
    },

    /* ------------------------------------------------------------------ */
    nightlife: {
      icon: 'moon', tint: '#353A63',
      type: 'places',
      title: { fr: 'Sorties', en: 'Going out', ar: 'سهرات', es: 'Salir' },
      intro: {
        fr: 'Couchers de soleil sur l’Atlantique, rooftops et soirées sur la Corniche.',
        en: 'Sunsets over the Atlantic, rooftops and evenings on the Corniche.',
        ar: 'غروب الشمس على الأطلسي، وأسطح بإطلالات، وسهرات على الكورنيش.',
        es: 'Atardeceres sobre el Atlántico, azoteas y noches en la Corniche.'
      },
      items: [
        {
          id: 'sunset-elhank',
          icon: 'sunset',
          short: { fr: 'Soleil couchant derrière le phare', en: 'Sunset behind the lighthouse', ar: 'الغروب خلف المنارة', es: 'Atardecer tras el faro' },
          name: { fr: 'Coucher de soleil à El Hank', en: 'Sunset at El Hank', ar: 'الغروب في العنق', es: 'Atardecer en El Hank' },
          area: { fr: 'El Hank', ar: 'العنق' },
          desc: {
            fr: 'Le plus beau spectacle gratuit de la ville : le soleil plonge dans l’Atlantique derrière le phare.',
            en: 'The best free show in town: the sun sinks into the Atlantic behind the lighthouse.',
            ar: 'أجمل عرض مجاني في المدينة: الشمس تغيب في الأطلسي خلف المنارة.',
            es: 'El mejor espectáculo gratuito de la ciudad: el sol se hunde en el Atlántico tras el faro.'
          },
          tip: {
            fr: 'Prolongez avec un verre ou un dîner au Cabestan, juste à côté.',
            en: 'Stay on for a drink or dinner at Le Cabestan, right next door.',
            ar: 'أكمل السهرة بمشروب أو عشاء في «لو كابيستان» المجاور.',
            es: 'Alárgalo con una copa o una cena en Le Cabestan, justo al lado.'
          },
          duration: 60, price: 0, sunset: true,
          maps: 'Phare d\'El Hank, Casablanca'
        },
        {
          id: 'corniche-night',
          icon: 'moon',
          short: { fr: 'Là où sort Casablanca', en: 'Where Casablanca goes out', ar: 'حيث تسهر الدار البيضاء', es: 'Donde Casablanca sale de noche' },
          name: { fr: 'La Corniche le soir', en: 'The Corniche at night', ar: 'الكورنيش ليلاً', es: 'La Corniche de noche' },
          area: { fr: 'Aïn Diab', ar: 'عين الذئاب' },
          desc: {
            fr: 'Restaurants, lounges et cafés s’alignent face à l’océan, d’El Hank jusqu’à Aïn Diab. C’est là que sort Casablanca, surtout en été.',
            en: 'Restaurants, lounges and cafés line the ocean from El Hank to Aïn Diab. This is where Casablanca goes out, especially in summer.',
            ar: 'مطاعم وصالونات ومقاهٍ تصطفّ أمام المحيط من العنق حتى عين الذئاب. هنا تسهر الدار البيضاء، خاصة في الصيف.',
            es: 'Restaurantes, lounges y cafés frente al océano, de El Hank a Aïn Diab. Aquí sale Casablanca, sobre todo en verano.'
          },
          tip: {
            fr: 'Les petits taxis rouges circulent tard le long de la Corniche.',
            en: 'Red petits taxis run late along the Corniche.',
            ar: 'تجوب سيارات الطاكسي الصغير الحمراء الكورنيش حتى وقت متأخر.',
            es: 'Los petits taxis rojos circulan hasta tarde por la Corniche.'
          },
          price: 0,
          maps: 'Corniche Aïn Diab, Casablanca'
        },
        {
          id: 'skybar',
          icon: 'glass',
          short: { fr: 'Rooftop avec vue sur l’océan', en: 'Rooftop with ocean views', ar: 'سطح فندق بإطلالة على المحيط', es: 'Azotea con vistas al océano' },
          name: { fr: 'Sky Bar, Villa Blanca' },
          area: { fr: 'Corniche', ar: 'الكورنيش' },
          desc: {
            fr: 'Le rooftop d’un hôtel de la Corniche, avec vue sur l’océan. Le meilleur moment : le coucher du soleil.',
            en: 'A hotel rooftop on the Corniche with ocean views. Best at sunset.',
            ar: 'سطح فندق على الكورنيش بإطلالة على المحيط. أفضل وقت: الغروب.',
            es: 'La azotea de un hotel de la Corniche, con vistas al océano. El mejor momento: el atardecer.'
          },
          tip: {
            fr: 'Réservé aux plus de 18 ans, tenue soignée demandée. Vérifiez les horaires avant d’y aller.',
            en: 'Over-18s only, smart dress expected. Check the opening hours before you go.',
            ar: 'لمن تجاوزوا 18 سنة فقط، ويُطلب لباس أنيق. تحقّق من الأوقات قبل الذهاب.',
            es: 'Solo mayores de 18 años, se pide ir bien vestido. Consulta el horario antes de ir.'
          },
          budget: 3,
          maps: 'Villa Blanca Urban Hotel, Casablanca'
        },
        {
          id: 'james',
          icon: 'music',
          short: { fr: 'Mosquée en vue, ambiance club', en: 'Mosque views, club atmosphere', ar: 'إطلالة على المسجد وأجواء سهر', es: 'Mezquita al fondo, ambiente club' },
          name: { fr: 'The James Rooftop' },
          area: { fr: 'Centre Art déco', en: 'Art Deco centre', ar: 'وسط المدينة', es: 'Centro art déco' },
          desc: {
            fr: 'Sur le toit de l’hôtel JM Suites, une vue sur la mosquée Hassan II, le Sacré-Cœur et les toits Art déco. Ambiance club le soir.',
            en: 'On the roof of the JM Suites hotel, with views of Hassan II Mosque, the Sacred Heart and the Art Deco rooftops. A club atmosphere at night.',
            ar: 'على سطح فندق JM Suites، بإطلالة على مسجد الحسن الثاني وكاتدرائية القلب المقدس وأسطح الآرت ديكو. أجواء نادٍ ليلي في المساء.',
            es: 'En la azotea del hotel JM Suites, con vistas a la mezquita Hassan II, el Sagrado Corazón y los tejados art déco. Ambiente de club por la noche.'
          },
          tip: {
            fr: 'Réservez une table le week-end.',
            en: 'Book a table at weekends.',
            ar: 'احجز طاولة في نهاية الأسبوع.',
            es: 'Reserva mesa el fin de semana.'
          },
          budget: 3,
          maps: 'The James Rooftop, JM Suites, Casablanca'
        }
      ]
    },

    /* ------------------------------------------------------------------ */
    shopping: {
      icon: 'bag', tint: '#7A4E62',
      type: 'places',
      title: { fr: 'Shopping', en: 'Shopping', ar: 'تسوّق', es: 'Compras' },
      intro: {
        fr: 'Du grand mall face à l’océan aux souks d’artisans : où acheter, et comment négocier.',
        en: 'From the big seafront mall to the craft souks: where to shop, and how to bargain.',
        ar: 'من المركز التجاري الكبير المطلّ على المحيط إلى أسواق الحرفيين: أين تتسوّق وكيف تفاوض.',
        es: 'Del gran centro comercial frente al océano a los zocos de artesanos: dónde comprar y cómo regatear.'
      },
      items: [
        {
          id: 'habous-crafts',
          icon: 'bag',
          short: { fr: 'Babouches, lanternes, cuir, céramique', en: 'Babouches, lanterns, leather, ceramics', ar: 'بلاغي وفوانيس وجلديات وخزف', es: 'Babuchas, faroles, cuero, cerámica' },
          name: { fr: 'Artisanat des Habous', en: 'Habous crafts', ar: 'الصناعة التقليدية في الأحباس', es: 'Artesanía de los Habous' },
          area: { fr: 'Habous', ar: 'الأحباس' },
          desc: {
            fr: 'Babouches, lanternes, cuir, céramique, épices et olives : le plus beau choix d’artisanat de la ville, dans un cadre agréable.',
            en: 'Babouches, lanterns, leather, ceramics, spices and olives: the finest choice of crafts in the city, in a pleasant setting.',
            ar: 'بلاغي وفوانيس وجلد وخزف وتوابل وزيتون: أجمل اختيار للصناعة التقليدية في المدينة، في إطار جميل.',
            es: 'Babuchas, faroles, cuero, cerámica, especias y aceitunas: la mejor selección de artesanía de la ciudad, en un entorno agradable.'
          },
          tip: {
            fr: 'Comparez quelques boutiques avant d’acheter ; les prix se discutent.',
            en: 'Compare a few shops before buying; prices are open to bargaining.',
            ar: 'قارن بين بضعة محلات قبل الشراء، فالأسعار قابلة للتفاوض.',
            es: 'Compara varias tiendas antes de comprar; los precios se negocian.'
          },
          duration: 90,
          maps: 'Quartier Habous, Casablanca'
        },
        {
          id: 'moroccomall',
          icon: 'building',
          short: { fr: 'Aquarium géant, face à l’océan', en: 'Giant aquarium, facing the ocean', ar: 'حوض أسماك ضخم أمام المحيط', es: 'Acuario gigante frente al océano' },
          name: { fr: 'Morocco Mall' },
          area: { fr: 'Corniche · Aïn Diab', ar: 'الكورنيش · عين الذئاب' },
          desc: {
            fr: 'L’un des plus grands centres commerciaux d’Afrique, face à l’océan : grandes marques, restaurants et un aquarium géant visible depuis l’allée centrale.',
            en: 'One of Africa’s largest malls, facing the ocean: major brands, restaurants and a giant aquarium you can see from the main hall.',
            ar: 'من أكبر المراكز التجارية في إفريقيا، في مواجهة المحيط: علامات كبرى ومطاعم وحوض أسماك ضخم يُرى من الممر الرئيسي.',
            es: 'Uno de los mayores centros comerciales de África, frente al océano: grandes marcas, restaurantes y un acuario gigante visible desde la galería central.'
          },
          tip: {
            fr: 'Le week-end, venez le matin pour éviter la foule.',
            en: 'At weekends, come in the morning to avoid the crowds.',
            ar: 'في نهاية الأسبوع، تعال صباحاً لتفادي الزحام.',
            es: 'El fin de semana, ven por la mañana para evitar las multitudes.'
          },
          duration: 120,
          maps: 'Morocco Mall, Casablanca'
        },
        {
          id: 'anfaplace',
          icon: 'cup',
          short: { fr: 'Calme, cafés tournés vers l’océan', en: 'Calm, cafés facing the ocean', ar: 'هادئ، بمقاهٍ تطلّ على المحيط', es: 'Tranquilo, cafés frente al océano' },
          name: { fr: 'Anfa Place' },
          area: { fr: 'Corniche', ar: 'الكورنيش' },
          desc: {
            fr: 'Un centre plus petit et plus calme, en bord de mer, avec des cafés tournés vers l’océan.',
            en: 'A smaller, calmer mall on the seafront, with cafés facing the ocean.',
            ar: 'مركز تجاري أصغر وأهدأ على شاطئ البحر، بمقاهٍ تطلّ على المحيط.',
            es: 'Un centro más pequeño y tranquilo junto al mar, con cafés frente al océano.'
          },
          duration: 60,
          maps: 'Anfa Place, Casablanca'
        },
        {
          id: 'medina-souks',
          icon: 'coins',
          short: { fr: 'Populaire et moins cher', en: 'Everyday shopping, lower prices', ar: 'أكثر شعبية وأرخص ثمناً', es: 'Popular y más barato' },
          name: { fr: 'Souks de l’ancienne Médina', en: 'Old Medina souks', ar: 'أسواق المدينة القديمة', es: 'Zocos de la antigua medina' },
          area: { fr: 'Port', en: 'Port', ar: 'الميناء', es: 'Puerto' },
          desc: {
            fr: 'Plus populaire et moins cher : vêtements, objets du quotidien, petits souvenirs. Une plongée dans le commerce local.',
            en: 'More everyday and cheaper: clothes, household goods, small souvenirs. A dive into local trade.',
            ar: 'أكثر شعبية وأرخص ثمناً: ملابس وأغراض يومية وهدايا صغيرة. غوص في التجارة المحلية.',
            es: 'Más popular y más barato: ropa, objetos cotidianos, pequeños recuerdos. Una inmersión en el comercio local.'
          },
          duration: 60,
          maps: 'Ancienne Médina, Casablanca'
        },
        {
          id: 'maarif',
          icon: 'hanger',
          short: { fr: 'Créateurs marocains et prêt-à-porter', en: 'Moroccan designers and fashion', ar: 'مصمّمون مغاربة وملابس جاهزة', es: 'Diseñadores marroquíes y moda' },
          name: { fr: 'Maârif', ar: 'المعاريف' },
          area: { fr: 'Maârif', ar: 'المعاريف' },
          desc: {
            fr: 'Le quartier des boutiques : créateurs marocains, prêt-à-porter et enseignes internationales dans des rues commerçantes animées.',
            en: 'The boutique district: Moroccan designers, fashion and international brands along busy shopping streets.',
            ar: 'حي المتاجر: مصمّمون مغاربة وملابس جاهزة وعلامات عالمية في شوارع تجارية نابضة.',
            es: 'El barrio de las tiendas: diseñadores marroquíes, moda y marcas internacionales en calles comerciales animadas.'
          },
          duration: 90,
          maps: 'Maarif, Casablanca'
        },
        {
          kind: 'note',
          id: 'note-bargain',
          icon: 'chat',
          short: { fr: 'Souriez, proposez environ la moitié', en: 'Smile, offer about half', ar: 'ابتسم واقترح نحو النصف', es: 'Sonríe, ofrece la mitad' },
          name: { fr: 'L’art de négocier', en: 'The art of bargaining', ar: 'فن المساومة', es: 'El arte de regatear' },
          list: [
            { text: { fr: 'Demandez le prix avec le sourire, proposez environ la moitié, puis trouvez un terrain d’entente.', en: 'Ask the price with a smile, offer about half, then meet in the middle.', ar: 'اسأل عن الثمن بابتسامة، واقترح نحو النصف، ثم اتفقا على سعر وسط.', es: 'Pregunta el precio con una sonrisa, ofrece la mitad y acercaos a un punto medio.' } },
            { text: { fr: 'Ne négociez que si vous comptez vraiment acheter.', en: 'Only bargain if you really intend to buy.', ar: 'لا تساوم إلا إذا كنت تنوي الشراء فعلاً.', es: 'Regatea solo si de verdad piensas comprar.' } },
            { text: { fr: 'Prix fixes dans les malls et dans certaines boutiques d’artisanat.', en: 'Prices are fixed in malls and in some craft shops.', ar: 'الأسعار ثابتة في المراكز التجارية وبعض محلات الصناعة التقليدية.', es: 'Precios fijos en los centros comerciales y en algunas tiendas de artesanía.' } },
            { text: { fr: 'Ayez des espèces : beaucoup de petites boutiques ne prennent pas la carte.', en: 'Carry cash: many small shops do not take cards.', ar: 'احمل نقوداً، فكثير من المحلات الصغيرة لا تقبل البطاقات.', es: 'Lleva efectivo: muchas tiendas pequeñas no aceptan tarjeta.' } }
          ]
        }
      ]
    },

    /* ------------------------------------------------------------------ */
    beaches: {
      icon: 'waves', tint: '#2F6170',
      type: 'places',
      title: { fr: 'Plages', en: 'Beaches', ar: 'شواطئ', es: 'Playas' },
      intro: {
        fr: 'L’Atlantique est puissant à Casablanca : on s’y promène plus qu’on ne s’y baigne. Voici où profiter de la mer.',
        en: 'The Atlantic is powerful in Casablanca: people walk by it more than they swim in it. Here is where to enjoy the sea.',
        ar: 'المحيط الأطلسي قوي في الدار البيضاء، والناس يتنزّهون على ضفّته أكثر مما يسبحون فيه. إليك أين تستمتع بالبحر.',
        es: 'El Atlántico es potente en Casablanca: se pasea junto a él más de lo que se nada. Aquí tienes dónde disfrutar del mar.'
      },
      items: [
        {
          id: 'corniche',
          icon: 'walk',
          short: { fr: 'Balade face à l’océan', en: 'A walk facing the ocean', ar: 'ممشى مطلّ على المحيط', es: 'Paseo frente al océano' },
          name: { fr: 'Corniche d’Aïn Diab', en: 'Aïn Diab Corniche', ar: 'كورنيش عين الذئاب', es: 'Corniche de Aïn Diab' },
          area: { fr: 'El Hank → Aïn Diab', ar: 'العنق ← عين الذئاب' },
          desc: {
            fr: 'Environ 5 km de promenade face à l’océan, du phare d’El Hank jusqu’à Aïn Diab. À pied, en courant, ou pour un café face aux vagues.',
            en: 'About 5 km of seafront promenade from El Hank lighthouse to Aïn Diab. For walking, running, or a coffee facing the waves.',
            ar: 'نحو 5 كيلومترات من الممشى المطلّ على المحيط، من منارة العنق حتى عين الذئاب. للمشي أو الجري أو قهوة أمام الأمواج.',
            es: 'Unos 5 km de paseo frente al océano, del faro de El Hank a Aïn Diab. Para caminar, correr o tomar un café frente a las olas.'
          },
          duration: 90, price: 0,
          maps: 'Corniche Aïn Diab, Casablanca'
        },
        {
          id: 'aindiab',
          icon: 'umbrella',
          short: { fr: 'Grande plage, accès tram T2', en: 'Big sandy beach, tram T2', ar: 'شاطئ رملي كبير، ترامواي T2', es: 'Gran playa, tranvía T2' },
          name: { fr: 'Plage d’Aïn Diab', en: 'Aïn Diab Beach', ar: 'شاطئ عين الذئاب', es: 'Playa de Aïn Diab' },
          area: { fr: 'Aïn Diab', ar: 'عين الذئاب' },
          desc: {
            fr: 'La grande plage de sable de la ville, très animée en été. Le tramway T2 vous y dépose.',
            en: 'The city’s big sandy beach, very lively in summer. Tram line T2 takes you there.',
            ar: 'الشاطئ الرملي الكبير في المدينة، يعجّ بالحياة صيفاً. يوصلك إليه خط الترامواي T2.',
            es: 'La gran playa de arena de la ciudad, muy animada en verano. El tranvía T2 te deja allí.'
          },
          tip: {
            fr: 'Ne vous baignez que près des postes de secours, en saison, et respectez les drapeaux.',
            en: 'Only swim near the lifeguard posts, in season, and follow the flags.',
            ar: 'لا تسبح إلا قرب مراكز الإنقاذ في موسم الاصطياف، واحترم الأعلام.',
            es: 'Báñate solo cerca de los puestos de socorrismo, en temporada, y respeta las banderas.'
          },
          price: 0,
          maps: 'Plage Ain Diab, Casablanca'
        },
        {
          id: 'beachclubs',
          icon: 'sun',
          short: { fr: 'Piscines, transats et restaurant', en: 'Pools, sunbeds and a restaurant', ar: 'مسابح وكراسي استلقاء ومطعم', es: 'Piscinas, tumbonas y restaurante' },
          name: { fr: 'Les beach clubs', en: 'The beach clubs', ar: 'النوادي الشاطئية', es: 'Los beach clubs' },
          area: { fr: 'Aïn Diab', ar: 'عين الذئاب' },
          desc: {
            fr: 'Le long d’Aïn Diab, des clubs proposent piscines, transats et restaurant à la journée. Souvent plus agréable que la baignade en mer.',
            en: 'Along Aïn Diab, clubs offer pools, sunbeds and a restaurant by the day. Often nicer than swimming in the sea.',
            ar: 'على طول عين الذئاب، تقدّم نوادٍ مسابح وكراسي استلقاء ومطعماً لليوم الكامل. غالباً أمتع من السباحة في البحر.',
            es: 'A lo largo de Aïn Diab, varios clubs ofrecen piscinas, tumbonas y restaurante por día. A menudo más agradable que bañarse en el mar.'
          },
          tip: {
            fr: 'Beaucoup réduisent leurs horaires ou ferment de novembre à mars : appelez avant.',
            en: 'Many cut their hours or close from November to March: call ahead.',
            ar: 'كثير منها يقلّص أوقاته أو يغلق من نونبر إلى مارس، فاتصل قبل الذهاب.',
            es: 'Muchos reducen horario o cierran de noviembre a marzo: llama antes.'
          },
          budget: 2,
          maps: 'Tahiti Beach Club, Casablanca'
        },
        {
          id: 'sidiabderrahmane',
          icon: 'shrine',
          short: { fr: 'Sanctuaire blanc sur un rocher', en: 'White shrine on a rock', ar: 'ضريح أبيض فوق صخرة', es: 'Santuario blanco sobre una roca' },
          name: { fr: 'Marabout de Sidi Abderrahmane', en: 'Sidi Abderrahmane shrine', ar: 'ضريح سيدي عبد الرحمن', es: 'Santuario de Sidi Abderrahmane' },
          area: { fr: 'Bout de la Corniche', en: 'End of the Corniche', ar: 'نهاية الكورنيش', es: 'Final de la Corniche' },
          desc: {
            fr: 'Un petit sanctuaire blanc posé sur un rocher au bout de la Corniche. Une image étonnante, surtout au coucher du soleil.',
            en: 'A small white shrine on a rock at the end of the Corniche. A striking sight, especially at sunset.',
            ar: 'ضريح أبيض صغير فوق صخرة في نهاية الكورنيش. مشهد مدهش، خاصة عند الغروب.',
            es: 'Un pequeño santuario blanco sobre una roca al final de la Corniche. Una imagen sorprendente, sobre todo al atardecer.'
          },
          tip: {
            fr: 'Rouvert en 2024 après travaux, l’îlot se visite (vérifiez les horaires). Cela reste un lieu de pèlerinage : tenue correcte et respect.',
            en: 'Reopened in 2024 after works, the islet can be visited (check the opening hours). It is still a place of pilgrimage: dress modestly and be respectful.',
            ar: 'أُعيد فتح الجزيرة الصغيرة للزوار سنة 2024 بعد أشغال التأهيل (تحقّق من مواعيد الزيارة). يبقى مكان زيارة وتبرّك: لباس محتشم واحترام.',
            es: 'Reabierto en 2024 tras las obras, el islote se puede visitar (consulta el horario). Sigue siendo un lugar de peregrinación: ropa discreta y respeto.'
          },
          price: 0,
          maps: 'Sidi Abderrahmane, Casablanca'
        },
        {
          id: 'darbouazza',
          icon: 'surf',
          // DarB Inn's guests see its own beaches (tamaris2, jackbeach) instead
          areas: ['bourgogne', 'ain-diab'],
          short: { fr: 'Plages sauvages et surf', en: 'Wilder beaches, surf spots', ar: 'شواطئ برّية وركوب الأمواج', es: 'Playas salvajes y surf' },
          name: { fr: 'Dar Bouazza', ar: 'دار بوعزة' },
          area: { fr: 'Sud-ouest de Casablanca', en: 'South-west of Casablanca', ar: 'جنوب غرب الدار البيضاء', es: 'Suroeste de Casablanca' },
          desc: {
            fr: 'Au sud-ouest de la ville, à 30–45 minutes en voiture (plus en été) : des plages plus sauvages et plus calmes, et des spots de surf.',
            en: 'South-west of the city, 30–45 minutes by car (longer in summer): wilder, quieter beaches and surf spots.',
            ar: 'جنوب غرب المدينة، على بُعد 30 إلى 45 دقيقة بالسيارة (أكثر في الصيف): شواطئ أهدأ وأكثر طبيعية، وأماكن لركوب الأمواج.',
            es: 'Al suroeste de la ciudad, a 30–45 minutos en coche (más en verano): playas más salvajes y tranquilas, y spots de surf.'
          },
          tip: {
            fr: 'Y aller en voiture ou en taxi ; convenez d’un prix aller-retour avec le chauffeur.',
            en: 'Go by car or taxi; agree a return price with the driver.',
            ar: 'اذهب بالسيارة أو بالطاكسي، واتفق مع السائق على ثمن الذهاب والإياب.',
            es: 'Ve en coche o en taxi; acuerda un precio de ida y vuelta con el conductor.'
          },
          maps: 'Dar Bouazza, Morocco'
        },
        // source: https://vacations.aircanada.com/en/accommodation-details/CMNPES/Pestana%20Casablanca%20Seaside%20Suites
        // ("the Anfa Place Living Resort complex … a promenade with direct beach access"; pestana.com says the same)
        // source: https://snrtnews.com/fr/article/prevention-des-noyades-sur-la-plage-dain-diab-quelles-mesures-de-sauvetage-78687
        // (lifeguards on the Aïn Diab beaches from 1 May to 30 September)
        // source: https://lematin.ma/regions/surveillance-et-prevention-des-noyades-a-ain-diab-casablanca/297269
        // (Aug. 2025: a 153-day season, 1 May to 30 September)
        // The promenade belongs to the residence: the text does not tell guests to use it.
        // TODO (host): if Ocean 21's guests may use it, say so in ocean-21.js (howto 'Piscine, sport, plage').
        {
          id: 'anfaplace-beach',
          icon: 'waves',
          areas: ['ain-diab'],
          short: { fr: 'Plage et couchant, au pied d’Anfa Place', en: 'Beach and sunset below Anfa Place', ar: 'شاطئ وغروب أمام أنفا بلاس', es: 'Playa y atardecer junto a Anfa Place' },
          name: { fr: 'La plage au pied d’Anfa Place', en: 'The beach below Anfa Place', ar: 'الشاطئ أمام أنفا بلاس', es: 'La playa junto a Anfa Place' },
          area: { fr: 'Anfa Place · Corniche', ar: 'أنفا بلاس · الكورنيش' },
          desc: {
            fr: 'La plage s’étend au pied du complexe d’Anfa Place, sur la Corniche. Parfaite pour marcher pieds nus le matin ou regarder le soleil se coucher.',
            en: 'The beach runs right below the Anfa Place complex, on the Corniche. Perfect for a barefoot morning walk or for watching the sunset.',
            ar: 'يمتدّ الشاطئ أمام مجمّع أنفا بلاس على الكورنيش، وهو مثالي لنزهة حافي القدمين صباحاً أو لمشاهدة الغروب.',
            es: 'La playa se extiende al pie del complejo de Anfa Place, en la Corniche. Perfecta para caminar descalzo por la mañana o ver la puesta de sol.'
          },
          tip: {
            fr: 'Les postes de secours sont tenus du 1er mai au 30 septembre : baignez-vous près de l’un d’eux et respectez les drapeaux.',
            en: 'Lifeguard posts are staffed from 1 May to 30 September: swim near one and follow the flags.',
            ar: 'تعمل مراكز الإنقاذ من فاتح ماي إلى 30 شتنبر، فاسبح قرب أحدها والتزم بإشارات الأعلام.',
            es: 'Los puestos de socorrismo funcionan del 1 de mayo al 30 de septiembre: báñate cerca de uno y respeta las banderas.'
          },
          price: 0, sunset: true,
          maps: 'Anfa Place, Casablanca'
        },
        // source: https://fr.hespress.com/481822-dar-bouazza-la-plage-tamaris-2-decroche-son-premier-pavillon-bleu.html
        // source: https://lematin.ma/regions/la-plage-tamaris-2-a-dar-bouazza-decroche-son-premier-pavillon-bleu/356538/amp
        // (first Blue Flag, raised on Friday 17 July 2026 with the governor of Nouaceur province)
        // source: https://fr.le360.ma/societe/a-tamaris-les-plages-se-reinventent-avec-wi-fi-gratuit-piscine-et-nouveaux-services_NOWOR7XNP5CTVE3M2MALV7Q3BE/
        // (summer 2026: Tamaris 1, 2 and 3 refurbished, free Wi-Fi, a learn-to-swim pool for children,
        //  Civil Protection lifeguard towers from the corniche to Tamaris 3)
        // source: https://fnh.ma/article/opinions-libres/dar-bouazza-la-route-infernale (weekend beach traffic)
        // The pool and Wi-Fi were set up for summer 2026; whether they return each summer is not confirmed,
        // so the text dates them.
        {
          id: 'tamaris2',
          icon: 'umbrella',
          areas: ['dar-bouazza'],
          short: { fr: 'Pavillon Bleu 2026, idéale en famille', en: 'Blue Flag 2026, great for families', ar: 'اللواء الأزرق 2026، مثالي للعائلات', es: 'Bandera Azul 2026, ideal en familia' },
          name: { fr: 'Plage Tamaris 2', en: 'Tamaris 2 Beach', ar: 'شاطئ تماريس 2', es: 'Playa Tamaris 2' },
          area: { fr: 'Tamaris · Dar Bouazza', ar: 'تماريس · دار بوعزة' },
          desc: {
            fr: 'Une plage de sable labellisée Pavillon Bleu en 2026. Pour l’été 2026, elle a reçu le Wi-Fi gratuit et une piscine d’initiation à la nage pour les enfants.',
            en: 'A sandy beach awarded the Blue Flag in 2026. For summer 2026 it gained free Wi-Fi and a learn-to-swim pool for children.',
            ar: 'شاطئ رملي نال اللواء الأزرق سنة 2026، وزُوّد في صيف 2026 بشبكة واي فاي مجانية ومسبح لتعليم الأطفال السباحة.',
            es: 'Una playa de arena con Bandera Azul en 2026. Para el verano de 2026 recibió Wi-Fi gratis y una piscina para que los niños aprendan a nadar.'
          },
          tip: {
            fr: 'En saison, baignez-vous près d’un poste de secours, et venez tôt les week-ends d’été.',
            en: 'In season, swim near a lifeguard post, and come early on summer weekends.',
            ar: 'في موسم الاصطياف، اسبح قرب مركز للإنقاذ، واحضر باكراً في عطلات نهاية الأسبوع صيفاً.',
            es: 'En temporada, báñate cerca de un puesto de socorristas, y ven temprano los fines de semana de verano.'
          },
          price: 0,
          maps: 'Plage Tamaris 2, Dar Bouazza'
        },
        // source: https://fr.surf-forecast.com/breaks/Jackbeach (exposed beach break that works all year round)
        // source: https://www.surf-report.com/surf-info/jack-beach-s2707.html (left and right beach break, intermediate level)
        // source: https://assets.medias24.com/images/cartes/plages-2019/assets/pdf/plages/FR/Casablanca/24-%20Jacques%20Beach.pdf
        // (2019 beach sheet: a small beach, about 0.5 km, partly rocky)
        // No surf school is named: the Jack Beach schools were demolished in March 2021
        // (https://ledesk.ma/encontinu/apres-le-deplacement-des-clubs-nautiques-rabat-demolition-des-ecoles-de-surf-de-dar-bouazza/)
        // and no 2026 source confirms which ones teach there now.
        {
          id: 'jackbeach',
          icon: 'surf',
          areas: ['dar-bouazza'],
          short: { fr: 'Un spot de surf toute l’année', en: 'A year-round surf spot', ar: 'مكان لركوب الأمواج طوال السنة', es: 'Un spot de surf todo el año' },
          name: { fr: 'Jack Beach', ar: 'جاك بيتش' },
          area: { fr: 'Dar Bouazza', ar: 'دار بوعزة' },
          desc: {
            fr: 'Une petite plage en partie rocheuse, appréciée des surfeurs : il y a des vagues toute l’année. Plutôt pour un niveau intermédiaire.',
            en: 'A small, partly rocky beach, popular with surfers: there are waves all year round. Best for intermediate surfers.',
            ar: 'شاطئ صغير صخري في جزء منه، يقصده راكبو الأمواج لأمواجه المتاحة طوال السنة، ويناسب أكثر أصحاب المستوى المتوسط.',
            es: 'Una pequeña playa en parte rocosa, apreciada por los surfistas: hay olas todo el año. Mejor para nivel intermedio.'
          },
          tip: {
            fr: 'Débutant ? Surfez avec un moniteur et repérez les rochers avant d’entrer dans l’eau.',
            en: 'A beginner? Surf with an instructor and spot the rocks before you go in.',
            ar: 'مبتدئ؟ اركب الأمواج مع مدرّب، وحدّد مكان الصخور قبل دخول الماء.',
            es: '¿Principiante? Surfea con un monitor y localiza las rocas antes de entrar al agua.'
          },
          price: 0,
          maps: 'Jack Beach, Dar Bouazza'
        }
      ]
    },

    /* ------------------------------------------------------------------ */
    family: {
      icon: 'family', tint: '#4E6B4A',
      type: 'places',
      title: { fr: 'Famille', en: 'Family', ar: 'العائلة', es: 'En familia' },
      intro: {
        fr: 'Des idées pour occuper petits et grands, même quand il pleut.',
        en: 'Ideas to keep children and parents happy, even when it rains.',
        ar: 'أفكار تُسعد الصغار والكبار، حتى في الأيام الممطرة.',
        es: 'Ideas para que pequeños y mayores lo pasen bien, incluso cuando llueve.'
      },
      items: [
        {
          id: 'mall-family',
          icon: 'fish',
          short: { fr: 'Aquarium gratuit, jeux en intérieur', en: 'Free aquarium, indoor play park', ar: 'حوض أسماك مجاني وألعاب داخلية', es: 'Acuario gratis y parque cubierto' },
          name: { fr: 'Aquarium et jeux du Morocco Mall', en: 'Morocco Mall aquarium and play area', ar: 'حوض الأسماك وألعاب موروكو مول', es: 'Acuario y juegos del Morocco Mall' },
          area: { fr: 'Corniche · Aïn Diab', ar: 'الكورنيش · عين الذئاب' },
          desc: {
            fr: 'Le grand aquarium cylindrique se voit gratuitement depuis l’allée centrale ; le parc de jeux intérieur occupe les enfants des heures, même par mauvais temps.',
            en: 'The big cylindrical aquarium can be seen for free from the main hall; the indoor play park keeps children busy for hours, whatever the weather.',
            ar: 'يمكن رؤية حوض الأسماك الأسطواني الكبير مجاناً من الممر الرئيسي، وتشغل مدينة الألعاب الداخلية الأطفال لساعات مهما كان الطقس.',
            es: 'El gran acuario cilíndrico se ve gratis desde la galería central; el parque de juegos cubierto entretiene a los niños durante horas, haga el tiempo que haga.'
          },
          duration: 180,
          maps: 'Morocco Mall, Casablanca'
        },
        {
          id: 'sindibad',
          icon: 'wheel',
          short: { fr: 'Manèges et petit zoo', en: 'Rides and a small zoo', ar: 'ألعاب ملاهٍ وحديقة حيوانات صغيرة', es: 'Atracciones y pequeño zoo' },
          name: { fr: 'Parc Sindibad', en: 'Sindibad Park', ar: 'حديقة سندباد', es: 'Parque Sindibad' },
          area: { fr: 'Aïn Diab', ar: 'عين الذئاب' },
          desc: {
            fr: 'Un parc d’attractions avec manèges et petit zoo, près de la Corniche. Une sortie simple et abordable.',
            en: 'An amusement park with rides and a small zoo, near the Corniche. A simple, affordable day out.',
            ar: 'مدينة ملاهٍ بألعاب وحديقة حيوانات صغيرة قرب الكورنيش. نزهة بسيطة وبأسعار معقولة.',
            es: 'Un parque de atracciones con norias y un pequeño zoo, cerca de la Corniche. Una salida sencilla y asequible.'
          },
          tip: {
            fr: 'Vérifiez les horaires avant d’y aller, surtout hors vacances scolaires.',
            en: 'Check opening hours before you go, especially outside school holidays.',
            ar: 'تحقّق من الأوقات قبل الذهاب، خاصة خارج العطل المدرسية.',
            es: 'Consulta el horario antes de ir, sobre todo fuera de vacaciones escolares.'
          },
          budget: 1,
          maps: 'Parc Sindibad, Casablanca'
        },
        {
          id: 'tamaris',
          icon: 'waves',
          short: { fr: 'Toboggans et piscine à vagues', en: 'Slides and a wave pool', ar: 'زلّاقات مائية ومسبح أمواج', es: 'Toboganes y piscina de olas' },
          name: { fr: 'Tamaris Aquaparc' },
          area: { fr: 'Sud-ouest de Casablanca', en: 'South-west of Casablanca', ar: 'جنوب غرب الدار البيضاء', es: 'Suroeste de Casablanca' },
          desc: {
            fr: 'Le parc aquatique de Casablanca : toboggans, piscine à vagues, rivière lente et espace pour les tout-petits.',
            en: 'Casablanca’s water park: slides, a wave pool, a lazy river and a splash area for toddlers.',
            ar: 'المنتزه المائي للدار البيضاء: زحاليق ومسبح أمواج ونهر هادئ وفضاء للصغار.',
            es: 'El parque acuático de Casablanca: toboganes, piscina de olas, río lento y zona para los más pequeños.'
          },
          tip: {
            fr: 'Ouvert seulement à la belle saison, en général de mai à septembre.',
            en: 'Open in the warm season only, usually May to September.',
            ar: 'مفتوح في الموسم الحار فقط، عادةً من ماي إلى شتنبر.',
            es: 'Abre solo en temporada de calor, normalmente de mayo a septiembre.'
          },
          budget: 2,
          maps: 'Tamaris Aquaparc, Casablanca'
        },
        {
          id: 'ligue-family',
          icon: 'palm',
          short: { fr: 'Jeux, pelouses et cafés', en: 'Playgrounds, lawns and cafés', ar: 'ألعاب ومساحات خضراء ومقاهٍ', es: 'Juegos, césped y cafés' },
          name: { fr: 'Parc de la Ligue Arabe', en: 'Arab League Park', ar: 'حديقة الجامعة العربية', es: 'Parque de la Liga Árabe' },
          area: { fr: 'Centre-ville', en: 'City centre', ar: 'وسط المدينة', es: 'Centro' },
          desc: {
            fr: 'Aires de jeux, grandes pelouses et cafés : de quoi courir pendant que les parents soufflent.',
            en: 'Playgrounds, big lawns and cafés: room for children to run while parents rest.',
            ar: 'فضاءات ألعاب ومساحات خضراء ومقاهٍ: يركض الأطفال ويرتاح الآباء.',
            es: 'Zonas de juego, grandes praderas y cafés: espacio para que los niños corran mientras los padres descansan.'
          },
          price: 0,
          maps: 'Parc de la Ligue Arabe, Casablanca'
        },
        {
          id: 'corniche-family',
          icon: 'icecream',
          short: { fr: 'Glaces et coucher de soleil', en: 'Ice cream at sunset', ar: 'مثلّجات مع غروب الشمس', es: 'Helados al atardecer' },
          name: { fr: 'Glaces sur la Corniche', en: 'Ice cream on the Corniche', ar: 'مثلّجات على الكورنيش', es: 'Helados en la Corniche' },
          area: { fr: 'El Hank → Aïn Diab', ar: 'العنق ← عين الذئاب' },
          desc: {
            fr: 'Une large promenade face à la mer, des glaciers et le coucher du soleil : la fin de journée préférée des familles casablancaises.',
            en: 'A wide promenade facing the sea, ice cream shops and the sunset: the favourite end of day for Casablanca families.',
            ar: 'ممشى واسع أمام البحر ومحلات مثلّجات وغروب الشمس: الختام المفضّل ليوم العائلات البيضاوية.',
            es: 'Un amplio paseo frente al mar, heladerías y la puesta de sol: el final de día favorito de las familias de Casablanca.'
          },
          price: 0,
          maps: 'Corniche Aïn Diab, Casablanca'
        },
        // source: https://maroc.ma/fr/actualites/casablanca-le-spectacle-nostalgia-marque-louverture-au-public-du-parc-archeologique-de-sidi
        // (opened to the public on 16 July 2025)
        // source: https://fr.le360.ma/culture/parc-archeologique-de-sidi-abderrahmane-un-voyage-a-pied-dans-la-nuit-des-temps_TP3G3DF3FJAJBHMDAGCTTCNL4E/
        // (Feb. 2026: about 5 ha on the former quarry, a 1,200 m trail, workshops, a 900 m² interpretation centre;
        //  no hours or prices published, hence no price field)
        {
          id: 'prehistory-park',
          icon: 'museum',
          short: { fr: 'Sentier et ateliers de la préhistoire', en: 'Prehistory trail and workshops', ar: 'مسار وورشات عن عصور ما قبل التاريخ', es: 'Sendero y talleres de prehistoria' },
          name: { fr: 'Parc archéologique', en: 'Archaeological park', ar: 'الحديقة الأثرية', es: 'Parque arqueológico' },
          area: { fr: 'Sidi Abderrahmane', ar: 'سيدي عبد الرحمن' },
          desc: {
            fr: 'Ouvert en juillet 2025 sur une ancienne carrière riche en traces préhistoriques : un sentier de 1,2 km, des ateliers pratiques et un centre d’interprétation.',
            en: 'Opened in July 2025 on a former quarry rich in prehistoric finds: a 1.2 km trail, hands-on workshops and an interpretation centre.',
            ar: 'افتُتحت في يوليوز 2025 على أرض مقلع قديم غنيّ بآثار ما قبل التاريخ: مسار طوله 1,2 كيلومتر، وورشات تطبيقية، ومركز للتعريف بالموقع.',
            es: 'Abrió en julio de 2025 en una antigua cantera llena de huellas prehistóricas: un sendero de 1,2 km, talleres prácticos y un centro de interpretación.'
          },
          tip: {
            fr: 'Vérifiez les horaires et le tarif avant d’y aller.',
            en: 'Check opening hours and prices before you go.',
            ar: 'تحقّق من أوقات الفتح والأسعار قبل الذهاب.',
            es: 'Consulta el horario y el precio antes de ir.'
          },
          duration: 90,
          maps: 'Parc archéologique de Sidi Abderrahmane, Casablanca'
        },
        // source: https://visitcasablanca.ma/pois/la-ferme-equestre-de-dar-bouazza
        // (dressage, jumping, endurance and trail rides; also a pool, tennis and mountain biking)
        // source: https://lepetitjournal.com/casablanca/actualites/vacances-scolaires-six-centres-de-loisirs-pour-vos-enfants-5301
        // (July 2023: on the coastal road to Azemmour, about 20 min from the centre; pony courses for children,
        //  a small educational farm. Its 2023 price is not used.)
        // source: https://www.telecontact.ma/annonceur/ferme-equestre-dar-bouazza/2121915/dar-bouazza.php
        // (route d'Azemmour; also listed at https://www.kerix.net/en/annuaire-entreprise/ferme-equestre)
        // The pony courses rest on the 2023 Petit Journal article only: hence the tip "call ahead".
        {
          id: 'ferme-equestre',
          icon: 'family',
          short: { fr: 'Poneys, balades et petite ferme', en: 'Ponies, rides and a small farm', ar: 'مهور ونزهات ومزرعة صغيرة', es: 'Ponis, paseos y granja' },
          name: { fr: 'Ferme équestre de Dar Bouazza', en: 'Dar Bouazza riding farm', ar: 'ضيعة الفروسية بدار بوعزة', es: 'Granja ecuestre Dar Bouazza' },
          area: { fr: 'Dar Bouazza · route d’Azemmour', en: 'Dar Bouazza · Azemmour road', ar: 'دار بوعزة · طريق أزمور', es: 'Dar Bouazza · carretera de Azemmour' },
          desc: {
            fr: 'Un centre équestre familial : stages de poney pour les enfants, randonnées à cheval et petite ferme pédagogique.',
            en: 'A family riding centre: pony courses for children, horse rides and a small educational farm.',
            ar: 'مركز فروسية عائلي: دورات لركوب المهور للأطفال، ونزهات على الخيل، ومزرعة تعليمية صغيرة.',
            es: 'Un centro ecuestre familiar: cursos de poni para niños, rutas a caballo y una pequeña granja educativa.'
          },
          tip: {
            fr: 'Appelez avant pour les horaires, les tarifs et les places en stage.',
            en: 'Call ahead for opening hours, prices and places on courses.',
            ar: 'اتصل مسبقاً لمعرفة الأوقات والأسعار والأماكن المتاحة في الدورات.',
            es: 'Llama antes para el horario, los precios y las plazas en los cursos.'
          },
          maps: 'Ferme Equestre Dar Bouazza'
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
        {
          id: 'door',
          areas: ['bourgogne'],
          title: { fr: 'Depuis votre porte', en: 'From your door', ar: 'من باب شقتك', es: 'Desde tu puerta' },
          duration: { fr: '3 h · à pied', en: '3 h · on foot', ar: '3 ساعات · مشياً', es: '3 h · a pie' },
          intro: {
            fr: 'Une fin de journée sans taxi : la mosquée, l’océan et le coucher du soleil, tout à pied depuis chez vous.',
            en: 'An evening without a taxi: the mosque, the ocean and the sunset, all on foot from your door.',
            ar: 'نهاية يوم بلا طاكسي: المسجد والمحيط والغروب، كلها مشياً من مسكنك.',
            es: 'Una tarde sin taxi: la mezquita, el océano y la puesta de sol, todo a pie desde tu alojamiento.'
          },
          mode: 'walking', fromHome: true,
          stops: [
            { time: '16:30', rel: -135, title: { fr: 'Mosquée Hassan II', en: 'Hassan II Mosque', ar: 'مسجد الحسن الثاني', es: 'Mezquita Hassan II' }, text: { fr: 'L’esplanade et la façade face à l’océan.', en: 'The esplanade and the façade over the ocean.', ar: 'الساحة والواجهة المطلّة على المحيط.', es: 'La explanada y la fachada sobre el océano.' }, maps: 'Mosquée Hassan II, Casablanca' },
            { time: '17:45', rel: -60, title: { fr: 'Le long de l’océan', en: 'Along the ocean', ar: 'على طول المحيط', es: 'Junto al océano' }, text: { fr: 'Revenez vers l’ouest par le bord de mer, en direction du phare.', en: 'Head back west along the seafront, towards the lighthouse.', ar: 'عُد غرباً على طول البحر في اتجاه المنارة.', es: 'Vuelve hacia el oeste por la costa, en dirección al faro.' } },
            { time: '18:30', rel: -20, title: { fr: 'Phare d’El Hank', en: 'El Hank Lighthouse', ar: 'منارة العنق', es: 'Faro de El Hank' }, text: { fr: 'Installez-vous sur les rochers pour le coucher du soleil.', en: 'Settle on the rocks for the sunset.', ar: 'اجلس على الصخور لمشاهدة الغروب.', es: 'Acomódate en las rocas para ver la puesta de sol.' }, maps: 'Phare d\'El Hank, Casablanca' },
            { time: '19:30', rel: 40, title: { fr: 'Dîner face à la mer', en: 'Dinner by the sea', ar: 'عشاء أمام البحر', es: 'Cena frente al mar' }, text: { fr: 'Le Cabestan, au pied du phare, ou l’une des adresses de la Corniche.', en: 'Le Cabestan at the foot of the lighthouse, or one of the Corniche addresses.', ar: '«لو كابيستان» عند سفح المنارة، أو أحد عناوين الكورنيش.', es: 'Le Cabestan, al pie del faro, o una de las direcciones de la Corniche.' }, maps: 'Le Cabestan, Casablanca' }
          ]
        },
        {
          id: 'oneday',
          title: { fr: 'Casablanca en un jour', en: 'Casablanca in one day', ar: 'الدار البيضاء في يوم واحد', es: 'Casablanca en un día' },
          duration: { fr: 'Journée · taxi et marche', en: 'Full day · taxi and walking', ar: 'يوم كامل · طاكسي ومشي', es: 'Día completo · taxi y a pie' },
          intro: {
            fr: 'L’essentiel de la ville en une journée, dans un ordre qui limite les trajets.',
            en: 'The essentials of the city in one day, in an order that keeps travel short.',
            ar: 'أهمّ ما في المدينة في يوم واحد، بترتيب يقلّل التنقّلات.',
            es: 'Lo esencial de la ciudad en un día, en un orden que reduce los trayectos.'
          },
          mode: 'driving',
          stops: [
            { time: '09:00', title: { fr: 'Petit-déjeuner à La Sqala', en: 'Breakfast at La Sqala', ar: 'الفطور في الصقالة', es: 'Desayuno en La Sqala' }, maps: 'La Sqala, Casablanca' },
            { time: '11:00', title: { fr: 'Mosquée Hassan II, visite guidée', en: 'Hassan II Mosque, guided tour', ar: 'مسجد الحسن الثاني، زيارة مرشدة', es: 'Mezquita Hassan II, visita guiada' }, maps: 'Mosquée Hassan II, Casablanca' },
            { time: '12:30', title: { fr: 'Ancienne Médina', en: 'Old Medina', ar: 'المدينة القديمة', es: 'Antigua medina' }, maps: 'Ancienne Médina, Casablanca' },
            { time: '13:30', title: { fr: 'Déjeuner au Port de Pêche', en: 'Lunch at the Port de Pêche', ar: 'الغداء في ميناء الصيد', es: 'Almuerzo en el Port de Pêche' }, maps: 'Restaurant du Port de Pêche, Casablanca' },
            { time: '15:30', title: { fr: 'Quartier des Habous', en: 'Habous Quarter', ar: 'حي الأحباس', es: 'Barrio de los Habous' }, text: { fr: 'Souks d’artisans et pâtisseries Bennis.', en: 'Craft souks and Bennis pastries.', ar: 'أسواق الحرفيين وحلويات بنيس.', es: 'Zocos de artesanos y pasteles de Bennis.' }, maps: 'Quartier Habous, Casablanca' },
            { time: '18:30', rel: -20, title: { fr: 'Coucher de soleil à El Hank', en: 'Sunset at El Hank', ar: 'الغروب في العنق', es: 'Atardecer en El Hank' }, maps: 'Phare d\'El Hank, Casablanca' },
            { time: '20:00', rel: 45, title: { fr: 'Dîner au Cabestan', en: 'Dinner at Le Cabestan', ar: 'العشاء في لو كابيستان', es: 'Cena en Le Cabestan' }, maps: 'Le Cabestan, Casablanca' }
          ]
        },
        {
          id: 'artdeco-walk',
          title: { fr: 'Casablanca Art déco', en: 'Art Deco Casablanca', ar: 'الدار البيضاء الآرت ديكو', es: 'Casablanca art déco' },
          duration: { fr: 'Demi-journée · à pied', en: 'Half day · on foot', ar: 'نصف يوم · مشياً', es: 'Medio día · a pie' },
          intro: {
            fr: 'Une marche dans le centre des années 1920 à 1950, le plus bel héritage architectural de la ville.',
            en: 'A walk through the 1920s–1950s centre, the city’s finest architectural heritage.',
            ar: 'جولة مشياً في وسط المدينة الذي شُيّد بين العشرينيات والخمسينيات، أجمل إرث معماري في المدينة.',
            es: 'Un paseo por el centro de los años 20 a 50, el mejor patrimonio arquitectónico de la ciudad.'
          },
          mode: 'walking',
          stops: [
            { time: '10:00', title: { fr: 'Place Mohammed V', en: 'Mohammed V Square', ar: 'ساحة محمد الخامس', es: 'Plaza Mohammed V' }, text: { fr: 'La place et ses grands bâtiments officiels.', en: 'The square and its grand official buildings.', ar: 'الساحة وبناياتها الرسمية الكبرى.', es: 'La plaza y sus grandes edificios oficiales.' }, maps: 'Place Mohammed V, Casablanca' },
            { time: '10:45', title: { fr: 'Boulevard Mohammed V', en: 'Boulevard Mohammed V', ar: 'شارع محمد الخامس', es: 'Bulevar Mohammed V' }, text: { fr: 'Façades, arcades et ferronneries : levez les yeux.', en: 'Façades, arcades and ironwork: look up.', ar: 'واجهات وأقواس وحديد مشغول: ارفع نظرك.', es: 'Fachadas, soportales y forja: mira hacia arriba.' }, maps: 'Boulevard Mohammed V, Casablanca' },
            { time: '11:30', title: { fr: 'Marché Central', en: 'Central Market', ar: 'السوق المركزي', es: 'Mercado Central' }, text: { fr: 'Flânez, puis déjeunez de poisson grillé.', en: 'Wander, then have grilled fish for lunch.', ar: 'تجوّل ثم تناول السمك المشوي على الغداء.', es: 'Pasea y almuerza pescado a la parrilla.' }, maps: 'Marché Central, Casablanca' },
            { time: '14:30', title: { fr: 'Cathédrale du Sacré-Cœur', en: 'Sacred Heart Cathedral', ar: 'كاتدرائية القلب المقدس', es: 'Catedral del Sagrado Corazón' }, maps: 'Cathédrale du Sacré-Cœur, Casablanca' },
            { time: '15:00', title: { fr: 'Musée Abderrahman Slaoui', en: 'Abderrahman Slaoui Museum', ar: 'متحف عبد الرحمن السلاوي', es: 'Museo Abderrahman Slaoui' }, maps: 'Musée Abderrahman Slaoui, Casablanca' },
            { time: '16:00', title: { fr: 'Parc de la Ligue Arabe', en: 'Arab League Park', ar: 'حديقة الجامعة العربية', es: 'Parque de la Liga Árabe' }, text: { fr: 'Une pause à l’ombre des palmiers pour finir.', en: 'A rest in the shade of the palms to finish.', ar: 'استراحة في ظلال النخيل للختام.', es: 'Un descanso a la sombra de las palmeras para terminar.' }, maps: 'Parc de la Ligue Arabe, Casablanca' }
          ]
        },
        {
          id: 'family-day',
          title: { fr: 'Une journée en famille', en: 'A family day', ar: 'يوم عائلي', es: 'Un día en familia' },
          duration: { fr: 'Journée · taxi', en: 'Full day · taxi', ar: 'يوم كامل · طاكسي', es: 'Día completo · taxi' },
          intro: {
            fr: 'Des activités pour tous les âges, avec une solution de repli s’il pleut.',
            en: 'Activities for every age, with a fallback if it rains.',
            ar: 'أنشطة لكل الأعمار، مع بديل في حال المطر.',
            es: 'Actividades para todas las edades, con alternativa si llueve.'
          },
          mode: 'driving',
          stops: [
            { time: '10:00', title: { fr: 'Parc de la Ligue Arabe', en: 'Arab League Park', ar: 'حديقة الجامعة العربية', es: 'Parque de la Liga Árabe' }, text: { fr: 'Aires de jeux et grandes allées.', en: 'Playgrounds and wide paths.', ar: 'فضاءات ألعاب وممرات واسعة.', es: 'Zonas de juego y grandes paseos.' }, maps: 'Parc de la Ligue Arabe, Casablanca' },
            { time: '12:30', title: { fr: 'Déjeuner sur la Corniche', en: 'Lunch on the Corniche', ar: 'الغداء على الكورنيش', es: 'Almuerzo en la Corniche' }, maps: 'Corniche Aïn Diab, Casablanca' },
            { time: '14:00', title: { fr: 'Morocco Mall', en: 'Morocco Mall', ar: 'موروكو مول', es: 'Morocco Mall' }, text: { fr: 'L’aquarium et le parc de jeux, parfaits s’il pleut.', en: 'The aquarium and the play park, perfect if it rains.', ar: 'حوض الأسماك ومدينة الألعاب، مثاليان إن أمطرت.', es: 'El acuario y el parque de juegos, perfectos si llueve.' }, maps: 'Morocco Mall, Casablanca' },
            { time: '17:00', title: { fr: 'Parc Sindibad', en: 'Sindibad Park', ar: 'حديقة سندباد', es: 'Parque Sindibad' }, text: { fr: 'Ou la plage d’Aïn Diab s’il fait beau.', en: 'Or Aïn Diab beach if the weather is fine.', ar: 'أو شاطئ عين الذئاب إن كان الجو جميلاً.', es: 'O la playa de Aïn Diab si hace buen tiempo.' }, maps: 'Parc Sindibad, Casablanca' }
          ]
        },
        // source: https://www.okvoyage.com/?p=43411 and https://www.cityzeum.com/la-corniche
        // (the El Hank to Aïn Diab walk, about 5 km, "surtout au coucher du soleil")
        // source: https://kayak.ae/Casablanca-Hotels-Pestana-Casablanca.518172.ksp (El Hank lighthouse 1.8 km);
        // https://www.sembo.com/d/hotel-30995_pestana_casablanca_casablanca (2.9 km); hence "about 2 to 3 km"
        // source: https://uk.trip.com/travel-guide/foods/Casablanca-1693-restaurant/Le%20Cabestan-17312109
        // (Le Cabestan, 90 Bd de la Corniche, Phare d'El Hank)
        // Since April 2026 the 6.7 km from El Hank to Morocco Mall have been under demolition
        // (https://telquel.ma/2026/04/22/six-choses-a-savoir-sur-ain-diab-la-corniche-sous-le-bulldozer_1985714).
        // No report of Le Cabestan closing was found (Oct. 2026), but the stop says to check it is open.
        {
          id: 'door-aindiab',
          areas: ['ain-diab'],
          title: { fr: 'Depuis votre porte', en: 'From your door', ar: 'من باب شقتك', es: 'Desde tu puerta' },
          duration: { fr: '3 h · à pied', en: '3 h · on foot', ar: '3 ساعات · مشياً', es: '3 h · a pie' },
          intro: {
            fr: 'Une fin de journée le long de l’océan : la Corniche à pied jusqu’au phare d’El Hank pour le coucher du soleil, puis le dîner.',
            en: 'An evening along the ocean: the Corniche on foot to El Hank lighthouse for the sunset, then dinner.',
            ar: 'نهاية يوم على طول المحيط: الكورنيش مشياً حتى منارة العنق لمشاهدة الغروب، ثم العشاء.',
            es: 'Una tarde junto al océano: la Corniche a pie hasta el faro de El Hank para el atardecer, y luego la cena.'
          },
          mode: 'walking', fromHome: true,
          stops: [
            { time: '17:20', rel: -90, title: { fr: 'Départ d’Anfa Place', en: 'Leaving Anfa Place', ar: 'الانطلاق من أنفا بلاس', es: 'Salida desde Anfa Place' }, text: { fr: 'Rejoignez le bord de mer et partez vers l’est, en direction du phare.', en: 'Reach the seafront and head east, towards the lighthouse.', ar: 'انزل إلى الواجهة البحرية واتجه شرقاً نحو المنارة.', es: 'Baja al paseo marítimo y ve hacia el este, en dirección al faro.' } },
            { time: '17:50', rel: -60, title: { fr: 'Le long de la Corniche', en: 'Along the Corniche', ar: 'على طول الكورنيش', es: 'Por la Corniche' }, text: { fr: 'Environ 2 à 3 km face aux vagues, à votre rythme.', en: 'About 2 to 3 km facing the waves, at your own pace.', ar: 'نحو 2 إلى 3 كيلومترات أمام الأمواج، على راحتك.', es: 'Unos 2 a 3 km frente a las olas, a tu ritmo.' } },
            { time: '18:30', rel: -20, title: { fr: 'Phare d’El Hank', en: 'El Hank Lighthouse', ar: 'منارة العنق', es: 'Faro de El Hank' }, text: { fr: 'Installez-vous sur les rochers pour le coucher du soleil.', en: 'Settle on the rocks for the sunset.', ar: 'اجلس على الصخور لمشاهدة الغروب.', es: 'Acomódate en las rocas para ver la puesta de sol.' }, maps: 'Phare d\'El Hank, Casablanca' },
            { time: '19:30', rel: 40, title: { fr: 'Dîner face à la mer', en: 'Dinner by the sea', ar: 'عشاء أمام البحر', es: 'Cena frente al mar' }, text: { fr: 'Le Cabestan, au pied du phare (vérifiez qu’il est ouvert), ou une autre table de la Corniche. Pour rentrer, un petit taxi suffit.', en: 'Le Cabestan, at the foot of the lighthouse (check it is open), or another Corniche table. A petit taxi brings you back.', ar: '«لو كابيستان» بجوار المنارة (تأكّد من أنه مفتوح)، أو مطعم آخر على الكورنيش. وللعودة يكفي طاكسي صغير.', es: 'Le Cabestan, al pie del faro (comprueba que esté abierto), u otra mesa de la Corniche. Para volver, basta un petit taxi.' }, maps: 'Le Cabestan, Casablanca' }
          ]
        },
        // source: https://fr.hespress.com/481822-dar-bouazza-la-plage-tamaris-2-decroche-son-premier-pavillon-bleu.html (Tamaris 2)
        // source: https://fr.surf-forecast.com/breaks/Jackbeach (Jack Beach, beach break that works all year)
        // source: https://carrefourmarket.ma/nos-magasins/casablanca/carrefour-market-casablanca-dar-bouazza/ (free car park)
        // The coast faces the Atlantic to the north-west: the sun sets over the ocean.
        {
          id: 'door-darbouazza',
          areas: ['dar-bouazza'],
          title: { fr: 'Depuis votre porte', en: 'From your door', ar: 'من باب شقتك', es: 'Desde tu puerta' },
          duration: { fr: '3 h · en voiture', en: '3 h · by car', ar: '3 ساعات · بالسيارة', es: '3 h · en coche' },
          intro: {
            fr: 'Une fin de journée sur la côte de Dar Bouazza : la plage, les surfeurs, le coucher du soleil sur l’océan, puis les courses du dîner.',
            en: 'An evening on the Dar Bouazza coast: the beach, the surfers, the sunset over the ocean, then shopping for dinner.',
            ar: 'نهاية يوم على ساحل دار بوعزة: الشاطئ وراكبو الأمواج وغروب الشمس على المحيط، ثم التسوّق للعشاء.',
            es: 'Una tarde en la costa de Dar Bouazza: la playa, los surfistas, la puesta de sol sobre el océano y luego la compra para la cena.'
          },
          mode: 'driving', fromHome: true,
          stops: [
            { time: '16:20', rel: -150, title: { fr: 'Plage Tamaris 2', en: 'Tamaris 2 Beach', ar: 'شاطئ تماريس 2', es: 'Playa Tamaris 2' }, text: { fr: 'Baignade en saison près des sauveteurs, ou balade sur le sable.', en: 'A swim near the lifeguards in season, or a walk on the sand.', ar: 'سباحة قرب المنقذين في موسم الاصطياف، أو نزهة على الرمال.', es: 'Un baño cerca de los socorristas en temporada, o un paseo por la arena.' }, maps: 'Plage Tamaris 2, Dar Bouazza' },
            { time: '17:50', rel: -60, title: { fr: 'Jack Beach', en: 'Jack Beach', ar: 'جاك بيتش', es: 'Jack Beach' }, text: { fr: 'Regardez les surfeurs dans les vagues.', en: 'Watch the surfers in the waves.', ar: 'تأمّل راكبي الأمواج وسط الموج.', es: 'Mira a los surfistas en las olas.' }, maps: 'Jack Beach, Dar Bouazza' },
            { time: '18:30', rel: -20, title: { fr: 'Coucher de soleil', en: 'Sunset', ar: 'غروب الشمس', es: 'Puesta de sol' }, text: { fr: 'Restez sur la plage : le soleil se couche sur l’océan.', en: 'Stay on the beach: the sun sets over the ocean.', ar: 'ابقَ على الشاطئ، فالشمس تغرب على المحيط.', es: 'Quédate en la playa: el sol se pone sobre el océano.' } },
            { time: '19:10', rel: 20, title: { fr: 'Courses pour le dîner', en: 'Shopping for dinner', ar: 'التسوّق للعشاء', es: 'Compra para la cena' }, text: { fr: 'Carrefour Market, avec parking gratuit, avant de rentrer.', en: 'Carrefour Market, with free parking, before heading home.', ar: 'كارفور ماركت، وبه موقف مجاني، قبل العودة إلى البيت.', es: 'Carrefour Market, con parking gratuito, antes de volver.' }, maps: 'Carrefour Market Dar Bouazza' }
          ]
        }
      ]
    },

    /* ------------------------------------------------------------------ */
    transport: {
      icon: 'car', tint: '#A1423A',
      type: 'info',
      title: { fr: 'Transport', en: 'Getting around', ar: 'التنقّل', es: 'Transporte' },
      sub: { fr: 'Taxi · Tram · Aéroport', en: 'Taxi · Tram · Airport', ar: 'طاكسي · ترامواي · مطار', es: 'Taxi · Tranvía · Aeropuerto' },
      intro: {
        fr: 'Se déplacer à Casablanca est simple quand on connaît quelques règles.',
        en: 'Getting around Casablanca is easy once you know a few rules.',
        ar: 'التنقّل في الدار البيضاء سهل حين تعرف بعض القواعد.',
        es: 'Moverse por Casablanca es fácil cuando conoces unas pocas reglas.'
      },
      blocks: [
        {
          title: { fr: 'Petits taxis rouges', en: 'Red petits taxis', ar: 'الطاكسيات الصغيرة الحمراء', es: 'Petits taxis rojos' },
          icon: 'car',
          key: { fr: 'Demandez le compteur', en: 'Ask for the meter', ar: 'اطلب تشغيل العدّاد', es: 'Pide el taxímetro' },
          list: [
            { fr: 'Ils circulent partout en ville. Demandez « le compteur » au départ.', en: 'They run everywhere in town. Ask for “le compteur” (the meter) when you get in.', ar: 'تجوب المدينة كلها. اطلب تشغيل «العدّاد» عند الانطلاق.', es: 'Circulan por toda la ciudad. Pide «le compteur» (el taxímetro) al subir.' },
            { fr: 'Trois passagers maximum. Le chauffeur peut prendre d’autres clients en route : c’est normal.', en: 'Three passengers maximum. The driver may pick up other passengers on the way: this is normal.', ar: 'ثلاثة ركاب كحدّ أقصى، وقد يقلّ السائق ركاباً آخرين في الطريق، وهذا أمر عادي.', es: 'Tres pasajeros como máximo. El conductor puede recoger a otros clientes por el camino: es normal.' },
            { fr: 'Le tarif est majoré la nuit. Payez en espèces, avec de la petite monnaie.', en: 'Fares go up at night. Pay in cash, with small change.', ar: 'تزداد التعريفة ليلاً. ادفع نقداً وبقطع نقدية صغيرة.', es: 'La tarifa sube por la noche. Paga en efectivo, con cambio pequeño.' }
          ]
        },
        {
          title: { fr: 'Applications de VTC', en: 'Ride-hailing apps', ar: 'تطبيقات النقل', es: 'Apps de VTC' },
          icon: 'phone',
          key: { fr: 'Uber ou inDrive', en: 'Uber or inDrive', ar: 'Uber أو inDrive', es: 'Uber o inDrive' },
          body: {
            fr: 'Des applications comme Uber (de retour depuis fin 2025) ou inDrive fonctionnent à Casablanca et indiquent le prix avant la course.',
            en: 'Apps such as Uber (back since late 2025) or inDrive work in Casablanca and show the price before the ride.',
            ar: 'تطبيقات مثل Uber (عاد منذ أواخر 2025) وinDrive تعمل في الدار البيضاء وتعرض الثمن قبل الرحلة.',
            es: 'Apps como Uber (de vuelta desde finales de 2025) o inDrive funcionan en Casablanca y muestran el precio antes del viaje.'
          }
        },
        {
          title: { fr: 'Tramway et busway', en: 'Tram and busway', ar: 'الترامواي والباصواي', es: 'Tranvía y busway' },
          icon: 'tram',
          key: { fr: '≈ 8 MAD le ticket', en: '≈ 8 MAD a ticket', ar: '≈ 8 دراهم للتذكرة', es: '≈ 8 MAD el billete' },
          body: {
            fr: 'Quatre lignes de tramway (T1 à T4) et deux lignes de busway. Un ticket coûte environ 8 MAD, avec correspondances pendant 2 heures. Service d’environ 6 h à 22 h 30.',
            en: 'Four tram lines (T1 to T4) and two busway lines. A ticket costs about 8 MAD, with transfers for 2 hours. Service runs roughly 6 am to 10:30 pm.',
            ar: 'أربعة خطوط ترامواي (من T1 إلى T4) وخطّان للباصواي. تذكرة واحدة بنحو 8 دراهم مع إمكانية التحويل لمدة ساعتين. الخدمة من السادسة صباحاً تقريباً حتى العاشرة والنصف ليلاً.',
            es: 'Cuatro líneas de tranvía (T1 a T4) y dos de busway. Un billete cuesta unos 8 MAD, con transbordos durante 2 horas. Servicio aproximado de 6:00 a 22:30.'
          },
          list: [
            { fr: 'T1 : gare Casa Voyageurs', en: 'T1: Casa Voyageurs station', ar: 'T1: محطة الدار البيضاء المسافرين', es: 'T1: estación Casa Voyageurs' },
            { fr: 'T2 : plage d’Aïn Diab', en: 'T2: Aïn Diab beach', ar: 'T2: شاطئ عين الذئاب', es: 'T2: playa de Aïn Diab' },
            { fr: 'T3 : gare Casa Port', en: 'T3: Casa Port station', ar: 'T3: محطة الدار البيضاء الميناء', es: 'T3: estación Casa Port' }
          ]
        },
        {
          title: { fr: 'Aéroport Mohammed V', en: 'Mohammed V Airport', ar: 'مطار محمد الخامس', es: 'Aeropuerto Mohammed V' },
          icon: 'plane',
          key: { fr: 'Train ONCF, 35–50 min', en: 'ONCF train, 35–50 min', ar: 'قطار ONCF، 35–50 دقيقة', es: 'Tren ONCF, 35–50 min' },
          body: {
            fr: 'L’aéroport se trouve à environ 30 km au sud de la ville.',
            en: 'The airport is about 30 km south of the city.',
            ar: 'يقع المطار على بُعد نحو 30 كيلومتراً جنوب المدينة.',
            es: 'El aeropuerto está a unos 30 km al sur de la ciudad.'
          },
          list: [
            { fr: 'Train ONCF : vers Casa Voyageurs ou Casa Port, environ 35 à 50 minutes, de 45 à 70 MAD selon la classe.', en: 'ONCF train: to Casa Voyageurs or Casa Port, about 35 to 50 minutes, 45 to 70 MAD depending on class.', ar: 'قطار ONCF: نحو محطة المسافرين أو محطة الميناء، في 35 إلى 50 دقيقة تقريباً، بين 45 و70 درهماً حسب الدرجة.', es: 'Tren ONCF: a Casa Voyageurs o Casa Port, unos 35 a 50 minutos, de 45 a 70 MAD según la clase.' },
            { fr: 'Grand taxi : prix fixe d’environ 300 MAD jusqu’en ville. Mettez-vous d’accord avant de partir. Les petits taxis ne desservent pas l’aéroport.', en: 'Grand taxi: a fixed price of about 300 MAD into town. Agree before you leave. Petits taxis do not serve the airport.', ar: 'الطاكسي الكبير: ثمن ثابت بنحو 300 درهم حتى المدينة، فاتفق عليه قبل الانطلاق. الطاكسيات الصغيرة لا تخدم المطار.', es: 'Grand taxi: precio fijo de unos 300 MAD hasta la ciudad. Acuérdalo antes de salir. Los petits taxis no van al aeropuerto.' },
            { fr: 'Transfert privé : {host} peut l’organiser pour vous.', en: 'Private transfer: {host} can arrange it for you.', ar: 'نقل خاص: يمكن لـ{host} تنظيمه لك.', es: 'Traslado privado: {host} puede organizarlo.' }
          ],
          request: { fr: 'un transfert aéroport', en: 'an airport transfer', ar: 'نقلاً من/إلى المطار', es: 'un traslado al aeropuerto' }
        },
        {
          title: { fr: 'Gares', en: 'Train stations', ar: 'محطات القطار', es: 'Estaciones de tren' },
          icon: 'train',
          key: { fr: 'Casa Voyageurs · Casa Port', en: 'Casa Voyageurs · Casa Port', ar: 'محطتا المسافرين والميناء', es: 'Casa Voyageurs · Casa Port' },
          list: [
            { fr: 'Casa Voyageurs : la gare principale, avec le TGV Al Boraq vers Rabat et Tanger, et les trains pour Marrakech et Fès.', en: 'Casa Voyageurs: the main station, with the Al Boraq high-speed train to Rabat and Tangier, and trains to Marrakech and Fez.', ar: 'الدار البيضاء المسافرين: المحطة الرئيسية، ومنها قطار البراق فائق السرعة نحو الرباط وطنجة، وقطارات مراكش وفاس.', es: 'Casa Voyageurs: la estación principal, con el tren de alta velocidad Al Boraq a Rabat y Tánger, y trenes a Marrakech y Fez.' },
            { fr: 'Casa Port : la gare du centre, près de la médina.', en: 'Casa Port: the central station, near the medina.', ar: 'الدار البيضاء الميناء: محطة وسط المدينة قرب المدينة القديمة.', es: 'Casa Port: la estación del centro, cerca de la medina.' }
          ]
        },
        {
          title: { fr: 'Voiture et stationnement', en: 'Car and parking', ar: 'السيارة والوقوف', es: 'Coche y aparcamiento' },
          icon: 'car',
          key: { fr: 'Quelques dirhams au gardien', en: 'Tip the street attendant', ar: 'بضعة دراهم للحارس', es: 'Unos dírhams al vigilante' },
          body: {
            fr: 'La circulation est dense aux heures de pointe. Dans la rue, des gardiens en gilet surveillent les voitures : laissez-leur quelques dirhams en partant.',
            en: 'Traffic is heavy at rush hour. On the street, attendants in vests watch the cars: give them a few dirhams when you leave.',
            ar: 'حركة السير كثيفة في أوقات الذروة. في الشارع، يحرس حرّاس بسترات السيارات، فاترك لهم بضعة دراهم عند المغادرة.',
            es: 'El tráfico es denso en horas punta. En la calle, vigilantes con chaleco cuidan los coches: déjales unos dírhams al irte.'
          }
        },
        // source: https://en.wikipedia.org/wiki/Casablanca_Tramway
        // (T2: Aïn Diab Plage to Sidi Bernoussi; changes with T1 at Abdelmoumen-Anoual and Ibn Tachfine)
        // source: https://fr.hespress.com/57343-la-deuxieme-ligne-du-tramway-casablancais-critiquee-ratp-dev-sexplique.html
        // (2019: from Aïn Diab to the centre, change at Anoual-Abdelmoumen; re-check on casatramway.ma)
        // source: https://www.smartertravel.com/local-taxis-casablanca-transportation/ (red petits taxis)
        // source: https://fourseasons.com/casablanca/getting-here (same Anfa Place complex: airport about 38 km, 45 min)
        {
          title: { fr: 'Si vous logez à Aïn Diab', en: 'If you stay in Ain Diab', ar: 'إن كنت تقيم في عين الذئاب', es: 'Si te alojas en Aïn Diab' },
          icon: 'tram',
          key: { fr: 'Taxis de la Corniche · tram T2', en: 'Corniche taxis · tram T2', ar: 'طاكسيات الكورنيش · ترامواي T2', es: 'Taxis de la Corniche · tranvía T2' },
          list: [
            { fr: 'Les petits taxis rouges circulent sur le boulevard de la Corniche : faites signe au bord de la route.', en: 'Red petits taxis run along the Boulevard de la Corniche: wave one down from the roadside.', ar: 'تجوب الطاكسيات الصغيرة الحمراء شارع الكورنيش، فأشِر إلى إحداها من جانب الطريق.', es: 'Los petits taxis rojos circulan por el bulevar de la Corniche: haz una seña desde la acera.' },
            { fr: 'Le tram T2 part du terminus Aïn Diab Plage. Pour la gare Casa Voyageurs, changez pour le T1 à Abdelmoumen-Anoual.', en: 'Tram T2 starts at the Aïn Diab Plage terminus. For Casa Voyageurs station, change to T1 at Abdelmoumen-Anoual.', ar: 'ينطلق الترامواي T2 من محطته النهائية «عين الذئاب الشاطئ». وللوصول إلى محطة الدار البيضاء المسافرين، انتقل إلى الخط T1 في محطة عبد المومن-أنوال.', es: 'El tranvía T2 sale de la terminal Aïn Diab Plage. Para la estación Casa Voyageurs, cambia al T1 en Abdelmoumen-Anoual.' },
            { fr: 'Aéroport : environ 45 minutes en voiture, davantage aux heures de pointe et l’été.', en: 'Airport: about 45 minutes by car, longer at rush hour and in summer.', ar: 'المطار: نحو 45 دقيقة بالسيارة، وأكثر في أوقات الذروة وفي الصيف.', es: 'Aeropuerto: unos 45 minutos en coche, más en hora punta y en verano.' }
          ]
        },
        // source: https://www.smartertravel.com/local-taxis-casablanca-transportation/
        // (red petits taxis stay within the city; grands taxis go beyond it). No source says outright
        // that a petit taxi refuses Dar Bouazza, hence "en principe".
        // source: https://www.lavieeco.com/?p=60812 (grand-taxi stations in Dar Bouazza)
        // source: https://telquel.ma/2025/11/27/uber-annonce-officiellement-son-retour-au-maroc-a-la-veille-de-la-can-2025_1962895
        // source: https://www.uber.com/ma/fr/newsroom/uber-in-morocco (Casablanca; no source confirms coverage of Dar Bouazza)
        // source: https://bento.travel/morocco/ride-hailing (inDrive in Casablanca)
        // source: https://medias24.com/2021/10/14/circulation-dar-bouazza-casablanca-les-habitants-obtiennent-quelques-ameliorations/
        // (R320: jams about 7:00–9:30 and 16:30–20:30; 2021 figures, hence "en général")
        // source: https://www.airporttransferportal.com/en/airport-guides/cmn and research-darbouazza.json
        // (airport about 45–50 min by car; Dar Bouazza has no train station)
        // source: https://www.casabus.ma/en/casabus-operated-by-alsa/ (Dar Bouazza is one of the communes served)
        // source: https://fr.hespress.com/271136-ete-casabus-renforce-12-lignes-de-bus-vers-les-plages.html
        // (summer 2022: Casabus beach lines, Tamaris among the beaches served; line numbers not given to guests)
        {
          title: { fr: 'Si vous logez à Dar Bouazza', en: 'If you stay in Dar Bouazza', ar: 'إن كنت تقيم في دار بوعزة', es: 'Si te alojas en Dar Bouazza' },
          icon: 'car',
          key: { fr: 'Voiture conseillée', en: 'A car is best', ar: 'يُنصح بالسيارة', es: 'Mejor en coche' },
          list: [
            { fr: 'Les petits taxis rouges circulent en principe dans Casablanca seulement. Pour Dar Bouazza, prévoyez une voiture, un grand taxi ou une application.', en: 'Red petits taxis are meant to stay within Casablanca. For Dar Bouazza, plan on a car, a grand taxi or an app.', ar: 'الطاكسيات الصغيرة الحمراء مخصّصة مبدئياً للتنقّل داخل الدار البيضاء، فاعتمد للوصول إلى دار بوعزة على سيارة أو طاكسي كبير أو تطبيق.', es: 'En principio, los petits taxis rojos solo circulan por Casablanca. Para Dar Bouazza, cuenta con un coche, un grand taxi o una app.' },
            { fr: 'Uber et inDrive fonctionnent à Casablanca : vérifiez dans l’application qu’ils viennent jusqu’à votre adresse.', en: 'Uber and inDrive work in Casablanca: check in the app that they come out to your address.', ar: 'يعمل Uber وinDrive في الدار البيضاء، فتحقّق في التطبيق من أنهما يصلان إلى عنوانك.', es: 'Uber e inDrive funcionan en Casablanca: comprueba en la app que llegan hasta tu dirección.' },
            { fr: 'La route vers Casablanca est souvent bouchée aux heures de pointe, en général de 7 h à 9 h 30 et de 16 h 30 à 20 h 30.', en: 'The road into Casablanca is often jammed at rush hour, usually 7 to 9:30 am and 4:30 to 8:30 pm.', ar: 'الطريق نحو الدار البيضاء مزدحمة غالباً في أوقات الذروة، عادةً من 7:00 إلى 9:30 ومن 16:30 إلى 20:30.', es: 'La carretera hacia Casablanca suele atascarse en hora punta, en general de 7:00 a 9:30 y de 16:30 a 20:30.' },
            { fr: 'Aéroport : environ 45 à 50 minutes en voiture sans embouteillages, et pas de train jusqu’à Dar Bouazza. {host} peut organiser un transfert.', en: 'Airport: about 45 to 50 minutes by car without traffic, and no train to Dar Bouazza. {host} can arrange a transfer.', ar: 'المطار: نحو 45 إلى 50 دقيقة بالسيارة دون ازدحام، ولا يوجد قطار إلى دار بوعزة. يمكن لـ{host} تنظيم نقلك.', es: 'Aeropuerto: unos 45 a 50 minutos en coche sin atascos, y no hay tren hasta Dar Bouazza. {host} puede organizar un traslado.' },
            { fr: 'Des bus Casabus desservent Dar Bouazza : lignes et horaires sur casabus.ma.', en: 'Casabus buses serve Dar Bouazza: routes and times on casabus.ma.', ar: 'تخدم حافلات Casabus دار بوعزة، وتجد الخطوط والمواعيد على casabus.ma.', es: 'Los autobuses Casabus llegan a Dar Bouazza: líneas y horarios en casabus.ma.' }
          ],
          request: { fr: 'un transfert aéroport', en: 'an airport transfer', ar: 'نقلاً من/إلى المطار', es: 'un traslado al aeropuerto' }
        }
      ]
    },

    /* ------------------------------------------------------------------ */
    experiences: {
      icon: 'lantern', tint: '#8A6A2F',
      type: 'places',
      title: { fr: 'Expériences', en: 'Experiences', ar: 'تجارب', es: 'Experiencias' },
      intro: {
        fr: 'Quelques moments très marocains, et ce que {host} peut organiser pour vous.',
        en: 'A few truly Moroccan moments, and what {host} can arrange for you.',
        ar: 'لحظات مغربية أصيلة، وما يمكن لـ{host} تنظيمه لك.',
        es: 'Algunos momentos muy marroquíes, y lo que {host} puede organizar para ti.'
      },
      items: [
        {
          id: 'hammam-ziani',
          icon: 'steam',
          short: { fr: 'Vapeur, gommage au savon noir', en: 'Steam and black-soap scrub', ar: 'بخار وتقشير بالصابون البلدي', es: 'Vapor y exfoliación, jabón negro' },
          name: { fr: 'Hammam Ziani', ar: 'حمّام الزياني' },
          area: { fr: 'Hammam traditionnel', en: 'Traditional hammam', ar: 'حمّام تقليدي', es: 'Hammam tradicional' },
          desc: {
            fr: 'Le rituel du hammam dans un cadre soigné : vapeur, gommage au savon noir, masque, puis massage à l’huile d’argan en option.',
            en: 'The hammam ritual in a refined setting: steam, black-soap scrub, a mask, then an optional argan oil massage.',
            ar: 'طقس الحمّام في فضاء أنيق: بخار وتقشير بالصابون البلدي وقناع، ثم تدليك بزيت الأركان حسب الرغبة.',
            es: 'El ritual del hammam en un espacio cuidado: vapor, exfoliación con jabón negro, mascarilla y, si quieres, masaje con aceite de argán.'
          },
          tip: {
            fr: 'Hommes et femmes sont accueillis séparément. Réservez la veille ; serviettes et produits sont fournis.',
            en: 'Men and women are welcomed separately. Book the day before; towels and products are provided.',
            ar: 'يُستقبل الرجال والنساء بشكل منفصل. احجز في اليوم السابق، والمناشف والمستحضرات متوفّرة.',
            es: 'Hombres y mujeres por separado. Reserva el día anterior; toallas y productos incluidos.'
          },
          duration: 120, price: 300, priceFrom: true,
          maps: 'Hammam Ziani, Casablanca'
        },
        {
          id: 'mosque-night',
          icon: 'moon',
          short: { fr: 'Illuminée, face à l’océan', en: 'Lit up, over the ocean', ar: 'مضاء، أمام المحيط', es: 'Iluminada, frente al océano' },
          name: { fr: 'La mosquée Hassan II la nuit', en: 'Hassan II Mosque at night', ar: 'مسجد الحسن الثاني ليلاً', es: 'La mezquita Hassan II de noche' },
          area: { fr: 'Front de mer', en: 'Seafront', ar: 'الواجهة البحرية', es: 'Frente al mar' },
          desc: {
            fr: 'Le soir, la mosquée s’illumine et l’esplanade devient une grande promenade face à l’océan.',
            en: 'In the evening the mosque is lit up and the esplanade becomes a wide promenade over the ocean.',
            ar: 'في المساء يُضاء المسجد وتتحوّل الساحة إلى ممشى واسع أمام المحيط.',
            es: 'Por la noche la mezquita se ilumina y la explanada se convierte en un gran paseo frente al océano.'
          },
          tip: {
            fr: 'Tenue respectueuse : l’esplanade fait partie d’un lieu de prière.',
            en: 'Dress respectfully: the esplanade is part of a place of worship.',
            ar: 'التزم بلباس محتشم، فالساحة جزء من مكان للصلاة.',
            es: 'Viste con respeto: la explanada forma parte de un lugar de oración.'
          },
          duration: 60, price: 0,
          maps: 'Mosquée Hassan II, Casablanca'
        },
        {
          id: 'tea-habous',
          icon: 'mint',
          short: { fr: 'Thé et pâtisseries en terrasse', en: 'Terrace tea and pastries', ar: 'شاي وحلويات على شرفة مقهى', es: 'Té y pasteles en terraza' },
          name: { fr: 'Thé à la menthe aux Habous', en: 'Mint tea in the Habous', ar: 'شاي بالنعناع في الأحباس', es: 'Té a la menta en los Habous' },
          area: { fr: 'Habous', ar: 'الأحباس' },
          desc: {
            fr: 'Asseyez-vous à une terrasse des Habous, commandez un thé et quelques pâtisseries, et regardez vivre le quartier.',
            en: 'Sit at a café terrace in the Habous, order tea and a few pastries, and watch the neighbourhood go by.',
            ar: 'اجلس في مقهى بالأحباس، واطلب شاياً وبعض الحلويات، وتأمّل حياة الحي.',
            es: 'Siéntate en una terraza de los Habous, pide un té y unos pasteles, y mira pasar la vida del barrio.'
          },
          duration: 45, budget: 1,
          maps: 'Quartier Habous, Casablanca'
        },
        {
          id: 'cooking',
          icon: 'chef',
          short: { fr: 'Tajine, salades et thé', en: 'Tagine, salads and mint tea', ar: 'طاجين وسلطات وشاي', es: 'Tajín, ensaladas y té' },
          kind: 'request',
          name: { fr: 'Cours de cuisine marocaine', en: 'Moroccan cooking class', ar: 'درس في الطبخ المغربي', es: 'Clase de cocina marroquí' },
          area: { fr: 'Sur demande', en: 'On request', ar: 'عند الطلب', es: 'Bajo petición' },
          desc: {
            fr: 'Apprenez à préparer un tajine, des salades marocaines et le thé, avec une cuisinière ou un chef local.',
            en: 'Learn to make a tagine, Moroccan salads and mint tea with a local cook.',
            ar: 'تعلّم تحضير الطاجين والسلطات المغربية والشاي مع طبّاخة أو طبّاخ محلّي.',
            es: 'Aprende a preparar un tajín, ensaladas marroquíes y té con una cocinera o un cocinero local.'
          },
          request: { fr: 'un cours de cuisine marocaine', en: 'a Moroccan cooking class', ar: 'درساً في الطبخ المغربي', es: 'una clase de cocina marroquí' }
        },
        {
          id: 'guide',
          icon: 'map',
          short: { fr: 'Guide local, à votre rythme', en: 'Local guide, at your pace', ar: 'مرشد محلي، على راحتك', es: 'Guía local, a tu ritmo' },
          kind: 'request',
          name: { fr: 'Guide privé', en: 'Private guide', ar: 'مرشد خاص', es: 'Guía privado' },
          area: { fr: 'Sur demande', en: 'On request', ar: 'عند الطلب', es: 'Bajo petición' },
          desc: {
            fr: 'Une demi-journée ou une journée avec un guide local, en français, anglais, arabe ou espagnol, à votre rythme.',
            en: 'A half or full day with a local guide, in French, English, Arabic or Spanish, at your own pace.',
            ar: 'نصف يوم أو يوم كامل مع مرشد محلّي بالفرنسية أو الإنجليزية أو العربية أو الإسبانية، حسب إيقاعك.',
            es: 'Medio día o un día completo con un guía local, en francés, inglés, árabe o español, a tu ritmo.'
          },
          request: { fr: 'un guide privé', en: 'a private guide', ar: 'مرشداً خاصاً', es: 'un guía privado' }
        }
      ]
    }
  }
};
