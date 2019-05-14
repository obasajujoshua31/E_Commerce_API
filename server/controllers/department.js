import isEmpty from 'lodash.isempty';
import models from '../models';
import BaseController from './base';
import CacheStorage from '../middlewares/checkCache';


const { Department } = models;

class DepartmentController extends BaseController {
    static getAllDepartments() {
        return this.asyncFunction(async (req, res) => {
                const allDepartments = await Department.findAll();
                  return this.httpSuccessCollectionResponse(req, res, allDepartments);
        });
    }

    static getOneDepartment() {
        return this.asyncFunction(async (req, res) => {
            const { id } = req.params;
            const parsedId = parseInt(id, 10);
            if (!isNaN(parsedId)) {
                    const oneDepartment = await Department.findOne({
                        where: {
                            department_id: id
                        }
                    });
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
