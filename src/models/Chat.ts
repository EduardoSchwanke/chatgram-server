import mongoose from "mongoose"; 

const chatSchema = new mongoose.Schema(
    {
        userOne: {
            type: String,
            required: true
        },
        UserTwo: {
            type: String,
            required: true
        },
        chatRoom: {
            type: {},
            required: true,
        },
    }
)

module.exports = mongoose.model('Chat', chatSchema)