const router = require('express').Router();
const { Trip } = require('../../models/');
const withAuth = require('../../utils/auth');

// be able to create a trip
router.post('/', async(req,res) => {
    const body = req.body;

    try {
        const newTrip = await Trip.create({...body, userId: req.session.userId });
        res.json(newTrip);
    } catch(err) {
        res.status(500).json(err);
    }
})

// be able to edit a trip
router.put('/:id', withAuth, (req, res) => {
    try{
        const [affectedRows ] = await Trip.update(req.body, {
            where: {
                id: req.params.id
            }
        });

        if (affectedRows > 0) {
            res.status(200).end();
        } else {
            res.status(404).end();
        }
    } catch (err) {
        res.status(500).json(err);
    }
});

// be able to delete a trip which will end up deleting all the information associated with it.

module.exports = router;