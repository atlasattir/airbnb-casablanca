/*
 * Atlas Stays — Casa Azul Martil, a two-bedroom family apartment in a residence
 * with a pool, in Martil (Mediterranean coast, next to Tétouan).
 *
 * Everything specific to this place lives here. Anything left out (check-in and
 * check-out steps, services, host) comes from the defaults in content/brand.js;
 * add the field here to replace it for this place only.
 *
 * Any text that starts with 'TODO' shows a small "Bientôt" badge to guests
 * until you replace it. Search this file for TODO to find what is left.
 * Keep texts short: each one sits on a card next to an icon.
 *
 * The client's description: 2 bedrooms, equipped kitchen, bathroom, balcony with
 * a view of the pool and the mountains, ideal for families in summer. He did not
 * mention air conditioning, Wi-Fi, a lift or parking.
 * The pin is not known yet, so no walking or driving time is given anywhere
 * (walk: 0 = not shown).
 *
 * Security: never put a gate, door or key-box code, a floor, a building or
 * apartment number, a parking space number, or the guard's name or phone here.
 * This page is public; send those in the Airbnb messages instead.
 */
window.CASA = window.CASA || {};
CASA.stays = CASA.stays || {};

CASA.stays['casa-azul'] = {
  location: {
    // TODO: the building's pin (lat/lng). Until then: Martil (approx in brand.js).
    lat: 35.6178,
    lng: -5.275,
    // Text searched in Google Maps for the route "Tétouan, puis la corniche".
    // TODO: replace with the residence's name or street address once the host agrees to show it.
    mapsQuery: 'Martil',
    // The host's Google Maps link to the building; it wins over mapsQuery for "Localisation".
    mapsUrl: 'https://maps.app.goo.gl/BA2fWB5NM8kDagkJ8',
    // Street address only (no building, floor or apartment number). The Arabic line is shown to drivers:
    // the residence's name plus a known landmark helps.
    address: { fr: 'TODO', ar: 'TODO' }
  },

  welcome: {
    fr: 'Bienvenue à Martil, entre la Méditerranée et les montagnes. Tout est prêt, et je ne suis qu’à un message de vous.',
    en: 'Welcome to Martil, between the Mediterranean and the mountains. Everything is here, and I am one message away.',
    ar: 'مرحباً بك في مرتيل، بين البحر الأبيض المتوسط والجبال. كل شيء هنا، وأنا على بُعد رسالة.',
    es: 'Te doy la bienvenida a Martil, entre el Mediterráneo y las montañas. Todo está aquí, y estoy a un mensaje de distancia.'
  },

  checkin: {
    time: '15:00', // TODO: confirm (same as the Airbnb listing)
    // null: the default steps of content/brand.js.
    // TODO (host): if the residence's guard hands over the keys or needs the guests' names,
    // replace with this place's own steps (never a code, the guard's name or phone).
    steps: null
  },
  checkout: {
    time: '11:00', // TODO: confirm (same as the Airbnb listing)
    steps: null
  },

  wifi: {
    // TODO: the network's name. Use a neutral name, without a building or apartment number.
    // The client's description does not mention Wi-Fi: confirm there is one.
    network: 'TODO',
    // Leave empty to show "on the card in your place" instead of the password.
    // The repository is public: a password written here is published.
    password: ''
  },

  // The brand's four rules, then the pool's and the residence's.
  // TODO (host): confirm the pool rules, or replace them with the residence's real ones
  // (swimwear, shower before swimming, guest bracelet, visitors, music).
  rules: [
    { icon: 'nosmoke', fr: 'Non-fumeur', en: 'No smoking', ar: 'ممنوع التدخين', es: 'No fumar' },
    { icon: 'party', fr: 'Pas de fête', en: 'No parties', ar: 'ممنوع الحفلات', es: 'Sin fiestas' },
    { icon: 'moon', fr: 'Calme après 22 h', en: 'Quiet after 10 pm', ar: 'الهدوء بعد 22:00', es: 'Silencio desde las 22:00' },
    { icon: 'users', fr: 'Voyageurs inscrits seulement', en: 'Booked guests only', ar: 'الضيوف المسجّلون فقط', es: 'Solo huéspedes registrados' },
    { icon: 'family', fr: 'Enfants surveillés à la piscine', en: 'Children supervised at the pool', ar: 'مراقبة الأطفال في المسبح', es: 'Niños vigilados en la piscina' },
    { icon: 'glass', fr: 'Pas de verre au bord de la piscine', en: 'No glass by the pool', ar: 'ممنوع الزجاج قرب المسبح', es: 'Nada de vidrio junto a la piscina' },
    { icon: 'building', fr: 'Règlement de la résidence respecté', en: 'Residence rules respected', ar: 'احترام نظام الإقامة', es: 'Se respetan las normas de la residencia' }
  ],

  // Two or three short lines each. Remove what the apartment does not have.
  howto: [
    {
      // The two safety lines come from the brief; the residence's own rules may add more.
      icon: 'pool',
      title: { fr: 'La piscine', en: 'The pool', ar: 'المسبح', es: 'La piscina' },
      body: {
        fr: 'Les enfants s’y baignent toujours sous la surveillance d’un adulte. Pas de verre autour du bassin : gobelets et bouteilles en plastique seulement.',
        en: 'Children always swim with an adult watching them. No glass around the pool: plastic cups and bottles only.',
        ar: 'يسبح الأطفال دائماً تحت مراقبة شخص بالغ. ممنوع الزجاج حول المسبح: أكواب وقنينات بلاستيكية فقط.',
        es: 'Los niños se bañan siempre con un adulto vigilando. Nada de vidrio alrededor de la piscina: solo vasos y botellas de plástico.'
      }
    },
    // TODO (host): which months the pool is open, its daily hours, whether there is a lifeguard,
    // the swimwear rule, and whether pool towels are provided. Say if it is closed off-season.
    { icon: 'clock', title: { fr: 'Horaires de la piscine', en: 'Pool hours', ar: 'أوقات المسبح', es: 'Horario de la piscina' }, body: 'TODO' },
    // TODO (host): the client's description does not list air conditioning: fill it (which rooms,
    // where the remotes are), or replace it with fans if there is none.
    { icon: 'snow', title: { fr: 'Climatisation', en: 'Air conditioning', ar: 'المكيّف', es: 'Aire acondicionado' }, body: 'TODO' },
    // TODO (host): gas or electric water heater? How long does it take to heat up?
    // If it runs on a gas bottle, who changes it?
    { icon: 'drop', title: { fr: 'Eau chaude', en: 'Hot water', ar: 'الماء الساخن', es: 'Agua caliente' }, body: 'TODO' },
    // TODO (host): the kitchen is "equipped": hob (gas or electric), oven, fridge and freezer,
    // coffee maker, washing machine; what is provided (oil, salt, coffee…).
    { icon: 'pot', title: { fr: 'Cuisine équipée', en: 'Equipped kitchen', ar: 'المطبخ المجهّز', es: 'Cocina equipada' }, body: 'TODO' },
    // TODO (host): how the gate works (guard, badge or remote), the guard's hours, how to announce a
    // visitor or a delivery; parking inside the residence (free or not, where); lift or stairs.
    // Never a code, the guard's name or phone, a floor or a parking space number.
    { icon: 'gate', title: { fr: 'La résidence', en: 'The residence', ar: 'الإقامة', es: 'La residencia' }, body: 'TODO' },
    {
      // source: https://sandee.com/morocco/tanger-tetouan-al-hoceima/martil/plage-martil
      // (lifeguards in season)
      // source: https://travel.hotelscombined.ca/Place/Martil.htm
      // (calm water; mid-July to mid-September, especially August, very crowded)
      // TODO (host): how far the beach is from the residence (on foot or by taxi), the safest way
      // with children, and whether a parasol, beach chairs or beach towels are provided.
      icon: 'waves',
      title: { fr: 'La plage', en: 'The beach', ar: 'الشاطئ', es: 'La playa' },
      body: {
        fr: 'La plage de Martil a une eau souvent calme et des postes de secours en saison. En juillet et août, elle est bondée : allez-y le matin.',
        en: 'Martil beach has often calm water and lifeguard posts in season. In July and August it is packed: go in the morning.',
        ar: 'مياه شاطئ مرتيل هادئة في الغالب، وفيه مراكز للإنقاذ في موسم الاصطياف. في يوليوز وغشت يكون مكتظاً، فاذهب صباحاً.',
        es: 'La playa de Martil tiene agua a menudo tranquila y socorristas en temporada. En julio y agosto se llena: ve por la mañana.'
      }
    }
  ],

  // name: the place; walk: minutes on foot FROM THE BUILDING (0 = not measured yet);
  // drive: minutes by car (only from a source; 0 = not shown); maps: Google Maps search text ('' = no link).
  // The pin is unknown: every address below is in Martil according to its source, but none is
  // confirmed as the closest to the residence.
  nearby: [
    // source: https://labelvie.ma/le-groupe-labelvie-renforce-sa-presence-dans-la-region-du-nord-du-maroc/
    // source: https://labelvie.ma/2022/08/17/
    // (LabelVie's first Carrefour Express, opened in Martil in August 2022, 505 m²). Address and hours
    // not confirmed. TODO (host): or the épicerie / supermarket you send guests to.
    { icon: 'cart', label: { fr: 'Supermarché', en: 'Supermarket', ar: 'متجر كبير', es: 'Supermercado' }, name: 'Carrefour Express Martil', walk: 0, maps: 'Carrefour Express Martil' },
    // source: https://www.telecontact.ma/annonceur/pharmacie-martil/3047113/martil.php
    // source: https://www.annuaire-gratuit.ma/pharmacies/pharmacie-martil-s165168.html
    // 28 avenue Moulay El Hassan (directory listings). TODO (host): or the pharmacy nearest the residence.
    { icon: 'cross', label: { fr: 'Pharmacie', en: 'Pharmacy', ar: 'صيدلية', es: 'Farmacia' }, name: 'Pharmacie Martil', walk: 0, maps: 'Pharmacie Martil, Avenue Moulay El Hassan, Martil' },
    // TODO (host): no bakery in Martil could be confirmed online. Your own favourite?
    { icon: 'bread', label: { fr: 'Boulangerie', en: 'Bakery', ar: 'مخبزة', es: 'Panadería' }, name: 'TODO', walk: 0, maps: '' },
    // source: https://www.telecontact.ma/annonceur/attijariwafa-bank-ag-martil-hassan-ii/3223922/martil.php
    // source: https://www.annuaire-gratuit.ma/banques-maroc/attijariwafa-bank/attijariwafa-bank-martil-hassan-ii-s187093.html
    // Agence Martil Hassan II, avenue Hassan II (directory listings disagree on the street for the other
    // Martil branch). A bank branch; the sources do not mention the cash machine itself.
    { icon: 'card', label: { fr: 'Distributeur', en: 'Cash machine', ar: 'شبّاك بنكي', es: 'Cajero' }, name: 'Attijariwafa bank', walk: 0, maps: 'Attijariwafa bank Martil Hassan II, Martil' },
    // source: https://restaurantguru.com/Martil (Rayan: Café & Pâtisserie, 4.8 from 309 votes in 2026-10)
    // TODO (host): or your own favourite café near the residence.
    { icon: 'cup', label: { fr: 'Café', en: 'Café', ar: 'مقهى', es: 'Café' }, name: 'Rayan Café & Pâtisserie', walk: 0, maps: 'Rayan Café Pâtisserie, Martil' },
    // source: https://sandee.com/morocco/tanger-tetouan-al-hoceima/martil/plage-martil
    { icon: 'waves', label: { fr: 'Plage', en: 'Beach', ar: 'شاطئ', es: 'Playa' }, name: { fr: 'Plage de Martil', en: 'Martil Beach', ar: 'شاطئ مرتيل', es: 'Playa de Martil' }, walk: 0, maps: 'Plage de Martil, Martil' },
    // source: https://fr.hespress.com/271199-martil-lancement-des-services-de-la-clinique-de-jour.html
    // source: https://medias24.com/2022/07/06/lancement-des-services-de-la-clinique-de-jour-de-martil/
    // source: https://h24info.ma/?p=596756
    // (public day clinic opened in July 2022: 25 to 34 beds depending on the source, an emergency unit,
    //  radiology, lab, operating theatre). Re-checked 2026-10: nothing newer found on how the emergency
    // unit runs today, so the tile does not say "urgences 24 h/24".
    // TODO (host): confirm it is the place you send guests to for urgent care.
    { icon: 'heart', label: { fr: 'Clinique', en: 'Clinic', ar: 'مصحّة', es: 'Clínica' }, name: { fr: 'Clinique de jour de Martil', en: 'Martil day clinic', ar: 'مستشفى النهار بمرتيل', es: 'Clínica de día de Martil' }, walk: 0, maps: 'Clinique de jour Martil' },
    // source: https://travelynnfamily.com/tetouan-with-kids/ (shared grand taxis Martil–Tétouan)
    // No taxi colour is given: the sources disagree for Tétouan. Uber is not confirmed in Martil.
    { icon: 'car', label: { fr: 'Taxi', en: 'Taxi', ar: 'طاكسي', es: 'Taxi' }, name: { fr: 'Grand taxi', en: 'Grand taxi', ar: 'طاكسي كبير', es: 'Grand taxi' }, walk: 0, maps: '' }
  ]
};
