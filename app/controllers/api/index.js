const router = require('express').Router();
const tripRoutes = require('./trip-routes');
const userRoutes = require('./user-routes');
const stopRoutes = require('./stop-routes');
const expenditureRoutes = require('./expenditure-routes');
const locationRoutes = require('./location-routes');

router.use('/locations', locationRoutes);
router.use('/expenditure', expenditureRoutes);
router.use('/stop', stopRoutes);
router.use('/user', userRoutes);
router.use('/trip', tripRoutes);

module.exports = router;
