/*
 * Atlas Stays — the brand, its cities and the list of places.
 *
 * Loaded on every page. The home screen (the chooser) is built from this file
 * alone; each place's guide then loads content/morocco.js, its city file
 * (content/cities/<city>.js) and its own file (content/stays/<id>.js).
 *
 * To add a place: add a line to `stays` below, copy one of the files in
 * content/stays/ under the new id, and copy one of the place folders at the
 * root of the site (e.g. ocean-21/) under the same id. See README.md.
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
    gated: { icon: 'lock', label: { fr: 'Résidence fermée', en: 'Gated residence', ar: 'إقامة مغلقة', es: 'Residencia cerrada' } },
    fastwifi: { icon: 'wifi', label: { fr: 'Wi-Fi rapide', en: 'Fast Wi-Fi', ar: 'واي فاي سريع', es: 'Wi-Fi rápido' } },
    family: { icon: 'family', label: { fr: 'Idéal en famille', en: 'Great for families', ar: 'مثالي للعائلات', es: 'Ideal en familia' } },
    privacy: { icon: 'sun', label: { fr: 'Sans vis-à-vis', en: 'Not overlooked', ar: 'خصوصية تامة', es: 'Sin vecinos enfrente' } },
    hotel: { icon: 'building', label: { fr: 'Résidence hôtelière', en: 'Hotel residence', ar: 'إقامة فندقية', es: 'Residencia hotelera' } }
  };

  var film = {
    // The film behind the first screen, in two cuts: vertical for phones, wide for
    // tablets and computers. Each cut comes as MP4 (H.264, for iPhone) and WebM (VP9);
    // the browser plays the first it supports. The poster is the film's first frame.
    video: { mp4: 'assets/video/casablanca.mp4', webm: 'assets/video/casablanca.webm', poster: 'assets/video/casablanca.jpg' },
    videoPortrait: { mp4: 'assets/video/casablanca-portrait.mp4', webm: 'assets/video/casablanca-portrait.webm', poster: 'assets/video/casablanca-portrait.jpg' },
    // Credit shown at the bottom of the page. Set to null to hide it.
    credit: { name: '@mr_enissay', url: 'https://www.instagram.com/mr_enissay/' }
  };

  CASA.brand = {
    name: 'Atlas Stays',

    host: {
      name: 'Yassine',
      // TODO: WhatsApp number in international format, digits only (e.g. 2126XXXXXXXX).
      // While it is empty, the WhatsApp button lets the guest choose the contact.
      // A place can have its own host in its file (content/stays/<id>.js).
      whatsapp: ''
    },

    // The film of the home screen. Casablanca holds four of the six places.
    film: film,

    cities: [
      { id: 'casablanca', tint: '#1D4C49', lat: 33.5731, lng: -7.5898,
        name: { fr: 'Casablanca', en: 'Casablanca', ar: 'الدار البيضاء', es: 'Casablanca' } },
      { id: 'marrakech', tint: '#8C553C', lat: 31.6295, lng: -7.9811,
        name: { fr: 'Marrakech', en: 'Marrakech', ar: 'مراكش', es: 'Marrakech' } },
      { id: 'martil', tint: '#2D5F8A', lat: 35.6178, lng: -5.2750,
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
     * The places. id: the link (…/ocean-21/) and the file name. kind: 'apartment'
     * or 'studio' (titles "Votre appartement" / "Votre studio"). lat/lng: the
     * building, used for "Trouver mon logement", the coordinates and the sunset.
     * approx: true while the position is only the neighbourhood's.
     */
    stays: [
      { id: 'bourgogne-133', name: 'Bourgogne 133', city: 'casablanca', area: 'bourgogne', kind: 'apartment',
        icon: 'building', tint: '#2C5A6B', lat: 33.5980, lng: -7.6380, approx: true,
        facts: [fact.bedrooms(3), fact.bathrooms(2), fact.balcony, fact.lift] },
      { id: 'casa-b-suites', name: 'Casa B Suites', city: 'casablanca', area: 'bourgogne', kind: 'studio', units: 8,
        icon: 'key', tint: '#8A6A3A', lat: 33.5980, lng: -7.6380, approx: true,
        facts: [fact.studios(8), fact.balcony, fact.ac] },
      { id: 'ocean-21', name: 'Ocean 21', city: 'casablanca', area: 'ain-diab', kind: 'apartment',
        icon: 'waves', tint: '#1D4C49', lat: 33.5957, lng: -7.6660, approx: true,
        facts: [fact.seaview, fact.bedrooms(1), fact.hotel] },
      { id: 'darb-inn', name: 'DarB Inn', city: 'casablanca', area: 'dar-bouazza', kind: 'apartment',
        icon: 'palm', tint: '#4F6650', lat: 33.5300, lng: -7.8200, approx: true,
        facts: [fact.bedrooms(2), fact.gated, fact.parking] },
      { id: 'dar-baba', name: 'Dar Baba', city: 'marrakech', area: 'daoudiate', kind: 'apartment', units: 3,
        icon: 'arch', tint: '#8C553C', lat: 31.6480, lng: -8.0120, approx: true,
        facts: [fact.flats(3), fact.bedrooms(2), fact.fastwifi] },
      { id: 'casa-azul', name: 'Casa Azul Martil', city: 'martil', area: 'martil', kind: 'apartment',
        icon: 'pool', tint: '#2D5F8A', lat: 35.6178, lng: -5.2750, approx: true,
        facts: [fact.pool, fact.bedrooms(2), fact.mountain, fact.family] }
    ],

    // What every place's guide starts from; a place's file can replace any of these.
    defaults: {
      welcome: {
        fr: 'Bienvenue chez vous. Tout est prêt, et je ne suis qu’à un message de vous.',
        en: 'Welcome home. Everything is ready, and I am one message away.',
        ar: 'مرحباً بك في بيتك. كل شيء جاهز، وأنا رهن إشارتك برسالة واحدة.',
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
          { icon: 'window', fr: 'Fenêtres, clim et lumières fermées', en: 'Windows, AC and lights off', ar: 'النوافذ والمكيّف والأضواء مطفأة', es: 'Ventanas, aire y luces apagados' },
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
          text: { fr: 'Selon les disponibilités', en: 'When the place is free', ar: 'حسب التوفّر', es: 'Según disponibilidad' },
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
