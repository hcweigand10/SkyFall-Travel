const router = require('express').Router();
const { Destination, Expenditure, Trip } = require('../../models/');
const withAuth = require('../../utils/auth');


router.post('/', withAuth, async (req, res) => {
    try {
      const newTrip = await Destination.create({
        ...req.body,
        userId: req.session.userId,
      });
      res.json(newComment);
    } catch (err) {
      res.status(500).json(err);
    }
  });
  
  module.exports = router;