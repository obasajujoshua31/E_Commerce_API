import request from 'supertest';
import axios from 'axios';
import mockAdapter from 'axios-mock-adapter';
import app from '../../app';

const mock = new mockAdapter(axios);

const baseUrl = '/customers';
const customerUrl = '/customer';

describe('Customers Routes', () => {
    let token;
    describe('/Customers', () => {
        it('should return a status code of 200 register a valid customer', async () => {
            const response = await request(app)
                .post(baseUrl)
                .send({ name: 'test', email: 'test@test.com', password: '12345' });
                expect(response.statusCode).toBe(200);
        });

        it('should return a status code of 400 to register an invalid customer', async () => {
            const response = await request(app)
                .post(baseUrl);
                expect(response.statusCode).toBe(400);
        });

        it(`should return a status code of 400 for get 
        register a customer that is already registered`, async () => {
            const response = await request(app)
                .post(baseUrl)
                .send({ name: 'test', email: 'test@test.com', password: '12345' });
                expect(response.statusCode).toBe(400);
        });

        it('should return a status code of 200 for  login a registered customer', async () => {
            const response = await request(app)
                .post(`${baseUrl}/login`)
                .send({ email: 'test@test.com', password: '12345' });
                expect(response.statusCode).toBe(200);
                token = response.body.accessToken;
        });

        it('should return a status code of 400 for login for empty field', async () => {
            const response = await request(app)
            .post(`${baseUrl}/login`);
                expect(response.statusCode).toBe(400);
        });

        it('should return a status code of 400 for  login with an incorrect password', async () => {
            const response = await request(app)
            .post(`${baseUrl}/login`)
                .send({ email: 'test@test.com', password: '123459kdd' });
                expect(response.statusCode).toBe(400);
        });

        it('should return a status code of 400 for  login with an unregistered email', async () => {
            const response = await request(app)
            .post(`${baseUrl}/login`)
                .send({ email: 'tester@tester.com', password: '123459kdd' });
                expect(response.statusCode).toBe(400);
        });

        it(`should return a status code of 200 for  update a 
        registered customer Credit Card`, async () => {
            const response = await request(app)
                .put(`${baseUrl}/creditCard`)
                .set({ USER_KEY: token } )
                .send({ credit_card: 'Test Card' });
                expect(response.statusCode).toBe(200);
        });

        it(`should return a status code of 401 for  update a 
        customer without token`, async () => {
            const response = await request(app)
                .put(`${baseUrl}/creditCard`)
                .send({ credit_card: 'Test Card' });
                expect(response.statusCode).toBe(401);
        });

        it(`should return a status code of 401 for  update a 
        customer with deformed token`, async () => {
            const response = await request(app)
                .put(`${baseUrl}/creditCard`)
                .set({ USER_KEY: 'kelive' } )
                .send({ credit_card: 'Test Card' });
                expect(response.statusCode).toBe(401);
        });

        it(`should return a status code of 400 for  update a 
        registered customer with empty credit card field`, async () => {
            const response = await request(app)
                .put(`${baseUrl}/creditCard`)
                .set('USER_KEY', token);
                expect(response.statusCode).toBe(400);
        });

        it(`should return a status code of 200 for  update a 
        registered customer address`, async () => {
            const response = await request(app)
                .put(`${baseUrl}/address`)
                .set({ USER_KEY: token } )
                .send({ address_1: 'Joshua',
                city: 'Ikeja', 
                region: 'Lagos',
                postal_code: '234 Lagos',
                country: 'Nigeria',
                shipping_region_id: 1
         });
                expect(response.statusCode).toBe(200);
        });

        it(`should return a status code of 400 for  update a 
        registered customer address with empty fields`, async () => {
            const response = await request(app)
                .put(`${baseUrl}/address`)
                .set({ USER_KEY: token } );
                expect(response.statusCode).toBe(400);
        });

        it(`should return a status code of 400 for  update a 
        registered customer address with an unregistered shipping region`, async () => {
            const response = await request(app)
                .put(`${baseUrl}/address`)
                .set({ USER_KEY: token } )
                .send({ address_1: 'Joshua',
                city: 'Ikeja', 
                region: 'Lagos',
                postal_code: '234 Lagos',
                country: 'Nigeria',
                shipping_region_id: 98
         });
                expect(response.statusCode).toBe(400);
        });

        it(`should return a status code of 400 for login 
        a customer via facebook without the accessToken`, async () => {
            const response = await request(app)
                .post(`${baseUrl}/facebook`);
                expect(response.statusCode).toBe(400);
        });

        it(`should return a status code of 200 for login 
        a customer via facebook with the accessToken`, async () => {
            mock.onGet('https://graph.facebook.com/me?fields=name,gender,location,email&access_token=joshua').reply(200, {
                email: 'test@test.com', name: 'Test Test'
            });
            const response = await request(app)
                .post(`${baseUrl}/facebook`)
                .send({ access_token: 'joshua' });
                expect(response.statusCode).toBe(200);
        });

        it(`should return a status code of 200 for  update a 
        registered customer Credit Card`, async () => {
            const response = await request(app)
                .get(customerUrl)
                .set({ USER_KEY: token } );
                expect(response.statusCode).toBe(200);
        });

        it(`should return a status code of 200 for  update a 
        registered customer Bio Data`, async () => {
            const response = await request(app)
                .put(customerUrl)
                .send({ name: 'tester', email: 'test@test.com', password: '12345' })
                .set({ USER_KEY: token } );
                expect(response.statusCode).toBe(200);
        });

        it(`should return a status code of 200 for login 
        a customer via facebook with the accessToken for a new customer`, async () => {
            mock.onGet('https://graph.facebook.com/me?fields=name,gender,location,email&access_token=fredrick').reply(200, {
                email: 'tester@tester.com', name: 'Test Test'
            });
            const response = await request(app)
                .post(`${baseUrl}/facebook`)
                .send({ access_token: 'fredrick' });
                expect(response.statusCode).toBe(200);
        });
    });
});
