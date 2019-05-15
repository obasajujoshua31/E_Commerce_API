import isEmpty from 'lodash.isempty';
import BaseController from './base';
import models from '../models';
import generateId from '../utils/generateUniqueId';
import formatCart from '../utils/cart';
import { MOVE_TO_CART, SAVE_FOR_LATER } from '../utils/constants';

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

    static getItemsFromCart() {
        return this.asyncFunction(async(req, res) => {
            const { cart_id } = req.params;
            const items = await Shopping_Cart.findAll({
                where: {
                    cart_id
                },
                include: [{
                    model: Product
                }]
            });
            if (!isEmpty(items)) {
                return this.httpSuccessCollectionResponse(
                    req, res, formatCart(items), false);
            }
            return this.httpErrorResponse(req, res, 'SHC_02', 
                'cart is empty', 'cart_id', false);
        });
    }

    static updateItemInCart() {
        return this.asyncFunction(async (req, res) => {
           const { body: { quantity }, item } = req;
            await item.updateItem(quantity);
           const cart_id = item.get('cart_id');
           const items = await Shopping_Cart.findAll({
               where: {
                   cart_id
               }
           });
           return this.httpSuccessCollectionResponse(req, res, items, false);
    });
}

    static getTotalAmountFromCart() {
        return this.asyncFunction(async (req, res) => {
            const { cart_id } = req.params;
            
                const allItems = await Shopping_Cart.findAll({
                    where: {
                        cart_id
                    },
                    include: [{
                        model: Product
                    }]
                });
                if (!isEmpty(allItems)) {
                    const totalCount = allItems.reduce((total_amount, item) => {
                        return total_amount += item.quantity * item.Product.price - 
                            item.Product.discounted_price;
                    }, 0);
                    const resultJSON = {
                        total_amount: totalCount
                    };
                    return this.httpSuccessEachResponse(req, res, resultJSON, false);
                }
                return this.httpErrorResponse(req, res, 'SHC_02', 
                'cart is empty', 'cart_id', false);
        });
    }

    static saveProductForLater() {
        return this.asyncFunction(async(req, res) => {
            const { item } = req;
            await item.saveOrMoveToCart(SAVE_FOR_LATER);
            return this.httpSuccessCollectionResponse(req, res, [], false);
        });
    }

    static getItemsSavedForLater() {
        return this.asyncFunction(async (req, res) => {
            const { cart_id } = req.params;
            const allItems = await Shopping_Cart.findAll({
                where: {
                    cart_id,
                    buy_now: 2
                },
                include: [{
                    model: Product
                }]
            });
            if (!isEmpty(allItems)) {
                const items = [];
                allItems.forEach(item => {
                    items.push({
                        item_id: item.item_id,
                        name: item.Product.name,
                        attributes: item.attributes,
                        price: item.Product.price
                    });
                });

                return this.httpSuccessCollectionResponse(req, res, items, false);
            }
            return this.httpErrorResponse(req, res, 'SHC_02', 
                'no saved items is the cart', 'cart_id', false);
        });
    }

    static moveToCart() {
        return this.asyncFunction(async (req, res) => {
            const { item } = req;
            await item.saveOrMoveToCart(MOVE_TO_CART);
            return this.httpSuccessCollectionResponse(req, res, [], false);
        });
    }

    static removeItemFromCart() {
        return this.asyncFunction(async (req, res) => {
            const { item } = req;
                await item.destroy();
                return this.httpSuccessCollectionResponse(req, res, [], false);
        });
    }

    static emptyCart() {
        return this.asyncFunction(async (req, res) => {
            const { cart_id } = req.params;
            const cart = await Shopping_Cart.findAll({
                where: {
                    cart_id
                }
            });
            if (!isEmpty(cart)) {
                await Shopping_Cart.destroy({
                    where: {
                        cart_id
                    }
                });
            }
            return this.httpSuccessCollectionResponse(req, res, [], false);
        });
    }
}
