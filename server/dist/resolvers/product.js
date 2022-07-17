"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
Object.defineProperty(exports, "__esModule", { value: true });
var uuid_1 = require("uuid");
var dbController_1 = require("../dbController");
var setJSON = function (data) { return (0, dbController_1.writeDB)(dbController_1.DBField.PRODUCTS, data); };
var productResolver = {
    Query: {
        products: function (parent, _a, _b) {
            var _c = _a.cursor, cursor = _c === void 0 ? '' : _c, _d = _a.showDeleted, showDeleted = _d === void 0 ? false : _d;
            var db = _b.db;
            var _e = [
                db.products
                    .filter(function (product) { return !!product.createdAt; })
                    .sort(function (a, b) { return b.createdAt - a.createdAt; }),
                db.products.filter(function (product) { return !product.createdAt; }),
            ], hasCreatedAt = _e[0], noCreatedAt = _e[1];
            var filteredDB = showDeleted ? __spreadArray(__spreadArray([], hasCreatedAt, true), noCreatedAt, true) : hasCreatedAt;
            var fromIndex = filteredDB.findIndex(function (product) { return product.id === cursor; }) + 1;
            return filteredDB.slice(fromIndex, fromIndex + 15) || [];
        },
        product: function (parent, _a, _b) {
            var id = _a.id;
            var db = _b.db;
            var found = db.products.find(function (item) { return item.id === id; });
            if (found)
                return found;
            return null;
        },
    },
    Mutation: {
        addProduct: function (parent, _a, _b) {
            var imageUrl = _a.imageUrl, price = _a.price, title = _a.title, description = _a.description;
            var db = _b.db;
            var newProduct = {
                id: (0, uuid_1.v4)(),
                imageUrl: imageUrl,
                price: price,
                title: title,
                description: description,
                createdAt: Date.now(),
            };
            db.products.push(newProduct);
            setJSON(db.products);
            return newProduct;
        },
        updateProduct: function (parent, _a, _b) {
            var id = _a.id, data = __rest(_a, ["id"]);
            var db = _b.db;
            var existProductIndex = db.products.findIndex(function (item) { return item.id === id; });
            if (existProductIndex < 0) {
                throw new Error('없는 상품입니다');
            }
            var updatedItem = __assign(__assign({}, db.products[existProductIndex]), data);
            db.products.splice(existProductIndex, 1, updatedItem);
            setJSON(db.products);
            return updatedItem;
        },
        deleteProduct: function (parent, _a, _b) {
            var id = _a.id;
            var db = _b.db;
            // 실제 db에서 delete를 하는 대신, createdAt을 지워준다.
            var existProductIndex = db.products.findIndex(function (item) { return item.id === id; });
            if (existProductIndex < 0) {
                throw new Error('없는 상품입니다');
            }
            var updatedItem = __assign({}, db.products[existProductIndex]);
            delete updatedItem.createdAt;
            db.products.splice(existProductIndex, 1, updatedItem);
            setJSON(db.products);
            return id;
        },
    },
};
exports.default = productResolver;
