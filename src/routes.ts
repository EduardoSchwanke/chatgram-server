import express from 'express'

export const routes = express.Router()

routes.get('/', (request, response) => {
    response.send('hello world')
})