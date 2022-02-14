const router = require('express').Router();
const { Stop, Trip } = require('../../models');
const withAuth = require('../../utils/auth');

  // be able to update
  
  // be able to delete

// be able to create
router.post('/new', withAuth, async(req, res) => {
    const body = req.body; 
    try {
        const newStop = await Stop.create({...body});
        let tripPrice = parseInt(req.body.budget);
        const tripId = req.body.tripId;
        console.log("tripId:  ======================================  ");
        console.log(tripId);
        let foundTrip = await Trip.findOne({where: {id : tripId}
        })
        foundTrip = foundTrip.get({ plain: true });
        tripPrice += parseInt(foundTrip['budget']);
        console.log(tripPrice);
        await Trip.update(
            {budget: tripPrice},
            {where: {id : tripId}
        });
        res.json(newStop)
    } catch(err) {
        console.log(err); 
        res.status(500).json(err);
    }

});

// be able to update
// use hidden variable
// route might be off since we are editing on the page itself
router.put('/:id', async (req, res) => {
    try{
        const [affectedRows] = await Stop.update(req.body, {
            where: {
                id: req.params.id,
            }
        }); 
        
        if (affectedRows > 0) {
            res.status(200).end();
        } else {
            res.status(404).end();
        }
    } catch(err) {
        console.log(err); 
        res.status(500).json(err);
    }
})
// be able to delete
router.delete('/:id/:tripId', async (req, res) => {
    try{
        let tripPrice = 0;
        await Trip.findOne({where: {id : req.params.tripId}
        }).then(Trip => {
            Trip = Trip.get({ plain: true });
            tripPrice = Trip['budget'];
        });
        await Stop.findOne({where: {id : req.params.id}
        }).then(stop => {
            stop = stop.get({ plain: true });
            tripPrice -= stop['budget'];
        });
        await Trip.update(
            {budget: tripPrice},
            {where: {id : req.params.tripId}
        });
        await Stop.destroy( {
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