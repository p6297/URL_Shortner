const express = require("express");
const {GenerateNewShortId,GetAnalytics} = require("../controllers/UrlController");

const router = express.Router();


router.post("/",GenerateNewShortId);

router.get("/analytics/:shortId",GetAnalytics);




module.exports = router;