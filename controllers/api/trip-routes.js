const router = require('express').Router();
const { Destination, Expenditure, Trip } = require('../../models/');
const withAuth = require('../../utils/auth');
 

router.post('/', async (req, res) => {
  try {

    let expenditure = [];
    let budget = 0;
    if (req.body.flight_price){
      budget += parseInt(req.body.flight_price);
    } if (req.body.food_price){
      budget += parseInt(req.body.food_price);
    } if(req.body.lodging_price){
      budget += parseInt(req.body.lodging_price);
    } 
      const createdExpenditurePromise = req.body.extra_expenditure.map(element => {
        budget += parseInt(element['price']);
        return Expenditure.create({
          ...element
        });
      });

      expenditure = await Promise.all(createdExpenditurePromise);

    const newDestination = await Destination.create({
      name: req.body.destination_name,
      date_arrived: req.body.date_arrival,
      date_leaving: req.body.date_leaving,
      budget
    });
    const newTrip = await Trip.create({
      name: req.body.name,
      date_arrived: req.body.date_arrival,
      date_leaving: req.body.date_leaving,
      budget
    });
    const newlyCreated = {
      newTrip,
      newDestination,
      expenditure
    }
    res.json(newlyCreated);
  } catch (err) {
    res.status(500).json(err);

  }
});




  module.exports = router;
