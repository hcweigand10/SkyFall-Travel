const { Sequelize, Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Locations extends Model{}

Locations.init( 
    {
        name: {
            type: DataTypes.STRING, 
            allowNull: false
        }, 
        price: {
            type: DataTypes.DECIMAL(10,2), 
            allowNull: false
        }
    }, 
    {
        sequelize
    }
);


module.exports = Locations;