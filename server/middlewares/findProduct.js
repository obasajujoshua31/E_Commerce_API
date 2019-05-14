import isEmpty from 'lodash.isempty';
import models from '../models';


const { Product } = models;

export default async (req, res, next) => {
    const { product_id } = req.body;
    
    const product = await Product.findOne({
        where: {
            product_id
        }
    });

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
