import kue from 'kue';
import dotenv from 'dotenv';

dotenv.config();

export default kue.createQueue({
    redis: process.env.REDIS_URL
});
