const router = require('express').Router();
const { Destination } = require('../../models/');
const withAuth = require('../../utils/auth');


// router.post("/", withAuth, async (req, res) => {
//     try {  
//       const newTrip = await Trip.create({
//         name: req.body.name,
//         date_arrived: req.body.date_arrival,
//         date_leaving: req.body.date_leaving,
//         budget: budget,
//         userId: req.session.user.id,
//       });
//       res.json(newTrip);
//     } catch (err) {
//       res.status(500).json(err);
//     }
//   });



  // be able to update
  
  // be able to delete

// be able to create
router.post('/', withAuth, async(req, res) => {
    console.log("sometig");
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

module.exports = router;