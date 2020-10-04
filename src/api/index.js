'use strict';
const router = require('express').Router();
const v0 = require('./v0/')

router.use('/v0', v0);

/* GET home page. */
router.get('/', (req, res) => {
  res.send("API")
});


module.exports = router;