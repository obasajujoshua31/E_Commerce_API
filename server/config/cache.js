import redis from 'redis';


const { NODE_ENV, REDIS_HOST, REDIS_URL } = process.env;

const isProd = NODE_ENV === 'production';


export default redis.createClient({
    host: isProd ? REDIS_URL
    : REDIS_HOST
});
