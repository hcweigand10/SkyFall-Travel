const router = require("express").Router();
const { User, Trip, Destination, Expenditure } = require("../models/");
const withAuth = require("../utils/auth");

// display all the trips that the user has created and their destinations
router.get("/", withAuth, async (req, res) => {
  try {
    const userData = await User.findByPk(req.session.user.id, {
      include: [Trip],
    });
    const tripData = await Trip.findAll({
      include: [Destination],
      where: {
        userId: req.session.user.id,
      },
    });
    const userRaw = userData.get({ plain: true });
    // fix naming fool
    res.render("userDashboard", {
      layout: "dashboard",
      User: userRaw,
      loggedInUser: req.session.user,
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
    });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

// create new destination
router.get("/trip/:id/new", withAuth, (req, res) => {
  res.render("new-destination", {
    layout: "dashboard",
    TripId: req.params.id,
  });
});

// create new expenditure
router.get("/trip/:id/destination/:id2/new", withAuth, (req, res) => {
  res.render("new-expenditure", {
    layout: "dashboard",
    TripId: req.params.id,
    DestinationId: req.params.id2,
  });
});

router.get("/trip/:id", withAuth, async (req, res) => {
  try {
    const trip = await Trip.findOne({
      where: {
        id: req.params.id,
      },
      include: [Destination],
    });
    if (trip.userId == req.session.user.id) {
      // need to get for each desitantion the expenditures and get the total cost that the user is going to use for the trip
      const rawTrip = await trip.get({ plain: true });

      res.render("trip-view", {
        layout: "dashboard",
        TripData: rawTrip,
        loggedInUser: req.session.user,
      });
    } else {
      res.render("modalError", {
        layout: "dashboard",
        text: "This isn't your trip!"
      })
    }
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

router.get("/trip/:id/destination/:id2", async (req, res) => {
  try {
    const tripData = await Trip.findByPk(req.params.id);
    const destinationData = await Destination.findByPk(req.params.id2, {
      include: [Expenditure],
    });

    const expenditureData = await Expenditure.findAll({
      where: {
        destinationId: req.params.id2,
      },
    });

    const tripRaw = tripData.get({ plain: true });
    const destinationRaw = destinationData.get({ plain: true });
    const expenditureRaw = expenditureData.map((expenditure) =>
      expenditure.get({ plain: true })
    );

    console.log(destinationRaw);
    console.log(expenditureRaw);
    res.render("destination-view", {
      layout: "dashboard",
      trip: tripRaw,
      destination: destinationRaw,
      expenditure: expenditureRaw,
      loggedInUser: req.session.user,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

router.get("/trip/:id/destination/:id2/expenditure/:id3", async (req, res) => {
  try {
    const expenditureData = await Expenditure.findByPk(req.params.id3);

    const destinationData = await Destination.findByPk(req.params.id2);

    const destinationRaw = destinationData.get({ plain: true });
    const expenditureRaw = expenditureData.get({ plain: true });

    console.log(destinationRaw);
    console.log(expenditureRaw);

    res.render("destination-view", {
      layout: "dashboard",
      destination: destinationRaw,
      expenditure: expenditureRaw,
      loggedInUser: req.session.user,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

// need to render expenditures based on destination that the user desires to go to

module.exports = router;
