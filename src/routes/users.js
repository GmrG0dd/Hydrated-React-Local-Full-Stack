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
var passport_1 = __importDefault(require("passport"));
var crypto_1 = __importDefault(require("crypto"));
var react_1 = __importDefault(require("react"));
var exportHTML_1 = __importDefault(require("../utils/exportHTML"));
var Login_1 = __importDefault(require("../pages/Login"));
var Users_1 = require("../db/Users");
var users = express_1.default.Router();
users.route('/login')
    .post(passport_1.default.authenticate('local', { successRedirect: '/', failureRedirect: '/user/register' }))
    .get(function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        res.send((0, exportHTML_1.default)(react_1.default.createElement(Login_1.default, { ServerProps: req.session.serverProps }), 'Login', req.session.serverProps));
        return [2 /*return*/];
    });
}); });
users.route('/logout')
    .get(function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        req.logout(function () {
            res.redirect('/');
        });
        return [2 /*return*/];
    });
}); });
users.route('/register')
    .post(function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var salthash, user;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                salthash = generatePassword(req.body.password);
                user = {
                    passportid: crypto_1.default.randomBytes(32).toString('hex'),
                    username: req.body.username,
                    hash: salthash.hash,
                    salt: salthash.salt,
                    admin: true
                };
                return [4 /*yield*/, Users_1.User.findOne({ username: req.body.username }).exec()];
            case 1:
                if (_a.sent()) {
                    res.send(false);
                    return [2 /*return*/];
                }
                Users_1.User.create(user, function (err) {
                    if (err)
                        res.send(false);
                    else
                        res.send(true);
                    return;
                });
                return [2 /*return*/];
        }
    });
}); });
function generatePassword(password) {
    var salt = crypto_1.default.randomBytes(32).toString('hex');
    var genHash = crypto_1.default.pbkdf2Sync(password, salt, 10000, 64, 'sha512').toString('hex');
    return {
        salt: salt,
        hash: genHash
    };
}
exports.default = users;
//# sourceMappingURL=users.js.map