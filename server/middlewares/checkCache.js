
import BaseController from '../controllers/base';
import client from '../config/cache';

const env = process.env.NODE_ENV;

class CacheStorage extends BaseController {
    /**
     * @description This method check 
     * redis Cache if it is available, 
     * it calles next if there is no such cache and returns the data in the cache if it is found
     * @param  {object} req
     * @param  {object} res
     * @param  {Function} next
     * @returns {object} server Response
     * @member CacheStorage
     */
    static checkCache(req, res, next) {
        if (env !== 'test') {
            const originalUrl = req.originalUrl;
        const urlArray = originalUrl.split('/');
        return client.get(`turing_backend: ${req.originalUrl}`, (err, result) => {
            if (result) {
                const resultJSON = JSON.parse(result);
                if (urlArray.includes('id')) {
                    return super.httpSuccessEachResponse(req, res, resultJSON, false);
                } 
                if (resultJSON.data) {
                    return super.httpSuccessCollectionResponse(req, res, resultJSON.data, false);
                }
                if (resultJSON.error) {
                    res.statusCode = 400;
                }
                return super.httpSuccessEachResponse(req, res, resultJSON, false);
             } 
                return next();          
        });
        }
        return next();
    }
}
export default CacheStorage;
