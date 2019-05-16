import axios from 'axios';

export default {
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
