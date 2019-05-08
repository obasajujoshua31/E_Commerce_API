export default (array) => {
    const errors = [];
    array.forEach((error) => {
        errors.push({
            code: 'VAL_02',
            message: error.msg,
            field: error.param
        });
    });
    return errors;
};
