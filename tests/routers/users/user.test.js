const request = require('supertest');
const app = require('../../../src/app');
const User = require('../../../src/models/user');
const { userOne, setupDBForUserAndAvatar, closeDBConnection } = require('../../fixtures/db');

describe('User Router', () => {
    beforeEach(setupDBForUserAndAvatar);

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

    describe('Get User', () => {
        it('should get profile for user', async () => {
            await request(app)
                .get('/users/me')
                .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
                .send()
                .expect(200);
            //Many more assertions can be made
            //Similar to signup
        });

        it('should not get profile for unauthorized user', async () => {
            await request(app)
                .get('/users/me')
                .send()
                .expect(401);
        });
    });

    describe('Update user', () => {
        it('should update valid user fields', async () => {
            await request(app)
                .patch('/users/me')
                .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
                .send({
                    name: 'Updated Name'
                })
                .expect(200);

            const user = await User.findById(userOne._id);
            expect(user.name).toBe('Updated Name');
        });

        it('should not update invalid user fields', async () => {
            await request(app)
                .patch('/users/me')
                .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
                .send({
                    invalidField: 'Anything'
                })
                .expect(400);
        });
    });

    describe('Delete user', () => {
        it('should delete account for user', async () => {
            await request(app)
                .delete('/users/me')
                .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
                .send()
                .expect(200);

            const user = await User.findById(userOne._id);
            expect(user).toBeNull;
        });

        it('should not delete account for unauthenticated user', async () => {
            await request(app)
                .delete('/users/me')
                .send()
                .expect(401);
        });
    });

    afterAll(closeDBConnection);
});