"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.justifyController = void 0;
const user_1 = require("../models/user");
exports.justifyController = {
    justifyText: async (req, res) => {
        try {
            res.status(200).json({
                message: "coucou"
            });
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
