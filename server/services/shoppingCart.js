import models from '../models';
import BaseService from './base';
import { SAVE_FOR_LATER, MOVE_TO_CART } from '../utils/constants';


const { shopping_cart, product } = models;

export default class ShoppingCartService extends BaseService {
    static async getProducts(cart_id, option = true) {
       return this.findAll(shopping_cart, {
        where: {
            cart_id,
            buy_now: MOVE_TO_CART
        },
        include: option ? 
        [{
            model: product
        }] : []
    });
    }

    static async getOneCart(cart_id, attributes, product_id) {
        return shopping_cart.findOne({
            where: {
                cart_id,
                attributes,
                product_id
            }
        });
    }

    static async createCart(payload) {
        return this.save(shopping_cart, payload);
    }
    
    static async dropCart(cart_id) {
        return await shopping_cart.destroy({
            where: {
                cart_id
            }
        });
    }

    static getAllSavedItems(cart_id) {
        return shopping_cart.findAll({
            where: {
                cart_id,
                buy_now: SAVE_FOR_LATER
            },
            include: [{
                model: product
            }]
        });
    }
}
