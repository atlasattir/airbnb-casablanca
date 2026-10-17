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
assets/img/                 icônes, image d’aperçu du lien (share.jpg)
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

Chaque adresse des guides peut avoir une photo **de cette adresse précise** (la mosquée Hassan II, la plage de Martil, le souk Haddadine…), prise sur [Wikimedia Commons](https://commons.wikimedia.org) sous licence libre. Elle s’affiche sur la carte de l’adresse, en grand dans sa fiche (avec l’auteur et la licence en bas de la photo), et sur la page « Crédits photos » (lien en bas du guide). Une rubrique peut avoir une photo de couverture (sa tuile et son en-tête), une ville la sienne (son bouton sur l’accueil).

1. `tools/photos.json` liste, par ville et par adresse (son `id`) :
   - `files` : les fichiers Commons voulus, le meilleur d’abord (`"File:Hassan_II_Mosque_Plaza.jpg"`) ;
   - `category` ou `search` : où chercher si aucun fichier ne convient (la meilleure photo libre est alors prise, marquée `[auto]` sur la planche de contrôle) ;
   - `pos` (facultatif) : le cadrage, par exemple `"50% 30%"` pour garder le haut ;
   - `illustr: true` quand la photo montre le genre de chose et non l’adresse elle-même (un plat pour un restaurant) : elle est alors marquée « Illustration » sur la carte et dans la fiche.
   - `_city` : l’adresse dont la photo illustre la ville sur l’accueil ; `_covers` : la photo de chaque rubrique (`"visit": "hassan2"`).
2. **Télécharger les photos**, au choix :
   - **depuis GitHub, sans rien installer** : onglet *Actions* → *Photos* → *Run workflow*. Laissez « auto » décoché pour ne prendre que les fichiers nommés. Rien n’est mis en ligne : le résultat arrive sur la branche `photos-review`, et la planche de contrôle sur la branche `photos-sheet` (le lien s’affiche dans le résumé de l’exécution), pour qu’elle ne soit jamais publiée ;
   - **sur votre ordinateur** : `python3 tools/fetch-photos.py --sheet /tmp/planche.jpg` (Python 3 et `pip install pillow`, accès à commons.wikimedia.org et upload.wikimedia.org). Ajoutez `--exact-only` pour ne prendre que les fichiers nommés.
3. **Regardez la planche avant de publier** : chaque photo doit montrer exactement son adresse, sans visage reconnaissable au premier plan ; les choix `[auto]` demandent une attention particulière. Si tout va bien, fusionnez `photos-review` dans la branche du site (une *pull request*) ; sinon, changez `files` et relancez.

Le script vérifie chaque fichier auprès de Commons et **refuse** : les licences non libres (NC, ND, droits réservés), les photos signalées comme montrant des personnes identifiables, les fichiers proposés à la suppression, ceux que Commons signale pour l’absence de liberté de panorama au Maroc (bâtiments récents : un bâtiment récent ne doit pas être le sujet principal d’une photo utilisée commercialement), et les photos CC BY sans auteur à créditer. Il garde l’auteur, la licence et le lien, prépare deux tailles (1280 et 640 px, sans métadonnées EXIF) et écrit `content/photos.js`. Ses choix sont gardés dans `tools/photos.lock.json` (à garder avec les photos) : une relance ne télécharge que ce qui a changé ; `--force` retélécharge les mêmes photos, `--repick` refait les choix.

**Retirer une photo** : supprimez l’adresse de `tools/photos.json` (ou videz ses `files`) et relancez : la photo disparaît du guide et ses fichiers sont effacés.

Hors connexion, le guide montre les photos déjà vues (et celles de la ville qu’il a gardées pour plus tard) ; une photo jamais chargée laisse place à l’illustration dessinée.

Pas de photos trouvées sur Google, Instagram ou les sites des restaurants : seulement les vôtres, celles que l’établissement vous autorise à publier (ajoutez alors `image: 'assets/img/places/<id>.jpg'` à l’adresse dans le fichier de la ville), ou des photos sous licence libre.

## Le film de Casablanca

Le film de fond vient de la vidéo de @mr_enissay (Instagram), utilisée avec son accord. Le montage garde six plans de nuit : la ville vue d’en haut avec la mosquée Hassan II, les tours de Casablanca Finance City, l’avenue, le boulevard et le taxi rouge. Le titre, les visages et la carte de fin ont été retirés. Chaque plan est recadré pour que le pseudo affiché à l’écran n’apparaisse jamais. Les plans sont ralentis à 0,75× avec des fondus, et la fin se raccorde au début.

| Fichier | Format | Utilisé sur |
|---|---|---|
| `casablanca-portrait.mp4` / `.webm` / `.jpg` | vertical 720 × 1280, 12 s | téléphones |
| `casablanca.mp4` / `.webm` / `.jpg` | horizontal 1280 × 720, 12 s | ordinateurs et tablettes |

- Le MP4 (H.264) sert aux iPhone et à la plupart des navigateurs ; le WebM (VP9) sert à ceux qui ne lisent pas le H.264. Le `.jpg` est la première image du film : il s’affiche tout de suite, puis le film prend le relais sans saut.
- Le film passe sur l’accueil et sur les guides de Casablanca (`film: 'brand'` dans `content/cities/casablanca.js`). Marrakech et Martil n’ont pas encore de film (`film: null`) : un décor dessiné s’affiche (`scene: 'plain'` ou `'sea'`). Ne mettez jamais le film de Casablanca sur une autre ville.
- Le crédit « Film @mr_enissay » apparaît en bas de la page. Pour le retirer, mettez `credit: null` dans `content/brand.js` → `film`. Le créateur a donné son accord pour un guide de Casablanca : confirmez avec lui qu’il accepte aussi l’accueil Darna Collection.
- Pour les voyageurs en mode économie de données ou avec les animations réduites, seule l’image fixe s’affiche.

Pour remplacer le film : mêmes noms de fichiers, 10 à 20 secondes, **sans son** (les navigateurs ne lancent automatiquement que les vidéos muettes), moins de 6 Mo par fichier, plans sombres (le titre est posé dessus). Exemple :
`ffmpeg -i source.mov -vf scale=720:-2 -an -c:v libx264 -crf 26 -preset slow -movflags +faststart casablanca-portrait.mp4`
puis `ffmpeg -i casablanca-portrait.mp4 -c:v libvpx-vp9 -b:v 0 -crf 37 casablanca-portrait.webm` et `ffmpeg -i casablanca-portrait.mp4 -frames:v 1 -q:v 5 casablanca-portrait.jpg`.

## Typographie

Outfit (sans-serif géométrique, graisses fines) pour les titres et le texte ; Tajawal pour la page en arabe. Les deux viennent de Google Fonts et se changent en haut de `assets/css/style.css` (`--f-latin`, `--f-arabic`) et dans le lien Google Fonts de `index.html` et `card.html`.

## Avant de publier : ce qu’il reste à compléter

Les champs marqués `TODO` ne sont pas montrés aux voyageurs (Wi-Fi : « Sur la carte dans votre logement »). Pour voir ce qu’il reste à compléter, ajoutez `&draft` à l’adresse d’un logement, par exemple `…/?stay=pestana&draft` : chaque champ manquant y apparaît avec un badge « Bientôt ». Cherchez `TODO` dans `content/`.

Pour toute la marque (`content/brand.js`) :
- [x] Numéro WhatsApp (`host.whatsapp`) ; un logement peut avoir le sien (`host` dans son fichier). Le même numéro est écrit dans le bouton WhatsApp d’`index.html` (`id="dock-wa"`), pour qu’il marche avant même le chargement : changez les deux (la vérification automatique le signale sinon)
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

`node tools/check-content.js` vérifie que tout se charge, que chaque logement a sa ville, sa page et son lien court, que les quatre langues ont les mêmes textes, que chaque photo existe et est créditée, et que le mode hors connexion a tous ses fichiers. GitHub la lance aussi à chaque envoi (onglet *Actions* → *Check*) : une croix rouge sur un envoi veut dire qu’un logement risque de ne pas s’ouvrir.

Un lien mal tapé (une majuscule, une faute, un caractère en trop) mène quand même au bon guide, ou à l’accueil pour choisir : c’est le rôle de `404.html`. Si vous passez à votre propre nom de domaine, changez sa ligne `base` en `'/'`.

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
   **https://atlasattir.github.io/airbnb-casablanca/**

Ensuite, chaque modification envoyée sur cette branche met le site à jour automatiquement.

Autres options gratuites : Netlify (glissez le dossier sur [app.netlify.com/drop](https://app.netlify.com/drop)), Vercel ou Cloudflare Pages (importez le dépôt, sans commande de build).

Plus tard, vous pourrez relier votre propre nom de domaine (Settings → Pages → Custom domain). Pensez alors à changer les deux adresses `og:image` et `og:url` en haut de `index.html` : ce sont elles qui affichent l’image d’aperçu quand le lien est partagé sur WhatsApp ou Airbnb.

## Une fois en ligne

1. **Carte de chaque logement** : ouvrez `https://atlasattir.github.io/airbnb-casablanca/card.html`, choisissez le logement, tapez le mot de passe Wi-Fi, puis imprimez au format A6 (une carte par studio ou appartement). Décidez de l’adresse définitive du site avant d’imprimer : le QR code la contient. La carte porte le QR code du guide et, si le Wi-Fi est rempli, un second QR code qui connecte le téléphone au Wi-Fi en un geste. Le mot de passe n’est enregistré nulle part.
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
