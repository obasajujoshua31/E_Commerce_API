import request from 'supertest';
import app from '../../app';


describe('Tax Routes', () => {
    describe('/Tax', () => {
        it('should return a status code of 200 for get all taxes', async () => {
            const response = await request(app)
                .get('/tax');
                expect(response.statusCode).toBe(200);
                expect(response.body.length).toBe(2);
        });
        it('should return a status code of 200 for a tax of a known id', async () => {
            const response = await request(app)
                .get('/tax/1');
                expect(response.statusCode).toBe(200);
        });

        it('should return a status of 400 for an unknown id', async () => {
            const response = await request(app)
                    .get('/tax/8');
                    expect(response.statusCode).toBe(400);
        });

        it('should return a status of 400 for an id that is not a number', async () => {
            const response = await request(app)
                .get('/tax/joshua');
                expect(response.statusCode).toBe(400);
                expect(response.body.error).toBeTruthy();
        });
    });
});
