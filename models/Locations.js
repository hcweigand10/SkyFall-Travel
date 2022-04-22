const { Sequelize, Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');


class Locations extends Model{}

Locations.init( 
    {
        name: {
            type: DataTypes.STRING, 
            allowNull: false
        }, 
        desc: {
            type: DataTypes.STRING,
            allowNull: false
        }, 
        photo: {
            type: DataTypes.STRING, 
            allowNull: true
        }
    }, 
    {
        sequelize
    }
);


module.exports = Locations;