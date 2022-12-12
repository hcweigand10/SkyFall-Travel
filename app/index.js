require("dotenv").config();

const path = require("path");
const express = require("express");
const session = require("express-session");
const routes = require("./controllers");
const exphbs = require("express-handlebars");
const cors = require("cors");

const sequelize = require("./config/connection");
const SequelizeStore = require("connect-session-sequelize")(session.Store);

const app = express();

const PORT = process.env.NODE_DOCKER_PORT || 8080;

const hbs = exphbs.create();
const sess = {
  secret: "Super secret secret",
  cookie: { maxAge: 12000000 },
  resave: false,
  saveUninitialized: true,
  store: new SequelizeStore({
    db: sequelize,
  }),
};

app.use(session(sess));

var corsOptions = {
    origin: "http://localhost:8081"
  };

app.use(cors(corsOptions));

// handlebars initialization
app.engine("handlebars", hbs.engine);
app.set("view engine", "handlebars");

// parse requests of content-type - application/json
app.use(express.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

app.use(express.static(path.join(__dirname, "public")));

app.use(routes);

(async () => {
  try {
    await sequelize.sync(
      { force: false } //Reset db every time
    );
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}.`);
    });
  } catch (error) {
    console.log(error);
  }
})();
