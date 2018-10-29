const router = require('express').Router();
const {User} = require('../db/models');
module.exports = router;

router.get('/', async (req, res, next) => {
  try {
    const users = await User.findAll({
      // explicitly select only the id and email fields - even though
      // users' passwords are encrypted, it won't help if we just
      // send everything to anyone who asks!
      attributes: ['id', 'email']
    });
    res.json(users);
  } catch (err) {
    next(err);
  }
});

router.put('/', async (req, res, next) => {
  try {
    console.log("req.body", req.body);
    const user = await User.findById(req.user.id);
    console.log(user);
    user.update(req.body);
    console.log(user);
    

  } catch (err) {
    next(err);
  }
});
