import { user } from '../models/user'
import { Request, Response } from 'express';
import User from '../types/user'

export const justifyController = {
    justifyText :async (req: Request,res : Response) => {
        try {
            res.status(200).json({
                message : "coucou"
            })
        } catch (error) {
            res.json({
                message : "coucou"
            })
        }
        
    },

    getUniqueToken : async(req: Request, res:Response)=> {
        const { email } = req.body
        user.getUserbyEmail(email, (error: Error, user: User) =>{
            if(error) {
                res.status(500).json({
                    errorMessage: error.message
                })
            }

            res.status(200).json({
                data: user
            })
        })
    }
}