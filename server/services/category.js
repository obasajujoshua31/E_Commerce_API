import models from '../models';
import BaseService from './base';


const { Category, Product_Category } = models;

export default class CategoryService extends BaseService {
    static async getCategory (id) {
        return await this.findOne(Category, { category_id: id });
    }

    static async getAllCategories(option) {
        return await this.findAll(Category, option);
    }

    static async getProducts(id) {
        return this.findAll(Product_Category, {
            where: {
                product_id: id
            }, 
            include: [{
                model: Category,
                attributes: ['category_id', 'name', 'department_id']
            }]
        });
    }
}
