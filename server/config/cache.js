import redis from 'redis';
import dotenv from 'dotenv';

dotenv.config();

const { NODE_ENV, REDIS_HOST, REDIS_URL } = process.env;

const isProd = NODE_ENV === 'production';


export default isProd ? redis.createClient(REDIS_URL) :   
        redis.createClient();
