/**
 * @description This destructures orders 
 * and picks out order_id, 
 * total_amount, created_on, 
 * shipped_on and status from order object
 * @param  {number} order_id
 * @param  {number} total_amount
 * @param  {Date} created_on
 * @param  {Date} shipped_on
 * @param  {string} status}
 * @returns {object} object
 */
export default ({ order_id, total_amount, created_on, shipped_on, status }) => {
    return {
        order_id,
        total_amount,
        created_on,
        shipped_on,
        status
    };
};

/**
 * @description This prepares Order info to be returned to client
 * @param  {Array} orders
 * @returns  {Array} allOrders
 */
export const prepareOrderInfo = (orders) => {
    const allOrders = [];
        orders.forEach(item => {
            allOrders.push({
                order_id: item.order_id,
                product_id: item.product_id,
                attributes: item.attributes,
                product_name: item.product_name,
                quantity: item.quantity,
                unit_cost: item.unit_cost,
                subtotal: item.quantity * item.unit_cost
            });
    });

    return allOrders;
};
/**
 * @description This prepares Products to be returned to client
 * @param  {Array} products
 * @param  {number} order_id
 * @returns  {Array} allItems
 */

export const prepareProducts = (products, order_id) => {
    let allItems = [];
    
                products.forEach(item => {
                    allItems.push({
                        order_id,
                        product_id: item.product_id,
                        attributes: item.attributes,
                        product_name: item.product.name,
                        quantity: item.quantity,
                        unit_cost: item.product.price
                    });
                });
                return allItems;
};
