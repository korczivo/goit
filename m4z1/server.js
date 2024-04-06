import express from 'express'
import cors from 'cors'
import mongoose from "mongoose";
import dotenv from 'dotenv'
import api from './routes/index.js'
import jwtStrategy from './config/jwt.js'

dotenv.config()
const {DB_HOST: dbUrl} = process.env;

const app = express()
app.use(express.json())
app.use(cors())

jwtStrategy()

app.use('/api', api)

const connection = mongoose.connect(dbUrl)

connection.then(() => {
    app.listen(8000, () => {
        console.log('Server is running, db connected')
    })
})
