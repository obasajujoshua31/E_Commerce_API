import isEmpty from 'lodash.isempty';
import models from '../models';

const { customer } = models;

/**
 * @description This method searches 
 * the customer table and returns 
 * the customer where the customer_id 
 * matches the given customer_id, it 
 * returns response based on whether it is found or not
 * @param  {object} req
 * @param  {object} res
 * @param  {Function} next
 * @returns {object} Server Response
 */
export default async (req, res, next) => {
    const { customer_id } = req.user;

    const foundcustomer = await customer.findOne({
        where: {
            customer_id
        }
    });
    if (!isEmpty(foundcustomer)) {
        req.customer = foundcustomer;
         return next();
    }
    return res.status(400).json({
        code: 'USR_02',
        message: 'Customer not found',
        field: 'customer'
    });
};
