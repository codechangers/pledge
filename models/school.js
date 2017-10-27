module.exports = (sequelize, DataTypes) => {
  const School = sequelize.define(
    'school', {
      name: {
        allowNull: false,
        type: DataTypes.STRING,
      },
    },
    {
      hooks: {
        afterCreate(school) {
          // make the school id more 'pin-like' by adding junk before it
          return School.update(
            {
              id: 8085 + school.id,
            },
            {
              where: { id: school.id },
            }); // eslint-disable-line
        },
      },
    },
  );
  School.associate = ({ pledge }) => {
    School.hasMany(pledge);
  };
  return School;
};
