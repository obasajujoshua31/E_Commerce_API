import isEmpty from 'lodash.isempty';
import BaseController from './base';
import models from '../models';
import { isValid } from '../utils/getPageParams';
import formatOrder from '../utils/formatOrder';


const { Order_Detail, Orders, Shopping_Cart, Product } = models;

export default class OrderController extends BaseController {
    static getOrderInfo() {
        return this.asyncFunction(async (req, res) => {
            const { order_id } = req.params;
            if (isValid(order_id).valid) {
                const order = await Order_Detail.findAll({
                    where: {
                        order_id
                    }
                });
    
                if (!isEmpty(order)) {
                    const allOrders = [];
                    order.forEach(item => {
                        allOrders.push({
                            order_id: item.order_id,
                            product_id: item.product_id,
                            attributes: item.attributes,
                            product_name: item.product_name,
                            quantity: item.quantity,
                            unit_cost: item.unit_cost,
                            subtotal: item.quantity * item.unit_cost
                        });
                    });
                    return this.httpSuccessCollectionResponse(req, res, allOrders, true);
                }
                return this.httpErrorResponse(req, res, 'ORD_02', 
                'order is empty', 'order_id', false);
            }
            return this.httpErrorResponse(req, res, 'ORD_01', 
            `The ID ${order_id} is not a number`, 'order_id');
        });
    }

    static postAnOrder() {
        return this.asyncFunction(async (req, res) => {
            const { body: { cart_id, shipping_id, tax_id }, user: { customer_id } } = req;

            const cart = await Shopping_Cart.findAll({
                where: {
                    cart_id
                },
                include: [{
                    model: Product
                }]
            });

            const ids = [];
            cart.forEach(item => {
                ids.push(item.item_id);
            });
            const placedOrder = await Order_Detail.findOne({
                where: {
                    item_id: {
                        $in: ids
                    }
                }
            });
            if (!isEmpty(placedOrder)) {
                const totalCount = cart.reduce((total_amount, item) => {
                    return total_amount += item.quantity * item.Product.price - 
                        item.Product.discounted_price;
                }, 0);
                const order = await Orders.create({
                    shipping_id,
                    tax_id,
                    total_amount: totalCount,
                    customer_id,
                    created_on: new Date()
                });
                const order_id = order.get('order_id');
                let allItems = [];
    
                cart.forEach(item => {
                    allItems.push({
                        item_id: item.item_id,
                        order_id,
                        product_id: item.product_id,
                        attributes: item.attributes,
                        product_name: item.Product.name,
                        quantity: item.quantity,
                        unit_cost: item.Product.price
                    });
                });
    
                await Order_Detail.bulkCreate(allItems);
                const resultJSON = {
                    orderId: order_id
                };
                return this.httpSuccessEachResponse(req, res, resultJSON, false);
            }
            return this.httpErrorResponse(req, res, 'ORD_02', 
                'You have already placed these orders', 'order', false);
        });
    }

    static getCustomerOrder() {
        return this.asyncFunction(async (req, res) => {
            const { customer_id } = req.user;
            
            const customerOrders = await Orders.findAll({
                where: {
                    customer_id
                },
                include: [{
                    model: Order_Detail
                }]
            });
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
            if (isValid(order_id).valid) {
                const orders = await Orders.findOne({
                    where: {
                        order_id
                    }
                });
                if (!isEmpty(orders)) {
                    return this.httpSuccessEachResponse(
                        req, res, formatOrder(orders.dataValues), true);
                }
                return this.httpErrorResponse(req, res, 'ORD_02', 
                'order is empty', 'order_id', true);
            }
            return this.httpErrorResponse(req, res, 'ORD_01', 
            `The ID ${order_id} is not a number`, 'order_id');
        });
    }
}
