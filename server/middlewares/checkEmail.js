import isEmpty from 'lodash.isempty';
import models from '../models';

const { Customer } = models;


export default async (req, res, next) => {
    const customer = await Customer.findOne({
        where: {
            email: req.body.email
        }
    });
    if (!isEmpty(customer)) {
        return res.status(400).json({
            code: 'USR_02',
            message: 'The field email is not available',
            field: 'email'
        });
    }
    return next();
};
