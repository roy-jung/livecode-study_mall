"use strict";
var __makeTemplateObject = (this && this.__makeTemplateObject) || function (cooked, raw) {
    if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
    return cooked;
};
Object.defineProperty(exports, "__esModule", { value: true });
var apollo_server_express_1 = require("apollo-server-express");
var productSchema = (0, apollo_server_express_1.gql)(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n  type Product {\n    id: ID!\n    imageUrl: String!\n    price: Int!\n    title: String!\n    description: String\n    createdAt: Float\n  }\n\n  extend type Query {\n    products(cursor: ID, showDeleted: Boolean): [Product!]\n    product(id: ID!): Product!\n  }\n\n  extend type Mutation {\n    addProduct(imageUrl: String!, price: Int!, title: String!, description: String!): Product!\n    updateProduct(\n      id: ID!\n      imageUrl: String\n      price: Int\n      title: String\n      description: String\n    ): Product!\n    deleteProduct(id: ID!): ID!\n  }\n"], ["\n  type Product {\n    id: ID!\n    imageUrl: String!\n    price: Int!\n    title: String!\n    description: String\n    createdAt: Float\n  }\n\n  extend type Query {\n    products(cursor: ID, showDeleted: Boolean): [Product!]\n    product(id: ID!): Product!\n  }\n\n  extend type Mutation {\n    addProduct(imageUrl: String!, price: Int!, title: String!, description: String!): Product!\n    updateProduct(\n      id: ID!\n      imageUrl: String\n      price: Int\n      title: String\n      description: String\n    ): Product!\n    deleteProduct(id: ID!): ID!\n  }\n"])));
exports.default = productSchema;
var templateObject_1;
