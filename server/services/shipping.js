import models from '../models';
import BaseService from './base';


const { shipping, shipping_region } = models;

export default class ShippingService extends BaseService {
    static async getOneShipping (id) {
        return await this.findOne(shipping_region, { 
                shipping_region_id: id },
            [{
                model: shipping,
            }]
        );
        }

    static async getAllShippings() {
        return await this.findAll(shipping);
    }
}
