import models from '../models';
import BaseService from './base';


const { Department } = models;

export default class DepartmentService extends BaseService {
    static async getDepartment (id) {
        return await this.findOne(Department, { department_id: id });
    }

    static async getAllDepartments() {
        return await this.findAll(Department);
    }
}
