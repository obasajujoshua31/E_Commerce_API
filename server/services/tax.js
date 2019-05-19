import models from '../models';
import BaseService from './base';


const { tax } = models;

export default class TaxService extends BaseService {
    static async getTax (id) {
        return await this.findOne(tax, { tax_id: id });
    }

    static async getAllTaxes() {
        return await this.findAll(tax);
    }
}
