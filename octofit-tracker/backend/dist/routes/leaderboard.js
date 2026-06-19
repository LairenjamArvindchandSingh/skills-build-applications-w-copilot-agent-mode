"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const Leaderboard_js_1 = __importDefault(require("../models/Leaderboard.js"));
const router = (0, express_1.Router)();
router.get('/', async (_req, res) => {
    const entries = await Leaderboard_js_1.default.find()
        .populate('user', '-password')
        .sort({ score: -1 });
    res.json(entries);
});
router.post('/', async (req, res) => {
    const entry = new Leaderboard_js_1.default(req.body);
    await entry.save();
    res.status(201).json(entry);
});
exports.default = router;
