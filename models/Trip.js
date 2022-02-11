const { Sequelize, Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Trip extends Model{}

Trip.init(
    {
        name: {
            type: DataTypes.STRING, 
            allowNull: false
        }, 
        date_arrived: {
            type: DataTypes.DATEONLY, 
            allowNull: false
        }, 
        date_leaving: {
            type: DataTypes.DATEONLY, 
            allowNull: false
        }, 
        budget: {
            type: DataTypes.DECIMAL(10,2),
            allowNull: true
        }
    }, 
    {
        sequelize
    }
);

module.exports = Trip;