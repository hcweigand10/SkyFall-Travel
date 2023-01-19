const router = require('express').Router();
const { Expenditure, Trip, Stop } = require('../../models');
const withAuth = require('../../utils/auth');

// be able to create
router.post('/:tripId/:stopId', async (req, res) => {
    const body = req.body; 
    try {
        let newExpenditure = await Expenditure.create({...body});
        newExpenditure = newExpenditure.get({ plain: true });

        const exPrice = parseInt(newExpenditure['price']);
        let updateTrip = await Trip.findOne({where: {id : req.params.tripId} });
        let updateStop = await Stop.findOne({where: {id : req.params.stopId} });
        updateStop = updateStop.get({ plain: true });
        updateTrip = updateTrip.get({ plain: true });
        destBudge = parseInt(updateStop['budget']) + exPrice;
        tripBudge = parseInt(updateTrip['budget']) + exPrice;

        await Stop.update( 
          {budget: destBudge},
          {where: {
            id: req.params.stopId,
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

router.delete("/:id/:tripId/:stopId", withAuth, async (req, res) => {
  try {      
    let exPrice = 0;
    await Expenditure.findOne({where: {id : req.params.id}
    }).then(expenditure => {
      expenditure = expenditure.get({ plain: true });
      console.log(expenditure);
      exPrice = expenditure['price'];
    });
    console.log(exPrice);
    let updateTrip = await Trip.findOne({where: {id : req.params.tripId} });
    let updateStop = await Stop.findOne({where: {id : req.params.stopId} });
    console.log('In budget');
    console.log(updateStop);
    updateStop = updateStop.get({ plain: true });
    updateTrip = updateTrip.get({ plain: true });
    stopBudge = updateStop['budget'] - exPrice;
    tripBudge = updateTrip['budget'] - exPrice;

    await Stop.update( 
      {price: stopBudge},
      {where: {
        id: req.params.stopId,
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