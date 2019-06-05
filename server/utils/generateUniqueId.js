import shortId from 'shortid';
/** 
 * @description This generates id for shopping cart
 * @param  {null} argument
 * @returns {string} id
 */
export default () => {
    return shortId.generate();
};
