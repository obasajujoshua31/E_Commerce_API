import models from '../models';
import BaseService from './base';
import { removePassword } from '../utils/password';


const { customer } = models;

export default class CustomerService extends BaseService {
    static async getCustomer (option) {
        return await this.findOne(customer, { [Object.keys(option)]: Object.values(option) });
    }

    static async createCustomer(payload) {
        const newcustomer = await this.save(customer, payload);
        return await this.findOne(customer, { customer_id: newcustomer.customer_id });
    }

    static getCustomerJSON(customerData) {
        return { customer: {
            schema: removePassword(customerData.dataValues),
        },
        accessToken: `Bearer ${customerData.generateToken()}`,
        expires_in: '24h' 
                    
     };
    }
}
