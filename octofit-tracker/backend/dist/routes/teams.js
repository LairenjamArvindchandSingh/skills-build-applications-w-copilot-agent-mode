"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const Team_js_1 = __importDefault(require("../models/Team.js"));
const router = (0, express_1.Router)();
router.get('/', async (_req, res) => {
    const teams = await Team_js_1.default.find().populate('members', '-password');
    res.json(teams);
});
router.post('/', async (req, res) => {
    const team = new Team_js_1.default(req.body);
    await team.save();
    res.status(201).json(team);
});
router.get('/:id', async (req, res) => {
    const team = await Team_js_1.default.findById(req.params.id).populate('members', '-password');
    if (!team) {
        res.status(404).json({ message: 'Team not found' });
        return;
    }
    res.json(team);
});
exports.default = router;
