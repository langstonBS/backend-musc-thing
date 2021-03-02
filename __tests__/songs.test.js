const { MongoMemoryServer } = require('mongodb-memory-server');
const mongod = new MongoMemoryServer();
const mongoose = require('mongoose');
const connect = require('../lib/utils/connect');

const Song = require('../lib/models/Song');

const request = require('supertest');
const app = require('../lib/app');

describe('musickbackend routes', () => {

  beforeAll(async () => {
    const uri = await mongod.getUri();
    return connect(uri);
  });

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

  it('gets all songs', async () => {
    await Song.create({
      title: 'some dumb name',
      why: 'thstring',
      link: 'the string',
      rating: 6
    });
    await Song.create({
      title: 'some big name',
      why: 'thstring',
      link: 'the string',
      rating: 6
    })

      .then(() => request(app).get('/api/v1/songs/'))
      .then(res => {
        expect(res.body).toEqual([{
          _id: expect.anything(),
          title: 'some dumb name',
          why: 'thstring',
          link: 'the string',
          rating: 6,
          __v: 0
        },
        {
          _id: expect.anything(),
          title: 'some big name',
          why: 'thstring',
          link: 'the string',
          rating: 6,
          __v: 0
        }]);
      });
  });

  it('gets one song by id songs', async () => {
    const song = await Song.create({
      title: 'some dumb name',
      why: 'thstring',
      link: 'the string',
      rating: 6
    });

    const song2 = await Song.create({
      title: 'some big name',
      why: 'thstring',
      link: 'the string',
      rating: 6
    })

      .then(() => request(app).get(`/api/v1/songs/${song._id}`))
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

  it('delet song by Id', async () => {
    const song = await Song.create({
      title: 'some dumb name',
      why: 'thstring',
      link: 'the string',
      rating: 6
    });

    const song2 = await Song.create({
      title: 'some big name',
      why: 'thstring',
      link: 'the string',
      rating: 6
    })

      .then(() => request(app).delete(`/api/v1/songs/${song._id}`))
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
