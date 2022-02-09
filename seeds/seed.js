const sequelize = require('../config/connection');
const { User, Trip, Destination, Expenditure } = require('../models');

const userData = require('./userData.json');
const tripData = require('./tripData.json');
const destinationData = require('./destinationData.json');
const expenditureData = require('./expenditureData.json');

const seedDatabase = async () => {
  await sequelize.sync({ force: true });

  const users = await User.bulkCreate(userData, {
    individualHooks: true,
    returning: true,
  });

  for (const trip of tripData) {
    await Trip.create({
      ...trip,
      userId: 1,
    });
  }

  for (const destination of destinationData) {
    await Destination.create({
      ...destination,
      tripId: 1,
    });
  }

  for (const expenditure of expenditureData) {
    await Expenditure.create({
      ...expenditure,
      destinationId: 1,
    });
  }



  process.exit(0);
};

seedDatabase();
