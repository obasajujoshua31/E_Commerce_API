import isEmpty from 'lodash.isempty';
import models from '../models';

const { Tax } = models;

export default async (req, res, next) => {
    const { tax_id } = req.body;

    const tax = await Tax.findOne({
        where: {
            tax_id
        }
    });
    if (!isEmpty(tax)) {
        return next();
    }
    return res.status(400).json({
        error: {
            code: 'SHP_02',
            message: 'the field tax is empty',
            field: 'tax'
        }
    });
};
