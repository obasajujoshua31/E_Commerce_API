import models from '../models';
import BaseService from './base';
import { removePassword } from '../utils/password';


const { Customer, Shipping_Region } = models;

export default class CustomerService extends BaseService {
    static async getCustomer (option) {
        return await this.findOne(Customer, { [Object.keys(option)]: Object.values(option) });
    }

    static async createCustomer(payload) {
        const customer = await this.save(Customer, payload);
        return await this.findOne(Customer, { customer_id: customer.customer_id });
    }

    static getCustomerJSON(customer) {
        return { customer: {
            schema: removePassword(customer.dataValues),
        },
        accessToken: `Bearer ${customer.generateToken()}`,
        expires_in: '24h' 
                    
     };
    }
}
