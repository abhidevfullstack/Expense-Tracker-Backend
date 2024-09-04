module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    username: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  });

  // Define associations here if necessary
  User.associate = models => {
    User.hasMany(models.Income, { foreignKey: 'userId' });
    User.hasMany(models.Expense, { foreignKey: 'userId' });
  };

  return User;
};
