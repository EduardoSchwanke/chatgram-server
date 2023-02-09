import express from 'express'
import { v4 } from 'uuid'
import { z } from 'zod'
const Auth = require('./models/Auth')

export const routes = express.Router()

routes.get('/', async (request, response) => {
    try{
        const Users = await Auth.find()
        return response.status(201).json( Users )
    }catch(err){
        return response.status(400).json({ error: 'error'})
    }
})

routes.delete('/:id', async (request, response) => {
    const id  = request.params.id
    try{
        await Auth.deleteOne({_id: id})
        return response.status(201).json({ message: 'user deleted with sucefully' })
    }catch(err){
        return response.status(400).json({ error: 'error'})
    }
})

routes.post('/signup', async (request, response) => {

    const FormData = z.object({
        username: 
            z.string()
            .min(3, { message: 'username need more 3 character' })
            .max(18, { message: 'username need less 19 character' }),

        userUniqueName: 
            z.string()
            .min(3, { message: 'your @ need more 3 character' })
            .max(18, { message: 'your @ need less 19 character' }),
        password: 
            z.string()
            .min(3, { message: 'password need more 3 character' })
            .max(18, { message: 'password need less 19 character' }) ,
      });

    const {username, userUniqueName, password} = FormData.parse(request.body)

    const auth = new Auth({
        _id: v4(),
        username: username,
        userUniqueName: userUniqueName,
        password: password
    })

    try {
        await auth.save()
        return response.status(201).json({ message: 'user created with sucefully!' })
    }catch(err){
        return response.status(400).json({ error: 'error'})
    }
})

routes.post('/login', async (request, response) => {

    const FormData = z.object({
        name: z.string(),
        password: z.string()
    })

    const { name, password } = FormData.parse(request.body)

    try {
        const user = await Auth.findOne({ 
            username: name, 
            password: password 
        })
        if(user){
            return response.status(201).json( user ) 
        }else{
            const user = await Auth.findOne({ 
                userUniqueName: name, 
                password: password 
            })
            if(user){
                return response.status(201).json( user ) 
            }else{
                return response.status(400).json({ error: 'error'})
            }
        }
    }catch(err){
        return response.status(400).json({ error: 'error'})
    }
})
