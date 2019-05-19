import models from '../models';
import BaseService from './base';


const { attribute_value } = models;

export default class AttributeService extends BaseService {
    static async getAllAttributeValues(id) {
        return await this.findAll(attribute_value, { where: {
            attribute_id: id
        } });
    }

    static async getAttributesValuesByName(value) {
        return await this.findAll(attribute_value, {
            where: {
                value
            }
        });
    }
}
