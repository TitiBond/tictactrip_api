import dotenv from 'dotenv'
dotenv.config()
import bodyParser from 'body-parser'

import justifyRouter from './routes/justifyRouter'

import express from 'express'
const app = express()

app.use(express.json())
app.use(bodyParser.text())
app.use('/api/justify', justifyRouter)


app.listen(process.env.PORT, ()=>{
    console.log(`Server is running on port ${process.env.PORT}...`)
})