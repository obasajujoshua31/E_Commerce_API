export default (sequelize, Sequelize) => {
    const orderDetailSchema = {
      item_id: {
        type: Sequelize.INTEGER,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true,
        unique: true,
        allowNull: false,
      },
      attributes: {
        type: Sequelize.STRING,
        allowNull: false
      },
      product_name: {
        type: Sequelize.STRING
      },
      quantity: {
        type: Sequelize.STRING
      },
      unit_cost: {
        type: Sequelize.STRING
      },
    };
  
    const orderDetail = sequelize.define("Order_Detail", orderDetailSchema, {
      freezeTableName: true,
      timestamps: false
    });
  
    orderDetail.associate = db => {
      orderDetail.belongsTo(db.Orders, {
        foreignKey: 'order_id',
        target: 'order_id',
        onDelete: 'CASCADE'
      });
  
      orderDetail.belongsTo(db.Product, {
        foreignKey: 'product_id',
        target: 'product_id'
      });
    };
    return orderDetail;
  };
