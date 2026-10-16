/*
 * Darna Collection — what is true everywhere in Morocco: emergency numbers,
 * pharmacies, money, customs, a few words of Darija. Shown in every place's
 * "Assistance" page, whatever the city.
 */
window.CASA = window.CASA || {};

CASA.country = {
  sections: {
    assistance: {
      icon: 'buoy', tint: '#3D5560',
      type: 'help',
      title: { fr: 'Assistance', en: 'Help', ar: 'مساعدة', es: 'Asistencia' },
      sub: { fr: 'Urgences · Santé · Infos', en: 'Emergency · Health · Tips', ar: 'طوارئ · صحة · معلومات', es: 'Urgencias · Salud · Consejos' },
      intro: {
        fr: 'Les numéros et réflexes utiles. Pour tout ce qui concerne votre logement, écrivez à {host}.',
        en: 'Useful numbers and tips. For anything about your place, message {host}.',
        ar: 'أرقام ونصائح مفيدة. لكل ما يتعلّق بمسكنك، راسل {host}.',
        es: 'Números y consejos útiles. Para todo lo relacionado con tu alojamiento, escribe a {host}.'
      },
      blocks: [
        {
          title: { fr: '{host}, votre hôte', en: '{host}, your host', ar: '{host}، المضيف', es: '{host}, tu anfitrión' },
          icon: 'chat',
          key: { fr: 'WhatsApp, à tout moment', en: 'WhatsApp, any time', ar: 'واتساب، في أي وقت', es: 'WhatsApp, cuando quieras' },
          body: {
            fr: 'Une question sur votre logement, un problème, une envie : écrivez-moi sur WhatsApp à tout moment.',
            en: 'A question about your place, a problem, a wish: message me on WhatsApp at any time.',
            ar: 'سؤال عن مسكنك، مشكلة، أو رغبة: راسلني على واتساب في أي وقت.',
            es: 'Una pregunta sobre tu alojamiento, un problema, un deseo: escríbeme por WhatsApp cuando quieras.'
          },
          action: 'whatsapp'
        },
        {
          title: { fr: 'Urgences', en: 'Emergency', ar: 'الطوارئ', es: 'Urgencias' },
          icon: 'phone',
          key: { fr: '19 · 15 · 177', en: '19 · 15 · 177', ar: '19 · 15 · 177', es: '19 · 15 · 177' },
          phones: [
            { number: '19', label: { fr: 'Police', en: 'Police', ar: 'الشرطة', es: 'Policía' } },
            { number: '15', label: { fr: 'Pompiers · Ambulance', en: 'Fire · Ambulance', ar: 'الوقاية المدنية · الإسعاف', es: 'Bomberos · Ambulancia' } },
            { number: '177', label: { fr: 'Gendarmerie royale', en: 'Royal Gendarmerie', ar: 'الدرك الملكي', es: 'Gendarmería Real' } }
          ]
        },
        {
          title: { fr: 'Pharmacies et santé', en: 'Pharmacies and health', ar: 'الصيدليات والصحة', es: 'Farmacias y salud' },
          icon: 'cross',
          key: { fr: 'Croix verte = ouverte', en: 'Green cross = open', ar: 'الصليب الأخضر = مفتوحة', es: 'Cruz verde = abierta' },
          list: [
            { fr: 'Une croix verte allumée signale une pharmacie ouverte.', en: 'A lit green cross means the pharmacy is open.', ar: 'الصليب الأخضر المضاء يعني أن الصيدلية مفتوحة.', es: 'Una cruz verde encendida indica una farmacia abierta.' },
            { fr: 'La nuit et le dimanche, chaque pharmacie affiche sur sa porte la pharmacie de garde la plus proche.', en: 'At night and on Sundays, every pharmacy posts the nearest on-duty pharmacy on its door.', ar: 'ليلاً ويوم الأحد، تعلّق كل صيدلية على بابها عنوان أقرب صيدلية حراسة.', es: 'Por la noche y los domingos, cada farmacia indica en su puerta la farmacia de guardia más cercana.' },
            { fr: 'En cas de problème médical, appelez le 15 ou écrivez à {host}, qui vous indiquera la clinique la plus proche.', en: 'For a medical problem, call 15 or message {host}, who will point you to the nearest clinic.', ar: 'في حال مشكلة صحية، اتصل بالرقم 15 أو راسل {host} ليدلّك على أقرب مصحّة.', es: 'Ante un problema médico, llama al 15 o escribe a {host}, que te indicará la clínica más cercana.' }
          ]
        },
        {
          title: { fr: 'Argent et pourboires', en: 'Money and tipping', ar: 'المال والبقشيش', es: 'Dinero y propinas' },
          icon: 'coins',
          key: { fr: 'Espèces · pourboire ≈ 10 %', en: 'Cash · tip ≈ 10%', ar: 'نقداً · بقشيش ≈ 10٪', es: 'Efectivo · propina ≈ 10 %' },
          list: [
            { fr: 'La monnaie est le dirham (MAD). Gardez des espèces pour les taxis, les marchés et les petits cafés.', en: 'The currency is the dirham (MAD). Keep cash for taxis, markets and small cafés.', ar: 'العملة هي الدرهم. احتفظ بالنقود للطاكسي والأسواق والمقاهي الصغيرة.', es: 'La moneda es el dírham (MAD). Lleva efectivo para taxis, mercados y cafés pequeños.' },
            { fr: 'Les distributeurs sont nombreux ; la carte est acceptée dans les malls, les hôtels et la plupart des restaurants.', en: 'Cash machines are everywhere; cards work in malls, hotels and most restaurants.', ar: 'الشبابيك الأوتوماتيكية منتشرة، والبطاقات مقبولة في المراكز التجارية والفنادق ومعظم المطاعم.', es: 'Hay cajeros por todas partes; la tarjeta se acepta en centros comerciales, hoteles y la mayoría de restaurantes.' },
            { fr: 'Pourboire : environ 10 % au restaurant, quelques dirhams pour les petits services.', en: 'Tipping: about 10% in restaurants, a few dirhams for small services.', ar: 'البقشيش: نحو 10٪ في المطعم، وبضعة دراهم للخدمات الصغيرة.', es: 'Propina: alrededor del 10 % en restaurantes y unos dírhams por pequeños servicios.' }
          ]
        },
        {
          title: { fr: 'Bon à savoir', en: 'Good to know', ar: 'معلومات مفيدة', es: 'Conviene saber' },
          icon: 'bulb',
          key: { fr: 'Tenue couvrante : médina, mosquée', en: 'Cover up: medina, mosque', ar: 'لباس محتشم: المدينة والمسجد', es: 'Ropa discreta: medina, mezquita' },
          list: [
            { fr: 'Tenue couvrante pour la médina et la mosquée.', en: 'Wear covering clothes in the medina and at the mosque.', ar: 'البس ملابس محتشمة في المدينة القديمة والمسجد.', es: 'Ropa que cubra para la medina y la mezquita.' },
            { fr: 'Demandez avant de photographier quelqu’un.', en: 'Ask before taking someone’s photo.', ar: 'استأذن قبل تصوير أي شخص.', es: 'Pregunta antes de fotografiar a alguien.' },
            { fr: 'Le vendredi midi, beaucoup de commerces ferment le temps de la prière.', en: 'On Friday at midday, many shops close for prayer.', ar: 'يوم الجمعة ظهراً، تغلق محلات كثيرة وقت الصلاة.', es: 'El viernes a mediodía, muchas tiendas cierran durante la oración.' },
            { fr: 'Pendant le Ramadan, les horaires des restaurants et des commerces changent.', en: 'During Ramadan, restaurant and shop hours change.', ar: 'في رمضان، تتغيّر أوقات المطاعم والمحلات.', es: 'Durante el Ramadán cambian los horarios de restaurantes y tiendas.' },
            { fr: 'Préférez l’eau en bouteille.', en: 'Prefer bottled water.', ar: 'يُفضَّل شرب المياه المعبّأة.', es: 'Mejor agua embotellada.' },
            { fr: 'Prises 220 V de type européen (C et E).', en: 'Sockets are 220 V, European type (C and E).', ar: 'المقابس 220 فولت من النوع الأوروبي (C وE).', es: 'Enchufes de 220 V, tipo europeo (C y E).' }
          ]
        },
        {
          title: { fr: 'Quelques mots de darija', en: 'A few words of Darija', ar: 'كلمات من الدارجة', es: 'Algunas palabras de dariya' },
          icon: 'star',
          key: { fr: 'Salam · Choukran', en: 'Salam · Choukran', ar: 'سلام · شكراً', es: 'Salam · Choukran' },
          body: {
            fr: 'L’arabe marocain. Un mot en darija fait toujours sourire.',
            en: 'Moroccan Arabic. A word of Darija always brings a smile.',
            ar: 'العامية المغربية. كلمة بالدارجة ترسم دائماً ابتسامة.',
            es: 'El árabe marroquí. Una palabra en dariya siempre saca una sonrisa.'
          },
          phrases: [
            { latin: 'Salam', ar: 'سلام', meaning: { fr: 'Bonjour', en: 'Hello', ar: 'مرحباً', es: 'Hola' } },
            { latin: 'Choukran', ar: 'شكراً', meaning: { fr: 'Merci', en: 'Thank you', ar: 'شكراً', es: 'Gracias' } },
            { latin: 'La, choukran', ar: 'لا، شكراً', meaning: { fr: 'Non merci', en: 'No, thank you', ar: 'لا، شكراً', es: 'No, gracias' } },
            { latin: 'Bchhal ?', ar: 'بشحال؟', meaning: { fr: 'Combien ?', en: 'How much?', ar: 'كم الثمن؟', es: '¿Cuánto?' } },
            { latin: 'Mzyan', ar: 'مزيان', meaning: { fr: 'C’est bien, c’est bon', en: 'Good, nice', ar: 'جيّد', es: 'Bien, bueno' } },
            { latin: 'Safi', ar: 'صافي', meaning: { fr: 'D’accord, ça suffit', en: 'OK, that’s enough', ar: 'حسناً، يكفي', es: 'Vale, es suficiente' } },
            { latin: 'Smeh liya', ar: 'سمح ليا', meaning: { fr: 'Pardon, excusez-moi', en: 'Sorry, excuse me', ar: 'عذراً', es: 'Perdón, disculpe' } },
            { latin: 'Bslama', ar: 'بسلامة', meaning: { fr: 'Au revoir', en: 'Goodbye', ar: 'مع السلامة', es: 'Adiós' } }
          ]
        }
      ]
    }
  }
};
