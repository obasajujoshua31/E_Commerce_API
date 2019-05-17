import isEmpty from 'lodash.isempty';
import models from '../models';
import { isValid } from '../utils/getPageParams';

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

export const findItem = async (req, res, next) => {
    const { item_id } = req.params;

    if (isValid(item_id).valid) {
        const item = await Shopping_Cart.findOne({
            where: {
                item_id
            }
        });
        if (!isEmpty(item)) {
            req.item = item;
            return next();
        }
        return res.status(400).json({
            error: {
                code: 'ITM_O2',
                message: 'the field item is empty',
                field: 'item'
            }
        });
    }
    return res.status(400).json({
        error: {
            code: 'ITM_01',
            message: `The ID ${item_id} is not a number`,
            field: 'item_id'
        }
    });
};
