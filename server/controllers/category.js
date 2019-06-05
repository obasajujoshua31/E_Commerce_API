import isEmpty from 'lodash.isempty';
import models from '../models';
import BaseController from './base';
import CategoryService from '../services/category';
import paginate from '../utils/products';


const { category } = models;

class CategoryController extends BaseController {
     /**
     * @returns {Promise<Function>} allCategoris
     */
    static getAllCategories() {
        return this.asyncFunction(async (req, res) => {
            const { page, limit } = req.query;
            const numberOfPage = parseInt(page, 10) || 1;
            const pageLimit = parseInt(limit, 10) || 20;
            
                const allCategories = await 
                CategoryService.getAllCategories(paginate({ numberOfPage, pageLimit }));
                const allTogether = await category.count();
                    const resultJSON = {
                        count: allTogether,
                        rows: allCategories,
                    };
                    return this.httpSuccessEachResponse(req, res, resultJSON);
            });
        }


     /**
     * @returns {Promise<Function>} oneCategory
     */
    static getOneCategory() {
        return this.asyncFunction(async (req, res) => {
            const { id } = req.params;
            const parsedId = parseInt(id, 10);
            if (!isNaN(parsedId)) {
                    const oneCategory = await CategoryService.getCategory(id);
                    if (!isEmpty(oneCategory)) {
                        return this.httpSuccessEachResponse(req, res, oneCategory.dataValues);
                    }

                    return this.httpErrorResponse(req, res, 'CAT_02', 
                    `Don't exist category with this ID ${id}`, 'category');
            }
        return this.httpErrorResponse(req, res, 'CAT_01', 
        `The ID ${id} is not a number`, 'category');
        });
    }


     /**
     * @returns {Promise<Function>} oneproductCategory
     */
    static getCategoryByProduct() {
        return this.asyncFunction(async(req, res) => {
            const { product_id } = req.params;
        const parsedId = parseInt(product_id, 10);
        if (!isNaN(parsedId)) {
                const allProducts = await CategoryService.getProducts(product_id);
                if (!isEmpty(allProducts)) {
                    const productCategory = [];
                    allProducts.forEach((oneCategory) => {
                        productCategory.push(oneCategory.category);
                    });
                    return this.httpSuccessCollectionResponse(req, res, productCategory);
                }
                return this.httpErrorResponse(req, res, 'CAT_02', 
                    `Don't exist Category for
                    the Product with this ID ${product_id}`, 'product_category');
        }
        return this.httpErrorResponse(req, res, 'CAT_01', 
        `The ID ${product_id} is not a number`, 'category');
        });
    }


     /**
     * @returns {Promise<Function>} category Departments
     */
    static getCategoryByDepartment() {
        return this.asyncFunction(async(req, res) => {
            const { department_id } = req.params;
            const parsedId = parseInt(department_id, 10);
            if (!isNaN(parsedId)) {
                    const allCategories = await CategoryService.getAllCategories({
                        where: {
                            department_id: parsedId
                        }, 
                    });
                    if (!isEmpty(allCategories)) {
                        return this.httpSuccessCollectionResponse(req, res, allCategories);
                    }
                    return this.httpErrorResponse(req, res, 'CAT_02', 
                        `Don't exist Category for
                        the Department with this ID ${department_id}`, 'department_category');
            }
            return this.httpErrorResponse(req, res, 'CAT_01', 
            `The ID ${department_id} is not a number`, 'category');
        });
    }
}

export default CategoryController;
