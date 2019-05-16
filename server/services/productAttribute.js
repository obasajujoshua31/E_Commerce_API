import models from '../models';
import BaseService from './base';


const { Product_Attribute, Attribute_Value, Attribute } = models;

export default class ProductAttributeService extends BaseService {
    static async getAllAttributeValues(id) {
        return await this.findAll(Product_Attribute, { where: {
            product_id: id
        },
        include: [{
            model: Attribute_Value,
              include: [{
                model: Attribute
            }]
        }]
     });
    }
}
