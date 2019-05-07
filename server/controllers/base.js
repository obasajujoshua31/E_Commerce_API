

/**
 *
 *
 * @class BaseController
 */

   class BaseController {
    /**
     * @param  {object} res
     * @param  {Array} data
     * @returns  {object} server response
     */
    static httpSuccessCollectionResponse(res, data) {
        return res.status(200).json([...data]);
    }

    static httpSuccessEachResponse(res, data) {
        return res.status(200).json({
            ...data
        });
    }

/**
 *
 *
 * @param {object} res
 * @param {number} code
 * @param {string} message
 * @param {string} field
 * @returns {object} server response
 * @memberof BaseController
 */
static httpErrorResponse(res, code, message, field) {
        return res.status(400).json({
           error: {
            status: 400,
            code,
            message,
            field
           } 
        });
    }

/**
 *
 *
 * @param {object} res
 * @param {Error} error
 * @returns {object} server response
 * @memberof BaseController
 */
    static serverError(res) {
        return res.status(500).json({
            error: {
                status: 500,
                message: 'Server unavailable'
            }
        });
    }
}


export default BaseController;
