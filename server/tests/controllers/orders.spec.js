import request from 'supertest';
import app from '../../app';

 const loginResponse = async (email = 'test@test.com', password = '12345') => {
    return await request(app).post('/customers/login').send({
         email, password
     });
 }; 

 const registerResponse = async () => {
    return await request(app).post('/customers')
    .send({ name: 'Test 2', email: 'test2@test2.com', password: 'testing' });
 };

 let cart_id;
 let order_id;

 (async () => {
     const cart = await request(app).get('/shoppingcart/generateUniqueId');
     cart_id = cart.body.cart_id;

     const item = await request(app).post('/shoppingcart/add')
     .send({ cart_id, product_id: 2, attributes: 'XL' });
 })();

 const orderUrl = '/orders';

describe('/Order Routes', () => {
    it('should return 200 to post an order for a register', async () => {
        const login = await loginResponse();
        const token = login.body.accessToken;
        const response = await request(app)
           .post(orderUrl)
           .set({ USER_KEY: token })
           .send({ cart_id, shipping_id: 2, tax_id: 1 });
           order_id = response.body.orderId;
           expect(response.statusCode).toBe(200);
           expect(response.body.orderId).toBeTruthy();
    });

    it('should return 400 to post an order with incomplete fields', async () => {
        const login = await loginResponse();
        const token = login.body.accessToken;
        const response = await request(app)
           .post(orderUrl)
           .set({ USER_KEY: token })
           .send({ cart_id, tax_id: 1 });
           expect(response.statusCode).toBe(400);
           expect(response.body.errors).toBeTruthy();
    });

    it('should return 400 to post an order with incorrect cart_id', async () => {
        const login = await loginResponse();
        const token = login.body.accessToken;
        const response = await request(app)
           .post(orderUrl)
           .set({ USER_KEY: token })
           .send({ cart_id: 'joshua', tax_id: 1, shipping_id: 1 });
           expect(response.statusCode).toBe(400);
           expect(response.body.error).toBeTruthy();
    });

    it('should return 400 to post an order with incorrect tax_id', async () => {
        const login = await loginResponse();
        const token = login.body.accessToken;
        const response = await request(app)
           .post(orderUrl)
           .set({ USER_KEY: token })
           .send({ cart_id, tax_id: 3456, shipping_id: 1 });
           expect(response.statusCode).toBe(400);
           expect(response.body.error).toBeTruthy();
    });

    it('should return 400 to post an order with incorrect shipping_id', async () => {
        const login = await loginResponse();
        const token = login.body.accessToken;
        const response = await request(app)
           .post(orderUrl)
           .set({ USER_KEY: token })
           .send({ cart_id, tax_id: 1, shipping_id: 7884 });
           expect(response.statusCode).toBe(400);
           expect(response.body.error).toBeTruthy();
    });

    it('should return a status of 200 to get orders by a customer', async () => {
        const login = await loginResponse();
        const token = login.body.accessToken;
        const response = await request(app)
            .get(`${orderUrl}/inCustomer`)
            .set({ USER_KEY: token });
            expect(response.statusCode).toBe(200);
    });

    it('should return a status of 400 to get orders by a customer without orders', async () => {
        const register = await registerResponse();
        const token = register.body.accessToken;
        const response = await request(app)
            .get(`${orderUrl}/inCustomer`)
            .set({ USER_KEY: token });
            expect(response.statusCode).toBe(400);
    });

    it('should return a status of 200 for a valid order', async () => {
        const login = await loginResponse();
        const token = login.body.accessToken;
        
        const response = await request(app)
            .get(`${orderUrl}/${order_id}`)
            .set({ USER_KEY: token });
        expect(response.statusCode).toBe(200);
    });

    it('should return a status of 400 for a invalid order', async () => {
        const login = await loginResponse();
        const token = login.body.accessToken;
        
        const response = await request(app)
            .get(`${orderUrl}/8744`)
            .set({ USER_KEY: token });
        expect(response.statusCode).toBe(400);
    });

    it('should return a status of 400 for a invalid order', async () => {
        const login = await loginResponse();
        const token = login.body.accessToken;
        
        const response = await request(app)
            .get(`${orderUrl}/kdkkdk`)
            .set({ USER_KEY: token });
        expect(response.statusCode).toBe(400);
    });


    it('should return a status of 200 for a valid order to get short detail', async () => {
        const login = await loginResponse();
        const token = login.body.accessToken;
        
        const response = await request(app)
            .get(`${orderUrl}/shortDetail/${order_id}`)
            .set({ USER_KEY: token });
        expect(response.statusCode).toBe(200);
    });

    it('should return a status of 400 for a invalid order to get short detail', async () => {
        const login = await loginResponse();
        const token = login.body.accessToken;
        
        const response = await request(app)
            .get(`${orderUrl}/shortDetail/87999`)
            .set({ USER_KEY: token });
        expect(response.statusCode).toBe(400);
    });

    it('should return a status of 400 for a invalid order to get short detail', async () => {
        const login = await loginResponse();
        const token = login.body.accessToken;
        
        const response = await request(app)
            .get(`${orderUrl}/shortDetail/kdkkdd`)
            .set({ USER_KEY: token });
        expect(response.statusCode).toBe(400);
    });

    it('should return a status of 400 for a valid user without order', async () => {
        const login = await loginResponse('test2@test2.com', 'testing');
        const token = login.body.accessToken;
        
        const response = await request(app)
            .get(`${orderUrl}/shortDetail/${order_id}`)
            .set({ USER_KEY: token });
        expect(response.statusCode).toBe(400);
    });
   });
