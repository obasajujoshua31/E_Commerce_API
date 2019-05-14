export default ({ numberOfPage, pageLimit }) => {
    const offset = ( numberOfPage - 1 ) * pageLimit;
   
    return {
      offset,
      limit: pageLimit
    };
   };


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
        const productDescription = descriptionLength >= product.Product.description.length
        ? product.Product.description 
        : `${product.Product.description.slice(0, descriptionLength)}...`;
        allAvailableProducts.push({ ...product.Product.dataValues, 
            description: productDescription });
      });
     
      return allAvailableProducts;
     }

    array.forEach(product => {
      product.Products.forEach((singleProduct) => {
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

  const allProducts = (array) => {
    const all = [];
    array.forEach(product => {
        all.push(removeProductCategory(product));
    });
    return all;
  };

  const removeProductCategory = ({ Product_Category, ...rest }) => {
    return rest;
  };


  export const manualPaginate = ( array, { offset, limit }) => {
    return array.slice(offset, limit + offset);
  };


  export const filterProductsCategories = ({ category_id, 
                  Category, Category: 
                    { department_id, Department: { name } } }) => {
                      return {
                        category_id,
                        category_name: Category.name,
                        department_id,
                        department_name: name
                      };
  };
