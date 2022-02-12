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

router.delete("/:id", withAuth, async (req, res) => {
    console.log('in Delete');
    console.log(req.params.id);
  try {
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