'use strict';
const express = require('express');
const router  = express.Router();
const ReactionRanking= require('../../middleware/reactionRanking.js');
const moment = require('moment')
require('moment-timezone')




const getLastWeekUnixTime = function (req, res, next) {
  moment.tz.setDefault('Asia/Tokyo')
  const date = moment().subtract(7, 'Days').format("YYYY/MM/DD HH:mm:ss")
  
  res.oldest = moment(date).unix()
  next()
  
}

const reactionRank = async function (req, res, next){
  const allReactionsMap = await ReactionRanking.makeReactionRanking(res.oldest, null)
  // await ReactionRanking.makePostMessage(allReactionsMap)
  res.json(allReactionsMap)

}

router.get('/', (req, res, next) => {
  res.send("API Version 0")
})

// Emoji(reaction)-ranking ================
router.get('/reaction_rank', getLastWeekUnixTime, reactionRank)

module.exports = router;