import promise from 'bluebird';
import models from '../models';
import BaseService from './base';

const { order_detail, orders } = models;

export default class OrderService extends BaseService {
    /**
     * @description This searches 
     * the order_detail table and 
     * returns all rows where order_id matces the given order_id
     * @param  {number} order_id
     * @returns  {Promise<Array>} allInfo 
     * @member OrderService
     */
    static async getInfo (order_id) {
       return await this.findAll(order_detail, {
           where: {
            order_id, 
           }
       });
    }

/**
 * @description This returns all 
 * rows in the orders table where
 *  order_id and customer_id matches the given order_id and customer_id
 * @param  {number} order_id
 * @param  {number} customer_id
 * @returns  {Promise<Array>} OrderandCustomer 
 * @member OrderService
 */
    static async confirmOrderAndCustomer (order_id, customer_id) {
        return await this.findAll(orders, {
            where: {
             order_id, 
             customer_id
            }
        });
     }

    /**
     * @description This creates new order row in the order table given the payload
     * @param  {object} payload
     * @returns  {Promise<object>} new Order
     * @member OrderService
     */
    static async createOrder(payload) {
        return await this.save(orders, payload);
    }
    
    /**
     * @description This method create multiple rows in the order_detail table 
     * @param  {Array} allItems
     * @returns  {Promise<Array>} new Order Details 
     * @member OrderService
     */
    static async createOrderDetails(allItems) {
        promise.mapSeries(allItems, (item) => {
            order_detail.create(item);
        }).then(result => {
            return result;
        });
    }

    /**
     * @description This method 
     * searches the orders table and 
     * retrieves every row where customer_id matches the given customer_id
     * @param  {id} customer_id
     * @returns  {Promise<Array>} ordersByCustomer
     * @member  OrderService
     */
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

    /**
     * @description This searches the 
     * orders table and returns the row where the order_id matches the given order_id
     * @param  {number} order_id
     * @returns  {Promise<Object>} orderDetail
     * @member OrderService
     */
    static async getOrderDetail(order_id) {
        return await this.findOne(orders, { order_id });
    }

    /**
     * @description This service mark a certain order as paid
     * @param  {object} order
     * @member OrderService
     */
    static async markOrderAsPaid(order) {
        order.confirmPayment();
    }
}
