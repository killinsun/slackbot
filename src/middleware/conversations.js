'use strict';
const post    = require('./post.js');
const config  = require('../config.js');

const user_token   = config.config.slack_token;

const slack_bot_token   = config.config.slackbot_token;
const channel           = config.config.channel;
const signinSecret      = config.config.signinSecret;

const { App, LogLevel } = require('@slack/bolt');

const app = new App({
  token: slack_bot_token,
  signingSecret: signinSecret,
  logLevel: LogLevel.DEBUG
})


async function onCreated(evt) {
  const text   = 'New channel created -> : #' + 
    evt.channel.name + 
      ' , (@' + 
    evt.channel.creator +
      ')';
  await post.post(user_token, channel, text);
  return 

}

async function fetchConversations() {
  try {
    const result = await app.client.conversations.list({
      token: slack_bot_token
    })
    return result
  }catch(e){
    console.error(e)
    console.error(e.data.response_metadata)
  }

}

async function fetchConversationLog(channelId, latest, oldest) {
  try {
    const result = await app.client.conversations.history({
      token: user_token,
      channel: channelId,
      oldest: '1598886000'	
    })
    console.log(result)
    return result
  }catch(e){
    console.error(e)
  }
}


exports = module.exports.fetchConversationLog = fetchConversationLog
exports = module.exports.fetchConversations = fetchConversations
exports = module.exports.onCreated = onCreated