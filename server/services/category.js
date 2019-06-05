import models from '../models';
import BaseService from './base';


const { category, product_category } = models;

export default class CategoryService extends BaseService {
    /**
     * @description This service 
     * searches the category table and 
     * retrieves the row where the category_id matches the given id
     * @param  {number} id
     * @returns  {Promise<object>} category 
     * @member CategoryService
     */
    static async getCategory (id) {
        return await this.findOne(category, { category_id: id });
    }

    /**
     * @description This service searches 
     * the category table and retrieves 
     * every row that satisfies the given condition in the option
     * @param  {object} option
     * @returns  {Promise<Array>} allCategories
     * @member CategoryService
     */
    static async getAllCategories(option) {
        return await this.findAll(category, option);
    }

    /**
     * @description This service 
     * searches the product_category 
     * table and retrieves every row 
     * where product_id matches the 
     * given id, it also includes the equivalent category row
     * @param  {number} id
     * @returns  {Promise<Array>}  allProducts
     * @member CategoryService
     */
    static async getProducts(id) {
        return this.findAll(product_category, {
            where: {
                product_id: id
            }, 
            include: [{
                model: category,
                attributes: ['category_id', 'name', 'department_id']
            }]
        });
    }
}
