import models from '../models';
import BaseService from './base';


const { department } = models;

export default class DepartmentService extends BaseService {
    static async getDepartment (id) {
        return await this.findOne(department, { department_id: id });
    }

    static async getAllDepartments() {
        return await this.findAll(department);
    }
}
