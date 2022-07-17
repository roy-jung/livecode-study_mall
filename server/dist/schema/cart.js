"use strict";
var __makeTemplateObject = (this && this.__makeTemplateObject) || function (cooked, raw) {
    if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
    return cooked;
};
Object.defineProperty(exports, "__esModule", { value: true });
var apollo_server_express_1 = require("apollo-server-express");
var cartSchema = (0, apollo_server_express_1.gql)(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n  type CartItem {\n    id: ID!\n    amount: Int!\n    product: Product!\n  }\n  extend type Query {\n    cart: [CartItem!]\n  }\n  extend type Mutation {\n    addCart(id: ID!): CartItem!\n    updateCart(id: ID!, amount: Int!): CartItem!\n    deleteCart(id: ID!): ID!\n    executePay(ids: [ID!]): [ID!]\n  }\n"], ["\n  type CartItem {\n    id: ID!\n    amount: Int!\n    product: Product!\n  }\n  extend type Query {\n    cart: [CartItem!]\n  }\n  extend type Mutation {\n    addCart(id: ID!): CartItem!\n    updateCart(id: ID!, amount: Int!): CartItem!\n    deleteCart(id: ID!): ID!\n    executePay(ids: [ID!]): [ID!]\n  }\n"])));
exports.default = cartSchema;
var templateObject_1;
