import request from 'supertest';
import app from '../../app';

const baseUrl = '/departments';

describe('Department Routes', () => {
    describe('/Department', () => {
        it('should return a status code of 200 for get all departments', async () => {
            const response = await request(app)
                .get(baseUrl);
                expect(response.statusCode).toBe(200);
        });
        it('should return a status code of 400 for a unknown department Id', async () => {
            const response = await request(app)
                .get(`${baseUrl}/89773`);
                expect(response.statusCode).toBe(400);
                expect(response.body.error).toBeTruthy();
        });

        it('should return a status code of 200 for a known id', async () => {
            const response = await request(app)
                .get(`${baseUrl}/2`);
                expect(response.statusCode).toBe(200);
        });

        it('should return a status of 400 for an id that is not a number', async () => {
            const response = await request(app)
                .get(`${baseUrl}/joshua`);
                expect(response.statusCode).toBe(400);
                expect(response.body.error).toBeTruthy();
        });
    });
});
