/*
 * Atlas Stays — Ocean 21, an apartment in the Pestana residence, Aïn Diab, Casablanca.
 * Starter file: everything left out comes from the defaults in content/brand.js.
 * Security: never put a door or key-box code, a floor, a studio or apartment number here.
 */
window.CASA = window.CASA || {};
CASA.stays = CASA.stays || {};

CASA.stays['ocean-21'] = {
  location: {
    // TODO: the building's pin (lat/lng). Until then: the neighbourhood.
    lat: 33.5957,
    lng: -7.666,
    mapsQuery: 'Anfa Place, Boulevard de la Corniche, Casablanca',
    mapsUrl: 'https://maps.app.goo.gl/JZFTgycexUg4dt2YA',
    address: { fr: 'TODO', ar: 'TODO' }
  },
  checkin: { time: '15:00' }, // TODO: confirm
  checkout: { time: '11:00' }, // TODO: confirm
  wifi: { network: 'TODO', password: '' },
  howto: [],
  nearby: []
};
