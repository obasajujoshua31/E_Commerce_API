import models from '../models';
import BaseService from './base';


const { Product, Product_Category, Category, Department, Review } = models;

export default class ProductService extends BaseService {
    static async getOneProduct (id) {
        return await this.findOne(Product, { product_id: id });
    }

    static async getAllProducts(option) {
        return await this.findAll(Product, option);
    }

    static get size() {
        return this.count(Product);
    }

    static async getCategories(id, paginationOption) {
        const option = { where: {
            category_id: id
        },
            ...paginationOption,
            include: [{ model: Product }] };
        return this.findAll(Product_Category, option);
    }

    static async countAllCategories(id) {
        return this.count(Product_Category, { where: {
            category_id: id
        } });
    }


    static async getDepartments(id) {
        return this.findAll(Category, {
            where: {
                department_id: id
            },
            include: [{
                model: Product,
                
            }]
        });
    }

    static async getLocations(id) {
        return this.findOne(Product_Category, { product_id: id }, [{
            model: Category,
            include: [{
                model: Department
            }]
        }] );
    }

    static async getReviews(id) {
        return this.findAll(Review, { where: {
            product_id: id
        } });
    }

    static createReview(payload) {
        return this.save(Review, payload);
    }
}
