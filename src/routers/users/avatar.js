const express = require('express');
const auth = require('../../middleware/auth');
const upload = require('../../middleware/upload');

const router = new express.Router();

router.post('/users/me/avatar', auth, upload.single('avatar'), async (req, res) => {
    res.send();
}, (error, req, res, next) => {
    res.status(400).send({ error: error.message });
});

module.exports = router;