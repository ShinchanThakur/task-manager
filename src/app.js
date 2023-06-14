const express = require('express');
require('./db/mongoose');
const userRouter = require('../src/routers/users/user');
const avatarRouter = require('../src/routers/users/avatar');
const taskRouter = require('../src/routers/task');

const app = express();

app.use(express.json());
app.use(userRouter);
app.use(avatarRouter);
app.use(taskRouter);

module.exports = app;