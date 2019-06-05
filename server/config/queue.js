import kue from 'kue';
import client from './cache';

// kue connections with redis client
kue.redis.createClient = function() {
    return client;
};

export default kue.createQueue();
