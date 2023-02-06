
import express from 'express'
import { connectToDatabase } from './database'
import { routes } from './routes'

connectToDatabase()

const app = express()

app.use(routes)

app.listen(3333, () => {
    console.log('server is running...')
})