export default (sequelize, Sequelize) => {
  const categorySchema = {
    category_id: {
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
  };

  const category = sequelize.define("Category", categorySchema, {
    freezeTableName: true,
    timestamps: false,

  });
    category.associate = db => {
      category.belongsTo(db.Department, {
        foreignKey: 'department_id',
        target: 'department_id'
      });

      category.hasOne(db.Category, {
        foreignKey: 'category_id',
        target: 'category_id',
        through: 'product_category'
      })
    };
  return category;
};
