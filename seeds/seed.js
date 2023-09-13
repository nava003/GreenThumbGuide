const sequelize = require('../config/connection');
const { User, Plant } = require('../models');

const userData = require('./userData.json');
const plantData = require('./plantData.json');

const seedDatabase = async () => {
  await sequelize.sync({ force: true });

  const users = await User.bulkCreate(userData, {
    individualHooks: true,
    returning: true,
  });
  
  const plantDataUser = [];

  for(var i = 0; i < plantData.length; i++) {
    plantDataUser.push({
      ...plantData[i],
      user_id: users[Math.floor(Math.random()* users.length)].id,
    })};

  await Plant.bulkCreate(plantDataUser);

  process.exit(0);
};

seedDatabase();
