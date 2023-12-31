"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var winston_1 = __importDefault(require("winston"));
var logger = winston_1.default.createLogger({
    level: 'info',
    format: winston_1.default.format.json(),
    transports: [
        new winston_1.default.transports.Console(),
        new winston_1.default.transports.File({ filename: 'error.log', level: 'error' }),
    ],
});
process.on('unhandledRejection', function (ex) {
    throw ex;
});
process.on('uncaughtException', function (ex) {
    logger.error(ex.message, ex);
    process.exit(1);
});
exports.default = logger;
//# sourceMappingURL=logger.js.map