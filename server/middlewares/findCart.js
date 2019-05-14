import isEmpty from 'lodash.isempty';
import models from '../models';

const { Shopping_Cart } = models;

export default async (req, res, next) => {
    const { cart_id } = req.body;

    const cart = await Shopping_Cart.findOne({
        where: {
            cart_id
        }
    });
    if (!isEmpty(cart)) {
        return next();
    }
    return res.status(400).json({
        error: {
            code: 'SHC_02',
            message: 'the field shopping cart is empty',
            field: 'shopping_cart'
        }
    });
};
