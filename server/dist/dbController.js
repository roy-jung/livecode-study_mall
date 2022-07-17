"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
exports.writeDB = exports.readDB = exports.DBField = void 0;
var fs_1 = __importDefault(require("fs"));
var path_1 = require("path");
var DBField;
(function (DBField) {
    DBField["CART"] = "cart";
    DBField["PRODUCTS"] = "products";
})(DBField = exports.DBField || (exports.DBField = {}));
var basePath = (0, path_1.resolve)();
var filenames = (_a = {},
    _a[DBField.CART] = (0, path_1.resolve)(basePath, 'src/db/cart.json'),
    _a[DBField.PRODUCTS] = (0, path_1.resolve)(basePath, 'src/db/products.json'),
    _a);
var readDB = function (target) {
    try {
        return JSON.parse(fs_1.default.readFileSync(filenames[target], 'utf-8'));
    }
    catch (err) {
        console.error(err);
    }
};
exports.readDB = readDB;
var writeDB = function (target, data) {
    try {
        fs_1.default.writeFileSync(filenames[target], JSON.stringify(data, null, '  '));
    }
    catch (err) {
        console.error(err);
    }
};
exports.writeDB = writeDB;
