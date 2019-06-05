import models from '../models';
import BaseService from './base';


const { attribute } = models;

export default class AttributeService extends BaseService {
    /**
     * @description This service 
     * searches the attribute table and returns the 
     * row where attribute_id matches the given id
     * @param  {number} id
     * @returns  {Promise<object>} one Attribute
     * @member AttributeService
     */
    static async getAttribute (id) {
        return await this.findOne(attribute, { attribute_id: id });
    }

    /**
     * @description This service searches the attribute table and retrieves every row
     * @returns {Promise<Array>} allAttributes
     * @member AttributeService
     */
    static async getAllAttributes() {
        return await this.findAll(attribute);
    }
}
