/*
 * Casa, côté vous — the Bourgogne apartment.
 *
 * Everything specific to this apartment lives here. For a second apartment,
 * copy this file, change it, and load the copy from its own page.
 *
 * Any text that starts with 'TODO' shows a small "À compléter" badge to guests
 * until you replace it. Search this file for TODO to find what is left.
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

  welcome: {
    fr: 'Bienvenue à Bourgogne. J’ai réuni ici tout ce qu’il faut pour profiter de l’appartement et de Casablanca, avec mes adresses préférées. S’il vous manque quoi que ce soit, écrivez-moi.',
    en: 'Welcome to Bourgogne. Everything you need to enjoy the apartment and Casablanca is here, along with my favourite places. If anything is missing, message me.',
    ar: 'مرحباً بك في بورغون. جمعتُ هنا كل ما تحتاجه للاستمتاع بالشقة وبالدار البيضاء، مع عناويني المفضّلة. إن احتجت أي شيء، راسلني.',
    es: 'Te damos la bienvenida a Bourgogne. Aquí he reunido todo lo necesario para disfrutar del apartamento y de Casablanca, con mis lugares favoritos. Si te falta algo, escríbeme.'
  },

  checkin: {
    time: '15:00', // TODO: confirm
    steps: [
      { fr: 'Touchez « Localisation » en bas de l’écran pour rejoindre l’immeuble.', en: 'Tap “Location” at the bottom of the screen to reach the building.', ar: 'المس «الموقع» أسفل الشاشة للوصول إلى العمارة.', es: 'Toca «Ubicación» en la parte inferior de la pantalla para llegar al edificio.' },
      { fr: 'L’étage, le numéro de l’appartement et le code d’accès vous sont envoyés par message Airbnb avant votre arrivée.', en: 'The floor, apartment number and door code are sent in your Airbnb messages before you arrive.', ar: 'يصلك رقم الطابق ورقم الشقة ورمز الدخول عبر رسائل Airbnb قبل وصولك.', es: 'La planta, el número del apartamento y el código de acceso te llegan por mensaje de Airbnb antes de tu llegada.' },
      { todo: true, fr: 'Récupérer les clés (gardien, boîte à clés, interphone…)', en: 'Getting the keys (concierge, key box, intercom…)', ar: 'استلام المفاتيح (الحارس، صندوق المفاتيح، الهاتف الداخلي…)', es: 'Recoger las llaves (conserje, caja de llaves, interfono…)' },
      { fr: 'Un souci à l’arrivée ? Écrivez à {host} sur WhatsApp.', en: 'Any problem on arrival? Message {host} on WhatsApp.', ar: 'أي مشكلة عند الوصول؟ راسل {host} على واتساب.', es: '¿Algún problema al llegar? Escribe a {host} por WhatsApp.' }
    ]
  },

  checkout: {
    time: '11:00', // TODO: confirm
    steps: [
      { fr: 'Merci de libérer l’appartement avant {checkout}.', en: 'Please leave the apartment before {checkout}.', ar: 'يُرجى مغادرة الشقة قبل الساعة {checkout}.', es: 'Deja el apartamento antes de las {checkout}, por favor.' },
      { fr: 'Fermez les fenêtres, éteignez la climatisation et les lumières.', en: 'Close the windows, switch off the air conditioning and the lights.', ar: 'أغلق النوافذ وأطفئ المكيّف والأضواء.', es: 'Cierra las ventanas y apaga el aire acondicionado y las luces.' },
      { todo: true, fr: 'Où laisser les clés en partant', en: 'Where to leave the keys', ar: 'أين تترك المفاتيح عند المغادرة', es: 'Dónde dejar las llaves al salir' },
      { todo: true, fr: 'Où déposer les poubelles', en: 'Where to put the rubbish', ar: 'أين تضع النفايات', es: 'Dónde dejar la basura' },
      { fr: 'Un dernier mot : un avis sur Airbnb aide énormément {host}. Merci !', en: 'One last thing: a review on Airbnb helps {host} a lot. Thank you!', ar: 'كلمة أخيرة: تقييمك على Airbnb يساعد {host} كثيراً. شكراً لك!', es: 'Una última cosa: una reseña en Airbnb ayuda mucho a {host}. ¡Gracias!' }
    ]
  },

  wifi: {
    network: 'TODO',
    // Leave empty to show "on the card by the entrance" instead of the password.
    password: ''
  },

  rules: [
    { fr: 'Appartement non-fumeur.', en: 'No smoking inside.', ar: 'يُمنع التدخين داخل الشقة.', es: 'Prohibido fumar en el apartamento.' },
    { fr: 'Pas de fêtes ni d’événements.', en: 'No parties or events.', ar: 'يُمنع تنظيم الحفلات أو المناسبات.', es: 'No se permiten fiestas ni eventos.' },
    { fr: 'Calme après 22 h, par respect pour les voisins.', en: 'Quiet after 10 pm, out of respect for the neighbours.', ar: 'الهدوء بعد العاشرة ليلاً احتراماً للجيران.', es: 'Silencio a partir de las 22:00, por respeto a los vecinos.' },
    { fr: 'Seuls les voyageurs inscrits sur la réservation peuvent séjourner.', en: 'Only the guests on the booking may stay.', ar: 'الإقامة مقتصرة على الضيوف المسجّلين في الحجز.', es: 'Solo pueden alojarse los huéspedes de la reserva.' }
  ],

  howto: [
    { title: { fr: 'Climatisation', en: 'Air conditioning', ar: 'المكيّف', es: 'Aire acondicionado' }, body: 'TODO' },
    { title: { fr: 'Eau chaude', en: 'Hot water', ar: 'الماء الساخن', es: 'Agua caliente' }, body: 'TODO' },
    { title: { fr: 'Lave-linge', en: 'Washing machine', ar: 'آلة الغسيل', es: 'Lavadora' }, body: 'TODO' },
    { title: { fr: 'Cuisine', en: 'Kitchen', ar: 'المطبخ', es: 'Cocina' }, body: 'TODO' },
    { title: { fr: 'Télévision', en: 'TV', ar: 'التلفاز', es: 'Televisión' }, body: 'TODO' }
  ],

  // Walking times must be measured from the building, not from the district.
  nearby: [
    { label: { fr: 'Supermarché', en: 'Supermarket', ar: 'متجر كبير', es: 'Supermercado' }, value: 'TODO' },
    { label: { fr: 'Pharmacie', en: 'Pharmacy', ar: 'صيدلية', es: 'Farmacia' }, value: 'TODO' },
    { label: { fr: 'Boulangerie', en: 'Bakery', ar: 'مخبزة', es: 'Panadería' }, value: 'TODO' },
    { label: { fr: 'Distributeur', en: 'Cash machine', ar: 'شبّاك أوتوماتيكي', es: 'Cajero' }, value: 'TODO' },
    { label: { fr: 'Café', en: 'Café', ar: 'مقهى', es: 'Café' }, value: 'TODO' }
  ],

  // Each service opens WhatsApp with a ready-written request. Remove what you do not offer.
  services: [
    {
      title: { fr: 'Transfert aéroport', en: 'Airport transfer', ar: 'نقل من/إلى المطار', es: 'Traslado al aeropuerto' },
      text: { fr: 'Un chauffeur vous attend à l’aéroport Mohammed V, ou vous y conduit.', en: 'A driver meets you at Mohammed V Airport, or takes you there.', ar: 'سائق ينتظرك في مطار محمد الخامس أو يوصلك إليه.', es: 'Un conductor te espera en el aeropuerto Mohammed V o te lleva hasta allí.' },
      request: { fr: 'un transfert aéroport', en: 'an airport transfer', ar: 'نقلاً من/إلى المطار', es: 'un traslado al aeropuerto' }
    },
    {
      title: { fr: 'Arrivée tôt ou départ tard', en: 'Early check-in or late check-out', ar: 'وصول مبكر أو مغادرة متأخرة', es: 'Llegada temprana o salida tardía' },
      text: { fr: 'Selon les disponibilités de l’appartement.', en: 'Depending on the apartment’s availability.', ar: 'حسب توفّر الشقة.', es: 'Según la disponibilidad del apartamento.' },
      request: { fr: 'une arrivée anticipée ou un départ tardif', en: 'an early check-in or a late check-out', ar: 'وصولاً مبكراً أو مغادرة متأخرة', es: 'una llegada temprana o una salida tardía' }
    },
    {
      title: { fr: 'Ménage supplémentaire', en: 'Extra cleaning', ar: 'تنظيف إضافي', es: 'Limpieza adicional' },
      text: { fr: 'Pendant votre séjour, avec changement du linge.', en: 'During your stay, with fresh linen.', ar: 'خلال إقامتك، مع تغيير الأغطية والمناشف.', es: 'Durante tu estancia, con cambio de ropa de cama.' },
      request: { fr: 'un ménage supplémentaire', en: 'an extra cleaning', ar: 'تنظيفاً إضافياً', es: 'una limpieza adicional' }
    }
  ]
};
