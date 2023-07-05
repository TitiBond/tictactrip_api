import { user } from '../models/user'
import { Request, Response } from 'express';
import User from '../types/user'

export const justifyController = {

    justifyText :async (req: Request,res : Response) => {
        const textToJustify  = req.body

        //text and justification processing
        const justifiedText = justifyText(textToJustify)


        try {
            res.status(200).send(`${justifiedText}`)
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



function justifyText(text:string): string{

    //const specialCharacter = ["\n", "\t", "\r", " "]
    //const specialCharacter = /[\n\r\ ]/
    const specialCharacter = /\s{1,}/
    const maxChar: number = 80
    const words = text.split(specialCharacter)
    const rows: string[] = text.split("\n")

    //array to save the word number before a line break
    const wordBeforeLineBreakArray: number[] = []

    //array to save word number for each justified rows
    const wordBeforeLineJustifyArray: number[][] = []


    for (let index = 0; index < words.length; index++) {
        const element = words[index];
        console.log(index + " : " + element )
    }
    console.log(words.length)
    
    
    let charCount = 0
    let wordCount = 0

    //calculate words number before line break
       rows.forEach(row =>{
        wordBeforeLineBreakArray.push(row.split(" ").length)
    })

    let newText: string[] = []

    //calculate word number in each rows
    for (let i = 0; i < words.length; i++) {
        if(i == words.length-1){
            charCount += words[i].length
            wordCount++
            wordBeforeLineJustifyArray.push([wordCount,charCount])
            charCount = 0
            wordCount = 0
        }  
        if (charCount+words[i].length + wordCount+1  <= maxChar){
            charCount += words[i].length
            wordCount++ 
        }else{
            wordBeforeLineJustifyArray.push([wordCount,charCount])
            charCount = 0
            wordCount = 0
        }   
        
    }


    let currentWord = 0
    for (let i = 0; i < wordBeforeLineJustifyArray.length; i++) {
        for (let y = currentWord ; y < currentWord+wordBeforeLineJustifyArray[i][0] ; y++) {
            
            newText[i] += " " + words[y]

        }
        currentWord += wordBeforeLineJustifyArray[i][0]
    }


    
    console.log(wordBeforeLineJustifyArray)
    console.log(newText)

    
    return `${text} texte justifé`
}