import models from '../models';
import BaseService from './base';


const { attribute_value } = models;

export default class AttributeService extends BaseService {
    /**
     * @description This service 
     * searches the attribute_value 
     * table and retrieves every row 
     * where the attribute_id matches the given id
     * @param  {number} id
     * @returns  {Promise<Array>}  allAttributesValues
     * @member AttributeService
     */
    static async getAllAttributeValues(id) {
        return await this.findAll(attribute_value, { where: {
            attribute_id: id
        } });
    }

    /**
     * @description This service searches the 
     * attribute_value table and retrieves every row 
     * where the value matches the given value
     * @param {string} value
     * @returns  {Promise<Array>} allAttributesValues
     * @member AttributeService
     */ 
    static async getAttributesValuesByName(value) {
        return await this.findAll(attribute_value, {
            where: {
                value
            }
        });
    }

    /**
     * @description This service searches the 
     * attribute_value table and retrieves the row 
     * where the value matches the given value
     * @param {string} value
     * @returns  {Promise<object>} allAttributesValues
     * @member AttributeService
     */ 
    static async getSingleAttributeValue(value) {
        return await this.findOne(attribute_value, { value });
    }
}
