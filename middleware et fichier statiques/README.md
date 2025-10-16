# Démonstration des Middlewares et Fichiers Statiques en Express

## Qu'est-ce qu'un middleware en Express ?

Un middleware en Express est une fonction qui a accès à l'objet de requête (req), à l'objet de réponse (res) et à la fonction middleware suivante dans le cycle de requête-réponse de l'application. Ces fonctions peuvent :

- Exécuter n'importe quel code
- Modifier les objets de requête et de réponse
- Terminer le cycle de requête-réponse
- Appeler le middleware suivant dans la pile

La signature d'une fonction middleware est :
```javascript
function monMiddleware(req, res, next) {
  // Code du middleware
  next(); // Appel au middleware suivant
}
```

## À quoi sert le paramètre `next` ?

Le paramètre `next` est une fonction fournie par Express qui, lorsqu'elle est appelée, exécute le middleware suivant dans la pile. Si `next()` n'est pas appelé à l'intérieur d'un middleware, la requête reste "bloquée" et aucune réponse n'est envoyée au client.

Il existe deux façons de terminer le cycle de requête-réponse :
1. Appeler `next()` pour passer au middleware suivant
2. Envoyer une réponse avec `res.send()`, `res.json()`, etc.

## L'importance de l'ordre des middlewares

L'ordre dans lequel les middlewares sont définis avec `app.use()` est crucial :

- Les middlewares sont exécutés dans l'ordre où ils sont définis
- Si le middleware `loggerMiddleware` est placé avant `express.json()`, alors `req.body` sera vide lors de son exécution
- Si `express.json()` est placé avant `loggerMiddleware`, alors `req.body` sera rempli avec les données JSON

## Fichiers statiques avec Express

Express peut servir des fichiers statiques (HTML, CSS, JavaScript, images, etc.) en utilisant le middleware `express.static` :

```javascript
app.use(express.static('public'))
```

Cette ligne permet à Express de servir tous les fichiers du dossier 'public' directement. Par exemple :
- Le fichier `public/styles.css` sera accessible via l'URL `/styles.css`
- Le fichier `public/images/logo.png` sera accessible via l'URL `/images/logo.png`

## Comment exécuter l'application

1. Assurez-vous d'avoir Node.js installé
2. Installez les dépendances : `npm install`
3. Exécutez l'application : `node app_updated.js`
4. Ouvrez votre navigateur à l'adresse : `http://localhost:3000`

## Structure des fichiers

- `app_updated.js` : Application Express avec middlewares et fichiers statiques
- `templates/index.html` : Page HTML d'exemple
- `public/styles.css` : Feuille de style CSS (texte en rouge)
