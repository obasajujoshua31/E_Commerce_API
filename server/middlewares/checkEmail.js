import isEmpty from 'lodash.isempty';
import models from '../models';

const { customer } = models;


export default async (req, res, next) => {
    const foundcustomer = await customer.findOne({
        where: {
            email: req.body.email
        }
    });
    if (!isEmpty(foundcustomer)) {
        return res.status(400).json({
            code: 'USR_02',
            message: 'The field email is not available',
            field: 'email'
        });
    }
    return next();
};
