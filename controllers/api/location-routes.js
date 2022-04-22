const router = require('express').Router();
const { Locations } = require('../../models/');


router.get('/', async (req, res) => {
    try {
      const locations = await Locations.findAll();
      res.json(locations);
    } catch (err) {
      res.status(500).json(err);
    }
  });

  module.exports = router;