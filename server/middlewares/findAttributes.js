import isEmpty from 'lodash.isempty';
import AttributeService from '../services/attributeValue';

export default async (req, res, next) => {
    const { attributes } = req.body;

    const foundAttributes = await AttributeService.getAttributesValuesByName(attributes);

    if (isEmpty(foundAttributes)) {
        return res.status(400).json({
            error: {
                code: 'ATT',
                message: 'The field attributes is empty',
                field: 'attributes'
            }
        });
    }
    return next();
};
