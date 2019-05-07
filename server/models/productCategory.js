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
      primaryKey: true
    });
  };

  productCategory.associate = db => {
    productCategory.belongsTo(db.Category, {
      foreignKey: 'category_id',
      target: 'category_id',
      primaryKey: true
    });
  };
productCategory.removeAttribute('id');

  return productCategory;
};
