import client from '../config/cache';

/**
 * @description This creates redis cache with turing_backend: url with the key and data as the value
 * it expires after 60 minutes
 * @param  {string} url
 * @param  {object} data
 */
export default (url, data) => {
    client.setex(`turing_backend: ${url}`, 3600, JSON.stringify(data));
};
