import request from 'supertest';
import app from '../../app';


describe('Attributes Routes', () => {
    describe('/Attributes', () => {
        it('should return a status code of 200 for get all attributes', async () => {
            const response = await request(app)
                .get('/attributes');
                expect(response.statusCode).toBe(200);
                expect(response.body.length).toBe(2);
        });
        it('should return a status code of 200 for an attribute of a known id', async () => {
            const response = await request(app)
                .get('/attributes/1');
                expect(response.statusCode).toBe(200);
                expect(response.body).toBeTruthy();
        });

        it('should return a status of 400 for an unknown id', async () => {
            const response = await request(app)
                    .get('/attributes/8');
                    expect(response.statusCode).toBe(400);
                    expect(response.body.error).toBeTruthy();
        });

        it('should return a status of 400 for an id that is not a number', async () => {
            const response = await request(app)
                .get('/attributes/joshua');
                expect(response.statusCode).toBe(400);
                expect(response.body.error).toBeTruthy();
        });

        it('should return a status of 200 for a known value', async () => {
            const response = await request(app)
                .get('/attributes/values/1');
            expect(response.statusCode).toBe(200);
        });

        it('should return a status of 400 for a unknown value', async () => {
            const response = await request(app)
                .get('/attributes/values/89');
            expect(response.statusCode).toBe(400);
            expect(response.body.error).toBeTruthy();
        });

        it('should return a status of 400 for a unknown value', async () => {
            const response = await request(app)
                .get('/attributes/values/llldk');
            expect(response.statusCode).toBe(400);
            expect(response.body.error).toBeTruthy();
        });

        it('should return a status of 400 for a known product ', async () => {
            const response = await request(app)
                .get('/attributes/inProduct/1');
            expect(response.statusCode).toBe(200);
        });
        it('should return a status of 400 for a unknown product', async () => {
            const response = await request(app)
                .get('/attributes/inProduct/999999');
            expect(response.statusCode).toBe(400);
            expect(response.body.error).toBeTruthy();
        });
        it('should return a status of 400 for a unknown product', async () => {
            const response = await request(app)
                .get('/attributes/inProduct/llldk');
            expect(response.statusCode).toBe(400);
            expect(response.body.error).toBeTruthy();
        });
    });
});
