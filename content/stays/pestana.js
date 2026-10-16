/*
 * Darna Collection — Darna Pestana, a one-bedroom apartment with a sea-view balcony in the
 * Pestana residence (Anfa Place Living Resort, Boulevard de la Corniche, Aïn Diab, Casablanca).
 *
 * Everything specific to this place lives here. Anything left out (check-in and
 * check-out steps, rules, services, host) comes from the defaults in
 * content/brand.js; add the field here to replace it for this place only.
 *
 * Any text that starts with 'TODO' shows a small "Bientôt" badge to guests
 * until you replace it. Search this file for TODO to find what is left.
 * Keep texts short: each one sits on a card next to an icon.
 *
 * The residence's pool, gym, spa, beach access and reception belong to the hotel.
 * Whether this apartment's guests may use them is NOT known yet: never promise
 * them here until the host confirms (and say whether there is a fee or a wristband).
 *
 * Security: never put the door code, key-box code, tower, floor or apartment number
 * here. This page is public; send those in the Airbnb messages instead.
 */
window.CASA = window.CASA || {};
CASA.stays = CASA.stays || {};

CASA.stays['pestana'] = {
  location: {
    // TODO: the building's pin (lat/lng). Until then: the neighbourhood (approx in brand.js).
    lat: 33.5957,
    lng: -7.666,
    // Text searched in Google Maps for the walk "Depuis votre porte".
    mapsQuery: 'Anfa Place, Boulevard de la Corniche, Casablanca',
    // The host's Google Maps link to the building; it wins over mapsQuery for "Localisation".
    mapsUrl: 'https://maps.app.goo.gl/JZFTgycexUg4dt2YA',
    // Street address only (no tower, floor or apartment number). The Arabic line is shown to taxi drivers.
    // TODO: confirm with the host. Booking sites give the residence's public address as
    // "Anfa Place Living Resort, Boulevard de la Corniche, Casablanca" (postcode 20100 or 20180: they disagree).
    // source: https://skyscanner.ie/hotels/morocco/casablanca-hotels/pestana-casablanca%2c-seaside-suites-%26-residences/ht-116129974
    address: { fr: 'TODO', ar: 'TODO' }
  },

  welcome: {
    fr: 'Bienvenue face à l’océan. Tout est prêt, et je ne suis qu’à un message de vous.',
    en: 'Welcome to your place by the ocean. Everything is here, and I am one message away.',
    ar: 'مرحباً بك في شقتك المطلّة على المحيط. كل شيء هنا، وأنا على بُعد رسالة منك.',
    es: 'Te doy la bienvenida frente al océano. Todo está aquí, y estoy a un mensaje de distancia.'
  },

  checkin: {
   . The hotel's own times (in 15:00, out 12:00)
    // are for hotel guests and do not necessarily apply to this apartment.
    time: '15:00',
    // null: the default steps of content/brand.js.
    // TODO: if the residence's reception or security hands over the keys or checks IDs,
    // replace with this place's own steps (never a code, tower or floor).
    steps: null
  },
  checkout: {
    time: '11:00',
    steps: null
  },

  wifi: {
    // TODO: the apartment's own network, or the residence's? Ask the host for a neutral name.
    network: 'TODO',
    // Leave empty to show "on the card in your place" instead of the password.
    // The repository is public: a password written here is published.
    password: ''
  },

  // Two or three short lines each.
  howto: [
    { icon: 'snow', title: { fr: 'Climatisation', en: 'Air conditioning', ar: 'المكيّف', es: 'Aire acondicionado' }, body: 'TODO' },
    { icon: 'drop', title: { fr: 'Eau chaude', en: 'Hot water', ar: 'الماء الساخن', es: 'Agua caliente' }, body: 'TODO' },
    // TODO: open kitchen: type of hob, coffee machine, what is provided (oil, salt, coffee…).
    { icon: 'pot', title: { fr: 'Cuisine', en: 'Kitchen', ar: 'المطبخ', es: 'Cocina' }, body: 'TODO' },
    // TODO: which entrance of Anfa Place to use, whether security asks for ID, whether the reception
    // is involved, how to reach the lifts. Never the tower, floor or apartment number.
    { icon: 'building', title: { fr: 'La résidence', en: 'The residence', ar: 'الإقامة', es: 'La residencia' }, body: 'TODO' },
    // TODO (host): may guests use the residence's pool, gym and beach access? Free, paid or not at all?
    // Wristband or card, from whom? Add a tile only once confirmed: never promise hotel facilities.
    // TODO (host): a parking space for the apartment? How do guests get in (badge, remote)? Add a
    // 'Parking' tile once confirmed, never with a space number that identifies the apartment.
    // General advice for a sea-facing balcony (wind, salt spray, children), not a host fact.
    {
      icon: 'balcony',
      title: { fr: 'Balcon vue mer', en: 'Sea-view balcony', ar: 'الشرفة المطلّة على البحر', es: 'Balcón con vistas al mar' },
      body: {
        fr: 'Fermez la porte du balcon en sortant : le vent et l’air salin entrent vite. Ne laissez jamais un enfant seul sur le balcon.',
        en: 'Close the balcony door when you go out: wind and salty air come in fast. Never leave a child alone on the balcony.',
        ar: 'أغلق باب الشرفة عند خروجك، فالرياح والهواء المالح يدخلان بسرعة. لا تترك طفلاً وحده في الشرفة أبداً.',
        es: 'Cierra la puerta del balcón al salir: el viento y el aire salado entran rápido. No dejes nunca a un niño solo en el balcón.'
      }
    }
  ],

  // name: the shop; walk: minutes on foot FROM THE BUILDING (0 = not measured yet);
  // maps: Google Maps search text ('' = no link).
  // Everything below is inside the Anfa Place complex or on the Corniche in front of it.
  nearby: [
    // source: https://www.goafricaonline.com/ma/823281-carrefour-market-anfa-place
    // (Anfa Place, Bd de la Corniche, Aïn Diab; listed 09:00–22:00 every day, unverified)
    { icon: 'cart', label: { fr: 'Supermarché', en: 'Supermarket', ar: 'متجر كبير', es: 'Supermercado' }, name: 'Carrefour Market Anfa Place', walk: 0, maps: 'Carrefour Market Anfa Place, Casablanca' },
    // source: https://www.med.ma/pharmacie/casablanca/pharmacie-anfaplace--44442
    // (Bd de la Corniche, in the shopping centre; hours and night duty not confirmed)
    { icon: 'cross', label: { fr: 'Pharmacie', en: 'Pharmacy', ar: 'صيدلية', es: 'Farmacia' }, name: 'Pharmacie Anfa Place', walk: 0, maps: 'Pharmacie Anfaplace, Casablanca' },
    // source: https://wanderlog.com/place/details/89712/paul-anfaplace
    // source: https://fodors.com/world/africa-and-middle-east/morocco/the-northern-atlantic-coast/places/casablanca/restaurants
    // TODO (host): only a listing site names this branch; the mall's tenant lists checked in Oct. 2026
    // (grit.group) do not. Confirm it is still open, or set name: 'TODO' and maps: ''.
    { icon: 'bread', label: { fr: 'Boulangerie', en: 'Bakery', ar: 'مخبزة', es: 'Panadería' }, name: 'Paul Anfa Place', walk: 0, maps: 'Paul Anfaplace, Casablanca' },
    // source: https://locations.alshaya.com/starbucks/ma/casablanca/anfaplace-mall
    // (listed 09:00–22:00, 23:00 on Friday and Saturday)
    { icon: 'cup', label: { fr: 'Café', en: 'Café', ar: 'مقهى', es: 'Café' }, name: 'Starbucks Anfa Place', walk: 0, maps: 'Starbucks AnfaPlace Mall, Casablanca' },
    // TODO: no source confirms a cash machine inside the AnfaPlace mall (a BMCI branch is said to be
    // nearby: https://www.spacesworks.com/casablanca/anfa-place/). Ask the host which one guests use.
    { icon: 'card', label: { fr: 'Distributeur', en: 'Cash machine', ar: 'شبّاك بنكي', es: 'Cajero' }, name: 'TODO', walk: 0, maps: '' },
    // source: https://vacations.aircanada.com/en/accommodation-details/CMNPES/Pestana%20Casablanca%20Seaside%20Suites
    // ("a promenade with direct beach access"; the official pestana.com text says the same)
    // TODO (host): the promenade belongs to the residence. Once you confirm guests may use it,
    // the name can say so: { fr: 'Par la promenade d’Anfa Place', en: 'Via the Anfa Place promenade',
    // ar: 'عبر ممشى أنفا بلاس', es: 'Por el paseo de Anfa Place' }.
    { icon: 'waves', label: { fr: 'Plage', en: 'Beach', ar: 'شاطئ', es: 'Playa' }, name: { fr: 'Au pied d’Anfa Place', en: 'Right below Anfa Place', ar: 'أمام أنفا بلاس', es: 'Junto a Anfa Place' }, walk: 0, maps: '' },
    // source: https://www.smartertravel.com/local-taxis-casablanca-transportation/
    // (red petits taxis serve the Casablanca prefecture, the Corniche included)
    { icon: 'car', label: { fr: 'Taxi', en: 'Taxi', ar: 'طاكسي', es: 'Taxi' }, name: { fr: 'Petits taxis, bd de la Corniche', en: 'Petits taxis, Bd de la Corniche', ar: 'طاكسيات صغيرة، شارع الكورنيش', es: 'Petits taxis, bd de la Corniche' }, walk: 0, maps: '' },
    // source: https://en.wikipedia.org/wiki/Casablanca_Tramway (T2 western terminus: Aïn Diab Plage)
    // source: https://www.travelocity.com/es/Casablanca-Hoteles-Anfa-Place.h111213616.Informacion-Hotel (about a 5-minute drive)
    { icon: 'tram', label: { fr: 'Tram', en: 'Tram', ar: 'ترامواي', es: 'Tranvía' }, name: 'T2 · Aïn Diab Plage', walk: 0, maps: 'Station tramway Aïn Diab Plage, Casablanca' }
  ]
};
