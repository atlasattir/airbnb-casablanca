/*
 * Darna Collection — Darna Dar Bouazza, a two-bedroom apartment in a gated residence with free
 * parking, Dar Bouazza (on the coast south-west of Casablanca, Nouaceur province).
 *
 * Everything specific to this place lives here. Anything left out (check-in and
 * check-out steps, services, host) comes from the defaults in content/brand.js;
 * add the field here to replace it for this place only.
 *
 * Any text that starts with 'TODO' shows a small "Bientôt" badge to guests
 * until you replace it. Search this file for TODO to find what is left.
 * Keep texts short: each one sits on a card next to an icon.
 *
 * Dar Bouazza is a car-based seaside suburb: the red petits taxis of Casablanca
 * are meant to stay within the city. The pin is not known yet, so no walking or
 * driving time is given anywhere (walk: 0 = not shown).
 *
 * Security: never put a gate, door or key-box code, a floor, a building or
 * apartment number, a parking space number, or the guard's name or phone here.
 * This page is public; send those in the Airbnb messages instead.
 */
window.CASA = window.CASA || {};
CASA.stays = CASA.stays || {};

CASA.stays['dar-bouazza'] = {
  location: {
    // TODO: the building's pin (lat/lng). Until then: the Dar Bouazza area (approx in brand.js).
    lat: 33.53,
    lng: -7.82,
    // Text searched in Google Maps for the routes "Depuis votre porte".
    // TODO: replace with the residence's name or street address once the host agrees to show it.
    mapsQuery: 'Dar Bouazza',
    // The host's Google Maps link to the building; it wins over mapsQuery for "Localisation".
    mapsUrl: 'https://maps.app.goo.gl/6n2z1W1VuffrPWyM6',
    // Street address only (no building, floor or apartment number). The Arabic line is shown to drivers:
    // the residence's name plus a known landmark helps, since Dar Bouazza is large.
    address: { fr: 'TODO', ar: 'TODO' }
  },

  // Dar Bouazza is reached by car: "Autour de vous" opens driving directions
  travel: 'driving',

  welcome: {
    fr: 'Bienvenue à Dar Bouazza, sur la côte au sud-ouest de Casablanca. Tout est prêt, et je ne suis qu’à un message de vous.',
    en: 'Welcome to Dar Bouazza, on the coast south-west of Casablanca. Everything is here, and I am one message away.',
    ar: 'مرحباً بك في دار بوعزة، على الساحل جنوب غرب الدار البيضاء. كل شيء هنا، وأنا على بُعد رسالة.',
    es: 'Te doy la bienvenida a Dar Bouazza, en la costa al suroeste de Casablanca. Todo está aquí, y estoy a un mensaje de distancia.'
  },

  checkin: {
    time: '15:00', // TODO: confirm (same as the Airbnb listing)
    // null: the default steps of content/brand.js.
    // TODO (host): if the guard at the gate hands over the keys or needs the guests' names,
    // replace with this place's own steps (never a code, the guard's name or phone).
    steps: null
  },
  checkout: {
    time: '11:00', // TODO: confirm (same as the Airbnb listing)
    steps: null
  },

  wifi: {
    // TODO: the network's name. Use a neutral name, without a building or apartment number.
    network: 'TODO',
    // Leave empty to show "on the card in your place" instead of the password.
    // The repository is public: a password written here is published.
    password: ''
  },

  // The brand's four rules, then the residence's own.
  // TODO (host): add the residence's real rules (pool, noise, rubbish, visitors, the gate),
  // each as its own line. Nothing about the gate is written until you say how it works.
  rules: [
    { icon: 'nosmoke', fr: 'Non-fumeur', en: 'No smoking', ar: 'ممنوع التدخين', es: 'No fumar' },
    { icon: 'party', fr: 'Pas de fête', en: 'No parties', ar: 'ممنوع الحفلات', es: 'Sin fiestas' },
    { icon: 'moon', fr: 'Calme après 22 h', en: 'Quiet after 10 pm', ar: 'الهدوء بعد 22:00', es: 'Silencio desde las 22:00' },
    { icon: 'users', fr: 'Voyageurs inscrits seulement', en: 'Booked guests only', ar: 'الضيوف المسجّلون فقط', es: 'Solo huéspedes registrados' },
    { icon: 'building', fr: 'Respect du règlement de la résidence', en: 'The residence’s rules apply', ar: 'احترام النظام الداخلي للإقامة', es: 'Respeto de las normas de la residencia' }
  ],

  // Two or three short lines each. Remove what the apartment does not have.
  // The client's description: 2 bedrooms, bathroom, balcony, kitchen, gated residence
  // with free parking. He did not mention air conditioning, a lift or a pool.
  howto: [
    // TODO (host): how the gate works (guard, badge or remote), the guard's hours, how to
    // announce a visitor or a delivery driver. Never a code, the guard's name or phone.
    { icon: 'gate', title: { fr: 'La résidence', en: 'The residence', ar: 'الإقامة', es: 'La residencia' }, body: 'TODO' },
    {
      // TODO (host): where exactly (underground or outdoor, assigned space or not), whether the
      // guard needs the car's plate, visitor parking. Then replace the second sentence.
      // Never a space number if it identifies the apartment.
      icon: 'car',
      title: { fr: 'Parking gratuit', en: 'Free parking', ar: 'موقف مجاني', es: 'Parking gratuito' },
      body: {
        fr: 'Le parking de la résidence est gratuit pour vous. {host} vous indique où vous garer.',
        en: 'Parking in the residence is free for you. {host} will tell you where to park.',
        ar: 'موقف السيارات في الإقامة مجاني، وسيُرشدك {host} إلى مكان ركن سيارتك.',
        es: 'El aparcamiento de la residencia es gratuito para ti. {host} te indicará dónde aparcar.'
      }
    },
    // TODO (host): the client's description does not list air conditioning: fill it, or remove
    // this line if the apartment has none (and say whether there is heating in winter).
    { icon: 'snow', title: { fr: 'Climatisation', en: 'Air conditioning', ar: 'المكيّف', es: 'Aire acondicionado' }, body: 'TODO' },
    // TODO (host): gas or electric water heater? How long does it take to heat up?
    { icon: 'drop', title: { fr: 'Eau chaude', en: 'Hot water', ar: 'الماء الساخن', es: 'Agua caliente' }, body: 'TODO' },
    // TODO (host): type of hob, oven, coffee maker, what is provided (oil, salt, coffee…).
    { icon: 'pot', title: { fr: 'Cuisine', en: 'Kitchen', ar: 'المطبخ', es: 'Cocina' }, body: 'TODO' },
    {
      icon: 'balcony',
      title: { fr: 'Balcon', en: 'Balcony', ar: 'الشرفة', es: 'Balcón' },
      body: {
        fr: 'Gardez un œil sur les enfants et ne posez rien contre la rambarde. Par vent fort ou pluie, fermez la porte du balcon.',
        en: 'Keep an eye on children and put nothing against the railing. In strong wind or rain, close the balcony door.',
        ar: 'راقب الأطفال ولا تضع شيئاً بجانب الدرابزين. عند الرياح القوية أو المطر، أغلق باب الشرفة.',
        es: 'Vigila a los niños y no pongas nada junto a la barandilla. Con viento fuerte o lluvia, cierra la puerta del balcón.'
      }
    },
    {
      // source: https://fr.hespress.com/481822-dar-bouazza-la-plage-tamaris-2-decroche-son-premier-pavillon-bleu.html
      // source: https://fr.le360.ma/societe/a-tamaris-les-plages-se-reinventent-avec-wi-fi-gratuit-piscine-et-nouveaux-services_NOWOR7XNP5CTVE3M2MALV7Q3BE/
      // (Civil Protection lifeguard towers from the corniche to Tamaris 3, summer 2026)
      // source: https://fr.surf-forecast.com/breaks/Jackbeach
      // TODO (host): which beach is closest, how long it takes from the residence (by car or on
      // foot), and whether a parasol, beach towels or chairs are provided.
      icon: 'waves',
      title: { fr: 'La plage', en: 'The beach', ar: 'الشاطئ', es: 'La playa' },
      body: {
        fr: 'Les plages de Tamaris et Jack Beach bordent Dar Bouazza. En saison, baignez-vous près d’un poste de secours.',
        en: 'The Tamaris beaches and Jack Beach line the Dar Bouazza coast. In season, swim near a lifeguard post.',
        ar: 'تمتدّ شواطئ تماريس وجاك بيتش على ساحل دار بوعزة. في موسم الاصطياف، اسبح قرب مركز للإنقاذ.',
        es: 'Las playas de Tamaris y Jack Beach bordean Dar Bouazza. En temporada, báñate cerca de un puesto de socorristas.'
      }
    }
  ],

  // name: the place; walk: minutes on foot FROM THE BUILDING (0 = not measured yet);
  // drive: minutes by car (only from a source; 0 = not shown); maps: Google Maps search text ('' = no link).
  // Dar Bouazza is large and the pin is unknown: every address below is in Dar Bouazza
  // according to its source, but none is confirmed as the closest to the residence.
  nearby: [
    // source: https://carrefourmarket.ma/nos-magasins/casablanca/carrefour-market-casablanca-dar-bouazza/
    // source: https://labelvie.ma/en/opening-of-carrefour-market-dar-bouazza/
    // Centre Mercato, Villa d'Anfa 3, facing the Dar Bouazza post office. 800 m², in-store bakery,
    // free car park. Opening hours not confirmed.
    { icon: 'cart', label: { fr: 'Supermarché', en: 'Supermarket', ar: 'متجر كبير', es: 'Supermercado' }, name: 'Carrefour Market Dar Bouazza', walk: 0, maps: 'Carrefour Market Dar Bouazza' },
    // source: https://medias24.com/2021/03/30/marjane-holding-ouvre-un-nouveau-marjane-market-a-dar-bouazza/
    // source: https://fr.le360.ma/societe/distribution-marjane-market-soffre-un-nouveau-magasin-a-dar-bouazza-236077
    // source: https://telquel.ma/2021/04/05/marjane-holding-ouvre-un-nouveau-marjane-market-a-dar-bouazza_1716421
    // "Dar Bouazza El Menzeh" store, opened in March 2021 (still hiring for Dar Bouazza in August 2026:
    // https://www.dreamjob.ma/emploi/marjane-market-recrute-des-responsables-magasin-dans-6-villes/).
    // For a big weekly shop there is also the Carrefour hypermarket in Sela Plaza:
    // https://labelvie.ma/en/opening-carrefour-dar-bouazza/
    { icon: 'cart', label: { fr: 'Supermarché', en: 'Supermarket', ar: 'متجر كبير', es: 'Supermercado' }, name: 'Marjane Market Dar Bouazza', walk: 0, maps: 'Marjane Market Dar Bouazza' },
    // source: https://www.med.ma/pharmacie//casablanca/dar-bouazza/2
    // source: https://www.med.ma/pharmacy/casablanca/pharmacie-tamaris--47172
    // Pharmacie Tamaris, K220 route d'Azemmour, km 22, carrière Benabid (directory listing only).
    // Not to be confused with "Pharmacie Camping Tamaris" (route d'Azemmour, km 19).
    // TODO (host): replace with the pharmacy nearest the residence if it is another one.
    { icon: 'cross', label: { fr: 'Pharmacie', en: 'Pharmacy', ar: 'صيدلية', es: 'Farmacia' }, name: 'Pharmacie Tamaris', walk: 0, maps: 'Pharmacie Tamaris, Dar Bouazza' },
    // TODO (host): your favourite café. A lead, not shown until confirmed: PAUL Dar Bouazza
    // (bakery and bistro, listed daily 7:00–22:00), found in one directory listing only, with no
    // rating and no other source (https://www.happycow.net/africa/morocco/tamaris/print).
    // If it is still open, put name: 'PAUL Dar Bouazza' and maps: 'PAUL Dar Bouazza' here.
    { icon: 'cup', label: { fr: 'Café', en: 'Café', ar: 'مقهى', es: 'Café' }, name: 'TODO', walk: 0, maps: '' },
    // source: https://fr.hespress.com/481822-dar-bouazza-la-plage-tamaris-2-decroche-son-premier-pavillon-bleu.html
    // source: https://lematin.ma/regions/la-plage-tamaris-2-a-dar-bouazza-decroche-son-premier-pavillon-bleu/356538/amp
    // (first Blue Flag, raised on 17 July 2026). TODO (host): or the beach closest to the residence.
    { icon: 'waves', label: { fr: 'Plage', en: 'Beach', ar: 'شاطئ', es: 'Playa' }, name: { fr: 'Plage Tamaris 2', en: 'Tamaris 2 Beach', ar: 'شاطئ تماريس 2', es: 'Playa Tamaris 2' }, walk: 0, maps: 'Plage Tamaris 2, Dar Bouazza' },
    // TODO (host): no petrol station could be confirmed. Directory listings only: "Carrefour Station",
    // route d'Azemmour km 14 (https://www.telecontact.ma/annonceur/carrefour-station/3212766/dar-bouazza.php)
    // and "Station Total Tamaris II", no address (annuaire-gratuit.ma, Dar Bouazza pages:
    // https://www.annuaire-gratuit.ma/recherche/ville-dar-bouazza.html, https://www.annuaire-gratuit.ma/divers/_dar-bouazza-pg2).
    // Put the one you use.
    { icon: 'car', label: { fr: 'Station-service', en: 'Petrol station', ar: 'محطة وقود', es: 'Gasolinera' }, name: 'TODO', walk: 0, maps: '' },
    // source: https://www.hck.ma/media/uploads/files/document_utile/Presentation_de_lHopital_Universitaire_International_Cheikh_Khalifa.pdf
    // source: https://telquel.ma/2015/03/18/lhopital-cheikh-khalifa-ben-zayed-ouvrira-ses-portes-23-mars_1438893
    // Hôpital Universitaire International Cheikh Khalifa, Bd Mohamed Taieb Naciri, Hay Hassani,
    // between Dar Bouazza and the centre. No hospital or 24 h emergency department could be
    // confirmed inside Dar Bouazza, and no source gives this one's emergency hours: the tile
    // does not say "urgences".
    { icon: 'heart', label: { fr: 'Hôpital', en: 'Hospital', ar: 'مستشفى', es: 'Hospital' }, name: { fr: 'Hôpital Cheikh Khalifa', en: 'Cheikh Khalifa Hospital', ar: 'مستشفى الشيخ خليفة', es: 'Hospital Cheikh Khalifa' }, walk: 0, maps: 'Hôpital Universitaire International Cheikh Khalifa, Casablanca' },
    // source: https://www.smartertravel.com/local-taxis-casablanca-transportation/
    // (red petits taxis stay within the city; grands taxis go beyond it). No source says
    // outright whether a petit taxi will take guests to Dar Bouazza, so the tile does not name them.
    // source: https://www.lavieeco.com/?p=60812 (grand-taxi stations in Dar Bouazza)
    // Uber and inDrive work in Casablanca; whether they cover the residence is not confirmed
    // (see the transport block "Si vous logez à Dar Bouazza" in content/cities/casablanca.js).
    { icon: 'car', label: { fr: 'Taxi', en: 'Taxi', ar: 'طاكسي', es: 'Taxi' }, name: { fr: 'Grand taxi ou appli', en: 'Grand taxi or app', ar: 'طاكسي كبير أو تطبيق', es: 'Grand taxi o app' }, walk: 0, maps: '' }
  ]
};
