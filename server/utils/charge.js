import Stripe from 'stripe';

const stripe = Stripe(process.env.STRIPE_TOKEN);

export default {
  /**
   * @description This create payment for a given order using the stripe npm package
   * @param  {string} token
   * @param  {number} amount
   * @param  {string} currency
   * @param  {string} description
   * @returns  {object} stripe response
   */

  makePayment: async (token, amount, currency, description) => {
    const charge = await stripe.charges.create({
      amount,
      currency,
      description,
      source: token
    });
    return charge;
}
};
