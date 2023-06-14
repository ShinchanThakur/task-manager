const request = require('supertest');
const app = require('../../../src/app');
const User = require('../../../src/models/user');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');

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

describe('User Router', () => {
    beforeEach(async () => {
        await User.deleteMany();
        await new User(userOne).save();
    });

    describe('Signup', () => {
        it('should signup a new user', async () => {
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
    });

    describe('Login', () => {
        it('should login existing user', async () => {
            const response = await request(app).post('/users/login').send({
                email: userOne.email,
                password: userOne.password
            }).expect(200);
            const user = await User.findById(userOne._id);
            const dbLatestToken = user.tokens[user.tokens.length - 1].token;
            const responseToken = response.body.token;
            expect(responseToken).toBe(dbLatestToken);
        });

        it('should not login user with wrong credentials', async () => {
            await request(app).post('/users/login').send({
                email: userOne.email,
                password: 'incorrect password'
            }).expect(400);
        });
    });

    afterAll(async () => {
        await mongoose.connection.close();
    });
});