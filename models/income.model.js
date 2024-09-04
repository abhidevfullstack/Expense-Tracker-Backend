module.exports = (sequelize, DataTypes) => {
    const Income = sequelize.define('Income', {
      amount: {
        type: DataTypes.FLOAT,
        allowNull: false,
      },
      source: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      date: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'Users',
          key: 'id'
        }
      }
    });
  
    // Define associations here if necessary
    Income.associate = models => {
      Income.belongsTo(models.User, { foreignKey: 'userId' });
    };
  
    return Income;
  };
  