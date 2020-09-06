const express = require('express');
const router  = express.Router();
const emoji   = require('../middleware/emoji.js');
const post    = require('../middleware/post.js');
const channel = require('../middleware/channel.js');

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
  await emoji.router(req.body.event);
});

//Channel =====================
router.post('/', async (req, res, next) => {
  if(req.body.event.type != 'channel_created') next();
  await channel.add(req.body.event);
});

//Emoji-ranking ================
router.get('/rank', async(req, res, next) => {
  channels = channel.get(token);
})

module.exports = router;
