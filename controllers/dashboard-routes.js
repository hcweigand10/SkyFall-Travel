const router = require("express").Router();
const { User, Trip, Stop, Expenditure } = require("../models/");
const withAuth = require("../utils/auth");

// display all the trips that the user has created and their stops
router.get("/", withAuth, async (req, res) => {
  try {
    const userData = await User.findByPk(req.session.user.id, {
      include: [Trip],
    });
    const tripData = await Trip.findAll({
      include: [Stop],
      where: {
        userId: req.session.user.id,
      },
    });
    const userRaw = userData.get({ plain: true });

    res.render("userDashboard", {
      layout: "dashboard",
      userData: userRaw,
      User: req.session.user,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

// create trip
router.get("/trip/new", withAuth, async (req, res) => {
  try {
    res.render("createTrip", {
      layout: "dashboard",
      User: req.session.user,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

// create new stop
router.get("/trip/:id/new", withAuth, (req, res) => {
  res.render("newStop", {
    layout: "dashboard",
    TripId: req.params.id,
    User: req.session.user,
  });
});

// create new expenditure
router.get("/trip/:id/stop/:id2/new", withAuth, (req, res) => {
  res.render("newExpenditure", {
    layout: "dashboard",
    TripId: req.params.id,
    StopId: req.params.id2,
    User: req.session.user,
  });
});

router.get("/trip/:id", withAuth, async (req, res) => {
  try {
    const trip = await Trip.findOne({
      where: {
        id: req.params.id,
      },
      include: [Stop],
    });

    const rawTrip = await trip.get({ plain: true });
      

      // gets id of the first stop that is on the page
      const stopData = await Expenditure.findAll({
        where: {
          stopId: rawTrip.Stops[0].id
        }
      })

      
    if (trip != null && trip.userId == req.session.user.id) {
      const rawExpenditureData = await stopData.map((expen) => expen.get({ plain: true }));
      // need to get for each desitantion the expenditures and get the total cost that the user is going to use for the trip
      console.log(rawExpenditureData[0].event_type)
      res.render("tripView", {
        layout: "dashboard",
        TripData: rawTrip,
        User: req.session.user,
        Expenditure1: rawExpenditureData,
      });
    } else {
      res.render("modalError", {
        layout: "dashboard",
        User: req.session.user,
        text: "This isn't your trip!"
      })
    }
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

router.get("/trip/:id/stop/:id2", async (req, res) => {
  try {
    const tripData = await Trip.findByPk(req.params.id);
    const stopData = await Stop.findByPk(req.params.id2, {
      include: [Expenditure],
    });

    const expenditureData = await Expenditure.findAll({
      where: {
        stopId: req.params.id2,
      },
    });

    const tripRaw = tripData.get({ plain: true });
    const stopRaw = stopData.get({ plain: true });
    const expenditureRaw = expenditureData.map((expenditure) =>
      expenditure.get({ plain: true })
    );

    res.render("stopView", {
      layout: "dashboard",
      trip: tripRaw,
      stop: stopRaw,
      expenditure: expenditureRaw,
      User: req.session.user,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

router.get("/trip/:id/stop/:id2/expenditure/:id3", async (req, res) => {
  try {
    const expenditureData = await Expenditure.findByPk(req.params.id3);

    const stopData = await Stop.findByPk(req.params.id2);

    const stopRaw = stopData.get({ plain: true });
    const expenditureRaw = expenditureData.get({ plain: true });

    res.render("stopView", {
      layout: "dashboard",
      stop: stopRaw,
      expenditure: expenditureRaw,
      loggedInUser: req.session.user,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

// need to render expenditures based on stop that the user desires to go to

module.exports = router;
