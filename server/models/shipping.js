export default (sequelize, Sequelize) => {
  const shippingSchema = {
    shipping_id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      unique: true,
      allowNull: false,
    },
    shipping_type: {
      type: Sequelize.STRING,
    },
    shipping_cost: {
      type: Sequelize.STRING
    },
  };

  const shipping = sequelize.define("shipping", shippingSchema, {
    freezeTableName: true,
    timestamps: false
  });

  shipping.associate = db => {
    shipping.belongsTo(db.shipping_region, {
      foreignKey: 'shipping_region_id',
      target: 'shipping_region_id'
    });
  };
  return shipping;
};
