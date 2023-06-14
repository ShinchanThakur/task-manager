const request = require('supertest');
const app = require('../../src/app');
const User = require('../../src/models/user');

test('Should signup a new user', async () => {
    const response = await request(app).post('/users').send({
        name: 'Rohan',
        email: 'rohan@example.com',
        password: '12345678'
    }).expect(201);
});