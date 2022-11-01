"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = __importStar(require("react"));
var client_1 = require("react-dom/client");
var Header_1 = __importDefault(require("./parts/Header"));
function printCoordinate(coordinate) {
    return "".concat(coordinate[0], ",").concat(coordinate[1]);
}
var App = function (props) {
    var _a = (0, react_1.useState)([{
            startingPoint: [100, 250],
            curves: [
                {
                    firstHandle: [100, 100],
                    secondHandle: [400, 100],
                    end: [400, 250]
                },
                {
                    firstHandle: [700, 100],
                    secondHandle: [700, 400],
                    end: [700, 250]
                }
            ]
        }]), shapes = _a[0], setShapes = _a[1];
    var renderedShapes = shapes.map(function (shape, i) {
        var curveInstrunctions = shape.curves.map(function (curve) {
            return "C".concat(printCoordinate(curve.firstHandle), " ").concat(printCoordinate(curve.secondHandle), " ").concat(printCoordinate(curve.end), " ");
        });
        return react_1.default.createElement("div", { key: i },
            react_1.default.createElement("svg", { width: "1000", height: "1000", xmlns: "http://www.w3.org/2000/svg" },
                react_1.default.createElement("path", { d: "M".concat(printCoordinate(shape.startingPoint), " ").concat(curveInstrunctions) })));
    });
    return (react_1.default.createElement(react_1.default.Fragment, null,
        react_1.default.createElement(Header_1.default, { serverProps: props.ServerProps }),
        react_1.default.createElement("main", null, renderedShapes)));
};
if (typeof window !== 'undefined') {
    (0, client_1.hydrateRoot)(document.getElementById('root'), react_1.default.createElement(App, { ServerProps: window.ServerProps }));
}
exports.default = App;
//# sourceMappingURL=App.js.map