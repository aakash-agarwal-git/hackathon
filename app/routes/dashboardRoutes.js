const express = require("express");
const dashboardController = require("../controllers/dashboardController");
const { validate } = require("../middleware/validation");
const { news } = require("../validation/dashboard");

const router = express.Router();

router.post("/news", validate(news), dashboardController.findNews);
router.get("/youtube-shorts", dashboardController.findYoutubeShorts);

module.exports = router;
