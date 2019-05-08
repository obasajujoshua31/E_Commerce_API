import isEmpty from 'lodash.isempty';
import BaseController from './base';
import models from '../models';
import { isValid } from '../utils/getPageParams';


const { Order_Detail } = models;

export default class OrderController extends BaseController {
    static getOrderInfo() {
        return this.asyncFunction(async (req, res) => {
            const { order_id } = req.params;
            if (isValid(order_id).valid) {
                const order = await Order_Detail.findOne({
                    where: {
                        order_id
                    }
                });
    
                if (!isEmpty(order)) {
                    return this.httpSuccessEachResponse(req, res, order.dataValues, false);
                }
                return this.httpErrorResponse(req, res, 'ORD_02', 
                'order is empty', 'order_id', false);
            }
            return this.httpErrorResponse(req, res, 'ORD_01', 
            `The ID ${order_id} is not a number`, 'order_id');
        });
    }
}
