"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const Workout_js_1 = __importDefault(require("../models/Workout.js"));
const router = (0, express_1.Router)();
router.get('/', async (_req, res) => {
    const workouts = await Workout_js_1.default.find();
    res.json(workouts);
});
router.post('/', async (req, res) => {
    const workout = new Workout_js_1.default(req.body);
    await workout.save();
    res.status(201).json(workout);
});
router.get('/:id', async (req, res) => {
    const workout = await Workout_js_1.default.findById(req.params.id);
    if (!workout) {
        res.status(404).json({ message: 'Workout not found' });
        return;
    }
    res.json(workout);
});
exports.default = router;
