const User = require("./User");
const Trip = require("./Trip");
const Stop = require("./Stop");
const Expenditure = require("./Expenditure");
const Locations = require("./Locations");

User.hasMany(Trip, {
  foreignKey: "userId",
  onDelete: "CASCADE",
});

Trip.belongsTo(User, {
  foreignKey: "userId",
  onDelete: "CASCADE",
})

Trip.hasMany(Stop, {
  foreignKey: "tripId",
  onDelete: "CASCADE",
});

Stop.belongsTo(Trip, {
  foreignKey: "tripId",
  onDelete: "CASCADE",
})

Expenditure.belongsTo(Stop, {
  foreignKey: "stopId",
  onDelete: "CASCADE",
})

Stop.hasOne(Expenditure, {
  foreignKey: "stopId",
  onDelete: "CASCADE"
})


module.exports = {
  User,
  Trip,
  Stop,
  Expenditure,
  Locations
};
