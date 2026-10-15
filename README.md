# Casa, côté vous

Guide digital de l’appartement Bourgogne, Casablanca. Les voyageurs l’ouvrent sur leur téléphone (lien Airbnb ou QR code), sans application à installer.

- Film de Casablanca en fond, animation au défilement, 3 boutons permanents (Localisation, WhatsApp, Mes favoris)
- Accueil en deux groupes de grands boutons arrondis : **Votre appartement** (Wi-Fi, Arrivée & départ, Mode d’emploi, Autour de vous, Services, Assistance) et **Casablanca** (10 rubriques, chacune avec sa couleur)
- Pages très visuelles : cartes illustrées avec un nom et une ligne courte, détails dans une fiche qui s’ouvre d’un geste (et se ferme en la glissant vers le bas)
- Itinéraires calés sur l’heure réelle du coucher du soleil du jour
- 4 langues : français, anglais, arabe (de droite à gauche), espagnol. La langue du téléphone est choisie automatiquement.
- Itinéraires et adresses qui s’ouvrent dans Google Maps, demandes de services pré-rédigées sur WhatsApp, favoris gardés sur le téléphone
- Fonctionne hors connexion une fois ouvert (utile pour les touristes sans carte SIM marocaine)
- Carte QR + Wi-Fi à imprimer pour l’entrée (`card.html`) et messages Airbnb prêts à copier (`docs/messages.md`)
- Aucun outil à installer : du HTML, du CSS et du JavaScript simples

## Structure

```
index.html              la page
card.html               la carte QR + Wi-Fi à imprimer
sw.js                   le mode hors connexion
docs/messages.md        les messages Airbnb, dans les 4 langues
assets/css/style.css    le design
assets/js/app.js        le fonctionnement
assets/js/icons.js      les icônes
assets/video/           le film de fond (à ajouter)
assets/vendor/qrcode.js générateur de QR code (licence MIT, Kazuhiko Arase)
content/apartment.js    tout ce qui concerne l’appartement Bourgogne
content/city.js         Casablanca : lieux, restaurants, itinéraires, infos pratiques
content/ui.js           les textes de l’interface dans les 4 langues
assets/img/             icônes, image d’aperçu du lien (share.jpg), vos photos
```

Le contenu se modifie uniquement dans `content/`. Chaque texte existe en `fr`, `en`, `ar` et `es`.

## Écrire le contenu

- Chaque adresse a un `short` : **5 mots au maximum**, affiché sous le nom sur la carte. Le reste (`desc`, `tip`) n’apparaît que dans la fiche détail.
- Chaque adresse a une `icon` (son illustration) : choisissez un nom parmi ceux de `assets/js/icons.js` (`minaret`, `lighthouse`, `fish`, `palm`, `sunset`…).
- Chaque rubrique a une couleur `tint` (en haut de chaque rubrique dans `content/city.js`).
- **Vos photos** : ajoutez `image: 'assets/img/places/hassan2.jpg'` à une adresse, et la photo remplace l’illustration (format paysage, environ 1200 px de large, moins de 300 Ko). Utilisez vos propres photos ou des photos sous licence libre, jamais des images trouvées sur Google ou Instagram.
- Étapes d’itinéraire : `rel: -20` veut dire « 20 minutes avant le coucher du soleil du jour » ; l’heure affichée s’adapte toute l’année.

## Ajouter le film de Casablanca

Déposez les fichiers dans `assets/video/` avec ces noms exacts :

| Fichier | Format | Utilisé sur |
|---|---|---|
| `casablanca-portrait.mp4` | vertical 9:16, 1080 × 1920 | téléphones |
| `casablanca.mp4` | horizontal 16:9, 1920 × 1080 | ordinateurs et tablettes |

Recommandations :

- 10 à 20 secondes, en boucle (la fin doit se raccorder au début), **sans son** : les navigateurs ne lancent automatiquement que les vidéos muettes.
- MP4 H.264, moins de 6 Mo par fichier. Exemple de compression :
  `ffmpeg -i source.mov -vf scale=1080:-2 -an -c:v libx264 -crf 26 -preset slow -movflags +faststart casablanca-portrait.mp4`
- Plans lents et sombres de préférence : le titre est posé dessus, en bas de l’écran. Gardez le sujet principal au centre ou en haut de l’image.
- Si vous n’avez qu’une version horizontale, déposez seulement `casablanca.mp4` : elle sera recadrée automatiquement sur téléphone.
- Facultatif : une image fixe `assets/video/poster.jpg` (première image du film), à déclarer dans `content/apartment.js` → `hero.poster`.

Tant qu’aucun film n’est présent, une scène dessinée (coucher de soleil, minaret de la mosquée Hassan II) s’affiche à la place. Pour les voyageurs en mode économie de données ou avec les animations réduites, le film ne se lance pas.

