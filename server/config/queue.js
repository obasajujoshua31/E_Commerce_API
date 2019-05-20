import kue from 'kue';


export default kue.createQueue({
    redis: process.env.REDIS_URL
});
