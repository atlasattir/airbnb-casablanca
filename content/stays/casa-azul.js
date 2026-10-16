/*
 * Atlas Stays — Casa Azul Martil, a family apartment with a pool in Martil.
 * Starter file: everything left out comes from the defaults in content/brand.js.
 * Security: never put a door or key-box code, a floor, a studio or apartment number here.
 */
window.CASA = window.CASA || {};
CASA.stays = CASA.stays || {};

CASA.stays['casa-azul'] = {
  location: {
    // TODO: the building's pin (lat/lng). Until then: the neighbourhood.
    lat: 35.6178,
    lng: -5.275,
    mapsQuery: 'Martil',
    mapsUrl: 'https://maps.app.goo.gl/BA2fWB5NM8kDagkJ8',
    address: { fr: 'TODO', ar: 'TODO' }
  },
  checkin: { time: '15:00' }, // TODO: confirm
  checkout: { time: '11:00' }, // TODO: confirm
  wifi: { network: 'TODO', password: '' },
  howto: [],
  nearby: []
};
