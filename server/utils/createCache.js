import client from '../config/cache';


export default (url, data) => {
    client.setex(`turing_backend: ${url}`, 3600, JSON.stringify(data));
};
