const router = require('express').Router();
const { Expenditure } = require('../../models');
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
// be able to update

// be able to delete

module.exports = router;