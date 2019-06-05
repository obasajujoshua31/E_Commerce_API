import isEmpty from 'lodash.isempty';
import OrderService from '../services/order';


/**
 * @description This method calls 
 * orderService to check whether 
 * the customer has order with the given order_id
 * it returns response based on the result
 * @param  {object} req
 * @param  {object} res
 * @param  {Function} next
 * @returns {object} Server Response
 */
export default async (req, res, next) => {
    const { params: { order_id }, user: { customer_id } } = req;

    const orderByCustomer = await OrderService.confirmOrderAndCustomer(order_id, customer_id);

    if (!isEmpty(orderByCustomer)) {
        return next();
    }
    return res.status(400).json({
        code: 'ORD_02',
        message: 'order is empty for customer',
        field: 'order'
    });
};
