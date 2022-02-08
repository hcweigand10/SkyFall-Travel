const User = require('./User');
const Card = require('./Card');
const Wishlist = require('./Wishlist');

User.hasMany(Card, {
    foreignKey: 'userId',
    onDelete: 'CASCADE'
  })

Wishlist.belongsTo(User, {
    foreignKey: 'userId',
    onDelete: 'CASCADE'
})