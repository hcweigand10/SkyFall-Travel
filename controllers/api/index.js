const router = require('express').Router();
const tripRoutes = require('./trip-routes');
const userRoutes = require('./user-routes');
const destinationRoutes = require('./destination-routes');


router.use('/destination', destinationRoutes)
router.use('/user', userRoutes);
router.use('/trip', tripRoutes);

module.exports = router;
