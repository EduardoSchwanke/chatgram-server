import mongoose from "mongoose"; 

const chatSchema = new mongoose.Schema(
    {
        userOne: {
            type: String,
            required: true
        },
        userTwo: {
            type: String,
            required: true
        },
        chatRoom: {
            type: [[String, String]],
            required: true,
        },
    }
)

module.exports = mongoose.model('Chat', chatSchema)