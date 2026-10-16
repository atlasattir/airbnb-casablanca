/*
 * Atlas Stays — Bourgogne 133, a three-bedroom apartment in Bourgogne, Casablanca.
 *
 * Everything specific to this place lives here. Anything left out (welcome,
 * check-in and check-out steps, rules, services, host) comes from the defaults
 * in content/brand.js; add the field here to replace it for this place only.
 *
 * Any text that starts with 'TODO' shows a small "Bientôt" badge to guests
 * until you replace it. Search this file for TODO to find what is left.
 * Keep texts short: each one sits on a card next to an icon.
 *
 * Security: never put the door code, key-box code, floor or apartment number
 * here. This page is public; send those in the Airbnb messages instead.
 */
window.CASA = window.CASA || {};
CASA.stays = CASA.stays || {};

CASA.stays['bourgogne-133'] = {
  location: {
    // TODO: the building's pin (lat/lng). Until then: the Bourgogne district.
    lat: 33.598,
    lng: -7.638,
    // Text searched in Google Maps for the walk "Depuis votre porte".
    // TODO: replace with the building's street address.
    mapsQuery: 'Bourgogne, Casablanca',
    // The host's Google Maps link to the building; it wins over mapsQuery for "Localisation".
    mapsUrl: 'https://maps.app.goo.gl/qQHKzcWi9dgYYQ629',
    // Street address only (no floor, no apartment number). The Arabic line is shown to taxi drivers.
    address: { fr: 'TODO', ar: 'TODO' }
  },

  checkin: {
    time: '15:00', // TODO: confirm (same as the Airbnb listing)
    steps: null // null: the default steps of content/brand.js
  },
  checkout: {
    time: '11:00', // TODO: confirm (same as the Airbnb listing)
    steps: null
  },

  wifi: {
    network: 'TODO',
    // Leave empty to show "on the card in your place" instead of the password.
    // The repository is public: a password written here is published.
    password: ''
  },

  // Two or three short lines each. Remove what the apartment does not have.
  // The client's description: 3 bedrooms, 2 bathrooms, 2 lifts, kitchen, living
  // room, balcony, Wi-Fi, air conditioning, not overlooked.
  howto: [
    // TODO (host): which rooms have it, where the remotes are.
    { icon: 'snow', title: { fr: 'Climatisation', en: 'Air conditioning', ar: 'المكيّف', es: 'Aire acondicionado' }, body: 'TODO' },
    // TODO (host): two bathrooms. Do they share one water heater? Should guests space out showers?
    { icon: 'drop', title: { fr: 'Eau chaude', en: 'Hot water', ar: 'الماء الساخن', es: 'Agua caliente' }, body: 'TODO' },
    {
      icon: 'lift',
      title: { fr: 'Ascenseurs', en: 'Lifts', ar: 'المصاعد', es: 'Ascensores' },
      body: {
        fr: 'L’immeuble a deux ascenseurs. Ne laissez pas les enfants y monter seuls. En cas de panne ou de coupure de courant, prenez l’escalier.',
        en: 'The building has two lifts. Do not let children ride in them alone. If they break down or the power goes off, take the stairs.',
        ar: 'في العمارة مصعدان. لا تدع الأطفال يركبونهما وحدهم، وعند حدوث عطل أو انقطاع الكهرباء استعمل الدرج.',
        es: 'El edificio tiene dos ascensores. No dejes que los niños suban solos. Si hay avería o corte de luz, usa la escalera.'
      }
    },
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
    { icon: 'pot', title: { fr: 'Cuisine', en: 'Kitchen', ar: 'المطبخ', es: 'Cocina' }, body: 'TODO' },
    // TODO (host): the client's description does not mention a washing machine or a TV:
    // fill these two, or remove them if the apartment has none.
    { icon: 'washer', title: { fr: 'Lave-linge', en: 'Washing machine', ar: 'آلة الغسيل', es: 'Lavadora' }, body: 'TODO' },
    { icon: 'tv', title: { fr: 'Télévision', en: 'TV', ar: 'التلفاز', es: 'Televisión' }, body: 'TODO' }
  ],

  // name: the shop; walk: minutes on foot FROM THE BUILDING (0 = not measured yet);
  // maps: Google Maps search text.
  // Casa B Suites (same neighbourhood) has the same list: change both together.
  // Every address below is in the Bourgogne district according to its source; the
  // walking times stay at 0 until the building's pin is known.
  nearby: [
    // source: https://carrefourmarket.ma/nos-magasins/casablanca/carrefour-market-casablanca-bourgogne/
    // source: https://promotheus.ma/casablanca/carrefour-market/rue-ain-sidi-ali-immeuble-e-quartier-bourgogne
    // source: https://www.goafricaonline.com/ma/823112-carrefour-market
    // Rue Aïn Sidi Ali, Immeuble E. Hours differ between sources (official page 09:00–23:00,
    // GoAfrica 09:00–22:00), so none are shown to guests.
    { icon: 'cart', label: { fr: 'Supermarché', en: 'Supermarket', ar: 'متجر كبير', es: 'Supermercado' }, name: 'Carrefour Market Bourgogne', walk: 0, maps: 'Carrefour Market Bourgogne, Casablanca' },
    // source: https://www.med.ma/pharmacie/casablanca/pharmacie-des-generations--46548
    // 53 rue Jaber Ben Hayane (ex-Verlet-Hanus), Bourgogne.
    { icon: 'cross', label: { fr: 'Pharmacie', en: 'Pharmacy', ar: 'صيدلية', es: 'Farmacia' }, name: 'Pharmacie des Générations', walk: 0, maps: 'Pharmacie des Générations, Bourgogne, Casablanca' },
    // TODO (host): your favourite bakery. A lead, not shown until confirmed: Boulangerie
    // Abou Marouane, 172 bd de Bourgogne, found in one old directory listing only
    // (https://www.telecontact.ma/annonceur/boulangerie-abou-marouane/3149586/casablanca.php)
    // and nowhere else. If it is still open, put its name here and
    // maps: 'Boulangerie Abou Marouane, Bourgogne, Casablanca'.
    { icon: 'bread', label: { fr: 'Boulangerie', en: 'Bakery', ar: 'مخبزة', es: 'Panadería' }, name: 'TODO', walk: 0, maps: '' },
    // source: https://www.annuaire-gratuit.ma/banques-maroc/attijariwafa-bank/attijariwafa-bank-casa-bourgogne-expansion-s186710.html
    // source: https://www.telecontact.ma/liens/attijariwafa-bank-ag-casa-bourgogne/casablanca.php
    // Agence Casa Bourgogne Expansion, corner of rue Ibnou Jarir and rue Abou El Wakt Ibno Khalaf.
    // A bank branch; no source mentions a cash machine there, so the tile says "Banque".
    // TODO (host): if it has one, change the label back to
    // { fr: 'Distributeur', en: 'Cash machine', ar: 'شبّاك بنكي', es: 'Cajero' }.
    { icon: 'card', label: { fr: 'Banque', en: 'Bank', ar: 'بنك', es: 'Banco' }, name: 'Attijariwafa bank', walk: 0, maps: 'Attijariwafa bank Casa Bourgogne Expansion, Casablanca' },
    // TODO (host): no café in Bourgogne could be confirmed online. Your own favourite?
    { icon: 'cup', label: { fr: 'Café', en: 'Café', ar: 'مقهى', es: 'Café' }, name: 'TODO', walk: 0, maps: '' },
    // source: https://www.smartertravel.com/local-taxis-casablanca-transportation/
    // source: https://telquel.ma/2025/11/27/uber-annonce-officiellement-son-retour-au-maroc-a-la-veille-de-la-can-2025_1962895
    // source: https://medias24.com/2026/07/01/mobilite-huit-ans-apres-son-depart-uber-parie-de-nouveau-sur-le-maroc-1713243/
    // No tram stop inside Bourgogne could be confirmed. TODO (host): if you send guests
    // to a tram stop, add it as its own line (icon 'tram').
    { icon: 'car', label: { fr: 'Taxi', en: 'Taxi', ar: 'طاكسي', es: 'Taxi' }, name: { fr: 'Petit taxi rouge ou Uber', en: 'Red petit taxi or Uber', ar: 'طاكسي صغير أحمر أو Uber', es: 'Petit taxi rojo o Uber' }, walk: 0, maps: '' },
    // source: https://www.kerix.net/fr/annuaire-entreprise/clinique-badr
    // source: https://www.BMCEbank.ma/sites/default/files/list-clinics_0.pdf
    // source: https://fnh.ma/article/entreprises/le-groupe-odm-acquiert-la-clinique-badr-de-casablanca
    // Private clinic, 35 rue El Alloussi, Bourgogne (facing the Badr mosque). No source
    // confirms a 24 h emergency department, so the tile does not say "urgences".
    { icon: 'heart', label: { fr: 'Clinique', en: 'Clinic', ar: 'مصحّة', es: 'Clínica' }, name: 'Clinique Badr', walk: 0, maps: 'Clinique Badr, Bourgogne, Casablanca' }
  ]
};
