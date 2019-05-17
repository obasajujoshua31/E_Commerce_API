import request from 'supertest';
import app from '../../app';

const baseUrl = '/shoppingcart';
const orderUrl = '/orders';

const loginResponse = async () => {
    return await request(app).post('/customers/login').send({
         email: 'test@test.com', password: '12345'
     });
 }; 

 const cartResponse = async () => {
     const cart = await request(app).get('/shoppingcart/generateUniqueId');
     return cart.body.cart_id;
 };

 const itemResponse = async () => {
     const cart_id = await cartResponse();
     await request(app).post('/shoppingcart/add')
    .send({ cart_id, product_id: 2, attributes: 'XL' });

    const response = await request(app)
                    .get(`shoppingcart/${cart_id}`);
                return response.body[0].item_id;
 };

describe('Shopping Cart, Order and Payment', () => {
    let cart_id;
    let item_id;
    describe('/Shopping Cart Routes', () => {
        it('should return a status code of 200 to generate a shopping cart id', async () => {
            const response = await request(app)
                .get(`${baseUrl}/generateUniqueId`);
                cart_id = response.body.cart_id;
                expect(response.statusCode).toBe(200);
                expect(response.body.cart_id).toBeTruthy();
        });


        it('should return a status code of 200 to add items to cart', async () => {
            const response = await request(app)
                .post(`${baseUrl}/add`)
                .send({ cart_id, product_id: 1, attributes: 'XL' });
                expect(response.statusCode).toBe(200);
        });

        it('should return a status code of 200 to add items to cart', async () => {
            const response = await request(app)
                .post(`${baseUrl}/add`)
                .send({ cart_id, product_id: 5, attributes: 'XL' });
                expect(response.statusCode).toBe(200);
        });

        it('should return a status code of 200 to add items to cart', async () => {
            const response = await request(app)
                .post(`${baseUrl}/add`)
                .send({ cart_id, product_id: 5, attributes: 'XL' });
                expect(response.statusCode).toBe(200);
        });
        
        it('should return 400 to add items for invalid post items', async () => {
            const response = await request(app)
                .post(`${baseUrl}/add`);
                expect(response.statusCode).toBe(400);
        });

        it('should return 400 to add items for an invalid product_id', async () => {
            const response = await request(app)
                .post(`${baseUrl}/add`)
                .send({ cart_id, product_id: 88887, attributes: 'XL' });
                expect(response.statusCode).toBe(400);
        });

        it('should return 400 to add items for an invalid attributes', async () => {
            const response = await request(app)
                .post(`${baseUrl}/add`)
                .send({ cart_id, product_id: 2, attributes: 45 });
                expect(response.statusCode).toBe(400);
        });


        it('should return a status code of 200 to get items from cart', async () => {
            const response = await request(app)
                .get(`${baseUrl}/${cart_id}`);
               item_id = response.body[0].item_id;
                expect(response.statusCode).toBe(200);
        });

        it('should return a status code of 400 to get items from an unknown cart', async () => {
            const response = await request(app)
                .get(`${baseUrl}/joshua`);
                expect(response.statusCode).toBe(400);
        });

        it('should return a status code of 200 to update items in a cart', async () => {
            const response = await request(app)
                .put(`${baseUrl}/update/${item_id}`)
                .send({ quantity: 34 });
                expect(response.statusCode).toBe(200);
        });

        it('should return a status code of 400 to update items in a cart without quantity', async () => {
            const response = await request(app)
                .put(`${baseUrl}/update/${item_id}`);
                expect(response.statusCode).toBe(400);
        });

        it('should return a status code of 400 to update items with wrong item id', async () => {
            const response = await request(app)
                .put(`${baseUrl}/update/kdkkdd`)
                .send({ quantity: 34 });
                expect(response.statusCode).toBe(400);
        });
        

        it('should return a status code of 200 to get Total amount from cart', async () => {
            const response = await request(app)
                .get(`${baseUrl}/totalAmount/${cart_id}`);
                expect(response.statusCode).toBe(200);
        });

        it(`should return a status code of 400 to get 
        Total amount from cart with a wrong cart_id`, async () => {
            const response = await request(app)
                .get(`${baseUrl}/totalAmount/kdkkdl`);
                expect(response.statusCode).toBe(400);
        });

        it('should return a status code of 200 to save item for later', async () => {
            const response = await request(app)
                .get(`${baseUrl}/saveForLater/${item_id}`);
                expect(response.statusCode).toBe(200);
        });

        it(`should return a status code of 400 to save 
        item for later with wrong item`, async () => {
            const response = await request(app)
                .get(`${baseUrl}/saveForLater/kdkkdkd`);
                expect(response.statusCode).toBe(400);
        });

        it(`should return a status code of 200 to get 
        items saved for later`, async () => {
            const response = await request(app)
                .get(`${baseUrl}/getSaved/${cart_id}`);
                expect(response.statusCode).toBe(200);
        });

        it(`should return a status code of 400 to get 
        items saved for later with a wrong cart_id`, async () => {
            const response = await request(app)
                .get(`${baseUrl}/getSaved/kdlld`);
                expect(response.statusCode).toBe(400);
        });


        it(`should return a status code of 200 to move items 
        to cart`, async () => {
            const response = await request(app)
                .get(`${baseUrl}/moveToCart/${item_id}`);
                expect(response.statusCode).toBe(200);
        });

        it(`should return a status code of 400 to move items 
        to cart with a wrong item_id`, async () => {
            const response = await request(app)
                .get(`${baseUrl}/moveToCart/kdkkdl`);
                expect(response.statusCode).toBe(400);
        });

        it(`should return a status code of 200 to remove item
        to cart`, async () => {
            const response = await request(app)
                .delete(`${baseUrl}/removeProduct/${item_id}`);
                expect(response.statusCode).toBe(200);
        });

        it(`should return a status code of 400 to remove item
        to cart with a wrong item_id`, async () => {
            const response = await request(app)
                .delete(`${baseUrl}/removeProduct/kdkkdd`);
                expect(response.statusCode).toBe(400);
        });

        it(`should return a status code of 200 to empty items 
        in cart`, async () => {
            const response = await request(app)
                .delete(`${baseUrl}/empty/${cart_id}`);
                expect(response.statusCode).toBe(200);
        });

        it(`should return a status code of 400 to empty items 
        in cart with a wrong cart_id`, async () => {
            const response = await request(app)
                .delete(`${baseUrl}/empty/kkdkkd`);
                expect(response.statusCode).toBe(400);
        });
    });
});
