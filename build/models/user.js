"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.user = void 0;
const db_config_1 = __importDefault(require("../db-config"));
exports.user = {
    getUserbyEmail: (email, callback) => {
        const queryString = "SELECT * FROM user WHERE email = ?";
        db_config_1.default.query(queryString, [email], (error, result) => {
            if (error) {
                callback(error);
            }
            const row = result[0];
            const user = {
                id: row.id,
                email: row.email
            };
            callback(null, user);
        });
    }
};
