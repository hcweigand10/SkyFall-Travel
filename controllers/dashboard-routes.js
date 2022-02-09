const router = require('express').Router();
const { Trip } = require('../models/');
const withAuth = require('../utils/auth');


// display all the trips that the user has created and their destinations
router.get('/', withAuth, async(req, res) => {
    try{
        const tripData = await Trip.findAll({
            where: {
                userId: req.session.userId, 
            }, 
            include: [Destination]
        });

        const rawTrip = tripData.map((trip) => trip.get({ plain: true }));

        res.render('dashboard', {Trips: rawTrip})
    } catch(err) {
        res.redirect('login');
    }

});


module.exports = router;

