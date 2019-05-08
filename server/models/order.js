export default (sequelize, Sequelize) => {
  const orderSchema = {
    order_id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      unique: true,
      allowNull: false,
    },
    total_amount: {
      type: Sequelize.STRING,
      allowNull: false
    },
    created_on: {
      type: Sequelize.DATE
    },
    shipped_on: {
      type: Sequelize.DATE
    },
    status: {
      type: Sequelize.STRING
    },
    comments: {
      type: Sequelize.STRING
    },
    auth_code: {
      type: Sequelize.STRING
    },
    reference: {
      type: Sequelize.STRING
    },
  };

  const order = sequelize.define("Orders", orderSchema, {
    freezeTableName: true,
    timestamps: false
  });

  order.associate = db => {
    order.belongsTo(db.Customer, {
      foreignKey: 'customer_id',
      target: 'customer_id',
      onDelete: 'CASCADE'
    });

    order.hasOne(db.Shipping, {
      foreignKey: 'shipping_id',
      target: 'shipping_id'
    });

    order.hasOne(db.Tax, {
      foreignKey: 'tax_id',
      target: 'tax_id'
    });
  };
  return order;
};
