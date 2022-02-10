const { Sequelize, Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');


class Expenditure extends Model{}

Expenditure.init( 
    {
        name: {
            type: DataTypes.STRING, 
            allowNull: false
        }, 
        event_type: {
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


module.exports = Expenditure;