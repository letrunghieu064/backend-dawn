module.exports = (sequelize, Sequelize) => {
  const Project = sequelize.define("projects", {
    name: {
      type: Sequelize.STRING,
    },
    creator: {
      type: Sequelize.BIGINT(11),
    },
    desription: {
      type: Sequelize.STRING,
    },
    category: {
      type: Sequelize.INTEGER,
    },
  });
  return Project;
};
