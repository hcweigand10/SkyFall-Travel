const router = require('express').Router();
<<<<<<< HEAD

const tripRoutes = require('./trip-routes');


=======
const tripRoutes = require('./trip-routes');
const userRoutes = require('./user-routes');

router.use('/users', userRoutes);
>>>>>>> dev
router.use('/trip', tripRoutes);

module.exports = router;
