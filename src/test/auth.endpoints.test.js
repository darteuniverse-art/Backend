const request = require('supertest');
const { expect } = require('chai');
const app = require('../../src/app');

describe('Auth endpoints (status contracts)', () => {
  it('POST /api/auth/register returns 400 for invalid payload', async () => {
    const res = await request(app).post('/api/auth/register').send({});
    expect(res.status).to.equal(400);
  });

  it('POST /api/auth/login returns 400 for invalid payload', async () => {
    const res = await request(app).post('/api/auth/login').send({});
    expect(res.status).to.equal(400);
  });

  ['/api/auth/logout', '/api/auth/me'].forEach((path) => {
    it(`POST /api/auth/logout returns 401 without auth`, async () => {
      const res = await request(app).post('/api/auth/logout').send({});
      expect(res.status).to.equal(401);
    });

    it(`GET /api/auth/me returns 401 without auth`, async () => {
      const res = await request(app).get('/api/auth/me');
      expect(res.status).to.equal(401);
    });
  });

  it('POST /api/auth/forgot-password returns 400 where email is missing', async () => {
    const res = await request(app).post('/api/auth/forgot-password').send({});
    expect(res.status).to.equal(400);
  });

  it('POST /api/auth/reset-password returns 400 when fields are missing', async () => {
    const res = await request(app).post('/api/auth/reset-password').send({});
    expect(res.status).to.equal(400);
  });
});
