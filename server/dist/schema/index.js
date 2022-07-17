"use strict";
var __makeTemplateObject = (this && this.__makeTemplateObject) || function (cooked, raw) {
    if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
    return cooked;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var apollo_server_express_1 = require("apollo-server-express");
var product_1 = __importDefault(require("./product"));
var cart_1 = __importDefault(require("./cart"));
var linkSchema = (0, apollo_server_express_1.gql)(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n  type Query {\n    _: Boolean\n  }\n  type Mutation {\n    _: Boolean\n  }\n"], ["\n  type Query {\n    _: Boolean\n  }\n  type Mutation {\n    _: Boolean\n  }\n"])));
exports.default = [linkSchema, product_1.default, cart_1.default];
var templateObject_1;
