import models from '../models';
import BaseService from './base';
import { SAVE_FOR_LATER, MOVE_TO_CART } from '../utils/constants';


const { Shopping_Cart, Product } = models;

export default class ShoppingCartService extends BaseService {
    static async getProducts(cart_id, option = true) {
       return this.findAll(Shopping_Cart, {
        where: {
            cart_id,
            buy_now: MOVE_TO_CART
        },
        include: option ? 
        [{
            model: Product
        }] : []
    });
    }

    static async getOneCart(cart_id, attributes, product_id) {
        return Shopping_Cart.findOne({
            where: {
                cart_id,
                attributes,
                product_id
            }
        });
    }

    static async createCart(payload) {
        return this.save(Shopping_Cart, payload);
    }
    
    static async dropCart(cart_id) {
        return await Shopping_Cart.destroy({
            where: {
                cart_id
            }
        });
    }

    static getAllSavedItems(cart_id) {
        return Shopping_Cart.findAll({
            where: {
                cart_id,
                buy_now: SAVE_FOR_LATER
            },
            include: [{
                model: Product
            }]
        });
    }
}
