export default (sequelize, Sequelize) => {
  const productAttributeSchema = {
  };

  const productAttribute = sequelize.define("product_attribute", productAttributeSchema, {
    freezeTableName: true,
    timestamps: false,
  });

  productAttribute.associate = db => {
    productAttribute.belongsTo(db.product, {
      foreignKey: 'product_id',
      target: 'product_id',
      primaryKey: true
    });
  };

  productAttribute.associate = db => {
    productAttribute.belongsTo(db.attribute_value, {
      foreignKey: 'attribute_value_id',
      target: 'attribute_value_id',
      primaryKey: true
    });
  };
productAttribute.removeAttribute('id');

  return productAttribute;
};
