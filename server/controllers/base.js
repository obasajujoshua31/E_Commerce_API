import createCache from '../utils/createCache';
import logger from '../utils/logger';
/**
 *
 *
 * @class BaseController
 */

   class BaseController {
    /** 
     * @description This returns server 
     * response for array objects, 
     * it creates cache if keep is not specified and does not create cache if keep is false
     * @param  {object} req
     * @param {object} res
     * @param  {Array} data
     * @param {boolean} keep
     * @member BaseController
     * @returns  {object} server response
     */
    static httpSuccessCollectionResponse(req, res, data, keep = true) {
        if (keep) {
            createCache(req.originalUrl, { data });
        }
     
        return res.status(200).json([...data]);
    }

    /**
     *@description This methods sends 
     server response and create cache 
     by default if keep is not specified 
     and does not create cache if keep is false
     * @param  {object} req
     * @param  {object} res
     * @param  {object} data
     * @param  {boolean} keep
     * @returns {object} httpResponse
     */
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
 *@description This returns error 
 response and create cache if 
 keep is not specified and does 
 not create cache when keep is false
 * @param {object} req
 * @param {object} res
 * @param {number} code
 * @param {string} message
 * @param {string} field
 * @param {boolean} keep
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
 *@description This returns server error 500 with message Server unavailable
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

    /**
     * @description This returns an 
     * asynchronous handler with 
     * request and response as the parameters
     * @param  {Function} handler
     * @param  {boolean} hasError
     * @returns {callback} function
     */
    static asyncFunction(handler, hasError = false) {
        /**
         * @param  {object} req
         * @param  {object} res
         * @param  {error.message}} message
         */
        return async (req, res) => {
            try {
               await handler(req, res);
            } catch (error) {
                console.log('>>>>>eririr', error);
                logger.log({ level: 'error', message: error.message });
                if (hasError) {
                    switch (error.type) {
                        case 'StripeInvalidRequestError': 
                            return res.status(401).json({
                                message: error.message,
                                code: 'AUT_02',
                                field: 'API_KEY'
                            });
                            default:
                            return res.status(400).json({
                                error: error.error
                            }); 
                    }
                }
                    return this.serverError(res);
            }
        };
    }
}


export default BaseController;
