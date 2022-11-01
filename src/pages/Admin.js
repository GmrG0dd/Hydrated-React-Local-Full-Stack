"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = __importDefault(require("react"));
var client_1 = require("react-dom/client");
var Header_1 = __importDefault(require("./parts/Header"));
var Admin = function (props) {
    return (react_1.default.createElement(react_1.default.Fragment, null,
        react_1.default.createElement(Header_1.default, { serverProps: props.ServerProps }),
        react_1.default.createElement("main", null,
            react_1.default.createElement("h1", null, "Hi Admin (;"))));
};
if (typeof window !== 'undefined') {
    (0, client_1.hydrateRoot)(document.getElementById('root'), react_1.default.createElement(Admin, { ServerProps: window.ServerProps }));
}
exports.default = Admin;
//# sourceMappingURL=Admin.js.map