import jwt from 'jsonwebtoken';


export default class CheckToken {
    /**
     * @description This method check 
     * if user token exists, verifies user Token and append the user to the request object
     * @param  {object} req
     * @param  {object} res
     * @param  {Function} next
     * @returns  {object} Server Response
     * @member CheckToken
     */
    static verifyUser(req, res, next) {
        try {
            const { user_key } = req.headers;
            if (typeof user_key === 'undefined') {
                return res.status(401).json({
                    error: {
                        status: 401,
                        code: 'AUT_02',
                        message: 'Access Unauthorized',
                        field: 'NoAuth'
                    }
                });
            }
            const userKey = user_key.split(' ');
            const token = userKey[1];
            const decoded = jwt.verify(token, process.env.SECRET);
            req.user = decoded;
            return next();
        } catch (error) {
            return res.status(401).json({
                error: {
                    status: 401,
                    code: 'AUT_02',
                    message: 'Access Unauthorized',
                    field: 'token'
                }
            });
        }
    }

    /**
     * @description This method generates token with the customer_id and set Expiration to 24hrs
     * @param  {number} customer_id
     * @returns  {string} token
     * @member CheckToken
     */
    static generateToken(customer_id) {
        return jwt.sign( { customer_id }, process.env.SECRET, { expiresIn: '24hr' });
    }
}
