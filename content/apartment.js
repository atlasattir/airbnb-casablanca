/*
 * Casa, côté vous — the Bourgogne apartment.
 *
 * Everything specific to this apartment lives here. For a second apartment,
 * copy this file, change it, and load the copy from its own page.
 *
 * Any text that starts with 'TODO' shows a small "À compléter" badge to guests
 * until you replace it. Search this file for TODO to find what is left.
 * Keep texts short: each one sits on a card next to an icon.
 *
 * Security: never put the door code, key-box code, floor or apartment number
 * here. This page is public; send those in the Airbnb messages instead.
 */
window.CASA = window.CASA || {};

CASA.apartment = {
  id: 'bourgogne',
  name: { fr: 'Appartement Bourgogne', en: 'Bourgogne apartment', ar: 'شقة بورغون', es: 'Apartamento Bourgogne' },

  host: {
    name: 'Yassine',
    // TODO: WhatsApp number in international format, digits only (e.g. 2126XXXXXXXX).
    // While it is empty, the WhatsApp button lets the guest choose the contact.
    whatsapp: ''
  },

  location: {
    // Approximate position of the Bourgogne district. TODO: replace with the building's pin.
    lat: 33.598,
    lng: -7.638,
    // Text searched in Google Maps for "Localisation" and the walk "Depuis votre porte".
    // TODO: replace with the building's street address.
    mapsQuery: 'Bourgogne, Casablanca',
    // Optional: paste the Google Maps share link of the building here; it wins over mapsQuery.
    mapsUrl: '',
    // Street address only (no floor, no apartment number). The Arabic line is shown to taxi drivers.
    address: { fr: 'TODO', ar: 'TODO' }
  },

  hero: {
    // Drop the files in assets/video/ with these names. See README.md for the specs.
    video: 'assets/video/casablanca.mp4',
    videoPortrait: 'assets/video/casablanca-portrait.mp4',
    poster: ''
  },

  // One or two sentences, shown under "Votre appartement" on the home screen.
  welcome: {
    fr: 'Bienvenue chez vous. Tout est ici, et je reste à un message près.',
    en: 'Welcome home. Everything is here, and I am one message away.',
    ar: 'مرحباً بك في بيتك. كل شيء هنا، وأنا على بُعد رسالة.',
    es: 'Te doy la bienvenida a casa. Todo está aquí, y estoy a un mensaje de distancia.'
  },

  checkin: {
    time: '15:00', // TODO: confirm (same as the Airbnb listing)
    steps: [
      { icon: 'pin', fr: 'Suivez « Localisation » jusqu’à l’immeuble', en: 'Follow “Location” to the building', ar: 'اتبع «الموقع» حتى العمارة', es: 'Sigue «Ubicación» hasta el edificio' },
      { icon: 'bubble', fr: 'Code et étage : dans vos messages Airbnb', en: 'Code and floor: in your Airbnb messages', ar: 'الرمز والطابق: في رسائل Airbnb', es: 'Código y planta: en tus mensajes de Airbnb' },
      { icon: 'key', todo: true, fr: 'Récupérer les clés', en: 'Getting the keys', ar: 'استلام المفاتيح', es: 'Recoger las llaves' },
      { icon: 'chat', fr: 'Un souci ? Écrivez à {host}', en: 'Any problem? Message {host}', ar: 'مشكلة؟ راسل {host}', es: '¿Algún problema? Escribe a {host}' }
    ]
  },

  checkout: {
    time: '11:00', // TODO: confirm (same as the Airbnb listing)
    steps: [
      { icon: 'clock', fr: 'Départ avant {checkout}', en: 'Leave before {checkout}', ar: 'المغادرة قبل {checkout}', es: 'Salida antes de las {checkout}' },
      { icon: 'window', fr: 'Fenêtres, clim et lumières fermées', en: 'Windows, AC and lights off', ar: 'النوافذ والمكيّف والأضواء مطفأة', es: 'Ventanas, aire y luces apagados' },
      { icon: 'key', todo: true, fr: 'Où laisser les clés', en: 'Where to leave the keys', ar: 'أين تترك المفاتيح', es: 'Dónde dejar las llaves' },
      { icon: 'trash', todo: true, fr: 'Où déposer les poubelles', en: 'Where the rubbish goes', ar: 'أين تضع النفايات', es: 'Dónde dejar la basura' },
      { icon: 'rating', fr: 'Un avis Airbnb aide beaucoup {host}', en: 'An Airbnb review helps {host} a lot', ar: 'تقييمك على Airbnb يساعد {host} كثيراً', es: 'Una reseña en Airbnb ayuda mucho a {host}' }
    ]
  },

  wifi: {
    network: 'TODO',
    // Leave empty to show "on the card by the entrance" instead of the password.
    // The repository is public: a password written here is published.
    password: ''
  },

  rules: [
    { icon: 'nosmoke', fr: 'Non-fumeur', en: 'No smoking', ar: 'ممنوع التدخين', es: 'No fumar' },
    { icon: 'party', fr: 'Pas de fête', en: 'No parties', ar: 'ممنوع الحفلات', es: 'Sin fiestas' },
    { icon: 'moon', fr: 'Calme après 22 h', en: 'Quiet after 10 pm', ar: 'الهدوء بعد 22:00', es: 'Silencio desde las 22:00' },
    { icon: 'users', fr: 'Voyageurs inscrits seulement', en: 'Booked guests only', ar: 'الضيوف المسجّلون فقط', es: 'Solo huéspedes registrados' }
  ],

  // Two or three short lines each. Remove what the apartment does not have.
  howto: [
    { icon: 'snow', title: { fr: 'Climatisation', en: 'Air conditioning', ar: 'المكيّف', es: 'Aire acondicionado' }, body: 'TODO' },
    { icon: 'drop', title: { fr: 'Eau chaude', en: 'Hot water', ar: 'الماء الساخن', es: 'Agua caliente' }, body: 'TODO' },
    { icon: 'washer', title: { fr: 'Lave-linge', en: 'Washing machine', ar: 'آلة الغسيل', es: 'Lavadora' }, body: 'TODO' },
    { icon: 'pot', title: { fr: 'Cuisine', en: 'Kitchen', ar: 'المطبخ', es: 'Cocina' }, body: 'TODO' },
    { icon: 'tv', title: { fr: 'Télévision', en: 'TV', ar: 'التلفاز', es: 'Televisión' }, body: 'TODO' }
  ],

  // name: the shop; walk: minutes on foot FROM THE BUILDING; maps: Google Maps search text.
  nearby: [
    { icon: 'cart', label: { fr: 'Supermarché', en: 'Supermarket', ar: 'متجر كبير', es: 'Supermercado' }, name: 'TODO', walk: 0, maps: '' },
    { icon: 'cross', label: { fr: 'Pharmacie', en: 'Pharmacy', ar: 'صيدلية', es: 'Farmacia' }, name: 'TODO', walk: 0, maps: '' },
    { icon: 'bread', label: { fr: 'Boulangerie', en: 'Bakery', ar: 'مخبزة', es: 'Panadería' }, name: 'TODO', walk: 0, maps: '' },
    { icon: 'card', label: { fr: 'Distributeur', en: 'Cash machine', ar: 'شبّاك بنكي', es: 'Cajero' }, name: 'TODO', walk: 0, maps: '' },
    { icon: 'cup', label: { fr: 'Café', en: 'Café', ar: 'مقهى', es: 'Café' }, name: 'TODO', walk: 0, maps: '' },
    { icon: 'tram', label: { fr: 'Tram ou taxi', en: 'Tram or taxi', ar: 'ترامواي أو طاكسي', es: 'Tranvía o taxi' }, name: 'TODO', walk: 0, maps: '' }
  ],

  // Each service opens WhatsApp with a ready-written request. Remove what you do not offer.
  services: [
    {
      icon: 'plane',
      title: { fr: 'Transfert aéroport', en: 'Airport transfer', ar: 'نقل المطار', es: 'Traslado al aeropuerto' },
      text: { fr: 'Un chauffeur à l’aéroport Mohammed V', en: 'A driver at Mohammed V Airport', ar: 'سائق في مطار محمد الخامس', es: 'Un conductor en el aeropuerto Mohammed V' },
      request: { fr: 'un transfert aéroport', en: 'an airport transfer', ar: 'نقلاً من/إلى المطار', es: 'un traslado al aeropuerto' }
    },
    {
      icon: 'clock',
      title: { fr: 'Arrivée tôt, départ tard', en: 'Early in, late out', ar: 'وصول مبكر، مغادرة متأخرة', es: 'Llegada temprana, salida tardía' },
      text: { fr: 'Selon les disponibilités', en: 'When the apartment is free', ar: 'حسب توفّر الشقة', es: 'Según disponibilidad' },
      request: { fr: 'une arrivée anticipée ou un départ tardif', en: 'an early check-in or a late check-out', ar: 'وصولاً مبكراً أو مغادرة متأخرة', es: 'una llegada temprana o una salida tardía' }
    },
    {
      icon: 'broom',
      title: { fr: 'Ménage en séjour', en: 'Mid-stay cleaning', ar: 'تنظيف خلال الإقامة', es: 'Limpieza durante la estancia' },
      text: { fr: 'Avec draps et serviettes propres', en: 'With fresh sheets and towels', ar: 'مع أغطية ومناشف نظيفة', es: 'Con sábanas y toallas limpias' },
      request: { fr: 'un ménage supplémentaire', en: 'an extra cleaning', ar: 'تنظيفاً إضافياً', es: 'una limpieza adicional' }
    }
  ]
};
