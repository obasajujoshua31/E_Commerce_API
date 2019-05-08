import isEmpty from 'lodash.isempty';
import models from '../models';
import BaseController from './base';


const { Attribute, Attribute_Value, Product_Attribute } = models;

class AttributeController extends BaseController {
    static getAllAttributes() {
            return this.asyncFunction(async (req, res) => {
                const allAttributs = await Attribute.findAll();
                return this.httpSuccessCollectionResponse(req, res, allAttributs);
            });
    }

    static getOneAttribute() {
        return this.asyncFunction(async(req, res) => {
            const { id } = req.params;
            const parsedId = parseInt(id, 10);
            if (!isNaN(parsedId)) {
                    const oneAttribute = await Attribute.findOne({
                        where: {
                            attribute_id: id
                        }
                    });
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

    static getOneAttributeValue() {
        return this.asyncFunction(async (req, res) => {
            const { value_id } = req.params;
            const parsedId = parseInt(value_id, 10);
            if (!isNaN(parsedId)) {
                    const oneAttibuteValue = await Attribute_Value.findAll({
                        where: {
                            attribute_id: value_id
                        },
                    });
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

    static getAllProductAttributes () {
        return this.asyncFunction(async (req, res) => {
            const { product_id } = req.params;
                const allProductAttributes = await Product_Attribute.findAll({
                    where: {
                        product_id
                    },
                    include: [{
                        model: Attribute_Value,
                          include: [{
                            model: Attribute
                        }]
                    }]
                });
                if (!isEmpty(allProductAttributes)) {
                    const allProducts = [];
                    allProductAttributes.forEach((attribute) => {
                        allProducts.push({ attribute_value_id: 
                            attribute.Attribute_Value.attribute_value_id, 
                        attribute_value: attribute.Attribute_Value.value, 
                       attribute_name: attribute.Attribute_Value.Attribute.name
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
