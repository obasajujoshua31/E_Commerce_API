import isEmpty from 'lodash.isempty';
import OrderService from '../services/order';

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
