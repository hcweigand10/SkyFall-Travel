const router = require('express').Router();
const { Expenditure, Trip, Destination } = require('../../models');
const withAuth = require('../../utils/auth');

// be able to create
router.post('/:tripId/:destinationId', async (req, res) => {
    const body = req.body; 
    try {
        let newExpenditure = await Expenditure.create({...body});
        newExpenditure = newExpenditure.get({ plain: true });

        const exPrice = parseInt(newExpenditure['price']);
        let updateTrip = await Trip.findOne({where: {id : req.params.tripId} });
        let updateDestination = await Destination.findOne({where: {id : req.params.destinationId} });
        updateDestination = updateDestination.get({ plain: true });
        updateTrip = updateTrip.get({ plain: true });
        destBudge = parseInt(updateDestination['budget']) + exPrice;
        tripBudge = parseInt(updateTrip['budget']) + exPrice;

        await Destination.update( 
          {budget: destBudge},
          {where: {
            id: req.params.destinationId,
          }
        }); 
        await Trip.update(
          {budget: tripBudge},
          {where: {id : req.params.tripId}
        });

        res.json(newExpenditure)
    } catch(err) {
        console.log(err); 
        res.status(500).json(err);
    }
});

router.delete("/:id/:tripId/:destinationId", withAuth, async (req, res) => {
  try {      
    let exPrice = 0;
    await Expenditure.findOne({where: {id : req.params.id}
    }).then(expenditure => {
      expenditure = expenditure.get({ plain: true });
      exPrice = expenditure['price'];
    });
    console.log(exPrice);
    const updateTrip = await Trip.findOne({where: {id : req.params.tripId} });
    const updateDestination = await Destination.findOne({where: {id : req.params.tripId} });
    updateDestination = updateDestination.get({ plain: true });
    updateTrip = updateTrip.get({ plain: true });
    destBudge = updateDestination['budget'] - exPrice;
    tripBudge = updateTrip['budget'] - exPrice;
    await Destination.update( 
      {budget: destBudge},
      {where: {
        id: req.params.destinationId,
      }
    }); 
    await Trip.update(
      {budget: tripBudge},
      {where: {id : req.params.tripId}
    });

    Expenditure.destroy({
        where: {id : req.params.id}
    });

    res.json();
  } catch (err) {
    res.status(500).json(err);
  }
});
// be able to delete




module.exports = router;