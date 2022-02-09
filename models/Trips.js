const { Sequelize, Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Trips extends Model{}

Trips.init(
    {
        name: {
            type: DataTypes.STRING, 
            allowNull: false
        }, 
        dates: {
            type: DataTypes.DATEONLY, 
            allowNull: false
        }, 
        budget: {
            type: DataTypes.DECIMAL(10,2),
            allowNull: false
        }
    }, 
    {
        sequelize
    }
);

module.exports = Trips;