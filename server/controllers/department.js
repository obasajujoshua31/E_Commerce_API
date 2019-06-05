import isEmpty from 'lodash.isempty';
import BaseController from './base';
import DepartmentService from '../services/department';


class DepartmentController extends BaseController {
     /**
     * @returns {Promise<Function>} allDepartments
     */
    static getAllDepartments() {
        return this.asyncFunction(async (req, res) => {
                const allDepartments = await DepartmentService.getAllDepartments();
                  return this.httpSuccessCollectionResponse(req, res, allDepartments);
        });
    }


     /**
     * @returns {Promise<Function>} oneDepartment
     */
    static getOneDepartment() {
        return this.asyncFunction(async (req, res) => {
            const { id } = req.params;
            const parsedId = parseInt(id, 10);
            if (!isNaN(parsedId)) {
                    const oneDepartment = await DepartmentService.getDepartment(id);
                    if (!isEmpty(oneDepartment)) {
                        return this.httpSuccessEachResponse(req, res, oneDepartment.dataValues);
                    }
                    return this.httpErrorResponse(req, res, 'DEP_02', 
                    `Don't exist department with this ID ${id}`, 'department');
            }
            return this.httpErrorResponse(req, res, 'DEP_01', 
            `The ID ${id} is not a number`, 'department');
        });
    }
}

export default DepartmentController;
