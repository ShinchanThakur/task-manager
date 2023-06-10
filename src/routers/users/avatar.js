const express = require('express');
const auth = require('../../middleware/auth');
const upload = require('../../middleware/upload');
const User = require('../../models/user');

const router = new express.Router();

router.post('/users/me/avatar', auth, upload.single('avatar'), async (req, res) => {
    const user = req.user;
    const buffer = req.file.buffer;
    user.avatar = buffer;
    await user.save();
    res.send();
}, (error, req, res, next) => {
    res.status(400).send({ error: error.message });
});

router.delete('/users/me/avatar', auth, async (req, res) => {
    const user = req.user;
    user.avatar = undefined;
    await user.save();
    res.send();
});

router.get('/users/:id/avatar', auth, async (req, res) => {
    try {
        const id = req.params.id;
        const user = await User.findById(id);
        if (!user || !user.avatar) {
            throw new Error();
        }
        res.set('Content-Type', 'image/png');
        res.send(user.avatar);
    } catch (error) {
        res.status(404).send();
    }
});

module.exports = router;