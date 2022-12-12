const sequelize = require('../config/connection');
const { User, Trip, Stop, Expenditure, Locations } = require('../models');

const userData = require('./userData.json');
const tripData = require('./tripData.json');
const stopData = require('./stopData.json');
const expenditureData = require('./expenditureData.json');
const locationData = require('./locationData.json');

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

  for (const stop of stopData) {
    await Stop.create({
      ...stop,
      tripId: 1,
    });
  }

  for (const expenditure of expenditureData) {
    await Expenditure.create({
      ...expenditure,
      stopId: 1,
    });
  }

  for (const location of locationData) {
    await Locations.create({
      ...location,
    });
  }



  process.exit(0);
};

seedDatabase();