## Avant de publier : ce qu’il reste à compléter

Les champs marqués `TODO` affichent un petit badge « Bientôt » aux voyageurs. Presque tous sont dans `content/apartment.js` :

- [ ] Numéro WhatsApp (`host.whatsapp`, chiffres seulement, ex. `2126XXXXXXXX`)
- [ ] Adresse de l’immeuble en français et en arabe (pour le chauffeur de taxi), sans étage ni numéro d’appartement
- [ ] Position exacte (`lat`, `lng`) et texte ou lien Google Maps de l’immeuble
- [ ] Horaires d’arrivée et de départ (15:00 et 11:00 par défaut)
- [ ] Remise des clés, où laisser les clés, où déposer les poubelles
- [ ] Nom du réseau Wi-Fi (et le mot de passe si vous acceptez qu’il soit visible)
- [ ] Mode d’emploi : climatisation, eau chaude, lave-linge, cuisine, télévision
- [ ] Autour de vous : supermarché, pharmacie, boulangerie, distributeur, café, tram ou taxi, avec le nom (`name`), le temps de marche **depuis l’immeuble** (`walk`, en minutes) et le texte de recherche Google Maps (`maps`)
- [ ] Stationnement de l’appartement et pharmacie la plus proche (dans `content/city.js`)
- [ ] Vos choix personnels : « La table préférée de Yassine » et « Le café de Yassine à Bourgogne » (`content/city.js`, entrées `kind: 'placeholder'` à remplacer par une vraie adresse)
- [ ] Services et expériences sur demande (transfert, ménage, cours de cuisine, guide) : supprimez ceux que vous ne proposez pas. Les règles Airbnb interdisent d’encaisser hors Airbnb ce qui est lié au séjour : passez par une demande de paiement Airbnb.
- [ ] Les 7 lieux marqués « À pied » (`near: true`) : vérifiez le temps de marche réel depuis l’immeuble et retirez la mention si c’est trop loin
- [ ] Relisez les textes écrits en votre nom (mot d’accueil, signature) : ils doivent vous ressembler

## Vérifier les adresses

Les lieux ont été sélectionnés en octobre 2026 à partir de sources publiques (guides, presse, sites des lieux). Les grands monuments et les adresses historiques sont sûrs. Les adresses plus récentes sont à confirmer en priorité, idéalement sur place : Bondi Coffee Kitchen, Holy Brunch, La Taverne du Dauphin, Sky Bar (Villa Blanca), The James Rooftop, Hammam Ziani, Dar Bouazza. Les horaires, prix et fermetures changent. Avant chaque saison :

1. Ouvrez chaque adresse dans Google Maps et vérifiez qu’elle est ouverte.
2. Contrôlez les prix indicatifs : visite de la mosquée Hassan II (≈ 130 MAD), tram (≈ 8 MAD), train de l’aéroport, grand taxi, hammam.
   Les applications de VTC ont changé fin 2025 (retour d’Uber) : vérifiez celles qui fonctionnent depuis Bourgogne.
3. Mettez à jour la date `checked` en haut de `content/city.js`.

Mieux vaut 30 adresses que vous recommandez vraiment que 100 adresses non vérifiées.

## Sécurité

Cette page est publique. N’y mettez jamais le code de la porte, le code de la boîte à clés, l’étage ou le numéro de l’appartement : envoyez-les par message Airbnb. La page demande aussi aux moteurs de recherche de ne pas l’indexer.

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

1. **Carte de l’entrée** : ouvrez `https://atlasattir.github.io/airbnb-casablanca/card.html`, tapez le mot de passe Wi-Fi, puis imprimez au format A6. La carte porte le QR code du guide et, si le Wi-Fi est rempli, un second QR code qui connecte le téléphone au Wi-Fi en un geste. Le mot de passe n’est enregistré nulle part.
2. **Messages Airbnb** : copiez les textes de `docs/messages.md` dans vos messages programmés. Le lien du guide part 3 jours avant l’arrivée ; la carte dans l’appartement sert de rappel.
3. **Hors connexion** : dès qu’un voyageur a ouvert le guide une fois, il reste consultable sans données mobiles. Après avoir renommé ou supprimé des fichiers, changez `VERSION` dans `sw.js`.

## Essayer en local

```
python3 -m http.server 8000
```

puis ouvrez <http://localhost:8000>.

## Ajouter un deuxième appartement

1. Copiez `content/apartment.js` (par exemple `content/maarif.js`) et adaptez-le.
2. Copiez `index.html` (par exemple `maarif.html`) et remplacez `content/apartment.js` par `content/maarif.js` dans la liste des scripts en bas de page.

Le contenu sur Casablanca (`content/city.js`) reste commun à tous vos appartements.
