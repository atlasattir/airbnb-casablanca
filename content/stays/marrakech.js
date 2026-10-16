/*
 * Darna Collection — Darna Marrakech, a small house of three apartments in Daoudiate, Marrakech.
 * This file serves each of the three apartments (two bedrooms, bathroom, kitchen,
 * living room, fast Wi-Fi each).
 *
 * Everything specific to this place lives here. Anything left out (check-in and
 * check-out steps, rules, services, host) comes from the defaults in
 * content/brand.js; add the field here to replace it for this place only.
 *
 * Any text that starts with 'TODO' shows a small "Bientôt" badge to guests
 * until you replace it. Search this file for TODO to find what is left.
 * Keep texts short: each one sits on a card next to an icon.
 *
 * Security: never put the door code, key-box code, floor or apartment number
 * here. This page is public and is the same for the three apartments: which
 * apartment a guest has goes in the Airbnb messages only.
 */
window.CASA = window.CASA || {};
CASA.stays = CASA.stays || {};

CASA.stays['marrakech'] = {
  location: {
    // TODO: the house's pin (lat/lng). Until then: the Daoudiate district.
    lat: 31.648,
    lng: -8.012,
    // Text searched in Google Maps for the walk "Depuis votre porte".
    // TODO: replace with the house's street address.
    mapsQuery: 'Daoudiate, Marrakech',
    // The host's Google Maps link to the house; it wins over mapsQuery for "Localisation".
    mapsUrl: 'https://maps.app.goo.gl/oujbJ3zekGTvQY9S8',
    // Street address only (no floor, no apartment number). The Arabic line is shown to taxi drivers.
    address: { fr: 'TODO', ar: 'TODO' }
  },

  // Daoudiate is a residential quarter of the Guéliz arrondissement.
  // source: https://www.mubawab.ma/fr/is/appartement-location_marrakech_daoudiat_pas-cher
  welcome: {
    fr: 'Bienvenue à Darna Marrakech, une petite maison de trois appartements dans un quartier résidentiel de Marrakech. Tout est prêt, et je ne suis qu’à un message de vous.',
    en: 'Welcome to Darna Marrakech, a small house of three apartments in a residential part of Marrakech. Everything is ready, and I am one message away.',
    ar: 'مرحباً بك في دارنا مراكش، بيت صغير يضمّ ثلاث شقق في حيّ سكني بمراكش. تجد هنا كل ما تحتاجه، وأنا على بُعد رسالة منك.',
    es: 'Te doy la bienvenida a Darna Marrakech, una pequeña casa de tres apartamentos en un barrio residencial de Marrakech. Todo está listo, y estoy a un mensaje de distancia.'
  },

  checkin: {
    time: '15:00', // TODO: confirm (same as the Airbnb listing)
    steps: null // null: the default steps of content/brand.js (access and apartment go in the Airbnb messages)
  },
  checkout: {
    time: '11:00', // TODO: confirm (same as the Airbnb listing)
    steps: null
  },

  wifi: {
    // TODO (host): one network for the house, or one per apartment? Use a neutral
    // name: a name with a floor or a number would give the apartment away on the
    // printed card.
    network: 'TODO',
    // Leave empty to show "on the card in your place" instead of the password.
    // The repository is public: a password written here is published.
    password: ''
  },

  rules: null, // null: the brand's four rules (no smoking, no parties, quiet after 10 pm, booked guests only)

  // Two or three short lines each. Remove what the apartments do not have.
  howto: [
    // TODO (host): which rooms have air conditioning, where the remotes are, and what
    // keeps guests warm in winter (heaters? extra blankets?). Winter nights in
    // Marrakech often drop to 5–7 °C (source: https://kupi.com/en/explore/morocco/marrakech/weather).
    { icon: 'snow', title: { fr: 'Clim et chauffage', en: 'AC and heating', ar: 'المكيّف والتدفئة', es: 'Aire y calefacción' }, body: 'TODO' },
    {
      // TODO (host): the water heater's type (electric, gas?) and whether guests should
      // space out showers; add it here.
      icon: 'drop',
      title: { fr: 'Eau chaude', en: 'Hot water', ar: 'الماء الساخن', es: 'Agua caliente' },
      body: {
        fr: 'Laissez couler l’eau quelques instants avant la douche. Toujours froide ? Écrivez à {host}.',
        en: 'Let the water run for a moment before your shower. Still cold? Message {host}.',
        ar: 'اترك الماء يجري لحظات قبل الاستحمام. ما زال بارداً؟ راسل {host}.',
        es: 'Deja correr el agua unos instantes antes de ducharte. ¿Sigue fría? Escribe a {host}.'
      }
    },
    // TODO (host): what the kitchen has (hob: gas cylinder or electric? oven, fridge,
    // kettle…). If there is a butane cylinder, add one line: close the valve after use.
    { icon: 'pot', title: { fr: 'Cuisine', en: 'Kitchen', ar: 'المطبخ', es: 'Cocina' }, body: 'TODO' },
    {
      icon: 'wifi',
      title: { fr: 'Wi-Fi rapide', en: 'Fast Wi-Fi', ar: 'واي فاي سريع', es: 'Wi-Fi rápido' },
      body: {
        fr: 'Une connexion rapide, idéale pour travailler. Réseau et mot de passe : voir « Wi-Fi ». Une coupure ? Écrivez à {host}.',
        en: 'A fast connection, ideal for working. Network and password: see “Wi-Fi”. Connection down? Message {host}.',
        ar: 'اتصال سريع، مثالي للعمل. اسم الشبكة وكلمة المرور: انظر «واي فاي». انقطع الاتصال؟ راسل {host}.',
        es: 'Una conexión rápida, ideal para trabajar. Red y contraseña: mira «Wi-Fi». ¿Se corta? Escribe a {host}.'
      }
    },
    {
      // TODO (host): is there a lift, or stairs only? Is the entrance shared by the three
      // apartments? Worth one line for heavy luggage and guests with reduced mobility.
      // (The text below does not assume a shared entrance or stairs until you confirm.)
      icon: 'door',
      title: { fr: 'La maison', en: 'The house', ar: 'البيت', es: 'La casa' },
      body: {
        fr: 'Trois appartements partagent la maison. Refermez toujours la porte d’entrée, ne laissez rien dans les parties communes et parlez bas le soir.',
        en: 'Three apartments share the house. Always close the front door, leave nothing in the shared areas and keep voices low in the evening.',
        ar: 'تضمّ الدار ثلاث شقق. أغلق باب المدخل دائماً، ولا تترك شيئاً في الأماكن المشتركة، واخفض صوتك مساءً.',
        es: 'Tres apartamentos comparten la casa. Cierra siempre la puerta de entrada, no dejes nada en las zonas comunes y habla bajo por la noche.'
      }
    },
    // TODO (host): is there a roof terrace? Shared by the three apartments or closed to
    // guests? Hours, washing line, children at the parapet, summer sun. Remove this
    // entry if guests have no access.
    { icon: 'sun', title: { fr: 'Terrasse sur le toit', en: 'Roof terrace', ar: 'السطح', es: 'Azotea' }, body: 'TODO' }
  ],

  // name: the shop; walk: minutes on foot FROM THE HOUSE (0 = not measured yet);
  // maps: Google Maps search text. The walking times stay at 0 until the pin is known.
  nearby: [
    // TODO (host): no supermarket inside Daoudiate could be confirmed online. The nearest
    // confirmed one is Carrefour Market at the Carré Eden mall in Guéliz (distance from
    // the house unknown):
    // https://medias24.com/2014/05/29/le-groupe-labelvie-ouvre-deux-nouveaux-carrefour/
    // https://lematin.ma/express/2022/labelvie-inaugure-premier-carrefour-market-gourmet-marrakech/377199/amp
    // Put your own pick here (a supermarket, or the corner shop guests should use).
    { icon: 'cart', label: { fr: 'Supermarché', en: 'Supermarket', ar: 'متجر كبير', es: 'Supermercado' }, name: 'TODO', walk: 0, maps: '' },
    // source: https://lematin.ma/pharmacie/marrakech/daoudiate/masjid-daoudiate
    // source: https://www.annuaire-gratuit.ma/pharmacie-masjid-daoudiate-s26377.html
    // 597, Unité II, Bloc 41, Daoudiate, facing the Daoudiate mosque, near the Rif cinema.
    { icon: 'cross', label: { fr: 'Pharmacie', en: 'Pharmacy', ar: 'صيدلية', es: 'Farmacia' }, name: 'Pharmacie Masjid Daoudiate', walk: 0, maps: 'Pharmacie Masjid Daoudiate, Marrakech' },
    // TODO (host): no bakery in Daoudiate could be confirmed online. Your own favourite?
    { icon: 'bread', label: { fr: 'Boulangerie', en: 'Bakery', ar: 'مخبزة', es: 'Panadería' }, name: 'TODO', walk: 0, maps: '' },
    // TODO (host): no café in Daoudiate could be confirmed online. Your own favourite for breakfast?
    { icon: 'cup', label: { fr: 'Café', en: 'Café', ar: 'مقهى', es: 'Café' }, name: 'TODO', walk: 0, maps: '' },
    // source: https://www.uber.com/en-MA/newsroom/uber-in-morocco
    // source: https://www.nomadlawyer.org/marrakech-airport-taxi-guide-fares-driver-tips-2026
    // source: https://en.wikipedia.org/wiki/Taxis_of_Morocco
    // Uber and inDrive both reported in Marrakech (see the transport section of the city file).
    { icon: 'car', label: { fr: 'Taxi', en: 'Taxi', ar: 'طاكسي', es: 'Taxi' }, name: { fr: 'Petit taxi, Uber ou inDrive', en: 'Petit taxi, Uber or inDrive', ar: 'طاكسي صغير أو Uber أو inDrive', es: 'Petit taxi, Uber o inDrive' }, walk: 0, maps: '' },
    // TODO (host): the clinic you would send guests to (and whether it has a 24 h emergency department).
    { icon: 'heart', label: { fr: 'Clinique', en: 'Clinic', ar: 'مصحّة', es: 'Clínica' }, name: 'TODO', walk: 0, maps: '' }
  ]
};
