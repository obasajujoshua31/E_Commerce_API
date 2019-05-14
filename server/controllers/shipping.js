import isEmpty from 'lodash.isempty';
import models from '../models';
import BaseController from './base';


const { Shipping_Region, Shipping } = models;

class ShippingController extends BaseController {
    static getAllShippingRegion() {
        return this.asyncFunction(async (req, res) => {
                const allShippings = await Shipping_Region.findAll();
                  return super.httpSuccessCollectionResponse(req, res, allShippings);
        });
    }

    static getOneShipping() {
        return this.asyncFunction(async(req, res) => {
        const { shipping_id } = req.params;
        const parsedId = parseInt(shipping_id, 10);
        if (!isNaN(parsedId)) {
                const oneShipping = await Shipping_Region.findOne({
                    where: {
                        shipping_region_id: shipping_id
                    },
                    include: [{
                        model: Shipping,
                    }]
                    
                });
                if (!isEmpty(oneShipping)) {
                    if (!isEmpty(oneShipping.dataValues.Shippings)) {
                        return super.httpSuccessCollectionResponse(req, res, 
                            oneShipping.dataValues.Shippings);
                    }
                    return super.httpErrorResponse(req, res, 'SHP_02', 
                    `Don't exist Shipping for the Shipping 
                    Region with this ID ${shipping_id}`, 'shipping');
                }
                return super.httpErrorResponse(req, res, 'SHP_02', 
                `Don't exist Shipping Region with 
                this ID ${shipping_id}`, 'shipping_region');
        }
        return super.httpErrorResponse(req, res, 'SHP_01', 
        `The ID ${shipping_id} is not a number`, 'shipping');
        });
    }
}

export default ShippingController;
