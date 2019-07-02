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



/*
describe('Check does it work Handling emoji event', () =>{
  it('routing_emoji_add',async () => {
      const result = await emoji.router(testparam);
      assert.equal(result, null);

    return emoji.router(testparam)
    .then(assert.equal(null, null))
  });

  it('routing_emoji_other', async () => {
      testparam.subtype = 'none';
      const result = await emoji.router(testparam);
      assert.equal(result,'Could not handlle this request.'); 
      assert.throws
  });

});
*/
