export default (sequelize, Sequelize) => {
    const shoppingCartSchema = {
      item_id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        unique: true,
        autoIncrement: true,
        allowNull: false,
      },
      cart_id: {
        type: Sequelize.STRING,
        allowNull: false
      },
      product_id: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      attributes: {
        type: Sequelize.STRING
      },
      quantity: {
        type: Sequelize.INTEGER
      },
      buy_now: {
        type: Sequelize.INTEGER
      },
      added_on: {
        type: Sequelize.DATE,
        allowNull: false
      },
    };
  
    const shoppingCart = sequelize.define("shopping_cart", shoppingCartSchema, {
      freezeTableName: true,
      timestamps: false
    });
  
    shoppingCart.associate = db => {
      shoppingCart.belongsTo(db.product, {
        foreignKey: 'product_id',
        target: 'product_id',
        onDelete: 'CASCADE',
      });
    };

    shoppingCart.prototype.updateItem = async function(quantity) {
      this.quantity = quantity;
      await this.save();
      await this.reload();
    };

    shoppingCart.prototype.saveOrMoveToCart = async function(payload) {
      this.buy_now = payload;
      await this.save();
      await this.reload();
    };
    return shoppingCart;
  };
