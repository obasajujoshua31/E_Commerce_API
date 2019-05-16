import createCache from '../utils/createCache';
import logger from '../utils/logger';
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
    static httpSuccessCollectionResponse(req, res, data, keep = true) {
        if (keep) {
            createCache(req.originalUrl, { data });
        }
     
        return res.status(200).json([...data]);
    }

    static httpSuccessEachResponse(req, res, data, keep = true) {
        const result = { ...data };
        if (keep) {
            createCache(req.originalUrl, result);
        }

        return res.status(res.statusCode || 200).json({
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
static httpErrorResponse(req, res, code, message, field, keep = true) {
    const error = {
        error: {
            status: 400, code, message, field
        }
    };
    if (keep) {
        createCache(req.originalUrl, error);
    }
   
        return res.status(400).json({
           ...error
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

    static asyncFunction(handler, hasError = false) {
        return async (req, res) => {
            try {
               await handler(req, res);
            } catch (error) {
                console.log('!!!!!!>>', error);
                if (hasError) {
                    return res.status(400).json({
                        error: error.error
                    });   
                }
                logger.log({ level: 'error', message: error.message });
                    return this.serverError(res);
            }
        };
    }
}


export default BaseController;
