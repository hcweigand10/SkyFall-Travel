const router = require('express').Router();
const { Destination, Expenditure, Trip } = require('../../models/');
const withAuth = require('../../utils/auth');


router.post('/new', withAuth, async (req, res) => {
  try {

    let expenditure = [];
    const budget = 0;
    if (req.body.flight_price){
      budget += req.body.flight_price;
    } if (req.body.food_price){
      budget += req.body.food_price;
    } if(req.body.lodging_price){
      budget += req.body.lodging_price;
    } if (req.body.Expenditure && req.body.Expenditure.length > 1) {
      const createdExpenditurePromise = req.body.Expenditure.map(element => {
        budget += element.price;
        return Expenditure.create({
          ...element
        });
      });

      expenditure = await Promise.all(createdExpenditurePromise);
    }
    const newDestination = await Destination.create({
      name: req.body.name,
      date_arrived: req.body.date_arrived,
      date_leaving: req.body.date_leaving,
      budget
    });
    const newTrip = await Trip.create({
      name: req.body.name,
      date_arrived: req.body.date_arrived,
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
