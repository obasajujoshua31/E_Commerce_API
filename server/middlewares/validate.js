import models from "../models";
import { validator } from "../validations/validator";
import {
  signUpSchema,
  signInSchema,
  updateCustomerAddressSchema,
 updateCustomerCreditCardSchema,
  updateCustomerProfileBiodataSchema,
  productReviewSchema,
  addShoppingCartSchema
} from "../validations/schemas/schema";

const { Users } = models;
/**
 * @description Get the schema definitions
 *
 * @param {object} req the request object
 * @returns {Joi.object} a Joi object
 */
const getSchema = req => {
  const schemas = {
    "/customers": signUpSchema,
    "/login": signInSchema,
    "/address": updateCustomerAddressSchema,
    "/creditCard": updateCustomerCreditCardSchema,
    "/customer": updateCustomerProfileBiodataSchema,
    "/reviews": productReviewSchema,
    "/add": addShoppingCartSchema
  };

  return schemas[`/${req.originalUrl.split('/').pop()}`];
};

/**
 * Validate input
 *
 * @param {object} req HTTP request object
 * @param {object} res HTTP response object
 * @param {function} next callback
 * @returns {funcion} HTTP response
 */
export default async (req, res, next) => {
  const validation = await validator(req.body, getSchema(req));
  if (validation.hasError) {
      return res.status(400).json({
          errors: validation.errors
      });
  }
  req.body = validation.fields;
  return next();
};
