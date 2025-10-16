import express from 'express'
const app = express()
const port = 3000

// Middleware pour parser le JSON
const jsonBodyMiddleware = express.json()
app.use(jsonBodyMiddleware)

// Création d'un middleware de logging
function loggerMiddleware(req, res, next) {
  console.log("Nouvelle requête entrante")
  next()
}

// Application du middleware de logging
app.use(loggerMiddleware)

// Routes
app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.post('/api/data', (req, res) => {
  console.log(req.body) // Accessible grâce au middleware express.json()
  res.json({ message: 'Données reçues', data: req.body })
})

// Démarrage du serveur
app.listen(port, () => {
  console.log(`Serveur démarré sur le port ${port}`)
})
