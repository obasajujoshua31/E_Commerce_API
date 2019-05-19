export default (sequelize, Sequelize) => {
  const shippingRegionSchema = {
    shipping_region_id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      unique: true,
      allowNull: false,
    },
    shipping_region: {
      type: Sequelize.STRING,
    },
  };

  const shippingRegion = sequelize.define("shipping_region", shippingRegionSchema, {
    freezeTableName: true,
    timestamps: false
  });

  shippingRegion.associate = db => {
    shippingRegion.hasMany(db.shipping, {
      foreignKey: 'shipping_region_id',
      target: 'shipping_region_id'
    });
  };
  return shippingRegion;
};
