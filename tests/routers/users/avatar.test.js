const request = require('supertest');
const app = require('../../../src/app');
const User = require('../../../src/models/user');
const { userOne, setupDatabase, closeDBConnection } = require('../../fixtures/db');

describe('Avatar Router', () => {
    beforeEach(setupDatabase);

    describe('Add avatar', () => {
        it('should add avatar when user uploads image', async () => {
            await request(app)
                .post('/users/me/avatar')
                .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
                .attach('avatar', 'tests/fixtures/avatar.jpeg')
                .expect(200);
            const user = await User.findById(userOne._id);
            expect(user.avatar).toEqual(expect.any(Buffer));
        });
    });

    afterAll(closeDBConnection);
});