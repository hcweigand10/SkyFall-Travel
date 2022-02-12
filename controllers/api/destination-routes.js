const router = require('express').Router();
const { Destination, Trip } = require('../../models/');
const withAuth = require('../../utils/auth');

  // be able to update
  
  // be able to delete

// be able to create
router.post('/', withAuth, async(req, res) => {
    const body = req.body; 
    try {
        const newDestination = await Destination.create({...body});
        console.log(newDestination);
        req.json(newDestination)
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
        const [affectedRows] = await Destination.update(req.body, {
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
        let destinationPrice = 0;
        await Destination.findOne({where: {id : req.params.id}
        }).then(destination => {
            destination = destination.get({ plain: true });
            destinationPrice = destination['budget'];
        });
        await Trip.findOne({where: {id : req.params.tripId}
        }).then(trip => {
            console.log(trip['budget']);
            trip = trip.get({ plain: true });
            trip['budget'] = (trip['budget'] - parseFloat(destinationPrice));
            console.log(trip['budget']);

        });
        await Destination.destroy( {
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