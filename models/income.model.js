module.exports = (sequelize, DataTypes) => {
    const Income = sequelize.define("income", {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
      },
      amount: {
        type: DataTypes.FLOAT,
        allowNull: false
      },
      source: {
        type: DataTypes.STRING,
        allowNull: false
      },
      date: {
        type: DataTypes.DATE,
        allowNull: false
      }
    });
  
    Income.associate = (models) => {
      Income.belongsTo(models.User, {
        foreignKey: 'userId',
        as: 'user'
      });
    };
  
    return Income;
  };
  