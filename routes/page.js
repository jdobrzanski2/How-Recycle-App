const express = require("express");

const router = express.Router();

router.use((req, res, next) => {
  // res.locals.user = req.user;
  res.locals.user = null;
  res.locals.followerCount = 0;
  res.locals.followingCount = 0;
  res.locals.followerIds = [];
  next();
});

router.get("/index", (req, res) => {
  res.render("index");
});

router.get("/aboutUs", (req, res) => {
  res.render("aboutUs");
});

router.get("/details_page", (req, res) => {
  res.render("details_page");
});

router.get("/help", (req, res) => {
  res.render("help");
});

router.get("/login", (req, res) => {
  res.render("login");
});

router.get("/map", (req, res) => {
  res.render("map");
});

router.get("/menu", (req, res) => {
  res.render("menu");
});

router.get("/news", (req, res) => {
  res.render("news");
});

router.get("/refundCalc", (req, res) => {
  res.render("refundCalc");
});

router.get("/searchHome", (req, res) => {
  res.render("searchHome");
});

router.get("/user", (req, res) => {
  res.render("user");
});

module.exports = router;
