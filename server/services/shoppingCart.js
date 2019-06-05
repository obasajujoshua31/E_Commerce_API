import models from '../models';
import BaseService from './base';
import { SAVE_FOR_LATER, MOVE_TO_CART } from '../utils/constants';


const { shopping_cart, product } = models;

export default class ShoppingCartService extends BaseService {
    /**
     * @description This queries the 
     * productTable and returns all 
     * rows that matches cart_id and buy_now as move_to_cart
     * @param  {number} cart_id
     * @param  {boolean} option
     * @returns  {Promise<Array>} allProducts
     */
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

     /**
     * @description This queries the 
     * ShoppingCart table and returns one row 
     * that matches cart_id, attributes and product_id
     * @param  {number} cart_id
     * @param  {string} attributes
     * @param {number} product_id 
     * @returns  {Promise<Object>} OneCart
     */
    static async getOneCart(cart_id, attributes, product_id) {
        return shopping_cart.findOne({
            where: {
                cart_id,
                attributes,
                product_id
            }
        });
    }

    /**
     * @description This creates a 
     * new row in the shoppingCart table and returns the newly created cart
     * @param  {object} payload
     * @returns  {object} new Cart
     */
    static async createCart(payload) {
        return this.save(shopping_cart, payload);
    }
    
    /**
     * @description This deletes a 
     * row in the shoppingCart Table 
     * where cart_id matches the cart_id provided in the argument
     * @param  {number} cart_id
     */
    static async dropCart(cart_id) {
        await shopping_cart.destroy({
            where: {
                cart_id
            }
        });
    }

    /**
     * @description This gets all the rows in the shopping Cart table where the cart_id  and buy_now field matches the arguments supplied
     * @param  {number} cart_id
     * @returns {Array} allSavedShoppingCartItems
     */
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
