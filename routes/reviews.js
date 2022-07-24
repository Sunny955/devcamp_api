const express = require("express");
const { getReviews } = require("../controllers/reviews");

const Review = require("../models/Review");

// Loading middlewares
const advancedResults = require("../middleware/advanceResults");
const { protect, authorize } = require("../middleware/auth");

const router = express.Router({ mergeParams: true });

router.route("/").get(
  advancedResults(Review, {
    path: "bootcamp",
    select: "name description",
  }),
  getReviews
);

module.exports = router;
