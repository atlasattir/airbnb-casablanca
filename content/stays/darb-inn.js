/*
 * Atlas Stays — DarB Inn, a two-bedroom apartment in a gated residence, Dar Bouazza.
 * Starter file: everything left out comes from the defaults in content/brand.js.
 * Security: never put a door or key-box code, a floor, a studio or apartment number here.
 */
window.CASA = window.CASA || {};
CASA.stays = CASA.stays || {};

CASA.stays['darb-inn'] = {
  location: {
    // TODO: the building's pin (lat/lng). Until then: the neighbourhood.
    lat: 33.53,
    lng: -7.82,
    mapsQuery: 'Dar Bouazza',
    mapsUrl: 'https://maps.app.goo.gl/6n2z1W1VuffrPWyM6',
    address: { fr: 'TODO', ar: 'TODO' }
  },
  checkin: { time: '15:00' }, // TODO: confirm
  checkout: { time: '11:00' }, // TODO: confirm
  wifi: { network: 'TODO', password: '' },
  howto: [],
  nearby: []
};
