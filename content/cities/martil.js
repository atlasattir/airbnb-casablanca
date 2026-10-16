/*
 * Atlas Stays — Martil and the Tamuda Bay (Martil, Cabo Negro, M'diq) with
 * Tétouan next door, for Casa Azul Martil.
 *
 * Same structure as content/cities/casablanca.js (see the notes at the top of
 * that file for every field). Starter guide: few places, each one confirmed by
 * a web search in 2026-10; the source is in a comment above each item.
 *
 * Prices and opening hours change, and much of the coast is seasonal (very busy
 * in July and August, quieter and partly closed the rest of the year): check
 * each place before publishing, then update the "checked" date.
 * No exact pin for the apartment is known yet, so nothing here claims a walking
 * time from the door. No taxi colour is given: the sources disagree for Tétouan.
 */
window.CASA = window.CASA || {};
CASA.cities = CASA.cities || {};

CASA.cities.martil = {
  checked: '2026-10',
  name: { fr: 'Martil', en: 'Martil', ar: 'مرتيل', es: 'Martil' },
  // Used by the airport-transfer service: "Un chauffeur depuis {airport}"
  airport: { fr: 'l’aéroport de Tétouan ou de Tanger', en: 'Tétouan or Tangier airport', ar: 'مطار تطوان أو طنجة', es: 'el aeropuerto de Tetuán o Tánger' },
  film: null,
  scene: 'sea',

  /* No sight, beach, restaurant or café below is confirmed within ~15 minutes
     on foot of the apartment, so the list stays empty until its pin is known.
     TODO (host): once the pin is known, add the ids within walking distance
     (probably 'martil-beach', 'martil-corniche', 'corniche-family'). */
  areas: { martil: { near: [] } },

  /* The city's group of buttons on the home screen. 'wide' buttons take a full row. */
  group: {
    title: { fr: 'Que souhaitez-vous faire aujourd’hui ?', en: 'What would you like to do today?', ar: 'ماذا تودّ أن تفعل اليوم؟', es: '¿Qué te apetece hacer hoy?' },
    items: ['beaches', 'visit', 'restaurants', 'cafes', 'family', 'transport', 'itineraries'],
    wide: ['beaches', 'itineraries']
  },

  sections: {

    /* ------------------------------------------------------------------ */
    beaches: {
      icon: 'waves', tint: '#2F6170',
      type: 'places',
      title: { fr: 'Plages', en: 'Beaches', ar: 'شواطئ', es: 'Playas' },
      intro: {
        fr: 'Une Méditerranée souvent calme et des plages de sable, de Martil à M’diq. En juillet et août, venez tôt.',
        en: 'An often calm Mediterranean and sandy beaches, from Martil to M’diq. In July and August, come early.',
        ar: 'البحر الأبيض المتوسط هنا هادئ في الغالب، وشواطئه رملية من مرتيل إلى المضيق. في يوليوز وغشت، تعالَ باكراً.',
        es: 'Un Mediterráneo a menudo tranquilo y playas de arena, de Martil a M’diq. En julio y agosto, ve temprano.'
      },
      items: [
        // source: https://sandee.com/morocco/tanger-tetouan-al-hoceima/martil/plage-martil
        // (lifeguards, toilets and beachfront cafés in season)
        // source: https://travel.hotelscombined.ca/Place/Martil.htm
        // (family-friendly golden sand, calm water, loungers to rent; mid-July to mid-September,
        //  especially August, very crowded)
        {
          id: 'martil-beach',
          icon: 'umbrella',
          short: { fr: 'Sable doré, eau calme, en famille', en: 'Golden sand, calm water, families', ar: 'رمل ذهبي ومياه هادئة للعائلات', es: 'Arena dorada y agua tranquila' },
          name: { fr: 'Plage de Martil', en: 'Martil Beach', ar: 'شاطئ مرتيل', es: 'Playa de Martil' },
          area: { fr: 'Martil', ar: 'مرتيل' },
          desc: {
            fr: 'Une longue plage de sable doré, à l’eau souvent calme, très appréciée des familles. En saison : transats à louer, postes de secours et cafés sur le sable.',
            en: 'A long golden beach with often calm water, much loved by families. In season: sunbeds to rent, lifeguard posts and cafés on the sand.',
            ar: 'شاطئ طويل من الرمل الذهبي، مياهه هادئة في الغالب، وتحبّه العائلات كثيراً. في موسم الاصطياف: كراسي استلقاء للكراء ومراكز للإنقاذ ومقاهٍ على الرمل.',
            es: 'Una larga playa de arena dorada, de agua a menudo tranquila, muy apreciada por las familias. En temporada: tumbonas de alquiler, socorristas y cafés en la arena.'
          },
          tip: {
            fr: 'En juillet et août, la plage est bondée : venez le matin et baignez-vous près d’un poste de secours.',
            en: 'In July and August the beach is packed: come in the morning and swim near a lifeguard post.',
            ar: 'في يوليوز وغشت يكون الشاطئ مكتظاً، فتعال صباحاً واسبح قرب مركز للإنقاذ.',
            es: 'En julio y agosto la playa se llena: ve por la mañana y báñate cerca de un puesto de socorrismo.'
          },
          price: 0,
          maps: 'Plage de Martil, Martil'
        },
        // source: https://travel.hotelscombined.ca/Place/Martil.htm
        // (palm-lined walkway above the beach with cafés, benches and vendors; the evening walk is the
        //  local ritual; busy nightlife on the corniche in summer)
        {
          id: 'martil-corniche',
          icon: 'walk',
          short: { fr: 'Palmiers, cafés et balade du soir', en: 'Palms, cafés and the evening stroll', ar: 'نخيل ومقاهٍ ونزهة المساء', es: 'Palmeras, cafés y paseo vespertino' },
          name: { fr: 'Corniche de Martil', en: 'Martil Corniche', ar: 'كورنيش مرتيل', es: 'Paseo marítimo de Martil' },
          area: { fr: 'Martil', ar: 'مرتيل' },
          desc: {
            fr: 'La promenade bordée de palmiers au-dessus de la plage, avec ses cafés, ses bancs et ses marchands. La balade du soir y est un rituel.',
            en: 'The palm-lined promenade above the beach, with its cafés, benches and street sellers. The evening stroll here is a ritual.',
            ar: 'الممشى المحفوف بالنخيل فوق الشاطئ، بمقاهيه ومقاعده وباعته. نزهة المساء هنا عادة لا تُفوَّت.',
            es: 'El paseo con palmeras sobre la playa, con sus cafés, bancos y vendedores. El paseo de la tarde es todo un ritual.'
          },
          tip: {
            fr: 'En été, la corniche reste animée tard dans la nuit.',
            en: 'In summer the corniche stays lively late into the night.',
            ar: 'في الصيف يبقى الكورنيش نابضاً بالحياة حتى وقت متأخر من الليل.',
            es: 'En verano el paseo sigue animado hasta muy tarde.'
          },
          duration: 60, price: 0, sunset: true,
          maps: 'Corniche de Martil, Martil'
        },
        // source: https://travel.com/regions/africa/morocco/martil-morocco-best-things-to-do-top-picks/
        // (where the river meets the sea; quieter than the beach; birdwatching, photos, fishermen at work)
        {
          id: 'oued-martil',
          icon: 'fish',
          short: { fr: 'Là où la rivière rejoint la mer', en: 'Where the river meets the sea', ar: 'حيث يلتقي الوادي بالبحر', es: 'Donde el río se une al mar' },
          name: { fr: 'Embouchure de l’oued Martil', en: 'Oued Martil estuary', ar: 'مصبّ وادي مرتيل', es: 'Desembocadura del Martil' },
          area: { fr: 'Martil', ar: 'مرتيل' },
          desc: {
            fr: 'Plus calme que la plage : on y vient pour les oiseaux, les photos et les pêcheurs au travail.',
            en: 'Quieter than the beach: come for the birds, the photos and the fishermen at work.',
            ar: 'أهدأ من الشاطئ: يقصده الناس لمشاهدة الطيور والتصوير ورؤية الصيادين أثناء عملهم.',
            es: 'Más tranquila que la playa: se viene por las aves, las fotos y los pescadores trabajando.'
          },
          price: 0,
          maps: 'Embouchure Oued Martil, Martil'
        },
        // source: https://fr.le360.ma/societe/un-jour-une-plage-ep18-cabo-negro-eau-turquoise-et-ambiance-festive_WCL6RLVLERCV7FULBGHIY4KUCQ/
        // (turquoise water, calm and clean, thousands of summer visitors; horse rides, quad bikes, jet skis)
        // source: https://www.expedia.com/Cabo-Negro.dx6343143 (hike the peninsula trails, then swim)
        {
          id: 'cabo-negro',
          icon: 'waves',
          short: { fr: 'Eau turquoise, ambiance d’été', en: 'Turquoise water, summer buzz', ar: 'مياه فيروزية وأجواء صيفية', es: 'Agua turquesa, ambiente de verano' },
          name: { fr: 'Plage de Cabo Negro', en: 'Cabo Negro Beach', ar: 'شاطئ كابو نيغرو', es: 'Playa de Cabo Negro' },
          area: { fr: 'Cabo Negro', ar: 'كابو نيغرو' },
          desc: {
            fr: 'Au nord de Martil, une plage calme et propre au pied du cap. En été : balades à cheval, quad et jet-ski.',
            en: 'North of Martil, a calm, clean beach below the headland. In summer: horse rides, quad bikes and jet skis.',
            ar: 'شمال مرتيل، شاطئ هادئ ونظيف عند سفح الرأس. في الصيف: ركوب الخيل والدراجات الرباعية والدراجات المائية.',
            es: 'Al norte de Martil, una playa tranquila y limpia al pie del cabo. En verano: paseos a caballo, quads y motos de agua.'
          },
          tip: {
            fr: 'Avant la baignade, marchez sur les sentiers du cap.',
            en: 'Before your swim, walk the trails on the headland.',
            ar: 'قبل السباحة، تجوّل في مسالك الرأس.',
            es: 'Antes del baño, recorre los senderos del cabo.'
          },
          price: 0,
          maps: 'Plage Cabo Negro'
        },
        // source: https://fr.le360.ma/societe/un-jour-une-plage-mdiq-le-site-balneaire-mediterraneen-le-plus-anime-du-nord_H4DHINHTNBDNFAPKJRJAUD5RNY/
        // (Aug. 2024: "le site balnéaire méditerranéen le plus animé du Nord", one of the finest beaches
        //  in the north, praised for being clean, lively evenings with open-air concerts on the beach)
        {
          id: 'mdiq-beach',
          icon: 'sun',
          short: { fr: 'La plage la plus animée du Nord', en: 'The liveliest beach in the north', ar: 'أكثر الشواطئ حيوية في الشمال', es: 'La playa más animada del norte' },
          name: { fr: 'Plage de M’diq', en: 'M’diq Beach', ar: 'شاطئ المضيق', es: 'Playa de M’diq' },
          area: { fr: 'M’diq', ar: 'المضيق' },
          desc: {
            fr: 'L’une des plus belles plages du Nord, appréciée pour sa propreté. Les soirs d’été, l’ambiance est festive, parfois avec des concerts sur la plage.',
            en: 'One of the finest beaches in the north, praised for being clean. On summer evenings the mood is festive, sometimes with concerts on the beach.',
            ar: 'من أجمل شواطئ الشمال، ويُشاد بنظافته. في أمسيات الصيف تسود أجواء احتفالية، وأحياناً حفلات موسيقية على الشاطئ.',
            es: 'Una de las mejores playas del norte, apreciada por su limpieza. Las noches de verano el ambiente es festivo, a veces con conciertos en la playa.'
          },
          tip: {
            fr: 'Combinez-la avec un déjeuner de poisson au port de M’diq.',
            en: 'Pair it with a fish lunch at M’diq port.',
            ar: 'اجمع بين زيارته وغداء سمك في ميناء المضيق.',
            es: 'Combínala con un almuerzo de pescado en el puerto de M’diq.'
          },
          price: 0,
          maps: 'Plage M\'diq'
        }
      ]
    },

    /* ------------------------------------------------------------------ */
    visit: {
      icon: 'arch', tint: '#876A41',
      type: 'places',
      title: { fr: 'À visiter', en: 'Places to visit', ar: 'أماكن للزيارة', es: 'Qué visitar' },
      intro: {
        fr: 'Tétouan et sa médina à quelques minutes, la côte et les montagnes du Rif autour.',
        en: 'Tétouan and its medina a few minutes away, with the coast and the Rif mountains around.',
        ar: 'تطوان ومدينتها العتيقة على بُعد دقائق، والساحل وجبال الريف من حولك.',
        es: 'Tetuán y su medina a pocos minutos, con la costa y las montañas del Rif alrededor.'
      },
      items: [
        // source: https://worldheritagesites.net/?p=35264 (UNESCO World Heritage, 1997)
        // source: https://kupi.com/en/explore/morocco/tetouan/bab-al-okla (Bab Okla, the main gate)
        // source: https://www.barcelo.com/guia-turismo/en/morocco/tanger/things-to-do/tetouan/
        // (a working market rather than a tourist set; allow 2-3 h)
        // Martil–Tétouan: about 10 min (https://travelynnfamily.com/tetouan-with-kids/) to about 20 min by car
        // (https://travel.hotelscombined.ca/Place/Martil.htm), hence "10 à 20 minutes".
        {
          id: 'tetouan-medina',
          icon: 'gate',
          short: { fr: 'Médina andalouse, classée UNESCO', en: 'Andalusian medina, UNESCO-listed', ar: 'مدينة عتيقة أندلسية مصنّفة لدى اليونسكو', es: 'Medina andalusí, Patrimonio UNESCO' },
          name: { fr: 'Médina de Tétouan', en: 'Tétouan Medina', ar: 'مدينة تطوان العتيقة', es: 'Medina de Tetuán' },
          area: { fr: 'Tétouan · 10 à 20 min', en: 'Tétouan · 10 to 20 min', ar: 'تطوان · 10 إلى 20 دقيقة', es: 'Tetuán · 10 a 20 min' },
          desc: {
            fr: 'Classée au patrimoine mondial de l’UNESCO en 1997, c’est l’une des médinas les mieux conservées du Maroc, marquée par l’Andalousie. Un vrai marché vivant, plus qu’un décor pour touristes.',
            en: 'A UNESCO World Heritage Site since 1997 and one of the best-preserved medinas in Morocco, shaped by Andalusia. A real working market rather than a tourist set.',
            ar: 'مصنّفة تراثاً عالمياً لدى اليونسكو منذ 1997، وهي من أفضل المدن العتيقة حفاظاً في المغرب، بطابع أندلسي واضح. سوق حيّ حقيقي، لا ديكور سياحي.',
            es: 'Patrimonio Mundial de la UNESCO desde 1997 y una de las medinas mejor conservadas de Marruecos, con huella andalusí. Un mercado vivo de verdad, no un decorado turístico.'
          },
          tip: {
            fr: 'Entrez par Bab Okla, prévoyez 2 à 3 heures et des chaussures plates : les ruelles sont en pente.',
            en: 'Enter by Bab Okla, allow 2 to 3 hours and wear flat shoes, as the lanes slope.',
            ar: 'ادخل من باب العقلة وخصّص ساعتين إلى ثلاث، والبس حذاءً مسطّحاً لأن الأزقة منحدرة.',
            es: 'Entra por Bab Okla, calcula de 2 a 3 horas y lleva calzado plano: las callejuelas tienen cuesta.'
          },
          duration: 150, price: 0,
          maps: 'Bab Okla, Tétouan'
        },
        // source: https://kupi.com/en/explore/morocco/tetouan/bab-al-okla
        // source: https://www.revigorate.com/things-to-do-in-tetouan.html
        // (costumes, tools and household items; rooftop terrace with views over the city and the Rif)
        // source: https://fr.le360.ma/culture/tetouan-le-musee-ethnographique-de-bab-el-oqla-rouvre-lhistoire-dune-cite-multi-culturelle-narree-253786/
        // (reopened in January 2022 after renovation, run by the Fondation nationale des musées).
        // Hours and fee differ between listings (one says 10:00-18:00, closed Tuesday, 20 MAD): not printed.
        {
          id: 'ethno-museum',
          icon: 'museum',
          short: { fr: 'Costumes, objets et vue du toit', en: 'Costumes, crafts and a rooftop view', ar: 'أزياء وأدوات وإطلالة من السطح', es: 'Trajes, objetos y vistas desde arriba' },
          name: { fr: 'Musée ethnographique', en: 'Ethnographic Museum', ar: 'المتحف الإثنوغرافي', es: 'Museo Etnográfico' },
          area: { fr: 'Bab Okla · Tétouan', en: 'Bab Okla · Tétouan', ar: 'باب العقلة · تطوان', es: 'Bab Okla · Tetuán' },
          desc: {
            fr: 'Près de Bab Okla : costumes, outils et objets de la vie d’autrefois. Depuis la terrasse, vue sur la ville et les montagnes du Rif.',
            en: 'Next to Bab Okla: costumes, tools and everyday objects of the past. From the rooftop terrace, views over the city and the Rif mountains.',
            ar: 'قرب باب العقلة: أزياء وأدوات وأغراض من الحياة اليومية في الماضي. ومن السطح إطلالة على المدينة وجبال الريف.',
            es: 'Junto a Bab Okla: trajes, herramientas y objetos de la vida de antaño. Desde la azotea, vistas de la ciudad y de las montañas del Rif.'
          },
          tip: {
            fr: 'Vérifiez les horaires avant d’y aller.',
            en: 'Check opening hours before you go.',
            ar: 'تحقّق من أوقات الفتح قبل الذهاب.',
            es: 'Consulta el horario antes de ir.'
          },
          duration: 45,
          maps: 'Musée Ethnographique de Tétouan'
        },
        // source: https://kupi.com/en-ae/explore/morocco/tetouan/place-moulay-el-mehdi
        // source: https://www.lonelyplanet.com/morocco/the-mediterranean-coast-and-the-rif/tetouan/attractions
        // source: https://travelynnfamily.com/tetouan-with-kids/
        // (restored Spanish-protectorate quarter; the cafés opposite the church serve crêpes and ice cream)
        {
          id: 'ensanche',
          icon: 'cathedral',
          short: { fr: 'Le quartier espagnol et ses cafés', en: 'The Spanish-era quarter and cafés', ar: 'الحيّ الإسباني ومقاهيه', es: 'El barrio español y sus cafés' },
          name: { fr: 'L’Ensanche', en: 'The Ensanche', ar: 'حيّ الإنسانشي', es: 'El Ensanche' },
          area: { fr: 'Tétouan', en: 'Tétouan', ar: 'تطوان', es: 'Tetuán' },
          desc: {
            fr: 'Le quartier bâti sous le protectorat espagnol, restauré, autour de la place Moulay El Mehdi et de son église. Les cafés d’en face servent crêpes et glaces.',
            en: 'The quarter built under the Spanish protectorate, now restored, around Moulay El Mehdi Square and its church. The cafés opposite serve crêpes and ice cream.',
            ar: 'الحيّ الذي شُيّد في عهد الحماية الإسبانية، وقد رُمّم، حول ساحة مولاي المهدي وكنيستها. المقاهي المقابلة تقدّم الكريب والمثلّجات.',
            es: 'El barrio construido durante el protectorado español, hoy restaurado, en torno a la plaza Moulay El Mehdi y su iglesia. Los cafés de enfrente sirven crepes y helados.'
          },
          duration: 60, price: 0,
          maps: 'Place Moulay El Mehdi, Tétouan'
        },
        // source: https://www.spainnorthafricaproject.org/bulletin/2019/7/8/arts-feature-our-dream-was-to-rescue
        // source: https://www.lonelyplanet.com/morocco/the-mediterranean-coast-and-the-rif/tetouan/attractions/tetouan-museum-of-modern-art/a/poi-sig/1453400/355514
        // (modern Moroccan art in the 1918 Spanish railway station, opened in 2013)
        {
          id: 'art-centre',
          icon: 'train',
          short: { fr: 'Art marocain dans une ancienne gare', en: 'Moroccan art in an old station', ar: 'فن مغربي في محطة قطار قديمة', es: 'Arte marroquí en una antigua estación' },
          name: { fr: 'Centre d’art moderne', en: 'Modern Art Centre', ar: 'مركز الفن الحديث', es: 'Centro de Arte Moderno' },
          area: { fr: 'Tétouan', en: 'Tétouan', ar: 'تطوان', es: 'Tetuán' },
          desc: {
            fr: 'Depuis 2013, l’ancienne gare espagnole de 1918 accueille l’art moderne et contemporain marocain.',
            en: 'Since 2013 the old 1918 Spanish railway station has housed modern and contemporary Moroccan art.',
            ar: 'منذ 2013 تحتضن محطة القطار الإسبانية القديمة، التي تعود إلى 1918، الفنَّ المغربي الحديث والمعاصر.',
            es: 'Desde 2013, la antigua estación española de 1918 acoge arte moderno y contemporáneo marroquí.'
          },
          tip: {
            fr: 'Vérifiez les horaires avant d’y aller.',
            en: 'Check opening hours before you go.',
            ar: 'تحقّق من أوقات الفتح قبل الذهاب.',
            es: 'Consulta el horario antes de ir.'
          },
          duration: 60,
          maps: 'Centre d\'Art Moderne de Tétouan'
        },
        // source: https://predictwind.com/de/marinas/morocco/tanger-tetouan-al-hoceima/port-of-mdiq
        // (active fishing port with public restaurants)
        // source: https://en.hespress.com/128403-mdiq-port-landings-rise-sharply-despite-national-fishing-decline.html
        // source: https://www.cruiseweb.com/ports/m-diq-medieq-morocco (the day's catch is landed and sold there)
        {
          id: 'mdiq-port',
          icon: 'buoy',
          short: { fr: 'Port de pêche et poisson du jour', en: 'Fishing port, the day’s catch', ar: 'ميناء صيد وسمك اليوم', es: 'Puerto pesquero y pescado del día' },
          name: { fr: 'Port de M’diq', en: 'M’diq Port', ar: 'ميناء المضيق', es: 'Puerto de M’diq' },
          area: { fr: 'M’diq', ar: 'المضيق' },
          desc: {
            fr: 'Un port de pêche actif, où l’on débarque et vend le poisson du jour, avec des restaurants ouverts au public.',
            en: 'An active fishing port where the day’s catch is landed and sold, with restaurants open to the public.',
            ar: 'ميناء صيد نشيط تُفرَغ فيه أسماك اليوم وتُباع، وبه مطاعم مفتوحة للعموم.',
            es: 'Un puerto pesquero activo donde se desembarca y se vende el pescado del día, con restaurantes abiertos al público.'
          },
          tip: {
            fr: 'Venez à midi et demandez le prix avant de commander.',
            en: 'Come at lunchtime and ask the price before you order.',
            ar: 'تعال وقت الغداء واسأل عن الثمن قبل الطلب.',
            es: 'Ven a mediodía y pregunta el precio antes de pedir.'
          },
          maps: 'Port de M\'diq'
        },
        // source: https://www.rome2rio.com/s/Martil/Chefchaouen (about 74 km, about 1 h 15-1 h 20 by car)
        // source: https://12go.asia/en/travel/tetouan/chefchaouen
        // source: https://www.checkmybus.com/travel/tetouan/chefchaouen (CTM from Tétouan, about 1 h 15-1 h 30)
        {
          id: 'chefchaouen',
          icon: 'mountain',
          short: { fr: 'La ville bleue, à ≈ 1 h 15 de route', en: 'The blue town, ≈ 1 h 15 by road', ar: 'المدينة الزرقاء، على بُعد ≈ ساعة وربع', es: 'El pueblo azul, a ≈ 1 h 15 en coche' },
          name: { fr: 'Chefchaouen', ar: 'شفشاون' },
          area: { fr: 'Rif · excursion', en: 'Rif · day trip', ar: 'الريف · رحلة يوم', es: 'Rif · excursión' },
          desc: {
            fr: 'La petite ville bleue du Rif, l’excursion classique depuis la côte : environ 74 km, soit 1 h 15 à 1 h 20 en voiture.',
            en: 'The little blue town in the Rif, the classic day trip from the coast: about 74 km, or 1 h 15 to 1 h 20 by car.',
            ar: 'المدينة الزرقاء الصغيرة في جبال الريف، والرحلة الكلاسيكية انطلاقاً من الساحل: نحو 74 كيلومتراً، أي من ساعة وربع إلى ساعة و20 دقيقة بالسيارة.',
            es: 'El pueblo azul del Rif, la excursión clásica desde la costa: unos 74 km, es decir, de 1 h 15 a 1 h 20 en coche.'
          },
          tip: {
            fr: 'Partez tôt en été ; sans voiture, prenez un bus CTM depuis Tétouan ou un grand taxi.',
            en: 'Leave early in summer; without a car, take a CTM bus from Tétouan or a grand taxi.',
            ar: 'انطلق باكراً في الصيف، وإن لم تكن لديك سيارة فاركب حافلة CTM من تطوان أو طاكسياً كبيراً.',
            es: 'Sal temprano en verano; sin coche, toma un autobús CTM desde Tetuán o un grand taxi.'
          },
          duration: 480,
          maps: 'Chefchaouen'
        }
      ]
    },

    /* ------------------------------------------------------------------ */
    restaurants: {
      icon: 'tagine', tint: '#8C4A3B',
      type: 'places',
      title: { fr: 'Restaurants', en: 'Restaurants', ar: 'مطاعم', es: 'Restaurantes' },
      intro: {
        fr: 'Sur cette côte, le poisson est roi. Quelques adresses à Martil et à M’diq.',
        en: 'On this coast, fish is king. A few addresses in Martil and M’diq.',
        ar: 'على هذا الساحل، السمك سيّد المائدة. بعض العناوين في مرتيل والمضيق.',
        es: 'En esta costa, el pescado manda. Algunas direcciones en Martil y M’diq.'
      },
      filters: [
        { id: 'martil', label: { fr: 'À Martil', en: 'In Martil', ar: 'في مرتيل', es: 'En Martil' } },
        { id: 'mdiq', label: { fr: 'À M’diq', en: 'In M’diq', ar: 'في المضيق', es: 'En M’diq' } },
        { id: 'chic', label: { fr: 'Chic', en: 'Upscale', ar: 'راقٍ', es: 'Elegante' } }
      ],
      items: [
        // source: https://www.tripadvisor.com/Restaurants-g669650-c33-Martil_Tanger_Tetouan_Al_Hoceima.html
        // source: https://www.tripadvisor.com/Restaurants-g669650-zfp58-Martil_Tanger_Tetouan_Al_Hoceima.html
        // (Seafood, Mediterranean, $$-$$$; 4.0 from about 56 reviews in 2026-10; the starters are praised)
        {
          id: 'cabo-corner',
          icon: 'fish',
          short: { fr: 'Poisson et cuisine méditerranéenne', en: 'Fish and Mediterranean cooking', ar: 'سمك ومطبخ متوسطي', es: 'Pescado y cocina mediterránea' },
          name: { fr: 'Cabo Corner' },
          area: { fr: 'Martil', ar: 'مرتيل' },
          tags: ['martil'],
          desc: {
            fr: 'L’une des tables les plus commentées de Martil : poisson, fruits de mer et cuisine méditerranéenne, à prix moyens.',
            en: 'One of the most-reviewed tables in Martil: fish, seafood and Mediterranean cooking, at mid-range prices.',
            ar: 'من أكثر المطاعم تقييماً في مرتيل: سمك وفواكه بحر ومطبخ متوسطي بأسعار متوسطة.',
            es: 'Una de las mesas con más reseñas de Martil: pescado, marisco y cocina mediterránea, a precio medio.'
          },
          tip: {
            fr: 'Les entrées sont souvent citées comme le point fort.',
            en: 'Diners often name the starters as the highlight.',
            ar: 'كثيراً ما يذكر الزبائن المقبّلات على أنها أفضل ما يقدّمه.',
            es: 'Los entrantes suelen citarse como lo mejor.'
          },
          budget: 2,
          maps: 'Restaurant Cabo Corner, Martil'
        },
        // source: https://www.tripadvisor.com/Restaurant_Review-g669650-d32707520-Reviews-Restaurant_Marino-Martil_Tanger_Tetouan_Al_Hoceima.html
        // (Moroccan seafood; fresh grilled fish praised; only 4 reviews in 2026-10)
        // source: https://restaurantguru.com/Marino-Martil
        // (avenue Lalla Hasna; Moroccan and Spanish seafood; fresh fish, salads and tapas praised).
        // Opening hours not confirmed (one review only says "after 2 pm"), so none are printed.
        {
          id: 'marino',
          icon: 'fish',
          short: { fr: 'Poisson frais, marocain et espagnol', en: 'Fresh fish, Moroccan and Spanish', ar: 'سمك طازج بنكهة مغربية وإسبانية', es: 'Pescado fresco, marroquí y español' },
          name: { fr: 'Restaurant Marino' },
          area: { fr: 'Martil', ar: 'مرتيل' },
          tags: ['martil'],
          desc: {
            fr: 'Cuisine de la mer marocaine et espagnole, saluée pour la fraîcheur de son poisson.',
            en: 'Moroccan and Spanish seafood cooking, praised for how fresh its fish is.',
            ar: 'أطباق بحرية مغربية وإسبانية، يُشاد بطزاجة سمكها.',
            es: 'Cocina marinera marroquí y española, elogiada por lo fresco de su pescado.'
          },
          tip: {
            fr: 'Les avis citent aussi ses salades et ses tapas.',
            en: 'Reviews also mention its salads and tapas.',
            ar: 'تذكر التقييمات أيضاً سلطاته وأطباق التاباس.',
            es: 'Las reseñas destacan también sus ensaladas y tapas.'
          },
          maps: 'Restaurant Marino, Martil'
        },
        // source: https://www.tripadvisor.co.uk/Restaurants-g669650-Martil_Tanger_Tetouan_Al_Hoceima.html
        // (3.3 from 69 reviews in 2026-10: "Good seafood, a bit expensive")
        {
          id: 'vitamines-mer',
          icon: 'fish',
          short: { fr: 'Fruits de mer, un peu plus cher', en: 'Seafood, a little pricier', ar: 'فواكه البحر، بثمن أعلى قليلاً', es: 'Marisco, algo más caro' },
          name: { fr: 'Les Vitamines de la Mer' },
          area: { fr: 'Martil', ar: 'مرتيل' },
          tags: ['martil'],
          desc: {
            fr: 'Une adresse de fruits de mer connue à Martil. Les avis sont partagés, mais le poisson y est souvent jugé bon.',
            en: 'A well-known seafood address in Martil. Reviews are mixed, but the fish is often called good.',
            ar: 'عنوان معروف لفواكه البحر في مرتيل. الآراء متباينة، لكن السمك يوصف غالباً بالجيّد.',
            es: 'Una dirección de marisco conocida en Martil. Las opiniones son variadas, pero el pescado suele considerarse bueno.'
          },
          tip: {
            fr: 'Demandez les prix avant de commander.',
            en: 'Ask the prices before you order.',
            ar: 'اسأل عن الأسعار قبل الطلب.',
            es: 'Pregunta los precios antes de pedir.'
          },
          budget: 3,
          maps: 'Les Vitamines de la Mer, Martil'
        },
        // source: https://www.tripadvisor.com/Restaurants-g669650-Martil_Tanger_Tetouan_Al_Hoceima.html
        // (El Faro: seafood and sushi, $$$$, 3.5 from about 15 reviews in 2026-10)
        // source: https://www.tripadvisor.com/Restaurant_Review-g669650-d15361492-Reviews-El_Faro-Martil_Tanger_Tetouan_Al_Hoceima.html
        // source: https://restaurantguru.com/El-Faro-Martil
        // (avenue Lalla Hasna; seafood and sushi; 3.5 on Tripadvisor, 4.1 from 1,000+ votes on Restaurant Guru;
        //  recent reviews split on freshness and service)
        {
          id: 'el-faro',
          icon: 'fish',
          short: { fr: 'Poisson et sushis, plus chic', en: 'Fish and sushi, more upscale', ar: 'سمك وسوشي، عنوان أرقى', es: 'Pescado y sushi, más elegante' },
          name: { fr: 'El Faro' },
          area: { fr: 'Martil', ar: 'مرتيل' },
          tags: ['martil', 'chic'],
          desc: {
            fr: 'Poisson, fruits de mer et sushis, parmi les tables les plus chères de Martil. Les avis récents sont partagés.',
            en: 'Fish, seafood and sushi, among the pricier tables in Martil. Recent reviews are mixed.',
            ar: 'سمك وفواكه بحر وسوشي، من أغلى المطاعم في مرتيل. التقييمات الأخيرة متباينة.',
            es: 'Pescado, marisco y sushi, entre las mesas más caras de Martil. Las reseñas recientes son variadas.'
          },
          budget: 3,
          maps: 'El Faro, Martil'
        },
        // source: https://de.restaurantguru.com/Restaurant-Yafa
        // (M'diq, avenue Tariq Ibn Ziyad: fresh fish, seafood, grills; listed 13:00-01:30, 50-300 MAD per person,
        //  cash only). Re-checked 2026-10: the same listing (187 votes, open until 01:30, lunch 50-100 MAD per
        //  person in one review); no other source, no official site. TODO (host): confirm it is still open.
        //  "Cash only" is not printed: only the listing says so.
        {
          id: 'yafa',
          icon: 'fish',
          short: { fr: 'Poisson, fruits de mer, grillades', en: 'Fish, seafood and grills', ar: 'سمك وفواكه بحر ومشويات', es: 'Pescado, marisco y parrilla' },
          name: { fr: 'Restaurant Yafa' },
          area: { fr: 'M’diq', ar: 'المضيق' },
          tags: ['mdiq'],
          desc: {
            fr: 'Poisson frais, fruits de mer et grillades à M’diq, ouvert du déjeuner jusque tard le soir.',
            en: 'Fresh fish, seafood and grills in M’diq, open from lunchtime until late at night.',
            ar: 'سمك طازج وفواكه بحر ومشويات في المضيق، مفتوح من وقت الغداء حتى ساعة متأخرة من الليل.',
            es: 'Pescado fresco, marisco y parrilla en M’diq, abierto desde el almuerzo hasta muy tarde.'
          },
          tip: {
            fr: 'Demandez le prix du poisson avant de commander.',
            en: 'Ask the price of the fish before you order.',
            ar: 'اسأل عن ثمن السمك قبل الطلب.',
            es: 'Pregunta el precio del pescado antes de pedir.'
          },
          price: 50, priceFrom: true,
          maps: 'Restaurant Yafa, M\'diq'
        },
        // source: https://www.enprimeurclub.com/restaurants/le-mediterranee-mdiq-restaurant
        // (route de Fnideq, M'diq: Mediterranean, terrace with panoramic views, about $30-50 per person,
        //  13:00-16:00 and 19:30-22:30). Re-checked 2026-10: the only listing found, and its "last verified"
        //  date is blank, so the hours are not printed. TODO (host): confirm it is open and worth it.
        {
          id: 'le-mediterranee',
          icon: 'glass',
          short: { fr: 'Terrasse panoramique sur la mer', en: 'Panoramic terrace over the sea', ar: 'شرفة بإطلالة بانورامية على البحر', es: 'Terraza panorámica sobre el mar' },
          name: { fr: 'Le Méditerranée' },
          area: { fr: 'M’diq · route de Fnideq', en: 'M’diq · Fnideq road', ar: 'المضيق · طريق الفنيدق', es: 'M’diq · carretera de Fnideq' },
          tags: ['mdiq', 'chic'],
          desc: {
            fr: 'Cuisine méditerranéenne et poisson sur une terrasse face à la mer, pour un dîner soigné.',
            en: 'Mediterranean cooking and fish on a terrace facing the sea, for a special dinner.',
            ar: 'مطبخ متوسطي وسمك على شرفة مطلّة على البحر، لعشاء مميّز.',
            es: 'Cocina mediterránea y pescado en una terraza frente al mar, para una cena especial.'
          },
          tip: {
            fr: 'Vérifiez les horaires avant d’y aller, et réservez en été.',
            en: 'Check opening hours before you go, and book in summer.',
            ar: 'تحقّق من أوقات الفتح قبل الذهاب، واحجز في الصيف.',
            es: 'Consulta el horario antes de ir y reserva en verano.'
          },
          budget: 3,
          maps: 'Le Méditerranée, M\'diq'
        },
        // source: none needed: a placeholder for the host's own pick (shows "Bientôt")
        {
          id: 'host-table',
          icon: 'star',
          short: { fr: 'L’adresse personnelle de {host}', en: '{host}’s personal pick', ar: 'اختيار {host} الشخصي', es: 'La elección personal de {host}' },
          kind: 'placeholder',
          name: { fr: 'Le poisson préféré de {host}', en: '{host}’s favourite fish place', ar: 'مطعم السمك المفضّل لدى {host}', es: 'El pescado favorito de {host}' },
          desc: {
            fr: 'Une adresse personnelle, choisie par votre hôte.',
            en: 'A personal pick, chosen by your host.',
            ar: 'عنوان شخصي يختاره مضيفك.',
            es: 'Una dirección personal, elegida por tu anfitrión.'
          }
        }
      ]
    },

    /* ------------------------------------------------------------------ */
    cafes: {
      icon: 'cup', tint: '#6B4F3A',
      type: 'places',
      title: { fr: 'Cafés', en: 'Cafés', ar: 'المقاهي', es: 'Cafés' },
      intro: {
        fr: 'Café, petit-déjeuner ou pâtisseries : quelques adresses appréciées à Martil et à Tétouan.',
        en: 'Coffee, breakfast or pastries: a few well-liked addresses in Martil and Tétouan.',
        ar: 'قهوة أو فطور أو حلويات: بعض العناوين المحبوبة في مرتيل وتطوان.',
        es: 'Café, desayuno o pasteles: algunas direcciones apreciadas en Martil y Tetuán.'
      },
      items: [
        // source: https://restaurantguru.com/Martil (Rayan: Café & Pâtisserie, 4.8 from 309 votes in 2026-10)
        {
          id: 'rayan',
          icon: 'cup',
          short: { fr: 'Café-pâtisserie très bien noté', en: 'Highly rated café and pastry shop', ar: 'مقهى وحلويات بتقييم عالٍ', es: 'Café-pastelería muy bien valorado' },
          name: { fr: 'Rayan Café & Pâtisserie' },
          area: { fr: 'Martil', ar: 'مرتيل' },
          desc: {
            fr: 'Un café-pâtisserie de Martil parmi les mieux notés en ligne, pour un café et une douceur.',
            en: 'A Martil café and pastry shop among the best rated online, for a coffee and something sweet.',
            ar: 'مقهى ومحل حلويات في مرتيل من بين الأعلى تقييماً على الإنترنت، لقهوة وشيء حلو.',
            es: 'Un café-pastelería de Martil entre los mejor valorados en línea, para un café y algo dulce.'
          },
          maps: 'Rayan Café Pâtisserie, Martil'
        },
        // source: https://restaurantguru.com/cafe-Martil-t6 and https://restaurantguru.com/Martil
        // (Rise & Dine: café, restaurant and bakery, 4.8 on one listing)
        {
          id: 'rise-dine',
          icon: 'bread',
          short: { fr: 'Café, brunch et boulangerie', en: 'Café, brunch and bakery', ar: 'مقهى وفطور متأخر ومخبزة', es: 'Café, brunch y panadería' },
          name: { fr: 'Rise & Dine' },
          area: { fr: 'Martil', ar: 'مرتيل' },
          desc: {
            fr: 'Café, restaurant et boulangerie à Martil, pour un petit-déjeuner ou un brunch.',
            en: 'A café, restaurant and bakery in Martil, for breakfast or brunch.',
            ar: 'مقهى ومطعم ومخبزة في مرتيل، للفطور أو الفطور المتأخر.',
            es: 'Café, restaurante y panadería en Martil, para desayunar o hacer brunch.'
          },
          maps: 'Rise & Dine, Martil'
        },
        // source: https://restaurantguru.com/Martil (Perfect Cup, 4.6 from 136 votes in 2026-10)
        {
          id: 'perfect-cup',
          icon: 'cup',
          short: { fr: 'Café bien noté par ses clients', en: 'A café its customers rate well', ar: 'مقهى يقيّمه زبائنه جيداً', es: 'Café bien valorado por sus clientes' },
          name: { fr: 'Perfect Cup' },
          area: { fr: 'Martil', ar: 'مرتيل' },
          desc: {
            fr: 'Un café de Martil bien noté par ses clients en ligne, pour une pause café.',
            en: 'A Martil café rated well by its customers online, for a coffee break.',
            ar: 'مقهى في مرتيل يحظى بتقييم جيّد من زبائنه على الإنترنت، لاستراحة قهوة.',
            es: 'Un café de Martil bien valorado por sus clientes en línea, para una pausa.'
          },
          maps: 'Perfect Cup, Martil'
        },
        // source: https://www.tripadvisor.com/Restaurant_Review-g669650-d17320118-Reviews-Cafe_GOYA-Martil_Tanger_Tetouan_Al_Hoceima.html
        // source: https://restaurantguru.com/cafe-Martil-t6 (Goya: the most votes of any Martil café, 1,700+,
        //  ratings 2.7 to 4.1 depending on the listing)
        {
          id: 'goya',
          icon: 'cup',
          short: { fr: 'Le café le plus commenté de Martil', en: 'Martil’s most-reviewed café', ar: 'المقهى الأكثر تقييماً في مرتيل', es: 'El café con más reseñas de Martil' },
          name: { fr: 'Café Goya' },
          area: { fr: 'Martil', ar: 'مرتيل' },
          desc: {
            fr: 'Une adresse très fréquentée de Martil, le café qui compte le plus d’avis en ligne. Les notes sont partagées.',
            en: 'A very busy Martil address, the café with the most online reviews in town. Ratings are mixed.',
            ar: 'عنوان مزدحم جداً في مرتيل، وهو المقهى صاحب أكبر عدد من التقييمات على الإنترنت. الآراء متباينة.',
            es: 'Un local muy concurrido de Martil, el café con más reseñas en línea. Las opiniones son variadas.'
          },
          maps: 'Café Goya, Martil'
        },
        // source: https://www.tripadvisor.com/Restaurant_Review-g295397-d14923456-Reviews-Patisserie_Jenin-Tetouan_Tanger_Tetouan_Al_Hoceima.html
        // ("New and big place in Tetouan, looks a bit fancy, but the prices are very good. Huge choice of
        //  different kind of breakfasts, cakes, full meal for lunch.")
        {
          id: 'jenin',
          icon: 'mint',
          short: { fr: 'Gâteaux et petits-déjeuners, prix doux', en: 'Cakes and breakfasts, fair prices', ar: 'حلويات وفطور بأسعار معقولة', es: 'Pasteles y desayunos a buen precio' },
          name: { fr: 'Pâtisserie Jenin' },
          area: { fr: 'Tétouan', en: 'Tétouan', ar: 'تطوان', es: 'Tetuán' },
          desc: {
            fr: 'Un grand café au cadre soigné : grand choix de petits-déjeuners, de gâteaux et de plats, à prix raisonnables.',
            en: 'A big café with a smart setting: a wide choice of breakfasts, cakes and meals, at reasonable prices.',
            ar: 'مقهى كبير بديكور أنيق: تشكيلة واسعة من وجبات الفطور والحلويات والأطباق بأسعار معقولة.',
            es: 'Un café grande, de ambiente cuidado: mucha variedad de desayunos, pasteles y platos, a precios razonables.'
          },
          tip: {
            fr: 'Une bonne pause pendant une journée à Tétouan.',
            en: 'A good break during a day in Tétouan.',
            ar: 'استراحة لطيفة خلال يوم في تطوان.',
            es: 'Una buena pausa durante un día en Tetuán.'
          },
          budget: 1,
          maps: 'Patisserie Jenin, Tétouan'
        },
        // source: none needed: a placeholder for the host's own pick (shows "Bientôt")
        {
          id: 'host-cafe',
          icon: 'cup',
          short: { fr: 'Café du quartier, tout près', en: 'Local café, close by', ar: 'مقهى الحيّ، على مقربة منك', es: 'Café de barrio, muy cerca' },
          kind: 'placeholder',
          name: { fr: 'Le café de {host} à Martil', en: '{host}’s café in Martil', ar: 'مقهى {host} في مرتيل', es: 'El café de {host} en Martil' },
          desc: {
            fr: 'Le café où votre hôte prend le sien, près de chez vous.',
            en: 'The café where your host has their own coffee, near your place.',
            ar: 'المقهى الذي يرتاده مضيفك، قرب مسكنك.',
            es: 'El café donde tu anfitrión toma el suyo, cerca de tu alojamiento.'
          }
        }
      ]
    },

    /* ------------------------------------------------------------------ */
    family: {
      icon: 'family', tint: '#4E6B4A',
      type: 'places',
      title: { fr: 'Famille', en: 'Family', ar: 'العائلة', es: 'En familia' },
      intro: {
        fr: 'Plage, promenades et aires de jeux : des idées pour les enfants.',
        en: 'Beach, promenades and playgrounds: ideas for the children.',
        ar: 'شاطئ ونزهات وفضاءات ألعاب: أفكار للأطفال.',
        es: 'Playa, paseos y parques infantiles: ideas para los niños.'
      },
      items: [
        // source: https://travel.hotelscombined.ca/Place/Martil.htm (camel and horse rides along the sand at sunset)
        {
          id: 'beach-rides',
          icon: 'sun',
          short: { fr: 'Chameau ou cheval sur la plage', en: 'Camel or horse rides on the beach', ar: 'ركوب الجمل أو الحصان على الشاطئ', es: 'Camello o caballo en la playa' },
          name: { fr: 'Balades à chameau ou à cheval', en: 'Camel and horse rides', ar: 'جولات على الجمل أو الحصان', es: 'Paseos en camello o a caballo' },
          area: { fr: 'Plage de Martil', en: 'Martil Beach', ar: 'شاطئ مرتيل', es: 'Playa de Martil' },
          desc: {
            fr: 'Sur la plage de Martil, des balades à dos de chameau ou à cheval sont proposées le long du sable, surtout en fin de journée.',
            en: 'On Martil beach, camel and horse rides are offered along the sand, especially late in the day.',
            ar: 'على شاطئ مرتيل تُعرض جولات على ظهر الجمل أو الحصان على طول الرمل، خاصة في آخر النهار.',
            es: 'En la playa de Martil se ofrecen paseos en camello o a caballo por la arena, sobre todo al final del día.'
          },
          tip: {
            fr: 'Convenez du prix et de la durée avant de monter.',
            en: 'Agree the price and length of the ride before you get on.',
            ar: 'اتفق على الثمن والمدة قبل الركوب.',
            es: 'Acuerda el precio y la duración antes de subir.'
          },
          maps: 'Plage de Martil, Martil'
        },
        // source: https://travelynnfamily.com/tetouan-with-kids/
        // (small electric cars for young children, a couple of playgrounds, a basketball/football court)
        // source: https://ledesk.ma/encontinu/plus-de-1-mmdh-pour-lamenagement-et-lelargissement-des-rives-de-loued-martil/
        // (riverbank works 2020-2028; no report of completion found in 2026-10)
        {
          id: 'oued-family',
          icon: 'wheel',
          short: { fr: 'Petites voitures et aires de jeux', en: 'Toy cars and playgrounds', ar: 'سيارات صغيرة وفضاءات ألعاب', es: 'Cochecitos y parques infantiles' },
          name: { fr: 'Corniche de l’oued Martil', en: 'Oued Martil riverside', ar: 'كورنيش وادي مرتيل', es: 'Paseo del río Martil' },
          area: { fr: 'Martil', ar: 'مرتيل' },
          desc: {
            fr: 'La promenade au bord de la rivière : petites voitures électriques pour les plus jeunes, aires de jeux et terrain de sport.',
            en: 'The riverside promenade: small electric cars for young children, playgrounds and a sports court.',
            ar: 'الممشى على ضفة الوادي: سيارات كهربائية صغيرة للصغار وفضاءات ألعاب وملعب رياضي.',
            es: 'El paseo junto al río: cochecitos eléctricos para los más pequeños, parques infantiles y una pista deportiva.'
          },
          tip: {
            fr: 'Des travaux sur les berges sont prévus jusqu’en 2028 : l’aménagement peut changer.',
            en: 'Riverbank works are planned until 2028, so the layout may change.',
            ar: 'أشغال على ضفاف الوادي مبرمجة حتى 2028، لذا قد يتغيّر شكل المكان.',
            es: 'Hay obras previstas en las orillas hasta 2028: la distribución puede cambiar.'
          },
          maps: 'Corniche Oued Martil, Martil'
        },
        // source: https://travel.hotelscombined.ca/Place/Martil.htm (corniche cafés and the evening walk)
        // source: https://travelynnfamily.com/tetouan-with-kids/ (evening promenade with the children)
        {
          id: 'corniche-family',
          icon: 'icecream',
          short: { fr: 'Glaces et balade du soir', en: 'Ice cream and an evening stroll', ar: 'مثلّجات ونزهة المساء', es: 'Helados y paseo al atardecer' },
          name: { fr: 'Le soir sur la corniche', en: 'Evenings on the corniche', ar: 'المساء على الكورنيش', es: 'La tarde en el paseo' },
          area: { fr: 'Martil', ar: 'مرتيل' },
          desc: {
            fr: 'Quand la chaleur tombe, les familles se retrouvent sur la corniche, entre cafés, glaces et marchands.',
            en: 'When the heat drops, families gather on the corniche, among cafés, ice cream and street sellers.',
            ar: 'حين تخفّ الحرارة تلتقي العائلات على الكورنيش، بين المقاهي والمثلّجات والباعة.',
            es: 'Cuando baja el calor, las familias se reúnen en el paseo, entre cafés, helados y vendedores.'
          },
          price: 0,
          maps: 'Corniche de Martil, Martil'
        },
        // source: https://travelynnfamily.com/tetouan-with-kids/
        // (swings, climbing frame, trampolines for a small fee; café next door; underground parking; busy at sunset)
        // source: https://www.kupi.com/en-ae/explore/morocco/tetouan/feddan-square
        {
          id: 'feddan',
          icon: 'palm',
          short: { fr: 'Aire de jeux au cœur de Tétouan', en: 'A playground in central Tétouan', ar: 'فضاء ألعاب في قلب تطوان', es: 'Parque infantil en el centro de Tetuán' },
          name: { fr: 'Place Feddan', en: 'Feddan Square', ar: 'ساحة الفدان', es: 'Plaza Feddan' },
          area: { fr: 'Tétouan', en: 'Tétouan', ar: 'تطوان', es: 'Tetuán' },
          desc: {
            fr: 'Une grande place entre la médina et l’Ensanche, avec balançoires, structure à grimper et trampolines (petit tarif), et un café à côté.',
            en: 'A large square between the medina and the Ensanche, with swings, a climbing frame and trampolines (small fee), and a café next door.',
            ar: 'ساحة كبيرة بين المدينة العتيقة والإنسانشي، فيها أراجيح وهيكل للتسلّق وترامبولين (بثمن رمزي)، ومقهى بجانبها.',
            es: 'Una gran plaza entre la medina y el Ensanche, con columpios, estructura para trepar y camas elásticas (precio módico), y un café al lado.'
          },
          tip: {
            fr: 'Parking souterrain sur place ; très animé au coucher du soleil.',
            en: 'Underground car park on site; very lively at sunset.',
            ar: 'يوجد موقف سيارات تحت أرضي في المكان، والساحة تعجّ بالحياة عند الغروب.',
            es: 'Aparcamiento subterráneo en el lugar; muy animado al atardecer.'
          },
          maps: 'Place Feddan, Tétouan'
        },
        // source: https://ph.trip.com/hotels/tangier-hotel-detail-3987810/mnar-park
        // (water park in Tangier; mixed reviews about water quality, no food sold). No water park was
        // found in Martil or Tétouan; Tangier is about 1 h+ by road.
        // source: https://www.fr.lastminute.com/hotel/maroc/tanger/mnar-park_hid-860796
        // (re-checked 2026-10: a hotel complex with a paid water park, games room and rides; reviews mixed,
        //  several on cleanliness; "nothing sold in the park, bring snacks for the children")
        {
          id: 'mnar-park',
          icon: 'pool',
          short: { fr: 'Parc aquatique, à Tanger', en: 'A water park, in Tangier', ar: 'منتزه مائي في طنجة', es: 'Parque acuático, en Tánger' },
          name: { fr: 'Mnar Park', ar: 'منار بارك' },
          area: { fr: 'Tanger', en: 'Tangier', ar: 'طنجة', es: 'Tánger' },
          desc: {
            fr: 'Un complexe de Tanger avec un parc aquatique payant, à plus d’une heure de route : le plus proche que nous ayons trouvé.',
            en: 'A Tangier resort with a paid water park, over an hour’s drive away: the nearest one we found.',
            ar: 'مُجمّع في طنجة به منتزه مائي بالأداء، على بُعد أكثر من ساعة بالسيارة: أقرب منتزه مائي وجدناه.',
            es: 'Un complejo de Tánger con parque acuático de pago, a más de una hora en coche: el más cercano que hemos encontrado.'
          },
          tip: {
            fr: 'Avis partagés : vérifiez les horaires et prévoyez de quoi manger.',
            en: 'Reviews are mixed: check opening hours and bring your own food.',
            ar: 'الآراء متباينة: تحقّق من الأوقات واحمل طعامك معك.',
            es: 'Opiniones variadas: consulta el horario y lleva tu comida.'
          },
          maps: 'Mnar Park, Tanger'
        }
      ]
    },

    /* ------------------------------------------------------------------ */
    transport: {
      icon: 'car', tint: '#A1423A',
      type: 'info',
      title: { fr: 'Transport', en: 'Getting around', ar: 'التنقّل', es: 'Transporte' },
      sub: { fr: 'Grand taxi · Bus · Aéroports', en: 'Grand taxi · Bus · Airports', ar: 'طاكسي كبير · حافلة · مطارات', es: 'Grand taxi · Autobús · Aeropuertos' },
      intro: {
        fr: 'Grands taxis, bus et deux aéroports : les repères pour circuler entre Martil, Tétouan et la côte.',
        en: 'Grand taxis, buses and two airports: the basics for getting around Martil, Tétouan and the coast.',
        ar: 'طاكسيات كبيرة وحافلات ومطاران: ما تحتاجه للتنقّل بين مرتيل وتطوان والساحل.',
        es: 'Grand taxis, autobuses y dos aeropuertos: lo básico para moverse entre Martil, Tetuán y la costa.'
      },
      blocks: [
        // source: https://travelynnfamily.com/tetouan-with-kids/ (shared grand taxis Martil–Tétouan, about 10 min)
        // source: https://www.gobytaxi.com/drivers/79071 (grand-taxi station for Martil, Avenue Hassan II, Tétouan)
        // source: https://fr.le360.ma/societe/tetouan-protestations-contre-les-hausses-tarifaires-abusives-des-grands-taxis_TWP4K22EFVCWPGBMQWRZZOLGNU/
        // (rush-hour fare rises reported on Tétouan–Martil)
        // source: https://travel.hotelscombined.ca/Place/Martil.htm (mid-July to mid-September very crowded)
        {
          title: { fr: 'Grands taxis', en: 'Grand taxis', ar: 'الطاكسيات الكبيرة', es: 'Grand taxis' },
          icon: 'car',
          key: { fr: 'Prix à convenir avant de partir', en: 'Agree the price before you go', ar: 'اتفق على الثمن قبل الانطلاق', es: 'Acuerda el precio antes de salir' },
          list: [
            { fr: 'Des grands taxis partagés relient Martil et Tétouan en 10 à 20 minutes environ. On paie sa place, ou le taxi entier pour partir seul.', en: 'Shared grand taxis link Martil and Tétouan in about 10 to 20 minutes. You pay for your seat, or for the whole taxi to travel alone.', ar: 'تربط الطاكسيات الكبيرة المشتركة بين مرتيل وتطوان في نحو 10 إلى 20 دقيقة. تدفع ثمن مقعدك، أو ثمن الطاكسي كله إن أردت الانفراد به.', es: 'Los grand taxis compartidos unen Martil y Tetuán en unos 10 a 20 minutos. Se paga por plaza, o el taxi entero para ir solo.' },
            { fr: 'Fixez le prix avant de monter : la presse locale a signalé des hausses de tarif aux heures de pointe.', en: 'Agree the fare before you get in: local press has reported fare rises at rush hour.', ar: 'اتفق على الثمن قبل الركوب، فقد أشارت الصحافة المحلية إلى زيادات في التعريفة في أوقات الذروة.', es: 'Acuerda la tarifa antes de subir: la prensa local ha informado de subidas en horas punta.' },
            { fr: 'En juillet et août, la côte est très fréquentée : prévoyez plus de temps pour chaque trajet.', en: 'In July and August the coast is very busy: allow extra time for every trip.', ar: 'في يوليوز وغشت يشهد الساحل إقبالاً كبيراً، فخصّص وقتاً أطول لكل تنقّل.', es: 'En julio y agosto la costa está muy concurrida: calcula más tiempo para cada trayecto.' }
          ]
        },
        // source: https://www.checkmybus.com/martil/tetouan (Martil to Tétouan bus station, about 30 min, a few a day)
        // source: https://travel.hotelscombined.ca/Place/Martil.htm (about 30 min by bus)
        // Re-checked 2026-10: the aggregators disagree on frequency (https://www.checkmybus.com/tetouan/martil
        // lists no direct trip, 12go lists several an hour), so no frequency or stop is printed.
        // source: https://www.checkmybus.com/travel/tetouan/chefchaouen and https://12go.asia/en/travel/tetouan/chefchaouen
        // (CTM Tétouan–Chefchaouen about 1 h 15-1 h 30)
        // source: https://www.rome2rio.com/s/Martil/Tangier (CTM Tétouan–Tangier)
        {
          title: { fr: 'Bus', en: 'Buses', ar: 'الحافلات', es: 'Autobuses' },
          icon: 'nav',
          key: { fr: 'Martil → Tétouan ≈ 30 min', en: 'Martil → Tétouan ≈ 30 min', ar: 'مرتيل ← تطوان ≈ 30 دقيقة', es: 'Martil → Tetuán ≈ 30 min' },
          list: [
            { fr: 'Des bus relient aussi Martil à Tétouan, en 30 minutes environ. Demandez sur place où et quand les prendre.', en: 'Buses also link Martil and Tétouan, in about 30 minutes. Ask locally where and when to catch them.', ar: 'تربط حافلات أيضاً بين مرتيل وتطوان في نحو 30 دقيقة. اسأل في عين المكان عن موقفها ومواعيدها.', es: 'También hay autobuses entre Martil y Tetuán, en unos 30 minutos. Pregunta allí dónde y cuándo tomarlos.' },
            { fr: 'Depuis Tétouan, les bus CTM vont notamment à Chefchaouen (≈ 1 h 15 à 1 h 30) et à Tanger.', en: 'From Tétouan, CTM buses go to Chefchaouen (≈ 1 h 15 to 1 h 30) and Tangier, among others.', ar: 'من تطوان تنطلق حافلات CTM نحو شفشاون (≈ ساعة وربع إلى ساعة ونصف) وطنجة وغيرهما.', es: 'Desde Tetuán, los autobuses CTM van a Chefchaouen (≈ 1 h 15 a 1 h 30) y a Tánger, entre otros destinos.' },
            { fr: 'Horaires et tarifs changent : vérifiez-les à la gare ou auprès de la compagnie.', en: 'Times and fares change: check them at the station or with the company.', ar: 'المواعيد والأسعار تتغيّر، فتحقّق منها في المحطة أو لدى الشركة.', es: 'Horarios y tarifas cambian: consúltalos en la estación o con la compañía.' }
          ]
        },
        // source: https://unchartedlens.com/routes/morocco/how-to-get-from-tetouan-city-center-to-tetouan-saniat-rmel-airport/
        // (on the N16 between Tétouan and Martil; grand taxis wait outside; no airport bus)
        // source: https://medias24.com/2026/01/31/reouverture-de-laeroport-tetouan-sania-rmel-1620447/
        // source: https://fr.hespress.com/460645-intemperies-reouverture-de-laeroport-de-tetouan-sania-rmel.html
        // (closed from 29 January 2026 after heavy rain, reopened on 31 January 2026; re-checked 2026-10:
        //  https://telquel.ma/instant-t/2026/01/29/fermeture-temporaire-de-laeroport-de-tetouan-a-cause-des-precipitations_1973056/)
        // Airlines are deliberately not listed: routes change with the seasons.
        {
          title: { fr: 'Aéroport de Tétouan', en: 'Tétouan Airport', ar: 'مطار تطوان', es: 'Aeropuerto de Tetuán' },
          icon: 'plane',
          key: { fr: 'Sania Ramel · ≈ 10–15 min', en: 'Sania Ramel · ≈ 10–15 min', ar: 'سانية الرمل · ≈ 10–15 دقيقة', es: 'Sania Ramel · ≈ 10–15 min' },
          body: {
            fr: 'L’aéroport Sania Ramel est sur la route entre Tétouan et Martil, à environ 10 à 15 minutes en grand taxi.',
            en: 'Sania Ramel airport is on the road between Tétouan and Martil, about 10 to 15 minutes by grand taxi.',
            ar: 'يقع مطار سانية الرمل على الطريق بين تطوان ومرتيل، على بُعد نحو 10 إلى 15 دقيقة بالطاكسي الكبير.',
            es: 'El aeropuerto Sania Ramel está en la carretera entre Tetuán y Martil, a unos 10 a 15 minutos en grand taxi.'
          },
          list: [
            { fr: 'Pas de bus pour l’aéroport : des grands taxis attendent devant le terminal. Fixez le prix avant de partir.', en: 'No airport bus: grand taxis wait outside the terminal. Agree the fare before you leave.', ar: 'لا توجد حافلة للمطار، والطاكسيات الكبيرة تنتظر أمام مبنى المطار. اتفق على الثمن قبل الانطلاق.', es: 'No hay autobús al aeropuerto: los grand taxis esperan frente a la terminal. Acuerda el precio antes de salir.' },
            { fr: 'Les vols changent selon les saisons, et l’aéroport a fermé deux jours après de fortes pluies en janvier 2026 : vérifiez votre vol auprès de la compagnie.', en: 'Flights change with the seasons, and the airport closed for two days after heavy rain in January 2026: check your flight with the airline.', ar: 'تتغيّر الرحلات حسب المواسم، وقد أُغلق المطار يومين بعد أمطار غزيرة في يناير 2026، فتحقّق من رحلتك لدى شركة الطيران.', es: 'Los vuelos cambian según la temporada, y el aeropuerto cerró dos días tras fuertes lluvias en enero de 2026: confirma tu vuelo con la aerolínea.' },
            { fr: 'Transfert privé : {host} peut l’organiser pour vous.', en: 'Private transfer: {host} can arrange it for you.', ar: 'نقل خاص: يمكن لـ{host} تنظيمه لك.', es: 'Traslado privado: {host} puede organizarlo.' }
          ],
          request: { fr: 'un transfert depuis l’aéroport de Tétouan', en: 'a transfer from Tétouan airport', ar: 'نقلاً من مطار تطوان', es: 'un traslado desde el aeropuerto de Tetuán' }
        },
        // source: https://www.shuttledirect.com/nl/transfer/tng/ma-tetouan.html (Tangier airport–Tétouan about 75 km, about 1 h 06)
        {
          title: { fr: 'Aéroport de Tanger', en: 'Tangier Airport', ar: 'مطار طنجة', es: 'Aeropuerto de Tánger' },
          icon: 'plane',
          key: { fr: 'Ibn Battouta · ≈ 1 h de Tétouan', en: 'Ibn Battouta · ≈ 1 h to Tétouan', ar: 'ابن بطوطة · ≈ ساعة من تطوان', es: 'Ibn Battouta · ≈ 1 h de Tetuán' },
          body: {
            fr: 'Plus de vols, mais plus loin : environ 75 km jusqu’à Tétouan, soit un peu plus d’une heure de route. Martil est un peu plus loin.',
            en: 'More flights, but further away: about 75 km to Tétouan, a little over an hour by road. Martil is slightly further.',
            ar: 'رحلات أكثر لكنه أبعد: نحو 75 كيلومتراً حتى تطوان، أي أكثر من ساعة بقليل بالسيارة، ومرتيل أبعد بقليل.',
            es: 'Más vuelos, pero más lejos: unos 75 km hasta Tetuán, algo más de una hora por carretera. Martil está un poco más allá.'
          },
          list: [
            { fr: 'Prévoyez un transfert privé ou un grand taxi, au prix convenu à l’avance.', en: 'Plan a private transfer or a grand taxi, with the price agreed in advance.', ar: 'خطّط لنقل خاص أو لطاكسي كبير بثمن متّفق عليه مسبقاً.', es: 'Prevé un traslado privado o un grand taxi, con el precio acordado de antemano.' },
            { fr: 'Comme à Tétouan, les vols changent selon les saisons : vérifiez auprès de la compagnie.', en: 'As in Tétouan, flights change with the seasons: check with the airline.', ar: 'كما في تطوان، تتغيّر الرحلات حسب المواسم، فتحقّق لدى شركة الطيران.', es: 'Como en Tetuán, los vuelos cambian según la temporada: confírmalo con la aerolínea.' }
          ],
          request: { fr: 'un transfert depuis l’aéroport de Tanger', en: 'a transfer from Tangier airport', ar: 'نقلاً من مطار طنجة', es: 'un traslado desde el aeropuerto de Tánger' }
        },
        // source: https://fr.hespress.com/483501-le-san-francisco-chronicle-salue-al-boraq-premier-et-unique-tgv-dafrique.html
        // (Tanger Ville–Casa Voyageurs about 2 h 10-2 h 17)
        {
          title: { fr: 'Train vers Casablanca', en: 'Train to Casablanca', ar: 'القطار نحو الدار البيضاء', es: 'Tren a Casablanca' },
          icon: 'train',
          key: { fr: 'Al Boraq depuis Tanger ≈ 2 h 10', en: 'Al Boraq from Tangier ≈ 2 h 10', ar: 'البراق من طنجة ≈ ساعتان و10 دقائق', es: 'Al Boraq desde Tánger ≈ 2 h 10' },
          body: {
            fr: 'Pour Rabat ou Casablanca, le TGV Al Boraq part de la gare de Tanger Ville : environ 2 h 10 jusqu’à Casa Voyageurs.',
            en: 'For Rabat or Casablanca, the Al Boraq high-speed train leaves from Tanger Ville station: about 2 h 10 to Casa Voyageurs.',
            ar: 'للذهاب إلى الرباط أو الدار البيضاء، ينطلق قطار البراق فائق السرعة من محطة طنجة المدينة: نحو ساعتين و10 دقائق حتى محطة الدار البيضاء المسافرين.',
            es: 'Para Rabat o Casablanca, el tren de alta velocidad Al Boraq sale de la estación Tanger Ville: unas 2 h 10 hasta Casa Voyageurs.'
          }
        }
      ]
    },

    /* ------------------------------------------------------------------ */
    itineraries: {
      icon: 'map', tint: '#2C5A55',
      type: 'routes',
      title: { fr: 'Itinéraires', en: 'Itineraries', ar: 'مسارات', es: 'Itinerarios' },
      intro: {
        fr: 'Une journée déjà organisée. Le parcours s’ouvre dans Google Maps en un geste.',
        en: 'A day already planned for you. The route opens in Google Maps in one tap.',
        ar: 'يوم منظّم مسبقاً. يُفتح المسار في خرائط Google بلمسة واحدة.',
        es: 'Un día ya organizado. La ruta se abre en Google Maps con un toque.'
      },
      items: [
        // Every stop is an item above, with its source; El Reducto (lunch):
        // source: https://sp.booking.com/hotel/ma/el-reducto.en-gb.html (Tetuani and Spanish cooking in a medina riad)
        {
          id: 'tetouan-day',
          title: { fr: 'Tétouan, puis la corniche', en: 'Tétouan, then the corniche', ar: 'تطوان ثم الكورنيش', es: 'Tetuán y luego el paseo' },
          duration: { fr: 'Journée · taxi et marche', en: 'Full day · taxi and walking', ar: 'يوم كامل · طاكسي ومشي', es: 'Día completo · taxi y a pie' },
          intro: {
            fr: 'La médina de Tétouan le matin, une pause place Feddan l’après-midi, puis retour à Martil pour la corniche au coucher du soleil et un dîner de poisson.',
            en: 'Tétouan’s medina in the morning, a break on Feddan Square in the afternoon, then back to Martil for the corniche at sunset and a fish dinner.',
            ar: 'مدينة تطوان العتيقة صباحاً، واستراحة في ساحة الفدان بعد الظهر، ثم العودة إلى مرتيل للكورنيش عند الغروب وعشاء سمك.',
            es: 'La medina de Tetuán por la mañana, un descanso en la plaza Feddan por la tarde y vuelta a Martil para el paseo al atardecer y una cena de pescado.'
          },
          mode: 'driving', fromHome: true,
          stops: [
            { time: '09:30', title: { fr: 'Médina de Tétouan', en: 'Tétouan Medina', ar: 'مدينة تطوان العتيقة', es: 'Medina de Tetuán' }, text: { fr: 'Entrez par Bab Okla et flânez dans les souks.', en: 'Enter by Bab Okla and wander through the souks.', ar: 'ادخل من باب العقلة وتجوّل في الأسواق.', es: 'Entra por Bab Okla y pasea por los zocos.' }, maps: 'Bab Okla, Tétouan' },
            { time: '11:00', title: { fr: 'Musée ethnographique', en: 'Ethnographic Museum', ar: 'المتحف الإثنوغرافي', es: 'Museo Etnográfico' }, text: { fr: 'La vue depuis la terrasse sur la ville et le Rif.', en: 'The view from the terrace over the city and the Rif.', ar: 'الإطلالة من السطح على المدينة والريف.', es: 'La vista desde la azotea sobre la ciudad y el Rif.' }, maps: 'Musée Ethnographique de Tétouan' },
            { time: '13:00', title: { fr: 'Déjeuner à El Reducto', en: 'Lunch at El Reducto', ar: 'الغداء في إل ريدوكتو', es: 'Almuerzo en El Reducto' }, text: { fr: 'Cuisine tétouanaise dans un riad de la médina.', en: 'Tetuani cooking in a medina riad.', ar: 'مطبخ تطواني في رياض بالمدينة العتيقة.', es: 'Cocina tetuaní en un riad de la medina.' }, maps: 'El Reducto, Tétouan' },
            { time: '15:00', title: { fr: 'Place Moulay El Mehdi', en: 'Moulay El Mehdi Square', ar: 'ساحة مولاي المهدي', es: 'Plaza Moulay El Mehdi' }, text: { fr: 'L’Ensanche espagnol et une glace face à l’église.', en: 'The Spanish Ensanche and an ice cream facing the church.', ar: 'الحيّ الإسباني ومثلّجات قبالة الكنيسة.', es: 'El Ensanche español y un helado frente a la iglesia.' }, maps: 'Place Moulay El Mehdi, Tétouan' },
            { time: '16:00', title: { fr: 'Place Feddan', en: 'Feddan Square', ar: 'ساحة الفدان', es: 'Plaza Feddan' }, text: { fr: 'Des jeux pour les enfants, un café pour les parents.', en: 'Games for the children, a coffee for the parents.', ar: 'ألعاب للأطفال وقهوة للآباء.', es: 'Juegos para los niños, un café para los padres.' }, maps: 'Place Feddan, Tétouan' },
            { time: '18:30', rel: -20, title: { fr: 'Corniche de Martil', en: 'Martil Corniche', ar: 'كورنيش مرتيل', es: 'Paseo marítimo de Martil' }, text: { fr: 'Retour à Martil pour la balade du coucher du soleil.', en: 'Back to Martil for the sunset stroll.', ar: 'العودة إلى مرتيل لنزهة الغروب.', es: 'Vuelta a Martil para el paseo del atardecer.' }, maps: 'Corniche de Martil, Martil' },
            { time: '19:30', rel: 45, title: { fr: 'Dîner de poisson', en: 'Fish dinner', ar: 'عشاء سمك', es: 'Cena de pescado' }, text: { fr: 'Cabo Corner, ou une autre adresse de la rubrique Restaurants.', en: 'Cabo Corner, or another address from the Restaurants page.', ar: '«كابو كورنر» أو عنوان آخر من صفحة المطاعم.', es: 'Cabo Corner, u otra dirección de la sección Restaurantes.' }, maps: 'Restaurant Cabo Corner, Martil' }
          ]
        }
      ]
    }
  }
};
