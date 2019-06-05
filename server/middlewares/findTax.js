import isEmpty from 'lodash.isempty';
import models from '../models';

const { tax } = models;


/**
 * @description This method searches 
 * the tax table and retrieves 
 * the row where the tax id 
 * matches the tax id coming 
 * from the body, it returns response 
 * based on the result
 * @param  {object} req
 * @param  {object} res
 * @param  {Function} next
 * @returns {object} Server Response
 */
export default async (req, res, next) => {
    const { tax_id } = req.body;

    const foundtax = await tax.findOne({
        where: {
            tax_id
        }
    });
    if (!isEmpty(foundtax)) {
        return next();
    }
    return res.status(400).json({
        error: {
            code: 'SHP_02',
            message: 'the field tax is empty',
            field: 'tax'
        }
    });
};
