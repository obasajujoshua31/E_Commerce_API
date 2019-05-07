export default (sequelize, Sequelize) => {
  const productAttributeSchema = {
  };

  const productAttribute = sequelize.define("Product_Attribute", productAttributeSchema, {
    freezeTableName: true,
    timestamps: false,
  });

  productAttribute.associate = db => {
    productAttribute.belongsTo(db.Product, {
      foreignKey: 'product_id',
      target: 'product_id',
      primaryKey: true
    });
  };

  productAttribute.associate = db => {
    productAttribute.belongsTo(db.Attribute_Value, {
      foreignKey: 'attribute_value_id',
      target: 'attribute_value_id',
      primaryKey: true
    });
  };
productAttribute.removeAttribute('id');

  return productAttribute;
};
