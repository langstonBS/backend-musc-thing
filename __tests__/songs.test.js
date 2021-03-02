const mongoose = require('mongoose');
const request = require('supertest');
const app = require('../lib/app');

describe('musickbackend routes', () => {
    beforeEach(() => {
        return mongoose.connection.dropDatabase();
    });
    afterAll(async () => {
        await mongoose.connection.close();
        return mongod.stop();
    });

    it('create a song', () => {
        return request(app)
            .post('/api/v1/songs/')
            .send({
                title: 'some dumb name',
                why: 'thstring',
                link: 'the string',
                rating: 6
            })
            .then(res => {
                expect(res.body).toEqual({
                    _id: expect.anything(),
                    title: 'some dumb name',
                    why: 'thstring',
                    link: 'the string',
                    rating: 6,
                    __v: 0
                });
            });
    });
});
