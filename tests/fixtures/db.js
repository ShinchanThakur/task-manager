const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const User = require('../../src/models/user');
const Task = require('../../src/models/task');

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
};

const setupDBForUserAndAvatar = async () => {
    await User.deleteMany();
    await new User(userOne).save();
};

const taskOne = {
    _id: new mongoose.Types.ObjectId(),
    description: 'Task 1',
    completed: false,
    owner: userOneId
};

const userTwoId = new mongoose.Types.ObjectId();
const userTwo = {
    _id: userTwoId,
    name: 'User2',
    email: 'user2@mail.com',
    password: '12345678',
    tokens: [
        {
            token: jwt.sign({ _id: userTwoId }, process.env.JWT_SECRET)
        }
    ]
}

const setupDBForTask = async () => {
    await User.deleteMany();
    await Task.deleteMany();
    await new User(userOne).save();
    await new User(userTwo).save();
    await new Task(taskOne).save();
};

const closeDBConnection = async () => {
    await mongoose.connection.close();
};

module.exports = {
    userOne,
    userTwo,
    setupDBForUserAndAvatar,
    taskOne,
    setupDBForTask,
    closeDBConnection
};