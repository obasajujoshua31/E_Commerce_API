export default (sequelize, Sequelize) => {
  const attributeValueSchema = {
    attribute_value_id: {
      type: Sequelize.INTEGER,
      defaultValue: Sequelize.UUIDV4,
      primaryKey: true,
      unique: true,
      allowNull: false,
    },
    value: {
      type: Sequelize.STRING,
    },
  };

  const attributeValue = sequelize.define("Attribute_Value", attributeValueSchema, {
    freezeTableName: true,
    timestamps: false
  });

  attributeValue.associate = db => {
    attributeValue.belongsTo(db.Attribute, {
      foreignKey: 'attribute_id',
      target: 'attribute_id'
    });
  };

  return attributeValue;
};
