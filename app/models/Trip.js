const { Sequelize, Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Trip extends Model{}

Trip.init(
    {
        name: {
            type: DataTypes.STRING, 
            allowNull: false
        }, 
        start_date: {
            type: DataTypes.DATEONLY, 
            allowNull: false
        }, 
        end_date: {
            type: DataTypes.DATEONLY, 
            allowNull: false
        }, 
        budget: {
            type: DataTypes.DECIMAL(10,2),
            allowNull: false,
            defaultValue: 0.0
        }
    }, 
    {
        sequelize
    }
);

module.exports = Trip;