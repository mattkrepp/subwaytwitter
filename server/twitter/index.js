const Line = require('../db/models/line');
const axios = require('axios');
const router = require('express').Router();

router.use(async (req, res, next) => {
  try {
    const lines = await Line.findAll();
    console.log(lines);
  } catch (err) {
    next(err);
  }
});
module.exports = router;
// 1

// 2

// 3

// 4

// 5

// 6

// 7

// A

// B

// C

// D

// E

// F

// G

// J

// L

// M

// N

// Q

// R

// S

// W

// Z

