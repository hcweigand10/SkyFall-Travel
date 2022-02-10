const router = require('express').Router();
const { User, Trip } = require('../models/');


router.get('/', async (req, res) => {
    console.log(req.session)
    try {
        res.render('homepage', {
            User:req.session.user
        })
    } catch(err) {
        console.log(err);
        res.status(500).json(err)
    }
    
});

router.get('dashboard/user/:id', async (req, res) => {
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

router.get("/login", (req, res) => {
    console.log(req.session.user);
    if (req.session.user) {
        res.redirect('/dashboard');
        return;
    }
    res.render('loginSignup');
})


module.exports = router;