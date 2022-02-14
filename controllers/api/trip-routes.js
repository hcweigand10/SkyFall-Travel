const router = require("express").Router();
const { Stop, Expenditure, Trip } = require("../../models/");
const withAuth = require("../../utils/auth");



router.post("/new", withAuth, async (req, res) => {
    console.log("new trip attempt")
    console.log(req.body)
    try {  
      const newTrip = await Trip.create({
        name: req.body.name,
        start_date: req.body.start_date,
        end_date: req.body.end_date,
        budget: req.body.budget,
        userId: req.session.user.id,
      });
      for (let i = 0; i < req.body.stops.length; i++) {
        const newStop = await Stop.create({
          name: req.body.stops[i].name,
          start_date: req.body.stops[i].start_date,
          end_date: req.body.stops[i].end_date,
          budget: req.body.stops[i].budget,
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
// be able to delete
router.delete('/:id', async (req, res) => {
  try{
      await Trip.destroy( {
          where: {
              id: req.params.id,
          }
      });    
      res.json();
  } catch(err) {
      console.log(err); 
      res.status(500).json(err);
  }
})
module.exports = router;
