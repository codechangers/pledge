module.exports = (sequelize, DataTypes) => {
  const Pledge = sequelize.define('pledge', {
    firstName: {
      allowNull: false,
      type: DataTypes.STRING,
    },
    lastName: {
      allowNull: false,
      type: DataTypes.STRING,
    },
    grade: {
      allowNull: false,
      type: DataTypes.STRING,
    },
    email: DataTypes.STRING,
    guardianEmail: DataTypes.STRING,
  });
  Pledge.associate = ({ school }) => {
    Pledge.belongsTo(school);
  };
  return Pledge;
};
