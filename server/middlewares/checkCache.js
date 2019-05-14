
import BaseController from '../controllers/base';
import client from '../config/cache';


class CacheStorage extends BaseController {
    static checkCache(req, res, next) {
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
}
export default CacheStorage;
