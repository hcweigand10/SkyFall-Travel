const router = require("express").Router();
const { Destination, Expenditure, Trip } = require("../../models/");
const withAuth = require("../../utils/auth");

// router.post("/", withAuth, async (req, res) => {
//   try {
//     let expenditure = [];
//     let budget = 0;
//     if (req.body.flight_price) {
//       budget += parseInt(req.body.flight_price);
//     }
//     if (req.body.food_price) {
//       budget += parseInt(req.body.food_price);
//     }
//     if (req.body.lodging_price) {
//       budget += parseInt(req.body.lodging_price);
//     }
//     const createdExpenditurePromise = req.body.extra_expenditure.map(
//       (element) => {
//         budget += parseInt(element["price"]);
//         return Expenditure.create({
//           ...element,
//         });
//       }
//     );

//     expenditure = await Promise.all(createdExpenditurePromise);

//     const newTrip = await Trip.create({
//       name: req.body.name,
//       date_arrived: req.body.date_arrival,
//       date_leaving: req.body.date_leaving,
//       budget: budget,
//       userId: req.session.user.id,
//     });
//     const newDestination = await Destination.create({
//       name: req.body.destination_name,
//       date_arrived: req.body.date_arrival,
//       date_leaving: req.body.date_leaving,
//       budget: budget,
//       tripId: newTrip.id
//     });
//     const newlyCreated = {
//       newTrip,
//       newDestination,
//       expenditure,
//     };
//     res.json(newlyCreated);
//   } catch (err) {
//     res.status(500).json(err);
//   }
// });

router.post("/new", withAuth, async (req, res) => {
    console.log("new trip attempt")
    try {  
      const newTrip = await Trip.create({
        name: req.body.name,
        date_arrived: req.body.date_arrival,
        date_leaving: req.body.date_leaving,
        budget: req.body.budget,
        userId: req.session.user.id,
      });
      for (let i = 0; i < req.body.destinations.length; i++) {
        const newDestination = await Destination.create({
          name: req.body.destinations[i].name,
          date_arrived: req.body.destinations[i].date_arrived,
          date_leaving: req.body.destinations[i].date_leaving,
          budget: req.body.destinations[i].budget,
          tripId: newTrip.id
        });
      };
      const tripRaw = newTrip.get({plain:true})
      console.log(tripRaw)
      res.json(tripRaw);
    } catch (err) {
      res.status(500).json(err);
      console.log(err)
    }
  });

module.exports = router;
