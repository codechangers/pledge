module.exports = (sequelize, DataTypes) => {
  const School = sequelize.define('school', {
    name: {
      allowNull: false,
      type: DataTypes.STRING,
    },
  });
  School.associate = ({ pledge }) => {
    School.hasMany(pledge);
  };
  return School;
};
