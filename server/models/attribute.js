export default (sequelize, Sequelize) => {
  const attributeSchema = {
    attribute_id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      unique: true,
      allowNull: false,
    },
    name: {
      type: Sequelize.STRING,
    },
  };

  const attribute = sequelize.define("attribute", attributeSchema, {
    freezeTableName: true,
    timestamps: false
  });

  attribute.associate = db => {
    attribute.hasMany(db.attribute_value, {
      foreignKey: 'attribute_id',
      target: 'attribute_id'
    });
  };
  return attribute;
};
