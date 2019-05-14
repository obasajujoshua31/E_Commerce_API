export default ({ order_id, total_amount, created_on, shipped_on, status }) => {
    return {
        order_id,
        total_amount,
        created_on,
        shipped_on,
        status
    };
};
