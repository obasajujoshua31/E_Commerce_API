export default (sequelize, Sequelize) => {
  const categorySchema = {
    category_id: {
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
  };

  const category = sequelize.define("Category", categorySchema, {
    freezeTableName: true,
    timestamps: false,

  });
    category.associate = db => {
      category.belongsTo(db.Department, {
        foreignKey: 'department_id',
        target: 'department_id',
      });

      // category.hasMany(db.Product_Category, {
      //   foreignKey: 'category_id',
      //   target: 'category_id',
      // });

      category.belongsToMany(db.Product, {
        foreignKey: 'category_id',
        otherKey: 'product_id',
        through: 'Product_Category'
      });
    };
  return category;
};
