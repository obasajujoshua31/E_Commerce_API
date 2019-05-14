export default (sequelize, Sequelize) => {
  const taxSchema = {
    tax_id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      unique: true,
      allowNull: false,
    },
    tax_type: {
      type: Sequelize.STRING,
    },
    tax_percentage: {
      type: Sequelize.STRING
    }
  };

  const tax = sequelize.define("Tax", taxSchema, {
    freezeTableName: true,
    timestamps: false
  });
  return tax;
};
