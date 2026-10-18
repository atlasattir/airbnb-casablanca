# Darna Collection

Le guide digital des logements Darna Collection : Casablanca (Darna Bourgogne, Darna B-Suites, Darna Pestana, Darna Dar Bouazza), Marrakech (Darna Marrakech) et Martil (Darna Martil Bay). Les voyageurs l’ouvrent sur leur téléphone (lien Airbnb ou QR code), sans application à installer.

- **Accueil Darna Collection** : la marque sur le film, « Choisissez votre lieu de séjour » et un bouton par ville. Chaque ville ouvre la liste de ses logements (nom, quartier, points forts). Plus bas, tous les logements par ville.
- **Trouver mon logement** : sous les villes, un bouton utilise la position du téléphone (avec l’accord du voyageur) pour mettre en avant le logement le plus proche. La position reste sur le téléphone et ne choisit jamais à la place du voyageur.
- **Un guide par logement**, avec son propre lien court (par exemple `…/pestana/`) : c’est ce lien qui part dans les messages Airbnb et sur la carte QR. Le voyageur arrive directement sur le bon guide ; l’accueil sert de secours. Un bouton « Reprendre » ramène au dernier logement ouvert.
- Dans chaque guide : **Votre appartement / Votre studio** (Wi-Fi, Arrivée & départ, Mode d’emploi, Autour de vous, Services, Assistance) et le guide de la ville, avec ses couleurs.
- Film en fond, 3 boutons permanents (Localisation, WhatsApp, Mes favoris), fiches détaillées qui se ferment d’un geste, itinéraires calés sur le coucher du soleil du jour.
- 4 langues (français, anglais, arabe de droite à gauche, espagnol), choisies selon le téléphone ; modes clair et sombre.
- Fonctionne hors connexion une fois ouvert ; carte QR + Wi-Fi à imprimer pour chaque logement (`card.html`) et messages Airbnb prêts à copier (`docs/messages.md`).
- Aucun outil à installer : du HTML, du CSS et du JavaScript simples.

Deux présentations de l’accueil sont prêtes pour le client : la version par défaut, et la version qui reprend son croquis (étiquettes blanches) en ajoutant `?look=a` à l’adresse.

## Structure

```
index.html                  la page (accueil et guide de chaque logement)
<logement>/                 le lien court de chaque logement (bourgogne/, pestana/…) :
                            il ouvre le guide du logement, avec son aperçu de lien et son icône d’écran d’accueil
card.html                   la carte QR + Wi-Fi à imprimer, pour chaque logement
sw.js                       le mode hors connexion
docs/messages.md            les messages Airbnb, dans les 4 langues, et le lien de chaque logement
assets/css/style.css        le design
assets/js/app.js            le fonctionnement
assets/js/icons.js          les icônes
assets/video/               le film de fond (vertical et horizontal)
assets/vendor/qrcode.js     générateur de QR code (licence MIT, Kazuhiko Arase)
assets/img/                 icônes, image d’aperçu du lien (share.jpg : l’accueil sur une image du film à Chefchaouen, CC0, sans crédit à afficher)
assets/img/photos/          les photos des adresses (téléchargées par tools/fetch-photos.py)
content/brand.js            la marque, les villes, la liste des logements et ce qu’ils ont en commun
content/morocco.js          ce qui vaut partout au Maroc : urgences, pharmacies, argent, darija
content/cities/<ville>.js   le guide de chaque ville (casablanca.js, marrakech.js, martil.js)
content/stays/<logement>.js tout ce qui concerne un logement (arrivée, Wi-Fi, mode d’emploi, autour de vous)
content/photos.js           la liste des photos, avec auteur et licence (générée : ne pas modifier à la main)
content/ui.js               les textes de l’interface dans les 4 langues
tools/photos.json           la photo voulue pour chaque adresse (voir « Les photos »)
tools/fetch-photos.py       télécharge ces photos depuis Wikimedia Commons
```

