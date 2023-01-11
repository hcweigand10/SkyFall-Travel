const router = require('express').Router();
const { Locations } = require('../models/');
const withAuth = require('../utils/auth');

router.get('/', async (req, res) => {
    const locationData = await Locations.findAll();
    console.log(locationData);
    const locationsRaw = await locationData.map(location => location.get({ plain: true }));
    console.log(locationsRaw, "testing location call");
    try {
        res.render('homepage', {
            User:req.session.user, 
            locationData:locationsRaw
        })
    } catch(err) {
        console.log(err);
        res.status(500).json(err)
    }
    
});

router.get('dashboard/user/:id', withAuth, async (req, res) => {
    // add withAuth later
    try {
        res.render('userDashboard', {
            layout: 'dashboard'
        });
    } catch(err) {
        console.log(err); 
        res.status(500).json(err);
    }
})

router.get("/signup", (req, res) => {
    console.log(req.session.user);
    if (req.session.user) {
        res.redirect('/dashboard');
        return;
    } 
    res.render('signup');
})

router.get('/login', (req, res) => {
    res.render('login');
})

router.get("/about-us", (req, res) => {
    res.render('aboutUs', {
        layout: "dashboard",
        User: req.session.user
    });
})

router.get('/404', (req, res) => {
    res.render('404', {
        layout: '404page'
    });
})

router.get('/contact', (req, res) => {
    res.render('contact');
})



module.exports = router;