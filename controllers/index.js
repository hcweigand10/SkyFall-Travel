const router = require('express').Router();
const apiRoutes = require('./api');
const homeRoute = require('./home-routes');
const dashboardRoute = require('./dashboard-routes');


router.use('/dashboard', dashboardRoute);
router.use('/', homeRoute);
router.use('/api', apiRoutes);

module.exports = router;
