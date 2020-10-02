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


/* 
  Event API
*/
async function onCreated(evt) {
  const text   = 'New channel created -> : #' + 
    evt.channel.name + 
      ' , (@' + 
    evt.channel.creator +
      ')';
  await post.post(user_token, channel, text);
  return 

}

/*
  Web API
*/

async function fetchConversations() {
  try {

    let result = await app.client.conversations.list({
      token: slack_bot_token,
      limit: 1000,
    })

    let final_result = []
    final_result = final_result.concat(result.channels)

    while(result.response_metadata.next_cursor != "") {
      result = await app.client.conversations.list({
        token: slack_bot_token,
        limit: 200,
        cursor: result.response_metadata.next_cursor
      })
      console.log(result.channels)
      final_result = final_result.concat(result.channels)
    }
    return final_result

  }catch(e){
    console.error(e)
    console.error(e.data.response_metadata)
  }

}

async function fetchConversationLog(channelId, oldest, latest) {
  try {

    let result = await app.client.conversations.history({
      token: user_token,
      channel: channelId,
      oldest: oldest,
      limit: 1000,
    })

    let final_result = []
    let count = 0
    while(result.response_metadata.next_cursor != "") {
      if(count > 3) break;
      result = result = await app.client.conversations.history({
        token: user_token,
        channel: channelId,
        oldest: oldest,
        limit: 200,
        cursor: result.response_metadata.next_cursor
      })
      final_result = final_result.concat(result.messages)
    }
    return result
    /*
    for(let message of result.messages){
      console.log(message.reactions)
    }
    return result
    */
  }catch(e){
    console.error(e)
  }
}


exports = module.exports.fetchConversationLog = fetchConversationLog
exports = module.exports.fetchConversations = fetchConversations
exports = module.exports.onCreated = onCreated