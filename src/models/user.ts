import user from '../types/user'
import connection from '../db-config'
import { OkPacket, RowDataPacket } from 'mysql2'
import User from '../types/user'

export const user = {
    getUserbyEmail : (email: string, callback: Function)=> {
        const queryString = "SELECT * FROM user WHERE email = ?"

        connection.query(queryString, [email], (error, result)=>{
            if(error) {
                callback(error)
            } 

            const row = (<RowDataPacket> result)[0]
            const user: User = {
                id : row.id,
                email : row.email
            }

            callback(null, user)
        })
    }
}