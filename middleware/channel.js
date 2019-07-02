'use strict';
const post    = require('./post.js');
const token   = process.env.SLACK_BOT_TOKEN;
const channel = process.env.SLACK_CHANNEL;

exports = module.exports.add = add;

async function add(evt) {
  const text   = 'New channel created -> : #' + 
    evt.channel.name + 
      ' , (' + 
    e t.channel.creator +
      ')';
  post.postMessage(token, channel, text);
  return 
}

