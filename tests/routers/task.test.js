const request = require('supertest');
const app = require('../../src/app');
const Task = require('../../src/models/task');

const {
    userOne,
    setupDBForTask,
    closeDBConnection
} = require('../fixtures/db');

describe('Task Router', () => {
    beforeEach(setupDBForTask);

    describe('Create Task', () => {
        it('should create task for user', async () => {
            const response = await request(app)
                .post('/tasks')
                .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
                .send({
                    description: 'Task 2'
                })
                .expect(201);

            const responseTask = response.body;
            const dbTask = await Task.findById(responseTask._id);
            expect(dbTask).not.toBeNull();
            expect(dbTask.completed).toBe(false);
        });
    });

    describe('Get task', () => {
        it('should fetch user tasks', async () => {
            const response = await request(app)
                .get('/tasks')
                .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
                .send()
                .expect(200);

            const responseTasks = response.body;
            const dbTasks = await Task.find({ owner: userOne._id });
            expect(responseTasks.length).toBe(dbTasks.length);
        });
    });

    afterAll(closeDBConnection);
});
