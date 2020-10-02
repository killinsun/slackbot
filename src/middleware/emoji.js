'use strict';
const post    = require('./post.js');
const config  = require('../config.js');

const token   = config.config.slack_token;
const channel = config.config.channel;


async function router(evt){

  if(evt.subtype == 'add'){
    await add(evt);
    return 'call successfull'
  }else{
    throw new Error('Could not handlle this request. : ' + evt.subtype);
  }

}

async function add(evt){
  console.log(token);
  const text   = 'Emoji added. -> :' + evt.name + ': (' + evt.name +')';
  await post.post(token, channel, text);

  //This is bad approach. I'll fix later.
  return null
}

exports = module.exports.router = router;
exports = module.exports.add    = add;