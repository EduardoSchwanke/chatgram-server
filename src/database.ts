require('dotenv').config()
import mongoose from 'mongoose'
mongoose.set("strictQuery", true);

export function connectToDatabase() {
    mongoose.connect(process.env.DATABASE_URL!)

    const db = mongoose.connection
    db.on('error', (error) => console.log(error))
    db.once('open', () => console.log('database is running...'))
}
