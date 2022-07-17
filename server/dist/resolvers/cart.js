"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var dbController_1 = require("../dbController");
var setJSON = function (data) { return (0, dbController_1.writeDB)(dbController_1.DBField.CART, data); };
var cartResolver = {
    Query: {
        cart: function (parent, args, _a) {
            var db = _a.db;
            return db.cart;
        },
    },
    Mutation: {
        addCart: function (parent, _a, _b) {
            var id = _a.id;
            var db = _b.db;
            if (!id)
                throw Error('상품id가 없다!');
            var targetProduct = db.products.find(function (item) { return item.id === id; });
            if (!targetProduct) {
                throw new Error('상품이 없습니다');
            }
            var existCartIndex = db.cart.findIndex(function (item) { return item.id === id; });
            if (existCartIndex > -1) {
                var newCartItem = {
                    id: id,
                    amount: db.cart[existCartIndex].amount + 1,
                };
                db.cart.splice(existCartIndex, 1, newCartItem);
                setJSON(db.cart);
                return newCartItem;
            }
            var newItem = {
                id: id,
                amount: 1,
            };
            db.cart.push(newItem);
            setJSON(db.cart);
            return newItem;
        },
        updateCart: function (parent, _a, _b) {
            var id = _a.id, amount = _a.amount;
            var db = _b.db;
            var existCartIndex = db.cart.findIndex(function (item) { return item.id === id; });
            if (existCartIndex < 0) {
                throw new Error('없는 데이터입니다');
            }
            var newCartItem = {
                id: id,
                amount: amount,
            };
            db.cart.splice(existCartIndex, 1, newCartItem);
            setJSON(db.cart);
            return newCartItem;
        },
        deleteCart: function (parent, _a, _b) {
            var id = _a.id;
            var db = _b.db;
            var existCartIndex = db.cart.findIndex(function (item) { return item.id === id; });
            if (existCartIndex < 0) {
                throw new Error('없는 데이터입니다');
            }
            db.cart.splice(existCartIndex, 1);
            setJSON(db.cart);
            return id;
        },
        executePay: function (parent, _a, _b) {
            var ids = _a.ids;
            var db = _b.db;
            var newCartData = db.cart.filter(function (cartItem) { return !ids.includes(cartItem.id); });
            db.cart = newCartData;
            setJSON(db.cart);
            return ids;
        },
    },
    CartItem: {
        product: function (cartItem, args, _a) {
            var db = _a.db;
            return db.products.find(function (product) { return product.id === cartItem.id; });
        },
    },
};
exports.default = cartResolver;
