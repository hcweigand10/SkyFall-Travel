const router = require('express').Router();
const { Expenditure, Trip, Destination } = require('../../models');
const withAuth = require('../../utils/auth');

// be able to create
router.post('/', async (req, res) => {
    const body = req.body; 
    try {
        const newExpenditure = await Expenditure.create({...body});
        console.log(newExpenditure);
        res.json(newExpenditure)
    } catch(err) {
        console.log(err); 
        res.status(500).json(err);
    }
});

router.post("/", async (req, res) => {
  try {
    let expenditure = [];
    let budget = 0;
    if (req.body.flight_price) {
      budget += parseInt(req.body.flight_price);
    }
    if (req.body.food_price) {
      budget += parseInt(req.body.food_price);
    }
    if (req.body.lodging_price) {
      budget += parseInt(req.body.lodging_price);
    }
    const createdExpenditurePromise = req.body.extra_expenditure.map(
      (element) => {
        budget += parseInt(element["price"]);
        return Expenditure.create({
          ...element,
        });
      }
    );
    expenditure = await Promise.all(createdExpenditurePromise);

    newlyCreated = {
        expenditure,
    };
    res.json(newlyCreated);
  } catch (err) {
    res.status(500).json(err);
  }
});
// be able to update
// router.post('/', async (req, res) => {
//     const body = req.body; 
//     try {
//         const newExpenditure = await Expenditure.create({...body});
//         console.log(newExpenditure);
//         res.json(newExpenditure)
//     } catch(err) {
//         console.log(err); 
//         res.status(500).json(err);
//     }
// });

router.delete("/:id/:tripId/:destinationId", withAuth, async (req, res) => {
  try {      
    let exPrice = 0;
    await Expenditure.findOne({where: {id : req.params.id}
    }).then(expenditure => {
        expenditure = expenditure.get({ plain: true });
        exPrice = expenditure['price'];
    });
    console.log(exPrice);
    Expenditure.destroy({
        where: {id : req.params.id}
    });
    await Trip.findOne({where: {id : req.params.tripId}
    }).then(trip => {
        trip = trip.get({ plain: true });
        trip['budget'] = (trip['budget'] - parseFloat(exPrice));
    });
    await Destination.findOne({where: {id : req.params.destinationId}
    }).then(destination => {
        destination = destination.get({ plain: true });
        destination['budget'] = (destination['budget'] - parseFloat(exPrice));
    });
    res.json();
  } catch (err) {
    res.status(500).json(err);
  }
});
// be able to delete




module.exports = router;