/*
 * Darna Collection — the brand, its cities and the list of places.
 *
 * Loaded on every page. The home screen (the chooser) is built from this file
 * alone; each place's guide then loads content/morocco.js, its city file
 * (content/cities/<city>.js) and its own file (content/stays/<id>.js).
 *
 * To add a place: add a line to `stays` below, copy one of the files in
 * content/stays/ under the new id, and copy one of the place folders at the
 * root of the site (e.g. pestana/) under the same id. See README.md.
 *
 * Security: this file is public. Never put a door or key-box code, a floor,
 * a studio or apartment number here; send those in the Airbnb messages.
 */
window.CASA = window.CASA || {};

(function () {
  // Facts shown on each place's card, in the four languages
  function count(k, fr, frs, en, ens, ar1, ar2, arN, es, ess) {
    return {
      fr: k + ' ' + (k > 1 ? frs : fr),
      en: k + ' ' + (k > 1 ? ens : en),
      ar: k === 1 ? ar1 : k === 2 ? ar2 : k + ' ' + arN,
      es: k + ' ' + (k > 1 ? ess : es)
    };
  }
  var fact = {
    bedrooms: function (k) { return { icon: 'bed', label: count(k, 'chambre', 'chambres', 'bedroom', 'bedrooms', 'غرفة نوم', 'غرفتا نوم', 'غرف نوم', 'dormitorio', 'dormitorios') }; },
    bathrooms: function (k) { return { icon: 'bath', label: count(k, 'salle de bain', 'salles de bain', 'bathroom', 'bathrooms', 'حمّام', 'حمّامان', 'حمّامات', 'baño', 'baños') }; },
    studios: function (k) { return { icon: 'key', label: count(k, 'studio', 'studios', 'studio', 'studios', 'استوديو', 'استوديوهان', 'استوديوهات', 'estudio', 'estudios') }; },
    flats: function (k) { return { icon: 'building', label: count(k, 'appartement', 'appartements', 'apartment', 'apartments', 'شقة', 'شقتان', 'شقق', 'apartamento', 'apartamentos') }; },
    balcony: { icon: 'balcony', label: { fr: 'Balcon', en: 'Balcony', ar: 'شرفة', es: 'Balcón' } },
    ac: { icon: 'snow', label: { fr: 'Climatisation', en: 'Air conditioning', ar: 'مكيّف', es: 'Aire acondicionado' } },
    lift: { icon: 'lift', label: { fr: 'Ascenseur', en: 'Lift', ar: 'مصعد', es: 'Ascensor' } },
    seaview: { icon: 'waves', label: { fr: 'Vue sur mer', en: 'Sea view', ar: 'إطلالة على البحر', es: 'Vistas al mar' } },
    pool: { icon: 'pool', label: { fr: 'Piscine', en: 'Pool', ar: 'مسبح', es: 'Piscina' } },
    mountain: { icon: 'mountain', label: { fr: 'Vue montagne', en: 'Mountain view', ar: 'إطلالة على الجبال', es: 'Vistas a la montaña' } },
    parking: { icon: 'car', label: { fr: 'Parking gratuit', en: 'Free parking', ar: 'موقف مجاني', es: 'Parking gratuito' } },
    gated: { icon: 'lock', label: { fr: 'Résidence fermée', en: 'Gated residence', ar: 'إقامة محروسة', es: 'Residencia cerrada' } },
    surface: function (m2) { return { icon: 'house', label: { fr: m2 + ' m²', en: m2 + ' m²', ar: m2 + ' م²', es: m2 + ' m²' } }; },
    fastwifi: { icon: 'wifi', label: { fr: 'Wi-Fi rapide', en: 'Fast Wi-Fi', ar: 'واي فاي سريع', es: 'Wi-Fi rápido' } },
    family: { icon: 'family', label: { fr: 'Idéal en famille', en: 'Great for families', ar: 'مثالي للعائلات', es: 'Ideal en familia' } },
    privacy: { icon: 'sun', label: { fr: 'Sans vis-à-vis', en: 'Not overlooked', ar: 'خصوصية تامة', es: 'Sin vecinos enfrente' } }
  };

  var film = {
    // The film behind the first screen, in two cuts: vertical for phones, wide for
    // tablets and computers. Each cut comes as MP4 (H.264, for iPhone) and WebM (VP9);
    // the browser plays the first it supports. The poster is the film's first frame.
    // Cut by tools/make-film.py (shots in tools/film.json) from open-licence clips.
    video: { mp4: 'assets/video/morocco.mp4', webm: 'assets/video/morocco.webm', poster: 'assets/video/morocco.jpg' },
    videoPortrait: { mp4: 'assets/video/morocco-portrait.mp4', webm: 'assets/video/morocco-portrait.webm', poster: 'assets/video/morocco-portrait.jpg' },
    // Each clip, in the film's order, listed on the credits page (the licences ask for it).
    // The bottom of the first screen links there.
    credits: [
      { title: 'Djemaa el Fna, Marrakech', url: 'https://commons.wikimedia.org/wiki/File:Djemaa_el_Fna_Marrakech_Morocco.webm',
        by: 'Boris Macek', lic: 'CC BY-SA 3.0', licUrl: 'https://creativecommons.org/licenses/by-sa/3.0' },
      { title: 'Chefchaouen', url: 'https://commons.wikimedia.org/wiki/File:Morocco_Chefchaouen.webm',
        by: 'TaylorBux1', lic: 'CC0', licUrl: 'https://creativecommons.org/publicdomain/zero/1.0/' },
      { title: 'How Nomads prepare Moroccan tea', url: 'https://commons.wikimedia.org/wiki/File:How_Nomads_prepare_Moroccan_tea.webm',
        by: 'مصطفى ملو', lic: 'CC BY-SA 4.0', licUrl: 'https://creativecommons.org/licenses/by-sa/4.0' },
      { title: 'Sidi Kacem beach, Tangier', url: 'https://commons.wikimedia.org/wiki/File:Plane_landing_at_Tangier_airport_over_Sidi_Kacem_beach.webm',
        by: 'Ideophagous', lic: 'CC0', licUrl: 'https://creativecommons.org/publicdomain/zero/1.0/' }
    ]
  };

  CASA.brand = {
    name: 'Darna Collection',

    host: {
      name: 'Yassine',
      // WhatsApp, in international format (spaces and + are ignored).
      // A place can have its own host in its file (content/stays/<id>.js).
      whatsapp: '+212600600486'
    },

    // The film of the home screen and of every city (film: 'brand' in content/cities/<city>.js).
    film: film,

    cities: [
      { id: 'casablanca', tint: '#1D4C49', lat: 33.57, lng: -7.59,
        name: { fr: 'Casablanca', en: 'Casablanca', ar: 'الدار البيضاء', es: 'Casablanca' } },
      { id: 'marrakech', tint: '#8C553C', lat: 31.63, lng: -7.98,
        name: { fr: 'Marrakech', en: 'Marrakech', ar: 'مراكش', es: 'Marrakech' } },
      { id: 'martil', tint: '#2D5F8A', lat: 35.62, lng: -5.28,
        name: { fr: 'Martil', en: 'Martil', ar: 'مرتيل', es: 'Martil' } }
    ],

    // Neighbourhood names, shown on the cards and above each place's name
    areas: {
      bourgogne: { fr: 'Bourgogne', en: 'Bourgogne', ar: 'بورغون', es: 'Bourgogne' },
      'ain-diab': { fr: 'Aïn Diab', en: 'Ain Diab', ar: 'عين الذئاب', es: 'Aïn Diab' },
      'dar-bouazza': { fr: 'Dar Bouazza', en: 'Dar Bouazza', ar: 'دار بوعزة', es: 'Dar Bouazza' },
      daoudiate: { fr: 'Daoudiate', en: 'Daoudiate', ar: 'الداوديات', es: 'Daoudiate' },
      martil: { fr: 'Martil', en: 'Martil', ar: 'مرتيل', es: 'Martil' }
    },

    /*
     * The places. id: the link (…/pestana/) and the file name. title: the name's
     * lines in the place's first screen, where "Darna Collection" is written above it. kind: 'apartment'
     * or 'studio' (titles "Votre appartement" / "Votre studio"). lat/lng: the
     * neighbourhood, used for "Trouver mon logement": two decimals (about 1 km) are
     * enough, and keep the exact building off the home page. The exact pin goes
     * only in the place's own file (content/stays/<id>.js → location).
     * approx: true while the position is only the neighbourhood's.
     * photo: a picture of its neighbourhood for its card (a place of the city, in
     * content/photos.js); cover: 'assets/img/…jpg' shows a photo of the place itself instead.
     */
    // Links used before the final names (16 October 2026) still open the right place
    aliases: { 'bourgogne-133': 'bourgogne', 'casa-b-suites': 'b-suites', 'ocean-21': 'pestana', 'darb-inn': 'dar-bouazza', 'dar-baba': 'marrakech', 'casa-azul': 'martil-bay' },

    stays: [
      { id: 'bourgogne', name: 'Darna Bourgogne', title: ['Bourgogne'], city: 'casablanca', area: 'bourgogne', kind: 'apartment',
        icon: 'building', tint: '#2C5A6B', photo: 'elhank', lat: 33.60, lng: -7.64, approx: true,
        facts: [fact.surface(133), fact.bedrooms(3), fact.bathrooms(2), fact.balcony, fact.lift] },
      { id: 'b-suites', name: 'Darna B-Suites', title: ['B-Suites'], city: 'casablanca', area: 'bourgogne', kind: 'studio', units: 8,
        icon: 'key', tint: '#8A6A3A', photo: 'sunset-elhank', lat: 33.60, lng: -7.64, approx: true,
        facts: [fact.studios(8), fact.balcony, fact.ac] },
      { id: 'pestana', name: 'Darna Pestana', title: ['Pestana'], city: 'casablanca', area: 'ain-diab', kind: 'apartment',
        icon: 'waves', tint: '#1D4C49', photo: 'aindiab', lat: 33.60, lng: -7.67, approx: true,
        facts: [fact.seaview, fact.bedrooms(1), fact.balcony] },
      { id: 'dar-bouazza', name: 'Darna Dar Bouazza', title: ['Dar', 'Bouazza'], city: 'casablanca', area: 'dar-bouazza', kind: 'apartment',
        icon: 'palm', tint: '#4F6650', photo: 'darbouazza', lat: 33.53, lng: -7.82, approx: true,
        facts: [fact.bedrooms(2), fact.gated, fact.parking] },
      { id: 'marrakech', name: 'Darna Marrakech', title: ['Marrakech'], city: 'marrakech', area: 'daoudiate', kind: 'apartment', units: 3,
        icon: 'arch', tint: '#8C553C', photo: 'koutoubia', lat: 31.65, lng: -8.01, approx: true,
        facts: [fact.flats(3), fact.bedrooms(2), fact.fastwifi] },
      { id: 'martil-bay', name: 'Darna Martil Bay', title: ['Martil', 'Bay'], city: 'martil', area: 'martil', kind: 'apartment',
        icon: 'pool', tint: '#2D5F8A', photo: 'martil-beach', lat: 35.62, lng: -5.28, approx: true,
        facts: [fact.pool, fact.bedrooms(2), fact.mountain, fact.family] }
    ],

    // What every place's guide starts from; a place's file can replace any of these.
    defaults: {
      welcome: {
        fr: 'Bienvenue chez vous. Tout est prêt, et je ne suis qu’à un message de vous.',
        en: 'Welcome home. Everything is ready, and I am one message away.',
        ar: 'مرحباً بك في بيتك. كل شيء جاهز، وأنا على بُعد رسالة منك.',
        es: 'Te doy la bienvenida a casa. Todo está aquí, y estoy a un mensaje de distancia.'
      },
      checkin: {
        time: '15:00',
        steps: [
          { icon: 'pin', fr: 'Suivez « Localisation » jusqu’à l’adresse', en: 'Follow “Location” to the address', ar: 'اتبع «الموقع» حتى العنوان', es: 'Sigue «Ubicación» hasta la dirección' },
          { icon: 'bubble', fr: 'Accès, étage et numéro : dans vos messages Airbnb', en: 'Access, floor and number: in your Airbnb messages', ar: 'الدخول والطابق والرقم: في رسائل Airbnb', es: 'Acceso, planta y número: en tus mensajes de Airbnb' },
          { icon: 'key', todo: true, fr: 'Récupérer les clés', en: 'Getting the keys', ar: 'استلام المفاتيح', es: 'Recoger las llaves' },
          { icon: 'chat', fr: 'Un souci ? Écrivez à {host}', en: 'Any problem? Message {host}', ar: 'مشكلة؟ راسل {host}', es: '¿Algún problema? Escribe a {host}' }
        ]
      },
      checkout: {
        time: '11:00',
        steps: [
          { icon: 'clock', fr: 'Départ avant {checkout}', en: 'Leave before {checkout}', ar: 'المغادرة قبل {checkout}', es: 'Salida antes de las {checkout}' },
          { icon: 'window', fr: 'Fenêtres fermées, lumières et appareils éteints', en: 'Windows shut, lights and appliances off', ar: 'أغلق النوافذ وأطفئ الأضواء والأجهزة', es: 'Ventanas cerradas, luces y aparatos apagados' },
          { icon: 'key', todo: true, fr: 'Où laisser les clés', en: 'Where to leave the keys', ar: 'أين تترك المفاتيح', es: 'Dónde dejar las llaves' },
          { icon: 'trash', todo: true, fr: 'Où déposer les poubelles', en: 'Where the rubbish goes', ar: 'أين تضع النفايات', es: 'Dónde dejar la basura' },
          { icon: 'rating', fr: 'Un avis Airbnb aide beaucoup {host}', en: 'An Airbnb review helps {host} a lot', ar: 'تقييمك على Airbnb يساعد {host} كثيراً', es: 'Una reseña en Airbnb ayuda mucho a {host}' }
        ]
      },
      rules: [
        { icon: 'nosmoke', fr: 'Non-fumeur', en: 'No smoking', ar: 'ممنوع التدخين', es: 'No fumar' },
        { icon: 'party', fr: 'Pas de fête', en: 'No parties', ar: 'ممنوع الحفلات', es: 'Sin fiestas' },
        { icon: 'moon', fr: 'Calme après 22 h', en: 'Quiet after 10 pm', ar: 'الهدوء بعد 22:00', es: 'Silencio desde las 22:00' },
        { icon: 'users', fr: 'Voyageurs inscrits seulement', en: 'Booked guests only', ar: 'الضيوف المسجّلون فقط', es: 'Solo huéspedes registrados' }
      ],
      // Each service opens WhatsApp with a ready-written request. {airport} comes from the city file.
      services: [
        {
          icon: 'plane',
          title: { fr: 'Transfert aéroport', en: 'Airport transfer', ar: 'نقل المطار', es: 'Traslado al aeropuerto' },
          text: { fr: 'Un chauffeur depuis {airport}', en: 'A driver from {airport}', ar: 'سائق من {airport}', es: 'Un conductor desde {airport}' },
          request: { fr: 'un transfert aéroport', en: 'an airport transfer', ar: 'نقلاً من/إلى المطار', es: 'un traslado al aeropuerto' }
        },
        {
          icon: 'clock',
          title: { fr: 'Arrivée tôt, départ tard', en: 'Early in, late out', ar: 'وصول مبكر، مغادرة متأخرة', es: 'Llegada temprana, salida tardía' },
          text: { fr: 'Selon les disponibilités', en: 'Subject to availability', ar: 'حسب التوفّر', es: 'Según disponibilidad' },
          request: { fr: 'une arrivée anticipée ou un départ tardif', en: 'an early check-in or a late check-out', ar: 'وصولاً مبكراً أو مغادرة متأخرة', es: 'una llegada temprana o una salida tardía' }
        },
        {
          icon: 'broom',
          title: { fr: 'Ménage en séjour', en: 'Mid-stay cleaning', ar: 'تنظيف خلال الإقامة', es: 'Limpieza durante la estancia' },
          text: { fr: 'Avec draps et serviettes propres', en: 'With fresh sheets and towels', ar: 'مع أغطية ومناشف نظيفة', es: 'Con sábanas y toallas limpias' },
          request: { fr: 'un ménage supplémentaire', en: 'an extra cleaning', ar: 'تنظيفاً إضافياً', es: 'una limpieza adicional' }
        }
      ]
    },

    // The buttons of the "your apartment" group; their pages read each place's file
    stayGroup: ['wifi', 'stay', 'house', 'nearby', 'services', 'assistance'],
    staySections: {
      wifi: { icon: 'wifi', tint: '#2C5A6B', type: 'wifi', title: { fr: 'Wi-Fi', en: 'Wi-Fi', ar: 'واي فاي', es: 'Wi-Fi' } },
      stay: { icon: 'key', tint: '#8A6A3A', type: 'stay', title: { fr: 'Arrivée & départ', en: 'Check-in & out', ar: 'الوصول والمغادرة', es: 'Llegada y salida' } },
      house: { icon: 'house', tint: '#4F6650', type: 'house', title: { fr: 'Mode d’emploi', en: 'How it works', ar: 'دليل الاستعمال', es: 'Cómo funciona' } },
      nearby: { icon: 'walk', tint: '#8C553C', type: 'nearby', title: { fr: 'Autour de vous', en: 'Around you', ar: 'حولك', es: 'A tu alrededor' } },
      services: { icon: 'sparkle', tint: '#5E4A6E', type: 'services', title: { fr: 'Services', en: 'Services', ar: 'خدمات', es: 'Servicios' } }
    }
  };
})();
