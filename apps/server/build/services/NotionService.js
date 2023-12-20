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
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
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
exports.NotionService = void 0;
var api_error_1 = require("../common/api_error");
var models_1 = require("../models");
var logger_1 = __importDefault(require("../utils/logger"));
var client_1 = require("@notionhq/client");
var OpenAiService_1 = require("./OpenAiService");
var UserService_1 = require("./UserService");
var Client = require("@notionhq/client").Client;
var NotionService = /** @class */ (function () {
    function NotionService() {
    }
    NotionService.pagePropertiesToPlainText = function (properties) {
        var text = "";
        for (var _i = 0, _a = Object.entries(properties); _i < _a.length; _i++) {
            var _b = _a[_i], key = _b[0], propNoCast = _b[1];
            var prop = propNoCast;
            switch (prop.type) {
                case "title":
                    text += "".concat(key, ": ").concat(prop.title
                        .map(function (t) { return t.plain_text; })
                        .join(""), "\n");
                    break;
                case "rich_text":
                    text += "".concat(key, ": ").concat(prop.rich_text
                        .map(function (t) { return t.plain_text; })
                        .join(""), "\n");
                    break;
                case "number":
                    text += "".concat(key, ": ").concat(prop.number, "\n");
                    break;
                case "select":
                    text += "".concat(key, ": ").concat(prop.select.name, "\n");
                    break;
                case "multi_select":
                    text += "".concat(key, ": ").concat(prop.multi_select
                        .map(function (s) { return s.name; })
                        .join(", "), "\n");
                    break;
                case "date":
                    text += "".concat(key, ": ").concat(prop.date.start).concat(prop.date.end ? " - ".concat(prop.date.end) : "", "\n");
                    break;
                case "checkbox":
                    text += "".concat(key, ": ").concat(prop.checkbox ? "Yes" : "No", "\n");
                    break;
                // Add more property types as needed, or handle them differently depending on your use-case
                default:
                    // Optional: log unhandled property types for future consideration
                    // console.warn('Unhandled property type:', prop.type);
                    break;
            }
        }
        return text.trim();
    };
    NotionService.registerUser = function (notionDatabaseUrl, emailAddress, introduction) {
        return __awaiter(this, void 0, void 0, function () {
            var databaseId, user;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        databaseId = NotionService.extractIdFromNotionUrl(notionDatabaseUrl);
                        console.log(databaseId);
                        return [4 /*yield*/, models_1.UserModel.findOne({ notionDatabaseId: databaseId })];
                    case 1:
                        user = (_a.sent()) ||
                            new models_1.UserModel();
                        console.log(user);
                        // Just update the user if it already exists
                        user.notionDatabaseId = databaseId;
                        user.emailAddress = emailAddress;
                        user.introduction = introduction;
                        return [4 /*yield*/, user.save()];
                    case 2:
                        _a.sent();
                        logger_1.default.info("Created user", user.toObject());
                        return [2 /*return*/, user.toObject()];
                }
            });
        });
    };
    NotionService.readAllUsers = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, models_1.UserModel.find({})];
            });
        });
    };
    NotionService.createWeeklyDigest = function (databaseId) {
        return __awaiter(this, void 0, void 0, function () {
            var user, oneWeekAgo, database, summaryInput, _i, _a, page, pageId, blocks, pageText;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0: return [4 /*yield*/, UserService_1.UserService.getUserByNotionDatabaseId(databaseId)];
                    case 1:
                        user = _b.sent();
                        if (!user)
                            throw new api_error_1.ApiError("User not found", 404);
                        oneWeekAgo = new Date(new Date().getTime() - 7 * 24 * 60 * 60 * 1000);
                        return [4 /*yield*/, NotionService.notionClient.databases.query({
                                database_id: databaseId,
                                filter: {
                                    property: "Created Time",
                                    date: {
                                        on_or_after: oneWeekAgo,
                                    },
                                },
                            })];
                    case 2:
                        database = _b.sent();
                        summaryInput = "";
                        _i = 0, _a = database.results;
                        _b.label = 3;
                    case 3:
                        if (!(_i < _a.length)) return [3 /*break*/, 6];
                        page = _a[_i];
                        pageId = page.id;
                        return [4 /*yield*/, (0, client_1.collectPaginatedAPI)(NotionService.notionClient.blocks.children.list, {
                                block_id: pageId,
                            })];
                    case 4:
                        blocks = _b.sent();
                        pageText = blocks
                            .map(function (block) { return NotionService.blockToPlainText(block); })
                            .join("\n")
                            .trim();
                        summaryInput +=
                            NotionService.pagePropertiesToPlainText(page.properties) +
                                "\n" +
                                "Created Time: " +
                                page.created_time +
                                "\n" +
                                pageText +
                                "\n\n";
                        _b.label = 5;
                    case 5:
                        _i++;
                        return [3 /*break*/, 3];
                    case 6: return [4 /*yield*/, OpenAiService_1.OpenAiService.getWeeklyDigest(summaryInput, user.introduction || "No introduction given")];
                    case 7: return [2 /*return*/, _b.sent()];
                }
            });
        });
    };
    NotionService.notionClient = new Client({
        auth: "secret_huZrPhEsECxjtLb4ypD9XMB6zc6F1vuKyuk2lKMPFLc",
    });
    NotionService.blockToPlainText = function (block) {
        var text = "";
        switch (block.type) {
            case "paragraph":
                text +=
                    block.paragraph.rich_text.map(function (t) { return t.plain_text; }).join("") +
                        "\n";
                break;
            case "heading_1":
            case "heading_2":
            case "heading_3":
                text +=
                    "#".repeat(parseInt(block.type.split("_")[1])) +
                        " " +
                        block[block.type].rich_text.map(function (t) { return t.plain_text; }).join("") +
                        "\n";
                break;
            case "bulleted_list_item":
            case "numbered_list_item":
                text +=
                    "- " +
                        block[block.type].rich_text.map(function (t) { return t.plain_text; }).join("") +
                        "\n";
                break;
            case "to_do":
                text +=
                    "TODO " +
                        (block.to_do.checked ? "[x] : " : "[ ] : ") +
                        block.to_do.rich_text.map(function (t) { return t.plain_text; }).join("") +
                        "\n";
                break;
            // Add more block types as needed, or handle them differently depending on your use-case
            default:
                // Optional: log unhandled block types for future consideration
                // console.warn('Unhandled block type:', block.type);
                break;
        }
        return text.trim();
    };
    NotionService.extractIdFromNotionUrl = function (url) {
        var regex = /\/([a-fA-F0-9]{32})\?/; // Matches a 32-character hex string between the last slash and the question mark
        var match = url.match(regex);
        if (!match)
            throw new api_error_1.ApiError("Invalid Notion URL", 400);
        return match[1];
    };
    return NotionService;
}());
exports.NotionService = NotionService;
//# sourceMappingURL=NotionService.js.map