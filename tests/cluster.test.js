const request = require('supertest');
//reqiure the app 
const app = require('../app'); // Import your Express app

describe('POST /clusters', () => {
  it('should create a new cluster', async () => {
    const res = await request(app)
      .post('/clusters')
      .send({ name: 'Test Cluster' });

    expect(res.statusCode).toEqual(201);
    expect(res.body).toHaveProperty('name', 'Test Cluster');
  });

  it('should fail to create a new cluster without a name', async () => {
    const res = await request(app)
      .post('/clusters')
      .send({});

    expect(res.statusCode).toEqual(400);
  });
});