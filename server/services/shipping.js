import models from '../models';
import BaseService from './base';


const { Shipping, Shipping_Region } = models;

export default class ShippingService extends BaseService {
    static async getOneShipping (id) {
        return await this.findOne(Shipping_Region, { 
                shipping_region_id: id },
            [{
                model: Shipping,
            }]
        );
        }

    static async getAllShippings() {
        return await this.findAll(Shipping);
    }
}
