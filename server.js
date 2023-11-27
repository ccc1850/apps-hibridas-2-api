import express from 'express'
import GamesRoute from './routes/games.js'
import UserRoute from './routes/auth.js'
import NewsRoute from './routes/news.js'
import cors from 'cors'

const app = express()
app.use(express.json()) 
app.use(cors())

app.use('/api/v0', GamesRoute)
app.use('/api/v0', NewsRoute)
app.use(UserRoute)

app.listen(2023, function () {
  console.log("Servidor activo en: http://localhost:2023")
})