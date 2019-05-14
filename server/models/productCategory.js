
export default (sequelize, Sequelize) => {
  const productCategorySchema = {
  };

  const productCategory = sequelize.define("Product_Category", productCategorySchema, {
    freezeTableName: true,
    timestamps: false,
  });

  productCategory.associate = db => {
    productCategory.belongsTo(db.Product, {
      foreignKey: 'product_id',
      target: 'product_id',
    });

    productCategory.belongsTo(db.Category, {
      foreignKey: 'category_id',
      target: 'category_id',
    });
  };


  productCategory.countAllProducts = function(category_id) {
    return this.count({ where: { category_id } });
  };

productCategory.removeAttribute('id');

  return productCategory;
};
