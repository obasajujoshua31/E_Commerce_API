/**
 * @description this prepare products 
 * to be returned to clients
 * @param  {array} allProducts
 * @returns {array} products
 */
export default (allProducts) => {
    const products = [];
    allProducts.forEach((product) => {
        products.push({
            item_id: product.item_id,
            name: product.product.name,
            attributes: product.attributes,
            product_id: product.product_id,
            image: product.product.image,
            price: product.product.price,
            quantity: product.quantity,
            subtotal: product.product.price * product.quantity
        });
    });
    return products;
};

/**
 * @description This prepare saveItems to be saved in order_detail table
 * @param  {array} allItems
 * @returns {array} items
 * 
 */
export const prepareSavedItems = (allItems) => {
    const items = [];
    allItems.forEach(item => {
        items.push({
            item_id: item.item_id,
            name: item.product.name,
            attributes: item.attributes,
            price: item.product.price
        });
    });
    return items;
};
