export default (sequelize, Sequelize) => {
  const reviewSchema = {
    review_id: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      unique: true,
      allowNull: false,
    },
    review: {
      type: Sequelize.STRING,
    },
    rating: {
      type: Sequelize.INTEGER
    },
    customer_id: {
      type: Sequelize.STRING,
      defaultValue: null
    },

    created_on: {
      type: Sequelize.DATE,
      allowNull: false,
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
    });
  };
  return review;
};
