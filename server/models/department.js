export default (sequelize, Sequelize) => {
  const departmentSchema = {
    department_id: {
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

  const department = sequelize.define("Department", departmentSchema, {
    freezeTableName: true,
    timestamps: false
  });
  return department;
};
