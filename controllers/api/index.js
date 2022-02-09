const router = require('express').Router();

const tripRoutes = require('./trip-routes');


router.use('/trip', tripRoutes);

module.exports = router;
