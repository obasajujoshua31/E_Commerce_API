import request from 'supertest';
import app from '../../app';

const baseUrl = '/categories';

describe('Categories Routes', () => {
    describe('/Categories', () => {
        it('should return a status code of 200 for get all categories', async () => {
            const response = await request(app)
                .get(baseUrl);
                expect(response.statusCode).toBe(200);
        });

        it('should return a status code of 200 for a category of a known id', async () => {
            const response = await request(app)
                .get(`${baseUrl}/1`);
                expect(response.statusCode).toBe(200);
        });

         
        it('should return a status code of 400 for a category of a unknown id', async () => {
            const response = await request(app)
                .get(`${baseUrl}/89`);
                expect(response.statusCode).toBe(400);
        });

          
        it('should return a status code of 400 for a category of a unknown id', async () => {
            const response = await request(app)
                .get(`${baseUrl}/joshua`);
                expect(response.statusCode).toBe(400);
        });

        it('should return a status of 200 for an known id', async () => {
            const response = await request(app)
                    .get(`${baseUrl}/inProduct/5`);
                    expect(response.statusCode).toBe(200);
        });

        it('should return a status of 400 for an unknown id', async () => {
            const response = await request(app)
                    .get(`${baseUrl}/inProduct/99887`);
                    expect(response.statusCode).toBe(400);
        });

        it('should return a status of 400 for an unknown id', async () => {
            const response = await request(app)
                    .get(`${baseUrl}/inProduct/kdkkkdd`);
                    expect(response.statusCode).toBe(400);
        });

        it('should return a status of 400 for an id that is not a number', async () => {
            const response = await request(app)
                .get(`${baseUrl}/inDepartment/2`);
                expect(response.statusCode).toBe(200);
        });

        it('should return a status of 400 for an id that is not a number', async () => {
            const response = await request(app)
                .get(`${baseUrl}/inDepartment/99888`);
                expect(response.statusCode).toBe(400);
                expect(response.body.error).toBeTruthy();
        });

        it('should return a status of 400 for an id that is not a number', async () => {
            const response = await request(app)
                .get(`${baseUrl}/inDepartment/kdlldkk`);
                expect(response.statusCode).toBe(400);
                expect(response.body.error).toBeTruthy();
        });
    });
});
