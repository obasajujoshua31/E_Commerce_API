import request from 'supertest';
import app from '../../app';

const baseUrl = '/shipping/regions';

describe('Shipping Routes', () => {
    describe('/Shipping', () => {
        it('should return a status code of 200 for get all shippings', async () => {
            const response = await request(app)
                .get(baseUrl);
                expect(response.statusCode).toBe(200);
                expect(response.body.length).toBe(7);
        });
        it('should return a status code of 400 for a shippingRegion without shipping', async () => {
            const response = await request(app)
                .get(`${baseUrl}/1`);
                expect(response.statusCode).toBe(400);
                expect(response.body.error).toBeTruthy();
        });

        it('should return a status code of 200 for a shippingRegion with shipping', async () => {
            const response = await request(app)
                .get(`${baseUrl}/2`);
                expect(response.statusCode).toBe(200);
        });

        it('should return a status of 400 for an unknown id', async () => {
            const response = await request(app)
                    .get(`${baseUrl}/9888`);
                    expect(response.statusCode).toBe(400);
        });

        it('should return a status of 400 for an id that is not a number', async () => {
            const response = await request(app)
                .get(`${baseUrl}/joshua`);
                expect(response.statusCode).toBe(400);
                expect(response.body.error).toBeTruthy();
        });
    });
});
