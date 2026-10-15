# Casa, côté vous

Guide digital de l’appartement Bourgogne, Casablanca. Les voyageurs l’ouvrent sur leur téléphone (lien Airbnb ou QR code), sans application à installer.

- Film de Casablanca en fond, animation au défilement, 12 rubriques, 3 boutons permanents (Localisation, WhatsApp, Mes favoris)
- 4 langues : français, anglais, arabe (de droite à gauche), espagnol. La langue du téléphone est choisie automatiquement.
- Itinéraires et adresses qui s’ouvrent dans Google Maps, demandes de services pré-rédigées sur WhatsApp, favoris gardés sur le téléphone
- Aucun outil à installer : du HTML, du CSS et du JavaScript simples

## Structure

```
index.html              la page
assets/css/style.css    le design
assets/js/app.js        le fonctionnement
assets/js/icons.js      les icônes
assets/video/           le film de fond (à ajouter)
content/apartment.js    tout ce qui concerne l’appartement Bourgogne
content/city.js         Casablanca : lieux, restaurants, itinéraires, infos pratiques
content/ui.js           les textes de l’interface dans les 4 langues
```

Le contenu se modifie uniquement dans `content/`. Chaque texte existe en `fr`, `en`, `ar` et `es`.

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

Les champs marqués `TODO` affichent un badge « À compléter » aux voyageurs. Ils sont tous dans `content/apartment.js` :

- [ ] Numéro WhatsApp (`host.whatsapp`, chiffres seulement, ex. `2126XXXXXXXX`)
- [ ] Adresse de l’immeuble en français et en arabe (pour le chauffeur de taxi), sans étage ni numéro d’appartement
- [ ] Position exacte (`lat`, `lng`) et texte ou lien Google Maps de l’immeuble
- [ ] Horaires d’arrivée et de départ (15:00 et 11:00 par défaut)
- [ ] Remise des clés, où laisser les clés, où déposer les poubelles
- [ ] Nom du réseau Wi-Fi (et le mot de passe si vous acceptez qu’il soit visible)
- [ ] Mode d’emploi : climatisation, eau chaude, lave-linge, cuisine, télévision
- [ ] Autour de l’appartement : supermarché, pharmacie, boulangerie, distributeur, café, avec le temps de marche **depuis l’immeuble**
- [ ] Stationnement de l’appartement et pharmacie la plus proche (dans `content/city.js`)
- [ ] Vos choix personnels : « La table préférée de Yassine » et « Le café de Yassine à Bourgogne » (`content/city.js`, entrées `kind: 'placeholder'` à remplacer par une vraie adresse)
- [ ] Services et expériences sur demande (transfert, ménage, cours de cuisine, guide) : supprimez ceux que vous ne proposez pas

## Vérifier les adresses

Les lieux ont été sélectionnés en octobre 2026 à partir de sources publiques (guides, presse, sites des lieux). Les grands monuments et les adresses historiques sont sûrs. Les adresses plus récentes sont à confirmer en priorité, idéalement sur place : Bondi Coffee Kitchen, Holy Brunch, La Taverne du Dauphin, Sky Bar (Villa Blanca), The James Rooftop, Hammam Ziani, Dar Bouazza. Les horaires, prix et fermetures changent. Avant chaque saison :

1. Ouvrez chaque adresse dans Google Maps et vérifiez qu’elle est ouverte.
2. Contrôlez les prix indicatifs : visite de la mosquée Hassan II (≈ 130 MAD), train de l’aéroport, grand taxi.
3. Mettez à jour la date `checked` en haut de `content/city.js`.

Mieux vaut 30 adresses que vous recommandez vraiment que 100 adresses non vérifiées.

## Sécurité

Cette page est publique. N’y mettez jamais le code de la porte, le code de la boîte à clés, l’étage ou le numéro de l’appartement : envoyez-les par message Airbnb. La page demande aussi aux moteurs de recherche de ne pas l’indexer.

## Mettre en ligne

Le site est un simple dossier de fichiers. Trois options gratuites :

- **Netlify** : glissez le dossier du projet sur [app.netlify.com/drop](https://app.netlify.com/drop).
- **GitHub Pages** : Settings → Pages → « Deploy from a branch », branche principale, dossier `/`.
- **Vercel** ou **Cloudflare Pages** : importez le dépôt, sans commande de build.

Ensuite, reliez un nom de domaine si vous le souhaitez, générez un QR code vers l’adresse du site, et ajoutez le lien dans votre message Airbnb envoyé 2 à 3 jours avant l’arrivée. Le QR code dans l’appartement sert de rappel.

## Essayer en local

```
python3 -m http.server 8000
```

puis ouvrez <http://localhost:8000>.

## Ajouter un deuxième appartement

1. Copiez `content/apartment.js` (par exemple `content/maarif.js`) et adaptez-le.
2. Copiez `index.html` (par exemple `maarif.html`) et remplacez `content/apartment.js` par `content/maarif.js` dans la liste des scripts en bas de page.

Le contenu sur Casablanca (`content/city.js`) reste commun à tous vos appartements.
