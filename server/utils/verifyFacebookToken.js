import newtworkRequest from './networkRequest';
import { facebookUrl } from './constants';


export default (accessToken) => {
    return newtworkRequest
.get(`https://graph.facebook.com/me?fields=name,gender,location,email&access_token=${accessToken}`);
};
