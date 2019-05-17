import request from 'supertest';
import app from '../../app';

const baseUrl = '/products';


const loginResponse = async () => {
   return await request(app).post('/customers/login').send({
        email: 'test@test.com', password: '12345'
    });
}; 


describe('Products Routes', () => {
    describe('/Products', () => {
        it('should return a status code of 200 for get all products', async () => {
            const response = await request(app)
                .get(baseUrl);
                expect(response.statusCode).toBe(200);
        });

        it(`should return a status code of 
        400 for search products without query string`, async () => {
            const response = await request(app)
                .get(`${baseUrl}/search`);
                expect(response.statusCode).toBe(400);
        });


        it('should return a status code of 200 for get all products', async () => {
            const response = await request(app)
                .get(`${baseUrl}/search?query_string=county`);
                expect(response.statusCode).toBe(200);
        });

        it('should return a status code of 200 for get one product', async () => {
            const response = await request(app)
                .get(`${baseUrl}/2`);
                expect(response.statusCode).toBe(200);
        });

        it('should return a status code of 400 for get one product with incorrect id', async () => {
            const response = await request(app)
                .get(`${baseUrl}/44444`);
                expect(response.statusCode).toBe(400);
                expect(response.body.error).toBeTruthy();
        });

        it('should return a status code of 400 for get one product with incorrect id', async () => {
            const response = await request(app)
                .get(`${baseUrl}/kkdkkd`);
                expect(response.statusCode).toBe(400);
                expect(response.body.error).toBeTruthy();
        });

        it(`should return a status code of 200 
        for get product categories with known category id`, async () => {
            const response = await request(app)
                .get(`${baseUrl}/inCategory/2`);
                expect(response.statusCode).toBe(200);
        });

        it(`should return a status code of 400 
        for get product categories with unknown category id`, async () => {
            const response = await request(app)
                .get(`${baseUrl}/inCategory/99999`);
                expect(response.statusCode).toBe(400);
        });

        it(`should return a status code of 400 
        for get product categories with unknown category id`, async () => {
            const response = await request(app)
                .get(`${baseUrl}/inCategory/kdkkkdk`);
                expect(response.statusCode).toBe(400);
        });

        it(`should return a status code of 200 
        for get product  with known department id`, async () => {
            const response = await request(app)
                .get(`${baseUrl}/inDepartment/1`);
                expect(response.statusCode).toBe(200);
        });

        it(`should return a status code of 400 
        for get product with unknown department id`, async () => {
            const response = await request(app)
                .get(`${baseUrl}/inDepartment/45333`);
                expect(response.statusCode).toBe(400);
        });

        it(`should return a status code of 400 
        for get product with unknown department id`, async () => {
            const response = await request(app)
                .get(`${baseUrl}/inDepartment/kkdkkd`);
                expect(response.statusCode).toBe(400);
        });

        it(`should return a status code of 200 
        for get product details with known product id`, async () => {
            const response = await request(app)
                .get(`${baseUrl}/4/details`);
                expect(response.statusCode).toBe(200);
        });

        it(`should return a status code of 400 
        for get product details with unknown product id`, async () => {
            const response = await request(app)
                .get(`${baseUrl}/445554/details`);
                expect(response.statusCode).toBe(400);
        });

        it(`should return a status code of 400 
        for get product details with unknown product id`, async () => {
            const response = await request(app)
                .get(`${baseUrl}/kdkkdk/details`);
                expect(response.statusCode).toBe(400);
        });

        it(`should return a status code of 200 
        for get product locations with known product id`, async () => {
            const response = await request(app)
                .get(`${baseUrl}/4/locations`);
                expect(response.statusCode).toBe(200);
        });

        it(`should return a status code of 400 
        for get product locations with unknown product id`, async () => {
            const response = await request(app)
                .get(`${baseUrl}/445554/locations`);
                expect(response.statusCode).toBe(400);
        });

        it(`should return a status code of 400 
        for get product locations with unknown product id`, async () => {
            const response = await request(app)
                .get(`${baseUrl}/kdkkdk/locations`);
                expect(response.statusCode).toBe(400);
        });

        it(`should return a status code of 200 
        for post product reviews with known product id`, async () => {
            const response = await loginResponse();
            const token = response.body.accessToken;
            const testResponse = await request(app)
                .post(`${baseUrl}/4/reviews`)
                .set({ USER_KEY: token })
                .send({ rating: 4, review: 'Very fine' });
                expect(testResponse.statusCode).toBe(200);
        });

        it(`should return a status code of 400 
        for post product reviews with unknown product id`, async () => {
            const response = await loginResponse();
            const token = response.body.accessToken;
            const testResponse = await request(app)
                .post(`${baseUrl}/50059/reviews`)
                .set({ USER_KEY: token })
                .send({ rating: 4, review: 'Very fine' });
                expect(testResponse.statusCode).toBe(400);
        });

        it(`should return a status code of 400 
        for post product reviews with unknown product id`, async () => {
            const response = await loginResponse();
            const token = response.body.accessToken;
            const testResponse = await request(app)
                .post(`${baseUrl}/kdkkdkdkk/reviews`)
                .set({ USER_KEY: token })
                .send({ rating: 4, review: 'Very fine' });
                expect(testResponse.statusCode).toBe(400);
        });

        it(`should return a status code of 200 
        for get product reviews with known product id with reviews`, async () => {
            const response = await request(app)
                .get(`${baseUrl}/4/reviews`);
                expect(response.statusCode).toBe(200);
        });

        it(`should return a status code of 400 
        for get product reviews with known product id without reviews`, async () => {
            const response = await request(app)
                .get(`${baseUrl}/8/reviews`);
                expect(response.statusCode).toBe(400);
        });

        it(`should return a status code of 400 
        for get product reviews with unknown product id`, async () => {
            const response = await request(app)
                .get(`${baseUrl}/445554/reviews`);
                expect(response.statusCode).toBe(400);
        });

        it(`should return a status code of 400 
        for get product reviews with unknown product id`, async () => {
            const response = await request(app)
                .get(`${baseUrl}/kdkkdk/reviews`);
                expect(response.statusCode).toBe(400);
        });
    });
});
