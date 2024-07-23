const express = require("express");
const { handleGeneratingurl, handlegettingurl, handleNumberOfClicks } = require("../controllers/url");
const router = express.Router();

router.post('/', handleGeneratingurl);
router.get('/:id', handlegettingurl);
router.get('/analyse/:id', handleNumberOfClicks);
module.exports = router;