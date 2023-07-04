import express from 'express'
import { justifyController } from '../controllers/justifyController'
const justifyRouter = express.Router()

justifyRouter.post('/',justifyController.justifyText)

export default justifyRouter