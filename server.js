// Dependencies
const express = require("express");
const expressHandlebars = require("express-handlebars");
const session = require("express-session");
const path = require("path");

const controllers = require("./controllers");
const handlebars = expressHandlebars.create({ });
const helpers = require("./utils/helpers");


// Set up express and PORT
const app = express(); 
const PORT = process.env.PORT || 3001;

const SequelizeStore = require("connect-session-sequelize")(session.Store);
const sequelize = require("./config/connection");

// Set up sessions
const sezion = {
    secret: "Secret key here",
    cookie: {
        maxAge: 14400000,
    },
    resave: false,
    saveUninitialized: false,
    store: new SequelizeStore({
        db: sequelize,
    }),
};
app.use(session(sezion));

//setup handlebars w/ express
app.engine("handlebars", handlebars.engine);
app.set("view engine", "handlebars");

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));
app.use(controllers);

sequelize.sync({ force: false }).then(() => {
    //What's wrong here?
    
    app.listen(PORT, () => console.log("Now listening: " + PORT));
});
