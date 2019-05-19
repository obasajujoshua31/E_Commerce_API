export default ({ order_id, total_amount, created_on, shipped_on, status }) => {
    return {
        order_id,
        total_amount,
        created_on,
        shipped_on,
        status
    };
};


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


export const prepareProducts = (products, order_id) => {
    let allItems = [];
    
                products.forEach(item => {
                    allItems.push({
                        item_id: item.item_id,
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
