const { Sequelize, Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');


class Expenditure extends Model{}

Expenditure.init( 
    {
        accomodation: {
            type: DataTypes.INTEGER, 
            allowNull: false
        }, 
        travel_costs: {
            type: DataTypes.INTEGER,
            allowNull: false
        }, 
        food_entertainment: {
            type: DataTypes.INTEGER, 
            allowNull: false
        },
        other: {
            type: DataTypes.INTEGER, 
            allowNull: false
        }
    }, 
    {
        sequelize
    }
);


module.exports = Expenditure;