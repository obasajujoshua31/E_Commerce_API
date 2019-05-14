import isEmpty from 'lodash.isempty';
import BaseController from './base';
import models from '../models';
import generateId from '../utils/generateUniqueId';
import formatCart from '../utils/cart';

const { Shopping_Cart, Product } = models;

export default class aShoppingCart extends BaseController {
    static generateUniqueId() {
        return this.asyncFunction((req, res) => {
            res.status(200).json({
                cart_id: generateId()
            });
        });
    }


    static addProductToCart() {
        return this.asyncFunction(async(req, res) => {
            const { body: { cart_id, product_id, attributes } } = req;
            const cart = await Shopping_Cart.findOne({
                where: {
                    cart_id,
                    attributes,
                    product_id
                }
            });
            if (isEmpty(cart)) {
                 await Shopping_Cart.create({
                    cart_id,
                    product_id,
                    attributes,
                    quantity: 1,
                    added_on: new Date()
                });
            } else {
                await cart.increment('quantity');
            }
           
            const allProductsInCart = await Shopping_Cart.findAll({
                where: {
                    cart_id
                },
                include: [{
                    model: Product
                }]
            });
            return this.httpSuccessCollectionResponse(
                req, res, formatCart(allProductsInCart), false);
        });
    }
}
