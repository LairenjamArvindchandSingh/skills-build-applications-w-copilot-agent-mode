"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = __importDefault(require("dotenv"));
const express_1 = __importDefault(require("express"));
const database_js_1 = require("./config/database.js");
const users_js_1 = __importDefault(require("./routes/users.js"));
const teams_js_1 = __importDefault(require("./routes/teams.js"));
const activities_js_1 = __importDefault(require("./routes/activities.js"));
const leaderboard_js_1 = __importDefault(require("./routes/leaderboard.js"));
const workouts_js_1 = __importDefault(require("./routes/workouts.js"));
dotenv_1.default.config();
const app = (0, express_1.default)();
const port = Number(process.env.PORT) || 8000;
const codespaceName = process.env.CODESPACE_NAME;
const baseUrl = codespaceName
    ? `https://${codespaceName}-8000.app.github.dev`
    : `http://localhost:${port}`;
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.get('/api/health', (_req, res) => {
    res.json({ status: 'ok', baseUrl });
});
app.use('/api/users', users_js_1.default);
app.use('/api/teams', teams_js_1.default);
app.use('/api/activities', activities_js_1.default);
app.use('/api/leaderboard', leaderboard_js_1.default);
app.use('/api/workouts', workouts_js_1.default);
async function start() {
    await (0, database_js_1.connectDatabase)();
    app.listen(port, () => {
        console.log(`API listening on ${baseUrl}`);
    });
}
void start();
