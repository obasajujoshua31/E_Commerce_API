import models from '../models';
import BaseService from './base';


const { product, product_category, category, department, review } = models;

export default class ProductService extends BaseService {
    /**
     * @description This searches the 
     * product table and returns one 
     * instance where the id matches the given id
     * @param  {number} id
     * @returns  {Promise<object>} oneProduct 
     * @member ProductService
     */
    static async getOneProduct (id) {
        return await this.findOne(product, { product_id: id });
    }

    /**
     * @description This searches the 
     * product table and returns all the products with additional options
     * @param  {object} option
     * @returns {Array} allProducts
     * @member ProductService
     */
    static async getAllProducts(option) {
        return await this.findAll(product, option);
    }

    /**
     * @description This returns the count for products
     * @param  {null} argument
     * @returns {number} size
     * @member ProductService
     */
    static get size() {
        return this.count(product);
    }

    
    /**
     * @description This searches the product_category 
     * table and returns every row where 
     * category_id is the given id with the 
     * pagination options and also include the corresponding product
     * @param  {number} id
     * @param  {object} paginationOption
     * @returns {Array} allCategories
     * @member ProductService
     */
    static async getCategories(id, paginationOption) {
        const option = { where: {
            category_id: id
        },
            ...paginationOption,
            include: [{ model: product }] };
        return this.findAll(product_category, option);
    }

    
    /**
     * @description This counts 
     * how many product_categories 
     * where category_id matches the provided the id
     * @param  {number} id
     * @returns  {number} allCategories
     * @member ProductService
     */
    static async countAllCategories(id) {
        return this.count(product_category, { where: {
            category_id: id
        } });
    }

    /**
     * @description This searches from the 
     * category table an returns all rows 
     * where department_id matches the given 
     * id and include the equivalent product row
     * @param  {number} id
     * @returns  {Array} allDepartments
     * @member ProductService
     */
    static async getDepartments(id) {
        return this.findAll(category, {
            where: {
                department_id: id
            },
            include: [{
                model: product,
                
            }]
        });
    }

    /**
     * @description This searches the 
     * product_category table and returns all 
     * rows where product_id matches the given id 
     * and includes the equivalent category row plus the department row
     * @param  {number} id
     * @returns  {object} oneLocation
     * @member ProductService
     */
    static async getLocations(id) {
        return this.findOne(product_category, { product_id: id }, [{
            model: category,
            include: [{
                model: department
            }]
        }] );
    }

    /**
     * @description This returns all productreviews 
     * by searching the searching the product table where the 
     * product_id matches the given id
     * @param  {number} id
     * @returns {Array} allReviews
     * @member ProductService
     */
    static async getReviews(id) {
        return this.findAll(review, { where: {
            product_id: id
        } });
    }

    /**
     * @description This creates a new product Review
     * @param  {object} payload
     * @returns  {object} new Review
     * @member ProductService
     */
    static createReview(payload) {
        return this.save(review, payload);
    }
}
