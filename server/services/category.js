import models from '../models';
import BaseService from './base';


const { category, product_category } = models;

export default class CategoryService extends BaseService {
    static async getCategory (id) {
        return await this.findOne(category, { category_id: id });
    }

    static async getAllCategories(option) {
        return await this.findAll(category, option);
    }

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
