export default (sequelize, Sequelize) => {
  const productSchema = {
    product_id: {
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
    description: {
      type: Sequelize.STRING
    },
    price: {
      type: Sequelize.STRING
    },
    discounted_price: {
      type: Sequelize.STRING
    },
    thumbnail: {
      type: Sequelize.STRING
    }
  };

  const product = sequelize.define("Product", productSchema, {
    freezeTableName: true,
    timestamps: false
  });

  product.associate = db => {
    product.hasOne(db.Category, {
      foreignKey: 'product_id',
      target: 'product_id',
      through: 'product_category'
    })
  }
  return product;
};
