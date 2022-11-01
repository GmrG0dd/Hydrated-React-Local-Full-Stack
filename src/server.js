"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.app = void 0;
/**
 *
 * Initializing our express server.
 *
 */
var express_1 = __importDefault(require("express"));
exports.app = (0, express_1.default)();
/**
 *
 * Import utility functions / middleware before your routes
 *
 */
require("./utils/serverConfig");
require("./utils/authentication");
/**
 *
 * Declare your routes
 *
 */
var index_1 = __importDefault(require("./routes/index"));
var users_1 = __importDefault(require("./routes/users"));
var admin_1 = __importDefault(require("./routes/admin"));
exports.app.use('/', index_1.default);
exports.app.use('/user', users_1.default);
exports.app.use('/admin', admin_1.default);
/**
 *
 * Declaring static files in the assets folder and starting up server
 *
 */
exports.app.use('/assets', express_1.default.static('assets'));
exports.app.use('/CSS', express_1.default.static('src/public/CSS'));
exports.app.use('/JS', express_1.default.static('src/public/JS'));
exports.app.listen(3000);
//# sourceMappingURL=server.js.map