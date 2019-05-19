export default (sequelize, Sequelize) => {
  const orderSchema = {
    order_id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      unique: true,
      autoIncrement: true,
      allowNull: false,
    },
    total_amount: {
      type: Sequelize.STRING,
    },
    created_on: {
      type: Sequelize.DATE,
      allowNull: false
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
    shipping_id: {
      type: Sequelize.INTEGER,
      allowNull: false
    },
    tax_id: {
      type: Sequelize.INTEGER,
      allowNull: false
    },
    reference: {
      type: Sequelize.STRING
    },
  };

  const order = sequelize.define("orders", orderSchema, {
    freezeTableName: true,
    timestamps: false
  });

  order.associate = db => {
    order.belongsTo(db.customer, {
      foreignKey: 'customer_id',
      target: 'customer_id',
      onDelete: 'CASCADE'
    });

    order.hasOne(db.shipping, {
      foreignKey: 'shipping_id',
      target: 'shipping_id'
    });

    order.hasOne(db.tax, {
      foreignKey: 'tax_id',
      target: 'tax_id'
    });

    order.hasMany(db.order_detail, {
      foreignKey: 'order_id',
      target: 'order_id'
    });
  };
  return order;
};
