const config = require('../../config.js');
const post   = require('../../middleware/post.js');

const token   = config.config.slackbot_token;
const channel = config.config.channel;

const testparam = {
  'token'    : token,
  'channel'  : channel,
  'text'     : 'Post from Jest'
}


test('channel post test', async () => {
  expect(await post.post(
      testparam.token, 
      testparam.channel, 
      testparam.text)
  ).toHaveProperty('ok',true);
});


