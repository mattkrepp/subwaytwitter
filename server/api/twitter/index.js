const Line = require('../../db/models/line');
const axios = require('axios');
const router = require('express').Router();
const Twitter = require('twitter');

router.use(async (req, res, next) => {
  try {
    const lines = await Line.findAll({
      order: [['id', 'ASC']]
    })
    // console.log("lines", lines);
    const currentTime = new Date()
    const fourMinsInMs = 240000
    const timeDifference = currentTime - lines[0].dataValues.updatedAt
    console.log('Current Time: ', currentTime)
    console.log('Updated Time: ', lines[0].dataValues.updatedAt)
    console.log('Time Difference in minutes: ', timeDifference / 60000)
    if (timeDifference > fourMinsInMs) {
      console.log('hit it')
      fetchTwitter(lines)
    }
    next()
  } catch (err) {
    next(err)
  }
})

async function fetchTwitter(lines) {
  let token = await getToken();
  console.log(token);
  try {
    var client = new Twitter({
      consumer_key: process.env.TWITTER_API_KEY,
      consumer_secret: process.env.TWITTER_API_SECRET,
      bearer_token: process.env.TWITTER_BEARER_TOKEN
    });
    // for (const line of lines) {
    //   const twitterResponse = await axios.get(
    //     `https://api.twitter.com/1.1/search/tweets.json?q=${line.name}%20train%20to%3A%40nyctsubway&result_type=recent`,
    //     {
    //       headers: {
    //         'Authorization': `Bearer <${token}>`,
    //         'Accept-Encoding': 'gzip'
    //       },
    //     }
    //   );
    //   console.log("twitter response: ", twitterResponse);
    // }
  } 
  catch (err) {
    console.log(err);
    console.log("dickbutt");
    console.log(err.response.data)
  }
}

async function getToken() {
  const urlEncodedKey = encodeURIComponent(process.env.TWITTER_API_KEY)
  const urlEncodedSecret = encodeURIComponent(process.env.TWITTER_API_SECRET)
  const keySecret = urlEncodedKey + ':' + urlEncodedSecret
  const base64KeySecret = Buffer.from(keySecret).toString('base64')
  try {
    const res = await axios.post(
      'https://api.twitter.com/oauth2/invalidate_token', {'access_token': 'AAAAAAAAAAAAAAAAAAAAAPQi8gAAAAAA9PVDEr10erCYxC6Qt%2FBO%2BDb7xcc%3DGCSInu8sPZ4cY3V1h6y6l4hnwcg7itiql4UdyB5OwCThUKudha'}
    );
    // const res = await axios.post(
    //   'https://api.twitter.com/oauth2/token',
    //   'grant_type=client_credentials',
    //   {
    //     headers: {
    //       'Authorization': `Basic <${base64KeySecret}>`,
    //       'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8.'
    //     }
    //   }
    // );
    const responseToken = res;
    console.log("token from getToken", responseToken);
    return responseToken;
  } catch (err) {
    console.log(err);
  }
}
module.exports = router;

// --header 'authorization: OAuth oauth_consumer_key="consumer-key-for-app",
// oauth_nonce="generated-nonce", oauth_signature="generated-signature",
// oauth_signature_method="HMAC-SHA1", oauth_timestamp="generated-timestamp",
// oauth_token="access-token-for-authed-user", oauth_version="1.0"'
