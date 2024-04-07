# Portfolio-architecte-sophie-bluel

Code du projet 6 d'intégrateur web.

## Information pour le lancer le code

- Lancer le backend depuis votre terminal en suivant les instruction du fichier ReadMe.
- Si vous désirez afficher le code du backend et du frontend, faites le dans 2 instances de VSCode différentes pour éviter tout problème

## Ce que Thomas à fait :

### [**VITE**](https://vitejs.dev/)

  <p>Installation d'un environnement de développement front-end profitant des avantages des navigateurs d'aujourd'hui, moderne, simple et extrêmement rapide . <br /> <i> Dossier /client/ </i>

**Première visite :**

```bash
  $ cd client
  $ npm install
  $ npm run dev
```

**sinon juste**

```bash
  $ npm run dev
```

[LOCALHOST](http://localhost:5173) par défaut sur port 5173

</p>
<hr />

### Styles

- J'ai déplacé assets dans ./src pour y mettre les fichiers de styles => ./src/styles
- J'ai rajouté une feuille de style : normalize.css [DOCUMENTATION](https://grafikart.fr/tutoriels/reset-normalize-css-1096)

### Structure projet

- /client/ remplace /FrontEnd/
- les scripts sont dans le dossier /client/scripts/
- J'ai bougé les images dans le dossier ./public qui est déservit tel quel par le serveur de développement et de production

### JavaScript

- 3 fichiers de scripts : main.js, script.js et fetch.js
- index.html importe main.js qui active tout le javascript :
  - script.js contient toutes les fonctions de manipulation du DOM et de la data
  - fetch.js contient les fonctions de fetch

### Todo

- Chaque fichier possede des todos
