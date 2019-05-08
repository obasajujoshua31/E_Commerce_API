import isEmpty from 'lodash.isempty';
import models from '../models';
import BaseController from './base';


const { Tax } = models;

class TaxController extends BaseController {
    static async getAllTaxs(req, res) {
        try {
            const allTaxes = await Tax.findAll();
              return super.httpSuccessCollectionResponse(res, allTaxes);
        } catch (error) {
            return super.serverError(res);
        }
    }

    static async getOneTax(req, res) {
        const { id } = req.params;
        const parsedId = parseInt(id, 10);
        if (!isNaN(parsedId)) {
            try {
                const oneTax = await Tax.findOne({
                    where: {
                        tax_id: id
                    }
                });
                if (!isEmpty(oneTax)) {
                    return super.httpSuccessEachResponse(res, oneTax.dataValues);
                }
                return super.httpErrorResponse(res, 'TAX_02', 
                `Don't exist Tax with this ID ${id}`, 'tax');
            } catch (error) {
                return super.serverError(res);
            }
        }
        return super.httpErrorResponse(res, 'TAX_01', `The ID ${id} is not a number`, 'tax');
    }
}

export default TaxController;
