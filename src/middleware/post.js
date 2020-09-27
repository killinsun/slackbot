'use strict';
const Slack = require('slack');
const slack = Slack();

exports = module.exports.post = post;

async function post(token, channel, text){

  const result = await slack.chat.postMessage({
    token  : token,
    channel: channel,
    text   : text
  });

  console.log(`Successfully send message ${result.ts} `);
  return result
}

