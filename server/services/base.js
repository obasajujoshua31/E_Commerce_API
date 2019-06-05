

export default class BaseService {
    /**
     * @description This searches model 
     * 'Model' and returns the 
     * row that matches the 
     * condition specified in the option
     * @param  {object} model
     * @param {object} option
     * @param {array} include
     * @returns {object} oneRow
     * @member BaseService
     */
    static async findOne(model, option, include = []) {
        return await model.findOne({
            where: {
             [Object.keys(option)]: Object.values(option)
            },
            include
        });
    }

    /**
     * @description This searches model 
     * 'Model' and returns all the 
     * rows that matches the 
     * condition specified in the option
     * @param  {object} model
     * @param {object} options
     * @returns {array} allRows
     * @member BaseService
     */
    static async findAll(model, options = {}) {
        return await model.findAll(options);
    }

    /**
     * @description This searches model 
     * 'Model' and count how many rows exist in the table including option if any
     * @param {object} model
     * @param {object} option
     * @param {array} include
     * @returns {object} oneRow
     * @member BaseService
     */
    static async count(model, option = {}) {
        return await model.count(option);
    }

    /**
     * @description This creates a new instance of the model 'Model' with the payload provided
     * @param  {object} model
     * @param {object} payload
     * @returns {object} new row
     * @member BaseService
     */
    static async save(model, payload) {
        return await model.create(payload);
    }
}
