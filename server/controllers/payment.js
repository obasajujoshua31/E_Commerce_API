import makePayment from '../utils/charge';
import BaseController from './base';


export default class PaymentController extends BaseController {
    static chargeCustomer() {
        return this.asyncFunction(async(req, res) => {
            const { amount, description, stripeToken, currency } = req.body;
            const charges = await makePayment(stripeToken, amount, currency || 'USD', description);
            return res.send(charges);
        }, true);
    }
}
