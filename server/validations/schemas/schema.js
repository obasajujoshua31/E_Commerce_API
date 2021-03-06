import Joi from "joi";
import { errorFormatter } from "../validator";

/**
 * @description Get name validation schema
 *
 * @param {string} label the text to use instead of field name in the error message;
 
 * @returns {string} Instance of JOI validation schema
 * @method getNameSchema
 */

const name = Joi.string()
  .required()
  .min(1)
  .label('name');

// const name = getNameSchema("name");
const email = Joi.string()
  .email()
  .required()
  .trim()
  .label("email");

const password = Joi.string()
  .min(4)
  .required()
  .trim()
  .label("Password")
  .error(errors => {
    return errorFormatter(
      errors,
      "Password",
      "Password must be atleast 4 words"
    );
  });

const address_2 = Joi.string()
  .allow("")
  .trim()
  .strict()
  .label("address_2");


  const address_1 = Joi.string()
  .required()
  .trim()
  .label("address_1");

  const city = Joi.string()
  .required()
  .min(1)
  .trim()
  .label("city");

  const region = Joi.string()
  .required()
  .min(1)
  .trim()
  .label("region");

  const postal_code = Joi.string()
  .required()
  .min(1)
  .trim()
  .label('postal_code');

  const country = Joi.string()
  .required()
  .min(1)
  .trim()
  .label('country');

  const shipping_region_id = Joi.number()
  .integer()
  .required()
  .label('shipping_region_id');


  const credit_card = Joi.string()
  .required()
  .min(1)
  .trim()
  .label('credit_card');

  const day_phone = Joi.string()
  .allow('')
  .trim()
  .strict()
  .label('day_phone');

  const eve_phone = Joi.string()
  .allow('')
  .trim()
  .strict()
  .label('eve_phone');

  const mob_phone = Joi.string()
  .allow('')
  .trim()
  .strict()
  .label('mob_phone');


  const rating = Joi.number()
  .integer()
  .min(1)
  .label('rating');

  const review = Joi.string()
  .required()
  .trim()
  .min(1)
  .label('review');


  const cart_id = Joi.string()
  .required()
  .label('cart_id');
  
  const product_id = Joi.number()
  .integer()
  .required()
  .label('product_id');

  const tax_id = Joi.number()
  .integer()
  .required()
  .label('tax_id');

  const shipping_id = Joi.number()
  .integer()
  .required()
  .label('shipping_id');

  const attributes = Joi.string()
    .required()
    .trim()
    .label('attributes');

  const access_token = Joi.string()
  .required()
  .trim()
  .label('access_token');


  const amount = Joi.number()
  .integer()
  .required()
  .label('amount');
  
  const description = Joi.string()
  .required()
  .trim()
  .label('description');

  const stripeToken = Joi.string()
  .required()
  .trim()
  .label('stripeToken');


  const currency = Joi.string().allow(null).allow('').optional();


export const signUpSchema = Joi.object().keys({
  name,
  email,
  password
});

export const signInSchema = Joi.object().keys({
  email: Joi.string()
    .trim()
    .required(),
  password: Joi.string()
    .trim()
    .required()
});

export const updateCustomerProfileBiodataSchema = Joi.object().keys({
  name,
  email,
  password,
  mob_phone,
  eve_phone,
  day_phone,
});

export const updateCustomerAddressSchema = Joi.object().keys({
    address_1,
    address_2,
    city,
    region,
    postal_code,
    country,
    shipping_region_id
});

export const updateCustomerCreditCardSchema = Joi.object().keys({
        credit_card
});

export const productReviewSchema = Joi.object().keys({
  review,
  rating
});

export const addShoppingCartSchema = Joi.object().keys({
  cart_id,
  product_id,
  attributes
});

export const facebookSchema = Joi.object().keys({
  access_token
});

const order_id = Joi.number()
.integer()
.required()
.label('order_id');

export const orderSchema = Joi.object().keys({
  cart_id,
  shipping_id,
  tax_id
});

export const paymentSchema = Joi.object().keys({
  amount,
  description,
  stripeToken,
  currency,
  order_id
});
