export default (sequelize, Sequelize) => {
    const auditSchema = {
      audit_id: {
        type: Sequelize.INTEGER,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true,
        unique: true,
        allowNull: false,
      },
      code: {
        type: Sequelize.STRING,
        allowNull: false
      },
      created_on: {
        type: Sequelize.DATE
      },
      message: {
        type: Sequelize.STRING
      },
    };
  
    const audit = sequelize.define("Audit", auditSchema, {
      freezeTableName: true,
      timestamps: false
    });
  
    audit.associate = db => {
      audit.belongsTo(db.Orders, {
        foreignKey: 'order_id',
        target: 'order_id',
        onDelete: 'CASCADE'
      });
    };
    return audit;
  };
