"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = __importDefault(require("react"));
var Header = function (props) {
    var _a;
    return (react_1.default.createElement("header", { id: "header" }, ((_a = props.serverProps) === null || _a === void 0 ? void 0 : _a.isAdmin) ? react_1.default.createElement(react_1.default.Fragment, null,
        react_1.default.createElement("a", { href: '/admin' }, "Account"),
        react_1.default.createElement("a", { href: '/user/logout' }, "Log Out"),
        react_1.default.createElement("a", { style: { textDecoration: 'none' }, href: '/' },
            react_1.default.createElement("h2", null, "Home"))) : react_1.default.createElement(react_1.default.Fragment, null,
        react_1.default.createElement("a", { href: '/user/login' }, "Login"),
        react_1.default.createElement("a", { style: { textDecoration: 'none' }, href: '/' },
            react_1.default.createElement("h2", null, "Home")))));
};
exports.default = Header;
//# sourceMappingURL=Header.js.map