import isEmpty from 'lodash.isempty';
import BaseController from './base';
import CustomerService from '../services/customer';
import { removePassword } from '../utils/password';
import verifyFacebookToken from '../utils/verifyFacebookToken';

export default class CustomerController extends BaseController {
     /**
     * @returns {Promise<Function>} createCustomer
     */
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


     /**
     * @returns {Promise<Function>} loginCustomer
     */
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


     /**
     * @returns {Promise<Function>} getCustomer
     */
    static getCustomer() {
        return this.asyncFunction(async (req, res) => {
            const { customer } = req;
            
                return this.httpSuccessEachResponse(
                    req, res, removePassword(customer.dataValues), false);
        });
    }
    

     /**
     * @returns {Promise<Function>} loginViaFacebook
     */
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
            return this.httpSuccessEachResponse(req, res, customerJSON, false);
        }
        const resultJSON = CustomerService.getCustomerJSON(customer);
        return this.httpSuccessEachResponse(req, res, resultJSON, false);
      }, true);
    }


     /**
     * @returns {Promise<Function>} updateCustomerBiodata
     */
    static updateCustomerBiodata() {
        return this.asyncFunction(async (req, res) => {
            const { customer } = req;
            const updatedCustomer = await customer.updateCustomerFields(req.body);
            return this.httpSuccessEachResponse(
                req, res, removePassword(updatedCustomer.dataValues), false);
        });
    }


     /**
     * @returns {Promise<Function>} updateCustomerCreditCard
     */
    static updateCustomerCreditCard() {
        return this.asyncFunction(async (req, res) => {
            const { customer } = req;
            const updatedCustomer = await customer.updateCustomerCreditCard(req.body);
            return this.httpSuccessEachResponse(
                req, res, removePassword(updatedCustomer.dataValues), false);
        });
    }


     /**
     * @returns {Promise<Function>} updateCustomerAddress
     */
    static updateCustomerAddress() {
        return this.asyncFunction(async (req, res) => {
            const { customer } = req;
            
                const updatedCustomer = await customer.updateCustomerAddress(req.body);
                return this.httpSuccessEachResponse(
                    req, res, removePassword(updatedCustomer.dataValues), false);
        });
    }
}
