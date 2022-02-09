const { Sequelize, Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Destination extends Model{}

Destination.init( 
    {
        name: {
            type: DataTypes.STRING, 
            allowNull: false
        }, 
        price: {
            type: DataTypes.DECIMAL(10,2), 
            allowNull: false
        }, 
        dates_arrived: {
            type: DataTypes.DATEONLY, 
            allowNull: false
        }, 
        dates_leaving: {
            type: DataTypes.DATEONLY, 
            allowNull: false
        }, 
    }, 
    {
        sequelize
    }
);


module.exports = Destination;