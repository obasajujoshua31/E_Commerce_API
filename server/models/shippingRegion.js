export default (sequelize, Sequelize) => {
  const shippingRegionSchema = {
    shipping_region_id: {
      type: Sequelize.INTEGER,
      defaultValue: Sequelize.UUIDV4,
      primaryKey: true,
      unique: true,
      allowNull: false,
    },
    shipping_region: {
      type: Sequelize.STRING,
    },
  };

  const shippingRegion = sequelize.define("Shipping_Region", shippingRegionSchema, {
    freezeTableName: true,
    timestamps: false
  });
  return shippingRegion;
};
