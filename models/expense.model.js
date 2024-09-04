module.exports = (sequelize, DataTypes) => {
    const Expense = sequelize.define("expense", {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
      },
      amount: {
        type: DataTypes.FLOAT,
        allowNull: false
      },
      category: {
        type: DataTypes.STRING,
        allowNull: false
      },
      date: {
        type: DataTypes.DATE,
        allowNull: false
      }
    });
  
    Expense.associate = (models) => {
      Expense.belongsTo(models.User, {
        foreignKey: 'userId',
        as: 'user'
      });
    };
  
    return Expense;
  };
  