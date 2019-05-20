import kue from 'kue';
import client from './cache';


kue.redis.createClient = function() {
    return client;
};

export default kue.createQueue();
