'use strict';
const post    = require('./post.js');
const config  = require('../config.js');

const token   = config.config.slack_token;
const channel = config.config.channel;

exports = module.exports.add = add;

async function add(evt) {
  const text   = 'New channel created -> : #' + 
    evt.channel.name + 
      ' , (' + 
    evt.channel.creator +
      ')';
  await post.post(token, channel, text);
  return 
}

