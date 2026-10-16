/*
 * Atlas Stays — Dar Baba, a house of three apartments in Daoudiate, Marrakech.
 * Starter file: everything left out comes from the defaults in content/brand.js.
 * Security: never put a door or key-box code, a floor, a studio or apartment number here.
 */
window.CASA = window.CASA || {};
CASA.stays = CASA.stays || {};

CASA.stays['dar-baba'] = {
  location: {
    // TODO: the building's pin (lat/lng). Until then: the neighbourhood.
    lat: 31.648,
    lng: -8.012,
    mapsQuery: 'Daoudiate, Marrakech',
    mapsUrl: 'https://maps.app.goo.gl/oujbJ3zekGTvQY9S8',
    address: { fr: 'TODO', ar: 'TODO' }
  },
  checkin: { time: '15:00' }, // TODO: confirm
  checkout: { time: '11:00' }, // TODO: confirm
  wifi: { network: 'TODO', password: '' },
  howto: [],
  nearby: []
};
