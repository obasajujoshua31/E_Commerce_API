import models from '../models';
import BaseService from './base';


const { Attribute_Value } = models;

export default class AttributeService extends BaseService {
    static async getAllAttributeValues(id) {
        return await this.findAll(Attribute_Value, { where: {
            attribute_id: id
        } });
    }
}
