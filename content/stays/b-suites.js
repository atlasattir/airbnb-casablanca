/*
 * Darna Collection — Darna B-Suites, a building of 8 studios in Bourgogne, Casablanca.
 *
 * One guide for the whole building: every studio's guests read this page.
 * Anything left out (check-in and check-out steps, services, host) comes from
 * the defaults in content/brand.js; add the field here to replace it.
 *
 * Any text that starts with 'TODO' shows a small "Bientôt" badge to guests
 * until you replace it. Search this file for TODO to find what is left.
 * Keep texts short: each one sits on a card next to an icon.
 *
 * Security: never put the street-door code, a key-box code, a floor or a studio
 * number here. This page is public; send those in the Airbnb messages instead.
 */
window.CASA = window.CASA || {};
CASA.stays = CASA.stays || {};

CASA.stays['b-suites'] = {
  location: {
    // TODO: the building's pin (lat/lng). Until then: the Bourgogne district.
    lat: 33.598,
    lng: -7.638,
    // Text searched in Google Maps for the walk "Depuis votre porte".
    // TODO: replace with the building's street address.
    mapsQuery: 'Bourgogne, Casablanca',
    // The host's Google Maps link to the building; it wins over mapsQuery for "Localisation".
    mapsUrl: 'https://maps.app.goo.gl/pupJDv2GjQBwkt4AA',
    // Street address only (no floor, no studio number). The Arabic line is shown to taxi drivers.
    address: { fr: 'TODO', ar: 'TODO' }
  },

  welcome: {
    fr: 'Bienvenue dans votre studio, au cœur de Bourgogne. Tout est prêt, et je ne suis qu’à un message de vous.',
    en: 'Welcome to your studio in the heart of Bourgogne. Everything is here, and I am one message away.',
    ar: 'مرحباً بك في الاستوديو الخاص بك، في قلب حيّ بورغون. كل شيء هنا، وأنا على بُعد رسالة.',
    es: 'Te doy la bienvenida a tu estudio, en pleno Bourgogne. Todo está aquí, y estoy a un mensaje de distancia.'
  },

  checkin: {
    time: '15:00',
    steps: null // null: the default steps of content/brand.js (access and studio number go in the Airbnb messages)
  },
  checkout: {
    time: '11:00',
    steps: null
  },

  wifi: {
    // TODO (host): one network per studio, or one for the building? Use a neutral
    // name: a name with the studio's number would give it away on the printed card.
    network: 'TODO',
    // Leave empty to show "on the card in your place" instead of the password.
    // The repository is public: a password written here is published.
    password: ''
  },

  // The brand's four rules, then the building's own.
  rules: [
    { icon: 'nosmoke', fr: 'Non-fumeur', en: 'No smoking', ar: 'ممنوع التدخين', es: 'No fumar' },
    { icon: 'party', fr: 'Pas de fête', en: 'No parties', ar: 'ممنوع الحفلات', es: 'Sin fiestas' },
    { icon: 'moon', fr: 'Calme après 22 h', en: 'Quiet after 10 pm', ar: 'الهدوء بعد 22:00', es: 'Silencio desde las 22:00' },
    { icon: 'users', fr: 'Voyageurs inscrits seulement', en: 'Booked guests only', ar: 'الضيوف المسجّلون فقط', es: 'Solo huéspedes registrados' },
    { icon: 'building', fr: 'Parties communes : calme et propreté', en: 'Shared areas: quiet and tidy', ar: 'الأماكن المشتركة: هدوء ونظافة', es: 'Zonas comunes: silencio y limpieza' },
    { icon: 'door', fr: 'Refermez toujours la porte d’entrée', en: 'Always close the street door', ar: 'أغلق باب العمارة دائماً', es: 'Cierra siempre la puerta de entrada' }
  ],

  // Two or three short lines each. Remove what the studios do not have.
  // The client's description of each studio: bathroom, one bedroom, living area,
  // air conditioning, balcony.
  // TODO (host): is there a lift, or stairs only? Worth saying for heavy luggage.
  howto: [
    {
      // TODO (host): add where the remote is, if useful.
      icon: 'snow',
      title: { fr: 'Climatisation', en: 'Air conditioning', ar: 'المكيّف', es: 'Aire acondicionado' },
      body: {
        fr: 'Fermez les fenêtres et la porte du balcon quand elle fonctionne. Éteignez-la en sortant.',
        en: 'Keep the windows and the balcony door shut while it runs. Switch it off when you go out.',
        ar: 'أغلق النوافذ وباب الشرفة أثناء تشغيله، وأطفئه عند خروجك.',
        es: 'Cierra las ventanas y la puerta del balcón mientras funciona. Apágalo al salir.'
      }
    },
    {
      // TODO (host): the water heater's type and size, if guests should space out showers.
      icon: 'drop',
      title: { fr: 'Eau chaude', en: 'Hot water', ar: 'الماء الساخن', es: 'Agua caliente' },
      body: {
        fr: 'Laissez couler l’eau quelques instants avant la douche. Toujours froide ? Écrivez à {host}.',
        en: 'Let the water run for a moment before your shower. Still cold? Message {host}.',
        ar: 'اترك الماء يجري بضع لحظات قبل الاستحمام. أما زال بارداً؟ راسل {host}.',
        es: 'Deja correr el agua unos instantes antes de ducharte. ¿Sigue fría? Escribe a {host}.'
      }
    },
    // TODO (host): what the kitchen corner has (hob, fridge, kettle…). The client's
    // description does not mention one: remove this entry if the studios have none.
    { icon: 'pot', title: { fr: 'Coin cuisine', en: 'Kitchenette', ar: 'ركن الطبخ', es: 'Zona de cocina' }, body: 'TODO' },
    {
      icon: 'door',
      title: { fr: 'L’immeuble', en: 'The building', ar: 'العمارة', es: 'El edificio' },
      body: {
        fr: 'Refermez toujours la porte d’entrée et n’ouvrez pas aux inconnus. Ne laissez rien dans l’escalier. Une livraison ? Récupérez-la à la porte.',
        en: 'Always close the street door and never let strangers in. Leave nothing on the stairs. A delivery? Collect it at the door.',
        ar: 'أغلق باب العمارة دائماً ولا تفتحه للغرباء، ولا تترك شيئاً في الدرج. طلبية توصيل؟ استلمها عند الباب.',
        es: 'Cierra siempre la puerta de entrada y no abras a desconocidos. No dejes nada en la escalera. ¿Un pedido? Recógelo en la puerta.'
      }
    },
    {
      icon: 'moon',
      title: { fr: 'Heures calmes', en: 'Quiet hours', ar: 'أوقات الهدوء', es: 'Horas de silencio' },
      body: {
        fr: 'Huit studios partagent l’immeuble. Après 22 h, parlez bas dans l’escalier et sur le balcon.',
        en: 'Eight studios share the building. After 10 pm, keep your voice low on the stairs and on the balcony.',
        ar: 'تضمّ العمارة ثمانية استوديوهات، فبعد الساعة 22:00 اخفض صوتك في الدرج وعلى الشرفة.',
        es: 'El edificio tiene ocho estudios. A partir de las 22:00, habla bajo en la escalera y en el balcón.'
      }
    },
    {
      // TODO (host): replace the last sentence with the exact place and time
      // (bin room or street container, in the evening?).
      icon: 'trash',
      title: { fr: 'Poubelles', en: 'Rubbish', ar: 'النفايات', es: 'Basura' },
      body: {
        fr: 'Fermez bien les sacs et ne les laissez jamais sur le palier ni dans l’escalier. Où les déposer ? Demandez à {host}.',
        en: 'Tie the bags tightly and never leave them on the landing or the stairs. Where do they go? Ask {host}.',
        ar: 'أحكم إغلاق الأكياس، ولا تتركها أبداً أمام الباب أو في الدرج. أين تضعها؟ اسأل {host}.',
        es: 'Cierra bien las bolsas y no las dejes nunca en el rellano ni en la escalera. ¿Dónde van? Pregunta a {host}.'
      }
    }
  ],

  // name: the shop; walk: minutes on foot FROM THE BUILDING (0 = not measured yet);
  // maps: Google Maps search text.
  // Same list as Darna Bourgogne (same neighbourhood): change both together.
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
  ],

  services: null // null: the brand's services (airport transfer, early/late, cleaning)
};
