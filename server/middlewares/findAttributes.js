import isEmpty from 'lodash.isempty';
import promise from 'bluebird';
import AttributeService from '../services/attributeValue';

/**
 * @description This method calls 
 * the attributeService to find if 
 * the attributes exist in the attribute_value table
 * @param  {object} req
 * @param  {object} res
 * @param  {Function} next
 * @return  {object} Server Response
 */
export default async (req, res, next) => {
    const { attributes } = req.body;
    const productAttributes = attributes.split(' ');

    promise.mapSeries(productAttributes, (item) => {
        return AttributeService.getSingleAttributeValue(item)
        .then((result) => {
            if (isEmpty(result)) {
                return -1;
            }
            return true;
        });
    })
        .then((result) => {
            if (result.includes(-1)) {
                return res.status(400).json({
                    error: {
                        code: 'ATT',
                        message: 'The field attributes is empty',
                        field: 'attributes'
                    }
                });
            }
            return next();
    });
};
