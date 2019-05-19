import isEmpty from 'lodash.isempty';
import BaseController from './base';
import ProductService from '../services/product';
import paginate, { getAllAvailableProducts, manualPaginate, 
            filterProductsCategories } from '../utils/products';
import getParams, { isValid } from '../utils/getPageParams';


export default class ProductController extends BaseController {
    static getAllProducts() {
        return this.asyncFunction(async(req, res) => {
            const { numberOfPage, pageLimit, descriptionLength } = getParams(req.query);
            
                const allProducts = await ProductService.getAllProducts(paginate({
                    numberOfPage, pageLimit
                }));
                const allCount = await ProductService.size;
                const allAvailableProducts = 
                        getAllAvailableProducts(allProducts, descriptionLength);
                const resultJSON = {
                    count: allCount,
                    rows: allAvailableProducts
                };
                return this.httpSuccessEachResponse(req, res, resultJSON);
        });
    }

    static getOneProduct() {
        return this.asyncFunction(async (req, res) => {
            const { id } = req.params;
            if (isValid(id).valid) {
               const oneProduct = await ProductService.getOneProduct(id);
               if (!isEmpty(oneProduct)) {
                   return this.httpSuccessEachResponse(req, res, oneProduct.dataValues);
               }
               return this.httpErrorResponse(req, res, 'PR0_2', 
               `Don't exist product with this ID ${id}`, 'product');
            }
            return this.httpErrorResponse(req, res, 'PRO_01', 
            `The ID ${id} is not a number`, 'product');
        });
 }

static getProductsByCategory() {
    return this.asyncFunction(async (req, res) => {
        const { category_id } = req.params;
        const params = getParams(req.query);
        const { numberOfPage, pageLimit, descriptionLength } = params;
    
        if (isValid(category_id).valid) {
                const allProducts = 
                        await ProductService
                            .getCategories(category_id, 
                                { ...paginate({ numberOfPage, pageLimit }) });
                
                const count = await ProductService.countAllCategories(category_id);
    
                if (!isEmpty(allProducts)) {
                const allAvailableProducts = 
                    getAllAvailableProducts(allProducts, descriptionLength, false);
                const resultJSON = {
                    count,
                    rows: allAvailableProducts
                };
                return this.httpSuccessEachResponse(req, res, resultJSON);
                }
                return this.httpErrorResponse(req, res, 'PR0_2', 
                `Don't exist Product with this Category ID ${category_id}`, 'product');
        }
        return this.httpErrorResponse(req, res, 'PRO_01', 
         `The ID ${category_id} is not a number`, 'product_category');
    });
}

    static getProductsByDepartment() {
        return this.asyncFunction(async (req, res) => {
            const { department_id } = req.params;
            const params = getParams(req.query);
            const { numberOfPage, pageLimit, descriptionLength } = params;
        if (isValid(department_id).valid) {
         const allProducts = await ProductService.getDepartments(department_id);
                if (!isEmpty(allProducts)) {
                    const allAvailableProducts = 
                        getAllAvailableProducts(allProducts, descriptionLength, null);
                    const count = allAvailableProducts.length;
                    const pageParams = paginate({ numberOfPage, pageLimit });
                    const resultJSON = 
                        manualPaginate(allAvailableProducts, pageParams);
                        return this.httpSuccessEachResponse(req, res, { count, rows: resultJSON });
                }
                return this.httpErrorResponse(req, res, 'PR0_2', 
                `Don't exist Product with this department ID ${department_id}`, 'department');
        }
        return this.httpErrorResponse(req, res, 'PRO_01', 
        `The ID ${department_id} is not a number`, 'department');
        });
    }


    static getProductsLocation () {
        return this.asyncFunction(async (req, res) => {
            const { id } = req.params;
            if (isValid(id).valid) {
                const productCategories = await 
                ProductService.getLocations(id);
                if (!isEmpty(productCategories)) {
                    return this.httpSuccessEachResponse(
                        req, res, filterProductsCategories(productCategories));
            }
            return this.httpErrorResponse(req, res, 'PR0_2', 
            `Don't exist Product with this product ID ${id}`, 'product');
                }
               
            return this.httpErrorResponse(req, res, 'PRO_01', 
        `The ID ${id} is not a number`, 'product_id');
        });
    }


    static getProductsReviews() {
        return this.asyncFunction(async (req, res) => {
            const { product_id } = req.params;
            if (isValid(product_id).valid) {
                const productReviews = await 
                ProductService.getReviews(product_id);
            if (!isEmpty(productReviews)) {
                return this.httpSuccessCollectionResponse(req, res, productReviews);
            }
            return this.httpErrorResponse(req, res, 'REV_2', 
            `Don't exist Review for the product with ID ${product_id}`, 'review');
        }
            return this.httpErrorResponse(req, res, 'PRO_01', 
            `The ID ${product_id} is not a number`, 'product_id');
        });
    }

    static searchProducts() {
        return this.asyncFunction(async (req, res) => {
            const { query_string } = req.query;
            if (query_string) {
                const { descriptionLength, pageLimit, numberOfPage } = getParams(req.query);
                const queryString = new RegExp(`${query_string}`, 'gi');
                const allProducts = await ProductService.getAllProducts();  
                const allAvailableProducts = allProducts.filter(
                    product => product.description.match(queryString) 
                    || product.name.match(queryString));

                    const filteredProducts = 
                        getAllAvailableProducts(allAvailableProducts, descriptionLength);
                    const count = filteredProducts.length;
                    const params = paginate({ numberOfPage, pageLimit });
                    const resultJSON = manualPaginate(filteredProducts, params);
                    return this.httpSuccessEachResponse(req, res, { count, rows: resultJSON });
            }
            return this.httpErrorResponse(req, res, 
                'QUE_02', 'query string cannot be blank', 'query_string');
        });
    }

    static addProductsReviews() {
        return this.asyncFunction(async (req, res) => {
            const { product_id } = req.params;
            const { customer_id } = req.user;
            const { review, rating } = req.body;
                await ProductService.createReview({
                    review,
                    rating,
                    customer_id,
                    product_id,
                    created_on: new Date()
                });

               return this.httpSuccessCollectionResponse(req, res, [], false);
        });
    }
}
