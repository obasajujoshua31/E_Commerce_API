import isEmpty from 'lodash.isempty';
import BaseController from './base';
import OrderService from '../services/order';
import ShoppingCartService from '../services/shoppingCart';
import queue from '../worker/worker';
import formatOrder, { prepareOrderInfo, prepareProducts } from '../utils/formatOrder';


export default class OrderController extends BaseController {
    static getOrderInfo() {
        return this.asyncFunction(async (req, res) => {
            const { params: { order_id } } = req;
            
                const orders = await OrderService.getInfo(order_id);
                    const allOrders = prepareOrderInfo(orders);
                    return this.httpSuccessCollectionResponse(req, res, allOrders, true);
        });
    }

    static postAnOrder() {
        return this.asyncFunction(async (req, res) => {
            const { body: { cart_id, shipping_id, tax_id }, user: { customer_id }, customer } = req;
            
            const cart = await ShoppingCartService.getProducts(cart_id);

                const totalCount = cart.reduce((total_amount, item) => {
                    return total_amount += item.quantity * item.product.price - 
                        item.product.discounted_price;
                }, 0);

                const order = await OrderService.createOrder({
                    shipping_id,
                    tax_id,
                    total_amount: totalCount,
                    customer_id,
                    created_on: new Date()
                });
                const order_id = order.get('order_id');
                const allItems = prepareProducts(cart, order_id);
                await OrderService.createOrderDetails(allItems);
                queue.create('send-notification', { email: customer.email, payload: allItems });
                const resultJSON = {
                    orderId: order_id
                };
                return this.httpSuccessEachResponse(req, res, resultJSON, false);
        });
    }

    static getCustomerOrder() {
        return this.asyncFunction(async (req, res) => {
            const { customer_id } = req.user;
            
            const customerOrders = await OrderService.getOrdersByCustomer(customer_id);
            
            if (!isEmpty(customerOrders)) {
                return this.httpSuccessCollectionResponse(req, res, customerOrders, false);
            }
            return this.httpErrorResponse(req, res, 'ORD_02', 
            'order for customer is empty', 'customer_id', false);
        });
    }

    static getOrderShortDetail() {
        return this.asyncFunction(async (req, res) => {
            const { order_id } = req.params;
                const orders = await OrderService.getOrderDetail(order_id);
                    return this.httpSuccessEachResponse(
                        req, res, formatOrder(orders.dataValues), true);
        });
    }
}
