const { Sequelize, Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');


class Expenditures extends Model{}

Expenditures.init( 
    {
        name: {
            type: DataTypes.STRING, 
            allowNull: false
        }, 
        event_type:
        price: {
            type: DataTypes.DECIMAL(10,2), 
            allowNull: false
        }
    }, 
    {
        sequelize
    }
);


module.exports = Expenditures;