import newtworkRequest from './networkRequest';


export default (accessToken) => {
    return newtworkRequest
.get(`https://graph.facebook.com/me?fields=name,gender,location,email&access_token=${accessToken}`);
};
