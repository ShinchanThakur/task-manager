const express = require('express');
const User = require('../models/user');

const router = new express.Router();

router.post('/users', async (req, res) => {
    const user = new User(req.body);
    try {
        await user.save();
        res.status(201).send(user);
    } catch (error) {
        res.status(400).send(error);
    }
});

router.get('/users', async (req, res) => {
    try {
        const users = await User.find({});
        res.send(users);
    } catch (error) {
        res.status(500).send(error);
    }
});

router.get('/users/:id', async (req, res) => {
    const id = req.params.id;
    try {
        const user = await User.findById(id);
        if (!user) {
            return res.status(404).send();
        }
        res.send(user);
    } catch (error) {
        res.status(500).send(error);
    }
});

router.patch('/users/:id', async (req, res) => {
    const id = req.params.id;
    const updates = req.body;
    const updateFields = Object.keys(updates);
    const allowedUpdateFields = ['name', 'email', 'password', 'age'];
    const isValidUpdate = updateFields.every((updateField) => allowedUpdateFields.includes(updateField));
    if (!isValidUpdate) {
        return res.status(400).send({ error: 'Invalid updates' });
    }
    try {
        // const user = await User.findByIdAndUpdate(id, req.body, {
        //     new: true,
        //     runValidators: true
        // });
        //This won't run the pre('save') when password is changed
        //Therefore using the below function
        const user = await User.findById(id);
        if (!user) {
            return res.status(404).send();
        }
        updateFields.forEach((updateField) => {
            user[updateField] = updates[updateField];
        });
        await user.save();
        res.send(user);
    } catch (error) {
        res.status(400).send(error);
    }
});

router.delete('/users/:id', async (req, res) => {
    const id = req.params.id;
    try {
        const user = await User.findByIdAndDelete(id);
        if (!user) {
            return res.status(404).send();
        }
        res.send(user);
    } catch (error) {
        res.status(500).send(error);
    }
});

module.exports = router;