"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var product_1 = __importDefault(require("./product"));
var cart_1 = __importDefault(require("./cart"));
exports.default = [product_1.default, cart_1.default];
