const Line = require('../../db/models/line');
const axios = require('axios');
const router = require('express').Router();
const Twitter = require('twitter');
const client = new Twitter({
  consumer_key: process.env.TWITTER_API_KEY,
  consumer_secret: process.env.TWITTER_API_SECRET,
  bearer_token: process.env.TWITTER_BEARER_TOKEN
});

router.use(async (req, res, next) => {
  try {
    const lines = await Line.findAll({
      order: [['id', 'ASC']]
    });

    const currentTime = new Date();
    const fourMinsInMs = 240000;
    const timeDifference = currentTime - lines[0].dataValues.updatedAt;

    if (timeDifference > fourMinsInMs) await fetchTwitter(lines);

    next();
  } catch (err) {
    next(err);
  }
});

async function fetchTwitter(lines) {
  const fifteenMins = 900000; //15 minutes in ms
  const thirtyMins = 2 * fifteenMins;
  const oneHour = 2 * thirtyMins;

  for (const line of lines) {
    let fifteenCounter = 0;
    let thirtyCounter = 0;
    let hourCounter = 0;

    await client.get(
      'search/tweets',
      {
        q: `"${line.name} train" to:nyctsubway OR "${line.name} train" #CuomosMTA OR ${line.name}`,
        result_type: 'recent',
        count: '100'
      },
      async function(error, tweets, response) {
        if (error) console.log(error);

        if (tweets) {
          for (const tweet of tweets.statuses) {
            const currentTime = new Date();
            const createdAt = new Date(tweet.created_at);
            const timeSinceTweet = Math.abs(createdAt - currentTime);
      
            if (timeSinceTweet < fifteenMins) fifteenCounter++;
            if (timeSinceTweet < thirtyMins) thirtyCounter++;
            if (timeSinceTweet < oneHour) hourCounter++;
          }

          await line.update({
            last15: fifteenCounter,
            last30: thirtyCounter,
            lastHour: hourCounter
          });
        }
      }
    );
  }
}

//Only use the following function if Twitter bearer token has been invalidated
async function getToken() {
  const urlEncodedKey = encodeURIComponent(process.env.TWITTER_API_KEY);
  const urlEncodedSecret = encodeURIComponent(process.env.TWITTER_API_SECRET);
  const keySecret = urlEncodedKey + ':' + urlEncodedSecret;
  const base64KeySecret = Buffer.from(keySecret).toString('base64');
  try {
    const res = await axios.post(
      'https://api.twitter.com/oauth2/token',
      'grant_type=client_credentials',
      {
        headers: {
          Authorization: `Basic <${base64KeySecret}>`,
          'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8.'
        }
      }
    );
    const responseToken = res;
    console.log('token from getToken', responseToken);
    return responseToken;
  } catch (err) {
    console.log(err);
  }
}
module.exports = router;
