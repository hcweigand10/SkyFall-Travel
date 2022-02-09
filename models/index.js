const User = require("./User");
const Trip = require("./Trip");
const Destination = require("./Destination");
const Expenditure = require("./Expenditure");

User.hasMany(Trip, {
  foreignKey: "userId",
  onDelete: "CASCADE",
});

Trip.hasMany(Destination, {
  foreignKey: "tripId",
  onDelete: "CASCADE",
});

Destination.hasMany(Expenditure, {
  foreignKey: "destinationId",
  onDelete: "CASCADE",
});

module.exports = {
  User,
  Trip,
  Destination,
  Expenditure,
};