Le contenu se modifie uniquement dans `content/`. Chaque texte existe en `fr`, `en`, `ar` et `es`. Ce qu’un logement ne précise pas (mot d’accueil, étapes d’arrivée et de départ, règles, services) vient de `content/brand.js`.

Adresse d’un logement : `…/pestana/` (lien court) ou `…/?stay=pestana`. Les rubriques gardent leurs liens : `…/?stay=pestana#wifi`. Les anciens liens (`…/ocean-21/`, `…/bourgogne-133/`…) mènent au bon logement.

## Écrire le contenu

- Chaque adresse a un `short` : **5 mots au maximum**, affiché sous le nom sur la carte. Le reste (`desc`, `tip`) n’apparaît que dans la fiche détail.
- Chaque adresse a une `icon` (son illustration) : choisissez un nom parmi ceux de `assets/js/icons.js` (`minaret`, `lighthouse`, `fish`, `palm`, `sunset`…).
- Chaque rubrique a une couleur `tint` (en haut de chaque rubrique dans `content/cities/<ville>.js`).
- **Par quartier** : en haut de chaque fichier de ville, `areas` liste les adresses accessibles à pied depuis ce quartier (badge « À pied »). Une adresse avec `areas: ['bourgogne']` n’apparaît qu’aux logements de ce quartier (par exemple la balade « Depuis votre porte »).
- **Photos** : voir « Les photos » ci-dessous. Une adresse sans photo garde son illustration.
- Étapes d’itinéraire : `rel: -20` veut dire « 20 minutes avant le coucher du soleil du jour » ; l’heure affichée s’adapte toute l’année.

## Les photos

