export default (sequelize, Sequelize) => {
    const shoppingCartSchema = {
      item_id: {
        type: Sequelize.INTEGER,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true,
        unique: true,
        allowNull: false,
      },
      cart_id: {
        type: Sequelize.STRING,
        allowNull: false
      },
      attributes: {
        type: Sequelize.STRING
      },
      quantity: {
        type: Sequelize.STRING
      },
      buy_now: {
        type: Sequelize.STRING
      },
      added_on: {
        type: Sequelize.DATE
      },
    };
  
    const shoppingCart = sequelize.define("Shopping_Cart", shoppingCartSchema, {
      freezeTableName: true,
      timestamps: false
    });
  
    shoppingCart.associate = db => {
      shoppingCart.hasMany(db.Product, {
        foreignKey: 'product_id',
        target: 'product_id',
        onDelete: 'CASCADE'
      });
    };
    return shoppingCart;
  };
