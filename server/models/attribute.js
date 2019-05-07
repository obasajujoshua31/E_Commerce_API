export default (sequelize, Sequelize) => {
  const attributeSchema = {
    attribute_id: {
      type: Sequelize.INTEGER,
      defaultValue: Sequelize.UUIDV4,
      primaryKey: true,
      unique: true,
      allowNull: false,
    },
    name: {
      type: Sequelize.STRING,
    },
  };

  const attribute = sequelize.define("Attribute", attributeSchema, {
    freezeTableName: true,
    timestamps: false
  });
  return attribute;
};
