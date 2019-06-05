import isEmpty from 'lodash.isempty';
import models from '../models';
import AttributeService from '../services/attributes';
import AttributeValueService from '../services/attributeValue';
import ProductAttributeService from '../services/productAttribute';
import BaseController from './base';


class AttributeController extends BaseController {
     /**
     * @returns {Promise<Function>} allAttributes
     */
    static getAllAttributes() {
            return this.asyncFunction(async (req, res) => {
                const allAttributs = await AttributeService.getAllAttributes();
                return this.httpSuccessCollectionResponse(req, res, allAttributs);
            });
    }


     /**
     * @returns {Promise<Function>} one Attribute
     */
    static getOneAttribute() {
        return this.asyncFunction(async(req, res) => {
            const { id } = req.params;
            const parsedId = parseInt(id, 10);
            if (!isNaN(parsedId)) {
                    const oneAttribute = await AttributeService.getAttribute(id);
                    if (!isEmpty(oneAttribute)) {
                        return this.httpSuccessEachResponse(req, res, oneAttribute.dataValues);
                    }
                    return this.httpErrorResponse(req, res, 'ATT_02', 
                    `Don't exist attribute with this ID ${id}`, 'attribute');
            }
            return this.httpErrorResponse(req, res, 'ATT_01', 
            `The ID ${id} is not a number`, 'attribute');
        });
    }


     /**
     * @returns {Promise<Function>} oneAttributeValue
     */
    static getOneAttributeValue() {
        return this.asyncFunction(async (req, res) => {
            const { value_id } = req.params;
            const parsedId = parseInt(value_id, 10);
            if (!isNaN(parsedId)) {
                    const oneAttibuteValue = await AttributeValueService.getAllAttributeValues(value_id);
                        if (!isEmpty(oneAttibuteValue)) {
                            return super.httpSuccessCollectionResponse(req, res, oneAttibuteValue);
                        }
                        return this.httpErrorResponse(req, res, 'ATT_02', 
                        `Don't exist Attribute value for 
                        the Attribute with this ID ${value_id}`, 'attribute_value');
            }
            return this.httpErrorResponse(req, res, 'ATT_01', 
            `The ID ${value_id} is not a number`, 'attribute');
        });
    }


     /**
     * @returns {Promise<Function>} allProducts Attributes
     */
    static getAllProductAttributes () {
        return this.asyncFunction(async (req, res) => {
            const { product_id } = req.params;
                const allProductAttributes = await ProductAttributeService.getAllAttributeValues(product_id);
                if (!isEmpty(allProductAttributes)) {
                    const allProducts = [];
                    allProductAttributes.forEach((attribute) => {
                        allProducts.push({ attribute_value_id: 
                            attribute.attribute_value.attribute_value_id, 
                        attribute_value: attribute.attribute_value.value, 
                       attribute_name: attribute.attribute_value.attribute.name
                        });
                    });
                    return this.httpSuccessCollectionResponse(req, res, allProducts);
                }
                return this.httpErrorResponse(req, res, 'ATT_02', 
                    `Don't exist Attribute value for
                    the Product with this ID ${product_id}`, 'attribute_value');
                });
     }
}

export default AttributeController;
