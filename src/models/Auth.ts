import mongoose from "mongoose"; 

const authSchema = new mongoose.Schema(
    {
        _id: {
            type: String,
            required: true
        },
        username: {
            type: String,
            required: true
        },
        userUniqueName: {
            type: String,
            required: true,
        },
        password: {
            type: String,
            required: true,
        },
    }
)

module.exports = mongoose.model('Auth', authSchema)