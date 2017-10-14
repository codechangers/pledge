module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.createTable('schools', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: Sequelize.INTEGER,
    },
    name: {
      allowNull: false,
      type: Sequelize.STRING,
    },
    createdAt: {
      allowNull: false,
      type: Sequelize.DATE,
    },
    updatedAt: {
      allowNull: false,
      type: Sequelize.DATE,
    },
  }).then(() => queryInterface.createTable('pledges', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: Sequelize.INTEGER,
    },
    firstName: {
      allowNull: false,
      type: Sequelize.STRING,
    },
    lastName: {
      allowNull: false,
      type: Sequelize.STRING,
    },
    email: {
      type: Sequelize.STRING,
    },
    guardianEmail: {
      type: Sequelize.STRING,
    },
    grade: {
      type: Sequelize.STRING,
    },
    schoolId: {
      type: Sequelize.INTEGER,
      references: {
        model: 'schools',
        key: 'id',
      },
    },
    createdAt: {
      allowNull: false,
      type: Sequelize.DATE,
    },
    updatedAt: {
      allowNull: false,
      type: Sequelize.DATE,
    },
  })),
  down: queryInterface => Promise.all([
    queryInterface.dropTable('pledges'),
    queryInterface.dropTable('schools'),
  ]),
};
