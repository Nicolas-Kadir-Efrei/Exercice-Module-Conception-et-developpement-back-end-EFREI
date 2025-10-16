import express from 'express'
import path from 'path'
import { fileURLToPath } from 'url'

// Obtenir le chemin du répertoire actuel en ES modules
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const app = express()
const port = 3000

// Middleware pour parser le JSON
const jsonBodyMiddleware = express.json()
console.log(jsonBodyMiddleware) // Affiche le middleware comme dans l'exemple

// Création d'un middleware de logging
function loggerMiddleware(req, res, next) {
  console.log("Nouvelle requête entrante")
  // Afficher le contenu de req.body pour démontrer l'ordre des middlewares
  console.log("req.body avant json middleware:", req.body)
  next()
}

// Mon propre middleware comme dans l'exemple
function monPropreMiddleware(req, res, next) {
  console.log("Je déteste le js")
  // Un middleware doit soit utiliser next soit envoyer la réponse lui-même
  next()
}

// Démonstration de l'ordre des middlewares
// 1. Logger d'abord (avant le parsing JSON)
app.use(loggerMiddleware)

// 2. Parser JSON ensuite
app.use(jsonBodyMiddleware)

// 3. Mon propre middleware
app.use(monPropreMiddleware)

// 4. Servir les fichiers statiques
// Le middleware express.static sert les fichiers du dossier spécifié
app.use(express.static(path.join(__dirname, 'public')))

// Routes
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'templates', 'index.html'))
})

app.get('/test2', monPropreMiddleware, (req, res) => {
  res.send('Hello 2')
})

app.post('/api/data', (req, res) => {
  console.log('Contenu de req.body après json middleware:', req.body)
  res.json({ message: 'Données reçues', data: req.body })
})

// Démarrage du serveur
app.listen(port, () => {
  console.log(`Serveur démarré sur le port ${port}`)
  console.log(`Ouvrez http://localhost:${port} dans votre navigateur`)
})
