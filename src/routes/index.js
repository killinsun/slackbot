const express = require('express');
const router  = express.Router();
const Post    = require('../middleware/post.js');
const Emoji   = require('../middleware/emoji.js');
const Conversations = require('../middleware/conversations.js');
const ReactionRanking= require('../middleware/reactionRanking.js');
const { channels } = require('slack');

const token   = process.env.SLACK_BOT_TOKEN;


/* GET home page. */
router.get('/', (req, res, next) => {
  res.render('index', { title: 'Express' });
});

router.post('/', async (req, res, next) => {
  res.setHeader('Content-Type', 'text/plain');
  res.send(req.body.challenge);
  console.log(req.body);
  next();
});

//Emoji ========================
router.post('/', async (req, res, next) => {
  if(req.body.event.type != 'emoji_changed' ) next();
  await Emoji.router(req.body.event);
});

//Conversations(Channel) =====================
router.post('/', async (req, res, next) => {
  if(req.body.event.type != 'channel_created') next();
  await Conversations.onCreated(req.body.event);
});

module.exports = router;
