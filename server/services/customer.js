import models from '../models';
import BaseService from './base';
import { removePassword } from '../utils/password';


const { customer } = models;

export default class CustomerService extends BaseService {
    /**
     * @description This service 
     * searches the customer table 
     * and retrieves the row based on the option provided
     * @param  {object} option
     * @returns  {Promise<object>} customer
     * @member CustomerService
     */
    static async getCustomer (option) {
        return await this.findOne(customer, { [Object.keys(option)]: Object.values(option) });
    }

    
    /**
     * @description This service creates a new Customer row in the customer table given the payload
     * @param  {object} payload
     * @returns  {Promise<object>} new Customer
     * @member CustomerService
     */
    static async createCustomer(payload) {
        const newcustomer = await this.save(customer, payload);
        return await this.findOne(customer, { customer_id: newcustomer.customer_id });
    }

    /**
     * @description This service formats customer object to be returned to the client
     * @param  {object} customerData
     * @returns  {object} customerJSON
     * @member CustomerService
     */
    static getCustomerJSON(customerData) {
        return { customer: {
            schema: removePassword(customerData.dataValues),
        },
        accessToken: `Bearer ${customerData.generateToken()}`,
        expires_in: '24h' 
                    
     };
    }
}
