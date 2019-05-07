import isEmpty from 'lodash.isempty';
import models from '../models';
import BaseController from './base';


const { Department } = models;

class DepartmentController extends BaseController {
    static async getAllDepartments(req, res) {
        try {
            const allDepartments = await Department.findAll();
              return super.httpSuccessCollectionResponse(res, allDepartments);
        } catch (error) {
            return super.serverError(res);
        }
    }

    static async getOneDepartment(req, res) {
        const { id } = req.params;
        const parsedId = parseInt(id, 10);
        if (!isNaN(parsedId)) {
            try {
                const oneDepartment = await Department.findOne({
                    where: {
                        department_id: id
                    }
                });
                if (!isEmpty(oneDepartment)) {
                    return super.httpSuccessEachResponse(res, oneDepartment.dataValues);
                }
                return super.httpErrorResponse(res, 'DEP_02', `Don't exist department with this ID ${id}`, 'department');
            } catch (error) {
                return super.serverError(res);
            }
        }
        return super.httpErrorResponse(res, 'DEP_01', `The ID ${id} is not a number`, 'department');
    }
}

export default DepartmentController;
