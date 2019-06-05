import models from '../models';
import BaseService from './base';


const { shipping, shipping_region } = models;

export default class ShippingService extends BaseService {
    /**
     * @description This searches the 
     * shipping_region table and 
     * returns the row which matches the shipping_region_id supplied 
     * and includes the shipping table of the corresponding shipping_region.
     * @param  {number} id
     * @returns  {Primise<object>} oneShipping
     */
    static async getOneShipping (id) {
        return await this.findOne(shipping_region, { 
                shipping_region_id: id },
            [{
                model: shipping,
            }]
        );
        }

    /**
     * @description This returns all the shippings in the shipping table
     * @param  {null} argument
     * @returns {Promise<Array>} allShippings
     */
    static async getAllShippings() {
        return await this.findAll(shipping);
    }
}
