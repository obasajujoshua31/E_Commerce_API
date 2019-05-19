import models from '../models';
import BaseService from './base';


const { order_detail, orders } = models;

export default class OrderService extends BaseService {
    static async getInfo (order_id) {
       return await this.findAll(order_detail, {
           where: {
            order_id, 
           }
       });
    }

    static async confirmOrderAndCustomer (order_id, customer_id) {
        return await this.findAll(orders, {
            where: {
             order_id, 
             customer_id
            }
        });
     }

    static async createOrder(payload) {
        return await this.save(orders, payload);
    }

    static async createOrderDetails(allItems) {
       return await order_detail.bulkCreate(allItems, {
            fields: ['item_id', 'order_id', 'order_id', 'product_id', 
            'attributes', 'product_name', 'quantity', 'unit_cost'],
            updateOnDuplicate: ['item_id']
        });
    }

    static async getOrdersByCustomer(customer_id) {
        return await this.findAll(orders, {
            where: {
                customer_id
            },
            include: [{
                model: order_detail
            }]
        });
    }

    static async getOrderDetail(order_id) {
        return await this.findOne(orders, { order_id });
    }
}
