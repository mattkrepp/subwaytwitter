const router = require('express').Router()
const {Line} = require('../db/models')
module.exports = router

router.get('/', async (req, res, next) => {
  try {
    const statuses = await Line.findAll();
    res.json(statuses);
  } catch (err) {
    next(err);
  }
});