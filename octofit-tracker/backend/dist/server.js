"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.app = exports.BASE_URL = exports.PORT = void 0;
exports.startServer = startServer;
const cors_1 = __importDefault(require("cors"));
const express_1 = __importDefault(require("express"));
const database_js_1 = require("./config/database.js");
const users_js_1 = __importDefault(require("./routes/users.js"));
const teams_js_1 = __importDefault(require("./routes/teams.js"));
const activities_js_1 = __importDefault(require("./routes/activities.js"));
const leaderboard_js_1 = __importDefault(require("./routes/leaderboard.js"));
const workouts_js_1 = __importDefault(require("./routes/workouts.js"));
exports.PORT = Number(process.env.PORT) || 8000;
const codespaceName = process.env.CODESPACE_NAME;
exports.BASE_URL = codespaceName
    ? `https://${codespaceName}-8000.app.github.dev`
    : `http://localhost:${exports.PORT}`;
exports.app = (0, express_1.default)();
exports.app.use((0, cors_1.default)());
exports.app.use(express_1.default.json());
exports.app.get('/api/health', (_req, res) => {
    res.json({ status: 'ok', baseUrl: exports.BASE_URL });
});
exports.app.use('/api/users', users_js_1.default);
exports.app.use('/api/teams', teams_js_1.default);
exports.app.use('/api/activities', activities_js_1.default);
exports.app.use('/api/leaderboard', leaderboard_js_1.default);
exports.app.use('/api/workouts', workouts_js_1.default);
async function startServer() {
    await (0, database_js_1.connectDatabase)();
    exports.app.listen(exports.PORT, () => {
        console.log(`API listening on ${exports.BASE_URL}`);
        console.log(`  GET ${exports.BASE_URL}/api/users`);
        console.log(`  GET ${exports.BASE_URL}/api/activities`);
    });
}
