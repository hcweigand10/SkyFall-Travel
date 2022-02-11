const router = require('express').Router();
const { Destination } = require('../../models/');
const withAuth = require('../../utils/auth');


router.post("/", withAuth, async (req, res) => {
    try {  
      const newTrip = await Trip.create({
        name: req.body.name,
        date_arrived: req.body.date_arrival,
        date_leaving: req.body.date_leaving,
        budget: budget,
        userId: req.session.user.id,
      });
      res.json(newTrip);
    } catch (err) {
      res.status(500).json(err);
    }
  });



  // be able to update
  
  // be able to delete

module.exports = router;