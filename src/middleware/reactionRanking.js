'use strict';
const Conversations = require('./conversations.js');
const post    = require('./post.js');
const config  = require('../config.js');

const token   = config.config.slack_token;
const channel = config.config.channel;

async function makeReactionRanking(oldest, latest){

  const allReactionsMap = []

  // Get all channel.
  const conversations = await Conversations.fetchConversations()
  let counter = 0
  for(let channel of conversations) {
    counter += 1

    // Get all conversation of channel
    const messages = await Conversations.fetchConversationLog(channel.id , oldest, latest)
    console.log(`${counter} / ${conversations.length}`)
    console.log(messages.length)
    for(let message of messages){

      // Get all reaction of conversation
      if(message.reactions == undefined) continue;
      for(let reaction of message.reactions){
        const index = allReactionsMap.findIndex( (item) => 
          item.name === reaction.name 
        )

        if(index === -1){
          allReactionsMap.push({name: reaction.name, count: reaction.count})
        } else {
          allReactionsMap[index].count += reaction.count
        }
      }
    }
  }
  allReactionsMap.sort(function(a, b){
    return ( a.count > b.count ) ? -1: 1
  })
  console.log(allReactionsMap)

  return allReactionsMap
}

async function makePostMessage(allReactionsMap){

  let msg = "Weekly reaction ranking on this slack workspace! \n "

  let count = 0
  for(let reaction of allReactionsMap) {
    if(count > 4) {
      msg += "\n"
      count = 0
    }
    msg += `  :${reaction.name}: :${reaction.count}`
    count += 1
  }

  console.log(msg)
  await post.post(token, channel, msg);
  return msg
}

exports = module.exports.makeReactionRanking  = makeReactionRanking
exports = module.exports.makePostMessage      = makePostMessage