const router = require("express").Router();
const { Stop, Expenditure, Trip } = require("../../models/");
const withAuth = require("../../utils/auth");

router.post("/", withAuth, async (req, res) => {
  console.log("new trip attempt");
  console.log(req.body);

  try {
    const newTrip = await Trip.create({
      name: req.body.name,
      start_date: req.body.start_date,
      end_date: req.body.end_date,
      budget: req.body.budget,
      userId: req.session.user.id,
    });
    for (let i = 0; i < req.body.stops.length; i++) {
      const newStop = await Stop.create({
        name: req.body.stops[i].name,
        start_date: req.body.stops[i].start_date,
        end_date: req.body.stops[i].end_date,
        budget: req.body.stops[i].budget,
        tripId: newTrip.id,
      });
      const newExpenditure = await Expenditure.create({
        accomodation: req.body.stopBreakdowns[i].accomodation,
        travel_costs: req.body.stopBreakdowns[i].travel_costs,
        food_entertainment: req.body.stopBreakdowns[i].food_entertainment,
        other: req.body.stopBreakdowns[i].other,
        stopId: newStop.id,
      });
    }
    const tripRaw = newTrip.get({ plain: true });
    console.log(tripRaw);
    res.json(tripRaw);
  } catch (err) {
    res.status(500).json(err);
    console.log(err);
  }
});

router.put("/:id", withAuth, async (req, res) => {
  console.log("update trip attempt");
  console.log(req.body);
  try {
    const tripped = await Trip.findByPk(req.params.id, {
      include: [Stop],
    });
    const oldTrip = await Trip.update(
      {
        name: req.body.name,
        start_date: req.body.start_date,
        end_date: req.body.end_date,
        budget: req.body.budget,
      },
      {
        where: {
          id: req.params.id,
        },
      }
    );

    [1,2,3]
    const trippedRaw = tripped.get({ plain: true });
    console.log(trippedRaw);
    for (let i = 0; i < req.body.stops.length; i++) {
      const stop = await Stop.findByPk(trippedRaw.Stops[i].id, {
        include: [Expenditure],
      });
      const stopRaw = stop.get({ plain: true });
      const oldStop = await Stop.update(
        {
          name: req.body.stops[i].name,
          start_date: req.body.stops[i].start_date,
          end_date: req.body.stops[i].end_date,
          budget: req.body.stops[i].budget,
        },
        {
          where: {
            id: trippedRaw.Stops[i].id,
          },
        }
      );
      const updatedExpenditure = await Expenditure.update(
        {
          accomodation: req.body.stopBreakdowns[i].accomodation,
          travel_costs: req.body.stopBreakdowns[i].travel_costs,
          food_entertainment: req.body.stopBreakdowns[i].food_entertainment,
          other: req.body.stopBreakdowns[i].other,
        },
        {
          where: {
            id: stopRaw.Expenditure.id,
          },
        }
      );
    }
    res.status(200).send('Updated');
  } catch (err) {
    res.status(500).json(err);
    console.log(err);
  }
});
// be able to delete
router.delete("/:id", async (req, res) => {
  try {
    await Trip.destroy({
      where: {
        id: req.params.id,
      },
    });
    res.json();
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});
module.exports = router;
