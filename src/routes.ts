import express from 'express'
import { v4 } from 'uuid'
import { z } from 'zod'
const Auth = require('./models/Auth')
const Chat = require('./models/Chat')

export const routes = express.Router()

routes.get('/:id', async (request, response) => {
    const id = request.params.id
    try{
        const User = await Auth.findOne({_id: id})
        return response.status(201).json( User )
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
        if(await Auth.findOne({userUniqueName: userUniqueName})){
            return response.status(400).json({ error: 'error'})
        }
        await auth.save()
        return response.status(201).json( auth )
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

routes.put('/:id', async (request, response) => {
    const id  = request.params.id
    const { username, userUniqueName, password } = request.body

    try {
        const user = await Auth.findById(id)
        await user.update({
            username: username,
            userUniqueName: userUniqueName,
            password: password
        })
        return response.status(201).json({ message: 'user update with sucefully' }) 
    }catch(err){
        return response.status(400).json({ error: 'error'})
    }
})

routes.post('/chat', async (request, response) => {
    const { one, two, chatRoom } = request.body

    try{
        const findChat = await Chat.find({userOne: one, UserTwo: two})
        const findChatTwo = await Chat.find({UserTwo: one, userOne: two})
        
        if(findChat.length <= 0 && findChatTwo <= 0){
            console.log(findChat, findChatTwo)
            const chat = new Chat({
                userOne: one,
                UserTwo: two,
                chatRoom: [chatRoom[0], chatRoom[1]]
            })
            await chat.save()
            return response.status(201).json(chat)
        }else{
            if(findChat.length > 0){
                await findChat[0].updateOne({$push: {'chatRoom' : chatRoom}})
                return response.status(201).json(findChat)
            }else{
                console.log('else')
                await findChatTwo[0].updateOne({$push: {'chatRoom' : chatRoom}})
                return response.status(201).json(findChatTwo)
            }
        }
    }catch(err){
        return response.status(400).json({ error: 'error'})
    }
})

/*routes.post('/chatConversation', async (request, response) => {
    const {one, two} = request.body

    try{
        const findChat = await Chat.findOne({
            userOne: one,
            UserTwo: two
        })
        return response.status(201).json(findChat.chatRoom)
    }catch(err){
        return response.status(400).json({ error: 'error'})
    }
})*/

routes.post('/chatConversation', async (request, response) => {
    const { one } = request.body

    try{
        const findChat = await Chat.find({$or: [{userOne: one}, {UserTwo: one}]})
        return response.status(201).json(findChat)
    }catch(err){
        return response.status(400).json({ error: 'error'})
    }
})
