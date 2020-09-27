const config = require('../../config.js');
const emoji  = require('../../middleware/emoji.js');

const testparam = {
  'type': 'emoji_changed',
  'subtype': 'add',
  'name': 'slackbot_test',
  'value': null,
  'event_ts' : '1361482916.000004'
}

console.log(config);
console.log(testparam);


test('routing emoji add', async () => {
  expect(await emoji.router(testparam)).toBe('call successfull');
});



