export default (sequelize, Sequelize) => {
  const customerSchema = {
    customer_id: {
      type: Sequelize.INTEGER,
      defaultValue: Sequelize.UUIDV4,
      primaryKey: true,
      unique: true,
      allowNull: false,
    },
    name: {
      type: Sequelize.STRING,
      allowNull: false
    },
    email: {
      type: Sequelize.STRING
    },
    address_1: {
      type: Sequelize.STRING
    },
    address_2: {
      type: Sequelize.STRING
    },
    city: {
      type: Sequelize.STRING
    },
    region: {
      type: Sequelize.STRING
    },
    postal_code: {
      type: Sequelize.STRING
    },
    country: {
      type: Sequelize.STRING
    },
    day_phone: {
      type: Sequelize.STRING
    },
    eve_phone: {
      type: Sequelize.STRING
    },
    mob_phone: {
      type: Sequelize.STRING
    },
    credit_card: {
      type: Sequelize.STRING
    }
  };

  const customer = sequelize.define("Customer", customerSchema, {
    freezeTableName: true,
    timestamps: false
  });

  customer.associate = db => {
    customer.hasOne(db.Shipping_Region, {
      foreignKey: 'shipping_region_id',
      target: 'shipping_region_id',
      onDelete: 'CASCADE'
    });
  };
  return customer;
};
