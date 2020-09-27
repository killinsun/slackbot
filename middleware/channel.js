'use strict';
const post    = require('./post.js');
const config  = require('../config.js');
const Slack = require('slack');
const slack = Slack();

const token   = config.config.slack_token;
const channel = config.config.channel;

exports = module.exports.add = add;
exports = module.exports.get = get;

async function add(evt) {
  const text   = 'New channel created -> : #' + 
    evt.channel.name + 
      ' , (' + 
    evt.channel.creator +
      ')';
  await post.post(token, channel, text);
  return 
}

async function get() {
  try {
    return await slack.conversations.list({
      token: token
    })
  }catch(e){
    console.error(e)
  }
}

