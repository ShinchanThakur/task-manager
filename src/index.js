const express = require('express');
require('./db/mongoose');
const userRouter = require('../src/routers/users/user');
const avatarRouter = require('../src/routers/users/avatar');
const taskRouter = require('../src/routers/task');

const app = express();
const port = process.env.PORT;

app.use(express.json());
app.use(userRouter);
app.use(avatarRouter);
app.use(taskRouter);

app.listen(port, () => {
    console.log('Server is up on port ' + port);
})