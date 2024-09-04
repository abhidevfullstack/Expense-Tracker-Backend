module.exports = (sequelize, DataTypes) => {
    const Expense = sequelize.define('Expense', {
      amount: {
        type: DataTypes.FLOAT,
        allowNull: false,
      },
      category: {
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
    Expense.associate = models => {
      Expense.belongsTo(models.User, { foreignKey: 'userId' });
    };
  
    return Expense;
  };
  