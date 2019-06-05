import newtworkRequest from './networkRequest';

  /**
    * @description This returns the 
    * result of a network request 
    * to facebook api to verify a customer accessToken
    * @param  {string} accessToken
    * @returns   {object} verifyFacebookRequest
    */

export default (accessToken) => {
    return newtworkRequest
.get(`https://graph.facebook.com/me?fields=name,gender,location,email&access_token=${accessToken}`);
};
