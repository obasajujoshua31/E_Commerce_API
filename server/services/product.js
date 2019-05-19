import models from '../models';
import BaseService from './base';


const { product, product_category, category, department, review } = models;

export default class ProductService extends BaseService {
    static async getOneProduct (id) {
        return await this.findOne(product, { product_id: id });
    }

    static async getAllProducts(option) {
        return await this.findAll(product, option);
    }

    static get size() {
        return this.count(product);
    }

    static async getCategories(id, paginationOption) {
        const option = { where: {
            category_id: id
        },
            ...paginationOption,
            include: [{ model: product }] };
        return this.findAll(product_category, option);
    }

    static async countAllCategories(id) {
        return this.count(product_category, { where: {
            category_id: id
        } });
    }


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

    static async getLocations(id) {
        return this.findOne(product_category, { product_id: id }, [{
            model: category,
            include: [{
                model: department
            }]
        }] );
    }

    static async getReviews(id) {
        return this.findAll(review, { where: {
            product_id: id
        } });
    }

    static createReview(payload) {
        return this.save(review, payload);
    }
}
