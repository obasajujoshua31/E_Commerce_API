import models from '../models';
import BaseService from './base';


const { Order_Detail, Orders, Shopping_Cart, Product } = models;

export default class OrderService extends BaseService {
    static async getInfo (order_id) {
       return this.findAll(Order_Detail, { order_id });
    }

    static async createOrder(payload) {
        return await this.save(Orders, payload);
    }

    static async createOrderDetails(allItems) {
       return await Order_Detail.bulkCreate(allItems, {
            fields: ['item_id', 'order_id', 'order_id', 'product_id', 
            'attributes', 'product_name', 'quantity', 'unit_cost'],
            updateOnDuplicate: ['item_id']
        });
    }

    static async getOrdersByCustomer(customer_id) {
        return await this.findAll(Orders, {
            where: {
                customer_id
            },
            include: [{
                model: Order_Detail
            }]
        });
    }

    static async getOrderDetail(order_id) {
        return await this.findOne(Orders, { order_id });
    }
}
