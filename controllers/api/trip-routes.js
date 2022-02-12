const router = require("express").Router();
const { Destination, Expenditure, Trip } = require("../../models/");
const withAuth = require("../../utils/auth");



router.post("/new", withAuth, async (req, res) => {
    console.log("new trip attempt")
    try {  
      const newTrip = await Trip.create({
        name: req.body.name,
        date_arrived: req.body.date_arrival,
        date_leaving: req.body.date_leaving,
        budget: req.body.budget,
        userId: req.session.user.id,
      });
      for (let i = 0; i < req.body.destinations.length; i++) {
        const newDestination = await Destination.create({
          name: req.body.destinations[i].name,
          date_arrived: req.body.destinations[i].date_arrived,
          date_leaving: req.body.destinations[i].date_leaving,
          budget: req.body.destinations[i].budget,
          tripId: newTrip.id
        });
      };
      const tripRaw = newTrip.get({plain:true})
      console.log(tripRaw)
      res.json(tripRaw);
    } catch (err) {
      res.status(500).json(err);
      console.log(err)
    }
  });

module.exports = router;
