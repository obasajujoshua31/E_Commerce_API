import stripe from '../utils/charge';
import BaseController from './base';


export default class PaymentController extends BaseController {
    static chargeCustomer() {
        return this.asyncFunction(async(req, res) => {
            const { amount, description, stripeToken, currency } = req.body;
            const current = currency || 'USD';
            const charges = await stripe.makePayment(stripeToken, amount, current, description);
            return this.httpSuccessEachResponse(req, res, charges, false);
        }, true);
    }
}
