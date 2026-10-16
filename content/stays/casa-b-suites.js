/*
 * Atlas Stays — Casa B Suites, a building of 8 studios in Bourgogne, Casablanca.
 * Starter file: everything left out comes from the defaults in content/brand.js.
 * Security: never put a door or key-box code, a floor, a studio or apartment number here.
 */
window.CASA = window.CASA || {};
CASA.stays = CASA.stays || {};

CASA.stays['casa-b-suites'] = {
  location: {
    // TODO: the building's pin (lat/lng). Until then: the neighbourhood.
    lat: 33.598,
    lng: -7.638,
    mapsQuery: 'Bourgogne, Casablanca',
    mapsUrl: 'https://maps.app.goo.gl/pupJDv2GjQBwkt4AA',
    address: { fr: 'TODO', ar: 'TODO' }
  },
  checkin: { time: '15:00' }, // TODO: confirm
  checkout: { time: '11:00' }, // TODO: confirm
  wifi: { network: 'TODO', password: '' },
  howto: [],
  nearby: []
};
