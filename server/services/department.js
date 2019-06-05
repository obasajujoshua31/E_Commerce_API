import models from '../models';
import BaseService from './base';


const { department } = models;

export default class DepartmentService extends BaseService {
    /**
     * @description This method 
     * searches the department 
     * table and retrieves the 
     * row where department_id matches the given id
     * @param  {number} id
     * @returns  {Promise<object>} oneDepartment
     * @member  DepartmentService
     */
    static async getDepartment (id) {
        return await this.findOne(department, { department_id: id });
    }

     /**
     * @description This method 
     * searches the department 
     * table and retrieves all the rows
     * @param  {null} null
     * @returns  {Promise<Array>} oneDepartment
     * @member  DepartmentService
     */
    static async getAllDepartments() {
        return await this.findAll(department);
    }
}
