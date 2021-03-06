import isEmpty from 'lodash.isempty';
import TaxService from '../services/tax';
import BaseController from './base';


class TaxController extends BaseController {
    /**
     * @returns  {Promise<Function>} allTaxes
     */
    static getAllTaxes() {
        return this.asyncFunction(async (req, res) => {
        const allTaxes = await TaxService.getAllTaxes();
        return this.httpSuccessCollectionResponse(req, res, allTaxes);
     });
    }

     /**
     * @returns  {Promise<Function>} oneTax
     */
    static getTax() {
        return this.asyncFunction(async (req, res) => {
            const { id } = req.params;
            const parsedId = parseInt(id, 10);
            if (!isNaN(parsedId)) {
                    const oneTax = await TaxService.getTax(id);
                    if (!isEmpty(oneTax)) {
                        return this.httpSuccessEachResponse(req, res, oneTax.dataValues);
                    }
                    return this.httpErrorResponse(req, res, 'TAX_02', 
                    `Don't exist Tax with this ID ${id}`, 'tax');
            }
            return this
                .httpErrorResponse(req, res, 'TAX_01', `The ID ${id} is not a number`, 'tax');
        });
    }
}

export default TaxController;
