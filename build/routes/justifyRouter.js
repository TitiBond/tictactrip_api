"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const justifyController_1 = require("../controllers/justifyController");
const justifyRouter = express_1.default.Router();
justifyRouter.post('/', justifyController_1.justifyController.justifyText);
exports.default = justifyRouter;
