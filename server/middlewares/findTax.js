import isEmpty from 'lodash.isempty';
import models from '../models';

const { tax } = models;

export default async (req, res, next) => {
    const { tax_id } = req.body;

    const foundtax = await tax.findOne({
        where: {
            tax_id
        }
    });
    if (!isEmpty(foundtax)) {
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
