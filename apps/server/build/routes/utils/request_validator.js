"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RequestValidator = void 0;
var api_error_1 = require("../../common/api_error");
var logger_1 = __importDefault(require("../../utils/logger"));
var RequestValidator = /** @class */ (function () {
    function RequestValidator() {
    }
    RequestValidator.validate = function (request) {
        var castRequest = request;
        if (castRequest == null) {
            logger_1.default.error("Invalid request: ".concat(request));
            throw new api_error_1.ApiError("Invalid request", 400);
        }
        return castRequest;
    };
    return RequestValidator;
}());
exports.RequestValidator = RequestValidator;
//# sourceMappingURL=request_validator.js.map