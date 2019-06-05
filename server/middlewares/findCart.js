import isEmpty from 'lodash.isempty';
import models from '../models';
import { isValid } from '../utils/getPageParams';

const { shopping_cart } = models;

/**
 * @description This method searches 
 * the shopping cart table given 
 * the cart_id and returns response if shopping cart is found or not
 * @param  {object} req
 * @param  {object} res
 * @param  {Function} next
 * @returns {object} Server Response
 */
export default async (req, res, next) => {
    const { cart_id } = req.body;

    const cart = await shopping_cart.findOne({
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
/**
 * @description This method searches 
 * the shopping cart table where 
 * item_id matches the item_id, it returns response based on whether the item is found or not
 * @param  {object} req
 * @param  {object} res
 * @param  {Function} next
 * @returns {object} Server Response
 */
export const findItem = async (req, res, next) => {
    const { item_id } = req.params;

    if (isValid(item_id).valid) {
        const item = await shopping_cart.findOne({
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
