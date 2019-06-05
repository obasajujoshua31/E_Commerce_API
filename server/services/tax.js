import models from '../models';
import BaseService from './base';


const { tax } = models;

export default class TaxService extends BaseService {
    /**
     * @description This queries the Tax Table
     * with tax_id and 
     * returns the object that matches the condition specified
     * @param  {number} id
     * @returns  {Promise} DB data
     */
    static async getTax (id) {
        return await this.findOne(tax, { tax_id: id });
    }

     /**
     * @description This queries 
     * the Tax Table and returns all taxes in the database 
     * @param  {null} argument
     * @returns  {Promise} DB data
     */
    static async getAllTaxes() {
        return await this.findAll(tax);
    }
}
