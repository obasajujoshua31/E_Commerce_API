import request from 'supertest';
import app from '../../app';


describe('App', () => {
    it('should return a status of 404 for a non found page', async () => {
        const response = await request(app)
            .get('/joshua/notfound');
            expect(response.statusCode).toBe(404);
    });
});
