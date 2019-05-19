import isEmpty from 'lodash.isempty';
import models from '../models';

const { customer } = models;


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
