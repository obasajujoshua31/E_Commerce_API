import isEmpty from 'lodash.isempty';
import models from '../models';
import BaseController from './base';
import client from '../config/cache';
import CacheStorage from '../middlewares/checkCache';


const { Tax } = models;

class TaxController extends BaseController {
    static getAllTaxs() {
        return this.asyncFunction(async (req, res) => {
                const allTaxes = await Tax.findAll();
                  return this.httpSuccessCollectionResponse(req, res, allTaxes);
     });
    }

    static getOneTax() {
        return this.asyncFunction(async (req, res) => {
            const { id } = req.params;
            const parsedId = parseInt(id, 10);
            if (!isNaN(parsedId)) {
                    const oneTax = await Tax.findOne({
                        where: {
                            tax_id: id
                        }
                    });
                    if (!isEmpty(oneTax)) {
                        return this.httpSuccessEachResponse(req, res, oneTax.dataValues);
                    }
                    return this.httpErrorResponse(req, res, 'TAX_02', 
                    `Don't exist Tax with this ID ${id}`, 'tax');
            }
            return this.httpErrorResponse(res, 'TAX_01', `The ID ${id} is not a number`, 'tax');
        });
    }
}

export default TaxController;
