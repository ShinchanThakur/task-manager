const request = require('supertest');
const app = require('../../src/app');
const User = require('../../src/models/user');
const mongoose = require('mongoose');

beforeEach(async () => {
    await User.deleteMany();
})

test('Should signup a new user', async () => {
    const response = await request(app).post('/users').send({
        name: 'Rohan',
        email: 'rohan@example.com',
        password: '12345678'
    }).expect(201);
});

afterAll(async () => {
    await mongoose.connection.close();
})