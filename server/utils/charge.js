import Stripe from 'stripe';

const stripe = Stripe(process.env.STRIPE_TOKEN);

// const token = request.body.stripeToken; // Using Express

export default {
  makePayment: async (token, amount, currency, description) => {
    const charge = await stripe.charges.create({
      amount,
      currency,
      description,
      source: token,
    });
    return charge;
}
};