Chaque adresse des guides peut avoir une photo **de cette adresse précise** (la mosquée Hassan II, la plage de Martil, le souk Haddadine…), prise sur [Wikimedia Commons](https://commons.wikimedia.org) sous licence libre. Elle s’affiche sur la carte de l’adresse, en grand dans sa fiche (avec l’auteur et la licence en bas de la photo), et sur la page « Crédits photos » (lien en bas du guide). Une rubrique peut avoir une photo de couverture (sa tuile et son en-tête), une ville la sienne (son bouton sur l’accueil). Les pages propres au logement (Wi-Fi, arrivée et départ, mode d’emploi, services, aide) prennent une photo du groupe partagé `morocco` (une porte sculptée, un patio, des lanternes, le thé à la menthe, une pharmacie) ; chaque logement montre sur sa carte une photo de son quartier (`photo` dans `content/brand.js`).

1. `tools/photos.json` liste, par ville et par adresse (son `id`) :
   - `files` : les fichiers Commons voulus, le meilleur d’abord (`"File:Hassan_II_Mosque_Plaza.jpg"`) ;
   - `category` ou `search` : où chercher si aucun fichier ne convient (la meilleure photo libre est alors prise, marquée `[auto]` sur la planche de contrôle) ;
   - `pos` (facultatif) : le cadrage, par exemple `"50% 30%"` pour garder le haut ;
   - `crop` (facultatif) : la partie de la photo à garder, `[gauche, haut, droite, bas]` de 0 à 1 ; `[0, 0, 1, 0.88]` coupe le bas (une date imprimée par l’appareil) ;
   - `illustr: true` quand la photo montre le genre de chose et non l’adresse elle-même (un plat pour un restaurant) : elle est alors marquée « Illustration » sur la carte et dans la fiche.
   - `_city` : l’adresse dont la photo illustre la ville sur l’accueil ; `_covers` : la photo de chaque rubrique (`"visit": "hassan2"`).
   - le groupe `morocco` : des photos du genre de chose, communes aux trois villes. Une adresse d’un guide peut en prendre une, ou celle d’une autre adresse de sa ville, avec `photo: 'pastries'` dans le fichier de la ville (un hammam, des pâtisseries, un itinéraire qui prend la photo de sa première étape).
   **Choisir une photo** : *Actions* → *Photos* → *Run workflow* avec `candidates` = `missing` (toutes les adresses sans photo) ou des clés (`casablanca/aindiab morocco/door`). La branche `photos-candidates` reçoit des planches numérotées : jusqu’à six photos libres par adresse, avec auteur et licence (`candidates.json` donne les noms des fichiers). Mettez le nom choisi dans `files`, puis lancez *Photos* sans `candidates`.
2. **Télécharger les photos**, au choix :
   - **depuis GitHub, sans rien installer** : onglet *Actions* → *Photos* → *Run workflow*. Laissez « auto » décoché pour ne prendre que les fichiers nommés. Rien n’est mis en ligne : le résultat arrive sur la branche `photos-review`, et la planche de contrôle sur la branche `photos-sheet` (le lien s’affiche dans le résumé de l’exécution), pour qu’elle ne soit jamais publiée ;
   - **sur votre ordinateur** : `python3 tools/fetch-photos.py --sheet /tmp/planche.jpg` (Python 3 et `pip install pillow`, accès à commons.wikimedia.org et upload.wikimedia.org). Ajoutez `--exact-only` pour ne prendre que les fichiers nommés.
3. **Regardez la planche avant de publier** : chaque photo doit montrer exactement son adresse, sans visage reconnaissable au premier plan ; les choix `[auto]` demandent une attention particulière. Si tout va bien, fusionnez `photos-review` dans la branche du site (une *pull request*) ; sinon, changez `files` et relancez.

Le script vérifie chaque fichier auprès de Commons et **refuse** : les licences non libres (NC, ND, droits réservés), les photos signalées comme montrant des personnes identifiables, les fichiers proposés à la suppression, ceux que Commons signale pour l’absence de liberté de panorama au Maroc (bâtiments récents : un bâtiment récent ne doit pas être le sujet principal d’une photo utilisée commercialement ; l’hôte peut l’accepter pour un bâtiment précis avec `"nofop": true`, comme pour le Sacré-Cœur, la photo restant sous licence libre et créditée), et les photos CC BY sans auteur à créditer. Il garde l’auteur, la licence et le lien, prépare deux tailles (1280 et 640 px, sans métadonnées EXIF) et écrit `content/photos.js`. Ses choix sont gardés dans `tools/photos.lock.json` (à garder avec les photos) : une relance ne télécharge que ce qui a changé ; `--force` retélécharge les mêmes photos, `--repick` refait les choix.

**Retirer une photo** : supprimez l’adresse de `tools/photos.json` (ou videz ses `files`) et relancez : la photo disparaît du guide et ses fichiers sont effacés.

Hors connexion, le guide montre les photos déjà vues (et celles de la ville qu’il a gardées pour plus tard) ; une photo jamais chargée laisse place à l’illustration dessinée.

Pas de photos trouvées sur Google, Instagram ou les sites des restaurants : seulement les vôtres, celles que l’établissement vous autorise à publier, ou des photos sous licence libre. Une photo publiée par l’établissement lui-même (la galerie d’un hôtel), avec son autorisation écrite : *Actions* → *Permitted photos* avec l’adresse de sa page donne des planches numérotées (branche `photos-permitted`) ; mettez ensuite dans `tools/photos.json` `"permitted": {"url": "<l’image>", "page": "<sa page>", "by": "<l’établissement>"}` : elle est créditée « Photo · <établissement> · © », avec le lien vers sa page.

## Les films

Quatre films de fond, tous sans son, en boucle (la fin se raccorde au début), chacun en deux versions :

| Film | Où | Fichiers (`assets/video/`) | Plans |
|---|---|---|---|
| Le Maroc | l’accueil | `morocco[-portrait]` | Jemaa el-Fna, Chefchaouen, le thé dans le désert, l’aube à Tanger |
| Casablanca | les pages des quatre logements de Casablanca | `casablanca[-portrait]` | le phare d’El Hank, les palmiers d’Aïn Diab, les Habous, les bateaux du port, le coucher de soleil sur Sidi Abderrahmane |
| Marrakech | les pages de Darna Marrakech | `marrakech[-portrait]` | la vraie place Jemaa el-Fna (vidéo), la Koutoubia, le palais Bahia, la médersa Ben Youssef, les lanternes du souk Haddadine, les toits au crépuscule |
| Martil | les pages de Darna Martil Bay | `martil[-portrait]` | la plage et sa mouette, la corniche, la plage en panorama au coucher du soleil, l’oued Martil, le ciel du soir |

Chaque ville ne montre que **sa** ville. Wikimedia Commons n’ayant presque aucune vidéo libre de Casablanca ni de Martil, ces films sont faits de grandes photos libres animées par un lent mouvement de caméra (zoom ou panoramique), fondues les unes dans les autres ; Marrakech mêle une vraie vidéo et des photos. Tout vient de Wikimedia Commons, sous licence libre (CC0, CC BY, CC BY-SA), choisi à l’œil : pas de visage reconnaissable, pas de texte ni de filigrane, la bonne ville. Les films montés sont sous licence **CC BY-SA 4.0**.

- `-portrait` : vertical 720 × 1280 pour les téléphones ; sans suffixe : horizontal 1280 × 720 pour les tablettes et ordinateurs. Chacun en MP4 (H.264, pour iPhone et la plupart des navigateurs), WebM (VP9, pour les autres) et `.jpg` (la première image, qui s’affiche tout de suite). Environ 2 à 3 Mo par fichier.
- Le film d’une ville est décrit dans `content/cities/<ville>.js` → `film` (les fichiers et `credits`) ; celui de l’accueil dans `content/brand.js` → `film`. `film: 'brand'` dans une ville y passe le film du Maroc ; `film: null` montre seulement le décor dessiné (`scene`).
- Les licences demandent de citer chaque auteur : c’est fait sur la page « Crédits », par le lien « Film fait d’extraits de Wikimedia Commons » en bas du premier écran. Ne retirez pas `credits` tant que ces plans sont utilisés (la vérification automatique le signale).
- En mode économie de données ou avec les animations réduites, seule l’image fixe s’affiche.

**Refaire ou changer un film.** Les sources ne sont pas gardées dans le dépôt (trop lourdes).
1. Chercher : GitHub → Actions → **Film sources** → Run workflow. Avec `search` (mots séparés par `|`, par exemple `Martil|Tetouan|Category:Videos of Tétouan|User:Ideophagous`), seulement ces recherches ; vide, tout le Maroc. La branche `film-sources` reçoit des planches (`candidates-1.jpg`…: six images de chaque vidéo libre trouvée, avec auteur et licence), `candidates.json` et `rejected.json` (pourquoi les autres ont été écartées). Pour des photos : *Actions* → *Photos* avec `candidates` = des recherches (`search:Martil beach|category:Category:Martil`). Vérifiez chaque plan à l’œil (visages, plaques, logos, texte).
2. Pour choisir un passage d’une longue vidéo : *Film sources* avec `files` et `preview` coché : une petite copie et une planche d’une image toutes les quelques secondes.
3. Télécharger : *Film sources* avec `files` = les noms séparés par `|`, `#début-fin` en secondes pour une partie d’une vidéo ; une photo (`File:….jpg`) arrive en grand (jusqu’à 3840 px, un panorama en entier). La branche `film-sources` reçoit `src/` et `sources.json` (auteurs, licences, liens). Les sources des films actuels sont nommées dans leurs `credits`.
4. Monter : `git fetch origin film-sources && git archive origin/film-sources | tar -x -C ../film`, décrire les plans dans `tools/films/<nom>.json` (une vidéo : `src`, `start`, `end`, `x`/`y`, `speed` ; une photo : `image`, `dur`, `from` et `to` = centre x, centre y et zoom au début et à la fin ; `grade` ; un réglage propre à une version avec `"landscape": {...}` ou `"portrait": {...}`), puis `python3 tools/make-film.py tools/films/<nom>.json ../film/src`. Il faut ffmpeg (avec libx264 et libvpx-vp9) et Pillow. Visez 2 à 3 Mo par fichier (`h264` et `vp9` dans le `.json` : plus haut = plus léger).
5. Mettre à jour `credits` du film (dans le fichier de la ville ou `content/brand.js`) : chaque photo et vidéo utilisée, son auteur, sa licence et son lien.

## Typographie

Outfit (sans-serif géométrique, graisses fines) pour les titres et le texte ; Tajawal pour la page en arabe. Les deux viennent de Google Fonts et se changent en haut de `assets/css/style.css` (`--f-latin`, `--f-arabic`) et dans le lien Google Fonts de `index.html` et `card.html`.

## Avant de publier : ce qu’il reste à compléter

Les champs marqués `TODO` ne sont pas montrés aux voyageurs (Wi-Fi : « Sur la carte dans votre logement »). Pour voir ce qu’il reste à compléter, ajoutez `&draft` à l’adresse d’un logement, par exemple `…/?stay=pestana&draft` : chaque champ manquant y apparaît avec un badge « Bientôt ». Cherchez `TODO` dans `content/`.

Pour toute la marque (`content/brand.js`) :
- [x] Numéro WhatsApp (`host.whatsapp`) ; un logement peut avoir le sien (`host` dans son fichier). Le même numéro est écrit dans le bouton WhatsApp d’`index.html` (`id="dock-wa"`), pour qu’il marche avant même le chargement : changez les deux (la vérification automatique le signale sinon)
- [ ] Liens de réservation (`book` de chaque logement) : l’adresse de son annonce sur chaque site, en `https://` (Airbnb, Booking.com, Vrbo ; aussi possibles : Expedia, Agoda, Mubawab, Avito). Jamais un lien qui donne le numéro d’un studio ou d’un appartement : pour B-Suites et Marrakech (plusieurs logements), la page de l’hôte sur le site. Un site laissé vide n’est pas montré ; « En direct · WhatsApp » est toujours là. La vérification automatique refuse un lien qui n’est pas en https ou pas sur le bon site. Le bouton « Réserver » est sur l’accueil et sur les cartes des villes, pas dans les pages d’un logement (le lien envoyé dans les messages Airbnb) : Airbnb interdit d’inviter ses voyageurs à réserver ailleurs
- [ ] Position de chaque logement : la position exacte va seulement dans `location` du fichier du logement (coordonnées, coucher du soleil, itinéraire depuis la porte). Dans `content/brand.js`, gardez 2 décimales (environ 1 km) : cela suffit pour « Trouver mon logement » sans afficher l’immeuble sur l’accueil. Passez `approx` à `false` quand c’est fait.

Pour chaque logement (`content/stays/<logement>.js`) :
- [ ] Adresse en français et en arabe (pour le chauffeur de taxi), sans étage ni numéro d’appartement
- [x] Horaires d’arrivée et de départ : 15:00 et 11:00, confirmés pour les six logements
- [ ] Remise des clés, où laisser les clés, où déposer les poubelles
- [ ] Nom du réseau Wi-Fi (sans numéro d’appartement ni d’étage). À confirmer : y a-t-il le Wi-Fi à Martil Bay et à Dar Bouazza ? Sinon, ajoutez au fichier du logement `stayGroup: ['stay', 'house', 'nearby', 'services', 'assistance']` (la liste de `content/brand.js` sans `'wifi'`) pour retirer la tuile Wi-Fi
- [ ] Mode d’emploi (climatisation, eau chaude, cuisine…, piscine, parking, résidence)
- [ ] Autour de vous : vérifiez les adresses proposées et ajoutez le temps de marche **depuis l’immeuble** (`walk`, en minutes)

Pour les villes (`content/cities/<ville>.js`) :
- [ ] Vos choix personnels (entrées `kind: 'placeholder'`), et les services ou expériences que vous ne proposez pas : supprimez-les. Les règles Airbnb interdisent d’encaisser hors Airbnb ce qui est lié au séjour : passez par une demande de paiement Airbnb.
- [ ] Les adresses marquées « À pied » (liste `areas` en haut du fichier) : vérifiez le temps de marche réel
- [ ] Relisez les textes écrits en votre nom (mot d’accueil, signature) : ils doivent vous ressembler

## Vérifier avant d’envoyer un lien

**Les liens Google Maps des logements** (`mapsUrl`, bouton « Localisation ») : GitHub → *Actions* → **Maps links** → *Run workflow* ouvre chaque lien comme un téléphone sans l’application Google Maps et dit s’il mène bien à un lieu, et à combien de kilomètres du quartier indiqué dans le guide (jamais le point exact : les journaux d’un dépôt public sont publics). À relancer après avoir changé un lien. Tous les boutons de carte sont des liens Google Maps : sur Android (Samsung compris) et sur iPhone avec l’application Google Maps, ils ouvrent l’application et sa navigation (dans Samsung Internet, qui garde sinon ces liens sur le site, et dans le guide installé depuis Chrome, un appui demande directement l’application ; si elle manque, le site s’ouvre) ; sans l’application (iPhone, Huawei sans services Google), ils ouvrent le site Google Maps, qui montre le lieu et l’itinéraire mais pas le guidage vocal. Les itinéraires « depuis le logement » partent de la position du voyageur (sa porte quand il part).

`node tools/check-content.js` vérifie que tout se charge, que chaque logement a sa ville, sa page et son lien court, que les quatre langues ont les mêmes textes, que chaque photo existe et est créditée, et que le mode hors connexion a tous ses fichiers. GitHub la lance aussi à chaque envoi (onglet *Actions* → *Check*) : une croix rouge sur un envoi veut dire qu’un logement risque de ne pas s’ouvrir.

Un lien mal tapé (une majuscule, une faute, un caractère en trop) mène quand même au bon guide, ou à l’accueil pour choisir : c’est le rôle de `404.html`, qui marche aux deux adresses (github.io et le domaine).

## Téléphones et navigateurs

Le guide est testé sur le moteur de Safari (WebKit : tous les navigateurs d’iPhone et d’iPad, y compris dans WhatsApp et Airbnb) et sur celui de Chrome (Chromium : Chrome, Samsung Internet et les navigateurs Android), du petit iPhone SE aux tablettes, en portrait et à l’horizontale, dans les quatre langues. Les anciens iPhone (iOS 15 : iPhone 6s, 7, premier SE) gardent les mêmes couleurs grâce à une version de secours du style. Sans connexion, le guide s’ouvre dès qu’il a été ouvert une fois.

## Vérifier les adresses

Les lieux ont été sélectionnés en octobre 2026 à partir de sources publiques (guides, presse, sites des lieux) ; la source de chaque adresse de Marrakech, Martil et Dar Bouazza est notée en commentaire au-dessus de l’adresse. Les grands monuments et les adresses historiques sont sûrs. Les adresses plus récentes sont à confirmer en priorité, idéalement sur place : Bondi Coffee Kitchen, Holy Brunch, La Taverne du Dauphin, Sky Bar (Villa Blanca), The James Rooftop, Hammam Ziani, Dar Bouazza. Les horaires, prix et fermetures changent. Avant chaque saison :

1. Ouvrez chaque adresse dans Google Maps et vérifiez qu’elle est ouverte.
2. Contrôlez les prix indicatifs : visite de la mosquée Hassan II (≈ 130 MAD), tram (≈ 8 MAD), train de l’aéroport, grand taxi, hammam.
   Les applications de VTC ont changé fin 2025 (retour d’Uber) : vérifiez celles qui fonctionnent depuis chaque logement (les petits taxis rouges de Casablanca ne vont pas à Dar Bouazza).
3. Mettez à jour la date `checked` en haut du fichier de la ville.

Mieux vaut 30 adresses que vous recommandez vraiment que 100 adresses non vérifiées.

## Sécurité

Cette page est publique, et le dépôt aussi : tout ce qui est dans `content/` peut être lu par n’importe qui. N’y mettez jamais le code de la porte, le code de la boîte à clés, l’étage, le numéro de l’appartement ou du studio, ni un nom de Wi-Fi qui le contient : envoyez-les par message Airbnb. Pour Darna B-Suites et Darna Marrakech, il y a un seul guide par immeuble ; le numéro du logement part uniquement dans le message du jour d’arrivée. Posez la carte QR dans le logement, jamais sur une porte commune. Les pages demandent aux moteurs de recherche de ne pas les indexer (cela ne les rend pas privées).

## Mettre en ligne (GitHub Pages, gratuit)

Le dépôt est public : GitHub l’héberge gratuitement. Une seule fois :

1. Sur GitHub, ouvrez le dépôt `atlasattir/airbnb-casablanca` → **Settings** → **Pages**.
2. Dans **Build and deployment** → **Source**, choisissez **Deploy from a branch**.
3. Branche **`claude/great-newton-e86pup`**, dossier **`/ (root)`**, puis **Save**.
4. Une à deux minutes plus tard, le guide est en ligne à l’adresse :
   **https://atlasattir.github.io/airbnb-casablanca/**, qui renvoie maintenant vers **https://darnacollection.ma/** (ci-dessous).

Ensuite, chaque modification envoyée sur cette branche met le site à jour automatiquement.

Autres options gratuites : Netlify (glissez le dossier sur [app.netlify.com/drop](https://app.netlify.com/drop)), Vercel ou Cloudflare Pages (importez le dépôt, sans commande de build).

### Le nom de domaine (darnacollection.ma)

**Fait le 18 octobre 2026** : le guide est à https://darnacollection.ma/ (HTTPS imposé) ; github.io y renvoie. Les étapes, pour mémoire ou pour refaire :

Le guide marche à l’adresse github.io comme à la racine d’un domaine. Pour relier darnacollection.ma, dans cet ordre :

0. **Avant tout** : chez CAP CONNECT, faites la vérification d’identité du .ma (CIN, passeport, ou documents de la société), exigée par l’ANRT ; sans elle le .ma n’est pas activé, ou peut être suspendu. Pour le .com, cliquez le lien de l’e-mail « verification » reçu (vérifiez les spams) : sans ce clic sous 15 jours, le .com est suspendu.
1. https://github.com/settings/pages (dans le navigateur) → **Add a domain** → `darnacollection.ma` → **Add domain** : GitHub montre un enregistrement TXT. Laissez la page ouverte.
2. CAP CONNECT → Domaines → darnacollection.ma → **Gestion de la zone DNS** (créez-la si on vous le propose ; pas de « configuration rapide »). Supprimez seulement les lignes A, AAAA et CNAME dont l’hôte est `@`, `www` ou `*`, et toute redirection web ; ne touchez ni NS ni SOA, gardez MX et TXT. Ajoutez : le TXT de GitHub (hôte `_github-pages-challenge-atlasattir`, la valeur copiée) ; 4 lignes A, hôte `@` : `185.199.108.153`, `185.199.109.153`, `185.199.110.153`, `185.199.111.153` ; 1 ligne CNAME, hôte `www`, valeur `atlasattir.github.io.` (TTL 3600 si on vous le demande). Si le type AAAA existe, ajoutez aussi `2606:50c0:8000::153` à `2606:50c0:8003::153`.
3. Quelques heures plus tard : https://github.com/settings/pages → ⋯ → **Continue verifying** → **Verify**.
4. **Actions → Domain check** : quand il montre les bons enregistrements partout, attendez encore quelques heures (les anciennes réponses restent en mémoire chez les opérateurs), puis choisissez une heure calme (la nuit, pas un jour d’arrivée) pour la bascule : dépôt → **Settings → Pages → Custom domain** → `darnacollection.ma` → **Save**. GitHub ajoute un fichier `CNAME` à la branche ; dans la foulée, un envoi change les adresses `og:url`/`og:image` et les liens de `docs/messages.md` (`tools/check-content.js` les vérifie). Ne supprimez jamais ce fichier, récupérez-le (`git pull`) avant tout envoi et ne forcez jamais un envoi.
5. Dès que la case est disponible (souvent quelques minutes, jusqu’à 24 h) : **Enforce HTTPS**. Si au bout d’une heure le certificat n’est toujours pas prêt : **Remove**, retapez le domaine, **Save** (une seule fois).
6. **Seulement quand Domain check est entièrement vert** : remplacez les liens des messages Airbnb par ceux de darnacollection.ma, puis imprimez les cartes depuis https://darnacollection.ma/card.html.

L’ancienne adresse github.io renvoie alors vers la même page du domaine (cartes QR déjà imprimées, messages déjà envoyés). Les favoris enregistrés et une icône ajoutée à l’écran d’accueil depuis github.io ne passent pas au nouveau domaine : il suffit de la rajouter. **Revenir en arrière** : Settings → Pages → **Remove** ; github.io sert de nouveau le guide en une ou deux minutes.

darnacollection.com ne peut pas être ajouté à GitHub Pages (un seul domaine par site) : sa redirection 301 vers darnacollection.ma se règle chez Cloudflare (gratuit) : ajoutez le domaine (offre Free), deux enregistrements A `@` et `www` → `192.0.2.1` en mode « Proxied », les deux serveurs de noms Cloudflare chez CAP CONNECT (cases 3 et 4 vides ; pas de DNSSEC), puis **Rules → Redirect Rule** : *All incoming requests*, type *Dynamic*, expression `concat("https://darnacollection.ma", http.request.uri.path)`, code 301, *Preserve query string* coché. Laissez « Always Use HTTPS » désactivé.

## Une fois en ligne

1. **Carte de chaque logement** : ouvrez `https://darnacollection.ma/card.html`, choisissez le logement, tapez le mot de passe Wi-Fi, puis imprimez au format A6 (une carte par studio ou appartement). Décidez de l’adresse définitive du site avant d’imprimer : le QR code la contient. La carte porte le QR code du guide et, si le Wi-Fi est rempli, un second QR code qui connecte le téléphone au Wi-Fi en un geste. Le mot de passe n’est enregistré nulle part.
2. **Messages Airbnb** : copiez les textes de `docs/messages.md` dans les messages programmés de chaque annonce, avec le lien du logement. Le lien part 3 jours avant l’arrivée ; la carte dans le logement sert de rappel.
3. **Hors connexion** : dès qu’un voyageur a ouvert le guide une fois, il reste consultable sans données mobiles. Après avoir renommé ou supprimé des fichiers, changez `VERSION` dans `sw.js`.

## Essayer en local

```
python3 -m http.server 8000
```

puis ouvrez <http://localhost:8000>.

## Ajouter un logement

1. Dans `content/brand.js`, ajoutez une ligne à `stays` (identifiant, nom, ville, quartier, type, position, points forts). Pour un nouveau quartier, ajoutez son nom dans `areas` ; pour une nouvelle ville, ajoutez-la dans `cities` et créez `content/cities/<ville>.js` sur le modèle des autres.
2. Copiez un fichier de `content/stays/` sous le nouvel identifiant (par exemple `content/stays/maarif.js`) et adaptez-le.
3. Copiez un dossier de logement à la racine (par exemple `pestana/`) sous le nouvel identifiant, et remplacez l’ancien identifiant et l’ancien nom dans ses deux fichiers (`index.html`, `manifest.webmanifest`).
4. Ajoutez son lien dans le tableau de `docs/messages.md`.
