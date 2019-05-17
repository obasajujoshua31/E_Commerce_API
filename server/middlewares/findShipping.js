import isEmpty from 'lodash.isempty';
import models from '../models';
import ShippingService from '../services/shipping';


const { Shipping, Shipping_Region } = models;

export default async (req, res, next) => {
    const { shipping_id } = req.body;

    const shipping = await Shipping.findOne({
        where: {
            shipping_id
        }
    });
    if (!isEmpty(shipping)) {
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
