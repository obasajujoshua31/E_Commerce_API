import isEmpty from 'lodash.isempty';
import ProductService from '../services/product';
import { isValid } from '../utils/getPageParams';


/**
 * @description This method calls 
 * productService to check whether 
 * the product exists with the product_id coming from the body
 * it returns response based on the result
 * @param  {object} req
 * @param  {object} res
 * @param  {Function} next
 * @returns {object} Server Response
 */
export default async (req, res, next) => {
    const { product_id } = req.body;
    
    const product = await ProductService.getOneProduct(product_id);

    if (!isEmpty(product)) {
        req.product = product;
        return next();
    }
    return res.status(400).json({
        code: 'PRO_02',
        message: 'product is empty',
        field: 'product_id'
    });
};

/**
 * @description This method calls 
 * productService to check whether 
 * the product exists with the product_id coming from the params
 * it returns response based on the result
 * @param  {object} req
 * @param  {object} res
 * @param  {Function} next
 * @returns {object} Server Response
 */
export const findProductFromParam = async (req, res, next) => {
    const { product_id } = req.params;

    if (isValid(product_id).valid) {
        const product = await ProductService.getOneProduct(product_id);

        if (!isEmpty(product)) {
            return next();
        }
        return res.status(400).json({
            code: 'PRO_02',
            message: 'product is empty',
            field: 'product_id'
        });
    }
    return res.status(400).json({
        error: {
            code: 'PRO_01',
            message: `The ID ${product_id} is not number`,
            field: 'product_id'
        }
    });
};
