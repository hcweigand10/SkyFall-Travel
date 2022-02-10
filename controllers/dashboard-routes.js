const router = require('express').Router();
const { User, Trip, Destination, Expenditure } = require('../models/');
const withAuth = require('../utils/auth');


// display all the trips that the user has created and their destinations
router.get('/user/:id', async (req, res) => {
    try {
        const userData = await User.findByPk(req.params.id, {
            include: [Trip]
        });
        const userRaw = userData.get({ plain: true });
        console.log(userRaw);
        res.render('userDashboard', {
            layout: 'dashboard',
            User: userRaw
        });
    } catch(err) {
        console.log(err); 
        res.status(500).json(err);
    }
})

router.get('/trip/:id', async (req, res) => {
    try {
        const tripData = await Trip.findByPk(req.params.id, {
            include: [Destination], 
            layout: 'dashboard'
        })


        // need to get for each desitantion the expenditures and get the total cost that the user is going to use for the trip

        const rawTrip = await tripData.get({plain: true});

        console.log(rawTrip);
        res.render('tripView', {TripData: rawTrip})
    } catch(err) {
        console.log(err); 
        res.status(500).json(err);
    }
});

// need to render expenditures based on destination that the user desires to go to 


module.exports = router;

