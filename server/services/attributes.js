import models from '../models';
import BaseService from './base';


const { attribute } = models;

export default class AttributeService extends BaseService {
    static async getAttribute (id) {
        return await this.findOne(attribute, { attribute_id: id });
    }

    static async getAllAttributes() {
        return await this.findAll(attribute);
    }
}
