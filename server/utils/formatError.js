/**
 * @description This format error in a format to be returned to the client
 * @param  {array} array
 * @returns  {array}} errors
 */
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
