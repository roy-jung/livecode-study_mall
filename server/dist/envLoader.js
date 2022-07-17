"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var path_1 = require("path");
var dotenv_1 = __importDefault(require("dotenv"));
if (!process.env.NODE_ENV)
    throw new Error('need NODE_ENV');
dotenv_1.default.config({ path: (0, path_1.resolve)((0, path_1.resolve)(), ".env.".concat(process.env.NODE_ENV)) });
exports.default = process.env;
