const User = require("./User");
const Trip = require("./Trip");
const Stop = require("./Stop");
const Expenditure = require("./Expenditure");

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

Stop.hasMany(Expenditure, {
  foreignKey: "stopId",
  onDelete: "CASCADE",
});

Expenditure.belongsTo(Stop, {
  foreignKey: "stopId",
  onDelete: "CASCADE",
})


module.exports = {
  User,
  Trip,
  Stop,
  Expenditure,
};
