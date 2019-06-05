import isEmpty from 'lodash.isempty';
import models from '../models';
import ShippingService from '../services/shipping';


const { shipping } = models;


/**
 * @description This method searches 
 * the shipping table and retrieves 
 * the row where the shipping id 
 * matches the shipping id coming 
 * from the body, it returns response 
 * based on the result
 * @param  {object} req
 * @param  {object} res
 * @param  {Function} next
 * @returns {object} Server Response
 */
export default async (req, res, next) => {
    const { shipping_id } = req.body;

    const foundshipping = await shipping.findOne({
        where: {
            shipping_id
        }
    });
    if (!isEmpty(foundshipping)) {
        return next();
    }
    return res.status(400).json({
        error: {
            code: 'SHP_02',
            message: 'the field shipping is empty',
            field: 'shipping'
        }
    });
};

/**
 * @description This method searches 
 * the shipping region table and retrieves 
 * the row where the shipping region id 
 * matches the shipping region id coming 
 * from the body, it returns response 
 * based on the result
 * @param  {object} req
 * @param  {object} res
 * @param  {Function} next
 * @returns {object} Server Response
 */
export const findShippingRegion = async (req, res, next) => {
    const { shipping_region_id } = req.body;

    const region = await ShippingService.getOneShipping(shipping_region_id);
    if (isEmpty(region)) {
        return res.status(400).json({
            error: {
                code: 'SHP_02',
                message: 'the field shipping region is empty',
                field: 'shipping_region'
            }
        });
    }
    return next();
};
