import isEmpty from 'lodash.isempty';
import models from '../models';

const { Shipping } = models;

export default async (req, res, next) => {
    const { shipping_id } = req.body;

    const shipping = await Shipping.findOne({
        where: {
            shipping_id
        }
    });
    if (!isEmpty(shipping)) {
        return next();
    }
    return res.status(400).json({
        error: {
            code: 'SHP_02',
            message: 'the field shipping is empty',
            field: 'shipping'
        }
    });
};
