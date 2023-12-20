"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorHandler = void 0;
var errorHandler = function (err, _req, res, _next) {
    console.error(err);
    res.status(err.status || 500).json({
        message: err.message || 'Internal server error',
        status: err.status || 500,
    });
};
exports.errorHandler = errorHandler;
//# sourceMappingURL=error_handler.js.map