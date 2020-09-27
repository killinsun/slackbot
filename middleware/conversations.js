'use strict';
const post    = require('./post.js');
const config  = require('../config.js');
const Slack = require('slack');
const slack = Slack();

const token   = config.config.slack_token;
const channel = config.config.channel;

exports = module.exports.fetchConversationLog = fetchConversationLog

async function fetchConversationLog(channnelId, latest, oldest) {
  try {
    console.log(`latest: ${latest} oldest: ${oldest}`)
    const result = await slack.conversations.history({
      channel: channnelId,
      token: token,
      latest: latest,
      oldest: oldest
    })
    console.log(result)
    return result
  }catch(e){
    console.error(e)
  }
}

