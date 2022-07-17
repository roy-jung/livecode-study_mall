"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var apollo_server_express_1 = require("apollo-server-express");
var schema_1 = __importDefault(require("./schema"));
var resolvers_1 = __importDefault(require("./resolvers"));
var envLoader_1 = __importDefault(require("./envLoader"));
var dbController_1 = require("./dbController");
(function () { return __awaiter(void 0, void 0, void 0, function () {
    var clientUrl, port, server, app;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                clientUrl = envLoader_1.default.CLIENT_URL;
                port = envLoader_1.default.PORT || 8000;
                server = new apollo_server_express_1.ApolloServer({
                    typeDefs: schema_1.default,
                    resolvers: resolvers_1.default,
                    context: {
                        db: {
                            products: (0, dbController_1.readDB)(dbController_1.DBField.PRODUCTS),
                            cart: (0, dbController_1.readDB)(dbController_1.DBField.CART),
                        },
                    },
                });
                app = (0, express_1.default)();
                return [4 /*yield*/, server.start()];
            case 1:
                _a.sent();
                server.applyMiddleware({
                    app: app,
                    path: '/graphql',
                    cors: {
                        origin: [clientUrl, 'https://studio.apollographql.com'],
                        credentials: true,
                    },
                });
                return [4 /*yield*/, app.listen({ port: port })];
            case 2:
                _a.sent();
                console.log("server listening on ".concat(port, "..."));
                return [2 /*return*/];
        }
    });
}); })();
