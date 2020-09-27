const express = require('express');
const router  = express.Router();
const emoji   = require('../middleware/emoji.js');
const post    = require('../middleware/post.js');
const channel = require('../middleware/channel.js');
const conversations = require('../middleware/conversations.js');
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
  await emoji.router(req.body.event);
});

//Channel =====================
router.post('/', async (req, res, next) => {
  if(req.body.event.type != 'channel_created') next();
  await channel.add(req.body.event);
});

//Emoji-ranking ================
router.get('/rank', async(req, res, next) => {
  const channels = await channel.get(token);
  console.log(channels)

  const oldest = new Date(2020, 9, 7, 0, 0, 0)
  const latest= new Date(2020,09,07,23,59,59)
  const history = await conversations.fetchConversationLog("CL75M09FS", latest.getTime(), oldest.getTime());
  /*
  for(let channel of channels.channels){
    conversations.fetchConversationLog(channel.id)
  }
  */
  res.send(history.messages);
})

module.exports = router;
