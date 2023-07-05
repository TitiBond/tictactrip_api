"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.justifyController = void 0;
const user_1 = require("../models/user");
exports.justifyController = {
    justifyText: async (req, res) => {
        const textToJustify = req.body;
        //text and justification processing
        const justifiedText = justifyText(textToJustify);
        try {
            res.status(200).send(`${justifiedText}`);
        }
        catch (error) {
            res.json({
                message: "coucou"
            });
        }
    },
    getUniqueToken: async (req, res) => {
        const { email } = req.body;
        user_1.user.getUserbyEmail(email, (error, user) => {
            if (error) {
                res.status(500).json({
                    errorMessage: error.message
                });
            }
            res.status(200).json({
                data: user
            });
        });
    }
};
function justifyText(text) {
    const specialCharacter = /\s{1,}/;
    const maxChar = 80;
    const words = text.split(specialCharacter);
    const rows = text.split("\n");
    //array to save the word number before a line break
    const wordBeforeLineBreakArray = [];
    //array to save word number for each justified rows
    const wordBeforeLineJustifyArray = [];
    //calculate words number before line break
    rows.forEach(row => {
        wordBeforeLineBreakArray.push(row.split(" ").length);
    });
    let newText = [];
    let charCount = 0;
    let wordCount = 0;
    //calculate word number in each rows
    for (let i = 0; i < words.length; i++) {
        if (charCount + words[i].length + wordCount <= maxChar) {
            charCount += words[i].length;
            wordCount++;
        }
        else {
            wordBeforeLineJustifyArray.push(wordCount);
            charCount = words[i].length;
            wordCount = 1;
        }
        if (i == words.length - 1) {
            wordBeforeLineJustifyArray.push(wordCount);
            charCount = 0;
            wordCount = 0;
        }
    }
    let currentWord = 0;
    for (let i = 0; i < wordBeforeLineJustifyArray.length; i++) {
        newText[i] = "";
        for (let y = currentWord; y < currentWord + wordBeforeLineJustifyArray[i]; y++) {
            newText[i] += (newText[i] == "") ? words[y] : " " + words[y];
        }
        currentWord += wordBeforeLineJustifyArray[i];
    }
    words.forEach(w => {
        console.log(w);
    });
    console.log(wordBeforeLineJustifyArray);
    console.log(newText);
    //console.log(wordBeforeLineBreakArray)
    newText.forEach(row => {
        const spaceToAdd = maxChar - row.length;
        console.log(`taille : ${row.length}  et espace : ${spaceToAdd}`);
    });
    return `${text} texte justifé`;
}
