import isEmpty from 'lodash.isempty';
import ShippingService from '../services/shipping';
import BaseController from './base';


class ShippingController extends BaseController {
    static getAllShippingRegion() {
        return this.asyncFunction(async (req, res) => {
                const allShippings = await ShippingService.getAllShippings();
                  return super.httpSuccessCollectionResponse(req, res, allShippings);
        });
    }

    static getOneShipping() {
        return this.asyncFunction(async(req, res) => {
        const { shipping_id } = req.params;
        const parsedId = parseInt(shipping_id, 10);
        if (!isNaN(parsedId)) {
                const oneShipping = await ShippingService.getOneShipping(shipping_id);
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
