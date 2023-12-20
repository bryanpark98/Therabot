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
var __asyncValues = (this && this.__asyncValues) || function (o) {
    if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
    var m = o[Symbol.asyncIterator], i;
    return m ? m.call(o) : (o = typeof __values === "function" ? __values(o) : o[Symbol.iterator](), i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function () { return this; }, i);
    function verb(n) { i[n] = o[n] && function (v) { return new Promise(function (resolve, reject) { v = o[n](v), settle(resolve, reject, v.done, v.value); }); }; }
    function settle(resolve, reject, d, v) { Promise.resolve(v).then(function(v) { resolve({ value: v, done: d }); }, reject); }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.OpenAiService = void 0;
var openai_1 = __importDefault(require("openai"));
var OpenAiService = /** @class */ (function () {
    function OpenAiService() {
    }
    OpenAiService.getWeeklyDigest = function (summaryInput, authorIntroduction) {
        var _a, e_1, _b, _c;
        var _d, _e;
        return __awaiter(this, void 0, void 0, function () {
            var prompt, stream, digest, _f, stream_1, stream_1_1, part, e_1_1;
            return __generator(this, function (_g) {
                switch (_g.label) {
                    case 0:
                        prompt = "\n**Task**: Generate a Weekly Digest Email from Journal Entries\n\nBefore the journal entries, you will be provided with a self-introduction paragraph written by the author of the journal. Use this to help personalize the responses and understand the author better.\n\nYou will then be presented with various journal entries. Each entry starts with metadata in the format: `<METADATA_KEY>: <METADATA_VALUE>`. This is followed by the actual text of the journal entry. Your goal is to craft an encouraging weekly digest email for the author, using details from these entries.\n\nPlease adhere to the following guidelines:\n\n1. **Format**: Use markdown.\n2. **Emojis**: Incorporate emojis in your text and formatting to add visual appeal. Please use yellow skin tone if you use human emojis.\n3. **Text Decoration**: Add visual interest to your content using markdown text decorations like **bold**, *italics*.\n4. **Structure**: \n    - Header: `# \uD83D\uDCDA Your Journaling Weekly Digest` \n    - A greeting to the author introducing the topic of the email.\n    - Titled paragraphs that highlight the week, offering thoughtful commentary. Use the exact format: `**<RELATED_EMOJI> <TITLE_TEXT>:**` for each highlight title, the title should be inline in the paragraph. Create a maximum of 3 highlights, each highlight should be a maximum of 60 words long, aim for 40 words. Note: Only one emoji should be used in each title, this should not be a face emoji.\n    - Markdown line separator. Offer a final note of encouragement using `**Remember**:` as a preface. Conclude with an encouraging goodbye message. **Do not sign the message**.\n5. **Length**: The entire email should be around 150 words with a maximum of 200 words.\n6. **Tone**: The tone of the email should be very encouraging and positive.\n7. **Writing Style**: Do not refer to yourself in the email. The email should be written in the second person. Do not use overly formal or ornate language. Use simple, clear, and concise language.\n\nUse this structure as a guide to create your weekly digest from the provided information below, good luck!:\n\n" +
                            "Author Introduction:\n" +
                            "`".concat(authorIntroduction, "`") +
                            "\n\n" +
                            "Journal Entries:\n" +
                            "`".concat(summaryInput, "`");
                        return [4 /*yield*/, OpenAiService.client.chat.completions.create({
                                model: "gpt-4",
                                messages: [{ role: "user", content: prompt }],
                                stream: true,
                            })];
                    case 1:
                        stream = _g.sent();
                        digest = "";
                        _g.label = 2;
                    case 2:
                        _g.trys.push([2, 7, 8, 13]);
                        _f = true, stream_1 = __asyncValues(stream);
                        _g.label = 3;
                    case 3: return [4 /*yield*/, stream_1.next()];
                    case 4:
                        if (!(stream_1_1 = _g.sent(), _a = stream_1_1.done, !_a)) return [3 /*break*/, 6];
                        _c = stream_1_1.value;
                        _f = false;
                        part = _c;
                        digest += ((_e = (_d = part.choices[0]) === null || _d === void 0 ? void 0 : _d.delta) === null || _e === void 0 ? void 0 : _e.content) || "";
                        _g.label = 5;
                    case 5:
                        _f = true;
                        return [3 /*break*/, 3];
                    case 6: return [3 /*break*/, 13];
                    case 7:
                        e_1_1 = _g.sent();
                        e_1 = { error: e_1_1 };
                        return [3 /*break*/, 13];
                    case 8:
                        _g.trys.push([8, , 11, 12]);
                        if (!(!_f && !_a && (_b = stream_1.return))) return [3 /*break*/, 10];
                        return [4 /*yield*/, _b.call(stream_1)];
                    case 9:
                        _g.sent();
                        _g.label = 10;
                    case 10: return [3 /*break*/, 12];
                    case 11:
                        if (e_1) throw e_1.error;
                        return [7 /*endfinally*/];
                    case 12: return [7 /*endfinally*/];
                    case 13: return [2 /*return*/, digest];
                }
            });
        });
    };
    OpenAiService.client = new openai_1.default({
        apiKey: "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",
    });
    return OpenAiService;
}());
exports.OpenAiService = OpenAiService;
//# sourceMappingURL=OpenAiService.js.map