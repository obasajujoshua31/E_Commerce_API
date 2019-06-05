import axios from 'axios';

export default {
    /**
     * @description This makes axios
     *  call to a given url and 
     * returns the response and throws the error if there is error
     * @param  {string} url
     * @returns  {object} axios response
     */
    get: async function(url) {
        try {
            return await axios.get(url, {
                headers: {
                    'content-type': 'application/json'
                }
            });
             } catch (error) {
                throw error.response.data;
            }
        }
    };
