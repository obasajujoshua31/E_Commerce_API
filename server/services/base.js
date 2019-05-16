

export default class BaseService {
    static async findOne(model, option, include = []) {
        return await model.findOne({
            where: {
             [Object.keys(option)]: Object.values(option)
            },
            include
        });
    }

    static async findAll(model, options = {}) {
        return await model.findAll(options);
    }

    static async count(model, option = {}) {
        return await model.count(option);
    }

    static async save(model, payload) {
        return await model.create(payload);
    }
}
