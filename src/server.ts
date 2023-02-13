import express from 'express'
import { connectToDatabase } from './database'
import { routes } from './routes'
const cors = require('cors')

connectToDatabase()

const app = express()

app.use(cors())
app.use(express.json())
app.use(routes)

app.listen(3333, () => {
    console.log('server is running...')
})