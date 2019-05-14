import isEmpty from 'lodash.isempty';
import BaseController from './base';
import models from '../models';
import { removePassword } from '../utils/password';

const { Customer, Shipping_Region } = models;

export default class CustomerController extends BaseController {
    static registerCustomer() {
        return this.asyncFunction(async (req, res) => {
            const { name, email, password } = req.body;
            const customer = await Customer.create({
                name, 
                email,
                password
            });
            const verifiedCustomer = await Customer.findOne({ where: 
                {
                    customer_id: customer.get('customer_id')
                } });
            const customerJSON = { customer: removePassword(verifiedCustomer.dataValues), 
                accessToken: `Bearer ${customer.generateToken()}`,
                        expires_in: '24h' };
            return this.httpSuccessEachResponse(req, res, customerJSON, false);
        });
    }


    static loginCustomer() {
        return this.asyncFunction(async (req, res) => {
            const { email, password } = req.body;
            const customer = await Customer.findOne({
                where: {
                    email
                }
            });
            if (!isEmpty(customer)) {
                if (customer.confirmPassword(password)) {
                    const customerJSON = { customer: removePassword(customer.dataValues), 
                        accessToken: `Bearer ${customer.generateToken()}`,
                                expires_in: '24h' };
                    return this.httpSuccessEachResponse(req, res, customerJSON, false);
                }
                return this.httpErrorResponse(req, res, 
                    'USR_01', 
                    'Email or Password is Invalid', 'email', false);
            }
            return this.httpErrorResponse(req, res, 
                'USR_01', 
                'Email or Password is Invalid', 'email', false);
        });
    }

    static getCustomer() {
        return this.asyncFunction(async (req, res) => {
            const { customer } = req;
            
                return this.httpSuccessEachResponse(
                    req, res, removePassword(customer.dataValues), false);
        });
    }

    static updateCustomerBiodata() {
        return this.asyncFunction(async (req, res) => {
            const { customer } = req;
            const updatedCustomer = await customer.updateCustomerFields(req.body);
            return this.httpSuccessEachResponse(
                req, res, removePassword(updatedCustomer.dataValues), false);
        });
    }

    static updateCustomerCreditCard() {
        return this.asyncFunction(async (req, res) => {
            const { customer } = req;
            const updatedCustomer = await customer.updateCustomerCreditCard(req.body);
            return this.httpSuccessEachResponse(
                req, res, removePassword(updatedCustomer.dataValues), false);
        });
    }

    static updateCustomerAddress() {
        return this.asyncFunction(async (req, res) => {
            const { customer, body: { shipping_region_id } } = req;

            const foundShippingRegion = await Shipping_Region.findOne({
                where: {
                    shipping_region_id
                }
            });
            if (!isEmpty(foundShippingRegion)) {
                const updatedCustomer = await customer.updateCustomerAddress(req.body);
                return this.httpSuccessEachResponse(
                    req, res, removePassword(updatedCustomer.dataValues), false);
            }
            return this.httpErrorResponse(req, res, 'SHP', 
            'shipping_region_id is not found', 'shipping_region_id');   
        });
    }
}
