export default (sequelize, Sequelize) => {
    const auditSchema = {
      audit_id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        unique: true,
        allowNull: false,
      },
      code: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      created_on: {
        type: Sequelize.DATE,
        allowNull: false
      },
      message: {
        type: Sequelize.STRING,
        allowNull: false
      },
    };
  
    const audit = sequelize.define("audit", auditSchema, {
      freezeTableName: true,
      timestamps: false
    });
  
    audit.associate = db => {
      audit.belongsTo(db.orders, {
        foreignKey: 'order_id',
        target: 'order_id',
        onDelete: 'CASCADE'
      });
    };
    return audit;
  };
