import redis from 'redis';
import BaseController from '../controllers/base';
import client from '../config/cache';


class CacheStorage extends BaseController {
    static checkCache(req, res, next) {
        const originalUrl = req.originalUrl;
        const urlArray = originalUrl.split('/');
        return client.get(`turing_backend: ${req.originalUrl}`, (err, result) => {
            if (result) {
                const resultJSON = JSON.parse(result);
                if (urlArray.length === 3) {
                    return super.httpSuccessEachResponse(res, resultJSON);
                } 
                    return super.httpSuccessCollectionResponse(res, resultJSON);
             } 
                return next();          
        });
    }


    static keepCache(url, data) {
        client.setex(`turing_backend: ${url}`, 3600, JSON.stringify(data));
    }
}
export default CacheStorage;
