import isEmpty from 'lodash.isempty';
import stripe from '../utils/charge';
import BaseController from './base';
import OrderService from '../services/order';
import AuditService from '../services/audit';
import logger from '../utils/logger';

export default class PaymentController extends BaseController {
     /**
     * @returns {Promise<Function>} chargeCustomer
     */
    static chargeCustomer() {
        return async (req, res) => {
            // Get amount, description, stripeToken, currency and order_id from the body
            const { amount, description, stripeToken, currency, order_id } = req.body;
            const current = currency || 'USD';

            try {
                // Get details about the order requested
            const orderRequested = await OrderService.getInfo(order_id);

            // return error if order is not found
            if (isEmpty(orderRequested)) {
                return this
                .httpErrorResponse(req, res, 'ORD_02', 'order is empty', 'order_id', false);
            }

            // create charge
            const charges = await stripe.makePayment(stripeToken, amount, current, description);

            // create Audit
            const newAudit = {
                order_id,
                created_on: new Date(),
                message: 'order successful',
                code: 200
            };

            await AuditService.createAudit(newAudit);
            // send response
            return this.httpSuccessEachResponse(req, res, charges, false);
            } catch (error) {
                // log error to file
                logger.log({ level: 'error', message: error.message });
                switch (error.type) {
                    case 'StripeInvalidRequestError': 
             {
                 // create Audit
                const newAudit = {
                    order_id,
                    created_on: new Date(),
                    message: error.message,
                    code: error.statusCode
                };
                await AuditService.createAudit(newAudit);
                // send error response
                    return res.status(401).json({
                        message: error.message,
                        code: 'AUT_02',
                        field: 'API_KEY'
                    });
             }   
                
                        default:
                        return super.serverError(res);
                }
            }
            };
        }
    }
