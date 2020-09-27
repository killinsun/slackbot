# Slackbot


## Feature

- Handle new Emoji added event and post message to specify channel.
- Handle new Channel added event and post message to specify channel.

## How to use

1. Clone this repository

2. Add environment file under name '.env' and refer below.
```:/.env
TARGET_ENV = production

```

3. Add config file under name 'config.json' and refer below.
```javascript:config.js
const dotenv = require('dotenv');
dotenv.config();

const setConfig = {
  production  : {
    slack_token: '{{ Your slack token on production }}',
    slackbot_token   : '{{ Your slackbot token on production }}',
    channel       : '{{ Specify channel name }}'
  },
  development : {
    slack_token: '{{ Your slack token on development }}',
    slackbot_token   : '{{ Your slackbot token on development }}',
    channel       : '{{ Specify channel name }}'
  }
}

exports.config = setConfig[process.env.TARGET_ENV];

```


4. Writing some code and test code.

5. Do test code by jest

5. Push to your repo. 

## Deploy


## TODO

