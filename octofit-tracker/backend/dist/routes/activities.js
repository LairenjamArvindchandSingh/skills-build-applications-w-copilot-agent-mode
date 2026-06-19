"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const Activity_js_1 = __importDefault(require("../models/Activity.js"));
const router = (0, express_1.Router)();
router.get('/', async (_req, res) => {
    const activities = await Activity_js_1.default.find().populate('user', '-password');
    res.json(activities);
});
router.post('/', async (req, res) => {
    const activity = new Activity_js_1.default(req.body);
    await activity.save();
    res.status(201).json(activity);
});
router.get('/:id', async (req, res) => {
    const activity = await Activity_js_1.default.findById(req.params.id).populate('user', '-password');
    if (!activity) {
        res.status(404).json({ message: 'Activity not found' });
        return;
    }
    res.json(activity);
});
exports.default = router;
