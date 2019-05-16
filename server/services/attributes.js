import models from '../models';
import BaseService from './base';


const { Attribute } = models;

export default class AttributeService extends BaseService {
    static async getAttribute (id) {
        return await this.findOne(Attribute, { attribute_id: id });
    }

    static async getAllAttributes() {
        return await this.findAll(Attribute);
    }
}
