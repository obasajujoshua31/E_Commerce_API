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

  const category = sequelize.define("category", categorySchema, {
    freezeTableName: true,
    timestamps: false,

  });
    category.associate = db => {
      category.belongsTo(db.department, {
        foreignKey: 'department_id',
        target: 'department_id',
      });

      // category.hasMany(db.Product_Category, {
      //   foreignKey: 'category_id',
      //   target: 'category_id',
      // });

      category.belongsToMany(db.product, {
        foreignKey: 'category_id',
        otherKey: 'product_id',
        through: 'product_category'
      });
    };
  return category;
};
