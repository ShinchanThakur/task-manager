const express = require('express');
const User = require('../models/user');
const auth = require('../middleware/auth');

const router = new express.Router();

router.post('/users', async (req, res) => {
    const user = new User(req.body);
    try {
        await user.save();
        const token = await user.generateAuthToken();
        res.status(201).send({ user, token });
    } catch (error) {
        res.status(400).send(error);
    }
});

router.post('/users/login', async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findByCredentials(email, password);
        const token = await user.generateAuthToken();
        res.send({ user, token });
    } catch (error) {
        res.status(400).send();
        //Not sending details of error is safe here.
        //It will protect us from hackers
    }
});

router.post('/users/logout', auth, async (req, res) => {
    try {
        const user = req.user;
        const currentSessionToken = req.token;
        user.tokens = user.tokens.filter((savedToken) => {
            return savedToken.token !== currentSessionToken;
        })
        await user.save();
        res.send();
    } catch (error) {
        res.status(500).send();
    }
});

router.post('/users/logoutAll', auth, async (req, res) => {
    try {
        const user = req.user;
        user.tokens = [];
        await user.save();
        res.send();
    } catch (error) {
        res.status(500).send();
    }
});

router.get('/users/me', auth, async (req, res) => {
    res.send(req.user);
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

router.patch('/users/me', auth, async (req, res) => {
    const updates = req.body;
    const updateFields = Object.keys(updates);
    const allowedUpdateFields = ['name', 'email', 'password', 'age'];
    const isValidUpdate = updateFields.every((updateField) => allowedUpdateFields.includes(updateField));
    if (!isValidUpdate) {
        return res.status(400).send({ error: 'Invalid updates' });
    }
    try {
        const user = req.user;
        updateFields.forEach((updateField) => {
            user[updateField] = updates[updateField];
        });
        await user.save();
        res.send(user);
    } catch (error) {
        res.status(400).send(error);
    }
});

router.delete('/users/me', auth, async (req, res) => {
    try {
        const user = req.user;
        await User.deleteOne(user);
        res.send(user);
    } catch (error) {
        res.status(500).send(error);
    }
});

module.exports = router;