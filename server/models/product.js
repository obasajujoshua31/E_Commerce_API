export default (sequelize, Sequelize) => {
  const productSchema = {
    product_id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      unique: true,
      allowNull: false,
    },
    name: {
      type: Sequelize.STRING,
      allowNull: false
    },
    description: {
      type: Sequelize.STRING
    },
    price: {
      type: Sequelize.STRING
    },
    discounted_price: {
      type: Sequelize.DOUBLE
    },
    thumbnail: {
      type: Sequelize.STRING
    },
    image: {
      type: Sequelize.STRING
    },
    image_2: {
      type: Sequelize.STRING
    },
    display: {
      type: Sequelize.INTEGER
    }
  };

  const product = sequelize.define("Product", productSchema, {
    freezeTableName: true,
    timestamps: false
  });

  product.associate = db => {
    product.hasMany(db.Shopping_Cart, {
      foreignKey: 'product_id',
      targetKey: 'product_id'
    });

    product.belongsToMany(db.Category, {
      foreignKey: 'product_id',
      otherKey: 'category_id',
      through: 'Product_Category'
    });
  };
  return product;
};
