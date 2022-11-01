"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var server_1 = require("../server");
var express_1 = __importDefault(require("express"));
var express_session_1 = __importDefault(require("express-session"));
var connect_mongodb_session_1 = __importDefault(require("connect-mongodb-session"));
/**
 *
 * Declaring some middleware functions.
 *
 */
server_1.app.use(express_1.default.json());
server_1.app.use(express_1.default.urlencoded({ extended: true }));
server_1.app.set('etag', false);
/**
 *
 * Initializing the sessions and how they're stored in mongoDB
 *
 */
var MongoDBStore = (0, connect_mongodb_session_1.default)(express_session_1.default);
server_1.app.use((0, express_session_1.default)({
    secret: 'secret',
    resave: true,
    saveUninitialized: true,
    cookie: {
        secure: false,
        maxAge: 24 * 60 * 60 * 1000,
        sameSite: true
    },
    store: new MongoDBStore({
        uri: 'mongodb://127.0.0.1:27017/?directConnection=true&serverSelectionTimeoutMS=2000&appName=mongosh+1.6.0',
        databaseName: 'test',
        collection: 'User Sessions',
        expires: 1000 * 60 * 60 * 24
    })
}));
//# sourceMappingURL=serverConfig.js.map