"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
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
const express_1 = __importDefault(require("express"));
const http = __importStar(require("http"));
const sock = __importStar(require("socket.io"));
const path = __importStar(require("path"));
const uuid = __importStar(require("uuid"));
const app = (0, express_1.default)();
const server = http.createServer(app);
const io = new sock.Server(server);
app.use(express_1.default.static(path.join(__dirname, "..", "..", "frontend", "dist")));
io.on("connection", (socket) => {
    const ctx = {
        id: uuid.v4(),
        clicks: 0,
    };
    socket.on("buttonClick", () => {
        ctx.clicks++;
        io.emit("buttonClick:ok", ctx);
    });
});
server.listen(3000, () => {
    console.log("listening on *:3000");
});
//# sourceMappingURL=index.js.map