const express = require('express');
const Task = require('../models/task');
const auth = require('../middleware/auth');

const router = new express.Router();

router.post('/tasks', auth, async (req, res) => {
    const task = new Task({
        ...req.body,
        owner: req.user._id
    });
    try {
        await task.save();
        res.status(201).send(task);
    } catch (error) {
        res.status(400).send(error);
    }
});

// GET /tasks?completed=true
// GET /tasks?limit=10&skip=20
// GET /tasks?sortBy=createdAt:desc
router.get('/tasks', auth, async (req, res) => {
    const match = {};
    if (req.query.completed) {
        match.completed = (req.query.completed === 'true');
    }
    const limit = parseInt(req.query.limit);
    const skip = parseInt(req.query.skip);
    const sort = {};
    if (req.query.sortBy) {
        const [sortByField, sortingOrder] = req.query.sortBy.split(':');
        sort[sortByField] = (sortingOrder === 'desc') ? -1 : 1;
    }
    try {
        const user = req.user;
        await user.populate({
            path: 'tasks',
            match,
            options: {
                limit,
                skip,
                sort
            }
        });
        const tasks = user.tasks;
        res.send(tasks);
    } catch (error) {
        res.status(500).send(error);
    }
});

router.get('/tasks/:id', auth, async (req, res) => {
    const _id = req.params.id;
    try {
        const task = await Task.findOne({ _id, owner: req.user._id });
        if (!task) {
            return res.status(404).send();
        }
        res.send(task);
    } catch (error) {
        res.status(500).send(error);
    }
});

router.patch('/tasks/:id', auth, async (req, res) => {
    const _id = req.params.id;
    const updates = Object.keys(req.body);
    const allowedUpdates = ['description', 'completed'];
    const isValidUpdate = updates.every((update) => allowedUpdates.includes(update));
    if (!isValidUpdate) {
        return res.status(400).send({ error: 'Invalid updates' });
    }
    try {
        const task = await Task.findOneAndUpdate({ _id, owner: req.user._id }, req.body, {
            new: true,
            runValidators: true
        });
        if (!task) {
            return res.status(404).send();
        }
        res.send(task);
    } catch (error) {
        res.status(400).send(error);
    }
});

router.delete('/tasks/:id', auth, async (req, res) => {
    const _id = req.params.id;
    try {
        const task = await Task.findOneAndDelete({ _id, owner: req.user._id });
        if (!task) {
            return res.status(404).send();
        }
        res.send(task);
    } catch (error) {
        res.status(500).send(error);
    }
});

module.exports = router;