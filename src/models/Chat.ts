import mongoose from "mongoose"; 

const chatSchema = new mongoose.Schema(
    {
        userOne: {
            type: [],
            required: true
        },
        userTwo: {
            type: [],
            required: true
        },
        chatRoom: {
            type: [[]],
            required: true,
        },
    }
)

module.exports = mongoose.model('Chat', chatSchema)