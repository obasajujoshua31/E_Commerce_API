/**
 * @description This returns an 
 * object which contains offset and 
 * limit which is used by sequelize to paginate products
 * @param  {number} {numberOfPage
 * @param  {number} pageLimit
 * @returns  {object} pageParams
 */
export default ({ numberOfPage, pageLimit }) => {
    const offset = ( numberOfPage - 1 ) * pageLimit;
   
    return {
      offset,
      limit: pageLimit
    };
   };

   /**
    * @description This returns all available products depending on option key passed to it.
    * the default is true. 
    * @param  {arr} array
    * @param  {number} descriptionLength
    * @param  {boolean} option
    * @returns   {array} allAvailableProducts
    */
   export const getAllAvailableProducts = (array, descriptionLength, option = true) => {
    const allAvailableProducts = [];
    if (option) {
      array.forEach((product) => {
          const productDescription = descriptionLength >= product.description.length
          ? product.description 
          : `${product.description.slice(0, descriptionLength)}...`;
          allAvailableProducts.push({ ...product.dataValues,
               description: productDescription });
      });
      return allAvailableProducts;
     }
     if (option === false) {
      array.forEach((product) => {
        const productDescription = descriptionLength >= product.product.description.length
        ? product.product.description 
        : `${product.product.description.slice(0, descriptionLength)}...`;
        allAvailableProducts.push({ ...product.product.dataValues, 
            description: productDescription });
      });
     
      return allAvailableProducts;
     }

    array.forEach(product => {
      product.products.forEach((singleProduct) => {
          const productDescription = descriptionLength >= 
          singleProduct.description.length
  ? singleProduct.description 
  : `${singleProduct.description.slice(0, descriptionLength)}...`;
          allAvailableProducts.push({ ...singleProduct.dataValues, 
              description: productDescription });
      });
  });
  return allProducts(allAvailableProducts);
   };

   
  /**
   * @description This prepares 
   * product array by removing 
   * productCategory and pushing it to allproducts array
   * @param  {array} array
   * @returns  {array} all 
   */
  const allProducts = (array) => {
    const all = [];
    array.forEach(product => {
        all.push(removeProductCategory(product));
    });
    return all;
  };
  
  /**
   * @description This removes product_category from an object
   * @param  {object} product_category
   * @param  {object} ...rest
   * @returns {object} rest
   */
  const removeProductCategory = ({ product_category, ...rest }) => {
    return rest;
  };

  /**
   * @description This paginates an array by using array.slice method
   * @param  {array} array
   * @param  {number} offset
   * @param  {number} limit
   * @returns  {array} paginatedArray
   */
  export const manualPaginate = ( array, { offset, limit }) => {
    return array.slice(offset, limit + offset);
  };

/**
 * @description This filterProductsCategories \
 * by only returning category_id, 
 * category_name, department_id 
 * and department_name
 * @param  {numnber} category_id
 * @param  {object} category
 * @param  {number} department_id
 * @param  {string} name
 * @returns {object} filteredProducts
 */
  export const filterProductsCategories = ({ category_id, 
                  category, category: 
                    { department_id, department: { name } } }) => {
                      return {
                        category_id,
                        category_name: category.name,
                        department_id,
                        department_name: name
                      };
  };
