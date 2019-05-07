export default (sequelize, Sequelize) => {
  const reviewSchema = {
    review_id: {
      type: Sequelize.INTEGER,
      defaultValue: Sequelize.UUIDV4,
      primaryKey: true,
      unique: true,
      allowNull: false,
    },
    name: {
      type: Sequelize.STRING,
    },
    rating: {
      type: Sequelize.INTEGER
    },

    created_on: {
      type: Sequelize.DATE,
      allowNull: false
    },
  };

  const review = sequelize.define("Review", reviewSchema, {
    freezeTableName: true,
    timestamps: false
  });

  review.associate = db => {
    review.belongsTo(db.Product, {
      foreignKey: 'product_id',
      target: 'product_id'
    }),
    review.belongsTo(db.Customer, {
      foreignKey: 'customer_id',
      target: 'customer_id'
    })
  }
  return review;
};
