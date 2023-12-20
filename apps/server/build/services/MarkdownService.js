"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MarkdownService = void 0;
var showdown_1 = __importDefault(require("showdown"));
var juice_1 = __importDefault(require("juice"));
var converter = new showdown_1.default.Converter();
var MarkdownService = /** @class */ (function () {
    function MarkdownService() {
    }
    MarkdownService.formatMarkdownToHtml = function (markdown) {
        var html = "<body><div class=\"container\">".concat(converter.makeHtml(markdown), "</div></body>");
        console.log(juice_1.default.inlineContent(html, styles));
        return juice_1.default.inlineContent(html, styles);
    };
    return MarkdownService;
}());
exports.MarkdownService = MarkdownService;
var styles = "\n    body {\n        font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;\n        font-size: 16px;\n        line-height: 1.5;\n        color: #555;\n        margin: 0;\n        padding: 40px;\n        display: flex;\n        justify-content: center;\n        align-items: center;\n    }\n    .container {\n        max-width: 600px; // Changed to 400px as requested\n        margin: 0 auto;\n        background-color: #ffffff;\n        border-radius: 8px;\n    }\n    h1 {\n        font-size: 24px;\n        margin-top: 0;\n    }\n    h2 {\n        font-size: 20px;\n    }\n    p {\n        margin-bottom: 20px;\n        font-weight: '200';\n    }\n    a {\n        color: #3498db;\n        text-decoration: none;\n        border-bottom: 1px solid #3498db;\n        padding-bottom: 2px;\n    }\n    a:hover {\n        opacity: 0.8;\n    }\n    button {\n        background-color: #3498db;\n        color: #ffffff;\n        border: none;\n        border-radius: 4px;\n        padding: 10px 20px;\n        cursor: pointer;\n        text-transform: uppercase;\n        font-weight: bold;\n        letter-spacing: 1px;\n    }\n    button:hover {\n        background-color: #2980b9;\n    }\n";
//# sourceMappingURL=MarkdownService.js.map