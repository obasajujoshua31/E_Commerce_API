import redis from 'redis';

const { NODE_ENV, REDIS_HOST, REDIS_URL } = process.env;

const isProd = NODE_ENV === 'production';


export default isProd ? redis.createClient(REDIS_URL) :   
        redis.createClient({
                host: process.env.REDIS_HOST
            });


        //         export default isProd ? redis.createClient(REDIS_URL) :   
        // redis.createClient({
        //         host: REDIS_HOST
        //         });
