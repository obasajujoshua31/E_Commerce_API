import isEmpty from 'lodash.isempty';
import BaseController from './base';
import ShoppingCartService from '../services/shoppingCart';
import generateId from '../utils/generateUniqueId';
import formatCart, { prepareSavedItems } from '../utils/cart';
import { MOVE_TO_CART, SAVE_FOR_LATER } from '../utils/constants';


export default class ShoppingCart extends BaseController {
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
            const cart = await ShoppingCartService.getOneCart(cart_id, attributes, product_id);
            
            if (isEmpty(cart)) {
                await ShoppingCartService.createCart({
                    cart_id,
                    product_id,
                    buy_now: MOVE_TO_CART,
                    attributes,
                    quantity: 1,
                    added_on: new Date()
                });
            } else {
                await cart.increment('quantity');
            }
           
            const allProductsInCart = await ShoppingCartService.getProducts(cart_id);
            return this.httpSuccessCollectionResponse(
                req, res, formatCart(allProductsInCart), false);
        });
    }

    static getItemsFromCart() {
        return this.asyncFunction(async(req, res) => {
            const { cart_id } = req.params;
            const items = await ShoppingCartService.getProducts(cart_id);
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
           const items = await ShoppingCartService.getProducts(cart_id, false);
           return this.httpSuccessCollectionResponse(req, res, items, false);
    });
}

    static getTotalAmountFromCart() {
        return this.asyncFunction(async (req, res) => {
            const { cart_id } = req.params;
            
                const allItems = await ShoppingCartService.getProducts(cart_id);
                if (!isEmpty(allItems)) {
                    const totalCount = allItems.reduce((total_amount, item) => {
                        return total_amount += item.quantity * item.product.price - 
                            item.product.discounted_price;
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
            const allItems = await ShoppingCartService.getAllSavedItems(cart_id);
            if (!isEmpty(allItems)) {
                const items = prepareSavedItems(allItems);
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
            const cart = await ShoppingCartService.getProducts(cart_id, false);
            if (!isEmpty(cart)) {
                await ShoppingCartService.dropCart(cart_id);
                return this.httpSuccessCollectionResponse(req, res, [], false);
            }
            return this.httpErrorResponse(req, res, 'CAT_02', 'cart is empty', 'cart_id', false);
        });
    }
}
