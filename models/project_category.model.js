module.exports = (sequelize, Sequelize) => {
  const Project_Category = sequelize.define("project_category", {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
    },
    name: {
      type: Sequelize.STRING,
    },
  });
  return Project_Category;
};
