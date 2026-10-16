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
  howto: [
    { icon: 'snow', title: { fr: 'Climatisation', en: 'Air conditioning', ar: 'المكيّف', es: 'Aire acondicionado' }, body: 'TODO' },
    { icon: 'drop', title: { fr: 'Eau chaude', en: 'Hot water', ar: 'الماء الساخن', es: 'Agua caliente' }, body: 'TODO' },
    { icon: 'lift', title: { fr: 'Ascenseurs', en: 'Lifts', ar: 'المصاعد', es: 'Ascensores' }, body: 'TODO' },
    { icon: 'washer', title: { fr: 'Lave-linge', en: 'Washing machine', ar: 'آلة الغسيل', es: 'Lavadora' }, body: 'TODO' },
    { icon: 'pot', title: { fr: 'Cuisine', en: 'Kitchen', ar: 'المطبخ', es: 'Cocina' }, body: 'TODO' },
    { icon: 'tv', title: { fr: 'Télévision', en: 'TV', ar: 'التلفاز', es: 'Televisión' }, body: 'TODO' }
  ],

  // name: the shop; walk: minutes on foot FROM THE BUILDING (0 = not measured yet);
  // maps: Google Maps search text.
  nearby: [
    { icon: 'cart', label: { fr: 'Supermarché', en: 'Supermarket', ar: 'متجر كبير', es: 'Supermercado' }, name: 'TODO', walk: 0, maps: '' },
    { icon: 'cross', label: { fr: 'Pharmacie', en: 'Pharmacy', ar: 'صيدلية', es: 'Farmacia' }, name: 'TODO', walk: 0, maps: '' },
    { icon: 'bread', label: { fr: 'Boulangerie', en: 'Bakery', ar: 'مخبزة', es: 'Panadería' }, name: 'TODO', walk: 0, maps: '' },
    { icon: 'card', label: { fr: 'Distributeur', en: 'Cash machine', ar: 'شبّاك بنكي', es: 'Cajero' }, name: 'TODO', walk: 0, maps: '' },
    { icon: 'cup', label: { fr: 'Café', en: 'Café', ar: 'مقهى', es: 'Café' }, name: 'TODO', walk: 0, maps: '' },
    { icon: 'tram', label: { fr: 'Tram ou taxi', en: 'Tram or taxi', ar: 'ترامواي أو طاكسي', es: 'Tranvía o taxi' }, name: 'TODO', walk: 0, maps: '' }
  ]
};
