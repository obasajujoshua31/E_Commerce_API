import Bcrypt from 'bcryptjs';

/**
 * @description This hashes a given password with 1 as the salt with bcryptjs module
 * @param  {string} password
 * @returns  {string} hashedPassword
 */
export default (password) => {
    const salt = Bcrypt.genSaltSync(1);
    return Bcrypt.hashSync(password, salt);
};

/**
 * @description This returns password from a customer object to be returned to the client
 * @param  {password} string
 * @param  {object} ...rest
 * @returns {object} rest
 */
export const removePassword = ({ password, ...rest }) => {
    return rest;
};

/** 
 * @description This compares password 
 * by the user with the password 
 * from the database and returns either it is match or not.
 * @param  {string} password
 * @param  {string} dbPassword
 * @returns  {boolean} isMatch
 */
export const comparePassword = (password, dbPassword) => {
    return Bcrypt.compareSync(password, dbPassword);
};
