"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var server_1 = require("react-dom/server");
function exportHTML(reactComponent, fileName, inputServerProps) {
    if (!inputServerProps)
        inputServerProps = {};
    return ('<!DOCTYPE html>' +
        '<html lang="en">' +
        '<head>' +
        '<meta charset="utf-8" />' +
        '<link rel="icon" href="#" />' +
        '<meta name="viewport" content="width=device-width, initial-scale=1" />' +
        '<meta name="theme-color" content="#000000" />' +
        '<meta name="description" content="Web site created using create-react-app"/>' +
        '<title>Web Builder</title>' +
        "<link rel=\"stylesheet\" type=\"text/css\" href=\"/CSS/".concat(fileName, ".css\">") +
        '<link rel="stylesheet" type="text/css" href="/CSS/global.css">' +
        "<script>window.ServerProps=".concat(JSON.stringify(inputServerProps), "</script>") +
        '</head>' +
        '<body>' +
        "<div id=\"root\">".concat((0, server_1.renderToString)(reactComponent), "</div>") +
        "<script src=\"/JS/".concat(fileName, ".js\"></script>") +
        '</body>' +
        '</html>');
}
exports.default = exportHTML;
//# sourceMappingURL=exportHTML.js.map