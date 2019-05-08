import isEmpty from 'lodash.isempty';
import models from '../models';

const { Customer } = models;


export default async (req, res, next) => {
    const { customer_id } = req.user;

    const customer = await Customer.findOne({
        where: {
            customer_id
        }
    });
    if (!isEmpty(customer)) {
        req.customer = customer;
         return next();
    }
    return res.status(400).json({
        code: 'USR_02',
        message: 'Customer not found',
        field: 'customer'
    });
};
