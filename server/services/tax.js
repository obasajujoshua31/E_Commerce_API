import models from '../models';
import BaseService from './base';


const { Tax } = models;

export default class TaxService extends BaseService {
    static async getTax (id) {
        return await this.findOne(Tax, { tax_id: id });
    }

    static async getAllTaxes() {
        return await this.findAll(Tax);
    }
}
