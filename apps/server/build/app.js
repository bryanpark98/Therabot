"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var cors_1 = __importDefault(require("cors"));
var express_1 = __importDefault(require("express"));
var error_handler_1 = require("./middleware/error_handler");
var routes_1 = require("./routes");
var logger_1 = __importDefault(require("./utils/logger"));
var path_1 = __importDefault(require("path"));
var app = (0, express_1.default)();
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
app.use(error_handler_1.errorHandler);
// Serve frontend
app.set("views", path_1.default.join(__dirname, "views"));
app.use(express_1.default.static(__dirname + "/public"));
app.get("/", function (req, res) {
    res.sendFile(path_1.default.join(__dirname, "views", "index.html"));
});
app.get("/setup", function (req, res) {
    res.sendFile(path_1.default.join(__dirname, "views", "setup.html"));
});
// Register routers
app.use("/api/v1", routes_1.notionRouter);
app.use("*", function (_req, res) {
    res.status(404).json({ message: "Not found" });
    logger_1.default.error("Not found ".concat(_req.originalUrl));
});
app.use(function (err, _req, res) {
    logger_1.default.error(err.message, err);
    res.status(500).send("Something went wrong.");
});
exports.default = app;
//# sourceMappingURL=app.js.map