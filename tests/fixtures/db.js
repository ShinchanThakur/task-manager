const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const User = require('../../src/models/user');

const userOneId = new mongoose.Types.ObjectId();

const userOne = {
    _id: userOneId,
    name: 'User1',
    email: 'user1@mail.com',
    password: '12345678',
    tokens: [
        {
            token: jwt.sign({ _id: userOneId }, process.env.JWT_SECRET)
        }
    ]
}

const setupDBForUserAndAvatar = async () => {
    await User.deleteMany();
    await new User(userOne).save();
};

const setupDBForTask = async () => {
    await User.deleteMany();
    await new User(userOne).save();
}

const closeDBConnection = async () => {
    await mongoose.connection.close();
}

module.exports = {
    userOne,
    setupDBForUserAndAvatar,
    setupDBForTask,
    closeDBConnection
}