const express = require("express");
const session = require("express-session");
const morgan = require("morgan");
const demo = require("./demo");
const passport = require("passport");
const Local = require("passport-local").Strategy;
const bcryptjs = require("bcryptjs");
const { findUserByEmail, createUser, addFavToUser } = require("./db");

const app = express();

app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "http://localhost:3000"); // update to match the domain you will make the request from
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

// common middleware
app.use(morgan("dev"));
app.use(
  session({
    secret: process.env.SECRET,
    saveUninitialized: false,
    resave: false,
  })
);
app.use(express.json());
app.use(passport.initialize());
app.use(passport.session());

const hash = (password) => {
  return bcryptjs.hash(password, 10);
};
const compare = (password, hashed) => {
  return bcryptjs.compare(password, hashed);
};

passport.serializeUser((user, done) => {
  done(null, user.email);
});
passport.deserializeUser((email, done) => {
  done(null, db[email]);
});

passport.use(
  new Local(
    {
      passwordField: "password",
      usernameField: "email",
    },
    async (email, password, done) => {
      if (!email || !password) {
        return done(null, false, { mesasge: "Please, fill in both fields. " });
      }

      //lehet cserélni kell
      const userInDb = await findUserByEmail(email);
      if (userInDb.email !== email) {
        return done(null, false, { mesasge: "Wrong credentials" });
      }

      const result = await compare(password, userInDb.password);

      if (result === true) {
        return done(null, userInDb);
      }
      return done(null, false, { mesasge: "Wrong credentials" });
    }
  )
);

app.post("/api/register", async (req, res, next) => {
  const { email, password } = req.body;
  console.log("req.body:", req.body);

  if (!email || !password) {
    return res.status(400).json({ message: "Missing creds" });
  }
  if (await findUserByEmail(email)) {
    //true, ha a visszatérés nem falsy típus pl null undefined
    return res.status(400).json({ message: "email already exists" });
  }
  const hashed = await hash(password);
  await createUser({ email, password: hashed, favs: [] });
  res.json({ ok: true });
});

app.post("/api/login", passport.authenticate("local"), (req, res, next) => {
  res.json(req.user);
});

app.post("/api/favourites", async (req, res) => {
  console.log("reqBody:", req.body);
  const fav = {
    url: req.body.url,
    tags: req.body.tags,
    id: req.body.id,
  };
  await addFavToUser(req.body.email, fav);
  res.json({ ok: true });
});

module.exports = app;
