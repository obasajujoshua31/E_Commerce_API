import isEmpty from 'lodash.isempty';
import BaseController from './base';
import CustomerService from '../services/customer';
import { removePassword } from '../utils/password';
import ShippingRegionService from '../services/shipping';
import verifyFacebookToken from '../utils/verifyFacebookToken';

export default class CustomerController extends BaseController {
    static registerCustomer() {
        return this.asyncFunction(async (req, res) => {
            const { name, email, password } = req.body;
            const customer = await CustomerService.createCustomer({
                name, 
                email,
                password,
            });
            const customerJSON = CustomerService.getCustomerJSON(customer);
            return this.httpSuccessEachResponse(req, res, customerJSON, false);
        });
    }


    static loginCustomer() {
        return this.asyncFunction(async (req, res) => {
            const { email, password } = req.body;
            const customer = await CustomerService.getCustomer({ email });
            
            if (!isEmpty(customer)) {
                if (customer.confirmPassword(password)) {
                    const customerJSON = CustomerService.getCustomerJSON(customer);
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

    static facebookLogin() {
      return this.asyncFunction(async (req, res) => {
        const { access_token } = req.body;
        const { data: { email, name } } = await verifyFacebookToken(access_token);
        const customer = await CustomerService.getCustomer({ email });
        if (isEmpty(customer)) {
            const newCustomer = await CustomerService.createCustomer({
                email,
                name,
                password: ''
            });
            const customerJSON = CustomerService.getCustomerJSON(newCustomer);
            const resultJSON = {
                customer: {
                    schema: customerJSON.customer,
                    accessToken: customerJSON.accessToken,
                    expires_in: customerJSON.expires_in
            }
        };

            return this.httpSuccessEachResponse(req, res, resultJSON, false);
        }
        const resultJSON = {
         customer: {
             schema: removePassword(customer.dataValues)
         },
         accessToken: `Bearer ${customer.generateToken()}`
     };
        return this.httpSuccessEachResponse(req, res, resultJSON, false);
      }, true);
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

            const foundShippingRegion = await 
                ShippingRegionService.getOneShipping(shipping_region_id);
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
