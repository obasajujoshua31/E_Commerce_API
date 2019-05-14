export default (sequelize, Sequelize) => {
    const orderDetailSchema = {
      item_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      attributes: {
        type: Sequelize.STRING,
        allowNull: false
      },
      product_name: {
        type: Sequelize.STRING,
        allowNull: false
      },
      quantity: {
        type: Sequelize.STRING,
        allowNull: false
      },
      unit_cost: {
        type: Sequelize.STRING,
        allowNull: false
      },
    };
  
    const orderDetail = sequelize.define("Order_Detail", orderDetailSchema, {
      freezeTableName: true,
      timestamps: false
    });
  
    orderDetail.removeAttribute('id'),
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
