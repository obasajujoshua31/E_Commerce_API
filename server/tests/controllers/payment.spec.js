import request from 'supertest';
import sinon from 'sinon';
import app from '../../app';
import stripe from '../../utils/charge';

const stub = (response = Promise.resolve({ name: 'Joshua', amount: 400 })) => {
    sinon.stub(stripe, 'makePayment').returns(response);
};

const reset = () => {
    sinon.reset();
};
// const error = () => {
//     throw {
//        message: 'User is not authenticated',
//        type: 'StripeInvalidRequestError'
//     };
// };
const makeError = () => {
    const error = new Error('User is not authenticated');
    error.type = 'StripeInvalidRequestError';
    return error;
};


const baseUrl = '/stripe';

describe('Payment Routes', () => {
 it('should return 400 for a post request without items', async() => {
     const response = await request(app)
        .post(`${baseUrl}/charge`);
        expect(response.statusCode).toBe(400);
 });

 it('should return a status Code of 200 for a valid input credentials', async () => {
     stub();
    const response = await request(app)
        .post(`${baseUrl}/charge`)
        .send({ amount: 400, description: 'Joshua', stripeToken: 'joshua', currency: 'USD' });
        expect(response.statusCode).toBe(200);
 });

 it(`should return a status Code of 200 for a 
    valid input credentials without currency`, async () => {
    const response = await request(app)
        .post(`${baseUrl}/charge`)
        .send({ amount: 400, description: 'Joshua', stripeToken: 'joshua' });
        expect(response.statusCode).toBe(200);
 });
});
