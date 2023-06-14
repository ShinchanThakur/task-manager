const request = require('supertest');
const app = require('../../../src/app');
const User = require('../../../src/models/user');
const mongoose = require('mongoose');

describe('User Router', () => {
    beforeEach(async () => {
        await User.deleteMany();
    });

    describe('Signup', () => {
        it('Should signup a new user', async () => {
            const response = await request(app).post('/users').send({
                name: 'Rohan',
                email: 'rohan@example.com',
                password: '12345678'
            }).expect(201);

            //DB assertions
            const id = response.body.user._id;
            const user = await User.findById(id);
            expect(user).not.toBeNull();

            //Response assertions
            expect(response.body).toMatchObject({
                user: {
                    name: 'Rohan',
                    email: 'rohan@example.com'
                },
                token: user.tokens[0].token
            });

            //Password encryption assertion
            expect(user.password).not.toBe('12345678');
        });
    })

    afterAll(async () => {
        await mongoose.connection.close();
    });
});